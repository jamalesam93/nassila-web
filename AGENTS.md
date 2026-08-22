# AGENTS.md — nassila-web

Public marketing and documentation site for [Nassila](https://github.com/jamalesam93/Nassila) — bilingual (EN/AR), Next.js, Vercel.

<!-- BEGIN:nextjs-agent-rules -->
## Next.js note

This is NOT the Next.js you know — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Nassila workspace (3 repos)

Agents often open **one** folder. Treat these as one product surface:

| Repo | Local path | Role |
|------|------------|------|
| **Nassila** | `E:\Cursor Projects\Nassila` | Electron app (engine + UI) |
| **NassilaT** | `E:\Cursor Projects\NassilaT` | Sanad training, eval, Hub publish |
| **nassila-web** (this repo) | `E:\Cursor Projects\nassila-web` | Public site + docs (EN/AR) |

### Session start — read `codebase.txt`

Before non-trivial work, load context from **all three** Repomix snapshots (grep/search; do not read whole files unless needed):

| Repo | Snapshot |
|------|----------|
| Nassila | `Nassila/codebase.txt` |
| NassilaT | `NassilaT/codebase.txt` |
| nassila-web | `nassila-web/codebase.txt` |

- **Read-only:** never edit `codebase.txt`; change source files and regenerate when stale.

### Cross-repo documentation sync

When the user asks to **update docs**, **announce a release**, or change **user-visible product facts**, update **every affected layer** — not just this repo.

| Topic | Canonical (start here) | Also update (this repo) |
|-------|------------------------|-------------------------|
| Shipped app changelog | `Nassila/CHANGELOG.md` | `content/changelog/{en,ar}.md` — follow [CHANGELOG_SYNC_SOP.md](docs/CHANGELOG_SYNC_SOP.md) |
| Release train / roadmap | `Nassila/docs/Nassila-Ouroboros-Future.md` §5 | `lib/release-train.ts`, `content/docs/{en,ar}/roadmap.mdx` |
| Sanad / local models | `NassilaT/training/OUROBOROS_OPERATOR_MAP.md` | `content/docs/{en,ar}/sanad-setup.mdx`, `local-models.mdx`, `workers.mdx` |
| User how-to | `Nassila/docs/HOW_TO_GUIDE.md`, `USER_GUIDE.md` | Matching `content/docs/{en,ar}/*.mdx` |

**Rules:**

1. **EN + AR parity** — update both `content/docs/en/` and `content/docs/ar/` (and `messages/{en,ar}.json` for UI chrome).
2. **Strip training internals** — no eval scores, harness names, SEC-* ids, or NassilaT methodology on the public site ([SOP](docs/CHANGELOG_SYNC_SOP.md)).
3. **Same facts everywhere** — version, codename, FT tier, and “next installer” must match Nassila README and operator map.
4. If only this repo changed, list what still needs syncing in Nassila / NassilaT.

**Regenerate `codebase.txt`** after large structural changes. Snapshots are gitignored.

## Site map

| Path | Role |
|------|------|
| `content/docs/{en,ar}/` | User-facing docs (MDX) |
| `content/changelog/` | Curated release notes (EN/AR) |
| `lib/release-train.ts` | Shipped + planned version codenames |
| `messages/{en,ar}.json` | Site UI strings |

## Dev

```bash
npm install
npm run dev    # http://localhost:3000/en
npm run build  # run after doc/i18n changes
```

## Change discipline

- Match existing MDX and i18n patterns; Arabic worker terms follow [Nassila AR glossary](https://github.com/jamalesam93/Nassila/blob/main/docs/AR_I18N_GLOSSARY.md).
- After changelog or release-train edits, update `lib/release-train.ts` `CURRENT_RELEASE` when the latest shipped version changed.
- Keep diffs minimal; do not duplicate full Nassila maintainer docs on the website.
