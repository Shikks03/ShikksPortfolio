'use client';

import { getAudio } from '@/lib/audio';

interface AudioToggleProps {
  muted: boolean;
  setMuted: (m: boolean) => void;
}

export default function AudioToggle({ muted, setMuted }: AudioToggleProps) {
  return (
    <button
      onClick={() => { const next = !muted; setMuted(next); getAudio().setMuted(next); }}
      onMouseEnter={() => getAudio().hover()}
      title={muted ? 'Unmute ambient drone' : 'Mute ambient drone'}
      style={{
        position: 'fixed',
        top: 28, right: 28,
        zIndex: 200,
        width: 44, height: 44,
        background: 'rgba(20,16,14,.6)',
        border: '1px solid rgba(212,168,81,.3)',
        color: 'var(--gold)',
        display: 'grid', placeItems: 'center',
        cursor: 'none',
        transition: 'all .3s',
        backdropFilter: 'blur(6px)',
      }}>
      {muted ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
}
