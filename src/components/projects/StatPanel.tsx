'use client';

import { getAudio } from '@/lib/audio';
import type { Project } from '@/data/portfolio';
import Ornament from '@/components/shared/Ornament';

function StatBar({ label, value, max = 99 }: { label: string; value: number; max?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--ui)', fontSize: 12 }}>
      <div style={{
        flex: '0 0 64px',
        fontFamily: 'var(--display)',
        fontSize: 10,
        letterSpacing: '.18em',
        color: 'var(--parchment-dim)',
        textTransform: 'uppercase',
      }}>{label}</div>
      <div style={{ flex: 1, height: 6, background: 'rgba(212,168,81,.08)', border: '1px solid rgba(212,168,81,.18)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: `${pct}%`,
          background: 'linear-gradient(90deg, var(--gold-deep) 0%, var(--gold) 60%, var(--gold-bright) 100%)',
          boxShadow: '0 0 8px rgba(241,210,122,.5)',
          transition: 'width .6s cubic-bezier(.2,.7,.2,1)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(90deg, transparent 0 9.5%, rgba(0,0,0,.4) 9.5% 10%)' }} />
      </div>
      <div style={{
        flex: '0 0 32px',
        textAlign: 'right',
        fontFamily: 'var(--display)',
        fontSize: 13,
        color: 'var(--gold-bright)',
        fontVariantNumeric: 'tabular-nums',
      }}>{value}</div>
    </div>
  );
}

interface StatPanelProps {
  project: Project | undefined;
  visible: boolean;
}

export default function StatPanel({ project, visible }: StatPanelProps) {
  if (!project) return null;
  return (
    <div style={{
      position: 'absolute',
      right: 56,
      top: '50%',
      transform: `translateY(-50%) translateX(${visible ? 0 : 40}px)`,
      opacity: visible ? 1 : 0,
      transition: 'opacity .35s ease, transform .45s cubic-bezier(.2,.7,.2,1)',
      width: 360,
      pointerEvents: visible ? 'auto' : 'none',
      zIndex: 30,
    }}>
      <div style={{
        position: 'relative',
        padding: '28px 26px 22px',
        background: 'linear-gradient(180deg, rgba(20,16,14,.94) 0%, rgba(12,10,9,.96) 100%)',
        border: '1px solid rgba(212,168,81,.32)',
        boxShadow: '0 30px 80px rgba(0,0,0,.7), 0 0 40px rgba(212,168,81,.08), inset 0 0 60px rgba(0,0,0,.6)',
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

        <div style={{
          fontFamily: 'var(--display)',
          fontSize: 9,
          letterSpacing: '.32em',
          color: 'var(--parchment-dim)',
          textTransform: 'uppercase',
          marginBottom: 4,
        }}>
          {project.type} · {project.rarity}
        </div>
        <h2 style={{
          fontFamily: 'var(--display)',
          fontSize: 28,
          fontWeight: 600,
          letterSpacing: '.06em',
          color: 'var(--gold-bright)',
          textShadow: '0 0 20px rgba(241,210,122,.4)',
          margin: 0,
        }}>
          {project.name}
        </h2>
        <div style={{
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: 14,
          color: 'var(--parchment-2)',
          marginTop: 2,
          marginBottom: 16,
        }}>
          &ldquo;{project.epithet}&rdquo;
        </div>

        <Ornament style={{ marginBottom: 16 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
          {Object.entries(project.stats).map(([k, v]) => (
            <StatBar key={k} label={k} value={v} />
          ))}
        </div>

        <Ornament style={{ marginBottom: 14 }} />

        <p style={{
          fontFamily: 'var(--serif)',
          fontSize: 14,
          lineHeight: 1.55,
          color: 'var(--parchment)',
          margin: '0 0 18px',
          textWrap: 'pretty',
        }}>
          {project.desc}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
          {project.tags.map(t => (
            <span key={t} style={{
              fontFamily: 'var(--display)',
              fontSize: 9,
              letterSpacing: '.22em',
              textTransform: 'uppercase',
              color: 'var(--parchment-dim)',
              padding: '4px 8px',
              border: '1px solid rgba(212,168,81,.22)',
              background: 'rgba(212,168,81,.04)',
            }}>{t}</span>
          ))}
        </div>

        <a href={project.github} target="_blank" rel="noopener noreferrer"
           onClick={() => getAudio().confirm()}
           onMouseEnter={() => getAudio().hover()}
           className="acquire-btn"
           style={{
             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
             padding: '11px 16px',
             textDecoration: 'none',
             color: 'var(--gold-bright)',
             fontFamily: 'var(--display)',
             fontSize: 11,
             letterSpacing: '.3em',
             textTransform: 'uppercase',
             border: '1px solid var(--gold-deep)',
             background: 'linear-gradient(180deg, rgba(212,168,81,.08) 0%, rgba(212,168,81,.02) 100%)',
             position: 'relative', overflow: 'hidden',
           }}>
          <span>Acquire · View Codex</span>
          <span style={{ fontSize: 16 }}>↗</span>
          <style>{`
            .acquire-btn:hover {
              color: #fff7d8 !important;
              border-color: var(--gold-bright) !important;
              box-shadow: 0 0 24px rgba(241,210,122,.3), inset 0 0 24px rgba(241,210,122,.08);
            }
            .acquire-btn::after {
              content:""; position:absolute; inset:0;
              background: linear-gradient(90deg, transparent, rgba(241,210,122,.3), transparent);
              transform: translateX(-100%);
              transition: transform .8s ease;
            }
            .acquire-btn:hover::after { transform: translateX(100%); }
          `}</style>
        </a>
      </div>
    </div>
  );
}
