#!/usr/bin/env python3
"""Run the vendored UI UX Pro Max search tool from any working directory."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path


def main() -> int:
    skill_root = Path(__file__).resolve().parents[1]
    upstream = skill_root / "vendor" / "ui-ux-pro-max" / "scripts" / "search.py"
    if not upstream.is_file():
        print(f"Missing vendored search tool: {upstream}", file=sys.stderr)
        return 2
    completed = subprocess.run([sys.executable, str(upstream), *sys.argv[1:]], check=False)
    return completed.returncode


if __name__ == "__main__":
    raise SystemExit(main())

