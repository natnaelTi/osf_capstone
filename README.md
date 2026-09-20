# Wayfinder

Wayfinder is a hackathon proof of concept for evidence-backed regulatory intelligence and action. It helps an Ethiopian technology or service-export business identify the current applicable foreign-exchange position, understand what changed, and turn official evidence into personalized actions, deadlines, documents, and professional-review questions.

The bounded source corpus links to official National Bank of Ethiopia and Federal Ministry of Justice publications. The proof of concept remains decision support—not legal or tax advice—and all high-impact interpretations require qualified professional review.

All people, organizations, invoices, transaction values, and account scenarios shown in the interface are clearly labeled synthetic demo data. They do not represent real individuals or businesses.

## Run locally

Requirements: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open the local address printed by Vite.

## Quality checks

```bash
npm test
npm run lint
npm run build
python3 .agents/skills/regulatory-product-design/scripts/validate_project_setup.py .
```

On Windows, replace `python3` with `py -3` when necessary.

## Demo path

1. Start on the public regulatory-watch experience and inspect an official source.
2. Open demo access and enter as the Business Owner.
3. Verify the prefilled service-export transaction.
4. Review the current applicable position, trust assessment, and old-versus-current comparison.
5. Complete actions, inspect deadlines/documents, and copy the professional question package.
6. Switch to the Policy Reviewer and record the scoped resolution.
7. Switch to the Source Curator and demonstrate manual, PDF, and monitored-page ingestion.
8. Switch to Platform Administrator and inspect roles, plans, and entitlements.
9. Open audit history to see evidence, access, guidance, and review events separately.

## Implemented product surfaces

- Public regulatory updates and official source library
- Login with one-click access for five demo identities
- Role-aware business, reviewer, curator, and administration workspaces
- Subscription-plan and feature-entitlement representation
- Business profile and transaction-specific rule verification
- Current-rule conclusion and trust assessment
- Previous-versus-current rule comparison
- Personalized action, deadline, document, and escalation outputs
- Selective professional review and audit history
- Manual, document-upload, and monitored-page ingestion demonstrations

See `AI_BUILD_LOG.md` for the human/AI division of responsibility.

## Project guidance

- `AGENTS.md` contains repository-wide Codex instructions.
- `docs/PRODUCT.md` defines product scope.
- `docs/REGULATORY-GUIDANCE.md` defines evidence and review boundaries.
- `docs/DESIGN.md` and `docs/MOTION.md` define the interface system.
- `docs/FOUNDATION-AUDIT.md` records the greenfield architecture decision and deferred gaps.
- `.agents/skills/regulatory-product-design/` is the reusable Codex skill.
