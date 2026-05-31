'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getAudio } from '@/lib/audio';
import { PORTFOLIO_DATA, type Project } from '@/data/portfolio';
import EmberField from '@/components/shared/EmberField';
import BackButton from '@/components/shared/BackButton';
import SealStone from './SealStone';
import Starfield from './Starfield';
import StatPanel from './StatPanel';

interface Bounds { w: number; h: number }

// Deterministic perpendicular offset for a ley-line edge, derived from the two id char codes.
// Returns a value in the range [-14, 14] so the bezier always bends the same way.
function edgeBend(idA: string, idB: string): number {
  let h = 0;
  for (let i = 0; i < idA.length; i++) h = (h * 31 + idA.charCodeAt(i)) | 0;
  for (let i = 0; i < idB.length; i++) h = (h * 17 + idB.charCodeAt(i)) | 0;
  const raw = Math.abs(h) % 28; // 0–27
  return (raw - 14); // –14 to +13  (always stable, never 0 exactly when non-zero input)
}

interface LeyLineProps {
  a: Project;
  b: Project;
  /**
   * active   = edge touches the hovered node → brighten
   * dimmed   = some other node is hovered → fade
   * neutral  = no hover at all
   */
  state: 'active' | 'dimmed' | 'neutral';
  bounds: Bounds;
}

function LeyLine({ a, b, state, bounds }: LeyLineProps) {
  const x1 = (a.xp / 100) * bounds.w;
  const y1 = (a.yp / 100) * bounds.h;
  const x2 = (b.xp / 100) * bounds.w;
  const y2 = (b.yp / 100) * bounds.h;

  // Midpoint
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;

  // Perpendicular unit vector
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const px = -dy / len;
  const py = dx / len;

  // Deterministic bend (signed, ±8–14 px)
  const bend = edgeBend(a.id, b.id);
  const cx = mx + px * bend;
  const cy = my + py * bend;

  // Slight second waver for the accent thread (offset control point in opposite direction)
  const cx2 = mx + px * (bend * 0.4);
  const cy2 = my + py * (bend * 0.4);

  // Diamond midpoint position (on the quadratic bezier at t=0.5)
  const dmx = 0.25 * x1 + 0.5 * cx + 0.25 * x2;
  const dmy = 0.25 * y1 + 0.5 * cy + 0.25 * y2;

  // Appearance based on hover state
  const isActive  = state === 'active';
  const isDimmed  = state === 'dimmed';

  const mainStroke   = isActive ? 'rgba(241,210,122,.95)' : isDimmed ? 'rgba(212,168,81,.18)' : 'rgba(212,168,81,.55)';
  const mainWidth    = isActive ? 1.7 : isDimmed ? 0.7 : 1.1;
  const accentStroke = isActive ? 'rgba(241,210,122,.32)' : isDimmed ? 'rgba(212,168,81,.06)' : 'rgba(212,168,81,.18)';
  const glowStroke   = isActive ? 'rgba(241,210,122,.28)' : isDimmed ? 'rgba(212,168,81,.04)' : 'rgba(212,168,81,.14)';
  const glowWidth    = isActive ? 6 : isDimmed ? 2 : 4;

  const diamondSize  = isActive ? 5 : isDimmed ? 2.5 : 3.5;
  const diamondStroke = isActive ? 'rgba(241,210,122,.95)' : isDimmed ? 'rgba(212,168,81,.18)' : 'rgba(212,168,81,.6)';

  const mainPath  = `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`;
  const accentPath = `M${x1},${y1} Q${cx2},${cy2} ${x2},${y2}`;

  return (
    <g style={{ transition: 'opacity .4s ease', opacity: isDimmed ? 0.3 : 1 }}>
      {/* blurred warm glow underlay */}
      <path
        d={mainPath}
        fill="none"
        stroke={glowStroke}
        strokeWidth={glowWidth}
        style={{ filter: 'blur(2.5px)', transition: 'stroke .4s, stroke-width .4s' }}
      />
      {/* main gilded ley-line */}
      <path
        d={mainPath}
        fill="none"
        stroke={mainStroke}
        strokeWidth={mainWidth}
        strokeLinecap="round"
        style={{ transition: 'stroke .4s, stroke-width .4s' }}
      />
      {/* sparse hand-drawn accent thread */}
      <path
        d={accentPath}
        fill="none"
        stroke={accentStroke}
        strokeWidth="0.55"
        strokeDasharray="1 7"
        strokeLinecap="round"
        style={{ transition: 'stroke .4s' }}
      />
      {/* ornamental diamond at midpoint */}
      <rect
        x={dmx - diamondSize / 2}
        y={dmy - diamondSize / 2}
        width={diamondSize}
        height={diamondSize}
        fill="none"
        stroke={diamondStroke}
        strokeWidth={isActive ? 1.1 : 0.8}
        transform={`rotate(45 ${dmx} ${dmy})`}
        style={{ transition: 'all .4s ease' }}
      />
    </g>
  );
}

export default function ProjectsPage({ onBack }: { onBack: () => void }) {
  const data = PORTFOLIO_DATA;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [lockedId, setLockedId]   = useState<string | null>(null);
  const [panelHovered, setPanelHovered] = useState(false);
  const [bounds, setBounds] = useState<Bounds>({ w: 1200, h: 700 });
  const fieldRef = useRef<HTMLDivElement>(null);
  // Keeps the last-hovered project alive while the mouse is on the panel.
  const pinnedProject = useRef<Project | undefined>(undefined);

  useEffect(() => {
    function measure() {
      if (!fieldRef.current) return;
      const r = fieldRef.current.getBoundingClientRect();
      setBounds({ w: r.width, h: r.height });
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const sealProject = useMemo(
    () => data.projects.find(p => p.id === hoveredId),
    [data.projects, hoveredId]
  );
  const lockedProject = useMemo(
    () => data.projects.find(p => p.id === lockedId),
    [data.projects, lockedId]
  );

  // When a seal is hovered, pin it so the panel can keep showing it while
  // the mouse travels from the seal to the panel.
  if (sealProject) pinnedProject.current = sealProject;

  // Priority: hover > lock > panel-hover (using last pinned)
  const project = sealProject ?? lockedProject ?? (panelHovered ? pinnedProject.current : undefined);

  const projectById = useMemo(() => {
    const m: Record<string, Project> = {};
    data.projects.forEach(p => { m[p.id] = p; });
    return m;
  }, [data.projects]);

  return (
    <div onClick={() => setLockedId(null)} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>

      {/* ── Layer 1: background gradient ───────────────────────────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background:
          'radial-gradient(ellipse at 30% 30%, rgba(122,46,31,.18) 0%, transparent 50%),' +
          'radial-gradient(ellipse at 75% 70%, rgba(58,107,138,.10) 0%, transparent 55%),' +
          'radial-gradient(ellipse at 50% 50%, #0d0b10 0%, #050307 80%)',
      }} />

      {/* ── Layer 2: Starfield (ash-dust faintest layer) ────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Starfield count={90} />
      </div>

      {/* ── Layer 3: EmberField — embers rising behind seals ────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <EmberField count={40} intense={0.7} />
      </div>

      {/* ── Layer 4: forge-glow — warm radial at bottom-center ──────── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 70% 38% at 50% 100%, rgba(196,122,62,.22) 0%, rgba(122,46,31,.10) 40%, transparent 70%)',
      }} />

      {/* ── Header / BackButton ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute', top: 36, left: 64, right: 64,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        zIndex: 20,
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>
            ‹ Codex II ·  The Vault of Lesser Stones ›
          </div>
          <h1 className="title-disp" style={{
            fontSize: 42,
            marginTop: 6,
            color: 'var(--parchment)',
          }}>
            Constellation of Works
          </h1>
          <div style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 14,
            color: 'var(--parchment-dim)',
            marginTop: 4,
          }}>
            Trace a stone to behold the rune it bears. Strike to step within.
          </div>
        </div>
        <BackButton onBack={onBack} />
      </div>

      {/* ── Measured field ──────────────────────────────────────────── */}
      <div ref={fieldRef} style={{
        position: 'absolute',
        inset: '150px 56px 96px 56px',
        zIndex: 4,
      }}>

        {/* ── Layer 5: Ley-line SVG (below seals) ─────────────────── */}
        <svg
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}
        >
          <defs>
            <filter id="ley-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#ley-glow)">
            {data.constellationEdges.map(([a, b], i) => {
              const A = projectById[a], B = projectById[b];
              if (!A || !B) return null;
              let lineState: 'active' | 'dimmed' | 'neutral' = 'neutral';
              if (hoveredId) {
                lineState = (a === hoveredId || b === hoveredId) ? 'active' : 'dimmed';
              }
              return (
                <LeyLine key={i} a={A} b={B} state={lineState} bounds={bounds} />
              );
            })}
          </g>
        </svg>

        {/* ── Layer 6: Seal nodes ──────────────────────────────────── */}
        {data.projects.map((p) => {
          const isHovered = hoveredId === p.id;
          const isLocked  = lockedId  === p.id;
          const isActive  = isHovered || isLocked;
          // Dim only when hovering something else; a locked seal is never dimmed.
          const isDimmed  = !!hoveredId && !isHovered && !isLocked;
          return (
            <div key={p.id}
              onMouseEnter={() => { setHoveredId(p.id); getAudio().carve(); }}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.stopPropagation();
                setLockedId(prev => prev === p.id ? null : p.id);
                getAudio().confirm();
              }}
              style={{
                position: 'absolute',
                left: `${p.xp}%`,
                top: `${p.yp}%`,
                transform: `translate(-50%, -50%) scale(${isActive ? 1.05 : 1})`,
                cursor: 'none',
                zIndex: isActive ? 12 : 10,
                filter: isDimmed ? 'brightness(.55) saturate(.8)' : 'none',
                transition: 'filter .5s ease, transform .45s cubic-bezier(.2,.7,.2,1)',
              }}>
              <div style={{ position: 'relative', width: 116, height: 116 }}>
                <SealStone runeId={p.id} tint={p.tint} size={116} lit={isActive} />

                {/* Project name label */}
                <div style={{
                  position: 'absolute',
                  left: '50%', bottom: -28,
                  transform: 'translateX(-50%)',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--display)',
                  fontSize: 10,
                  letterSpacing: '.28em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--gold-bright)' : 'var(--parchment-dim)',
                  textShadow: isActive ? '0 0 12px rgba(241,210,122,.6)' : 'none',
                  transition: 'color .4s, text-shadow .4s',
                  pointerEvents: 'none',
                }}>
                  {p.name}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── StatPanel ───────────────────────────────────────────────── */}
      {/* Anchor to the side opposite the hovered rune so the panel never
          covers it (which would trigger a mouseleave/enter flicker loop). */}
      <StatPanel
        project={project}
        visible={!!project}
        side={project && project.xp > 50 ? 'left' : 'right'}
        onMouseEnter={() => setPanelHovered(true)}
        onMouseLeave={() => setPanelHovered(false)}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      />

      {/* ── Bottom prompt ────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 28, left: 64, zIndex: 20,
        opacity: (hoveredId || lockedId) ? 0 : 1,
        transition: 'opacity .3s',
      }}>
        <div className="er-prompt" style={{ color: 'var(--parchment-dim)' }}>
          <span className="key">✦</span> Hover a stone &nbsp;·&nbsp; <span className="key">Click</span> to bind the seal
        </div>
      </div>
    </div>
  );
}
