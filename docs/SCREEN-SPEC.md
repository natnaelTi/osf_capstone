# Judge-ready vertical slice screen specification

## Context

- **Primary user:** Owner or finance lead at an Ethiopian software or outsourcing company receiving foreign-currency service-export income.
- **Trigger:** The business hears conflicting information about foreign-exchange retention, issues an invoice, receives payment, or prepares its tax file.
- **Decision:** Which rule is current and applicable, what must the business do now, and what requires professional confirmation?
- **Consequence:** Using an authentic but superseded source can cause avoidable conversion, missing evidence, delayed filings, or costly professional research.
- **Primary action:** Verify the current rule and generate a cited action plan.
- **Evidence:** Official source identity, exact passage, effective and retrieval dates, applicability facts, amendment relationship, and professional-review status.

## Product surfaces and hierarchy

### Public home

1. Plain-language value proposition and search/verification entry.
2. Latest regulatory changes with source, date, affected audience, and status.
3. Public source library and trust-method explanation.
4. Sign-in and one-click hackathon demo access.

### Business workspace

1. Current applicable rule and why it applies.
2. Immediate actions and deadlines.
3. Required evidence/documents.
4. Assumptions and unresolved questions.
5. Previous-versus-current rule comparison.
6. Source context and professional-review status.
7. Exportable expert question package.

### Reviewer workspace

1. Exact question and operational impact.
2. Conflicting or incomplete evidence.
3. Proposed safe resolution.
4. Record professional decision and update affected guidance.

### Curator workspace

1. Monitored-source health.
2. Manual, upload, and monitored ingestion routes.
3. Extracted metadata and provisions.
4. Amendment/supersession relationship.
5. Publish or route to review.

### Platform administration

1. Monitoring-agent health, current mode, and last/next run.
2. Manual live scan and clearly labeled controlled-change demonstration.
3. Schedule, change sensitivity, review threshold, reviewer, and publication boundary.
4. Source registry with authority, jurisdiction, domain, language, URL, fingerprint health, and active state.
5. Findings split into observed evidence, AI interpretation, recommended action, and professional judgment.
6. Organizations and plan distribution.
7. Roles, permissions, subscription-tier entitlements, and audit summary.

## States

- **Loading:** Bounded processing feedback for verification and ingestion.
- **Empty:** Explain how to start; never show empty tables without an action.
- **Partial evidence:** Continue with safe guidance and identify missing evidence.
- **Conflict:** Show both propositions, dates, relationship, consequence, and safe next action.
- **Review required:** Identify reviewer role, exact question, affected output, and status.
- **Error/retry:** Preserve user inputs and offer a retry.
- **Success:** Show what changed and link to the resulting guidance or source record.
- **Permission:** Explain which role or plan enables a restricted action.

## Evidence and trust

- Display authority, official URL, pinpoint, effective date, retrieval date, source language, and version/fingerprint.
- Label source evidence, system interpretation, recommended action, and professional judgment separately.
- Never reduce trust to an unsupported percentage.
- Preserve the original source and the amendment chain.
- Keep legal/tax uncertainty visible and export it as a professional question.

## Responsive and accessible behavior

- Mobile prioritizes current rule, immediate actions, deadlines, and unresolved risk.
- Touch targets are at least 44×44 CSS pixels.
- Navigation and drawers restore focus and support Escape.
- Dynamic role, resolution, and ingestion changes are announced.
- Reduced-motion users receive the final state without non-essential transitions.

## Acceptance criteria

- [ ] A judge can enter every demo role without credentials.
- [ ] The business flow establishes the current rule before showing actions.
- [ ] Transaction/profile facts visibly affect the guidance.
- [ ] Previous and current rules are compared side by side.
- [ ] Every consequential output exposes evidence and freshness.
- [ ] Reviewer resolution updates the business guidance and audit trail.
- [ ] Curator ingestion demonstrates manual, upload, and monitored routes.
- [ ] Administrator view demonstrates roles and subscription entitlements.
- [ ] Administrator can configure the bounded agent and its monitored sources.
- [ ] A live scan or controlled fixture produces an auditable run and a human-review finding.
- [ ] Controlled demonstration content is never presented as a real regulator publication.
- [ ] Public visitors can access updates and sources without signing in.
- [ ] The primary demo contains no dead controls.
