## [1.10.0] — 2026-08-22 · Masdar Papers

### Added

- **Bibliography dedupe** — duplicate references (same DOI, or same title + year) collapse into one audit finding, with citation sites from both numbers preserved. Title-only look-alikes are flagged ambiguous instead of silently merged; Sharh-lite shows the dedupe outcome when it did work.
- **Attach papers by folder** — point the Manuscript loop at a folder of source PDFs: Nassila scans it (up to 200 files, 50 MB each), matches each PDF to your references by first-page DOI or title, and after your confirmation attaches and re-audits only the matched references.
- **Targeted re-audit for multiple refs** — after attaching papers, one run re-grounds exactly the selected entries while other findings stay in place.

### Changed

- **Raqim Resolve works again for titles and URLs** — Resolve previously returned only a placeholder card for paper landing pages and silently dropped moderate title matches. URL rows now search Crossref / PubMed / OpenAlex / DataCite, and title matches with reasonable similarity surface again.
- **Resolve panel field prefill** — switching between DOI / PMID / PMCID / URL / title auto-copies that value from the row into the search box (without overwriting what you typed), and Verify shows exactly which identifier it searched.
- **Honest Wayback links** — the unconditional `[Wayback ↗]` on every URL row is gone. The Resolve panel now links to the Wayback Machine only when a snapshot actually exists, straight to that snapshot.

## [1.8.0] — 2026-08-13 · Sanad 9B

### Added

- **Qwen3.5 thinking handling** — `stripQwenThinkingTraces` runs first in the grounding JSON repair pipeline, so thinking-wrapped model output (with braces/quotes inside the reasoning) parses identically to clean JSON, and clean output passes through byte-identical.
- **Token budget** — `max_tokens: 2048` is sent for Sanad 9B grounding calls to prevent mid-JSON truncation from thinking traces.
- **No-thinking template on the web** — the `--chat-template-file` template for llama.cpp users lives in the [Sanad setup guide](/docs/sanad-setup); the Custom provider preset links there.
- **Sole-tier Sanad registry** — `nassila-sanad-9b` (9B FT-5) is the only Sanad tier: single 9B tier chip; setup modal, presets, hints, and defaults all point at the 9B model. 4B S15 / 12B S14 / E4B S12 retired (abstract-era).

### Changed

- **Sanad default model** — fresh installs default to `nassila-sanad-9b` in LM Studio / Ollama / vLLM presets.

## [1.7.0] — 2026-08-10 · Integrity Bundle

### Added

- **Structured DOCX manuscript import** — Word documents now import with real structure preserved: paragraph blocks plus a heading side-channel (Heading1–6) for smarter segmentation. Bibliography DOCX parsing is unchanged.
- **Dirty-close warning** — closing the window with unsaved work asks for confirmation before the session is lost.
- **Preflight+ mapping breakdown** — Sharh-lite shows matched / ambiguous / unmatched citation counts alongside the coverage percentage.
- **Trust & packaging hardening** — audit rate limiting under concurrency, mid-LLM cancel via `AbortSignal`, and packaged smoke gates on release trains.

## [1.6.0] — 2026-08-05 · Maktab Loop

### Added

- **Maktab OCR golden fixtures** — generated PDF suite (text + scan pages) with byte-level goldens and a real-Tesseract OCR probe in the Windows CI packaging job.
- **Cache controls** — Settings → Storage: inspect and clear the source-artifact and Maktab extraction caches.
- **Review-after-import banner** — a dismissible notice in the loop when PDF import extraction needs human attention.
- **Deterministic Sharh summaries** — richer aggregate coverage/passage/claim summaries with a localized headline and per-finding copy (EN/AR).
- **Masdar source-PDF attach** — attach a local PDF for any cited source and re-ground just that reference (single-reference re-audit).
- **RTL acceptance pass** — swept layout-direction strays to logical utilities across panels and settings.

## [1.5.0] — 2026-07-29 · Raqim Web

### Added

- **Maktab Tier A Rust WASM Engine** — integrated `@firecrawl/pdf-inspector-wasm` into PDF manuscript extraction. Accelerates text-based PDF ingest by 10–20× (~10–50ms execution), extracts Markdown headings (`# Intro`) and vector/heuristic Markdown tables (`| ... |`), with fallback to `pdfjs-dist` and Tesseract OCR.
- **Raqim Web metadata resolver** — deterministic webpage metadata resolution (`webpage-metadata.ts`) extracting Open Graph (`og:*`), Dublin Core (`dc.*`), Schema.org JSON-LD, and HTML meta tags.
- **Host-specific platform extractors** — structured title/publisher extraction for GitHub repositories (`owner/repo`), Kaggle datasets, Hugging Face models/datasets, Substack, Medium, and YouTube videos.
- **Wayback Machine archive integration** — automatic fallback link generation (`web.archive.org/web/*/${url}`) and `[Wayback ↗]` action on webpage URL citations.
- **IPC bridge** — `registry:resolveWebpageMetadata` exposed via `window.api` for packaged Electron app parity (bypasses renderer CORS).
- **Raqim Resolve UX** — "Fetch webpage metadata" button and inline Wayback Machine archive link.
- **Parser & access date support** — plain-text parser extracts `accessed` dates and auto-classifies URL-only references as `type: 'webpage'`.

## [1.4.0] — 2026-07-21 · Raqim Statute

### Added

- **Legislation Resolve** — US federal (`congress.gov`, `govinfo.gov`, `uscode.house.gov`), UK `legislation.gov.uk`, and generic `.gov` official catalogue URLs; EU ELI from 1.3.x retained.
- **Raqim Resolve UX** — legislation-specific panel hint; provider labels for US federal, UK legislation, official catalogue, and grey-web stubs.
- **Statute import** — merge statute numbers split across PDF/DOCX lines when importing bibliography plain text.
- **Masdar chunking** — paragraph/page-aware excerpt selection with page hints on cite sites.
- **Preflight+** — citation-mapping coverage warnings; abstract-only and no-source flags.
- **Submission integrity bundle** — export JSON from Sharh-lite (preflight + evidence summary + provenance index; no manuscript body).

## [1.3.1] — 2026-07-20 · Maktab OCR hardening

### Fixed

- **OCR packaging** — on-device Enhanced OCR works reliably in Windows installers (canvas / Tesseract natives).
- **Character-reversed Arabic PDFs** — detect broken ToUnicode encoding; prefer **DOCX** instead of OCR.

### Changed

- **Arabic Tesseract deferred** — Arabic-heavy PDFs keep embedded text and warn to use **DOCX**. Enhanced OCR runs **eng/fra** only for Latin scans until vision/LLM OCR.
- **Installer size** — unused Arabic tessdata pack removed (~12 MB); Latin packs remain.

## [1.3.0] — 2026-07-20 · Sharh-lite

### Added

- **Faster manuscript audits** — main-process scheduling with live progress and reliable cancel.
- **Quote-verification chips** — see whether a supporting quote was found, separately from the Sanad claim verdict.
- **Raqim Repair** — stronger verify for PMCID, arXiv, publisher URLs, and common parser edge cases; safer handling when DOI and title disagree.
- **Raqim Resolve** — repair panel: search by title, DOI, PMID, PMCID, or URL; ranked suggestions from scholarly registries plus Hugging Face, Kaggle, and GitHub (you choose what to apply).
- **Masdar attach** — attach your own PDF for a cited reference and re-ground that source offline.
- **Projects + Help** — save/open `.nassila` projects; first-run bibliography tip; Help menu links to this website.
- **OCR language packs** — bundled English and French for scanned Latin PDFs (Arabic pack later deferred in **1.3.1**).
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
- **Scanned-PDF OCR (O1)** — on-device OCR fallback for hard-to-extract PDFs (English / French; Arabic later deferred in **1.3.1**).
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
