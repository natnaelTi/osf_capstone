# Design system

## Design intent

The product should feel calm, trustworthy, precise, and action-oriented. It communicates institutional seriousness without imitating a government portal and modern intelligence without the familiar purple-gradient “AI product” aesthetic.

The interface is evidence-first: sources, assumptions, effective dates, conflicts, and action status carry more visual weight than decorative intelligence metaphors.

## Design dials

| Dial | Value | Meaning |
| --- | ---: | --- |
| Variance | 4/10 | Balanced layouts with selective asymmetry |
| Motion | 3/10 | Subtle feedback and spatial continuity |
| Density | 6/10 | Efficient professional workspace with readable grouping |

## Color tokens

These initial hackathon tokens must be tested in the implementation.

| Role | Token | Value |
| --- | --- | --- |
| Primary | `--color-primary` | `#1E3A8A` |
| Primary foreground | `--color-on-primary` | `#FFFFFF` |
| Accent/action | `--color-accent` | `#B45309` |
| Accent foreground | `--color-on-accent` | `#FFFFFF` |
| Canvas | `--color-background` | `#F8FAFC` |
| Primary text | `--color-foreground` | `#0F172A` |
| Surface | `--color-surface` | `#FFFFFF` |
| Muted surface | `--color-muted` | `#E9EEF5` |
| Muted text | `--color-muted-foreground` | `#475569` |
| Border | `--color-border` | `#CBD5E1` |
| Destructive | `--color-destructive` | `#B91C1C` |
| Focus ring | `--color-focus` | `#1D4ED8` |

Define separate semantic tokens for success, warning, conflict, information, review-required, stale, and unknown. Each status needs an icon and text label; color is supplementary.

## Typography

- Use a highly legible sans-serif for operational UI, tables, forms, and long guidance. Prefer a system stack until the implementation stack and font-loading budget are known.
- A restrained serif may be tested for major editorial headings, never dense operational content.
- Body text starts at 16px with approximately 1.5 line height.
- Metadata may be smaller but not below 12px and must retain adequate contrast.
- Use tabular numerals for dates, amounts, deadlines, and version identifiers where supported.
- Use descriptive headings; avoid ornamental labels such as “SECTION 01” or generic “Insights.”

## Spacing and layout

- Use a 4px base with an 8px primary rhythm.
- Maintain readable line lengths while allowing evidence panels and tables to expand.
- Prefer a stable application shell with clear workspace navigation.
- Use progressive disclosure for source detail; never hide the existence of evidence or uncertainty.
- Avoid excessive cards. Group by task and hierarchy.
- Use whitespace to separate decision stages, not create empty marketing-page spectacle.

## Core patterns

### Transaction intake

- Ask only for fields that change guidance.
- Explain why sensitive or unfamiliar information is needed.
- Make assumptions visible before submission.
- Support draft progress and incomplete information.

### Guidance result

Order the primary view as current situation, immediate actions/deadlines, assumptions/unresolved questions, evidence-backed explanation, sources/change history, and professional-review status.

### Obligation item

Include action, owner, due date or timing rule, status, rationale, citations, and review state. Do not hide consequential rationale in an unlabeled tooltip.

### Evidence viewer

Show source metadata, relevant passage, pinpoint, effective/retrieval dates, source-language context, and the relationship between the passage and interpretation.

### Conflict panel

Use a structured comparison. State the operational consequence and safe next step. Do not treat conflict as an ordinary toast.

### Professional review

Show the exact question, linked evidence, affected recommendation, priority, reviewer role, status, and resolution. Never imply approval without an explicit record.

## Icons and imagery

- Use one coherent SVG icon family; no emojis as functional icons.
- Prefer document previews, timelines, decision relationships, and restrained abstract textures.
- Avoid robot heads, glowing brains, scales of justice, handshake stock photos, and fake institutional seals.

## Responsive behavior

- Mobile prioritizes transaction status, immediate actions, and deadlines.
- Secondary evidence metadata may move into a drawer or disclosure but remains reachable.
- Tables become structured cards only when relationships remain understandable.
- Touch targets are at least 44×44 CSS pixels.
- Check 375, 768, 1024, and 1440 CSS pixels; never disable zoom.

## Accessibility

- Meet at least 4.5:1 contrast for normal text.
- Provide visible focus and logical keyboard order.
- Use semantic headings, landmarks, labels, validation summaries, and live-region announcements where appropriate.
- Do not rely on hover or color alone.
- Respect `prefers-reduced-motion`.
- Pair plain-language summaries with access to precise regulatory terminology.

## Avoid

- purple/pink AI gradients or illegible glassmorphism;
- fake precision or unsupported confidence scores;
- hidden citations or walls of legal text without action summaries;
- excessive pill badges or decorative dashboards;
- cloned brand systems, proprietary logos, or proprietary fonts;
- animation on high-frequency checklist and data-entry actions.

