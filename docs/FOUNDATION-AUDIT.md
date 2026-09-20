# Foundation audit

## Repository state

The repository began as a clean slate containing only the Codex operating kit. There was no application framework, data model, routing, UI, authentication, persistence, or test harness to preserve.

## Implementation decision

Use React, TypeScript, and Vite for the first proof of concept.

Why:

- fast local startup and production builds;
- minimal infrastructure during the hackathon;
- strong component and type boundaries;
- straightforward responsive and accessible UI testing;
- easy migration from local fixtures to API-backed services.

The first slice uses local typed fixtures and in-memory interaction. This is intentional demo infrastructure, not a claim of production ingestion or legal validation.

## Primary vertical slice

1. Capture a foreign digital-service transaction.
2. Confirm material assumptions.
3. Generate a traceable action plan from a bounded synthetic corpus.
4. Expose obligations, deadlines, evidence, and interpretation labels.
5. Demonstrate a source conflict entering professional review.
6. Demonstrate a source update changing downstream guidance.
7. Preserve a visible audit history within the demo session.

## Initial domain objects

- `Transaction`
- `Assumption`
- `SourceDocument`
- `Obligation`
- `Conflict`
- `ReviewRequest`
- `AuditEvent`

The object boundaries are defined in TypeScript so they can later become API contracts.

## Deferred gaps

- authenticated accounts and roles;
- durable database persistence;
- real document upload, OCR, extraction, and monitoring;
- verified Ethiopian regulatory corpus;
- reviewer identity and approval signatures;
- production localization;
- automated tests against live official sources;
- deployment and operational monitoring.

## Acceptance criteria for this build

- A judge can complete the demo without narration.
- Transaction details and assumptions visibly shape the result.
- Every obligation links to source context.
- Interpretation and professional-review states are unmistakable.
- Conflict and source-change scenarios are interactive.
- The interface works at mobile and desktop widths with keyboard-visible controls.
- Type checking, tests, and production build pass.
