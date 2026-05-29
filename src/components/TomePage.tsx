'use client';

import EmberField from '@/components/shared/EmberField';
import BackButton from '@/components/shared/BackButton';

export default function TomePage({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(122,46,31,.12) 0%, transparent 60%), linear-gradient(180deg, #0a0809 0%, #050307 100%)',
      }} />
      <EmberField count={20} intense={0.5} />
      <div style={{
        position: 'absolute', top: 36, left: 64, right: 64,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>‹ Codex V · The Sealed Tome ›</div>
          <h1 className="title-disp" style={{ fontSize: 42, marginTop: 6 }}>The Tarnished&apos;s Tome</h1>
        </div>
        <BackButton onBack={onBack} />
      </div>
      <div style={{
        position: 'absolute', inset: '180px 64px 64px 64px',
        display: 'grid', placeItems: 'center',
      }}>
        <div style={{ textAlign: 'center', maxWidth: 560 }}>
          <svg viewBox="0 0 120 120" width="120" height="120" style={{ margin: '0 auto' }}>
            <g stroke="var(--gold)" fill="none" strokeWidth="1" filter="drop-shadow(0 0 8px rgba(241,210,122,.5))">
              <rect x="20" y="20" width="80" height="80" />
              <rect x="28" y="28" width="64" height="64" strokeDasharray="2 4" opacity=".6" />
              <circle cx="60" cy="60" r="22" />
              <path d="M 50,60 L 70,60 M 60,50 L 60,70" />
              <path d="M 40,40 L 80,80 M 40,80 L 80,40" opacity=".3" />
            </g>
          </svg>
          <h2 className="title-disp gold" style={{ fontSize: 28, marginTop: 24 }}>This tome remains sealed.</h2>
          <p style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 16, color: 'var(--parchment-2)',
            marginTop: 12, lineHeight: 1.6,
          }}>
            The full curriculum vitæ shall be inscribed in time. For now, take what is known of the wanderer from yon Chronicle.
          </p>
        </div>
      </div>
    </div>
  );
}
