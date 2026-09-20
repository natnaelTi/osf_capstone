import type { Assumption, AuditEvent, Obligation, SourceDocument, Transaction } from './types'

export const initialTransaction: Transaction = {
  serviceType: 'Software implementation services',
  invoiceNumber: 'INV-2026-041',
  invoiceDate: '2026-09-18',
  amount: '8,400',
  currency: 'USD',
  clientCountry: 'United States',
  paymentStatus: 'payment-received',
  paymentDate: '2026-09-19',
}

export const initialAssumptions: Assumption[] = [
  {
    id: 'a1',
    statement: 'The service was delivered remotely from Ethiopia.',
    confirmed: true,
    impact: 'Used to evaluate whether the transaction is treated as an exported service.',
  },
  {
    id: 'a2',
    statement: 'The client has no permanent establishment in Ethiopia.',
    confirmed: true,
    impact: 'Changes how local-source income and withholding questions are framed.',
  },
  {
    id: 'a3',
    statement: 'Payment entered through a licensed Ethiopian bank.',
    confirmed: false,
    impact: 'Bank-channel evidence affects foreign-exchange documentation guidance.',
  },
]

export const sources: SourceDocument[] = [
  {
    id: 'src-01',
    authority: 'Ethiopian Revenue Authority',
    title: 'Illustrative VAT guidance for exported services',
    documentType: 'Demo guidance note',
    jurisdiction: 'Ethiopia',
    published: '2025-12-15',
    effective: '2026-01-01',
    retrieved: '2026-09-20 10:20 UTC',
    version: 'sha256: demo-a91f',
    status: 'current',
    passage:
      'For demonstration only: exported services may require evidence that the recipient is outside Ethiopia and that the benefit of the service is enjoyed outside Ethiopia.',
    pinpoint: 'Section 4.2, paragraph 3',
    url: '#demo-source-1',
  },
  {
    id: 'src-02',
    authority: 'National Bank of Ethiopia',
    title: 'Illustrative foreign-currency receipt documentation directive',
    documentType: 'Demo directive extract',
    jurisdiction: 'Ethiopia',
    published: '2026-02-04',
    effective: '2026-03-01',
    retrieved: '2026-09-20 10:22 UTC',
    version: 'sha256: demo-7d4c',
    status: 'current',
    passage:
      'For demonstration only: exporters should retain the contract, invoice, bank advice, and evidence of service delivery for foreign-currency receipts.',
    pinpoint: 'Article 8(2)',
    url: '#demo-source-2',
  },
  {
    id: 'src-03',
    authority: 'Ministry of Revenue',
    title: 'Illustrative record-retention notice',
    documentType: 'Demo public notice',
    jurisdiction: 'Ethiopia',
    published: '2024-08-12',
    effective: '2024-09-01',
    retrieved: '2026-09-20 10:24 UTC',
    version: 'sha256: demo-c28b',
    status: 'conflict',
    passage:
      'For demonstration only: supporting export documentation should be retained for the period required under the applicable tax record rules.',
    pinpoint: 'Notice 3, item 6',
    url: '#demo-source-3',
  },
  {
    id: 'src-04',
    authority: 'National Bank of Ethiopia',
    title: 'Illustrative amendment on export proceeds',
    documentType: 'Demo amendment',
    jurisdiction: 'Ethiopia',
    published: '2026-09-15',
    effective: '2026-10-01',
    retrieved: '2026-09-20 10:25 UTC',
    version: 'sha256: demo-f511',
    status: 'current',
    passage:
      'For demonstration only: the amendment changes the timing for one export-proceeds reporting step beginning 1 October 2026.',
    pinpoint: 'Amendment 2, clause 5',
    url: '#demo-source-4',
  },
]

export const obligations: Obligation[] = [
  {
    id: 'ob-1',
    title: 'Preserve the transaction evidence pack',
    description: 'Keep the signed agreement, issued invoice, bank credit advice, and evidence that the service was delivered.',
    owner: 'Finance lead',
    timing: 'Now · before monthly close',
    status: 'verified',
    sourceIds: ['src-02'],
    rationale: 'The available demo source explicitly lists the evidence categories associated with a foreign-currency receipt.',
  },
  {
    id: 'ob-2',
    title: 'Confirm export-of-service treatment',
    description: 'Document where the customer received and benefited from the service before applying the export treatment.',
    owner: 'Finance lead + accountant',
    timing: 'Before tax-file preparation',
    status: 'interpretation',
    sourceIds: ['src-01'],
    rationale: 'Applicability depends on transaction facts. This output is an interpretation based on the confirmed assumptions.',
  },
  {
    id: 'ob-3',
    title: 'Verify the bank-channel record',
    description: 'Attach the licensed-bank receipt or clarify how the foreign payment entered Ethiopia.',
    owner: 'Operations lead',
    timing: 'Missing input · resolve now',
    status: 'review',
    sourceIds: ['src-02'],
    rationale: 'The bank-channel assumption remains unconfirmed, so the related documentation guidance cannot be finalized.',
  },
  {
    id: 'ob-4',
    title: 'Resolve the record-retention period',
    description: 'Hold the final retention recommendation until the older notice is reconciled with the current tax record rule.',
    owner: 'Policy reviewer',
    timing: 'Review requested',
    status: 'review',
    sourceIds: ['src-03'],
    rationale: 'The source refers to another applicable rule without stating the period. Professional interpretation is required.',
  },
]

export const initialAuditEvents: AuditEvent[] = [
  {
    id: 'ev-1',
    time: '10:20',
    title: 'Demo corpus synchronized',
    detail: 'Four synthetic source records loaded with provenance and version fingerprints.',
    kind: 'evidence',
  },
  {
    id: 'ev-2',
    time: '10:25',
    title: 'Source change detected',
    detail: 'A future-effective amendment was linked to the export-proceeds guidance.',
    kind: 'system',
  },
]
