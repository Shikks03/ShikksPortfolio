'use client';

import EmberField from './EmberField';

interface HeroBackgroundProps {
  paused?: boolean;
}

export default function HeroBackground({ paused = false }: HeroBackgroundProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#000' }}>
      <div style={{
        position: 'absolute',
        inset: '-6%',
        animation: paused ? undefined : 'mist-drift calc(38s / var(--speed)) ease-in-out infinite',
      }}>
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%' }}>
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
          <rect width="1600" height="900" fill="url(#sun)" />

          <g opacity=".95" transform="translate(900,0)">
            <path d="M 100,420 L 90,300 L 75,180 L 70,60 L 95,30 L 110,60 L 125,180 L 140,300 L 130,420 Z" fill="#0a0807" />
            <g opacity=".85">
              <ellipse cx="100" cy="100" rx="120" ry="80" fill="url(#sun)" opacity=".4" />
              <path d="M 30,140 Q 50,80 100,60 Q 150,80 170,140 Q 130,170 100,160 Q 70,170 30,140 Z" fill="#0a0807" />
              <path d="M 50,130 Q 80,90 100,80 Q 120,90 150,130 Q 120,140 100,135 Q 80,140 50,130 Z" fill="#1a1410" opacity=".5" />
            </g>
          </g>

          <path d="M 0,620 L 120,520 L 220,560 L 360,460 L 500,540 L 640,490 L 780,560 L 920,500 L 1060,560 L 1200,520 L 1340,580 L 1480,500 L 1600,560 L 1600,900 L 0,900 Z" fill="url(#mtnFar)" />
          <path d="M 0,720 L 140,640 L 280,690 L 420,610 L 580,700 L 740,620 L 880,710 L 1040,640 L 1200,720 L 1380,640 L 1520,700 L 1600,660 L 1600,900 L 0,900 Z" fill="url(#mtnMid)" />
          <path d="M 0,820 L 200,760 L 400,810 L 600,750 L 800,810 L 1000,770 L 1200,820 L 1400,760 L 1600,800 L 1600,900 L 0,900 Z" fill="url(#mtnNear)" />

          <rect y="500" width="1600" height="400" fill="url(#mist)" opacity=".55" />

          <g transform="translate(290,755)" opacity=".95">
            <path d="M 0,0 L 0,-22 M -4,-22 L 4,-22 L 6,-26 L -6,-26 Z" stroke="#0a0807" strokeWidth="2.5" fill="#0a0807" />
            <path d="M -8,0 L -10,-14 L -4,-22 L 4,-22 L 10,-14 L 8,0 Z" fill="#0a0807" />
            <circle r="40" fill="url(#sun)" opacity=".15" />
          </g>
        </svg>
      </div>

      <div className="hero-badge" style={{
        position: 'absolute',
        top: 24, left: 24,
        padding: '4px 10px',
        fontFamily: 'var(--display)',
        fontSize: 9,
        letterSpacing: '.3em',
        color: 'rgba(217,201,163,.35)',
        border: '1px solid rgba(217,201,163,.15)',
        borderRadius: 2,
        pointerEvents: 'none',
      }}>
        [ HERO VIDEO · PLACEHOLDER ]
      </div>

      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 40% 60%, transparent 20%, rgba(0,0,0,.55) 80%)',
        mixBlendMode: 'multiply',
      }} />

      <EmberField count={48} />
    </div>
  );
}
