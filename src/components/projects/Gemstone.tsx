'use client';

import type { GemShape } from '@/data/portfolio';

interface ShapeDef {
  outline: string;
  facets: string[];
}

const SHAPES: Record<GemShape, ShapeDef> = {
  kite:     { outline: 'M 100,12 L 168,100 L 100,188 L 32,100 Z', facets: ['M 100,12 L 100,188', 'M 32,100 L 168,100', 'M 100,12 L 32,100 L 100,188', 'M 100,12 L 168,100 L 100,188'] },
  hex:      { outline: 'M 100,16 L 174,58 L 174,142 L 100,184 L 26,142 L 26,58 Z', facets: ['M 26,58 L 100,100 L 174,58', 'M 26,142 L 100,100 L 174,142', 'M 100,16 L 100,184'] },
  oval:     { outline: 'M 100,12 C 50,12 22,60 22,100 C 22,140 50,188 100,188 C 150,188 178,140 178,100 C 178,60 150,12 100,12 Z', facets: ['M 60,40 Q 100,80 60,160', 'M 140,40 Q 100,80 140,160', 'M 60,40 Q 100,30 140,40'] },
  shard:    { outline: 'M 100,8 L 150,80 L 130,188 L 70,188 L 50,80 Z', facets: ['M 100,8 L 100,188', 'M 50,80 L 150,80', 'M 70,188 L 100,80 L 130,188'] },
  teardrop: { outline: 'M 100,10 C 60,60 36,110 50,150 C 64,184 136,184 150,150 C 164,110 140,60 100,10 Z', facets: ['M 100,10 L 100,170', 'M 50,150 Q 100,110 150,150', 'M 100,40 Q 130,90 100,140 Q 70,90 100,40 Z'] },
  diamond:  { outline: 'M 100,10 L 180,80 L 168,140 L 100,190 L 32,140 L 20,80 Z', facets: ['M 20,80 L 180,80', 'M 32,140 L 168,140', 'M 100,10 L 100,190', 'M 20,80 L 100,80 L 168,140'] },
  obelisk:  { outline: 'M 100,8 L 144,32 L 156,180 L 44,180 L 56,32 Z', facets: ['M 100,8 L 100,180', 'M 56,32 L 144,32', 'M 56,32 L 100,180 L 144,32'] },
};

interface GemBodyProps {
  id: string;
  def: ShapeDef;
  hue: number;
  pulse: boolean;
  hovered: boolean;
}

function GemBody({ id, def, hue, pulse, hovered }: GemBodyProps) {
  return (
    <g>
      <path d={def.outline} fill={`url(#gem-body-${id})`} stroke={`hsl(${hue} 80% 55%)`} strokeWidth="1" opacity=".95" />
      <g stroke={`hsl(${hue} 85% 70%)`} strokeWidth=".7" fill="none" opacity=".55">
        {def.facets.map((d, i) => <path key={i} d={d} />)}
      </g>
      <path d={def.outline} fill={`url(#gem-inner-${id})`} opacity={hovered ? 0.85 : 0.65} style={{ transition: 'opacity .4s' }} />
      <g style={{ animation: pulse ? `pulse-glow ${4 + (id.length % 3)}s ease-in-out infinite` : undefined }}>
        <ellipse cx="80" cy="60" rx="20" ry="8" fill="white" opacity=".18" transform="rotate(-30 80 60)" />
      </g>
    </g>
  );
}

interface GemstoneProps {
  shape?: GemShape;
  hue?: number;
  size?: number;
  cracked?: boolean;
  hovered?: boolean;
  pulse?: boolean;
  id?: string;
}

export default function Gemstone({
  shape = 'kite',
  hue = 16,
  size = 160,
  cracked = false,
  hovered = false,
  pulse = true,
  id = 'g',
}: GemstoneProps) {
  const def = SHAPES[shape] || SHAPES.kite;

  const splitOffset = cracked ? 26 : 0;
  const fillTop    = `hsl(${hue} 60% 22%)`;
  const fillBot    = `hsl(${hue} 55% 14%)`;
  const fillFacet  = `hsl(${hue} 80% 75%)`;
  const fillHi     = `hsl(${hue} 90% 88%)`;
  const glowCol    = `hsl(${hue} 90% 70%)`;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ overflow: 'visible', display: 'block' }}>
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
        <clipPath id={`gem-top-${id}`}>
          <rect x="-10" y="-10" width="220" height={111 - splitOffset / 2} />
        </clipPath>
        <clipPath id={`gem-bot-${id}`}>
          <rect x="-10" y={99 + splitOffset / 2} width="220" height={220} />
        </clipPath>
      </defs>

      <g style={{ transition: 'opacity .6s ease' }} opacity={hovered ? 0.9 : 0.45}>
        <circle cx="100" cy="100" r="90" fill={glowCol} opacity=".06" filter={`url(#gem-glow-${id})`} />
        <circle cx="100" cy="100" r="60" fill={glowCol} opacity=".10" filter={`url(#gem-glow-${id})`} />
      </g>

      <g style={{ transition: 'transform .5s cubic-bezier(.7,-.2,.3,1.2)', transform: cracked ? `translateY(-${splitOffset}px)` : 'translateY(0)' }} clipPath={`url(#gem-top-${id})`}>
        <GemBody id={id} def={def} hue={hue} pulse={pulse} hovered={hovered} />
      </g>
      <g style={{ transition: 'transform .5s cubic-bezier(.7,-.2,.3,1.2)', transform: cracked ? `translateY(${splitOffset}px)` : 'translateY(0)' }} clipPath={`url(#gem-bot-${id})`}>
        <GemBody id={id} def={def} hue={hue} pulse={pulse} hovered={hovered} />
      </g>

      {cracked && (
        <g stroke={fillHi} strokeWidth="1.2" fill="none" opacity=".85" style={{ animation: 'shimmer 1.2s ease-in-out infinite' }}>
          <path d="M 20,100 L 40,96 L 60,104 L 80,98 L 100,102 L 120,96 L 140,102 L 160,98 L 180,100" />
          <path d="M 30,100 L 50,108 L 70,94 L 90,106 L 110,96 L 130,108 L 150,94 L 170,102" opacity=".6" />
        </g>
      )}
    </svg>
  );
}
