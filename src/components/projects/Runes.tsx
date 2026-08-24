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
   THE PROJECT SIGILS
   Each is keyed loosely to its project's epithet. Strokes are a little
   irregular and asymmetric on purpose — chiselled by hand, not plotted.
   ================================================================= */

/* Emphatora — "Banner of Distant Courts": a herald's standard bearing a globe. */
const drawEmphatora: RuneDraw = () => (
  <>
    {/* herald's staff + finial */}
    <path d="M46,22 L46,98" />
    <path d="M46,22 L46,16" />
    <path d="M42,18 L50,18" />
    {/* billowing banner with a swallowtail cut */}
    <path d="M46,28 L88,33 L75,45 L88,57 L46,52 Z" />
    {/* a small globe emblem — the far reaches */}
    <path d="M67,42 m-6,0 a6,6 0 1 0 12,0 a6,6 0 1 0 -12,0" />
    <path d="M61,42 L73,42" />
    <path d="M64,37 Q67.5,42 64,47" />
    <path d="M70,37 Q66.5,42 70,47" />
    {/* base */}
    <path d="M39,98 L53,98" />
  </>
);

/* Salu — "Steward of the Revels": a feast-goblet flanked by two coins. */
const drawSalu: RuneDraw = () => (
  <>
    {/* the steward's mark — a crowning spark above the cup */}
    <path d="M60,31 L60,24" />
    <path d="M55.5,27.5 L64.5,27.5" />
    {/* goblet bowl (the feast it stewards) */}
    <path d="M45,35 L75,35 C73,49 66,56 60,57 C54,56 47,49 45,35 Z" />
    <path d="M49,40 Q60,45 71,40" />
    {/* stem + spread foot */}
    <path d="M60,57 L60,76" />
    <path d="M49,82 Q60,75 71,82" />
    <path d="M47,86 L73,86" />
    {/* two coins — the ledger of payments */}
    <path d="M34,66 m-5,0 a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0" />
    <path d="M34,62.5 L34,69.5" />
    <path d="M86,66 m-5,0 a5,5 0 1 0 10,0 a5,5 0 1 0 -10,0" />
    <path d="M86,62.5 L86,69.5" />
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

/* iHalalan — "Warden of the Single Voice": a marked ballot dropping into
   the mouth of the box, under a four-point civic star. The star is kept
   from the older cutting; the crescent that sat at its crown is not, as
   this is an election system and never had anything to do with faith. */
const drawIhalalan: RuneDraw = () => (
  <>
    {/* the civic star, crowning */}
    <path d="M60,9 L62.5,23 L75,27 L62.5,31 L60,45 L57.5,31 L45,27 L57.5,23 Z" />
    {/* the folded ballot, canted as it falls */}
    <path d="M48,54 L70,50 L74,74 L52,78 Z" />
    {/* the mark struck upon it */}
    <path d="M57,63 L61,68 L68,58" />
    {/* the mouth of the box, then the box */}
    <path d="M33,82 L87,82" />
    <path d="M38,82 L40,105 L80,105 L82,82" />
  </>
);

/* QuizGive — "Whetstone of Recall": two leaves of a fanned stack, the
   upper one ruled with a question and struck with the mark of a right
   answer. The offered coin and open palm are gone; nothing here is
   given away, the app has no donation of any kind. */
const drawQuizgive: RuneDraw = () => (
  <>
    {/* the leaf beneath, offset as in a fanned stack */}
    <path d="M32,52 L62,43 L73,79 L43,88 Z" />
    {/* the leaf on top, bearing the asking */}
    <path d="M44,42 L79,32 L91,71 L56,81 Z" />
    {/* two ruled lines of the question */}
    <path d="M55,49 L76,43" />
    <path d="M58,58 L79,52" />
    {/* the mark of a right answer */}
    <path d="M62,66 L68,72 L80,58" />
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

/* Azerotech — "Sigil of Commerce": an A and a Z struck as one monogram and
   routed like a circuit trace. The A's crossbar does double duty as the head
   of the Z nested in its counter, and every terminal ends in a solder pad. */
const drawAzerotech: RuneDraw = () => (
  <>
    {/* the A — apex and two splayed legs */}
    <path d="M37,86 L60,29 L83,86" />
    {/* the crossbar, which is also the head of the Z */}
    <path d="M47,61 L73,61" />
    {/* the Z — diagonal down-left, then its foot */}
    <path d="M73,61 L49,80" />
    <path d="M49,80 L73,80" />
    {/* solder pads where the trace terminates */}
    <circle cx="60" cy="25" r="3.4" />
    <circle cx="35.5" cy="90" r="3.4" />
    <circle cx="84.5" cy="90" r="3.4" />
  </>
);

/* ShikksTracker — "Sieve of the Winnowing": a three-tier funnel + settling drop. */
const drawShikkstracker: RuneDraw = () => (
  <>
    {/* three descending tiers of the funnel */}
    <path d="M30,30 L90,30 L78,48 L42,48 Z" />
    <path d="M44,54 L76,54 L67,70 L53,70 Z" />
    <path d="M54,75 L66,75 L62,88 L58,88 Z" />
    {/* the settling drop */}
    <path d="M60,95 m-3.4,0 a3.4,3.4 0 1 0 6.8,0 a3.4,3.4 0 1 0 -6.8,0" />
  </>
);

/* RIKU — "Forge of the Small Folk": the studio's own mark, <R>, chiselled.
   The R keeps the logo's tell — no left stem at all: the bar simply begins,
   bows right, and returns to a point that the leg then kicks out of. The
   flanking chevrons are uneven on purpose, as they are in the mark itself:
   the left one taller and centred, the right one smaller and set lower. */
const drawRiku: RuneDraw = () => (
  <>
    {/* left chevron — the taller of the two, set a touch above centre */}
    <path d="M42,35 L23,60 L42,84" />
    {/* the R: no left stem — the bar simply begins, bows right, and returns to a point */}
    <path d="M46,36 L67,36 C78,36 81,52 70,59 L56,66" />
    {/* the leg, kicked out of that same point */}
    <path d="M56,66 L76,87" />
    {/* right chevron — smaller, and set lower */}
    <path d="M84,52 L98,70 L84,87" />
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
  riku: drawRiku,
  emphatora: drawEmphatora,
  salu: drawSalu,
  shikkstracker: drawShikkstracker,
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
