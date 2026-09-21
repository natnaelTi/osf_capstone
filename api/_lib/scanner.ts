import type { AgentFinding, AgentRun, AgentState, MonitorSource } from '../../src/types.js'
import { extractChange } from './extract.js'
import { sourceUrlAllowed } from './sourceSecurity.js'

function normalizedText(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
}

async function fingerprint(value: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value))
  return `sha256:${Array.from(new Uint8Array(digest)).map(byte => byte.toString(16).padStart(2, '0')).join('')}`
}

function scheduleHours(schedule: string) { return schedule.includes('*/12') ? 12 : schedule.includes('*/6') ? 6 : 24 }
export function runIsDue(state: AgentState) {
  const last = state.runs.find(run => run.trigger === 'scheduled' && run.completedAt)
  return !last?.completedAt || Date.now() - new Date(last.completedAt).getTime() >= scheduleHours(state.config.schedule) * 60 * 60 * 1000
}

export async function scan(state: AgentState, trigger: AgentRun['trigger']): Promise<AgentState> {
  const startedAt = new Date().toISOString()
  const findings: AgentFinding[] = []
  let failures = 0
  let extractionMode: AgentRun['extractionMode'] = 'not-required'
  const controlledDemo = trigger === 'controlled-demo'

  const nextSources: MonitorSource[] = []
  for (const source of state.sources) {
    if (!source.active) { nextSources.push(source); continue }
    if (controlledDemo && source.id !== 'nbe-directives') { nextSources.push({ ...source, lastChecked: startedAt, health: 'healthy' }); continue }
    try {
      if (!sourceUrlAllowed(source.url)) throw new Error('Source URL is outside the configured public-host allowlist')
      let text: string
      if (controlledDemo && source.id === 'nbe-directives') {
        text = 'CONTROLLED DEMONSTRATION FIXTURE. A candidate FXD/DEMO/2026 entry changes service-export retention documentation. This is not a real regulator publication.'
      } else {
        const response = await fetch(source.url, { headers: { 'User-Agent': 'WayfinderWatch/0.1 (+regulatory monitoring proof of concept)' }, redirect: 'error', signal: AbortSignal.timeout(12000) })
        if (!response.ok) throw new Error(`Source returned ${response.status}`)
        const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''
        if (contentType && !contentType.includes('text/') && !contentType.includes('html') && !contentType.includes('xml')) throw new Error(`Unsupported source content type: ${contentType}`)
        const declaredSize = Number(response.headers.get('content-length') ?? 0)
        if (declaredSize > 2_000_000) throw new Error('Source exceeded the 2 MB scan limit')
        const body = await response.text()
        if (body.length > 2_000_000) throw new Error('Source exceeded the 2 MB scan limit')
        text = normalizedText(body)
      }
      const nextFingerprint = await fingerprint(text)
      const changed = controlledDemo ? source.id === 'nbe-directives' : Boolean(source.lastFingerprint && source.lastFingerprint !== nextFingerprint)
      if (changed) {
        const extracted = await extractChange(source, text, nextFingerprint, controlledDemo)
        findings.push(extracted.finding); extractionMode = extracted.mode
      }
      nextSources.push({ ...source, lastChecked: startedAt, lastFingerprint: nextFingerprint, health: changed ? 'changed' : 'healthy' })
    } catch {
      failures += 1; nextSources.push({ ...source, lastChecked: startedAt, health: 'failed' })
    }
  }
  const completedAt = new Date().toISOString()
  const run: AgentRun = { id: `run-${Date.now()}`, trigger, status: failures === 0 ? 'completed' : findings.length || failures < nextSources.length ? 'partial' : 'failed', startedAt, completedAt, sourcesChecked: nextSources.filter(item => item.active).length, changesDetected: findings.length, findingsCreated: findings.length, failures, extractionMode, note: controlledDemo ? 'Controlled fixture used; no claim of a new regulator publication is made.' : findings.length ? 'Official-source fingerprints changed and findings were routed for human validation.' : 'Source fingerprints matched prior snapshots or new baselines were established.' }
  return { ...state, health: failures ? 'degraded' : 'active', sources: nextSources, findings: [...findings, ...state.findings].slice(0, 30), runs: [run, ...state.runs].slice(0, 20), lastUpdated: completedAt }
}
