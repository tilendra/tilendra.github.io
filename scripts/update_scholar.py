#!/usr/bin/env python3
"""
Fetch current Google Scholar stats and update _pages/about.md.

Usage:
    pip install scholarly
    python scripts/update_scholar.py

Run manually or via the GitHub Action at
.github/workflows/update-scholar-stats.yml (fires on the 1st of each month).
"""

import re
import sys
from datetime import datetime
from pathlib import Path

SCHOLAR_ID = "7YiBBC8AAAAJ"
ABOUT_MD = Path(__file__).parent.parent / "_pages" / "about.md"


def fetch_stats(scholar_id: str) -> dict:
    try:
        from scholarly import scholarly
    except ImportError:
        print("scholarly not installed. Run: pip install scholarly", file=sys.stderr)
        sys.exit(1)

    print(f"Fetching stats for Scholar ID: {scholar_id}")
    author = scholarly.search_author_id(scholar_id)
    author = scholarly.fill(author, sections=["basics", "indices"])
    return {
        "h_index": author["hindex"],
        "i10_index": author["i10index"],
        "citations": author["citedby"],
    }


def patch_about(stats: dict, path: Path) -> None:
    content = path.read_text()
    month_year = datetime.now().strftime("%b %Y")

    content = re.sub(r"h-index: <b>\d+</b>", f"h-index: <b>{stats['h_index']}</b>", content)
    content = re.sub(r"i10-index: <b>\d+</b>", f"i10-index: <b>{stats['i10_index']}</b>", content)
    content = re.sub(r"Citations: <b>\d+</b>", f"Citations: <b>{stats['citations']}</b>", content)
    content = re.sub(r"Last updated: \w+ \d{4}", f"Last updated: {month_year}", content)

    path.write_text(content)
    print(
        f"Updated about.md — h-index: {stats['h_index']}, "
        f"i10-index: {stats['i10_index']}, citations: {stats['citations']}, "
        f"date: {month_year}"
    )


if __name__ == "__main__":
    stats = fetch_stats(SCHOLAR_ID)
    patch_about(stats, ABOUT_MD)
