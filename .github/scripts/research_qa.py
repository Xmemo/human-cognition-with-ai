#!/usr/bin/env python3
"""Deterministic QA for Human Cognition with AI weekly research artifacts.

This script deliberately checks invariants rather than scientific truth. Open-world
research judgment remains the responsibility of the research agent and human review.
"""

from __future__ import annotations

import json
import os
import re
import subprocess
import sys
from collections import Counter
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
WEEKLY_ROOT = ROOT / "weekly"
GAP_LEDGER = ROOT / "methodology" / "open-questions-research-gaps.md"
CUTOFF = date(2026, 8, 29)
RADARS = {f"R{i}" for i in range(1, 10)}
COVERAGE_LEVELS = {"HIGH", "MEDIUM", "LOW"}
TEMPORAL = {"NEW", "NEWLY_INDEXED", "NEWLY_DISCOVERED"}
GRADES = {"A", "B", "C", "S"}
GAP_BUCKETS = {"newly_exposed", "persistent", "narrowed", "closed"}

errors: list[str] = []
notices: list[str] = []


def fail(message: str) -> None:
    errors.append(message)


def notice(message: str) -> None:
    notices.append(message)


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except FileNotFoundError:
        fail(f"Missing required file: {path.relative_to(ROOT)}")
        return ""


def load_json(path: Path) -> dict:
    try:
        data = json.loads(read_text(path))
    except json.JSONDecodeError as exc:
        fail(f"Invalid JSON in {path.relative_to(ROOT)}: {exc}")
        return {}
    if not isinstance(data, dict):
        fail(f"Manifest must be a JSON object: {path.relative_to(ROOT)}")
        return {}
    return data


def parse_run_date(raw: str, context: str) -> date | None:
    try:
        return date.fromisoformat(raw)
    except (TypeError, ValueError):
        fail(f"{context}: invalid ISO run_date {raw!r}")
        return None


def known_gap_ids() -> set[str]:
    text = read_text(GAP_LEDGER)
    return set(re.findall(r"^##\s+(G\d{2,3})\b", text, flags=re.MULTILINE))


def validate_manifest(path: Path, gap_ids: set[str]) -> None:
    data = load_json(path)
    if not data:
        return

    match = re.fullmatch(r"(\d{4}-\d{2}-\d{2})\.evidence\.json", path.name)
    if not match:
        fail(f"Unexpected evidence manifest filename: {path.relative_to(ROOT)}")
        return
    run_date = match.group(1)
    parsed = parse_run_date(data.get("run_date"), str(path.relative_to(ROOT)))
    if parsed and data.get("run_date") != run_date:
        fail(f"{path.name}: run_date must match filename date {run_date}")

    required = {
        "manifest_version", "run_date", "retrofitted", "editorial_languages",
        "retrieval_layers", "coverage", "baseline_compared_to",
        "baseline_decision", "new_baseline", "items", "gap_changes",
    }
    missing = required - data.keys()
    if missing:
        fail(f"{path.name}: missing required fields: {sorted(missing)}")

    if data.get("manifest_version") != "1.0":
        fail(f"{path.name}: manifest_version must be '1.0'")
    if data.get("editorial_languages") != ["en", "zh-CN"]:
        fail(f"{path.name}: editorial_languages must be exactly ['en', 'zh-CN']")
    if data.get("retrieval_layers") != ["CONSENSUS", "FRESHNESS", "FRONTIER"]:
        fail(f"{path.name}: all three retrieval layers must be frozen in canonical order")

    coverage = data.get("coverage")
    if not isinstance(coverage, dict) or set(coverage) != RADARS:
        fail(f"{path.name}: coverage must contain exactly R1..R9")
    elif any(value not in COVERAGE_LEVELS for value in coverage.values()):
        fail(f"{path.name}: coverage values must be HIGH/MEDIUM/LOW")

    baseline = data.get("baseline_compared_to")
    if not isinstance(baseline, str) or not re.fullmatch(
        r"research/baseline-\d{4}-\d{2}-\d{2}\.en\.md", baseline
    ):
        fail(f"{path.name}: baseline_compared_to must point to a dated English baseline")
    elif not (ROOT / baseline).exists():
        fail(f"{path.name}: baseline_compared_to does not exist: {baseline}")

    decision = data.get("baseline_decision")
    if decision not in {"NO_CHANGE", "NEW_BASELINE"}:
        fail(f"{path.name}: baseline_decision must be NO_CHANGE or NEW_BASELINE")
    new_baseline = data.get("new_baseline")
    if decision == "NO_CHANGE" and new_baseline is not None:
        fail(f"{path.name}: NO_CHANGE requires new_baseline=null")
    if decision == "NEW_BASELINE":
        if not isinstance(new_baseline, str):
            fail(f"{path.name}: NEW_BASELINE requires a new_baseline path")
        elif not (ROOT / new_baseline).exists():
            fail(f"{path.name}: declared new baseline does not exist: {new_baseline}")

    year = run_date[:4]
    en_path = WEEKLY_ROOT / year / f"{run_date}.en.md"
    zh_path = WEEKLY_ROOT / year / f"{run_date}.zh-CN.md"
    en = read_text(en_path)
    zh = read_text(zh_path)
    retrofitted = data.get("retrofitted") is True

    items = data.get("items")
    if not isinstance(items, list) or not (1 <= len(items) <= 12):
        fail(f"{path.name}: items must contain 1..12 selected evidence records")
        items = []

    source_ids: list[str] = []
    dois: list[str] = []
    for idx, item in enumerate(items, 1):
        context = f"{path.name} item {idx}"
        if not isinstance(item, dict):
            fail(f"{context}: item must be an object")
            continue
        for key in (
            "source_id", "canonical_title", "publication_date", "temporal_status",
            "radars", "evidence_grade", "item_type", "doi", "canonical_url",
        ):
            if key not in item:
                fail(f"{context}: missing {key}")

        source_id = item.get("source_id")
        title = item.get("canonical_title")
        pub_date = item.get("publication_date")
        temporal = item.get("temporal_status")
        radars = item.get("radars")
        grade = item.get("evidence_grade")
        doi = item.get("doi")
        url = item.get("canonical_url")

        if not isinstance(source_id, str) or len(source_id) < 3:
            fail(f"{context}: invalid source_id")
        else:
            source_ids.append(source_id.lower())
        if not isinstance(title, str) or len(title.strip()) < 5:
            fail(f"{context}: invalid canonical_title")
        if not isinstance(pub_date, str) or not re.fullmatch(r"\d{4}(-\d{2}-\d{2})?", pub_date):
            fail(f"{context}: publication_date must be YYYY or YYYY-MM-DD")
        if temporal not in TEMPORAL:
            fail(f"{context}: invalid temporal_status {temporal!r}")
        if not isinstance(radars, list) or not radars or len(radars) != len(set(radars)) or not set(radars) <= RADARS:
            fail(f"{context}: radars must be a unique non-empty subset of R1..R9")
        if grade not in GRADES:
            fail(f"{context}: evidence_grade must be A/B/C/S")
        if not isinstance(url, str) or not url.startswith("https://"):
            fail(f"{context}: canonical_url must be HTTPS")

        if doi is not None:
            if not isinstance(doi, str) or not re.fullmatch(r"10\.\d{4,9}/\S+", doi, flags=re.IGNORECASE):
                fail(f"{context}: invalid DOI {doi!r}")
            else:
                dois.append(doi.lower())
                if isinstance(source_id, str) and source_id.lower().startswith("doi:") and source_id[4:].lower() != doi.lower():
                    fail(f"{context}: source_id DOI and doi field disagree")
                for language, text in (("EN", en), ("ZH", zh)):
                    if doi.lower() not in text.lower():
                        fail(f"{context}: DOI missing from {language} weekly edition")

        # v1 was introduced after the 2026-08-29 refresh. Retrofitted manifests only
        # prove source identity. New manifests must also prove bilingual title/grade/radar parity.
        if not retrofitted and isinstance(title, str):
            for language, text in (("EN", en), ("ZH", zh)):
                pos = text.find(title)
                if pos < 0:
                    fail(f"{context}: canonical English paper title missing verbatim from {language} edition")
                    continue
                window = text[pos: pos + 2400]
                if grade in GRADES and f"[{grade}]" not in window:
                    fail(f"{context}: evidence grade [{grade}] not found near title in {language} edition")
                if isinstance(radars, list):
                    missing_radars = [radar for radar in radars if radar not in window]
                    if missing_radars:
                        fail(f"{context}: radars {missing_radars} not found near title in {language} edition")

    duplicate_ids = [value for value, count in Counter(source_ids).items() if count > 1]
    if duplicate_ids:
        fail(f"{path.name}: duplicate source_id values: {duplicate_ids}")
    duplicate_dois = [value for value, count in Counter(dois).items() if count > 1]
    if duplicate_dois:
        fail(f"{path.name}: duplicate DOI values: {duplicate_dois}")

    gap_changes = data.get("gap_changes")
    if not isinstance(gap_changes, dict) or set(gap_changes) != GAP_BUCKETS:
        fail(f"{path.name}: gap_changes must contain exactly {sorted(GAP_BUCKETS)}")
    else:
        all_gap_refs: list[str] = []
        for bucket, values in gap_changes.items():
            if not isinstance(values, list) or len(values) != len(set(values)):
                fail(f"{path.name}: gap_changes.{bucket} must be a unique array")
                continue
            for gap_id in values:
                if not isinstance(gap_id, str) or not re.fullmatch(r"G\d{2,3}", gap_id):
                    fail(f"{path.name}: invalid gap id in {bucket}: {gap_id!r}")
                elif gap_id not in gap_ids:
                    fail(f"{path.name}: gap id {gap_id} is not present in the canonical gap ledger")
                all_gap_refs.append(gap_id)
        dup_gap_refs = [value for value, count in Counter(all_gap_refs).items() if count > 1]
        if dup_gap_refs:
            fail(f"{path.name}: a gap cannot appear in multiple change buckets: {dup_gap_refs}")

    if not retrofitted:
        if "Open Questions & Research Gaps" not in en:
            fail(f"{en_path.relative_to(ROOT)}: missing required Open Questions & Research Gaps section")
        if "Open Questions & Research Gaps｜开放问题与研究缺口" not in zh:
            fail(f"{zh_path.relative_to(ROOT)}: missing required Chinese Open Questions & Research Gaps section")


def validate_manifest_cutover() -> None:
    gap_ids = known_gap_ids()
    en_files = sorted(WEEKLY_ROOT.glob("*/????-??-??.en.md"))
    eligible: list[str] = []
    for en_path in en_files:
        run_date = en_path.name.removesuffix(".en.md")
        parsed = parse_run_date(run_date, str(en_path.relative_to(ROOT)))
        if not parsed or parsed < CUTOFF:
            continue
        eligible.append(run_date)
        manifest = en_path.with_name(f"{run_date}.evidence.json")
        zh = en_path.with_name(f"{run_date}.zh-CN.md")
        if not zh.exists():
            fail(f"Missing Chinese pair for {en_path.relative_to(ROOT)}")
        if not manifest.exists():
            fail(f"Missing frozen evidence manifest for {en_path.relative_to(ROOT)}")
            continue
        validate_manifest(manifest, gap_ids)
    notice(f"Manifest cutover checked {len(eligible)} weekly run(s) from {CUTOFF.isoformat()} onward")


def validate_bib_deduplication() -> None:
    bib_path = ROOT / "references" / "master.bib"
    text = read_text(bib_path)
    dois = [m.strip().lower() for m in re.findall(r"\bdoi\s*=\s*[\{\"]([^}\"]+)", text, flags=re.IGNORECASE)]
    duplicates = [value for value, count in Counter(dois).items() if count > 1]
    if duplicates:
        fail(f"references/master.bib contains duplicate DOI records: {duplicates}")
    else:
        notice(f"BibTeX DOI dedupe passed ({len(dois)} DOI-bearing records)")


def changed_files_for_pr() -> list[str]:
    base_ref = os.environ.get("GITHUB_BASE_REF", "").strip()
    if not base_ref:
        return []
    try:
        output = subprocess.check_output(
            ["git", "diff", "--name-only", f"origin/{base_ref}...HEAD"],
            cwd=ROOT,
            text=True,
            stderr=subprocess.STDOUT,
        )
    except subprocess.CalledProcessError as exc:
        fail(f"Could not classify PR risk from git diff: {exc.output.strip()}")
        return []
    return sorted(line.strip() for line in output.splitlines() if line.strip())


def classify_change_risk(files: list[str]) -> str:
    if not files:
        return "NOT_APPLICABLE"

    epistemic_exact = {
        "methodology/search-protocol.md",
        "methodology/search-protocol.zh-CN.md",
        "methodology/evidence-grading.md",
        "methodology/evidence-grading.zh-CN.md",
        "methodology/research-map.md",
        "methodology/research-map.zh-CN.md",
        "methodology/publishing-policy.md",
        "methodology/publishing-policy.zh-CN.md",
        "weekly/evidence-manifest.schema.json",
        ".github/scripts/research_qa.py",
        ".github/workflows/research-qa.yml",
        "docs/architecture/weekly-research-automation.md",
        "docs/architecture/weekly-research-automation.zh-CN.md",
        "docs/architecture/bilingual-seo-policy.md",
    }
    if any(
        path in epistemic_exact
        or path.startswith("research/baseline-")
        or path.startswith("docs/architecture/evidence-observatory-and-autonomous-research-lab")
        for path in files
    ):
        return "EPISTEMIC"

    if any(
        path.startswith("methodology/open-questions-research-gaps")
        or path.startswith("topics/")
        or path.startswith("people/")
        for path in files
    ):
        return "INTERPRETIVE"

    routine_patterns = (
        re.compile(r"^weekly/\d{4}/\d{4}-\d{2}-\d{2}\.(en\.md|zh-CN\.md|evidence\.json)$"),
        re.compile(r"^references/(master-bibliography\.md|master\.bib|consensus(?:/.*)?\.md)$"),
        re.compile(r"^research/README(?:\.zh-CN)?\.md$"),
    )
    if all(any(pattern.fullmatch(path) for pattern in routine_patterns) for path in files):
        return "ROUTINE"

    # Unknown changes are deliberately not treated as routine.
    return "INTERPRETIVE"


def write_summary(risk: str, changed: list[str]) -> None:
    summary_path = os.environ.get("GITHUB_STEP_SUMMARY")
    lines = [
        "### Deterministic Research QA",
        f"- Research change risk: **{risk}**",
        f"- Errors: **{len(errors)}**",
        f"- Notices: **{len(notices)}**",
    ]
    if risk == "ROUTINE":
        lines.append("- Merge policy: eligible for automated merge only after all required checks are green.")
    elif risk in {"INTERPRETIVE", "EPISTEMIC"}:
        lines.append("- Merge policy: **human review required; do not auto-merge.**")
    if changed:
        lines.append("- Changed files used for risk classification:")
        lines.extend(f"  - `{path}`" for path in changed)
    if notices:
        lines.append("- QA notices:")
        lines.extend(f"  - {item}" for item in notices)
    if errors:
        lines.append("- QA errors:")
        lines.extend(f"  - {item}" for item in errors)
    if summary_path:
        Path(summary_path).write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("\n".join(lines))


def main() -> int:
    validate_manifest_cutover()
    validate_bib_deduplication()
    changed = changed_files_for_pr()
    risk = classify_change_risk(changed)
    notice(f"Research change risk: {risk}")
    if risk == "ROUTINE":
        notice("ROUTINE_AUTOMERGE_ELIGIBLE=true (only after all required checks are green)")
    elif risk in {"INTERPRETIVE", "EPISTEMIC"}:
        notice("HUMAN_REVIEW_REQUIRED=true")
    write_summary(risk, changed)
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
