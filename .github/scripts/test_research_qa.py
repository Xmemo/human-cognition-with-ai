#!/usr/bin/env python3
"""Small deterministic self-test for Research QA risk classification."""

from research_qa import classify_change_risk


def main() -> None:
    cases = [
        (
            [
                "weekly/2026/2026-09-04.en.md",
                "weekly/2026/2026-09-04.zh-CN.md",
                "weekly/2026/2026-09-04.evidence.json",
                "references/master.bib",
                "references/master-bibliography.md",
                "references/consensus/2026-09-04.md",
            ],
            "ROUTINE",
        ),
        (["methodology/open-questions-research-gaps.md"], "INTERPRETIVE"),
        (["research/baseline-2026-09-04.en.md"], "EPISTEMIC"),
        (["some-new-unclassified-research-file.md"], "INTERPRETIVE"),
    ]
    for files, expected in cases:
        actual = classify_change_risk(files)
        assert actual == expected, f"risk classification regression: {files} -> {actual}, expected {expected}"
    print(f"Research QA risk classifier self-test passed ({len(cases)} cases).")


if __name__ == "__main__":
    main()
