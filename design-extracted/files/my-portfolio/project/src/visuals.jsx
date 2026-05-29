// Shared visual components — Gemstone, HeroBackground, EmberField, Ornament, AnimatedTitle

(function () {
  const { useEffect, useState, useRef, useMemo } = React;

  // ─────────────────────────────────────────────────────────────────
  // FILIGREE CORNERS — ornate ER-style corner flourishes
  // ─────────────────────────────────────────────────────────────────
  window.FiligreeCorner = function FiligreeCorner({ size = 90, color = "rgba(212,168,81,.55)", flip = "tl" }) {
    // flip: tl, tr, bl, br
    const transforms = { tl: "", tr: "scale(-1,1)", bl: "scale(1,-1)", br: "scale(-1,-1)" };
    return (
      <svg viewBox="0 0 100 100" width={size} height={size}
        style={{ transform: transforms[flip], pointerEvents: "none" }}>
        <g fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round">
          {/* main L-bracket */}
          <path d="M 4,40 L 4,4 L 40,4" />
          {/* inner shadow line */}
          <path d="M 8,40 L 8,8 L 40,8" opacity=".4" />
          {/* curled flourish off the corner */}
          <path d="M 4,40 Q 4,52 14,52 Q 24,52 24,40 Q 24,32 18,32" />
          <path d="M 40,4 Q 52,4 52,14 Q 52,24 40,24 Q 32,24 32,18" />
          {/* central diamond seal */}
          <path d="M 14,14 L 22,6 L 30,14 L 22,22 Z" />
          <circle cx="22" cy="14" r="1.6" fill={color} stroke="none" />
          {/* small radiating ticks */}
          <path d="M 6,30 L 10,30 M 6,24 L 11,24 M 6,18 L 12,18" opacity=".55" />
          <path d="M 30,6 L 30,10 M 24,6 L 24,11 M 18,6 L 18,12" opacity=".55" />
          {/* tiny dot at the end of curls */}
          <circle cx="18" cy="32" r="1" fill={color} stroke="none" />
          <circle cx="32" cy="18" r="1" fill={color} stroke="none" />
        </g>
      </svg>
    );
  };

  window.OrnateFrame = function OrnateFrame({ children, padding = 24, accent = "rgba(212,168,81,.45)", style }) {
    return (
      <div style={{ position: "relative", padding, ...style }}>
        <div style={{ position: "absolute", top: -10, left: -10 }}>
          <FiligreeCorner size={70} color={accent} flip="tl" />
        </div>
        <div style={{ position: "absolute", top: -10, right: -10 }}>
          <FiligreeCorner size={70} color={accent} flip="tr" />
        </div>
        <div style={{ position: "absolute", bottom: -10, left: -10 }}>
          <FiligreeCorner size={70} color={accent} flip="bl" />
        </div>
        <div style={{ position: "absolute", bottom: -10, right: -10 }}>
          <FiligreeCorner size={70} color={accent} flip="br" />
        </div>
        {/* faint thin border */}
        <div style={{ position: "absolute", inset: 0, border: `1px solid ${accent}`, opacity: .35, pointerEvents: "none" }} />
        {children}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────
  // ORNAMENT — small decorative diamond divider
  // ─────────────────────────────────────────────────────────────────
  window.Ornament = function Ornament({ width = 180, style }) {
    return (
      <div className="ornament" style={{ width, ...style }}>
        <svg viewBox="0 0 14 14">
          <path d="M 7 1 L 13 7 L 7 13 L 1 7 Z" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="7" cy="7" r="1.6" fill="currentColor" />
        </svg>
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────
  // EMBER FIELD — floating embers rising from below
  // ─────────────────────────────────────────────────────────────────
  window.EmberField = function EmberField({ count = 36, intense = 1 }) {
    const embers = useMemo(() => {
      const a = [];
      for (let i = 0; i < count; i++) {
        const size = 1 + Math.random() * 2.5;
        a.push({
          left: Math.random() * 100,
          dur: 14 + Math.random() * 18,
          delay: -Math.random() * 30,
          drift: (Math.random() - 0.5) * 200,
          size,
          opacity: 0.4 + Math.random() * 0.6,
        });
      }
      return a;
    }, [count]);
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", opacity: intense }}>
        {embers.map((e, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${e.left}%`,
            bottom: 0,
            width: e.size, height: e.size,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(241,210,122,1) 0%, rgba(196,122,62,.6) 50%, transparent 100%)",
            boxShadow: "0 0 6px rgba(241,210,122,.8), 0 0 12px rgba(196,122,62,.4)",
            opacity: e.opacity,
            animation: `ember-rise ${e.dur}s linear ${e.delay}s infinite`,
            "--drift": `${e.drift}px`,
          }} />
        ))}
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────
  // HERO BACKGROUND — placeholder for the user's video.
  // A slow Ken-Burns'd matte painting built from SVG layers + mist.
  // ─────────────────────────────────────────────────────────────────
  window.HeroBackground = function HeroBackground({ paused = false }) {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#000" }}>
        {/* The "video" container — a slow drifting layered scene */}
        <div style={{
          position: "absolute",
          inset: "-6%",
          animation: paused ? undefined : `mist-drift calc(38s / var(--speed)) ease-in-out infinite`,
        }}>
          <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: "100%", height: "100%" }}>
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="#1a1410" />
                <stop offset="40%"  stopColor="#0e0a0c" />
                <stop offset="100%" stopColor="#050307" />
              </linearGradient>
              <radialGradient id="sun" cx="58%" cy="42%" r="34%">
                <stop offset="0%"   stopColor="#f1d27a" stopOpacity="0.7" />
                <stop offset="30%"  stopColor="#c47a3e" stopOpacity="0.35" />
                <stop offset="70%"  stopColor="#7a2e1f" stopOpacity="0.15" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
              <linearGradient id="mtnFar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2a2520" />
                <stop offset="100%" stopColor="#0a0807" />
              </linearGradient>
              <linearGradient id="mtnMid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a1410" />
                <stop offset="100%" stopColor="#070506" />
              </linearGradient>
              <linearGradient id="mtnNear" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0d0a08" />
                <stop offset="100%" stopColor="#000" />
              </linearGradient>
              <linearGradient id="mist" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="transparent" />
                <stop offset="60%"  stopColor="rgba(122,46,31,.18)" />
                <stop offset="100%" stopColor="rgba(196,122,62,.30)" />
              </linearGradient>
            </defs>

            <rect width="1600" height="900" fill="url(#sky)" />
            {/* sun halo */}
            <rect width="1600" height="900" fill="url(#sun)" />

            {/* Erdtree-style silhouette — a vast distant tree */}
            <g opacity=".95" transform="translate(900,0)">
              <path d="M 100,420 L 90,300 L 75,180 L 70,60 L 95,30 L 110,60 L 125,180 L 140,300 L 130,420 Z" fill="#0a0807" />
              {/* canopy */}
              <g opacity=".85">
                <ellipse cx="100" cy="100" rx="120" ry="80" fill="url(#sun)" opacity=".4" />
                <path d="M 30,140 Q 50,80 100,60 Q 150,80 170,140 Q 130,170 100,160 Q 70,170 30,140 Z" fill="#0a0807" />
                <path d="M 50,130 Q 80,90 100,80 Q 120,90 150,130 Q 120,140 100,135 Q 80,140 50,130 Z" fill="#1a1410" opacity=".5" />
              </g>
            </g>

            {/* Distant mountains */}
            <path d="M 0,620 L 120,520 L 220,560 L 360,460 L 500,540 L 640,490 L 780,560 L 920,500 L 1060,560 L 1200,520 L 1340,580 L 1480,500 L 1600,560 L 1600,900 L 0,900 Z" fill="url(#mtnFar)" />
            {/* Mid mountains */}
            <path d="M 0,720 L 140,640 L 280,690 L 420,610 L 580,700 L 740,620 L 880,710 L 1040,640 L 1200,720 L 1380,640 L 1520,700 L 1600,660 L 1600,900 L 0,900 Z" fill="url(#mtnMid)" />
            {/* Near ridge */}
            <path d="M 0,820 L 200,760 L 400,810 L 600,750 L 800,810 L 1000,770 L 1200,820 L 1400,760 L 1600,800 L 1600,900 L 0,900 Z" fill="url(#mtnNear)" />

            {/* mist layer */}
            <rect y="500" width="1600" height="400" fill="url(#mist)" opacity=".55" />

            {/* lone figure on the ridge — tiny silhouette */}
            <g transform="translate(290,755)" opacity=".95">
              <path d="M 0,0 L 0,-22 M -4,-22 L 4,-22 L 6,-26 L -6,-26 Z" stroke="#0a0807" strokeWidth="2.5" fill="#0a0807" />
              {/* cloak */}
              <path d="M -8,0 L -10,-14 L -4,-22 L 4,-22 L 10,-14 L 8,0 Z" fill="#0a0807" />
              {/* faint aura */}
              <circle r="40" fill="url(#sun)" opacity=".15" />
            </g>
          </svg>
        </div>

        {/* PLACEHOLDER LABEL — replace with <video /> */}
        <div style={{
          position: "absolute",
          top: 24, left: 24,
          padding: "4px 10px",
          fontFamily: "var(--display)",
          fontSize: 9,
          letterSpacing: ".3em",
          color: "rgba(217,201,163,.35)",
          border: "1px solid rgba(217,201,163,.15)",
          borderRadius: 2,
          pointerEvents: "none",
        }}>
          [ HERO VIDEO · PLACEHOLDER ]
        </div>

        {/* atmospheric overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 40% 60%, transparent 20%, rgba(0,0,0,.55) 80%)",
          mixBlendMode: "multiply",
        }} />
        {/* ember field */}
        <EmberField count={48} />
      </div>
    );
  };

  // ─────────────────────────────────────────────────────────────────
  // GEMSTONE — SVG that supports multiple shapes, glow, crack-open
  // Props: shape, hue, size, cracked, hovered
  // ─────────────────────────────────────────────────────────────────
  const SHAPES = {
    // each is { outline (path), facets ([paths]) }
    kite:     { outline: "M 100,12 L 168,100 L 100,188 L 32,100 Z", facets: ["M 100,12 L 100,188", "M 32,100 L 168,100", "M 100,12 L 32,100 L 100,188", "M 100,12 L 168,100 L 100,188"] },
    hex:      { outline: "M 100,16 L 174,58 L 174,142 L 100,184 L 26,142 L 26,58 Z", facets: ["M 26,58 L 100,100 L 174,58", "M 26,142 L 100,100 L 174,142", "M 100,16 L 100,184"] },
    oval:     { outline: "M 100,12 C 50,12 22,60 22,100 C 22,140 50,188 100,188 C 150,188 178,140 178,100 C 178,60 150,12 100,12 Z", facets: ["M 60,40 Q 100,80 60,160", "M 140,40 Q 100,80 140,160", "M 60,40 Q 100,30 140,40"] },
    shard:    { outline: "M 100,8 L 150,80 L 130,188 L 70,188 L 50,80 Z", facets: ["M 100,8 L 100,188", "M 50,80 L 150,80", "M 70,188 L 100,80 L 130,188"] },
    teardrop: { outline: "M 100,10 C 60,60 36,110 50,150 C 64,184 136,184 150,150 C 164,110 140,60 100,10 Z", facets: ["M 100,10 L 100,170", "M 50,150 Q 100,110 150,150", "M 100,40 Q 130,90 100,140 Q 70,90 100,40 Z"] },
    diamond:  { outline: "M 100,10 L 180,80 L 168,140 L 100,190 L 32,140 L 20,80 Z", facets: ["M 20,80 L 180,80", "M 32,140 L 168,140", "M 100,10 L 100,190", "M 20,80 L 100,80 L 168,140"] },
    obelisk:  { outline: "M 100,8 L 144,32 L 156,180 L 44,180 L 56,32 Z", facets: ["M 100,8 L 100,180", "M 56,32 L 144,32", "M 56,32 L 100,180 L 144,32"] },
  };

  window.Gemstone = function Gemstone({
    shape = "kite",
    hue = 16,
    size = 160,
    cracked = false,
    hovered = false,
    pulse = true,
    id = "g",
  }) {
    const def = SHAPES[shape] || SHAPES.kite;

    // crack offset — when cracked, the two halves slide apart vertically
    const splitOffset = cracked ? 26 : 0;
    const fillTop    = `hsl(${hue} 60% 22%)`;
    const fillBot    = `hsl(${hue} 55% 14%)`;
    const fillFacet  = `hsl(${hue} 80% 75%)`;
    const fillHi     = `hsl(${hue} 90% 88%)`;
    const glowCol    = `hsl(${hue} 90% 70%)`;

    return (
      <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: "visible", display: "block" }}>
        <defs>
          <linearGradient id={`gem-body-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={fillTop} />
            <stop offset="100%" stopColor={fillBot} />
          </linearGradient>
          <radialGradient id={`gem-inner-${id}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%"   stopColor={fillHi} stopOpacity="0.95" />
            <stop offset="40%"  stopColor={fillFacet} stopOpacity="0.6" />
            <stop offset="100%" stopColor={fillTop} stopOpacity="0" />
          </radialGradient>
          <filter id={`gem-glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={hovered ? 6 : 3} />
          </filter>
          {/* Crack-line mask: when cracked, top half stops at 100 - splitOffset/2; bottom starts at 100 + splitOffset/2. Slight overlap when not cracked. */}
          <clipPath id={`gem-top-${id}`}>
            <rect x="-10" y="-10" width="220" height={111 - splitOffset / 2} />
          </clipPath>
          <clipPath id={`gem-bot-${id}`}>
            <rect x="-10" y={99 + splitOffset / 2} width="220" height={220} />
          </clipPath>
        </defs>

        {/* outer glow halo */}
        <g style={{ transition: "opacity .6s ease" }} opacity={hovered ? 0.9 : 0.45}>
          <circle cx="100" cy="100" r="90" fill={glowCol} opacity=".06" filter={`url(#gem-glow-${id})`} />
          <circle cx="100" cy="100" r="60" fill={glowCol} opacity=".10" filter={`url(#gem-glow-${id})`} />
        </g>

        {/* TOP HALF */}
        <g style={{ transition: "transform .5s cubic-bezier(.7,-.2,.3,1.2)", transform: cracked ? `translateY(-${splitOffset}px)` : "translateY(0)" }} clipPath={`url(#gem-top-${id})`}>
          <GemBody id={id} def={def} hue={hue} pulse={pulse} hovered={hovered} />
        </g>
        {/* BOTTOM HALF */}
        <g style={{ transition: "transform .5s cubic-bezier(.7,-.2,.3,1.2)", transform: cracked ? `translateY(${splitOffset}px)` : "translateY(0)" }} clipPath={`url(#gem-bot-${id})`}>
          <GemBody id={id} def={def} hue={hue} pulse={pulse} hovered={hovered} />
        </g>

        {/* Crack lightning when cracking */}
        {cracked && (
          <g stroke={fillHi} strokeWidth="1.2" fill="none" opacity=".85" style={{ animation: "shimmer 1.2s ease-in-out infinite" }}>
            <path d="M 20,100 L 40,96 L 60,104 L 80,98 L 100,102 L 120,96 L 140,102 L 160,98 L 180,100" />
            <path d="M 30,100 L 50,108 L 70,94 L 90,106 L 110,96 L 130,108 L 150,94 L 170,102" opacity=".6" />
          </g>
        )}
      </svg>
    );
  };

  function GemBody({ id, def, hue, pulse, hovered }) {
    return (
      <g>
        {/* main body */}
        <path d={def.outline} fill={`url(#gem-body-${id})`} stroke={`hsl(${hue} 80% 55%)`} strokeWidth="1" opacity=".95" />
        {/* facets */}
        <g stroke={`hsl(${hue} 85% 70%)`} strokeWidth=".7" fill="none" opacity=".55">
          {def.facets.map((d, i) => <path key={i} d={d} />)}
        </g>
        {/* inner highlight */}
        <path d={def.outline} fill={`url(#gem-inner-${id})`} opacity={hovered ? 0.85 : 0.65} style={{ transition: "opacity .4s" }} />
        {/* glint */}
        <g style={{ animation: pulse ? `pulse-glow ${4 + (id.length % 3)}s ease-in-out infinite` : undefined }}>
          <ellipse cx="80" cy="60" rx="20" ry="8" fill="white" opacity=".18" transform="rotate(-30 80 60)" />
        </g>
      </g>
    );
  }
})();
