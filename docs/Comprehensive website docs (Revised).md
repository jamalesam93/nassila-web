Overview: Expand Nassila-web documentation from three condensed pages into a full bilingual MDX system with grouped navigation, dynamic sitemap/routing, in-page TOC, and interactive UI components. Exhaustive user-facing content ported from Nassila repo guides—without maintainer internals or proprietary model-training details.

todos:

* id: doc-platform  
  content: "Upgrade doc shell: dynamic DOC\_SECTIONS (SSOT), index, TOC (h2/h3), bespoke manual MDX styling (no prose plugin), generateStaticParams, dynamic sitemap"  
  status: pending  
* id: custom-mdx-components  
  content: "Build interactive MDX client components: , , (with copy), and "  
  status: pending  
* id: expand-guides-en  
  content: "Full EN port: getting-started, how-to, user-guide, manuscript, shortcuts, troubleshooting"  
  status: pending  
* id: deep-pages-en  
  content: "New EN pages: sanad-setup, bibliography-bridge, verification, workers, local-models (safe fragments only), curated roadmap \+ changelog"  
  status: pending  
* id: translate-ar  
  content: Full AR translation with matching structure, utilizing frontmatter titles for RTL sidebar labels  
  status: pending  
* id: link-deploy  
  content: Update Nassila README doc links; lint, build, commit, push, deploy  
  status: pending  
  isProject: false

# **Comprehensive Documentation for nassila-web**

## **Goal**

Make **https://nassila-web.vercel.app/docs** the canonical, exhaustive user-facing reference: every workflow, panel, shortcut, Sanad setup step, verification tier, honest gap, and roadmap item that does not fit in the desktop app or terse repo README. Scope: **end users \+ honest product depth** (roadmap, workers, local model setup)—**not** maintainer internals and **not** proprietary training details.

## **Current state vs. Target Architecture**

| Feature | Current | Target (SSOT & Custom MDX) |
| :---- | :---- | :---- |
| **Routing & Sitemap** | Hardcoded arrays, manual sitemap | Dynamically derived from DOC\_SECTIONS object |
| **Sidebar Labels** | Derived from slug | Driven strictly by Markdown frontmatter title |
| **Styling** | Basic HTML tags | Strict manual MDX component mapping (No Tailwind prose); bespoke design |
| **Interactivity** | Static text | React Client Components (\<Tabs\>, \<Callout\>, \<CodeBlock\>) via MDX |
| **TOC** | None | Visible for \#\# / \#\#\#. Deep-link ids for \#\#\#\# |

## **Information architecture (12 pages)**

Grouped sidebar uses **5 i18n keys** for section headers only (docs.sectionStartHere, etc.). Page labels are read directly from the .md frontmatter.

| Section Header (i18n) | Slug | Primary sources & Notes |
| :---- | :---- | :---- |
| **Start here** | getting-started | README.md, BRAND.md |
| **Guides** | how-to | Full port of HOW\_TO\_GUIDE.md (correct stale L3 info) |
|  | user-guide | Full port of USER\_GUIDE.md |
|  | shortcuts | Keyboard tables from both guides |
| **Manuscript** | manuscript | Expand current manuscript.md \+ USER\_GUIDE loop sections |
|  | sanad-setup | USER\_GUIDE Sanad \+ Safe Worker roles from BRAND.md. Use \<Tabs\> for LM Studio/Ollama/vLLM. |
|  | bibliography-bridge | PRODUCT.md \+ v1.1.2 release notes |
| **Reference** | verification | L1/L2/L3 custom table, 200-row cap, mismatch cards |
|  | workers | Worker codenames EN/AR (BRAND.md), maturity table |
|  | troubleshooting | HOW\_TO §11 table \+ common Sanad/network issues |
| **Models & roadmap** | local-models | **Write from scratch.** Use only safe fragments (IDs, VRAM, HF download links). No OUROBOROS.md training IP. |
|  | roadmap | Honest v1.1 gaps (Maktab/Masdar/Shahid), user-safe slice of roadmap |

**Changelog** (/changelog) is explicitly **curated**. Maintainer internals (Unit tests, SEC-01–07, checkpoints) must be stripped. Only user-facing UI/Product benefits remain.

### **Red lines — never publish on the website**

**Training & model IP (top-tier secrets):**

* How Sanad / Nassila models were trained, QLoRA, hardware.  
* Training data, synthetic ratios, go/no-go gates.  
* Anything from TRAINING.md, OUROBOROS\_CONTEXT.md, or NassilaT repo.

**Allowed for local-models / sanad-setup (user setup only):**

* Public model names/IDs (nassila-sanad-e4b).  
* Hugging Face model card download links (BYO GGUF).  
* VRAM/RAM inference tiers, Tier 2 vs 3 product behaviors.

## **Doc shell upgrades & Architecture**

### **1\. Single Source of Truth (SSOT) Routing**

* DOC\_SECTIONS in lib/docs.ts is the master array.  
* generateStaticParams must derive all buildable paths dynamically from DOC\_SECTIONS.  
* app/sitemap.ts must map over DOC\_SECTIONS to auto-generate indexing rules.

### **2\. Bespoke MDX Dictionary (Strict Design)**

* **NO Tailwind Typography (@tailwindcss/typography / prose).**  
* components/docs/markdown-content.tsx must explicitly map standard tags (h1-h4, p, ul, table, a) to custom, heavily-styled React components ensuring pixel-perfect alignment with the existing app design system.  
* Interactive MDX Injections (Client Components):  
  * \<Callout variant="warning|info|danger"\> for disclaimers/limits.  
  * \<CodeBlock\> for copy-to-clipboard model IDs and endpoints.  
  * \<Tabs\> for OS/Runner specific instructions.  
  * \<Steps\> for visually guided workflows.

### **3\. In-page TOC & Deep Linking**

* TOC component scans for ^\#\# and ^\#\#\# to build the sticky right-rail.  
* Uses IntersectionObserver to keep parent \#\#\# highlighted if a user is deep-linked to a \#\#\#\# step.  
* rehype-slug auto-generates id attributes for all headers (especially h4 for tables/steps), but h4 remains hidden from the visible TOC to maintain scannability.

## **Bilingual parity & Media**

* **Content First, Images Later:** Use existing screenshots from public/media/. For missing visuals, insert a styled \<Callout variant="info"\> indicating "UI Capture Pending" to prevent workflow blockers.  
* **RTL Native:** Arabic translations match EN structure section-for-section. Frontmatter title handles RTL sidebar labeling automatically.

## **Implementation phases**

### **Phase 1 — Platform & MDX Infrastructure**

* Define DOC\_SECTIONS (SSOT) \+ Dynamic routing \+ Sitemap.  
* Build custom MDX components (\<Callout\>, \<Tabs\>, \<CodeBlock\>).  
* Map strict bespoke design styling in MDX dictionary.  
* Implement TOC (h2/h3) \+ rehype-slug deep linking.  
* Stub all 12 EN files with frontmatter.

### **Phase 2 — Expand existing guides (EN)**

* Full port: how-to, user-guide, manuscript.  
* Add: getting-started, shortcuts, troubleshooting.

### **Phase 3 — Deep product pages (EN)**

* Add: sanad-setup, bibliography-bridge, verification, workers, local-models, roadmap.  
* Write local-models purely from safe fragments.  
* Curate and sync user-facing /changelog.

### **Phase 4 — Arabic**

* Translate all 12 pages \+ updated changelog.  
* Verify RTL rendering in custom mapped components and tables.

### **Phase 5 — Cross-repo links & deploy**

* README link updates in Nassila.  
* Build, lint, and deploy via Vercel.