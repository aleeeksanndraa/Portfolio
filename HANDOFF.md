# aleeeksanndraa.com — Handoff / Update Notes

Portfolio site for **Aleksandra Slahova** (digital designer + UGC creator, Amsterdam).
Deployed via GitHub → repo `aleeeksanndraa/portfolio`, custom domain `aleeeksanndraa.com`
(`CNAME` + `.nojekyll` at repo root). Static HTML/CSS/JS — no build step. Deploy = commit to
the branch GitHub Pages serves.

## Site structure (3 destinations)

```
/                     index.html      → HUB / splash: animated purple halftone portrait,
                                        name, bio, 2 cards (design / creator), socials
/design/              design/index.html → full design portfolio (home)
  design/about.html
  design/work.html
  design/work-tictaps.html
  design/work-recruitflow.html
  design/work-capital-link.html
  design/work-landing-pages.html
  design/work-visual-archive.html
/creator/             creator/index.html → UGC creator media-kit landing page
```

Shared root assets: `styles.css` (hub styles only), `assets/` (favicon, apple-touch-icon,
logo-on-dark.svg, `portrait-hero.jpg` = hub background photo).
`design/` has its OWN `styles.css`, `shared.js`, `image-slot.js`, `tweaks.jsx`,
`tweaks-panel.jsx`, `panel-spy.js`, and `assets/`. `creator/` has its own `assets/` +
`image-slot.js`.

## Design system (all pages)
- Dark theme. CSS vars: `--bg #0e0d12`, `--ink #fff`, `--muted #cfc8dd`,
  `--accent #c4b0ff` (purple), `--accent-ink #14101f`, `--line rgba(237,234,242,.14)`.
- Fonts: Inter (display/900), Instrument Serif (italic accents), IBM Plex Mono (labels).
- 4px spacing/type system across the design case studies.

## What changed this session (newest → oldest)

### Hub (`/index.html`)
- Rebuilt as a splash that divides **design** vs **creator**.
- Full-bleed `<canvas>` background: the portrait `assets/portrait-hero.jpg` rendered as an
  animated **purple halftone dot matrix** (dot size/brightness = photo luminance). Adds:
  drifting metaball blobs in dark areas, global shimmer, cursor-repel (dots flee pointer,
  feathered smoothstep falloff), and an **intro animation** (dots fly in from radial
  scatter + converge, then content fades/rises in via `body.ready`).
- Layered gradient scrim (`#bg-scrim`) for depth + text legibility.
- Content left-aligned (desktop), centered (mobile). Name = uppercase, 2 lines.
- Bio: "Digital designer and content creator based in Amsterdam, working across product
  design, visual storytelling and UGC." (tight line-height).
- Two glass buttons (apple-glass: blur, specular sheen sweep on hover, thick ↗ arrow):
  **design portfolio** → `design/index.html`, **creator portfolio** → `creator/index.html`.
  Descriptions sit BELOW each button ("product & brand design, case studies" /
  "ugc, beauty & lifestyle content"), left-aligned.
- Bottom row: social icons (icon-only on desktop, full-width labelled buttons on mobile)
  on the left, `© 2026 aleksandra slahova` pushed to the right.
- Fixed logo top-left, `2026` top-right (aligned). Mobile shows same corners (NO burger —
  a burger menu was tried then removed).
- Socials: Instagram, TikTok, YouTube, Pinterest, LinkedIn, email
  (aleksandraslahova88@gmail.com). Creator contact email: collab@aleeeksanndraa.com.

### Design case studies (`design/work-*.html`)
- All rebuilt into a **Gellard-style split layout**: fixed/sticky left info panel +
  scrolling visuals on the right. Shared `.gv-*` classes live in `design/styles.css`.
- Left panel: back link, title, tagline, short intro, meta, compact fact list (no "info"
  label, no per-row divider lines), next-project link.
- Right column: figures interleaved with two-column text blocks — section name spans the
  top, serif sub-header (lede) on the left, prose on the right. Body text 12px, ledes
  clamp(20–28px), big uppercase display section headers (unified across ALL case studies).
- Top/intro section of each case study is highlighted with a `.gv-hl` accent band
  (replaced earlier per-paragraph coloured callout boxes — those were removed).
- `work-landing-pages.html`: 3 projects (AI Creator 2026, Dubai Prime 2025, MILAURE 2026),
  each with 3 visuals in an equal-height row (16:10, first image fits, others cropped),
  captions read "01 brand system / 02 page structure / 03 main visuals", result quote
  (non-italic) under the visuals, unlabeled index in the panel. Behance link on AI Creator
  (others need links if available).
- `work-visual-archive.html`: kept its poster/logo/merch marquee sections + interaction
  script; wrapped in the split shell. Intro section removed → short intro on right, starts
  at the works.
- `work-tictaps.html`: marked **ongoing** (case page + work/home listings). Uses shared
  `design/styles.css` (its old inline `<style>` was removed).
- `design/work.html` + `design/index.html` "selected work": sticky rail (title + project
  index) with project cards scrolling on the right; consistent 12px gap between each card
  title and its serif descriptor. Landing-pages year = 2025–26.
- `design/index.html` has a **Tweaks panel** wired (React/Babel + tweaks.jsx/tweaks-panel.jsx)
  with a **"Work shots grid" toggle** (`data-shots` on body) that shows/hides a mosaic
  "shots" section between the work list and about teaser. Also grain/motion/accent tweaks.
- Multi-project pages (landing-pages, visual-archive) use `panel-spy.js`: as you scroll,
  the fixed left panel swaps title/tagline/intro/facts to match the project in view
  (switches at the END of a topic, not center). `window.PANEL_STATES` defines the per-key
  content in each page.
- `design/about.html`: type sizes normalized to the shared scale (was off-scale).

### Creator (`/creator/index.html`)
- Full premium UGC media-kit landing (dark/purple aesthetic): sticky nav + fullscreen
  mobile hamburger menu, hero (video/image drop slot), about w/ portrait slot, niches,
  services grid (14), portfolio masonry with category filters + lightbox, why-work-with-me,
  workflow timeline, creator reach stats, brands grid (placeholders), testimonials carousel
  (placeholders), FAQ accordion, contact CTA (collab@aleeeksanndraa.com + socials), footer.
  Uses `image-slot` drop placeholders for all media the user fills later.

## Placeholders still needing REAL content
- Hub portrait is real (`assets/portrait-hero.jpg`).
- Creator page: all reels/portrait/hero media are `image-slot` placeholders; brand logos,
  testimonials, and stat numbers (25K+/10K+/etc.) are placeholders — replace with real data.
- Landing-pages Behance links for Dubai & MILAURE (only AI Creator has one).

## Known notes
- The `image-slot` drops persist in localStorage locally but are NOT committed content —
  real images must be added as files + referenced for production.
- Preview tooling sometimes warns "empty #root" on the hub — false positive (no React there).
- Absolute vs relative links: hub cards use RELATIVE (`design/index.html`,
  `creator/index.html`) so they work both locally and deployed.

## Deploy
Commit all files to the GitHub Pages branch of `aleeeksanndraa/portfolio`. Keep `CNAME`
(`aleeeksanndraa.com`) and `.nojekyll` at root. No build/CI needed.
