'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';

interface CustomCursorProps {
  style: string;
}

export default function CustomCursor({ style }: CustomCursorProps) {
  const posX = useMotionValue(-100);
  const posY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      posX.set(e.clientX);
      posY.set(e.clientY);
    }
    function onOver(e: MouseEvent) {
      const target = e.target as Element | null;
      const t = target?.closest("a, button, [data-cursor='hover'], .menu-item, input, textarea, .gem-hit");
      setHover(!!t);
    }
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [posX, posY]);

  useAnimationFrame(() => {
    trailX.set(trailX.get() + (posX.get() - trailX.get()) * 0.18);
    trailY.set(trailY.get() + (posY.get() - trailY.get()) * 0.18);
  });

  const hoverClass = hover ? 'hovering' : '';

  if (style === 'classic') {
    return (
      <>
        <motion.div className={`cursor ${hoverClass}`} style={{ left: posX, top: posY }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="3" fill="var(--gold-bright)" />
          </svg>
        </motion.div>
        <motion.div className={`cursor-trail ${hoverClass}`} style={{ left: trailX, top: trailY }} />
      </>
    );
  }

  if (style === 'blade') {
    return (
      <>
        <motion.div className={`cursor ${hoverClass}`}
          style={{ left: posX, top: posY, transform: `translate(-30%, -100%) rotate(${hover ? 6 : -8}deg)`, transition: 'transform .25s' }}>
          <svg width="28" height="42" viewBox="0 0 28 42" style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.7))' }}>
            <defs>
              <linearGradient id="bladeg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f1d27a" />
                <stop offset="100%" stopColor="#8a6a2c" />
              </linearGradient>
            </defs>
            <path d="M 14,2 L 18,28 L 14,32 L 10,28 Z" fill="url(#bladeg)" stroke="#2a2520" strokeWidth=".5" />
            <path d="M 14,2 L 14,32" stroke="#fff7d8" strokeWidth=".4" opacity=".6" />
            <rect x="6" y="30" width="16" height="2.5" fill="#3b332b" />
            <rect x="12" y="32.5" width="4" height="7" fill="#2a2520" />
            <circle cx="14" cy="40" r="2" fill="#d4a851" />
          </svg>
        </motion.div>
        <motion.div className={`cursor-trail ${hoverClass}`} style={{ left: trailX, top: trailY }} />
      </>
    );
  }

  // RUNE (default) — a small radiant sigil that rotates slowly
  return (
    <>
      <motion.div className={`cursor ${hoverClass}`} style={{ left: posX, top: posY }}>
        <svg width="36" height="36" viewBox="0 0 36 36" style={{ animation: 'slow-spin 12s linear infinite', filter: 'drop-shadow(0 0 6px rgba(241,210,122,.7))' }}>
          <g stroke="var(--gold-bright)" fill="none" strokeWidth=".9">
            <circle cx="18" cy="18" r="16" strokeDasharray="1 3" opacity=".7" />
            <path d="M 18,6 L 20,16 L 30,18 L 20,20 L 18,30 L 16,20 L 6,18 L 16,16 Z" />
            <circle cx="18" cy="18" r="3" fill="var(--gold-bright)" stroke="none" />
          </g>
        </svg>
      </motion.div>
      <motion.div className={`cursor-trail ${hoverClass}`} style={{ left: trailX, top: trailY }} />
    </>
  );
}
