# Rune Asset-Generation Prompts — *Constellation of Works*

Prompts for generating **dark-medieval-fantasy rune art** that matches the re-skinned Works
section (carved sigil-stones + gilded ley-lines, Elden Ring / FromSoftware vibe). The current
runes ship as hand-drawn SVG; use these to generate raster art you can swap in later.

## Two modes — pick based on what you want to replace

1. **Rune glyph only** (recommended first) — just the gilded sigil on a transparent/black field.
   Drop it *inside* the existing `SealStone` (replace the `<CarvedGroups>` call with an
   `<image href=... />`), so my carved-stone disc, eroded rim, cracks, tint aura, and ignite
   animation are all kept. Target: **1024×1024 PNG, transparent (or pure black) background**.
2. **Whole seal medallion** — the entire carved stone disc *with* the rune already inlaid.
   Replaces `SealStone` itself. More dramatic, but you lose the per-state ignite unless you
   generate a "resting" and a "lit" pair. Target: **1024×1024 PNG, transparent background**.

---

## Shared style block — paste into EVERY prompt

> ancient hand-carved heraldic rune, incised into weathered dark stone and inlaid with worn,
> flaking **gold leaf**; chiseled grooves catching warm candlelight; dark high-fantasy occult
> sigil in the style of Elden Ring / FromSoftware iconography; matte eroded stone, faint cracks
> and pitting, gilt edges; low-key dramatic lighting, deep shadow, warm ember glow; painterly
> realism, intricate but **sparse and ceremonial**, centered composition, slightly irregular /
> hand-made (not machine-perfect); near-black background.

## Palette anchors (name these in the prompt for consistency)

`gold #d4a851 / bright gold #f1d27a`, `ember #c47a3e`, `blood #7a2e1f`, `stone #2a2520`,
`void black #07060a`. Each rune also carries one **aged-enamel tint** (low saturation) listed below.

## Negative prompt — this is what keeps it OUT of "futuristic" territory

> neon, glowing blue, cyan, magenta, electric colors, sci-fi, HUD, UI, reticle, targeting ring,
> concentric dashed circles, radar, compass gauge, circuitry, hologram, laser, chrome, metallic
> tech, futuristic, oscilloscope, waveform, clean flat vector, minimal logo, cartoon, anime,
> 3d render plastic, text, letters, numbers, watermark, signature, frame border, oversaturated,
> rainbow, photoreal photograph.

---

## Per-rune prompts

> Format for each = **[shared style block]** + the motif line below + **[negative prompt]**.
> Tint = the aura/enamel color to mention ("…with faint <tint> patina in the recesses").

### 1. Blink Beat — *Glaive of the Pulse* · tint **amber `#b07a32`**
> a single upright **flame-bladed glaive**: a leaf-shaped tongue of flame forming the blade,
> a slender haft with a small curved crossguard, a spark cresting the tip — a sigil of rhythm
> and the pulse; gold leaf with amber patina in the grooves.

### 2. CSNight — *Ledger of the Vigil* · tint **deep azure `#3a5a72`**
> a narrow **gothic vigil arch / tabernacle** (pointed arch on a stone sill) cradling a small
> **crescent moon** within, flanked by two tiny four-point stars — a night-watch shrine sigil;
> gold leaf with cold deep-azure patina.

### 3. Meowchi — *Whisker of the Hearth* · tint **blood `#7a2e1f`**
> a **crescent moon** cradling a slender **thorned sprig** that rises from its cradle, with a
> single hanging **teardrop** below — a warm, feral hearth-familiar sigil; gold leaf with
> blood-red patina in the recesses.

### 4. iHalalan — *Compass of the Faithful* · tint **verdigris `#4a6650`**
> an **organic four-point compass star** (long north–south points, short east–west), a small
> pivot ring at its heart and a tiny **crescent** at the crown — a faithful wayfinder's sigil,
> hand-inscribed not mechanical; gold leaf with verdigris patina.

### 5. QuizGive — *Token of the Open Hand* · tint **gold `#b9912f`**
> an **upturned open palm**, fingers gently fanned, offering a small **coin / token** that
> hovers above the palm — a sigil of giving and open-handed learning; gold leaf with warm
> gilt patina.

### 6. OverSee — *Eye of the Ledger* · tint **plum `#5a3a52`**
> a **watching almond eye** with a vertical slit pupil and irregular lashes, a single **root
> tendril** curling beneath it — a watchstone / all-seeing overseer sigil; gold leaf with
> dusky plum patina.

### 7. Azerotech — *Sigil of Commerce* · tint **steel-azure `#41617a`**
> an antique **iron key** (round looped bow, slender shaft, stepped bit-teeth) bound by a
> single **serpent coil** crossing the shaft — a merchant's craft-and-commerce sigil; gold
> leaf with cold steel-azure patina.

---

## Generator-specific tips

**Midjourney v6 / v6.1**
`<style block>, <motif>, on black background --ar 1:1 --style raw --stylize 250 --no <negatives>`
- Add `--chaos 0` for consistency across the set; reuse the same `--seed` so all 7 share a look.

**SDXL / Flux (local or API)**
- Checkpoint: a realism/illustration model (e.g. Juggernaut XL); a "stone relief" or "intaglio"
  LoRA at low weight helps the carved look.
- Put the shared style block + motif in the positive, the full negative list in the negative.
- ~30–40 steps, CFG 5–7. Square 1024×1024.

**DALL·E 3 / gpt-image-1**
- Use prose; explicitly end with: "isolated on a solid pure-black background, no text, no border."
- Ask for transparency if supported; otherwise key out the black in post.

**Getting a clean transparent glyph**
- Generate on **pure black**, then in any editor: Select → Color Range (blacks) → delete, or use
  a "remove background" tool. Gold-on-black keys out cleanly because the gold is high-contrast.

## Dropping the result into the code

- **Glyph-only** → in `src/components/projects/SealStone.tsx`, replace the
  `<CarvedGroups … />` block with:
  ```tsx
  <image href="/runes/blinkbeat.png" x="18" y="18" width="84" height="84"
         style={{ filter: lit ? 'brightness(1.5) drop-shadow(0 0 6px #f1d27a)' : 'none',
                  transition: 'filter .5s ease' }} />
  ```
  (put PNGs in `public/runes/`). Keep one file per `runeId`.
- **Whole seal** → swap `SealStone` for an `<img>`/`<image>`; generate a **resting** and a
  **lit** variant per project and cross-fade them on `lit` for the ignite effect.
- Keep assets **gold-on-dark, square, ≥1024px**, and consistent across all seven so the
  constellation reads as one set.
