import { useMemo, useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  FileCheck2,
  FileText,
  History,
  LayoutDashboard,
  Menu,
  RefreshCcw,
  Scale,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  X,
} from 'lucide-react'
import { initialAssumptions, initialAuditEvents, initialTransaction, obligations, sources } from './data'
import type { Assumption, AuditEvent, JourneyStep, Obligation, SourceDocument, Status, Transaction, View } from './types'

const navItems: Array<{ id: View; label: string; icon: typeof LayoutDashboard; count?: number }> = [
  { id: 'guidance', label: 'Guidance', icon: LayoutDashboard },
  { id: 'sources', label: 'Source library', icon: BookOpen, count: sources.length },
  { id: 'review', label: 'Review queue', icon: UserRoundCheck, count: 2 },
  { id: 'history', label: 'Audit history', icon: History },
]

const statusMeta: Record<Status, { label: string; className: string }> = {
  verified: { label: 'Verified from source', className: 'status--verified' },
  interpretation: { label: 'Interpretation', className: 'status--interpretation' },
  review: { label: 'Review required', className: 'status--review' },
  stale: { label: 'Source may be outdated', className: 'status--stale' },
}

function StatusBadge({ status }: { status: Status }) {
  const meta = statusMeta[status]
  return (
    <span className={`status-badge ${meta.className}`}>
      {status === 'verified' ? <CheckCircle2 aria-hidden="true" /> : <AlertTriangle aria-hidden="true" />}
      {meta.label}
    </span>
  )
}

function Brand() {
  return (
    <div className="brand" aria-label="Wayfinder home">
      <span className="brand__mark"><Scale aria-hidden="true" /></span>
      <span>
        <strong>Wayfinder</strong>
        <small>Regulatory action navigator</small>
      </span>
    </div>
  )
}

function App() {
  const [view, setView] = useState<View>('guidance')
  const [step, setStep] = useState<JourneyStep>('intake')
  const [transaction, setTransaction] = useState<Transaction>(initialTransaction)
  const [assumptions, setAssumptions] = useState<Assumption[]>(initialAssumptions)
  const [selectedSource, setSelectedSource] = useState<SourceDocument | null>(null)
  const [completed, setCompleted] = useState<string[]>(['ob-1'])
  const [events, setEvents] = useState<AuditEvent[]>(initialAuditEvents)
  const [menuOpen, setMenuOpen] = useState(false)

  const confirmedCount = assumptions.filter((item) => item.confirmed).length
  const completion = Math.round((completed.length / obligations.length) * 100)

  function navigate(next: View) {
    setView(next)
    setMenuOpen(false)
  }

  function record(title: string, detail: string, kind: AuditEvent['kind']) {
    setEvents((current) => [
      ...current,
      {
        id: `ev-${current.length + 1}`,
        time: new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date()),
        title,
        detail,
        kind,
      },
    ])
  }

  function finishIntake() {
    record('Transaction details recorded', `${transaction.invoiceNumber} · ${transaction.currency} ${transaction.amount}`, 'input')
    setStep('assumptions')
  }

  function generateGuidance() {
    record('Guidance snapshot generated', `${confirmedCount} of ${assumptions.length} material assumptions confirmed.`, 'system')
    setStep('results')
  }

  function toggleComplete(id: string, title: string) {
    setCompleted((current) => {
      const exists = current.includes(id)
      record(exists ? 'Action reopened' : 'Action completed', title, 'input')
      return exists ? current.filter((item) => item !== id) : [...current, id]
    })
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to main content</a>
      <aside className={`sidebar ${menuOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar__top">
          <Brand />
          <button className="icon-button sidebar__close" onClick={() => setMenuOpen(false)} aria-label="Close navigation">
            <X aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${view === item.id ? 'nav-item--active' : ''}`}
                onClick={() => navigate(item.id)}
                aria-current={view === item.id ? 'page' : undefined}
              >
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
                {item.count ? <span className="nav-count">{item.count}</span> : null}
              </button>
            )
          })}
        </nav>
        <div className="sidebar__note">
          <ShieldCheck aria-hidden="true" />
          <div>
            <strong>Demo environment</strong>
            <p>Synthetic regulatory records. Not legal advice.</p>
          </div>
        </div>
      </aside>

      {menuOpen ? <button className="scrim" aria-label="Close navigation" onClick={() => setMenuOpen(false)} /> : null}

      <div className="app-main">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open navigation">
            <Menu aria-hidden="true" />
          </button>
          <div className="topbar__context">
            <span className="eyebrow">Demo workspace</span>
            <strong>Selam Digital Solutions PLC</strong>
          </div>
          <div className="corpus-status">
            <span className="live-dot" aria-hidden="true" />
            Corpus checked 20 Sep 2026
          </div>
          <button className="avatar" aria-label="Account menu for Natnael">NT</button>
        </header>

        <main id="main" tabIndex={-1}>
          {view === 'guidance' ? (
            <GuidanceView
              step={step}
              setStep={setStep}
              transaction={transaction}
              setTransaction={setTransaction}
              assumptions={assumptions}
              setAssumptions={setAssumptions}
              finishIntake={finishIntake}
              generateGuidance={generateGuidance}
              confirmedCount={confirmedCount}
              completed={completed}
              completion={completion}
              toggleComplete={toggleComplete}
              openSource={setSelectedSource}
              openReview={() => navigate('review')}
            />
          ) : null}
          {view === 'sources' ? <SourcesView openSource={setSelectedSource} /> : null}
          {view === 'review' ? <ReviewView openSource={setSelectedSource} record={record} /> : null}
          {view === 'history' ? <HistoryView events={events} /> : null}
        </main>
      </div>

      {selectedSource ? <SourceDrawer source={selectedSource} onClose={() => setSelectedSource(null)} /> : null}
    </div>
  )
}

interface GuidanceProps {
  step: JourneyStep
  setStep: (step: JourneyStep) => void
  transaction: Transaction
  setTransaction: (transaction: Transaction) => void
  assumptions: Assumption[]
  setAssumptions: (assumptions: Assumption[]) => void
  finishIntake: () => void
  generateGuidance: () => void
  confirmedCount: number
  completed: string[]
  completion: number
  toggleComplete: (id: string, title: string) => void
  openSource: (source: SourceDocument) => void
  openReview: () => void
}

function GuidanceView(props: GuidanceProps) {
  return (
    <div className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Cross-border service income</span>
          <h1>{props.step === 'results' ? `Action plan for ${props.transaction.invoiceNumber}` : 'Understand your next regulatory steps'}</h1>
          <p>
            {props.step === 'results'
              ? 'A traceable plan based on the transaction facts, stated assumptions, and the current demo evidence corpus.'
              : 'Start with the transaction. Wayfinder will surface the evidence, assumptions, obligations, and questions that need professional review.'}
          </p>
        </div>
        {props.step === 'results' ? (
          <button className="button button--secondary" onClick={() => props.setStep('intake')}>
            <RefreshCcw aria-hidden="true" /> Edit transaction
          </button>
        ) : null}
      </div>

      <JourneyProgress current={props.step} />

      {props.step === 'intake' ? (
        <TransactionForm transaction={props.transaction} setTransaction={props.setTransaction} onContinue={props.finishIntake} />
      ) : null}
      {props.step === 'assumptions' ? (
        <AssumptionsPanel
          assumptions={props.assumptions}
          setAssumptions={props.setAssumptions}
          onBack={() => props.setStep('intake')}
          onGenerate={props.generateGuidance}
          confirmedCount={props.confirmedCount}
        />
      ) : null}
      {props.step === 'results' ? (
        <ResultsPanel
          transaction={props.transaction}
          assumptions={props.assumptions}
          completed={props.completed}
          completion={props.completion}
          toggleComplete={props.toggleComplete}
          openSource={props.openSource}
          openReview={props.openReview}
        />
      ) : null}
    </div>
  )
}

function JourneyProgress({ current }: { current: JourneyStep }) {
  const steps: Array<{ id: JourneyStep; label: string }> = [
    { id: 'intake', label: 'Transaction' },
    { id: 'assumptions', label: 'Assumptions' },
    { id: 'results', label: 'Action plan' },
  ]
  const currentIndex = steps.findIndex((step) => step.id === current)
  return (
    <ol className="journey-progress" aria-label="Guidance progress">
      {steps.map((step, index) => (
        <li key={step.id} className={index <= currentIndex ? 'is-active' : ''} aria-current={step.id === current ? 'step' : undefined}>
          <span>{index < currentIndex ? <Check aria-hidden="true" /> : index + 1}</span>
          {step.label}
        </li>
      ))}
    </ol>
  )
}

function TransactionForm({ transaction, setTransaction, onContinue }: { transaction: Transaction; setTransaction: (value: Transaction) => void; onContinue: () => void }) {
  function update<K extends keyof Transaction>(key: K, value: Transaction[K]) {
    setTransaction({ ...transaction, [key]: value })
  }
  return (
    <section className="workspace-card form-card" aria-labelledby="transaction-heading">
      <div className="section-heading">
        <div className="section-icon"><FileText aria-hidden="true" /></div>
        <div>
          <h2 id="transaction-heading">Describe the transaction</h2>
          <p>Only fields that change the guidance are requested.</p>
        </div>
      </div>
      <form onSubmit={(event) => { event.preventDefault(); onContinue() }}>
        <div className="form-grid">
          <label className="field field--wide">
            <span>Service provided</span>
            <input value={transaction.serviceType} onChange={(event) => update('serviceType', event.target.value)} required />
            <small>Describe what the foreign client paid for.</small>
          </label>
          <label className="field">
            <span>Invoice number</span>
            <input value={transaction.invoiceNumber} onChange={(event) => update('invoiceNumber', event.target.value)} required />
          </label>
          <label className="field">
            <span>Invoice date</span>
            <input type="date" value={transaction.invoiceDate} onChange={(event) => update('invoiceDate', event.target.value)} required />
          </label>
          <label className="field">
            <span>Amount</span>
            <div className="compound-input">
              <select aria-label="Currency" value={transaction.currency} onChange={(event) => update('currency', event.target.value)}>
                <option>USD</option><option>EUR</option><option>GBP</option>
              </select>
              <input inputMode="decimal" value={transaction.amount} onChange={(event) => update('amount', event.target.value)} required />
            </div>
          </label>
          <label className="field">
            <span>Client country</span>
            <input value={transaction.clientCountry} onChange={(event) => update('clientCountry', event.target.value)} required />
          </label>
          <fieldset className="field field--wide radio-group">
            <legend>Transaction stage</legend>
            <label><input type="radio" name="stage" checked={transaction.paymentStatus === 'invoice-issued'} onChange={() => update('paymentStatus', 'invoice-issued')} /> Invoice issued</label>
            <label><input type="radio" name="stage" checked={transaction.paymentStatus === 'payment-received'} onChange={() => update('paymentStatus', 'payment-received')} /> Payment received</label>
          </fieldset>
          {transaction.paymentStatus === 'payment-received' ? (
            <label className="field">
              <span>Payment date</span>
              <input type="date" value={transaction.paymentDate} onChange={(event) => update('paymentDate', event.target.value)} required />
            </label>
          ) : null}
        </div>
        <div className="form-footer">
          <p><ShieldCheck aria-hidden="true" /> Demo data stays in this browser session.</p>
          <button className="button button--primary" type="submit">Review assumptions <ArrowRight aria-hidden="true" /></button>
        </div>
      </form>
    </section>
  )
}

function AssumptionsPanel({ assumptions, setAssumptions, onBack, onGenerate, confirmedCount }: { assumptions: Assumption[]; setAssumptions: (items: Assumption[]) => void; onBack: () => void; onGenerate: () => void; confirmedCount: number }) {
  function toggle(id: string) {
    setAssumptions(assumptions.map((item) => item.id === id ? { ...item, confirmed: !item.confirmed } : item))
  }
  return (
    <section className="workspace-card" aria-labelledby="assumptions-heading">
      <div className="section-heading">
        <div className="section-icon"><CircleHelp aria-hidden="true" /></div>
        <div>
          <h2 id="assumptions-heading">Confirm material assumptions</h2>
          <p>Unconfirmed facts remain visible and can place guidance on hold.</p>
        </div>
      </div>
      <div className="assumption-list">
        {assumptions.map((item) => (
          <label key={item.id} className={`assumption ${item.confirmed ? 'assumption--confirmed' : ''}`}>
            <input type="checkbox" checked={item.confirmed} onChange={() => toggle(item.id)} />
            <span className="custom-check">{item.confirmed ? <Check aria-hidden="true" /> : null}</span>
            <span>
              <strong>{item.statement}</strong>
              <small>{item.impact}</small>
            </span>
          </label>
        ))}
      </div>
      <div className="notice notice--info">
        <Sparkles aria-hidden="true" />
        <div><strong>Interpretation boundary</strong><p>The resulting plan will distinguish source-backed facts from interpretation and hold high-impact uncertainty for professional review.</p></div>
      </div>
      <div className="form-footer">
        <button className="button button--ghost" onClick={onBack}><ArrowLeft aria-hidden="true" /> Back</button>
        <div className="footer-actions">
          <span>{confirmedCount} of {assumptions.length} confirmed</span>
          <button className="button button--primary" onClick={onGenerate}>Generate action plan <ArrowRight aria-hidden="true" /></button>
        </div>
      </div>
    </section>
  )
}

function ResultsPanel({ transaction, assumptions, completed, completion, toggleComplete, openSource, openReview }: { transaction: Transaction; assumptions: Assumption[]; completed: string[]; completion: number; toggleComplete: (id: string, title: string) => void; openSource: (source: SourceDocument) => void; openReview: () => void }) {
  const unconfirmed = assumptions.filter((item) => !item.confirmed)
  return (
    <div className="results-layout">
      <section className="result-summary">
        <div className="summary-main">
          <span className="status-badge status--interpretation"><Sparkles aria-hidden="true" /> Interpretation based on stated assumptions</span>
          <h2>{transaction.currency} {transaction.amount} received for {transaction.serviceType.toLowerCase()}</h2>
          <p>Foreign client in {transaction.clientCountry} · payment recorded {formatDate(transaction.paymentDate)}</p>
        </div>
        <div className="summary-metric" aria-label={`${completion} percent of actions complete`}>
          <strong>{completion}%</strong><span>actions complete</span>
        </div>
      </section>

      {unconfirmed.length ? (
        <div className="notice notice--warning">
          <AlertTriangle aria-hidden="true" />
          <div><strong>One material fact is unconfirmed</strong><p>{unconfirmed[0].statement} Guidance affected by this fact remains on hold.</p></div>
        </div>
      ) : null}

      <div className="results-grid">
        <section className="workspace-card action-panel" aria-labelledby="actions-heading">
          <div className="panel-heading">
            <div><span className="eyebrow">Recommended actions</span><h2 id="actions-heading">What to do next</h2></div>
            <span className="item-count">{completed.length}/{obligations.length} complete</span>
          </div>
          <div className="action-list">
            {obligations.map((item) => (
              <ObligationCard key={item.id} item={item} isComplete={completed.includes(item.id)} onToggle={toggleComplete} openSource={openSource} />
            ))}
          </div>
        </section>

        <aside className="result-aside">
          <section className="workspace-card compact-card">
            <span className="eyebrow">Evidence coverage</span>
            <h2>3 authorities · 4 records</h2>
            <div className="coverage-bar"><span style={{ width: '75%' }} /></div>
            <p>Three obligations have direct source context. One requires a policy professional to resolve an indirect reference.</p>
            <button className="text-button" onClick={() => openSource(sources[0])}>Inspect source context <ChevronRight aria-hidden="true" /></button>
          </section>
          <section className="workspace-card compact-card conflict-card">
            <div className="conflict-icon"><AlertTriangle aria-hidden="true" /></div>
            <span className="eyebrow">Conflict detected</span>
            <h2>Retention period is not explicit</h2>
            <p>An older notice points to an applicable tax record rule without stating the period. The final recommendation is held.</p>
            <button className="button button--warning" onClick={openReview}>Open review request <ArrowRight aria-hidden="true" /></button>
          </section>
          <section className="workspace-card compact-card change-card">
            <div className="change-header"><Clock3 aria-hidden="true" /><span>Effective 1 Oct 2026</span></div>
            <h2>Upcoming source change</h2>
            <p>A demo amendment changes one reporting step after this transaction date.</p>
            <button className="text-button" onClick={() => openSource(sources[3])}>Compare the amendment <ChevronRight aria-hidden="true" /></button>
          </section>
        </aside>
      </div>
      <p className="disclaimer">This demonstration uses synthetic regulatory records and does not provide legal or tax advice.</p>
    </div>
  )
}

function ObligationCard({ item, isComplete, onToggle, openSource }: { item: Obligation; isComplete: boolean; onToggle: (id: string, title: string) => void; openSource: (source: SourceDocument) => void }) {
  const source = sources.find((candidate) => candidate.id === item.sourceIds[0])!
  return (
    <article className={`action-item ${isComplete ? 'action-item--complete' : ''}`}>
      <button className="check-button" onClick={() => onToggle(item.id, item.title)} aria-label={`${isComplete ? 'Reopen' : 'Complete'} ${item.title}`} aria-pressed={isComplete}>
        {isComplete ? <Check aria-hidden="true" /> : null}
      </button>
      <div className="action-item__content">
        <div className="action-item__top"><StatusBadge status={item.status} /><span>{item.timing}</span></div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="action-meta"><span><strong>Owner:</strong> {item.owner}</span></div>
        <details>
          <summary>Why this action?</summary>
          <p>{item.rationale}</p>
        </details>
        <button className="source-link" onClick={() => openSource(source)}><FileCheck2 aria-hidden="true" /> {source.authority} · {source.pinpoint}</button>
      </div>
    </article>
  )
}

function SourcesView({ openSource }: { openSource: (source: SourceDocument) => void }) {
  return (
    <div className="page">
      <div className="page-heading"><div><span className="eyebrow">Bounded demo corpus</span><h1>Source library</h1><p>Provenance, versions, and downstream impact stay visible for every record.</p></div><button className="button button--primary" disabled title="Document ingestion is outside this demo build">Add source <span className="sr-only">Unavailable in demo</span></button></div>
      <div className="metric-row">
        <Metric label="Source records" value="4" note="3 current · 1 conflict" />
        <Metric label="Authorities" value="3" note="Synthetic demo issuers" />
        <Metric label="Latest check" value="Today" note="10:25 UTC" />
      </div>
      <section className="workspace-card source-table-card">
        <div className="panel-heading"><div><h2>Regulatory records</h2><p>Every record in this build is illustrative, not an authoritative legal source.</p></div></div>
        <div className="source-list">
          {sources.map((source) => (
            <button className="source-row" key={source.id} onClick={() => openSource(source)}>
              <span className="source-row__icon"><FileText aria-hidden="true" /></span>
              <span className="source-row__main"><strong>{source.title}</strong><small>{source.authority} · {source.documentType}</small></span>
              <span className={`source-state source-state--${source.status}`}>{source.status === 'current' ? 'Current' : source.status === 'conflict' ? 'Conflict' : 'Superseded'}</span>
              <span className="source-row__date">Effective {formatDate(source.effective)}</span>
              <ChevronRight aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="metric"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
}

function ReviewView({ openSource, record }: { openSource: (source: SourceDocument) => void; record: (title: string, detail: string, kind: AuditEvent['kind']) => void }) {
  const [resolved, setResolved] = useState(false)
  return (
    <div className="page">
      <div className="page-heading"><div><span className="eyebrow">Selective human review</span><h1>Review queue</h1><p>Only conflicts and high-impact interpretations stop for a policy professional.</p></div></div>
      <section className="workspace-card review-card">
        <div className="review-card__header">
          <div className="conflict-icon"><AlertTriangle aria-hidden="true" /></div>
          <div><StatusBadge status={resolved ? 'verified' : 'review'} /><h2>Which record-retention period governs this transaction?</h2><p>INV-2026-041 · Record retention · High-impact interpretation</p></div>
        </div>
        <div className="comparison-grid">
          <article><span className="eyebrow">Available notice</span><h3>Indirect requirement</h3><blockquote>“Supporting export documentation should be retained for the period required under the applicable tax record rules.”</blockquote><button className="source-link" onClick={() => openSource(sources[2])}>Open notice context <ChevronRight aria-hidden="true" /></button></article>
          <article><span className="eyebrow">Missing evidence</span><h3>Controlling period</h3><p>The cited notice does not identify the applicable retention period. The system will not invent one.</p><div className="missing-evidence"><CircleHelp aria-hidden="true" /> Locate the current controlling tax record provision.</div></article>
        </div>
        <div className="review-impact"><strong>Affected recommendation</strong><p>“Retain the evidence pack for [period]” is held and excluded from the final action plan until resolved.</p></div>
        <div className="review-actions">
          <button className="button button--secondary" onClick={() => openSource(sources[2])}>Inspect linked evidence</button>
          <button className="button button--primary" disabled={resolved} onClick={() => { setResolved(true); record('Review resolution recorded', 'Demo reviewer marked the retention question resolved for the current guidance snapshot.', 'review') }}>
            {resolved ? <><Check aria-hidden="true" /> Resolution recorded</> : <>Record demo resolution <ArrowRight aria-hidden="true" /></>}
          </button>
        </div>
      </section>
    </div>
  )
}

function HistoryView({ events }: { events: AuditEvent[] }) {
  const ordered = useMemo(() => [...events].reverse(), [events])
  return (
    <div className="page">
      <div className="page-heading"><div><span className="eyebrow">Traceable session</span><h1>Audit history</h1><p>Inputs, evidence changes, generated guidance, and professional decisions stay distinguishable.</p></div></div>
      <section className="workspace-card timeline-card">
        <ol className="timeline">
          {ordered.map((event) => (
            <li key={event.id}><span className={`timeline__marker timeline__marker--${event.kind}`} /><time>{event.time}</time><div><h2>{event.title}</h2><p>{event.detail}</p><span className="event-kind">{event.kind}</span></div></li>
          ))}
        </ol>
      </section>
    </div>
  )
}

function SourceDrawer({ source, onClose }: { source: SourceDocument; onClose: () => void }) {
  return (
    <div className="drawer-layer" role="presentation">
      <button className="drawer-scrim" aria-label="Close source details" onClick={onClose} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="source-title">
        <div className="drawer__header"><div><span className="eyebrow">Source evidence</span><h2 id="source-title">{source.title}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close source details"><X aria-hidden="true" /></button></div>
        <div className="source-identity"><span className="source-row__icon"><FileText aria-hidden="true" /></span><div><strong>{source.authority}</strong><p>{source.documentType} · {source.jurisdiction}</p></div></div>
        <dl className="metadata-grid">
          <div><dt>Published</dt><dd>{formatDate(source.published)}</dd></div>
          <div><dt>Effective</dt><dd>{formatDate(source.effective)}</dd></div>
          <div><dt>Retrieved</dt><dd>{source.retrieved}</dd></div>
          <div><dt>Version</dt><dd>{source.version}</dd></div>
        </dl>
        <section className="passage"><span className="eyebrow">Relevant passage · {source.pinpoint}</span><blockquote>{source.passage}</blockquote></section>
        <div className="notice notice--info"><ShieldCheck aria-hidden="true" /><div><strong>Synthetic demonstration source</strong><p>This record illustrates provenance and citation behavior. It is not an authoritative legal text.</p></div></div>
        <section className="impact-list"><span className="eyebrow">Used by</span><h3>{obligations.filter((item) => item.sourceIds.includes(source.id)).length || 1} guidance item</h3>{obligations.filter((item) => item.sourceIds.includes(source.id)).map((item) => <p key={item.id}>{item.title}</p>)}</section>
        <button className="button button--secondary button--full" onClick={onClose}>Close source</button>
      </aside>
    </div>
  )
}

function formatDate(value: string) {
  if (!value) return 'Not provided'
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`))
}

export default App
