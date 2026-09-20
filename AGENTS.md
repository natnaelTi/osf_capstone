# Codex working agreement

## Mission

Build a credible hackathon proof of concept for an Ethiopian regulatory action navigator. The product helps technology businesses and other service exporters understand what to do when invoicing or receiving foreign payment while preserving source traceability, uncertainty, and professional-review boundaries.

## Required context

Before product or interface work, read `docs/PRODUCT.md`, `docs/REGULATORY-GUIDANCE.md`, `docs/DESIGN.md`, and `docs/MOTION.md`. Invoke `$regulatory-product-design` for discovery, interface design, implementation, motion, reference ingestion, or visual QA.

## Working rules

- Inspect the repository before editing. Preserve working routing, authentication, data models, component patterns, and build configuration unless the task explicitly changes them.
- Treat official documents as evidence, not decoration. Consequential output must retain source, jurisdiction, effective or publication date, and retrieval/version information when available.
- Never present generated interpretation as verified law or professional advice.
- Route conflicts, incomplete evidence, and high-impact interpretations to professional review.
- Keep the primary demo centered on an Ethiopian business receiving payment for exported digital services.
- Keep goods exports visible as a secondary expansion path, not part of the core implementation unless required for the demo.
- Build English first. Keep content, layout, and data structures ready for later localization; do not claim multilingual support before it exists.
- Use realistic synthetic demo data. Do not fabricate endorsements, regulator partnerships, legal certainty, or customer results.
- Implement complete relevant states: loading, empty, partial evidence, conflict, review required, error, and success.
- Reuse shared components and semantic tokens. Avoid one-off styling values in feature components.
- Run relevant tests, linting, type checks, and build commands after changes. Render and inspect interface changes when the environment supports it.

## Hackathon scope control

Prioritize a convincing end-to-end story:

1. Transaction intake for a service-export scenario.
2. Evidence-backed obligations and deadlines.
3. A practical action checklist.
4. Questions or escalation package for a lawyer or policy professional.
5. Visible source updates, conflict detection, and high-risk review.

Do not expand into unrestricted legal research, automated filing, payment processing, customs execution, or production-grade multilingual coverage during the proof of concept.

## Definition of done

- The core story works end to end with no dead controls in the demonstrated path.
- The interface distinguishes evidence, interpretation, action, and professional review.
- Citations open or reveal usable source context.
- Uncertainty and conflicts remain visible.
- Keyboard, focus, contrast, responsive layout, and reduced-motion behavior have been checked.
- Tests and the production build pass, or blockers are documented precisely.

