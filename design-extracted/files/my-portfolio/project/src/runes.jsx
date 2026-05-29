// Mystical rune SVGs — inspired by ER-style sigils. Each accepts {size, color, animate}.
// Exported via window.Runes (keyed by project id).

(function () {
  const { useEffect, useState } = React;

  // Base wrapper: gives every rune the same outer ring + dashes
  function RuneShell({ size = 220, color = "#f1d27a", children, slow = false, glow = true }) {
    return (
      <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: "visible" }}>
        <defs>
          <filter id="rune-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="rune-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor={color} stopOpacity="0" />
            <stop offset="70%" stopColor={color} stopOpacity="0.06" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="98" fill="url(#rune-fade)" />
        {/* outer ring */}
        <g stroke={color} fill="none" filter={glow ? "url(#rune-glow)" : undefined} style={{ animation: slow ? "slow-spin 60s linear infinite" : undefined, transformOrigin: "100px 100px" }}>
          <circle cx="100" cy="100" r="92" strokeWidth="0.6" strokeDasharray="2 6" opacity=".55" />
          <circle cx="100" cy="100" r="86" strokeWidth="0.9" />
        </g>
        {/* inner ring */}
        <g stroke={color} fill="none" filter={glow ? "url(#rune-glow)" : undefined} style={{ animation: slow ? "slow-spin 90s linear infinite reverse" : undefined, transformOrigin: "100px 100px" }}>
          <circle cx="100" cy="100" r="62" strokeWidth="0.5" strokeDasharray="1 3" opacity=".5" />
        </g>
        <g stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" filter={glow ? "url(#rune-glow)" : undefined}>
          {children}
        </g>
      </svg>
    );
  }

  // Cardinal marks (tiny ticks on the ring) — used inside several runes
  function CardinalMarks({ count = 8, r = 78, len = 6 }) {
    const items = [];
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const x1 = 100 + Math.cos(a) * r;
      const y1 = 100 + Math.sin(a) * r;
      const x2 = 100 + Math.cos(a) * (r + len);
      const y2 = 100 + Math.sin(a) * (r + len);
      items.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />);
    }
    return <g opacity=".7">{items}</g>;
  }

  // ────────────── per-project runes ──────────────
  // Each one tries to nod to the project: rhythm, ledger, hearth, faithful, open hand, eye, commerce.

  const RuneBlinkBeat = (p) => (
    <RuneShell {...p} slow>
      <CardinalMarks count={12} r={78} len={5} />
      {/* zigzag pulse */}
      <polyline points="50,100 65,100 72,80 82,120 92,90 100,110 108,90 118,120 128,80 135,100 150,100" />
      <circle cx="100" cy="100" r="28" />
      <circle cx="100" cy="100" r="6" fill={p.color || "#f1d27a"} />
      <path d="M 100,72 L 100,128 M 72,100 L 128,100" opacity=".6" />
    </RuneShell>
  );

  const RuneCSNight = (p) => (
    <RuneShell {...p} slow>
      <CardinalMarks count={6} r={78} len={6} />
      {/* hexagon ledger */}
      {[0,1,2,3,4,5].map(i => {
        const a = (i/6)*Math.PI*2 - Math.PI/2;
        const x = 100 + Math.cos(a)*40, y = 100 + Math.sin(a)*40;
        return <circle key={i} cx={x} cy={y} r="3" />;
      })}
      <polygon points={[0,1,2,3,4,5].map(i=>{const a=(i/6)*Math.PI*2-Math.PI/2;return (100+Math.cos(a)*40)+","+(100+Math.sin(a)*40);}).join(" ")} />
      <polygon points={[0,1,2,3,4,5].map(i=>{const a=(i/6)*Math.PI*2-Math.PI/2;return (100+Math.cos(a)*20)+","+(100+Math.sin(a)*20);}).join(" ")} />
      <line x1="60" y1="100" x2="140" y2="100" opacity=".5" />
    </RuneShell>
  );

  const RuneMeowchi = (p) => (
    <RuneShell {...p} slow>
      <CardinalMarks count={4} r={78} len={6} />
      {/* hearth flame */}
      <path d="M 100,52 C 78,80 78,110 100,140 C 122,110 122,80 100,52 Z" />
      <path d="M 100,76 C 90,92 90,108 100,124 C 110,108 110,92 100,76 Z" />
      <circle cx="100" cy="116" r="6" />
      <path d="M 70,140 L 130,140" opacity=".6" />
      <path d="M 64,148 L 136,148" opacity=".3" />
    </RuneShell>
  );

  const RuneIhalalan = (p) => (
    <RuneShell {...p} slow>
      <CardinalMarks count={8} r={78} len={6} />
      {/* compass star + crescent */}
      <path d="M 100,60 L 106,94 L 140,100 L 106,106 L 100,140 L 94,106 L 60,100 L 94,94 Z" />
      <circle cx="100" cy="100" r="14" />
      <path d="M 100,86 a 14 14 0 1 0 0 28 a 10 10 0 1 1 0 -28" opacity=".75" />
      <line x1="100" y1="60" x2="100" y2="50" />
      <line x1="100" y1="140" x2="100" y2="150" />
    </RuneShell>
  );

  const RuneQuizGive = (p) => (
    <RuneShell {...p} slow>
      <CardinalMarks count={5} r={78} len={6} />
      {/* open hand / radiating diamonds */}
      {[0,1,2,3,4].map(i => {
        const a = (i/5)*Math.PI*2 - Math.PI/2;
        const x = 100 + Math.cos(a)*46, y = 100 + Math.sin(a)*46;
        return <g key={i}><path d={`M ${x},${y-7} L ${x+6},${y} L ${x},${y+7} L ${x-6},${y} Z`} /></g>;
      })}
      <circle cx="100" cy="100" r="14" />
      <path d="M 100,86 L 100,114 M 86,100 L 114,100" />
      <path d="M 88,88 L 112,112 M 88,112 L 112,88" opacity=".4" />
    </RuneShell>
  );

  const RuneOverSee = (p) => (
    <RuneShell {...p} slow>
      <CardinalMarks count={3} r={78} len={6} />
      {/* eye */}
      <path d="M 50,100 Q 100,60 150,100 Q 100,140 50,100 Z" />
      <circle cx="100" cy="100" r="16" />
      <circle cx="100" cy="100" r="6" fill={p.color || "#f1d27a"} />
      <path d="M 100,60 L 100,52 M 100,148 L 100,140" opacity=".7" />
      <path d="M 60,72 L 56,68 M 140,72 L 144,68 M 60,128 L 56,132 M 140,128 L 144,132" opacity=".5" />
    </RuneShell>
  );

  const RuneAzerotech = (p) => (
    <RuneShell {...p} slow>
      <CardinalMarks count={8} r={78} len={5} />
      {/* commerce / scales */}
      <line x1="100" y1="62" x2="100" y2="138" />
      <line x1="64" y1="80" x2="136" y2="80" />
      <path d="M 64,80 L 54,108 L 74,108 Z" />
      <path d="M 136,80 L 126,108 L 146,108 Z" />
      <circle cx="100" cy="140" r="5" />
      <path d="M 80,140 L 120,140" />
    </RuneShell>
  );

  // Generic fallback
  const RuneGeneric = (p) => (
    <RuneShell {...p} slow>
      <CardinalMarks count={8} r={78} len={5} />
      <circle cx="100" cy="100" r="38" />
      <path d="M 100,62 L 100,138 M 62,100 L 138,100" opacity=".6" />
      <path d="M 75,75 L 125,125 M 75,125 L 125,75" opacity=".3" />
    </RuneShell>
  );

  window.Runes = {
    blinkbeat: RuneBlinkBeat,
    csnight:   RuneCSNight,
    meowchi:   RuneMeowchi,
    ihalalan:  RuneIhalalan,
    quizgive:  RuneQuizGive,
    oversee:   RuneOverSee,
    azerotech: RuneAzerotech,
    _generic:  RuneGeneric,
  };
})();
