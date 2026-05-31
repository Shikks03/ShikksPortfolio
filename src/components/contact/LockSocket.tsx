'use client';

import { useId } from 'react';

/* =================================================================
   WARD-LOCK ESCUTCHEON — a forged iron lock-plate bolted to the
   door face. A tall gothic cartouche (pointed finials top & bottom,
   ogee shoulders) carries a recessed circular cavity that holds a
   seal concentrically, a mount-ring at the crown, riveted studs
   around the rim, and a keyhole at the foot. The gilt edges, ring
   and keyhole all ignite to molten gold when the ward is touched.

   The cavity stays centred at (60,60) r≈49 in the 120×120 space so
   SealStone seats perfectly concentric when stacked on top. The
   cartouche silhouette is deliberately NOT a plain circle — that
   uniform "ringed badge" look is what reads as generic.
   ================================================================= */

interface LockSocketProps {
  size?: number;
  /** ignited (hovered/focused) state */
  lit?: boolean;
  /** aged tint that warms the cavity's glow */
  tint?: string;
  /** per-lock seed so the three wards wear differently (rivets/rotation) */
  seed?: number;
}

/* tall gothic cartouche — sharp crown spire + pointed foot, lobed ogee
   waist (x6..114) so the silhouette reads decisively NOT-circular */
const PLATE =
  'M60,-16 C63,-8 66,-2 72,4 C84,10 98,20 106,34 C113,46 114,56 113,64 ' +
  'C112,78 106,92 96,102 C86,110 76,114 70,118 C67,124 64,129 60,136 ' +
  'C56,129 53,124 50,118 C44,114 34,110 24,102 C14,92 8,78 7,64 ' +
  'C6,56 7,46 14,34 C22,20 36,10 48,4 C54,-2 57,-8 60,-16 Z';

/* eight rivet studs hugging the cartouche edge */
const STUDS = [
  { x: 60, y: 2 }, { x: 95, y: 22 }, { x: 106, y: 60 }, { x: 94, y: 100 },
  { x: 60, y: 120 }, { x: 26, y: 100 }, { x: 14, y: 60 }, { x: 25, y: 22 },
];

export default function LockSocket({ size = 118, lit = false, tint = '#b07a32', seed = 0 }: LockSocketProps) {
  const uid = useId().replace(/[:]/g, '');
  const cav = `cav-${uid}`;
  const iron = `iron-${uid}`;
  const glow = `glow-${uid}`;
  const bevel = `bevel-${uid}`;
  // a touch of per-lock rotation so no two plates sit identically
  const tilt = (seed % 3) - 1; // -1, 0, 1 degrees

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        {/* recessed cavity — dark, so the seal reads as set into the plate */}
        <radialGradient id={cav} cx="50%" cy="44%" r="60%">
          <stop offset="0%" stopColor="#15110d" />
          <stop offset="62%" stopColor="#0b0907" />
          <stop offset="100%" stopColor="#050405" />
        </radialGradient>
        {/* iron plate — lit from upper-left */}
        <radialGradient id={iron} cx="40%" cy="26%" r="86%">
          <stop offset="0%" stopColor="#322a1d" />
          <stop offset="50%" stopColor="#1a1510" />
          <stop offset="100%" stopColor="#0a0807" />
        </radialGradient>
        <linearGradient id={bevel} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(247,232,184,0.22)" />
          <stop offset="50%" stopColor="rgba(247,232,184,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
        <filter id={glow} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      <g transform={`rotate(${tilt} 60 60)`}>
        {/* warm halo bleeding from the cavity when ignited */}
        <circle cx="60" cy="60" r="54" fill={tint} opacity={lit ? 0.22 : 0} filter={`url(#${glow})`}
          style={{ transition: 'opacity .5s ease' }} />

        {/* mount-ring at the crown — where the lock hangs from the door */}
        <g style={{ transition: 'opacity .5s ease' }}>
          <circle cx="60" cy="-22" r="6.5" fill="none"
            stroke={lit ? '#caa24e' : '#7a5f28'} strokeWidth="2.4" strokeOpacity={lit ? 0.85 : 0.6}
            style={{ transition: 'stroke .5s ease, stroke-opacity .5s ease' }} />
          <rect x="57.5" y="-18" width="5" height="9" rx="1.5" fill="#1a1510"
            stroke={lit ? '#8a6a2c' : '#5a4720'} strokeWidth="0.7" strokeOpacity="0.6" />
        </g>

        {/* the forged iron cartouche plate */}
        <path d={PLATE} fill={`url(#${iron})`} stroke="#0a0807" strokeWidth="1.3" />
        <path d={PLATE} fill={`url(#${bevel})`} opacity="0.6" />
        {/* gilt edge of the plate — ignites with the ward */}
        <path d={PLATE} fill="none"
          stroke={lit ? '#e0b65e' : '#7a5f28'} strokeWidth={lit ? 1.5 : 1.05} strokeOpacity={lit ? 0.9 : 0.52}
          style={{ transition: 'stroke .5s ease, stroke-width .5s ease, stroke-opacity .5s ease' }} />
        {/* inner engraved line tracing the plate */}
        <path d="M60,-8 C64,0 80,12 100,38 C108,50 108,62 106,72 C100,92 84,104 66,112 C63,118 61,122 60,128 C59,122 57,118 54,112 C36,104 20,92 14,72 C12,62 12,50 20,38 C40,12 56,0 60,-8 Z"
          fill="none" stroke="#8a6a2c" strokeWidth="0.6" strokeOpacity="0.32" />

        {/* recessed cavity the seal seats into */}
        <circle cx="60" cy="60" r="49" fill={`url(#${cav})`} stroke="#000" strokeWidth="1.5" strokeOpacity="0.7" />
        <circle cx="60" cy="60" r="49" fill="none" stroke="rgba(247,232,184,0.08)" strokeWidth="0.8" />

        {/* gilded framing ring around the cavity — ignites with the ward */}
        <circle cx="60" cy="60" r="52.5" fill="none"
          stroke={lit ? '#f1d27a' : '#8a6a2c'} strokeWidth={lit ? 1.6 : 1} strokeOpacity={lit ? 0.9 : 0.45}
          style={{ transition: 'stroke .5s ease, stroke-width .5s ease, stroke-opacity .5s ease' }} />

        {/* rivet studs around the plate rim */}
        <g style={{ transition: 'opacity .5s ease' }}>
          {STUDS.map((s, i) => (
            <g key={i}>
              <circle cx={s.x} cy={s.y} r="3.2" fill="#2a2117"
                stroke={lit ? '#d4a851' : '#7a5f28'} strokeWidth="0.95"
                strokeOpacity={lit ? 0.9 : 0.62}
                style={{ transition: 'stroke .5s ease, stroke-opacity .5s ease' }} />
              <circle cx={s.x - 0.7} cy={s.y - 0.9} r="0.95" fill="#caa24e" opacity={lit ? 0.85 : 0.4}
                style={{ transition: 'opacity .5s ease' }} />
            </g>
          ))}
        </g>

        {/* keyhole at the foot of the plate */}
        <g style={{ transition: 'opacity .5s ease' }}>
          <circle cx="60" cy="116" r="4.4" fill="#070605"
            stroke={lit ? '#caa24e' : '#6a5326'} strokeWidth="1" strokeOpacity={lit ? 0.85 : 0.55}
            style={{ transition: 'stroke .5s ease, stroke-opacity .5s ease' }} />
          <path d="M57.8,118 L56.6,127 L63.4,127 L62.2,118 Z" fill="#070605"
            stroke={lit ? '#8a6a2c' : '#4a3a1a'} strokeWidth="0.7" strokeOpacity="0.6" />
          {/* a faint glint of light escaping the keyhole when ignited */}
          <circle cx="60" cy="116" r="2" fill="#f1d27a" opacity={lit ? 0.55 : 0} filter={`url(#${glow})`}
            style={{ transition: 'opacity .5s ease' }} />
        </g>
      </g>
    </svg>
  );
}
