'use client';

import { useState, useEffect } from 'react';

interface EmberFieldProps {
  count?: number;
  intense?: number;
}

function makeEmbers(count: number) {
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
}

export default function EmberField({ count = 36, intense = 1 }: EmberFieldProps) {
  const [embers, setEmbers] = useState<ReturnType<typeof makeEmbers>>([]);

  useEffect(() => {
    setEmbers(makeEmbers(count));
  }, [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', opacity: intense }}>
      {embers.map((e, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${e.left}%`,
          bottom: 0,
          width: e.size,
          height: e.size,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(241,210,122,1) 0%, rgba(196,122,62,.6) 50%, transparent 100%)',
          boxShadow: '0 0 6px rgba(241,210,122,.8), 0 0 12px rgba(196,122,62,.4)',
          opacity: e.opacity,
          animation: `ember-rise ${e.dur}s linear ${e.delay}s infinite`,
          ['--drift' as string]: `${e.drift}px`,
        }} />
      ))}
    </div>
  );
}
