import type { AgentFinding, AgentRun, AgentState } from './types'

const now = '2026-09-21T06:00:00.000Z'

export const initialAgentState: AgentState = {
  health: 'active',
  mode: 'controlled-demo',
  lastUpdated: now,
  config: {
    id: 'wayfinder-watch',
    name: 'Wayfinder Watch',
    enabled: true,
    schedule: '0 */6 * * *',
    reviewThreshold: 'high',
    publicationRule: 'human-approval-required',
    assignedReviewer: 'Policy reviewer',
    changeSensitivity: 'meaningful-text',
  },
  sources: [
    { id: 'nbe-directives', name: 'Foreign Exchange Management Directives', authority: 'National Bank of Ethiopia', url: 'https://nbe.gov.et/directives/foreign-exchange-management/', sourceType: 'document-index', jurisdiction: 'Ethiopia', domain: 'Foreign exchange', language: 'English', active: true, lastChecked: now, lastFingerprint: 'sha256:demo-nbe-2026-09', health: 'healthy' },
    { id: 'nbe-news', name: 'NBE News and Public Notices', authority: 'National Bank of Ethiopia', url: 'https://nbe.gov.et/nbe_news/', sourceType: 'webpage', jurisdiction: 'Ethiopia', domain: 'Banking and foreign exchange', language: 'English', active: true, lastChecked: now, lastFingerprint: 'sha256:demo-news-2026-09', health: 'healthy' },
    { id: 'moj-laws', name: 'Federal laws and proclamations', authority: 'Federal Ministry of Justice', url: 'https://justice.gov.et/en/laws/', sourceType: 'document-index', jurisdiction: 'Ethiopia', domain: 'Tax and commercial law', language: 'English', active: true, lastChecked: now, lastFingerprint: 'sha256:demo-moj-2026-09', health: 'healthy' },
  ],
  runs: [
    { id: 'run-baseline', trigger: 'scheduled', status: 'completed', startedAt: '2026-09-21T05:59:11.000Z', completedAt: now, sourcesChecked: 3, changesDetected: 0, findingsCreated: 0, failures: 0, extractionMode: 'not-required', note: 'Live source fingerprints matched the previous verified snapshots.' },
  ],
  findings: [],
}

export function createControlledDemoRun(state: AgentState): AgentState {
  const detectedAt = new Date().toISOString()
  const run: AgentRun = {
    id: `run-demo-${Date.now()}`,
    trigger: 'controlled-demo',
    status: 'completed',
    startedAt: detectedAt,
    completedAt: detectedAt,
    sourcesChecked: state.sources.filter(source => source.active).length,
    changesDetected: 1,
    findingsCreated: 1,
    failures: 0,
    extractionMode: 'deterministic-fallback',
    note: 'Controlled fixture used to demonstrate change detection. It is not represented as a newly published regulator notice.',
  }
  const finding: AgentFinding = {
    id: `finding-demo-${Date.now()}`,
    sourceId: 'nbe-directives',
    title: 'Candidate foreign-exchange directive amendment detected',
    observedEvidence: 'The controlled source snapshot contains a newly listed directive identifier and a changed service-export passage.',
    aiInterpretation: 'The change may alter how service-export proceeds are retained or documented. This is generated interpretation, not a verified legal conclusion.',
    recommendedAction: 'Confirm the publication on the official source, map its relationship to the current directive, and route any consequential interpretation to a policy professional.',
    risk: 'high',
    stage: 'curator-review',
    detectedAt,
    effectiveDate: null,
    affectedAudience: ['Service exporters', 'Licensed banks'],
    topics: ['Foreign exchange', 'Export proceeds'],
    contentFingerprint: `sha256:controlled-demo-${Date.now()}`,
    controlledDemo: true,
  }
  return {
    ...state,
    health: 'active',
    mode: 'controlled-demo',
    lastUpdated: detectedAt,
    runs: [run, ...state.runs].slice(0, 10),
    findings: [finding, ...state.findings].slice(0, 20),
    sources: state.sources.map(source => source.id === finding.sourceId ? { ...source, health: 'changed', lastChecked: detectedAt } : { ...source, lastChecked: detectedAt }),
  }
}
