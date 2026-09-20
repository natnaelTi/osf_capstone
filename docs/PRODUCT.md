# Product definition

## Working product

An evidence-backed regulatory action navigator for Ethiopian businesses receiving cross-border income. The proof of concept converts a real transaction into a source-cited explanation, obligations and deadlines, an actionable compliance checklist, and focused questions for a professional adviser.

This is a decision-support product, not an unrestricted legal-advice chatbot.

## Primary user and transaction

The primary user is an owner, finance lead, or operations lead at an Ethiopian technology business or other service exporter. The primary event is issuing an invoice or receiving foreign payment for exported digital services. Demo variants may cover a single consulting/project invoice and a recurring software or digital-service payment.

## Secondary expansion

Goods exporters demonstrate horizontal depth. Their future path may add customs declarations, commodity rules, logistics documents, export permits, and sector-specific requirements. This must not dilute the service-export proof of concept.

## Problem timing

Obligations begin when the invoice is issued or payment is received. Users often recognize the problem only while preparing tax files or when a bank, accountant, or authority requests documentation. The product should move guidance closer to the transaction event.

## Output priority

1. Evidence-backed obligations and deadlines.
2. Practical action checklist.
3. Questions and escalation package for a professional adviser.
4. Comparison of previous and current regulatory requirements.

## Proof-of-concept flow

1. **Describe the transaction** — service type, invoice/payment timing, currency, counterparty location, business context, and available documents.
2. **Confirm assumptions** — show material assumptions and request missing inputs rather than inventing them.
3. **Assemble evidence** — retrieve relevant content from a bounded corpus of official sources.
4. **Explain applicability** — show which rules likely apply, why, and what remains uncertain.
5. **Generate actions** — ordered obligations, deadlines, documents, owners, and status.
6. **Escalate risk** — route conflicts and high-impact interpretations to a lawyer or policy professional.
7. **Preserve an audit trail** — source versions, generated output, assumptions, review status, and changes.

## Regulatory ingestion

Combine three input methods:

- structured/manual entry for critical source metadata;
- upload and extraction from official documents;
- monitored ingestion from official regulator or ministry publications where feasible.

Bound the demo corpus to approximately 5–10 authoritative documents such as proclamations or laws, regulator/ministry directives, official notices, announcements, and press releases. Every item requires provenance and version metadata.

## Review model

- Low-risk factual extraction may be published with citations after automated validation.
- Generated interpretation must be labeled as interpretation.
- Conflicting, incomplete, ambiguous, or high-impact guidance enters a review queue.
- A lawyer or policy professional reviews conflicts and high-risk interpretations, not every extracted fact.

## Language

English is the proof-of-concept language. Separate content from presentation, preserve source language, support Unicode and locale-aware dates/numbers, and allow later translated variants without duplicating regulatory logic.

## Minimum product surfaces

- Transaction intake and assumption confirmation
- Guidance result and obligation/deadline checklist
- Source/evidence viewer
- Conflict and professional-review state
- Regulatory source ingestion/status view
- Prior-versus-current change view
- Demo-ready audit trail

## Non-goals

- Legal representation or guaranteed correctness
- Automatic government filing or submission
- Banking or payment execution
- Comprehensive Ethiopian law coverage
- Full goods-export workflow
- Production monitoring of every regulator
- Unreviewed high-impact recommendations
- Multilingual production support in the hackathon build

## Success criteria

- A judge can follow one service-export transaction from intake to action plan without team narration.
- Every consequential recommendation exposes supporting evidence and freshness.
- Assumptions, conflicts, and professional-review items are unmistakable.
- A source change and its downstream impact can be demonstrated.
- The product communicates extensibility without pretending the proof of concept is comprehensive.

