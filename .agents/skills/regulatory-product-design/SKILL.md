---
name: regulatory-product-design
description: Design, implement, or audit trustworthy regulatory and compliance product interfaces. Use for workflow design, design-system generation, UI implementation, visual QA, motion, accessibility, evidence presentation, risk communication, or importing a DESIGN.md reference. Do not use for pure backend, infrastructure, or legal interpretation work with no user-interface decision.
---

# Regulatory Product Design

Create interfaces that help users act on complex rules without disguising uncertainty or presenting generated interpretation as legal certainty.

## Establish context

1. Locate the repository root.
2. Read `AGENTS.md`, `docs/PRODUCT.md`, `docs/DESIGN.md`, and `docs/MOTION.md` when present.
3. Read `docs/REGULATORY-GUIDANCE.md` for screens that display sources, interpretations, conflicts, deadlines, risk, or professional review.
4. Inspect the existing stack, routes, components, tokens, tests, and application states before proposing changes. Preserve working architecture unless the task authorizes replacement.
5. If requirements conflict, prefer the user's current instruction, then project instructions, then the project design system, then this skill.

## Select the smallest operating mode

- **Discover**: clarify the user, transaction, decision, evidence, risk, and success signal before choosing a visual direction. Read [regulatory-ux.md](references/regulatory-ux.md).
- **Define**: create or revise a product-specific design system. Use the bundled search tool only as research, then record deliberate decisions in `docs/DESIGN.md`. Read [design-intelligence.md](references/design-intelligence.md).
- **Build**: write a short screen specification, implement a complete vertical workflow, and cover all relevant states. Use [screen-spec-template.md](assets/screen-spec-template.md).
- **Motion**: create or audit animation only when motion affects comprehension or feedback. Read [motion-routing.md](references/motion-routing.md), then the routed vendored workflow.
- **Reference ingestion**: import or analyze a DESIGN.md or screenshots. Read [reference-ingestion.md](references/reference-ingestion.md). Treat branded systems as inspiration, never authorization to clone.
- **Audit**: inspect a running interface and correct evidence hierarchy, usability, accessibility, responsive behavior, visual consistency, and misleading certainty. Read [quality-gates.md](references/quality-gates.md).

Do not load every reference by default.

## Core workflow

1. State the user, task, primary action, decision consequence, evidence required, and risk if the interface is wrong.
2. Map the happy path plus loading, empty, partial-data, stale-source, conflicting-source, interpretation-pending, professional-review, permission-denied, error, offline, and success states that actually apply.
3. Separate four layers in the interface: verified source evidence, system interpretation, recommended action, and human/professional judgment.
4. Write a compact screen specification before new UI code. Skip a separate spec for a trivial correction when intent is already unambiguous.
5. Reuse project tokens and components. Introduce new primitives only when a real gap exists.
6. Implement the smallest complete vertical slice. Do not substitute a polished shell for working interaction.
7. Run relevant tests, lint/build checks, and the application when available.
8. Inspect at 375, 768, 1024, and 1440 CSS pixels, plus keyboard navigation and reduced-motion behavior.
9. Compare the result with project documentation and correct clear violations before reporting completion.

## Design constraints

- Optimize for informed action, traceability, and calm confidence, not spectacle.
- Never use color alone to communicate risk, status, or source confidence.
- Show dates, jurisdiction, source identity, and freshness near consequential guidance.
- Label generated interpretation plainly. Do not visually merge it with quoted or verified source material.
- Keep conflicts and missing evidence visible; never resolve uncertainty through presentation alone.
- Reserve strong accents for primary actions and consequential warnings.
- Prefer stable, readable layouts for high-frequency work. Do not force AIDA, bento grids, randomized layouts, marketing-page patterns, or GSAP into operational screens.
- Motion must explain causality, spatial change, or completion. Frequent and keyboard-initiated actions should generally be instant.
- Meet WCAG-oriented contrast, focus, semantics, touch-target, zoom, and reduced-motion expectations.
- Do not use fake institutions, endorsements, customer evidence, citations, or accuracy claims.

## Bundled tools

For a new design direction:

```bash
python3 <skill-dir>/scripts/design_search.py "<2-5 intent terms>" --design-system -p "<project>"
```

For a focused question:

```bash
python3 <skill-dir>/scripts/design_search.py "<specific concern>" --domain ux
```

Use results as candidates, validate fit, and persist approved choices in project documentation. Never overwrite an existing design system without explicit authorization.

To preserve an exported DESIGN.md with provenance:

```bash
python3 <skill-dir>/scripts/ingest_design_md.py <source-design.md> <project-root> --name <reference-name> --source-url <url>
```

## Delivery

Report the completed workflow, material design decisions, evidence/risk states covered, tests and viewport/accessibility checks, and remaining questions requiring the product owner or policy professional.

Do not claim visual verification unless the interface was actually rendered and inspected.
