import { useEffect, useMemo, useState } from 'react'
import { Activity, AlertTriangle, Bot, Check, ChevronDown, Clock3, ExternalLink, FileSearch, Play, Plus, RefreshCcw, Save, ShieldCheck } from 'lucide-react'
import { loadAgentState, runAgent, saveAgentConfig, updateFindingStage } from './agentApi'
import type { AgentFinding, AgentState, FindingRisk, MonitorSource } from './types'

const riskRank: Record<FindingRisk, number> = { low: 1, medium: 2, high: 3, critical: 4 }

export function AgentOperations({ announce, record }: { announce: (message: string) => void; record: (title: string, detail: string) => void }) {
  const [state, setState] = useState<AgentState | null>(null)
  const [running, setRunning] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [showSourceForm, setShowSourceForm] = useState(false)

  useEffect(() => { loadAgentState().then(setState) }, [])
  const reviewCount = state?.findings.filter(item => item.stage === 'curator-review' || item.stage === 'policy-review').length ?? 0
  const nextRun = useMemo(() => state ? 'Within the next 6-hour UTC window' : 'Loading…', [state])

  if (!state) return <section className="workspace-card agent-loading" aria-live="polite"><RefreshCcw className="spin" /><div><strong>Loading Wayfinder Watch</strong><p>Retrieving agent configuration, monitored sources, and recent runs.</p></div></section>

  async function execute(controlledDemo: boolean) {
    if (!state) return
    const current = state
    setRunning(true); setError(''); announce(controlledDemo ? 'Running controlled change demonstration' : 'Starting live source scan')
    try {
      const next = await runAgent(current, controlledDemo)
      setState(next)
      record('Wayfinder Watch run completed', next.runs[0]?.note ?? 'Monitoring run completed.')
      announce(`Agent run completed with ${next.runs[0]?.changesDetected ?? 0} changes detected`)
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : 'The scan could not be completed.'
      setError(message); announce(message)
    } finally { setRunning(false) }
  }

  async function persist(nextState: AgentState) {
    if (!state) return
    const current = state
    setSaving(true); setError('')
    try {
      const saved = await saveAgentConfig(current, nextState.config, nextState.sources)
      setState(saved); record('Agent configuration updated', 'Schedule, review threshold, or monitored-source configuration changed.'); announce('Agent configuration saved')
    } catch { setError('Configuration could not be saved. Existing settings were preserved.') }
    finally { setSaving(false) }
  }

  async function routeFinding(id: string) {
    if (!state) return
    const next = await updateFindingStage(state, id, 'policy-review')
    setState(next); record('Agent finding routed', 'A high-impact finding was sent to policy review.'); announce('Finding routed to policy review')
  }

  function addSource(source: MonitorSource) {
    if (!state) return
    const next: AgentState = { ...state, sources: [...state.sources, source] }
    setShowSourceForm(false); void persist(next)
  }

  return <div className="agent-operations">
    <section className="agent-hero">
      <div><span className="eyebrow">Operational monitoring agent</span><div className="agent-title"><Bot aria-hidden="true" /><h2>{state.config.name}</h2></div><p>Scans configured official sources, fingerprints changes, extracts candidate regulatory facts, and routes ambiguity or high-impact interpretations to people.</p><div className="agent-mode"><span className={`agent-health agent-health--${state.health}`}><Activity /> {state.health}</span><span>{state.mode === 'cloud' ? 'Connected cloud runtime' : 'Controlled demo fallback'}</span></div></div>
      <div className="agent-controls"><button className="button button--primary" onClick={() => void execute(false)} disabled={running || !state.config.enabled}>{running ? <><RefreshCcw className="spin" /> Scanning sources…</> : <><Play /> Run live scan now</>}</button><button className="button button--secondary" onClick={() => void execute(true)} disabled={running}>Run controlled change demo</button><small>The demo fixture is always labeled and never represented as a real regulator publication.</small></div>
    </section>

    {error && <div className="notice notice--warning" role="alert"><AlertTriangle /><div><strong>Agent action needs attention</strong><p>{error}</p></div></div>}

    <div className="metric-row agent-metrics"><Metric label="Monitored sources" value={String(state.sources.filter(item => item.active).length)} note={`${state.sources.length} configured`} /><Metric label="Awaiting people" value={String(reviewCount)} note="Curator or policy review" /><Metric label="Next scheduled run" value="≤ 6h" note={nextRun} /></div>

    <div className="agent-grid">
      <section className="workspace-card agent-panel">
        <div className="panel-heading"><div><span className="eyebrow">Agent configuration</span><h2>Schedule and decision boundaries</h2></div><button className="button button--secondary" onClick={() => void persist(state)} disabled={saving}>{saving ? <RefreshCcw className="spin" /> : <Save />} Save</button></div>
        <div className="form-grid agent-config-grid">
          <label className="field"><span>Agent state</span><select value={state.config.enabled ? 'active' : 'paused'} onChange={event => setState({ ...state, config: { ...state.config, enabled: event.target.value === 'active' }, health: event.target.value === 'active' ? 'active' : 'paused' })}><option value="active">Active</option><option value="paused">Paused</option></select></label>
          <label className="field"><span>Scan schedule</span><select value={state.config.schedule} onChange={event => setState({ ...state, config: { ...state.config, schedule: event.target.value } })}><option value="0 */6 * * *">Every 6 hours</option><option value="0 */12 * * *">Every 12 hours</option><option value="0 5 * * *">Daily at 05:00 UTC</option></select></label>
          <label className="field"><span>Change sensitivity</span><select value={state.config.changeSensitivity} onChange={event => setState({ ...state, config: { ...state.config, changeSensitivity: event.target.value as AgentState['config']['changeSensitivity'] } })}><option value="document-list">New or removed documents</option><option value="meaningful-text">Meaningful text changes</option><option value="any-text">Any text change</option></select></label>
          <label className="field"><span>Mandatory review threshold</span><select value={state.config.reviewThreshold} onChange={event => setState({ ...state, config: { ...state.config, reviewThreshold: event.target.value as FindingRisk } })}><option value="medium">Medium and above</option><option value="high">High and critical</option><option value="critical">Critical only</option></select></label>
          <label className="field"><span>Assigned reviewer</span><input value={state.config.assignedReviewer} onChange={event => setState({ ...state, config: { ...state.config, assignedReviewer: event.target.value } })} /></label>
          <label className="field"><span>Publication rule</span><select value={state.config.publicationRule} disabled><option value="human-approval-required">Human approval required</option></select><small>Consequential interpretations cannot be auto-published.</small></label>
        </div>
      </section>

      <section className="workspace-card agent-panel">
        <div className="panel-heading"><div><span className="eyebrow">Runtime status</span><h2>Latest monitoring run</h2></div><Clock3 /></div>
        {state.runs.length ? <RunSummary run={state.runs[0]} /> : <div className="empty-state"><FileSearch /><strong>No monitoring runs yet</strong><p>Run the agent to establish the first set of source fingerprints.</p></div>}
      </section>
    </div>

    <section className="workspace-card agent-panel agent-sources">
      <div className="panel-heading"><div><span className="eyebrow">Source registry</span><h2>Official sites configured for scanning</h2><p>Each source retains authority, jurisdiction, domain, language, fingerprint, and health.</p></div><button className="button button--secondary" onClick={() => setShowSourceForm(value => !value)}><Plus /> Add source</button></div>
      {showSourceForm && <SourceForm cancel={() => setShowSourceForm(false)} add={addSource} />}
      <div className="monitor-table">{state.sources.map(source => <div className="monitor-source" key={source.id}><span className={`source-health source-health--${source.health}`}><ShieldCheck /></span><div><strong>{source.name}</strong><small>{source.authority} · {source.domain} · {source.language}</small><a href={source.url} target="_blank" rel="noreferrer">{source.url} <ExternalLink /></a></div><div><span>{source.active ? 'Scanning enabled' : 'Paused'}</span><small>{source.lastChecked ? `Checked ${formatTimestamp(source.lastChecked)}` : 'Not checked yet'}</small></div><label className="switch"><input type="checkbox" checked={source.active} onChange={event => setState({ ...state, sources: state.sources.map(item => item.id === source.id ? { ...item, active: event.target.checked } : item) })} /><span>{source.active ? 'Active' : 'Paused'}</span></label></div>)}</div>
    </section>

    <section className="workspace-card agent-panel">
      <div className="panel-heading"><div><span className="eyebrow">Human-in-the-loop queue</span><h2>Detected changes and decision boundaries</h2><p>Observed evidence is never visually merged with AI interpretation or professional judgment.</p></div><span className="priority">{reviewCount} awaiting review</span></div>
      {state.findings.length ? <div className="finding-list">{state.findings.map(finding => <FindingCard key={finding.id} finding={finding} threshold={state.config.reviewThreshold} route={() => void routeFinding(finding.id)} />)}</div> : <div className="empty-state"><Check /><strong>No unresolved changes</strong><p>The latest live fingerprints match the stored source snapshots. Use the controlled demo to exercise review routing.</p></div>}
    </section>
  </div>
}

function RunSummary({ run }: { run: AgentState['runs'][number] }) {
  return <div className="run-summary"><div className="run-status"><span className={`agent-health agent-health--${run.status === 'completed' ? 'active' : 'degraded'}`}><Activity /> {run.status}</span><span>{formatTimestamp(run.startedAt)}</span></div><dl><div><dt>Sources checked</dt><dd>{run.sourcesChecked}</dd></div><div><dt>Changes</dt><dd>{run.changesDetected}</dd></div><div><dt>Findings</dt><dd>{run.findingsCreated}</dd></div><div><dt>Failures</dt><dd>{run.failures}</dd></div></dl><div className="run-note"><strong>Extraction mode</strong><span>{run.extractionMode}</span><p>{run.note}</p></div></div>
}

function FindingCard({ finding, threshold, route }: { finding: AgentFinding; threshold: FindingRisk; route: () => void }) {
  const mandatory = riskRank[finding.risk] >= riskRank[threshold]
  return <article className="finding-card"><header><div><span className={`risk-label risk-label--${finding.risk}`}>{finding.risk} impact</span>{finding.controlledDemo && <span className="demo-label">Controlled demonstration</span>}<h3>{finding.title}</h3><p>Detected {formatTimestamp(finding.detectedAt)} · Stage: {finding.stage.replace('-', ' ')}</p></div><ChevronDown /></header><div className="finding-layers"><section><span>1 · Observed evidence</span><p>{finding.observedEvidence}</p></section><section><span>2 · AI interpretation</span><p>{finding.aiInterpretation}</p></section><section><span>3 · Recommended action</span><p>{finding.recommendedAction}</p></section><section><span>4 · Professional judgment</span><p>{finding.stage === 'policy-review' ? 'Awaiting the assigned policy professional.' : 'No professional decision has been recorded.'}</p></section></div><footer><span>{mandatory ? 'Mandatory human review' : 'Curator validation required'}</span><button className="button button--secondary" onClick={route} disabled={finding.stage === 'policy-review'}>{finding.stage === 'policy-review' ? <><Check /> Routed to policy review</> : 'Route to policy review'}</button></footer></article>
}

function SourceForm({ cancel, add }: { cancel: () => void; add: (source: MonitorSource) => void }) {
  const [name, setName] = useState('')
  const [authority, setAuthority] = useState('')
  const [url, setUrl] = useState('https://')
  const [domain, setDomain] = useState('')
  function submit(event: React.FormEvent) { event.preventDefault(); add({ id: `source-${Date.now()}`, name, authority, url, domain, sourceType: 'webpage', jurisdiction: 'Ethiopia', language: 'English', active: true, lastChecked: null, lastFingerprint: null, health: 'healthy' }) }
  return <form className="source-form" onSubmit={submit}><label className="field"><span>Source name</span><input required value={name} onChange={event => setName(event.target.value)} /></label><label className="field"><span>Issuing authority</span><input required value={authority} onChange={event => setAuthority(event.target.value)} /></label><label className="field"><span>Official URL</span><input required type="url" value={url} onChange={event => setUrl(event.target.value)} /></label><label className="field"><span>Regulatory domain</span><input required value={domain} onChange={event => setDomain(event.target.value)} /></label><div><button type="button" className="button button--ghost" onClick={cancel}>Cancel</button><button className="button button--primary" type="submit">Add monitored source</button></div></form>
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) { return <div className="metric"><span>{label}</span><strong>{value}</strong><small>{note}</small></div> }
function formatTimestamp(value: string) { return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC' }).format(new Date(value)) + ' UTC' }
