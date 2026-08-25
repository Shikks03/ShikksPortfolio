'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAudio } from '@/lib/audio';
import { useViewport } from '@/lib/useViewport';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import FiligreeCorner from '@/components/shared/FiligreeCorner';
import HeroBackground from '@/components/shared/HeroBackground';

interface MenuItem { id: string; label: string }

interface MainMenuProps {
  onNavigate: (id: string) => void;
  menuItems: MenuItem[];
}

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Mount-reveal helper — mirrors the original staggered timeout schedule.
function reveal(delay: number, toOpacity = 1) {
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: toOpacity, y: 0 },
    transition: { duration: 1.2, delay, ease: EASE },
  };
}

export default function MainMenu({ onNavigate, menuItems }: MainMenuProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  const data = PORTFOLIO_DATA;
  const { isMobile, isCoarse } = useViewport();
  const filigree = isMobile ? 64 : 110;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedIdx(prev => {
          const next = prev === null ? 0 : (prev + 1) % menuItems.length;
          getAudio().hover();
          return next;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedIdx(prev => {
          const next = prev === null ? menuItems.length - 1 : (prev - 1 + menuItems.length) % menuItems.length;
          getAudio().hover();
          return next;
        });
      } else if (e.key === 'Enter' && focusedIdx !== null) {
        getAudio().select();
        onNavigate(menuItems[focusedIdx].id);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focusedIdx, menuItems, onNavigate]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <HeroBackground />

      {/* SCREEN-EDGE FILIGREE CORNERS */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 1.4, delay: 0.3 }}
        style={{ position: 'absolute', top: 18, left: 18, zIndex: 30, pointerEvents: 'none' }}>
        <FiligreeCorner size={filigree} flip="tl" />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 1.4, delay: 0.4 }}
        style={{ position: 'absolute', top: 18, right: 18, zIndex: 30, pointerEvents: 'none' }}>
        <FiligreeCorner size={filigree} flip="tr" />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 1.4, delay: 0.5 }}
        style={{ position: 'absolute', bottom: 18, left: 18, zIndex: 30, pointerEvents: 'none' }}>
        <FiligreeCorner size={filigree} flip="bl" />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.9 }} transition={{ duration: 1.4, delay: 0.6 }}
        style={{ position: 'absolute', bottom: 18, right: 18, zIndex: 30, pointerEvents: 'none' }}>
        <FiligreeCorner size={filigree} flip="br" />
      </motion.div>

      {/* GIANT CENTERED TITLE */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'flex-start',
        pointerEvents: 'none',
        paddingTop: 'min(20vh, 200px)',
      }}>
        <motion.div {...reveal(0.12)} style={{
          display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 22,
          marginBottom: isMobile ? 20 : 28,
          padding: '0 16px',
          color: 'var(--parchment-dim)',
        }}>
          <span style={{ width: isMobile ? 24 : 80, height: 1, background: 'linear-gradient(to right, transparent, currentColor)' }} />
          <span className="eyebrow" style={{ marginBottom: 0, textAlign: 'center' }}>
            A Portfolio of the Lands Coded
          </span>
          <span style={{ width: isMobile ? 24 : 80, height: 1, background: 'linear-gradient(to left, transparent, currentColor)' }} />
        </motion.div>
        <motion.h1 {...reveal(0.4)} className="title-disp gold" style={{
          fontSize: 'min(14vw, 24vh, 200px)',
          lineHeight: 0.95,
          margin: 0,
        }}>
          {data.hero.name}
        </motion.h1>
        <motion.div {...reveal(0.4)} style={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
          <svg viewBox="0 0 300 14" width="min(60vw, 520px)" height="14" style={{ opacity: .8 }}>
            <line x1="0" y1="7" x2="120" y2="7" stroke="rgba(212,168,81,.55)" strokeWidth=".6" />
            <line x1="180" y1="7" x2="300" y2="7" stroke="rgba(212,168,81,.55)" strokeWidth=".6" />
            <g transform="translate(150,7)" fill="none" stroke="rgba(212,168,81,.85)" strokeWidth=".8" filter="drop-shadow(0 0 4px rgba(241,210,122,.6))">
              <path d="M -8,0 L 0,-5 L 8,0 L 0,5 Z" />
              <circle r="1.3" fill="rgba(241,210,122,.85)" stroke="none" />
            </g>
          </svg>
        </motion.div>
        <motion.div {...reveal(0.9)} style={{
          marginTop: 14,
          display: 'flex', alignItems: 'center', gap: isMobile ? 10 : 18,
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: isMobile ? 12.5 : 17,
          letterSpacing: isMobile ? '.16em' : '.24em',
          color: 'var(--parchment-2)',
          textTransform: 'uppercase',
          textAlign: 'center',
          padding: '0 16px',
        }}>
          <span style={{ width: isMobile ? 20 : 60, height: 1, background: 'currentColor', opacity: .5 }} />
          {data.hero.epithet}
          <span style={{ width: isMobile ? 20 : 60, height: 1, background: 'currentColor', opacity: .5 }} />
        </motion.div>
      </div>

      {/* MENU — bottom left, like ER's main menu */}
      <motion.div {...reveal(1.2)} style={{
        position: 'absolute',
        left: isMobile ? 20 : '5vw',
        right: isMobile ? 20 : 'auto',
        bottom: isMobile ? '9vh' : '10vh',
        display: 'flex', flexDirection: 'column',
        gap: 2,
        minWidth: isMobile ? 0 : 300,
      }}>
        <div className="eyebrow" style={{ marginBottom: 14, color: 'var(--gold-deep)' }}>
          ‹ Menu ›
        </div>
        {menuItems.map((it, i) => (
          <a key={it.id}
             className={`menu-item ${hovered === it.id || focusedIdx === i ? 'active' : ''}`}
             onMouseEnter={() => { setHovered(it.id); setFocusedIdx(i); getAudio().hover(); }}
             onMouseLeave={() => { setHovered(null); }}
             onClick={(e) => { e.preventDefault(); getAudio().select(); onNavigate(it.id); }}
             href="#">
            {it.label}
            <span className="num">{String(i + 1).padStart(2, '0')}</span>
          </a>
        ))}
        <div style={{
          marginTop: 18,
          paddingLeft: 28,
          fontFamily: 'var(--display)',
          fontSize: 10,
          letterSpacing: '.32em',
          color: 'var(--parchment-dim)',
          opacity: .55,
          textTransform: 'uppercase',
        }}>
          v. 0.1 · Tarnished Build
        </div>
        <a
          href="https://riku.works"
          target="_blank"
          rel="noopener noreferrer"
          className="riku-credit"
          style={{ marginTop: 2, padding: '10px 12px 10px 28px', alignSelf: 'flex-start' }}
          onMouseEnter={() => getAudio().hover()}
        >
          Site by RIKU
        </a>
      </motion.div>

      {/* RIGHT-SIDE CARTOUCHE — a small ornament with crest */}
      <div style={{
        position: 'absolute',
        display: isMobile ? 'none' : 'block',
        right: '6vw', top: 'calc(50% + 4vh)',
        transform: 'translateY(-50%)',
        width: 'min(110px, 12vw)',
        pointerEvents: 'none',
      }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 0.85, y: 0 }} transition={{ duration: 1.2, delay: 1.5, ease: EASE }}>
          <svg viewBox="0 0 200 320" style={{ width: '100%', display: 'block', opacity: .85 }}>
            <defs>
              <radialGradient id="crest-fade" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f1d27a" stopOpacity=".25" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#crest-fade)" />
            <g stroke="#d4a851" fill="none" strokeWidth=".8" style={{ animation: 'slow-spin 80s linear infinite', transformOrigin: '100px 100px' }}>
              <circle cx="100" cy="100" r="78" strokeDasharray="2 4" opacity=".6" />
              <circle cx="100" cy="100" r="64" />
            </g>
            <g stroke="#d4a851" fill="none" strokeWidth="1" filter="drop-shadow(0 0 4px rgba(241,210,122,.6))">
              <path d="M 100,50 L 105,90 L 145,100 L 105,110 L 100,150 L 95,110 L 55,100 L 95,90 Z" />
              <circle cx="100" cy="100" r="20" />
              <circle cx="100" cy="100" r="6" fill="#d4a851" />
              <line x1="100" y1="180" x2="100" y2="290" />
              <line x1="80"  y1="200" x2="120" y2="200" />
              <line x1="85"  y1="260" x2="115" y2="260" />
              <path d="M 90,290 L 100,310 L 110,290 Z" fill="#d4a851" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* BOTTOM BAR — ER-style prompts */}
      <motion.div {...reveal(1.7)} style={{
        position: 'absolute',
        bottom: isMobile ? 'max(14px, env(safe-area-inset-bottom))' : 24,
        left: 0, right: 0,
        display: 'flex',
        justifyContent: isCoarse ? 'center' : 'space-between',
        padding: isMobile ? '0 20px' : '0 64px',
      }}>
        {!isCoarse && (
          <div className="er-prompt">
            <span className="key">↑↓</span> Navigate
            <span style={{ width: 18 }} />
            <span className="key">Enter</span> Select
          </div>
        )}
        <div className="er-prompt" style={{ color: 'var(--gold-deep)', whiteSpace: 'nowrap' }}>
          ✦ &nbsp; Grace will guide you &nbsp; ✦
        </div>
      </motion.div>
    </div>
  );
}
