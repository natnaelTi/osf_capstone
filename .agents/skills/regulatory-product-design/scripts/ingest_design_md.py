#!/usr/bin/env python3
"""Preserve an external DESIGN.md as a provenance-labeled project reference."""

from __future__ import annotations

import argparse
import datetime as dt
import re
from pathlib import Path


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    if not slug:
        raise ValueError("Reference name must contain a letter or number")
    return slug


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("source", type=Path)
    parser.add_argument("project_root", type=Path)
    parser.add_argument("--name", required=True)
    parser.add_argument("--source-url", required=True)
    parser.add_argument("--captured", default=dt.date.today().isoformat())
    args = parser.parse_args()

    source = args.source.resolve()
    if not source.is_file():
        parser.error(f"Source file does not exist: {source}")

    destination_dir = args.project_root.resolve() / "docs" / "reference-designs"
    destination_dir.mkdir(parents=True, exist_ok=True)
    destination = destination_dir / f"{slugify(args.name)}.md"
    if destination.exists():
        parser.error(f"Destination exists; refusing to overwrite: {destination}")

    original = source.read_text(encoding="utf-8")
    header = (
        "---\n"
        f"reference_name: {args.name!r}\n"
        f"source_url: {args.source_url!r}\n"
        f"captured: {args.captured!r}\n"
        "authority: inspiration-only\n"
        "---\n\n"
        "> This is an imported visual reference, not the project's authoritative design system.\n"
        "> Validate accessibility, licensing, responsiveness, and product fit before adopting any decision.\n\n"
    )
    destination.write_text(header + original, encoding="utf-8")
    print(destination)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
