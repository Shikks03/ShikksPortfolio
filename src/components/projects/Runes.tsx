'use client';

import { useId, type ReactNode } from 'react';

/* =================================================================
   RUNES — dark-medieval-fantasy, hand-incised heraldic sigils.
   Each rune is drawn ONCE as stroke-only linework (no fills), then
   rendered as four stacked layers to read as gold leaf set into a
   carved stone groove:
     1. recessed shadow  (dark, offset down, softened)
     2. bevel rim-light  (faint warm catch-light on the upper edge)
     3. molten bloom      (soft gold halo that wells up when ignited)
     4. gold filament     (the crisp gilt line itself)
   Deliberately NO concentric reticle rings, radar ticks, regular
   polygons, spin, or neon — those read as sci-fi.
   ================================================================= */

export interface RuneProps {
  size?: number;
  color?: string;
  lit?: boolean;
}

/** A rune's raw geometry: stroke-only SVG primitives in a 0 0 120 120 box. */
type RuneDraw = () => ReactNode;

/* --- The carving renderer (groups, no <svg> wrapper) ----------------- */

interface CarvedProps extends RuneProps {
  draw: RuneDraw;
}

export function CarvedGroups({ draw, color = '#e7c061', lit = false }: CarvedProps) {
  const uid = useId().replace(/[:]/g, '');
  const blur = `blur-${uid}`;
  const base = 1.7;
  const gold = lit ? '#fbeec6' : color;

  const strokeCommon = {
    fill: 'none' as const,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  return (
    <>
      <defs>
        <filter id={blur} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation={lit ? 3.2 : 1.4} />
        </filter>
      </defs>

      {/* 1 — recessed shadow (the cut casts a dark line below) */}
      <g
        {...strokeCommon}
        transform="translate(0,1.3)"
        stroke="#080609"
        strokeOpacity={0.9}
        strokeWidth={base + 1.7}
        style={{ filter: 'blur(0.6px)' }}
      >
        {draw()}
      </g>

      {/* 2 — bevel rim-light (faint warm light on the carved upper edge) */}
      <g
        {...strokeCommon}
        transform="translate(0,-0.6)"
        stroke="rgba(247,232,184,0.16)"
        strokeWidth={base + 0.4}
      >
        {draw()}
      </g>

      {/* 3 — molten bloom (wells up when the rune ignites) */}
      <g
        {...strokeCommon}
        stroke="#f7e6b0"
        strokeWidth={base + 2.4}
        filter={`url(#${blur})`}
        style={{ opacity: lit ? 0.85 : 0, transition: 'opacity .55s ease' }}
      >
        {draw()}
      </g>

      {/* 4 — gold filament (the gilt line) */}
      <g
        {...strokeCommon}
        className="rune-filament"
        stroke={gold}
        strokeWidth={lit ? base + 0.3 : base}
        style={{
          opacity: 0.96,
          transition: 'stroke .45s ease, stroke-width .45s ease',
          animation: lit ? 'none' : 'rune-flicker 5.5s ease-in-out infinite',
        }}
      >
        {draw()}
      </g>
    </>
  );
}

/** Standalone rune (own SVG) — handy for previews / non-seal uses. */
export function Rune({ size = 120, ...rest }: CarvedProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ overflow: 'visible', display: 'block' }}>
      <CarvedGroups {...rest} />
    </svg>
  );
}

/* =================================================================
   THE SEVEN SIGILS
   Each is keyed loosely to its project's epithet. Strokes are a little
   irregular and asymmetric on purpose — chiselled by hand, not plotted.
   ================================================================= */

/* Blink Beat — "Glaive of the Pulse": a flame-bladed glaive + spark. */
const drawBlink: RuneDraw = () => (
  <>
    {/* spark crowning the blade */}
    <path d="M60,30 L60,23" />
    <path d="M54,29 L50.5,24" />
    <path d="M66,29 L69.5,24" />
    {/* flame blade */}
    <path d="M60,31 C53,45 51.5,55 60,66 C68.5,55 67,45 60,31 Z" />
    <path d="M60,39 L60,61" />
    {/* side licks */}
    <path d="M52,50 C49,56 51,62 55,65" />
    <path d="M68,50 C71,56 69,62 65,65" />
    {/* haft + curved guard + pommel */}
    <path d="M60,66 L60,92" />
    <path d="M50,74 C56,79 65,79 71,73" />
    <path d="M56.5,92 L63.5,92" />
  </>
);

/* CSNight — "Ledger of the Vigil": a night arch cradling a moon + stars. */
const drawCsnight: RuneDraw = () => (
  <>
    {/* pointed vigil arch */}
    <path d="M41,85 L41,56 Q60,30 79,56 L79,85" />
    <path d="M60,30 L60,24" />
    {/* base sill + foot serifs */}
    <path d="M35,88 L85,88" />
    <path d="M41,85 L37,91" />
    <path d="M79,85 L83,91" />
    {/* crescent moon within */}
    <path d="M62,52 a11,11 0 1 0 4,20 a8.5,8.5 0 1 1 -4,-20 Z" />
    {/* two small vigil stars */}
    <path d="M32,50 L32,57 M28.5,53.5 L35.5,53.5" />
    <path d="M88,49 L88,56 M84.5,52.5 L91.5,52.5" />
  </>
);

/* Meowchi — "Whisker of the Hearth": crescent + thorn sprig + drop. */
const drawMeowchi: RuneDraw = () => (
  <>
    {/* crescent moon (opening right) */}
    <path d="M50,28 a31,31 0 1 0 11,62 a23,23 0 1 1 -11,-62 Z" />
    {/* thorn sprig rising from the cradle */}
    <path d="M58,74 C63,62 67,51 73,40" />
    <path d="M66,52 L59.5,48" />
    <path d="M69,46 L62.5,43.5" />
    <path d="M72.5,40.5 L66,38" />
    {/* a single drop at the hearth */}
    <path d="M57,80 C53,86 53,92 59,95 C65,92 65,86 60.5,80" />
  </>
);

/* iHalalan — "Compass of the Faithful": organic 4-point star + pivot. */
const drawIhalalan: RuneDraw = () => (
  <>
    {/* four-point star, north/south long, east/west short, faintly off */}
    <path d="M60,23 L64,54 L92,60 L64.5,66 L60,98 L56,66 L28,60 L55.5,54 Z" />
    {/* pivot ring + cross */}
    <path d="M60,60 m-5,0 a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0" />
    <path d="M60,55 L60,65 M55,60 L65,60" />
    {/* tiny crescent of faith at the crown */}
    <path d="M60,20 a4.5,4.5 0 1 0 2.6,8 a3.4,3.4 0 1 1 -2.6,-8 Z" />
  </>
);

/* QuizGive — "Token of the Open Hand": upturned palm offering a coin. */
const drawQuizgive: RuneDraw = () => (
  <>
    {/* the offered coin, above the open palm */}
    <path d="M60,27 m-6.5,0 a6.5,6.5 0 1 0 13,0 a6.5,6.5 0 1 0 -13,0" />
    <path d="M60,23.8 L60,30.2" />
    {/* cupped palm + rounded wrist (no boxy band) */}
    <path d="M42,71 C42,62 49,57 60,57 C71,57 78,62 78,71" />
    <path d="M53,70 C52,80 54,88 60,89 C66,88 68,80 67,70" />
    {/* five fanned fingers, uneven lengths */}
    <path d="M44,65 C39,61 36.5,56 37,50.5" />
    <path d="M51,59 C49.5,51 49,44 50,39" />
    <path d="M59,57.5 C58,48 58,41 58.5,36" />
    <path d="M66,58 C67.5,50 68.5,44 68,39" />
    <path d="M73,61 C76,56 78,51 77.5,46.5" />
  </>
);

/* OverSee — "Eye of the Ledger": a watching almond eye + root tendril. */
const drawOversee: RuneDraw = () => (
  <>
    {/* almond eye */}
    <path d="M27,60 Q60,39 93,60 Q60,81 27,60 Z" />
    <path d="M34,57 Q60,43 86,57" />
    {/* iris + vertical slit pupil */}
    <path d="M60,60 m-10,0 a10,10 0 1 0 20,0 a10,10 0 1 0 -20,0" />
    <path d="M60,52 C57,57 57,63 60,68 C63,63 63,57 60,52 Z" />
    {/* uneven lashes */}
    <path d="M40,53 L36.5,47.5" />
    <path d="M52,46.5 L51,40.5" />
    <path d="M68,46.5 L69.5,40.5" />
    <path d="M80,53 L83.5,47.5" />
    {/* root tendril below (the ledger's reach) */}
    <path d="M60,80 C58,88 54,90.5 49.5,90" />
  </>
);

/* Azerotech — "Sigil of Commerce": an iron key bound by a serpent coil. */
const drawAzerotech: RuneDraw = () => (
  <>
    {/* bow (oval loop) + eye */}
    <path d="M60,36 m-12,0 a12,12 0 1 0 24,0 a12,12 0 1 0 -24,0" />
    <path d="M60,36 m-5,0 a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0" />
    {/* shaft + tip */}
    <path d="M60,48 L60,87" />
    <path d="M56.5,87 L63.5,87" />
    {/* stepped bit teeth */}
    <path d="M60,74 L70,74 L70,80" />
    <path d="M60,82 L66,82 L66,86.5" />
    {/* serpentine coil crossing the shaft */}
    <path d="M51,53 C70,59 50,69 68,75.5" />
  </>
);

/* Fallback — a simple incised mark. */
const drawGeneric: RuneDraw = () => (
  <>
    <path d="M60,28 L60,92" />
    <path d="M38,60 L82,60" />
    <path d="M60,60 m-13,0 a13,13 0 1 0 26,0 a13,13 0 1 0 -26,0" />
    <path d="M48,48 L72,72 M48,72 L72,48" />
  </>
);

/* GitHub — git fork/branch: a stem rising to two branch-ends with nodes. */
const drawGithub: RuneDraw = () => (
  <>
    <path d="M60,84 L60,53" />
    <path d="M60,53 C60,45 70,40 76,36" />
    <path d="M60,53 C60,45 50,40 44,36" />
    <circle cx="60" cy="89" r="6" />
    <circle cx="76" cy="31" r="5.5" />
    <circle cx="44" cy="31" r="5.5" />
    <path d="M55,65 L65,65" />
  </>
);

/* LinkedIn — two interlocked chain links. */
const drawLinkedin: RuneDraw = () => (
  <>
    <path d="M51,34 C44,28 36,28 33,35 C30,42 34,51 42,55 C46,57 50,57 54,55" />
    <path d="M54,55 C61,51 66,43 64,36 C62,29 56,26 51,28 C48,29 45,32 45,35" />
    <path d="M69,66 C76,72 84,72 87,65 C90,58 86,49 78,45 C74,43 70,43 66,45" />
    <path d="M66,45 C59,49 54,57 56,64 C58,71 64,74 69,72 C72,71 75,68 75,65" />
  </>
);

/* Email — sealed letter with a wax-cross seal at centre. */
const drawEmail: RuneDraw = () => (
  <>
    <path d="M30,42 L30,85 L90,85 L90,42 Z" />
    <path d="M30,42 L60,67 L90,42" />
    <path d="M30,42 L60,30 L90,42" />
    <circle cx="60" cy="55" r="7.5" />
    <path d="M60,50 L60,60" />
    <path d="M55,55 L65,55" />
    <path d="M56.5,51.5 L63.5,58.5" />
    <path d="M63.5,51.5 L56.5,58.5" />
  </>
);

const RUNE_DRAWS: Record<string, RuneDraw> = {
  blinkbeat: drawBlink,
  csnight: drawCsnight,
  meowchi: drawMeowchi,
  ihalalan: drawIhalalan,
  quizgive: drawQuizgive,
  oversee: drawOversee,
  azerotech: drawAzerotech,
  github: drawGithub,
  linkedin: drawLinkedin,
  email: drawEmail,
  _generic: drawGeneric,
};

/** Return the raw stroke-geometry for a project id (for use inside a seal). */
export function getRuneDraw(id: string): RuneDraw {
  return RUNE_DRAWS[id] || RUNE_DRAWS._generic;
}

/** Backward-compatible: a self-contained rune component for a project id. */
export function getRune(id: string): (p: RuneProps) => ReactNode {
  const draw = getRuneDraw(id);
  return (p: RuneProps) => <Rune {...p} draw={draw} />;
}
