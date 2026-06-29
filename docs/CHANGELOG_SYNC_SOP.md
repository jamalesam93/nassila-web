# Changelog sync SOP (nassila-web)

How to curate the public site changelog from the Nassila desktop repo.

## Source

- **Canonical:** [`Nassila/CHANGELOG.md`](https://github.com/jamalesam93/Nassila/blob/main/CHANGELOG.md)
- **Targets:** `content/changelog/en.md` and `content/changelog/ar.md`

## When to sync

- After each Nassila release tagged on GitHub
- When website docs reference a new version (README, download page)

## Strip (never publish on the website)

Remove or rewrite bullets that are:

- **SEC-* / security fix plan** internals (keep user-visible security *outcomes* only if already phrased for users)
- **Unit tests**, CI, checkpoints, harness names, eval scores
- **Training / corpus / QLoRA / NassilaT** methodology, go/no-go gates, adapter names
- **Maintainer-only** paths (`docs/SECURITY-FIX-PLAN.md`, dead-code, agent rules)
- **Unreleased** empty sections

## Include (user-visible)

- New UI surfaces and workflows (Manuscript loop, Bibliography bridge, Sanad setup)
- Import/export/parser fixes users would notice
- Verify/registry behavior changes
- Performance or polish users see (sticky headers, PDF headings)
- Breaking changes to shortcuts or menus (rare)

## Format

- Headings: `## [version] — YYYY-MM-DD · Codename` for releases with a worker-themed subtitle (e.g. `## [1.1.2] — 2026-06-27 · Raqim Bridge`). Patch releases without a codename may omit the subtitle.
- Use `### Added`, `### Fixed`, `### Changed` subsections
- End with link: `[Full history on GitHub](https://github.com/jamalesam93/Nassila/blob/main/CHANGELOG.md)`
- Arabic file: same structure, translated prose; version numbers unchanged
- **Arabic release codenames** use product-layer names from `lib/release-train.ts` (`codenameAr`), e.g. **مِعبر رقيم** (1.1.2), **المَراجع أولاً** (1.1.1), **سَنَد** (1.1.0), **تهذيب** (1.1.3), **موجز مصدر** (1.2.0). English codenames stay in `en.md` headings.
- **Worker terms** in Arabic prose follow the fixed glossary (سند، رقيم، …) — do not conflate worker names with release codenames or manuscript mode (**المخطوطة**).
- When syncing, update `lib/release-train.ts` `CURRENT_RELEASE` if the latest shipped version changed

## Example strip

| Repo bullet | Website |
|-------------|---------|
| `Unit tests: bibliography-bridge` | Omit |
| `Security (SEC-01–07): … see SECURITY-FIX-PLAN` | Omit or → "Security hardening for LLM and OA fetch paths" |
| `Ship checkpoints: nassila-sanad-e4b v1.12 (NassilaT)` | Omit |

## Checklist

1. Read new section(s) in Nassila `CHANGELOG.md`
2. Apply strip rules above
3. Update `content/changelog/en.md`
4. Mirror meaning in `content/changelog/ar.md`
5. `npm run build` in nassila-web
6. Deploy
