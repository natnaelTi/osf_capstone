# Design intelligence routing

The bundled UI UX Pro Max search data is a research aid, not a decision authority.

## Use

- New product/system: `scripts/design_search.py "<product industry qualities>" --design-system -p "<name>"`
- Focused accessibility or UX concern: add `--domain ux`.
- Typography, color, charts, icons, motion, or product patterns: choose the matching domain.
- Known framework: add `--stack <detected-stack>`; never assume a stack.

Keep queries to one dominant intent and 2–5 meaningful terms. Retry once with a narrower query when output is empty or irrelevant. Do not persist unverified output.

## Adaptation rules

- Product requirements and evidence risks outrank style recommendations.
- Translate raw colors into semantic tokens and test contrast.
- Treat font recommendations as candidates; verify licensing, language coverage, loading cost, and readability.
- Reject product patterns that hide evidence, uncertainty, or high-frequency work behind marketing conventions.
- Record accepted decisions in `docs/DESIGN.md`; do not make the search output the permanent source of truth.

## Taste principles retained

Use deliberate hierarchy, varied but coherent composition, readable heading widths, meaningful imagery, disciplined spacing, complete interaction states, and a final visual audit. Reject forced randomization, universal AIDA structure, mandatory bento grids, mandatory GSAP, extreme whitespace, and novelty that harms operational use.

