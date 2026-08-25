# Mobile Adaptation Plan

Audited 2026-08-25 at a real 394x784 viewport (and 768px tablet) via Chrome. Zero console errors;
overflow everywhere is *clipped*, not scrollable, so broken content silently vanishes.

## Design stance

Mobile is **the same game on a handheld** (Elden Ring on a Steam Deck), not a different website.
Same gold/parchment materials, display type, ceremonial copy, and ER prompt chips. What changes:
the input grammar (tap replaces hover/Esc) and the screen grammar (codex pages may scroll like an
in-game scroll where a fixed screen cannot hold the content).

## Audit findings (severity)

| # | Issue | Page | Severity |
|---|-------|------|----------|
| 1 | No reachable back-to-menu on touch: "Esc Title" chip offscreen (Works), mostly offscreen (Chronicle/Tome), overlaps mute button (Contact, also at 768px) | all | broken |
| 2 | Ten 116px seals (percent-positioned for ~1200x700) pile into overlapping clusters; taps hit wrong layers; labels occluded; header clips right edge | Works | broken |
| 3 | Three-column grid (240px/1fr/1.1fr) renders 699px content in a 282px pane; Attributes + Deeds unreachable; vertical pane scroll shows blank; Deeds still clips at 768px | Chronicle | broken |
| 4 | 660x560 door scaled 1.5x (~990px effective): GitHub + Email stones offscreen, only LinkedIn tappable | Contact | broken |
| 5 | StatPanel: no close button (backdrop tap only), clipped 22px at right | Works detail | bad |
| 6 | Hover-only rune reveal + "HOVER A STONE" copy on touch | Works | bad |
| 7 | cursor:none + custom rune cursor not gated for touch | global | bad |
| 8 | "Grace will guide you" prompt clips + wraps 4 lines | Menu | bad |
| 9 | Tap targets: "Site by RIKU" 300x12, "View Codex" 306x15 | Menu/Works | bad |
| 10 | Keyboard hints (up/down/Enter/Esc) shown on touch; 9-10px labels | global | cosmetic |
| 11 | Content: source spells "Emphatora" (src/data/portfolio.ts:68, Runes.tsx) but git history says "Empathora" — confirm before fixing | Works | content |

## Phases

**Phase 1 — Global foundation.** `useViewport()` hook (matchMedia) + `(hover: none)`/`(pointer: coarse)`
CSS gating; breakpoint ~700px, tablet tweaks ~1024px. Do not mount CustomCursor on touch; restore
normal cursor under coarse pointer. Replace Esc chip on mobile with an always-visible ornate back
chip (>=44px, top-left, safe-area aware); fix its mute-button overlap at all widths. Prompt copy by
input: "Tap a stone - Tap again to enter"; hide keyboard bar on touch. viewport-fit=cover +
safe-area insets; 11px label floor (trim letter-spacing to fit); 44px tap-target floor.

**Phase 2 — Works.** Mobile constellation becomes a vertically scrolling star-path: ~96px seals in a
staggered two-column zigzag down a taller-than-viewport field, ley-lines redrawn between neighbors.
StatPanel becomes a bottom sheet (full-width, slides up on tap, scrollable, explicit close button —
also fixes the desktop close-affordance gap). Tap = bind + open sheet. Responsive header padding,
clamped title size.

**Phase 3 — Chronicle.** Single-column stack on mobile: intro band > portrait/class/level/runes >
attributes > deeds timeline > skills; the pane is the one scroller. Header flows (not absolute) at
narrow widths to fix subtitle/banner/ornament collisions. Two columns at 768px so Deeds stops clipping.

**Phase 4 — Contact.** Remove the 1.5x scale on mobile; door sized to fit width. Three wards stay in
one row: ~88px sockets + 20px gaps = ~304px total, fits 394px. No carousel needed.

**Phase 5 — Menu polish + verification.** Fix clipped "Grace" prompt, shrink corner filigree, hide
crest cartouche at phone width, reduce ember/star counts on mobile. Re-verify at 394/768 and on a
real device.
