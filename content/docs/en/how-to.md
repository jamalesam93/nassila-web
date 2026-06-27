---
title: How-to guide
description: Walk through Nassila's main window, adding references, verification, and export.
---

Nassila is a desktop app for building a reference list, validating it against CSL rules, running a **unified registry check** (L1 + L2), and exporting a formatted bibliography.

**Typical flow:** paste or import → resolve IDs if needed → fix validation/duplicate issues → **Verify** (online) → pick a CSL style → **Export**.

## The window at a glance

| Area | Role |
|------|------|
| **Header** | Mode switch (Manuscript / Bibliography), citation/issue summary, Import, Export, Verify, Autocorrect |
| **Input** | Paste plain text, BibTeX, RIS, or CSL-JSON; resolve DOI / PMID / URL |
| **Output** | One row per reference with formatted preview, type badge, and status chips |
| **Issues** | Validation errors, duplicate groups, registry mismatch cards |
| **Style sidebar** | Choose target journal or CSL style |

## Adding references

### Paste text

Paste **plain-text references**, **BibTeX**, **RIS**, or **CSL-JSON** into the Input panel and parse into rows.

- Mixed plain-text lists work; the parser uses heuristics (DOI, journal cues, URLs).
- Prefer structured imports (`.bib`, `.ris`, `.json`) when available.

### Resolve identifiers

Paste a **DOI**, **PMID**, **URL**, or one identifier per line, then **Resolve**. Metadata comes from Crossref, PubMed/NCBI, or Open Library.

### Import files

**Ctrl+I** — supported: `.bib`, `.ris`, `.json`, `.docx`, `.pdf`.

## Verifying references (L1 + L2)

Run **Verify references** from the toolbar or **Ctrl+Shift+V** when online.

- **L1** — anchor the reference to Crossref, PubMed, or OpenAlex.
- **L2** — compare your fields to the canonical record (up to **200 rows** per run).

Remaining differences appear as **mismatch cards** in Issues — click to jump to the row.

## Export

Pick a **CSL style** in the sidebar, then **Export** (**Ctrl+E**) or **Export CSL JSON** (**Ctrl+Shift+E**).

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+I | Import |
| Ctrl+E | Export bibliography |
| Ctrl+Shift+V | Verify references |
| Ctrl+Shift+A | Autocorrect |
| Ctrl+Shift+U | Detect duplicates |

## Offline use

Parsing, editing, validation, and export work offline. **Verify** and **Resolve** require connectivity.
