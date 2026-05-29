'use client';

type Flip = 'tl' | 'tr' | 'bl' | 'br';

const TRANSFORMS: Record<Flip, string> = {
  tl: '',
  tr: 'scale(-1,1)',
  bl: 'scale(1,-1)',
  br: 'scale(-1,-1)',
};

interface FiligreeCornerProps {
  size?: number;
  color?: string;
  flip?: Flip;
}

export default function FiligreeCorner({ size = 90, color = 'rgba(212,168,81,.55)', flip = 'tl' }: FiligreeCornerProps) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size}
      style={{ transform: TRANSFORMS[flip], pointerEvents: 'none' }}>
      <g fill="none" stroke={color} strokeWidth="0.9" strokeLinecap="round">
        <path d="M 4,40 L 4,4 L 40,4" />
        <path d="M 8,40 L 8,8 L 40,8" opacity=".4" />
        <path d="M 4,40 Q 4,52 14,52 Q 24,52 24,40 Q 24,32 18,32" />
        <path d="M 40,4 Q 52,4 52,14 Q 52,24 40,24 Q 32,24 32,18" />
        <path d="M 14,14 L 22,6 L 30,14 L 22,22 Z" />
        <circle cx="22" cy="14" r="1.6" fill={color} stroke="none" />
        <path d="M 6,30 L 10,30 M 6,24 L 11,24 M 6,18 L 12,18" opacity=".55" />
        <path d="M 30,6 L 30,10 M 24,6 L 24,11 M 18,6 L 18,12" opacity=".55" />
        <circle cx="18" cy="32" r="1" fill={color} stroke="none" />
        <circle cx="32" cy="18" r="1" fill={color} stroke="none" />
      </g>
    </svg>
  );
}
