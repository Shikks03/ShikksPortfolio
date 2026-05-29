'use client';

import { useId } from 'react';
import { CarvedGroups, getRuneDraw } from './Runes';

/* =================================================================
   SEAL STONE — a weathered stone medallion with an incised sigil.
   A slightly irregular disc (hand-wavered outline), a concave inner
   groove, hairline cracks, and a *broken* gilded rim (eroded gold
   leaf). A per-project aged tint bleeds as an aura behind the stone
   and warms when the seal is touched; the carved rune ignites with
   molten gold. No perfect circles, no reticle rings.
   ================================================================= */

interface SealStoneProps {
  runeId: string;
  size?: number;
  /** aged enamel tint (hex) — the stone's quiet identity */
  tint?: string;
  /** ignited (hovered) state */
  lit?: boolean;
}

// hand-wavered disc outline (~r52, centred at 60,60)
const DISC =
  'M60,8.5 C75,8 89,15 99,27 C108,38 112,49 111.5,61 C111,76 104,90 91,99 ' +
  'C80,107 68,112 58,111 C44,110 30,103 21,92 C12,81 8,68 8.5,57 ' +
  'C9,42 17,28 30,18 C39,12 49,9 60,8.5 Z';

// simple deterministic hash → rim/crack rotation, so each stone wears differently
function seedAngle(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return Math.abs(h) % 360;
}

export default function SealStone({ runeId, size = 116, tint = '#b07a32', lit = false }: SealStoneProps) {
  const uid = useId().replace(/[:]/g, '');
  const stone = `stone-${uid}`;
  const vig = `vig-${uid}`;
  const aura = `aura-${uid}`;
  const ang = seedAngle(runeId);

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        {/* stone body — lit from upper-left, dark and matte */}
        <radialGradient id={stone} cx="42%" cy="34%" r="78%">
          <stop offset="0%" stopColor="#3c342b" />
          <stop offset="46%" stopColor="#241d17" />
          <stop offset="100%" stopColor="#120e0b" />
        </radialGradient>
        {/* edge vignette to seat the disc */}
        <radialGradient id={vig} cx="50%" cy="50%" r="50%">
          <stop offset="62%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
        <filter id={aura} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* tint aura + warm forge underglow (behind the stone) */}
      <g filter={`url(#${aura})`} style={{ transition: 'opacity .55s ease' }} opacity={lit ? 1 : 0.62}>
        <circle cx="60" cy="60" r="50" fill={tint} opacity={lit ? 0.3 : 0.14} style={{ transition: 'opacity .55s ease' }} />
        <circle cx="60" cy="64" r="34" fill="#c47a3e" opacity={lit ? 0.22 : 0.08} style={{ transition: 'opacity .55s ease' }} />
      </g>

      {/* stone disc */}
      <path d={DISC} fill={`url(#${stone})`} stroke="#0a0807" strokeWidth="1.2" />
      <path d={DISC} fill={`url(#${vig})`} />

      {/* hairline cracks + concave inner groove (rotated per stone) */}
      <g transform={`rotate(${ang} 60 60)`} fill="none" stroke="#08060a" strokeLinecap="round">
        <circle cx="60" cy="60" r="45.5" strokeOpacity="0.4" strokeWidth="1.1" />
        <path d="M24,46 C40,53 66,50 95,67" strokeOpacity="0.32" strokeWidth="0.8" />
        <path d="M74,26 C69,50 78,76 61,98" strokeOpacity="0.24" strokeWidth="0.7" />
      </g>
      {/* faint catch-light along the upper rim */}
      <path d="M28,24 C40,15 54,11 68,11.5" fill="none" stroke="rgba(247,232,184,0.16)" strokeWidth="1.3" strokeLinecap="round" />

      {/* broken gilded rim — eroded gold leaf (two irregular dashed rings) */}
      <g transform={`rotate(${ang} 60 60)`} fill="none" style={{ transition: 'opacity .5s ease, stroke .5s ease' }}>
        <circle
          cx="60" cy="60" r="50"
          stroke={lit ? '#f1d27a' : '#b9913f'}
          strokeWidth={lit ? 1.6 : 1.2}
          strokeOpacity={lit ? 0.9 : 0.6}
          strokeDasharray="46 10 78 16 40 22 64 13"
          strokeLinecap="round"
        />
        <circle
          cx="60" cy="60" r="47"
          stroke={lit ? '#d4a851' : '#8a6a2c'}
          strokeWidth="0.8"
          strokeOpacity={lit ? 0.7 : 0.42}
          strokeDasharray="120 30 70 40 90 26"
          strokeLinecap="round"
        />
        {/* a faint ring of the project's tint, just inside the gilding */}
        <circle cx="60" cy="60" r="48.5" stroke={tint} strokeWidth="2.4" strokeOpacity={lit ? 0.22 : 0.1}
          strokeDasharray="10 26 14 40 8 30" style={{ transition: 'stroke-opacity .5s ease' }} />
      </g>

      {/* the incised rune, ignited together with the stone */}
      <g transform="translate(60 60) scale(0.74) translate(-60 -60)">
        <CarvedGroups draw={getRuneDraw(runeId)} lit={lit} />
      </g>
    </svg>
  );
}
