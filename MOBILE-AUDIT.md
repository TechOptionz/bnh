# Mobile Experience Audit

Audited every route at 320 / 375 / 390 / 414 / 768 px (plus the 700–900 px band) with a real
browser (Playwright/Chromium against `next dev`), then cross-checked every page and component
in source. **Horizontal overflow: none found on any route at any tested width**
(`scrollWidth === innerWidth` everywhere) — the `overflow-x: clip` root guard plus earlier
source fixes hold. Findings below are everything else.

**Total: 12 issues — 1 breaks layout, 7 degrade UX, 4 cosmetic.**

## Breaks layout

| # | Page | Issue | File:line | Proposed fix |
|---|------|-------|-----------|--------------|
| 1 | Home | **Hero booking card overlaps the headline at 701–≈800 px** (verified by screenshot at 740 px: "money matters." runs under the cyan card). The copy block (`maxWidth: 72%`) and the absolutely-positioned card collide; the stacking rule that fixes this only kicks in at ≤700 px. | [app/page.tsx:236-241](app/page.tsx#L236-L241), [app/globals.css:1556](app/globals.css#L1556) | Extend the `.home-hero` stacking media query from `max-width: 700px` to `max-width: 860px` so the card drops into flow before it can reach the headline. Note: this changes the 701–860 px band (currently broken) — desktop above 860 px is untouched. |

## Degrades UX

| # | Page | Issue | File:line | Proposed fix |
|---|------|-------|-----------|--------------|
| 2 | All (mobile menu open) | **Chatbot FAB floats on top of the open mobile menu** (z-index 9999 vs panel z 49), covering menu links in the bottom-right (verified by screenshot at 375 px). The back-to-top button correctly sits under the overlays (z 40); the chatbot doesn't. | [components/Chatbot.tsx:293-295](components/Chatbot.tsx#L293-L295) | Lower `.jb-fab`/`.jb-panel` z-index below the nav overlays (e.g. 44, under backdrop z 48) so open menus cover and dim them, matching `.back-to-top`. |
| 3 | Home (mobile menu) | **Dark gap between the pinned header bar and the menu panel** when the menu is opened from the top of the home page (verified: panel top measured at y=130 while the bar pins to y=16 — 48 px of backdrop shows through, plus doubled blank space inside the panel). Cause: `panelTop` is measured in `useLayoutEffect` *before* the `pinned` class moves the bar, and the announcement bar offsets the natural position only on the home page. | [components/SiteHeader.tsx:313-317](components/SiteHeader.tsx#L313-L317) | When the viewport is <1200 px (the pinned-bar range), set `panelTop` to the pinned position (16) instead of the measured pre-pin position. |
| 4 | All (mobile menu) | **Menu panel max-height uses `100vh`** — on phones with dynamic browser chrome the panel's bottom edge (and the end of its internal scroll area) hides behind the URL bar. The chatbot panel already uses the `dvh` fallback pattern; the menu doesn't. | [components/SiteHeader.tsx:729](components/SiteHeader.tsx#L729) | Expose the measured top as a CSS variable and declare `max-height` twice in `globals.css` (`vh` then `dvh` under `@supports`), mirroring the existing `.jb-panel` pattern. |
| 5 | Team member pages | **701–804 px band: portrait hangs `-110px` into the intro section with ~6 px clearance** above "Meet …" (verified at 720/750 px — tight, right-floating, and any longer heading would collide). The single-column mobile fixes stop at 700 px but the grid stays single-column up to ≈804 px (2×320 px columns + 84 px gap ÷ 90 vw). | [app/team/[slug]/page.tsx:241](app/team/[slug]/page.tsx#L241), [app/globals.css:1583](app/globals.css#L1583) | Extend the `.member-portrait` / `.member-side` media query from 700 px to 804 px so the fixes cover the grid's whole single-column range. |
| 6 | Careers | **Phone field is a plain text input** — no `type="tel"` (numeric keyboard never appears) and no `autoComplete`; the form also relies on placeholder-only labels that vanish once typing starts. | [components/CareerForm.tsx:50-69](components/CareerForm.tsx#L50-L69) | Add `type="tel"` + `autoComplete="tel"` to phone, `autoComplete` on name/email. (Visible labels would change the design — flagging; ContactForm already does this correctly.) |
| 7 | All pages | **Full-resolution JPEGs (400–750 KB each) served to phones** via plain `<img>` — no `srcset`/`sizes`, no `next/image`. A 320 px phone downloads the same ~600 KB per photo as desktop; article pages carry 2-3 of them. Layout shift is already prevented (every `img` has `aspect-ratio`). | e.g. [app/team/[slug]/page.tsx:225](app/team/[slug]/page.tsx#L225), [components/InsightsExplorer.tsx:104](components/InsightsExplorer.tsx#L104) | **Needs your call**: migrate to `next/image` (project deliberately uses `<img>` with eslint-disables everywhere), or generate resized variants + `srcset`. Not fixable without changing the established convention. |
| 8 | Home | **~5 MB hero MP4 autoplays with `preload="auto"` on phones** — heavy on mobile data; the poster JPEG is only 271 KB. | [app/page.tsx:206-223](app/page.tsx#L206-L223) | **Needs your call**: encode a smaller mobile rendition (or poster-only below 768 px via a client check), or accept the cost as a deliberate brand moment. |

## Cosmetic

| # | Page | Issue | File:line | Proposed fix |
|---|------|-------|-----------|--------------|
| 9 | About, Team | Team-card bios reveal on `:hover` only — never visible on touch (a tap navigates to the profile instead). The profile page carries the full bio, so nothing is lost, but the interaction is desktop-only. | [app/globals.css:241-245](app/globals.css#L241-L245) | Leave as-is (tap goes to the full profile), or reveal bios statically under `(hover: none)`. |
| 10 | Home | Chatbot FAB overlaps the hero booking card's bottom-right corner (arrow area) at phone widths — both own that corner. | [components/Chatbot.tsx:293](components/Chatbot.tsx#L293), [app/globals.css:1568](app/globals.css#L1568) | Add right-padding clearance to the stacked booking card at ≤700 px, or accept — the card is a large target and stays tappable. |
| 11 | All | Fixed bottom elements (chatbot FAB, back-to-top) don't account for `env(safe-area-inset-bottom)` on notched/home-indicator phones. | [components/Chatbot.tsx:293](components/Chatbot.tsx#L293), [app/globals.css:1417](app/globals.css#L1417) | `bottom: calc(22px + env(safe-area-inset-bottom, 0px))` on both. |
| 12 | All | Borderline touch targets: mega-menu link rows ≈36 px tall, footer service links ≈22 px tall with 11 px gaps, breadcrumbs 13.5–14 px text. All tappable but below the 44 px guideline. | [app/globals.css:381-392](app/globals.css#L381-L392), [components/SiteFooter.tsx:52-58](components/SiteFooter.tsx#L52-L58) | Bump `.mega-link` vertical padding and footer column `gap`/`line-height` slightly on `(max-width: 767px)` only. |

## What's already solid (verified, no action)

- **No horizontal scroll on any route at 320–768 px** (measured). Root `overflow-x: clip` guard in place.
- Mobile menu: opens/closes, accordions work, scroll-locks the page and releases correctly, closes on route change (link click) and Escape (verified interactively).
- Hover dropdowns are hidden below 1200 px; every dropdown link is reachable via the mobile menu.
- Viewport meta is the Next.js default (`width=device-width, initial-scale=1`, no `user-scalable=no`).
- iOS input zoom prevented: global 16 px form-control rule at ≤767 px covers all forms and the chatbot.
- Home hero uses `svh` fallback; chatbot panel uses `dvh` fallback.
- All grids collapse to one column (auto-fit `minmax(min(Npx,100%),1fr)` or explicit breakpoints); every image/iframe has `max-width`/`width: 100%` and an `aspect-ratio` (no CLS).
- `prefers-reduced-motion` respected across all animation.
- Values carousel is touch-scrollable with snap points (arrows are supplementary, not required).
- Contact/Adviser forms: correct `type="email"`/`type="tel"`, visible labels, `autoComplete`.

## Breakpoints in use

`1199.98` (nav collapse) · `1180` (mega-grid) · `1040` (svc/sg/steps grids) · `860` (stats) ·
`767` (form font bump) · `760` (pillars) · `700` (mobile menu, heroes, member page) · `680`/`640`/`620`/`560`/`420` (misc) ·
plus implicit auto-fit grid thresholds at **≈805 px** (320 px cols + 84 px gap) and ≈724 px.

**Gap found:** the 701–804 px band sits between the explicit 700 px fixes and the implicit ≈805 px
grid threshold — both layout issues above (#1, #5) live in exactly that band.
