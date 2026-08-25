'use client';

import { getAudio } from '@/lib/audio';
import { useViewport } from '@/lib/useViewport';

interface BackButtonProps {
  onBack: () => void;
}

export default function BackButton({ onBack }: BackButtonProps) {
  const { isMobile, isCoarse } = useViewport();
  // On handheld screens the chip pins itself top-left, clear of the mute
  // button, so every codex page shares one reachable way back to the title.
  const pinned = isMobile;
  return (
    <a href="#"
       onClick={(e) => { e.preventDefault(); getAudio().back(); onBack(); }}
       onMouseEnter={() => getAudio().hover()}
       className="er-prompt"
       aria-label="Return to title"
       style={{
         textDecoration: 'none',
         padding: pinned ? '12px 16px' : '8px 14px',
         border: '1px solid rgba(212,168,81,.25)',
         color: 'var(--parchment-2)',
         background: 'rgba(7,6,10,.7)',
         backdropFilter: 'blur(4px)',
         ...(pinned ? {
           position: 'fixed' as const,
           top: 'max(16px, env(safe-area-inset-top))',
           left: 'max(16px, env(safe-area-inset-left))',
           zIndex: 210,
         } : {}),
       }}>
      {isCoarse
        ? <>‹ Title</>
        : <><span className="key">Esc</span> Title</>}
    </a>
  );
}
