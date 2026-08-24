# Product media

Canonical captures live here; raw/alternate takes are archived in `media-archive/` (repo root, not served).

## English UI (`/media/…`)

| File | Purpose |
|------|---------|
| `showreel.mp4` | Home hero screen recording (loops, muted) |
| `banner.png` | Video poster |
| `ui-import.png` | Import / paste feature (home strip + docs) |
| `ui-validate.png` | Offline validation feature (home strip + docs) |
| `ui-verify.png` | L1/L2 verify feature (home strip + docs) |
| `ui-integrity.png` | Duplicate / integrity flags (home strip + docs) |
| `ui-manuscript.png` | Manuscript Ouroboros audit result (home strip + docs) |
| `ui-export-menu.png` | Export menu (docs) |
| `ui-doi-resolve.png` | Identifier resolution row (docs) |
| `ui-workflow-menu.png` | Bulk actions menu (docs) |
| `ui-references-menu.png` | References menu with shortcuts (docs) |
| `ui-settings.png` | Settings dialog incl. Unpaywall email (docs) |
| `ui-sanad-setup.png` | Set up Sanad dialog (docs) |
| `ui-manuscript-full.png` | Manuscript mode before audit (docs) |
| `ui-send-to-bibliography.png` | Send-to-Bibliography confirmation (docs) |
| `ui-audit-from-library.png` | Audit from Bibliography library enabled (docs) |

## Arabic UI (`/media/ar/…`)

Arabic-UI captures for the AR docs pages and the AR home surface; same naming
scheme as the English set.

| File | Purpose |
|------|---------|
| `ar-showreel.mp4` | Home hero screen recording, Arabic UI (loops, muted) |
| `ui-import.png` | Import / paste view |
| `ui-validate.png` | Verified toast |
| `ui-integrity.png` | Duplicate flags |
| `ui-verify.png` | Per-row verify with registry candidates |
| `ui-doi-resolve.png` | Identifier resolution row |
| `ui-export-menu.png` | Export menu |
| `ui-workflow-menu.png` | Bulk actions menu |
| `ui-references-menu.png` | References menu with shortcuts |
| `ui-settings.png` | Settings dialog incl. Unpaywall email |
| `ui-sanad-setup.png` | Set up Sanad dialog |
| `ui-manuscript-input.png` | Bibliography input with manuscript text |
| `ui-manuscript-workspace.png` | Manuscript mode, empty workspace |
| `ui-manuscript.png` | Manuscript audit result |
| `ui-manuscript-full.png` | Manuscript mode before audit |
| `ui-send-to-bibliography.png` | Send-to-Bibliography action |
| `ui-audit-from-library.png` | Audit from Bibliography library toggle |

The home showreel video and feature-strip captures switch to this set when the
site locale is Arabic (`components/home/app-showreel.tsx`, `feature-strip.tsx`).

## Notes

- No formatted-export-output capture yet (citeproc output is style-dependent);
  `ui-export-menu.png` covers the export menu only.
