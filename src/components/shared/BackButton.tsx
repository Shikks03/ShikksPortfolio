'use client';

import { getAudio } from '@/lib/audio';

interface BackButtonProps {
  onBack: () => void;
}

export default function BackButton({ onBack }: BackButtonProps) {
  return (
    <a href="#"
       onClick={(e) => { e.preventDefault(); getAudio().back(); onBack(); }}
       onMouseEnter={() => getAudio().hover()}
       className="er-prompt"
       style={{
         textDecoration: 'none',
         padding: '8px 14px',
         border: '1px solid rgba(212,168,81,.25)',
         color: 'var(--parchment-2)',
         background: 'rgba(7,6,10,.7)',
         backdropFilter: 'blur(4px)',
       }}>
      <span className="key">Esc</span> Title
    </a>
  );
}
