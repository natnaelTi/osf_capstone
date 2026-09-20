# Reference ingestion

Use this when the user provides an extracted DESIGN.md, a website, screenshots, or a catalogue entry.

## DESIGN.md workflow

1. Preserve the original with source URL and capture date using `scripts/ingest_design_md.py`.
2. Extract transferable principles: atmosphere, semantic color roles, typography behavior, component hierarchy, layout rhythm, elevation, responsive behavior, and explicit do/don't rules.
3. Identify proprietary or risky elements: marks, trade dress, custom fonts, branded copy, product-specific workflows, and distinctive illustrations.
4. Create an adopt/adapt/reject table.
5. Update the project's `docs/DESIGN.md` only with approved, original decisions.

## Screenshot workflow

Record the source, date, viewport, intended lesson, and elements not to copy. Analyze hierarchy and interaction rather than reproducing pixels blindly.

## Catalogue workflow

The Awesome Claude Design catalogue is useful for browsing structured inspirations, but its brand-inspired systems are unofficial. Select at most a few references with a clear reason. Synthesize an original system and do not import logos, proprietary typefaces, branded copy, or distinctive trade dress.

## Chrome extractor

The Design MD Chrome extension can generate a first-pass DESIGN.md from a public page. Its output describes observable styling; it does not grant rights to reproduce the source. Validate computed values, interaction states, responsiveness, accessibility, and provenance before use.

