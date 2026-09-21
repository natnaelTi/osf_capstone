import { useEffect, useState } from 'react'
import { AlertTriangle, Bell, Bot, Check, RefreshCcw } from 'lucide-react'
import { loadAgentState, updateFindingStage } from './agentApi'
import type { AgentFinding, AgentState, FindingStage } from './types'

export function AgentCuratorQueue({ announce, record }: QueueProps) {
  return <AgentQueue stage="curator-review" eyebrow="Wayfinder Watch intake" title="Machine-detected changes awaiting source validation" empty="No agent findings currently require curator validation." action="Validate evidence and route" next="policy-review" announce={announce} record={record} />
}

export function AgentPolicyQueue({ announce, record }: QueueProps) {
  return <AgentQueue stage="policy-review" eyebrow="Wayfinder Watch escalation" title="Agent findings awaiting professional judgment" empty="No agent findings are waiting for policy review." action="Approve within recorded scope" next="approved" announce={announce} record={record} />
}

export function AgentPublishedUpdates() {
  const [state, setState] = useState<AgentState | null>(null)
  useEffect(() => { loadAgentState().then(setState) }, [])
  const approved = state?.findings.filter(item => item.stage === 'approved') ?? []
  if (!approved.length) return null
  return <section className="agent-published"><div className="section-title"><div><span className="eyebrow">From Wayfinder Watch</span><h2>Human-approved monitored changes</h2></div><p>These items completed source validation and professional review. Controlled fixtures remain labeled.</p></div><div className="update-grid">{approved.map(item => <article className="update-card" key={item.id}><div><span className="status-badge status--verified"><Check /> Human approved</span>{item.controlledDemo && <span className="demo-label">Controlled demonstration</span>}</div><h2>{item.title}</h2><p>{item.recommendedAction}</p><dl><div><dt>Detected</dt><dd>{new Date(item.detectedAt).toLocaleDateString('en-GB')}</dd></div><div><dt>Affected</dt><dd>{item.affectedAudience.join(', ')}</dd></div></dl><span className="published-origin"><Bell /> Monitored source finding</span></article>)}</div></section>
}

interface QueueProps { announce: (message: string) => void; record: (title: string, detail: string) => void }

function AgentQueue({ stage, eyebrow, title, empty, action, next, announce, record }: QueueProps & { stage: FindingStage; eyebrow: string; title: string; empty: string; action: string; next: FindingStage }) {
  const [state, setState] = useState<AgentState | null>(null)
  const [working, setWorking] = useState('')
  useEffect(() => { loadAgentState().then(setState) }, [])
  const items = state?.findings.filter(item => item.stage === stage) ?? []

  async function move(finding: AgentFinding) {
    if (!state) return
    setWorking(finding.id)
    const updated = await updateFindingStage(state, finding.id, next)
    setState(updated); setWorking('')
    record(next === 'approved' ? 'Professional judgment recorded' : 'Agent evidence validated', `${finding.title} moved to ${next.replace('-', ' ')}.`)
    announce(`${finding.title} moved to ${next.replace('-', ' ')}`)
  }

  return <section className="workspace-card agent-review-queue"><div className="panel-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{state && <p className="queue-timestamp">Queue refreshed {formatTimestamp(state.lastUpdated)}</p>}</div><Bot /></div>{!state ? <div className="queue-loading"><RefreshCcw className="spin" /> Loading agent findings…</div> : items.length === 0 ? <p className="queue-empty"><Check /> {empty}</p> : <div className="finding-list">{items.map(finding => <article className="queue-finding" key={finding.id}><header><span className={`risk-label risk-label--${finding.risk}`}>{finding.risk} impact</span>{finding.controlledDemo && <span className="demo-label">Controlled demonstration</span>}<h3>{finding.title}</h3><time dateTime={finding.detectedAt}>Detected {formatTimestamp(finding.detectedAt)}</time></header><div className="queue-evidence"><div><strong>Observed Evidence</strong><p>{finding.observedEvidence}</p></div><div><strong>Generated Interpretation</strong><p>{finding.aiInterpretation}</p></div></div><div className="notice notice--warning"><AlertTriangle /><div><strong>Decision Boundary</strong><p>{finding.recommendedAction}</p></div></div><button className="button button--primary" onClick={() => void move(finding)} disabled={working === finding.id}>{working === finding.id ? <><RefreshCcw className="spin" /> Updating…</> : action}</button></article>)}</div>}</section>
}

function formatTimestamp(value: string) { return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(value)) + ' UTC' }
