export type Role = 'public' | 'owner' | 'finance' | 'reviewer' | 'curator' | 'admin'
export type Plan = 'Public' | 'Starter' | 'Professional' | 'Team' | 'Institutional'
export type View = 'public' | 'updates' | 'sources' | 'login' | 'overview' | 'verify' | 'actions' | 'review' | 'curator' | 'admin' | 'history'
export type Status = 'verified' | 'interpretation' | 'review' | 'stale' | 'superseded' | 'upcoming'

export interface DemoIdentity { role: Role; name: string; title: string; organization: string; plan: Plan; description: string }
export interface BusinessProfile { organization: string; entityType: 'Private limited company' | 'Sole proprietor'; activity: 'Software project services' | 'Recurring outsourcing services'; exporterType: 'Service exporter' | 'Goods exporter'; taxStatus: 'VAT registered' | 'Not VAT registered' | 'Unknown'; bankChannel: boolean }
export interface Transaction { serviceType: string; invoiceNumber: string; invoiceDate: string; amount: string; currency: string; clientCountry: string; paymentStatus: 'invoice-issued' | 'payment-received'; paymentDate: string }
export interface SourceDocument { id: string; authority: string; title: string; documentType: string; jurisdiction: string; published: string; effective: string; retrieved: string; version: string; language: string; status: Status; passage: string; pinpoint: string; url: string; relationship?: string }
export interface RulePosition { label: string; statement: string; effective: string; audience: string; sourceId: string; status: Status }
export interface GuidanceAction { id: string; title: string; description: string; owner: string; deadline: string; category: 'Immediate' | 'Before filing' | 'Professional review'; status: Status; sourceIds: string[]; rationale: string; requiredDocuments: string[] }
export interface RegulatoryUpdate { id: string; title: string; summary: string; authority: string; effective: string; audience: string; status: Status; sourceId: string }
export interface AuditEvent { id: string; time: string; title: string; detail: string; kind: 'input' | 'system' | 'evidence' | 'review' | 'access' }

export type AgentHealth = 'active' | 'scanning' | 'paused' | 'degraded'
export type AgentRunStatus = 'completed' | 'running' | 'partial' | 'failed'
export type FindingRisk = 'low' | 'medium' | 'high' | 'critical'
export type FindingStage = 'curator-review' | 'policy-review' | 'approved' | 'dismissed'

export interface MonitorSource {
  id: string
  name: string
  authority: string
  url: string
  sourceType: 'webpage' | 'document-index' | 'rss'
  jurisdiction: string
  domain: string
  language: string
  active: boolean
  lastChecked: string | null
  lastFingerprint: string | null
  health: 'healthy' | 'changed' | 'failed'
}

export interface AgentConfig {
  id: string
  name: string
  enabled: boolean
  schedule: string
  reviewThreshold: FindingRisk
  publicationRule: 'human-approval-required'
  assignedReviewer: string
  changeSensitivity: 'document-list' | 'meaningful-text' | 'any-text'
}

export interface AgentRun {
  id: string
  trigger: 'scheduled' | 'manual' | 'controlled-demo'
  status: AgentRunStatus
  startedAt: string
  completedAt: string | null
  sourcesChecked: number
  changesDetected: number
  findingsCreated: number
  failures: number
  extractionMode: 'openai-structured-output' | 'deterministic-fallback' | 'not-required'
  note: string
}

export interface AgentFinding {
  id: string
  sourceId: string
  title: string
  observedEvidence: string
  aiInterpretation: string
  recommendedAction: string
  risk: FindingRisk
  stage: FindingStage
  detectedAt: string
  effectiveDate: string | null
  affectedAudience: string[]
  topics: string[]
  contentFingerprint: string
  controlledDemo: boolean
}

export interface AgentState {
  health: AgentHealth
  mode: 'cloud' | 'controlled-demo'
  config: AgentConfig
  sources: MonitorSource[]
  runs: AgentRun[]
  findings: AgentFinding[]
  lastUpdated: string
}
