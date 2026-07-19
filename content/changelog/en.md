## [1.3.0] — 2026-07-20 · Sharh-lite

### Added

- **Faster manuscript audits** — main-process scheduling with live progress and reliable cancel.
- **Quote-verification chips** — see whether a supporting quote was found, separately from the Sanad claim verdict.
- **Raqim Repair** — stronger verify for PMCID, arXiv, publisher URLs, and common parser edge cases; safer handling when DOI and title disagree.
- **Raqim Resolve** — repair panel: search by title, DOI, PMID, PMCID, or URL; ranked suggestions from scholarly registries plus Hugging Face, Kaggle, and GitHub (you choose what to apply).
- **Masdar attach** — attach your own PDF for a cited reference and re-ground that source offline.
- **Projects + Help** — save/open `.nassila` projects; first-run bibliography tip; Help menu links to this website.
- **OCR language packs** — bundled English, French, and Arabic for scanned PDFs.
- **Sharh-lite** — deterministic evidence summary (claim counts and suggested next actions).

### Fixed

- Windows installer / taskbar / shortcut icons show Nassila branding correctly.
- DOCX and PDF bibliography import counts align more closely with paste (fewer merged or false-split references).

## [1.2.1] — 2026-07-17 · Masdar UX

### Added

- **Audit in-progress panel** — cited-sources table grows during the run; detail panel stays locked until the audit finishes.
- **DOI↔title conflict — manual-only** — Verify no longer auto-patches conflict rows; choose keep-title (find DOI) or keep-DOI (update title). Predatory-list sync no longer clears the yellow conflict panel.
- **Shortcuts** — Ctrl/Cmd+Enter runs audit; **Copy evidence** and **Jump to Bibliography** on findings.
- **Icon polish** — toast, network, dropdown, toolbar, and source-link affordances.

### Deferred

- Per-reference **attach PDF** and **quote-verification chips** → shipped in **1.3.0**.

## [1.2.0] — 2026-07-15 · Masdar-lite

### Added

- **Open-access PDF text in grounding** — when Unpaywall finds a PDF, Nassila extracts text for passage grounding (not abstract-only).
- **Incremental audit progress** — cited-sources table fills as each reference completes; live **N / M** progress.
- **Scanned-PDF OCR (O1)** — on-device OCR fallback for hard-to-extract PDFs (English / French / Arabic).
- **Icon system** — consistent Lucide icons for issue severity and common controls.

### Fixed

- Bibliography PDF import in development no longer fails on the pdf.js worker.
- Duplicate Online indicator removed from the status bar (header only).

## [1.1.3] — 2026-06-29 · Polish

### Added

- **Notifications** — in-app toasts for verify, autocorrect, export, and related actions; optional OS notification when a manuscript audit finishes in the background.
- **Sanad setup** — lighter in-app modal with links to the full website guide.

### Changed

- Arabic UI glossary-aligned copy across workers, modes, and panels.
- Bibliography busy state shows a clearer task-specific status strip.

### Fixed

- Windows app icon in taskbar/titlebar for dev and builds.
- Network status false Offline flapping; **Retry connection** when Offline.
- DOI↔title identity conflicts surface clearer resolution choices.
- Placeholder webpage titles like `()` replaced from fetched metadata during autocorrect.

## [1.1.2] — 2026-06-27 · Raqim Bridge

### Added

- **Bibliography bridge** — send manuscript References to Bibliography; audit from curated library with `manuscript-ref:N` cite-key preservation.

### Fixed

- **Bibliography PDF import** — manuscript-grade PDF text layout so numbered reference lists split correctly (DOCX parity).
- **Verify references (packaged app)** — unified L1+L2 runs in the main process so verification works in release builds.
- **PDF `9. References` heading** — IMRAD-style numbered reference headings on PDF export.
- **L3 rollup** — deduplicated insufficient-evidence reasons across cite sites.
- **Cited-sources table** — opaque sticky header on scroll.

### Changed

- **Loop audit detail** — compact layer summary and cite-site list.

## [1.1.1] — 2026-06-27 · Bibliography-first

### Added

- **Bibliography-first workflow** — loop hints when references should be curated before audit.
- **Bibliography DOCX import** — shared manuscript-grade reference extraction.
- **Journal search (CrossRef)** — online journal target search from Bibliography.

### Fixed

- **DOI from `https://doi.org/...` URLs** — plain-text parser populates DOI when only a doi.org link is present.
- Manuscript segmentation — numbered section headings no longer swallowed as bibliography.

### Changed

- Settings clarifies Unpaywall email is **not** university paywall login.

## [1.1.0] — 2026-06-27 · Sanad

### Added

- **Manuscript loop** — upload DOCX/PDF, run full audit (L1 registry + L2 metadata + L3 passage grounding), cited-sources table, and evidence detail.
- **Passage grounding (Sanad)** — local runners (LM Studio, Ollama, vLLM, Custom) and Cloud API; E4B / 12B tier chips; **Set up Sanad** guide modal.
- **Settings → General → Manuscript source fetch** — one-time Unpaywall email for OA full-text lookups.
- **L1 multi-registry fallback** — DOI: Crossref/DataCite → OpenAlex → PubMed; PMID: PubMed → OpenAlex.
- **DOCX references fallback** — numbered bibliography block when no `References` heading.

### Changed

- **Hydra worker tabs removed** — primary surfaces are **Manuscript loop** + **Bibliography**; Tasnif / Sharh inline in loop detail.
- **External Marker PDF CLI removed** — PDF ingest uses bundled pdf.js only.
- **OA fetch** — improved Unpaywall location handling for open-access full text.
- **L3 grounding engine** — JSON repair, retry on parse failure, passage/excerpt caps.

## [1.0.1] — 2026-06-03

### Fixed

- **More** menu closes when clicking outside or choosing an action.
- **Import** hints dismiss when the pointer leaves the button.
- **Vancouver** — citation cards show six authors then “et al.” when there are seven or more.

## [1.0.0] — 2026-05-24

### Added

- Desktop app: import and validate bibliographies (BibTeX, RIS, CSL-JSON, plain text, DOCX/PDF extraction where supported).
- Unified registry verify (Crossref, PubMed, OpenAlex): L1 resolution + L2 metadata alignment (up to 200 rows per run).
- Autocorrect, duplicate detection, predatory-journal flags, CSL export (thousands of styles).
- English and Arabic UI with bilingual product positioning.

[Full history on GitHub](https://github.com/jamalesam93/Nassila/blob/main/CHANGELOG.md)
