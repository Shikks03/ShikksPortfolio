'use client';

import { useMemo } from 'react';

interface StarfieldProps {
  count?: number;
}

export default function Starfield({ count = 100 }: StarfieldProps) {
  const stars = useMemo(() => {
    const a = [];
    for (let i = 0; i < count; i++) {
      a.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: 0.3 + Math.random() * 0.9,
        o: 0.1 + Math.random() * 0.26,
        dur: 4 + Math.random() * 7,
        delay: -Math.random() * 8,
      });
    }
    return a;
  }, [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.s, height: s.s,
          borderRadius: '50%',
          background: 'rgba(217,201,163,.6)',
          opacity: s.o,
          boxShadow: '0 0 3px rgba(212,168,81,.3)',
          animation: `shimmer ${s.dur}s ease-in-out ${s.delay}s infinite`,
        }} />
      ))}
    </div>
  );
}
