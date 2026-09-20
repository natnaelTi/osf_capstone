# Regulatory Navigator Codex Kit

This package is designed to become the root of the hackathon repository or to be merged into an existing repository.

## Install into the hackathon repository

1. Copy `AGENTS.md`, `docs/`, and `.agents/` into the repository root.
2. Preserve any existing instructions by merging them deliberately; do not silently replace project-specific rules.
3. Start a new Codex session from the repository root so it discovers `AGENTS.md` and `.agents/skills/`.
4. Confirm the setup:

   ```bash
   python3 .agents/skills/regulatory-product-design/scripts/validate_project_setup.py .
   ```

5. Invoke the skill explicitly for the first design task:

   ```text
   $regulatory-product-design

   Read the project documents, inspect the repository, and design the
   transaction-intake-to-action-plan vertical slice. Produce the screen
   specification before implementation and preserve the evidence and
   professional-review boundaries.
   ```

## Reuse the skill in other repositories

Copy `.agents/skills/regulatory-product-design/` into another repository's `.agents/skills/` directory. The skill remains regulatory-domain-specific; replace the project documents rather than editing the reusable workflow for ordinary project differences.

For user-wide local discovery, copy or symlink the skill folder into `$HOME/.agents/skills/`. Keep a single maintained source to avoid duplicate skills with the same name.

## Recommended first run

Use `prompts/01-foundation-audit.md`. It tells Codex to inspect the actual repository, reconcile the starter documents with the current implementation, and return a bounded vertical-slice plan without prematurely redesigning the product.

## Reference extraction

Use the Design MD Chrome extension from its official repository to export a public page. Then preserve the result as an inspiration-only reference:

```bash
python3 .agents/skills/regulatory-product-design/scripts/ingest_design_md.py \
  /path/to/exported/DESIGN.md . \
  --name "Reference name" \
  --source-url "https://source.example"
```

Review the adopt/adapt/reject decisions before changing `docs/DESIGN.md`.

## Maintenance

The bundled third-party snapshots and reviewed commits are recorded in `.agents/skills/regulatory-product-design/ATTRIBUTION.md`. Re-audit upstream changes before updating vendored scripts or references.

