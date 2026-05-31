'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { getAudio } from '@/lib/audio';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import EmberField from '@/components/shared/EmberField';
import BackButton from '@/components/shared/BackButton';
import SealStone from '@/components/projects/SealStone';
import LockSocket from './LockSocket';
import { DOOR_SVG } from './doorFrame';

/* deterministic PRNG so ray/dust placement matches between SSR and client */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function ContactPage({ onBack }: { onBack: () => void }) {
  const data = PORTFOLIO_DATA.contact;
  const [hovered, setHovered] = useState<number | null>(null);

  // god-rays bursting from the seam (behind the door, haloing the silhouette)
  const rays = useMemo(() => {
    const rnd = mulberry32(7);
    return Array.from({ length: 15 }, (_, i) => ({
      angle: i * (360 / 15) + (rnd() * 9 - 4.5),
      height: 108 + rnd() * 46,
      opacity: 0.22 + rnd() * 0.5,
    }));
  }, []);

  // dust motes drifting between the gate and the viewer
  const dust = useMemo(() => {
    const rnd = mulberry32(42);
    return Array.from({ length: 30 }, () => ({
      left: 16 + rnd() * 68,
      top: 10 + rnd() * 74,
      dx: rnd() * 64 - 32,
      dy: -36 - rnd() * 74,
      size: 1 + rnd() * 2.4,
      dur: 9 + rnd() * 10,
      delay: -rnd() * 20,
      opacity: 0.18 + rnd() * 0.5,
    }));
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', cursor: 'none' }}>

      {/* ── BACKGROUND ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(ellipse at 50% 90%, rgba(196,122,62,.16) 0%, transparent 48%),' +
          'radial-gradient(ellipse at 50% 60%, rgba(122,46,31,.18) 0%, transparent 55%),' +
          'linear-gradient(180deg, #0a0809 0%, #050307 100%)',
      }} />

      {/* ── EMBERS ── */}
      <EmberField count={56} intense={0.9} tall />

      {/* ── HEADER (centered, animated) ── */}
      <motion.header
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          paddingTop: 32,
          zIndex: 20,
        }}
      >
        <div className="eyebrow" style={{ color: 'var(--gold-deep)', marginBottom: 6 }}>
          ‹ Codex IV · Means of Summoning ›
        </div>
        <h1 className="title-disp gold" style={{ fontSize: 46, lineHeight: 1, marginTop: 4 }}>
          Seek an Audience
        </h1>
        <p style={{
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: 14.5,
          color: 'var(--parchment-dim)',
          marginTop: 8,
          maxWidth: 480,
          lineHeight: 1.55,
        }}>
          {data.intro}
        </p>

        {/* back button — top right */}
        <div style={{ position: 'absolute', top: 36, right: 52 }}>
          <BackButton onBack={onBack} />
        </div>
      </motion.header>

      {/* ── DOOR + SEALS ── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -8,
        transform: 'scale(1.5)',
        transformOrigin: 'center center',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.975 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.22 }}
          style={{
            position: 'relative',
            width: 660,
            height: 560,
            flexShrink: 0,
          }}
        >
          {/* ── DEPTH FOG — far planes that seat the gate in atmosphere ── */}
          <div aria-hidden="true" className="cd-fog cd-fog-1" />
          <div aria-hidden="true" className="cd-fog cd-fog-2" />

          {/* ── GOD-RAYS — light from beyond, haloing the gate ── */}
          <div aria-hidden="true" className="cd-godrays">
            <div className="cd-rays-spin">
              {rays.map((r, i) => (
                <span
                  key={i}
                  className="cd-ray"
                  style={{
                    transform: `translate(-50%, 0) rotate(${r.angle}deg)`,
                    height: `${r.height}%`,
                    opacity: r.opacity,
                  }}
                />
              ))}
            </div>
          </div>

          {/* THE GREAT SEALED DOOR — static decorative SVG, pointer-events:none */}
          {/* Content is a static authored constant, not user input — no XSS risk */}
          <div
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 20, pointerEvents: 'none' }}
            dangerouslySetInnerHTML={{ __html: DOOR_SVG }}
          />

          {/* ── LIGHT LEAKING THROUGH THE SEAM (in front of the door) ── */}
          <div aria-hidden="true" className="cd-seamhot" />
          <div aria-hidden="true" className="cd-archburst" />

          {/* Seam animated warm-light overlays (existing) */}
          <div
            aria-hidden="true"
            className="seam-light"
            style={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 12,
              height: '100%',
              background: 'linear-gradient(to bottom, transparent 4%, rgba(241,195,92,.12) 14%, rgba(212,168,81,.22) 36%, rgba(241,195,92,.32) 50%, rgba(212,168,81,.22) 64%, rgba(241,195,92,.12) 86%, transparent 96%)',
              filter: 'blur(4px)',
              pointerEvents: 'none',
              zIndex: 25,
              animation: 'seam-pulse 3.8s ease-in-out infinite',
            }}
          />

          {/* THREE WARD-LOCKS — seals seated into iron escutcheons across the ward-band */}
          <div style={{
            position: 'absolute',
            top: '57%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 48,
            zIndex: 30,
            pointerEvents: 'all',
          }}>
            {data.handles.map((h, i) => {
              const isMail = h.href.startsWith('mailto:');
              const hint = isMail ? 'send word ✉' : 'open ↗';
              const active = hovered === i;
              const delay = 0.52 + i * 0.16;
              const SOCKET = 118;
              const SEAL = 96;
              // a shallow keystone arc so the three wards don't sit dead-level
              const arc = [7, -5, 7][i] ?? 0;

              return (
                <motion.a
                  key={h.label}
                  href={h.href}
                  {...(!isMail ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={`${h.label} — ${h.value}`}
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 0,
                    marginTop: arc,
                    textDecoration: 'none',
                    cursor: 'none',
                    position: 'relative',
                  }}
                  onMouseEnter={() => {
                    setHovered(i);
                    getAudio().hover();
                  }}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                  onClick={() => getAudio().confirm()}
                >
                  {/* LOCK — the seal seated concentrically inside its iron escutcheon */}
                  <div
                    className="cd-ward-breathe"
                    style={{
                      position: 'relative',
                      width: SOCKET,
                      height: SOCKET,
                      display: 'grid',
                      placeItems: 'center',
                      animationDelay: `${i * -1.5}s`,
                    }}
                  >
                    {/* warm bloom behind the ward, ignited on hover */}
                    <div aria-hidden="true" style={{
                      position: 'absolute',
                      width: SOCKET * 1.9,
                      height: SOCKET * 1.9,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(241,210,122,.32) 0%, rgba(196,122,62,.16) 38%, transparent 70%)',
                      opacity: active ? 1 : 0,
                      transition: 'opacity .4s ease',
                      pointerEvents: 'none',
                      zIndex: 0,
                    }} />

                    {/* iron escutcheon ward-lock (behind the seal) */}
                    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', zIndex: 1 }}>
                      <LockSocket size={SOCKET} lit={active} tint={h.tint ?? '#b07a32'} seed={i} />
                    </div>

                    {/* the seal — grows out of the socket and glows on hover */}
                    <motion.div
                      animate={{ scale: active ? 1.2 : 1 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                      style={{
                        position: 'relative',
                        zIndex: 2,
                        filter: active
                          ? 'drop-shadow(0 0 18px rgba(241,210,122,.6)) drop-shadow(0 0 40px rgba(196,122,62,.4))'
                          : 'none',
                        transition: 'filter .4s ease',
                      }}
                    >
                      <SealStone
                        runeId={h.rune ?? '_generic'}
                        tint={h.tint ?? '#b07a32'}
                        size={SEAL}
                        lit={active}
                      />
                    </motion.div>
                  </div>

                  {/* CAPTION */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    marginTop: 22,
                  }}>
                    <div className="eyebrow" style={{
                      fontSize: 10,
                      letterSpacing: '.5em',
                      color: 'var(--gold-deep)',
                    }}>
                      {h.label}
                    </div>
                    <div style={{
                      fontFamily: 'var(--display)',
                      fontSize: 12,
                      letterSpacing: '.08em',
                      color: 'var(--parchment-2)',
                      marginTop: 2,
                      textAlign: 'center',
                    }}>
                      {h.value}
                    </div>
                    <div style={{
                      fontFamily: 'var(--serif)',
                      fontStyle: 'italic',
                      fontSize: 12,
                      color: 'var(--parchment-dim)',
                      opacity: active ? 1 : 0,
                      marginTop: 4,
                      transition: 'opacity .3s ease',
                      letterSpacing: '.04em',
                    }}>
                      {hint}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── DUST MOTES — drifting in the air between the gate and the viewer ── */}
      <div aria-hidden="true" className="cd-dust">
        {dust.map((m, i) => (
          <span
            key={i}
            className="cd-mote"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              opacity: m.opacity,
              animationDuration: `${m.dur}s`,
              animationDelay: `${m.delay}s`,
              ['--mdx' as string]: `${m.dx}px`,
              ['--mdy' as string]: `${m.dy}px`,
            }}
          />
        ))}
      </div>

      {/* ── DEEPENED VIGNETTE — pulls the edges into darkness ── */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 15,
        boxShadow: 'inset 0 0 340px 110px rgba(0,0,0,.78)',
      }} />

    </div>
  );
}
