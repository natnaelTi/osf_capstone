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

1. Confirm the currently applicable rule and explain why it applies.
2. Generate an evidence-backed compliance checklist.
3. Personalize obligations, deadlines, and required documents.
4. Produce questions and an escalation package for a professional adviser.
5. Compare previous and current regulatory requirements.

## Access, roles, and plans

Public visitors can browse regulatory updates and official sources without an account. Personalized guidance, saved cases, alerts, document analysis, collaboration, and audit history require sign-in.

Roles and subscription tiers are independent:

- Business Owner/Admin manages the organization, team, plan, and guidance cases.
- Finance/Operations Member records transactions and completes actions.
- Policy/Legal Reviewer resolves assigned conflicts and high-risk interpretations.
- Source Curator ingests sources and manages rule versions.
- Platform Administrator manages organizations, roles, plans, entitlements, and governance.

The proof of concept represents Starter, Professional, Team, and Institutional plans through feature entitlements. It does not implement billing.

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

### Wayfinder Watch monitoring agent

The proof of concept includes one bounded monitoring agent that checks administrator-configured official sources on a schedule or on demand. It fingerprints normalized source content, identifies changes, uses structured AI extraction when configured, and routes findings through curator and policy-review boundaries.

The agent may autonomously observe and structure evidence. It may not autonomously publish consequential interpretations. Foreign-exchange, tax, penalty, licensing, filing, conflict, and probable-supersession findings require human review. A controlled change fixture is available for reliable demonstrations and must remain visibly labeled as simulated rather than a regulator publication.

## Review model

- Low-risk factual extraction may be published with citations after automated validation.
- Generated interpretation must be labeled as interpretation.
- Conflicting, incomplete, ambiguous, or high-impact guidance enters a review queue.
- A lawyer or policy professional reviews conflicts and high-risk interpretations, not every extracted fact.

## Language

English is the proof-of-concept language. Separate content from presentation, preserve source language, support Unicode and locale-aware dates/numbers, and allow later translated variants without duplicating regulatory logic.

## Minimum product surfaces

- Public regulatory updates and source access
- Login and one-click demo-role access
- Organization regulatory profile and subscription context
- Current-rule verification
- Transaction intake and assumption confirmation
- Guidance result and obligation/deadline checklist
- Required-document and expert-question package
- Source/evidence viewer
- Conflict and professional-review state
- Regulatory source ingestion/status view
- Prior-versus-current change view
- Demo-ready audit trail
- Role-aware reviewer, curator, and platform-administration workspaces

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
