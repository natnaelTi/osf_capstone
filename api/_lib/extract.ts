import type { AgentFinding, MonitorSource } from '../../src/types.js'

interface ExtractedChange {
  title: string
  observed_evidence: string
  interpretation: string
  recommended_action: string
  risk: 'low' | 'medium' | 'high' | 'critical'
  effective_date: string
  affected_audience: string[]
  topics: string[]
}

const schema = {
  type: 'object', additionalProperties: false,
  properties: {
    title: { type: 'string' }, observed_evidence: { type: 'string' }, interpretation: { type: 'string' }, recommended_action: { type: 'string' },
    risk: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] }, effective_date: { type: 'string' },
    affected_audience: { type: 'array', items: { type: 'string' } }, topics: { type: 'array', items: { type: 'string' } },
  },
  required: ['title', 'observed_evidence', 'interpretation', 'recommended_action', 'risk', 'effective_date', 'affected_audience', 'topics'],
}

export async function extractChange(source: MonitorSource, text: string, fingerprint: string, controlledDemo: boolean): Promise<{ finding: AgentFinding; mode: 'openai-structured-output' | 'deterministic-fallback' }> {
  const key = process.env.OPENAI_API_KEY
  let extracted: ExtractedChange | null = null
  if (key) {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? 'gpt-5-mini',
        input: [
          { role: 'system', content: 'Extract only what the supplied source text supports. Separate observed evidence from interpretation. Do not claim legal certainty. Treat tax, foreign-exchange, penalty, licensing, filing, and probable supersession as high impact or above.' },
          { role: 'user', content: `Authority: ${source.authority}\nJurisdiction: ${source.jurisdiction}\nDomain: ${source.domain}\nURL: ${source.url}\nControlled demo: ${controlledDemo}\n\nSource text:\n${text.slice(0, 24000)}` },
        ],
        text: { format: { type: 'json_schema', name: 'regulatory_change', strict: true, schema } },
        max_output_tokens: 1200,
      }),
    })
    if (response.ok) {
      const body = await response.json() as { output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }> }
      const outputText = body.output?.flatMap(item => item.content ?? []).find(item => item.type === 'output_text')?.text
      if (outputText) extracted = JSON.parse(outputText) as ExtractedChange
    }
  }

  const fallback: ExtractedChange = {
    title: controlledDemo ? 'Candidate foreign-exchange directive amendment detected' : `Change detected at ${source.name}`,
    observed_evidence: controlledDemo ? 'The controlled snapshot contains a newly listed directive identifier and a changed service-export passage.' : 'The current official-source fingerprint differs from the previously stored snapshot.',
    interpretation: 'The change may affect regulated obligations or source relationships. This requires validation against the official publication.',
    recommended_action: 'Confirm the changed passage, identify its effective date and audience, and route consequential interpretation to a policy professional.',
    risk: source.domain.toLowerCase().includes('tax') || source.domain.toLowerCase().includes('foreign') ? 'high' : 'medium',
    effective_date: '', affected_audience: ['Affected businesses require curator validation'], topics: [source.domain],
  }
  const value = extracted ?? fallback
  return { mode: extracted ? 'openai-structured-output' : 'deterministic-fallback', finding: {
    id: `finding-${Date.now()}-${source.id}`, sourceId: source.id, title: value.title,
    observedEvidence: value.observed_evidence, aiInterpretation: value.interpretation, recommendedAction: value.recommended_action,
    risk: value.risk, stage: 'curator-review', detectedAt: new Date().toISOString(), effectiveDate: value.effective_date || null,
    affectedAudience: value.affected_audience, topics: value.topics, contentFingerprint: fingerprint, controlledDemo,
  } }
}
