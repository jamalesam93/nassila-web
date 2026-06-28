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
