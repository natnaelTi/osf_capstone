# Wayfinder

Wayfinder is a hackathon proof of concept for evidence-backed regulatory action guidance. The primary demo follows an Ethiopian technology business receiving foreign payment for exported digital services and turns the transaction into traceable obligations, deadlines, actions, and professional-review questions.

The current regulatory records are explicitly synthetic. They demonstrate provenance, conflict handling, source changes, and selective human review; they are not legal or tax advice.

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

1. Review the prefilled service-export transaction.
2. Confirm or leave open the material assumptions.
3. Generate the action plan.
4. Open citations from individual obligations.
5. Visit the review queue to inspect the unresolved evidence conflict.
6. Record the demo resolution.
7. Open audit history to see the transaction, guidance, evidence, and review events separately.

## Project guidance

- `AGENTS.md` contains repository-wide Codex instructions.
- `docs/PRODUCT.md` defines product scope.
- `docs/REGULATORY-GUIDANCE.md` defines evidence and review boundaries.
- `docs/DESIGN.md` and `docs/MOTION.md` define the interface system.
- `docs/FOUNDATION-AUDIT.md` records the greenfield architecture decision and deferred gaps.
- `.agents/skills/regulatory-product-design/` is the reusable Codex skill.
