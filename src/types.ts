export type View = 'guidance' | 'sources' | 'review' | 'history'
export type JourneyStep = 'intake' | 'assumptions' | 'results'
export type Status = 'verified' | 'interpretation' | 'review' | 'stale'

export interface Transaction {
  serviceType: string
  invoiceNumber: string
  invoiceDate: string
  amount: string
  currency: string
  clientCountry: string
  paymentStatus: 'invoice-issued' | 'payment-received'
  paymentDate: string
}

export interface Assumption {
  id: string
  statement: string
  confirmed: boolean
  impact: string
}

export interface SourceDocument {
  id: string
  authority: string
  title: string
  documentType: string
  jurisdiction: string
  published: string
  effective: string
  retrieved: string
  version: string
  status: 'current' | 'conflict' | 'superseded'
  passage: string
  pinpoint: string
  url: string
}

export interface Obligation {
  id: string
  title: string
  description: string
  owner: string
  timing: string
  status: Status
  sourceIds: string[]
  rationale: string
}

export interface AuditEvent {
  id: string
  time: string
  title: string
  detail: string
  kind: 'input' | 'system' | 'evidence' | 'review'
}
