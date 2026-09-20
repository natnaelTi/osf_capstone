#!/usr/bin/env python3
"""Validate the expected project-design setup and core document sections."""

from __future__ import annotations

import sys
from pathlib import Path


REQUIRED = {
    "AGENTS.md": ["Mission", "Definition of done"],
    "docs/PRODUCT.md": ["Primary user", "Review model", "Non-goals", "Success criteria"],
    "docs/DESIGN.md": ["Design intent", "Accessibility", "Avoid"],
    "docs/MOTION.md": ["Frequency gate", "Reduced motion"],
    "docs/REGULATORY-GUIDANCE.md": ["Information classes", "Review required", "Conflict behavior"],
}


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    errors: list[str] = []
    for relative, headings in REQUIRED.items():
        path = root / relative
        if not path.is_file():
            errors.append(f"missing {relative}")
            continue
        text = path.read_text(encoding="utf-8")
        for heading in headings:
            if heading.lower() not in text.lower():
                errors.append(f"{relative}: missing section containing {heading!r}")
    skill = root / ".agents" / "skills" / "regulatory-product-design" / "SKILL.md"
    if not skill.is_file():
        errors.append("missing repository skill")
    if errors:
        print("Setup validation failed:")
        for error in errors:
            print(f"- {error}")
        return 1
    print("Setup validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

