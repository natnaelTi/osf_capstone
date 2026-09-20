# AI-assisted build log

Wayfinder was designed and implemented with Codex as the AI software-development tool for the OSF × Andela hackathon. The capstone problem and product direction originated from the project owner’s firsthand experience with delayed and fragmented Ethiopian policy information.

## Human-owned decisions

- Selected the Transparency & Accountability track.
- Identified the policy-access and regulatory-change problem from direct experience.
- Chose Ethiopian software/service exporters as the primary proof-of-concept user.
- Prioritized current-rule verification, evidence-backed actions, personalized obligations, professional escalation, and rule comparison.
- Required public source access, role-based workspaces, subscription tiers, and selective human review.
- Chose goods exports as a secondary horizontal-expansion path.

## AI-assisted work

| Stage | Codex contribution | Human control retained |
| --- | --- | --- |
| Product discovery | Structured critical questions, pressure-tested scope, and identified risks | User selected the problem, users, priorities, and tradeoffs |
| Source research | Located primary NBE and Ministry of Justice materials and identified a demonstrable version conflict | Legal meaning remains subject to professional validation |
| Architecture | Proposed the evidence/version/applicability/action/review model | User approved product scope and role/tier requirements |
| Implementation | Generated React/TypeScript components, fixtures, responsive CSS, and interaction logic | User reviews product direction and final submission claims |
| Quality | Generated tests, lint/build fixes, accessibility states, and audit findings | Policy professional must validate high-impact guidance |

## Guardrails applied

- Official publications remain linked and visible.
- Source evidence, system interpretation, recommended action, and professional judgment are labeled separately.
- The product does not claim legal certainty or regulator endorsement.
- Tax treatment is held for professional review rather than inferred from foreign-exchange guidance.
- Public source access remains available without a subscription.

## Verification commands

```bash
npm test
npm run lint
npm run build
python3 .agents/skills/regulatory-product-design/scripts/validate_project_setup.py .
```
