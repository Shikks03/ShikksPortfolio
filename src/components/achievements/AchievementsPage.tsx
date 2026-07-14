'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import EmberField from '@/components/shared/EmberField';
import BackButton from '@/components/shared/BackButton';

const EASE = [0.2, 0.7, 0.2, 1] as const;

interface Stat { key: string; val: number; note: string }
interface TimelineItem { year: string; title: string; org: string; body: string }
interface SkillSchool { school: string; note: string; arts: string[] }

/** Full-width character-introduction band — the class-select flavor text. */
function IntroBand({ text }: { text: string }) {
  const first = text.charAt(0);
  const rest = text.slice(1);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      style={{
        position: 'relative',
        border: '1px solid rgba(212,168,81,.2)',
        background:
          'radial-gradient(ellipse at 10% -10%, rgba(122,46,31,.16) 0%, transparent 55%),' +
          'linear-gradient(180deg, rgba(20,17,13,.55) 0%, rgba(7,6,10,.32) 100%)',
        boxShadow: 'inset 0 0 50px rgba(0,0,0,.5)',
        padding: '22px 32px 26px',
        overflow: 'hidden',
      }}>
      {/* corner ticks, echoing the portrait frame */}
      {([[10, 10, 1, 1], [10, 10, -1, 1], [10, 10, 1, -1], [10, 10, -1, -1]] as const).map(([x, y, sx, sy], i) => (
        <svg key={i} viewBox="0 0 20 20" width="12" height="12"
          style={{
            position: 'absolute',
            [sx > 0 ? 'left' : 'right']: x,
            [sy > 0 ? 'top' : 'bottom']: y,
            transform: `scale(${sx},${sy})`,
            color: 'var(--gold)', opacity: .5,
          }}>
          <path d="M 0,0 L 16,0 M 0,0 L 0,16" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>
      ))}

      <div className="eyebrow" style={{
        color: 'var(--gold-deep)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <svg viewBox="0 0 24 24" width="15" height="15" style={{ filter: 'drop-shadow(0 0 5px rgba(241,210,122,.5))' }}>
          <g stroke="var(--gold)" strokeWidth="1.1" fill="none">
            <path d="M 12,2 L 22,12 L 12,22 L 2,12 Z" />
            <circle cx="12" cy="12" r="3.4" fill="var(--gold-bright)" stroke="none" />
          </g>
        </svg>
        The Wanderer — an introduction
      </div>

      <p style={{
        fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: 15.5, color: 'var(--parchment)',
        lineHeight: 1.72, marginTop: 14, maxWidth: 940,
        textWrap: 'pretty',
      }}>
        <span style={{
          float: 'left',
          fontFamily: 'var(--display)', fontStyle: 'normal',
          fontSize: 52, lineHeight: .82,
          color: 'var(--gold-bright)',
          padding: '2px 12px 0 0',
          textShadow: '0 0 18px rgba(241,210,122,.4)',
        }}>{first}</span>
        {rest}
      </p>
    </motion.div>
  );
}

/** A single skill rendered as an inscribed rune-chip. */
function RuneChip({ label, delay }: { label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      whileHover={{
        borderColor: 'rgba(241,210,122,.7)',
        boxShadow: '0 0 18px rgba(241,210,122,.28)',
        backgroundColor: 'rgba(212,168,81,.09)',
      }}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 9,
        padding: '7px 14px',
        border: '1px solid rgba(212,168,81,.28)',
        background: 'rgba(212,168,81,.04)',
        cursor: 'default',
      }}>
      <svg viewBox="0 0 16 16" width="12" height="12" style={{ flexShrink: 0 }}>
        <path d="M 8,1 L 14.9,5 L 14.9,11 L 8,15 L 1.1,11 L 1.1,5 Z"
          fill="none" stroke="var(--gold)" strokeWidth="1" opacity=".8" />
        <circle cx="8" cy="8" r="2" fill="var(--gold-bright)" />
      </svg>
      <span style={{
        fontFamily: 'var(--display)', fontSize: 13,
        letterSpacing: '.05em', color: 'var(--parchment)',
        whiteSpace: 'nowrap',
      }}>{label}</span>
    </motion.div>
  );
}

/** One school of arts — a titled cluster of rune-chips. */
function SkillSchoolBlock({ s, gi }: { s: SkillSchool; gi: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 + gi * 0.12, ease: EASE }}>
      <div style={{
        fontFamily: 'var(--display)', fontSize: 12,
        letterSpacing: '.22em', textTransform: 'uppercase',
        color: 'var(--gold-bright)',
        textShadow: '0 0 12px rgba(241,210,122,.25)',
      }}>‹ {s.school} ›</div>
      <div style={{
        fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: 12.5, color: 'var(--parchment-dim)',
        marginTop: 3,
      }}>{s.note}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 14 }}>
        {s.arts.map((a, i) => (
          <RuneChip key={a} label={a} delay={0.28 + gi * 0.12 + i * 0.06} />
        ))}
      </div>
    </motion.div>
  );
}

function Statline({ s, idx }: { s: Stat; idx: number }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '140px 1fr 56px',
      alignItems: 'center',
      gap: 14,
      padding: '10px 0',
      borderBottom: '1px solid rgba(212,168,81,.12)',
    }}>
      <div style={{
        fontFamily: 'var(--display)',
        fontSize: 12,
        letterSpacing: '.22em',
        color: 'var(--parchment-2)',
        textTransform: 'uppercase',
      }}>
        {s.key}
        <div style={{
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: 11,
          letterSpacing: '0',
          color: 'var(--parchment-dim)',
          textTransform: 'none',
          marginTop: 2,
        }}>{s.note}</div>
      </div>
      <div style={{
        height: 8,
        background: 'rgba(212,168,81,.06)',
        border: '1px solid rgba(212,168,81,.18)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${(s.val / 60) * 100}%` }}
          transition={{ duration: 1.2, delay: 0.2 + idx * 0.09, ease: EASE }}
          style={{
            position: 'absolute', top: 0, bottom: 0, left: 0,
            background: 'linear-gradient(90deg, var(--gold-deep), var(--gold), var(--gold-bright))',
            boxShadow: '0 0 10px rgba(241,210,122,.4)',
          }} />
        <div style={{ position: 'absolute', inset: 0,
          background: 'repeating-linear-gradient(90deg, transparent 0 9.5%, rgba(0,0,0,.5) 9.5% 10%)' }} />
      </div>
      <div style={{
        textAlign: 'right',
        fontFamily: 'var(--display)',
        fontSize: 22,
        fontWeight: 600,
        color: 'var(--gold-bright)',
        fontVariantNumeric: 'tabular-nums',
        textShadow: '0 0 10px rgba(241,210,122,.4)',
      }}>{s.val}</div>
    </div>
  );
}

function TimelineEntry({ e, idx, last }: { e: TimelineItem; idx: number; last: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 + idx * 0.15 }}
      style={{
        position: 'relative',
        paddingLeft: 44,
        paddingBottom: last ? 0 : 26,
      }}>
      {!last && <div style={{
        position: 'absolute', left: 11, top: 22, bottom: 0,
        width: 1, background: 'linear-gradient(180deg, var(--gold-deep), transparent)',
        opacity: .55,
      }} />}
      <div style={{
        position: 'absolute', left: 0, top: 6,
        width: 22, height: 22,
      }}>
        <svg viewBox="0 0 24 24" width="22" height="22">
          <circle cx="12" cy="12" r="10" fill="none" stroke="var(--gold)" strokeWidth="1" opacity=".55" />
          <circle cx="12" cy="12" r="6" fill="var(--void)" stroke="var(--gold-bright)" strokeWidth="1" />
          <circle cx="12" cy="12" r="2.2" fill="var(--gold-bright)" />
        </svg>
      </div>

      <div style={{
        fontFamily: 'var(--display)',
        fontSize: 10, letterSpacing: '.3em',
        color: 'var(--parchment-dim)',
        textTransform: 'uppercase',
      }}>
        {e.year} · {e.org}
      </div>
      <div style={{
        fontFamily: 'var(--display)',
        fontSize: 22, fontWeight: 600,
        color: 'var(--gold-bright)',
        letterSpacing: '.04em',
        textShadow: '0 0 16px rgba(241,210,122,.25)',
        marginTop: 4,
      }}>
        {e.title}
      </div>
      <div style={{
        fontFamily: 'var(--serif)',
        fontSize: 14,
        color: 'var(--parchment)',
        lineHeight: 1.5,
        marginTop: 6,
        maxWidth: 540,
        textWrap: 'pretty',
      }}>{e.body}</div>
    </motion.div>
  );
}

function Portrait() {
  return (
    <div style={{
      position: 'relative', width: 220, height: 280,
      border: '1px solid rgba(212,168,81,.28)',
      background:
        'radial-gradient(ellipse at 50% 30%, rgba(122,46,31,.25) 0%, transparent 60%),' +
        'linear-gradient(180deg, #14110d 0%, #07060a 100%)',
      boxShadow: 'inset 0 0 60px rgba(0,0,0,.7), 0 24px 60px rgba(0,0,0,.5)',
    }}>
      {([[8, 8, 1, 1], [8, 8, -1, 1], [8, 8, 1, -1], [8, 8, -1, -1]] as const).map(([x, y, sx, sy], i) => (
        <svg key={i} viewBox="0 0 20 20" width="14" height="14"
          style={{
            position: 'absolute',
            [sx > 0 ? 'left' : 'right']: x,
            [sy > 0 ? 'top' : 'bottom']: y,
            transform: `scale(${sx},${sy})`,
            color: 'var(--gold)',
          }}>
          <path d="M 0,0 L 18,0 M 0,0 L 0,18" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <circle cx="2" cy="2" r="1.2" fill="currentColor" />
        </svg>
      ))}

      <svg viewBox="0 0 280 360" style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <radialGradient id="pglow" cx="50%" cy="35%" r="40%">
            <stop offset="0%" stopColor="#f1d27a" stopOpacity=".5" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <linearGradient id="cloak" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1410" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
        </defs>
        <circle cx="140" cy="120" r="100" fill="url(#pglow)" />

        <g>
          <path d="M 60,360 L 70,220 Q 80,170 110,160 L 110,140 Q 110,100 140,90 Q 170,100 170,140 L 170,160 Q 200,170 210,220 L 220,360 Z" fill="url(#cloak)" />
          <ellipse cx="140" cy="120" rx="26" ry="32" fill="#0a0807" />
          <ellipse cx="140" cy="128" rx="18" ry="20" fill="#000" />
          <path d="M 110,130 Q 140,100 170,130 Q 165,160 140,168 Q 115,160 110,130 Z" fill="#000" />
          <g stroke="#d4a851" strokeWidth="1.2" fill="none" filter="drop-shadow(0 0 6px rgba(241,210,122,.6))">
            <path d="M 116,88 Q 140,76 164,88" />
            <path d="M 116,88 L 116,82 M 140,76 L 140,68 M 164,88 L 164,82 M 128,80 L 128,76 M 152,80 L 152,76" />
            <circle cx="140" cy="68" r="2.5" fill="#d4a851" />
          </g>
          <circle cx="132" cy="125" r="1.5" fill="#f1d27a">
            <animate attributeName="opacity" values=".5;1;.5" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="148" cy="125" r="1.5" fill="#f1d27a">
            <animate attributeName="opacity" values=".5;1;.5" dur="3s" begin=".2s" repeatCount="indefinite" />
          </circle>
          <g transform="translate(140,170)" stroke="#d4a851" strokeWidth="1.2" fill="none">
            <circle r="8" />
            <path d="M -5,0 L 5,0 M 0,-5 L 0,5" />
          </g>
        </g>
      </svg>

      <svg viewBox="0 0 280 360" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', animation: 'slow-spin 100s linear infinite', transformOrigin: 'center' }}>
        <g stroke="rgba(212,168,81,.18)" fill="none">
          <circle cx="140" cy="180" r="130" strokeDasharray="2 8" />
        </g>
      </svg>
    </div>
  );
}

export default function AchievementsPage({ onBack }: { onBack: () => void }) {
  const a = PORTFOLIO_DATA.achievements;
  const [liveRunes, setLiveRunes]     = useState<number | null>(null);
  const [displayRunes, setDisplayRunes] = useState(1);
  const displayRef   = useRef(1);
  const fetchDoneRef = useRef(false);
  const countRafRef  = useRef<number>();
  const animRafRef   = useRef<number>();

  // Ease-out animate to a target value from wherever displayRef currently sits.
  const animateTo = useCallback((target: number) => {
    if (animRafRef.current) cancelAnimationFrame(animRafRef.current);
    const start = displayRef.current;
    const startTime = performance.now();
    const duration = 700;
    function frame(now: number) {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      const val = Math.round(start + (target - start) * eased);
      displayRef.current = val;
      setDisplayRunes(val);
      if (t < 1) animRafRef.current = requestAnimationFrame(frame);
    }
    animRafRef.current = requestAnimationFrame(frame);
  }, []);

  // Rapid-counting phase while the fetch is in flight.
  useEffect(() => {
    let last = performance.now();
    function tick(now: number) {
      if (fetchDoneRef.current) return;
      if (now - last >= 55) {
        displayRef.current += Math.floor(Math.random() * 55 + 15);
        setDisplayRunes(displayRef.current);
        last = now;
      }
      countRafRef.current = requestAnimationFrame(tick);
    }
    countRafRef.current = requestAnimationFrame(tick);
    // Safety: if fetch never resolves, settle on static value after 8 s.
    const timeout = setTimeout(() => {
      if (fetchDoneRef.current) return; // fetch already resolved, don't clobber it
      fetchDoneRef.current = true;
      animateTo(a.runes);
    }, 8000);
    return () => {
      if (countRafRef.current) cancelAnimationFrame(countRafRef.current);
      clearTimeout(timeout);
    };
  }, [animateTo, a.runes]);

  // Fetch live commit count.
  useEffect(() => {
    fetch('/api/github-stats')
      .then(r => r.json())
      .then(d => { if (d.commits != null) setLiveRunes(d.commits); })
      .catch(() => {});
  }, []);

  // Once fetch resolves, stop the counter and ease to the real number.
  useEffect(() => {
    if (liveRunes === null) return;
    fetchDoneRef.current = true;
    animateTo(liveRunes);
  }, [liveRunes, animateTo]);

  const runesLive = liveRunes != null;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(ellipse at 70% 30%, rgba(212,168,81,.10) 0%, transparent 60%),' +
          'linear-gradient(180deg, #0d0b0a 0%, #050307 100%)',
      }} />
      <EmberField count={26} intense={0.7} />

      <div style={{
        position: 'absolute', top: 36, left: 64, right: 64,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        zIndex: 20,
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>
            ‹ Codex III · The Tarnished&apos;s Page ›
          </div>
          <h1 className="title-disp" style={{ fontSize: 42, marginTop: 6 }}>{a.title}</h1>
          <div style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 14, color: 'var(--parchment-dim)', marginTop: 4,
          }}>
            Status, attributes, and the deeds upon thy name.
          </div>
        </div>
        <BackButton onBack={onBack} />
      </div>

      <div className="scroll" style={{
        position: 'absolute',
        inset: '150px 56px 56px 56px',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        overflowY: 'auto',
      }}>
        <IntroBand text={a.intro} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px 1fr 1.1fr',
          gap: 36,
        }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <Portrait />
          <div style={{ textAlign: 'center' }}>
            <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Class</div>
            <div style={{
              fontFamily: 'var(--display)', fontSize: 20, fontWeight: 600,
              color: 'var(--gold-bright)', letterSpacing: '.08em',
              marginTop: 4,
            }}>{a.class}</div>
          </div>
          <div style={{ display: 'flex', gap: 28, alignItems: 'center', marginTop: 4 }}>
            <div style={{ textAlign: 'center' }}>
              <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Level</div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 36, color: 'var(--gold-bright)', fontWeight: 600, textShadow: '0 0 16px rgba(241,210,122,.4)' }}>{a.level}</div>
            </div>
            <div style={{ width: 1, height: 50, background: 'rgba(212,168,81,.3)' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'center' }}>
                <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Runes</div>
                {runesLive && (
                  <div title="Live commit count" style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: '#6fcf6f',
                    boxShadow: '0 0 6px rgba(111,207,111,.8)',
                    flexShrink: 0,
                  }} />
                )}
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: 24, color: 'var(--gold-bright)', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{displayRunes.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ color: 'var(--gold-deep)', marginBottom: 12 }}>
            ‹ Attributes ›
          </div>
          <div>
            {a.stats.map((s, i) => <Statline key={s.key} s={s} idx={i} />)}
          </div>
        </div>

        <div>
          <div className="eyebrow" style={{ color: 'var(--gold-deep)', marginBottom: 16 }}>
            ‹ Deeds & Honors ›
          </div>
          <div>
            {a.timeline.map((e, i) => (
              <TimelineEntry key={i} e={e} idx={i} last={i === a.timeline.length - 1} />
            ))}
          </div>
        </div>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(212,168,81,.3) 20%, rgba(212,168,81,.3) 80%, transparent)' }} />

        <div>
          <div className="eyebrow" style={{ color: 'var(--gold-deep)', marginBottom: 4 }}>
            ‹ Armaments & Arts ›
          </div>
          <div style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 14, color: 'var(--parchment-dim)', marginBottom: 22,
          }}>
            The schools of craft this hand has learned.
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 34,
          }}>
            {a.skills.map((s, gi) => (
              <SkillSchoolBlock key={s.school} s={s} gi={gi} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
