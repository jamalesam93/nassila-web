---
title: User guide
description: Feature reference for bibliography mode, Sanad setup, and the manuscript loop.
---

For a step-by-step walkthrough, see the [How-to guide](/en/docs/how-to).

## Main workflow

1. **Add references** — Paste or import in Bibliography mode.
2. **Resolve identifiers** — DOI, PMID, or URL in the Input top row.
3. **Fix local issues** — Issues sidebar: validation, duplicates, mismatches.
4. **Verify** — Ctrl+Shift+V when online (L1 + L2, up to 200 rows).
5. **Export** — Choose CSL style, Ctrl+E.

## Passage grounding (Sanad)

Sanad checks manuscript claims against source excerpts using a **local LLM**.

### Setup

1. **Settings → Passage grounding**
2. Choose LM Studio, Ollama, vLLM, or Custom
3. Tier: **E4B** (default) or **12B** (quality)
4. Models: `nassila-sanad-e4b` / `nassila-sanad-12b`

### Unpaywall (open-access fetch)

**Settings → General → Manuscript source fetch** — enter your email once for Unpaywall API policy. Stored locally only. Not university login.

## Bibliography before manuscript audit

Organize and verify references in **Bibliography** mode first, then return to **Manuscript** and run audit.

## L1, L2, L3

| Layer | Bibliography | Manuscript |
|-------|--------------|------------|
| L1 | Registry resolution | Per cited reference |
| L2 | Metadata alignment | Per cited reference |
| L3 | — | Sanad passage grounding |

## Network

Crossref, PubMed, OpenAlex, Unpaywall (optional), Europe PMC. Sanad runs on your machine or endpoint you configure.
