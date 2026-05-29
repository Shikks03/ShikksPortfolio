'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MENU_ITEMS } from '@/data/portfolio';
import CustomCursor from '@/components/cursor/CustomCursor';
import AudioToggle from '@/components/AudioToggle';
import MainMenu from '@/components/menu/MainMenu';
import ProjectsPage from '@/components/projects/ProjectsPage';
import AchievementsPage from '@/components/achievements/AchievementsPage';
import ContactPage from '@/components/contact/ContactPage';
import TomePage from '@/components/TomePage';

const TWEAKS = { grain: 0.18, cursor: 'rune', speed: 1 };

function PageTransition() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 7000, pointerEvents: 'none',
      background: 'radial-gradient(circle, rgba(241,210,122,.2) 0%, #07060a 60%)',
      animation: 'wipe .9s ease',
    }}>
      <style>{`
        @keyframes wipe {
          0%   { opacity: 0; }
          40%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export default function Portfolio() {
  const [page, setPage] = useState('menu');
  const [muted, setMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [wipe, setWipe] = useState(false);

  // Apply default tweaks to CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--grain-opacity', String(TWEAKS.grain));
    root.style.setProperty('--speed', String(TWEAKS.speed));
    document.body.classList.toggle('cursor-rune', TWEAKS.cursor === 'rune');
  }, []);

  const navigate = useCallback((target: string) => {
    setPage((cur) => {
      if (target === cur) return cur;
      setWipe(true);
      window.setTimeout(() => setWipe(false), 900);
      return target;
    });
  }, []);

  // ESC key returns to menu
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') navigate('menu');
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  // Dismiss the audio hint after first interaction
  useEffect(() => {
    function onFirst() {
      setShowHint(false);
      window.removeEventListener('click', onFirst);
      window.removeEventListener('keydown', onFirst);
    }
    window.addEventListener('click', onFirst);
    window.addEventListener('keydown', onFirst);
    return () => {
      window.removeEventListener('click', onFirst);
      window.removeEventListener('keydown', onFirst);
    };
  }, []);

  function renderPage() {
    switch (page) {
      case 'projects':     return <ProjectsPage onBack={() => navigate('menu')} />;
      case 'achievements': return <AchievementsPage onBack={() => navigate('menu')} />;
      case 'contact':      return <ContactPage onBack={() => navigate('menu')} />;
      case 'tome':         return <TomePage onBack={() => navigate('menu')} />;
      default:             return <MainMenu onNavigate={navigate} menuItems={MENU_ITEMS} />;
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: '#000' }}>
      <AnimatePresence mode="wait">
        <motion.div key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{ position: 'absolute', inset: 0 }}>
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      <div className="vignette" />
      <div className="grain" />

      {wipe && <PageTransition />}

      <CustomCursor style={TWEAKS.cursor} />

      <AudioToggle muted={muted} setMuted={setMuted} />

      {muted && showHint && (
        <div style={{
          position: 'fixed',
          top: 84, right: 28,
          padding: '8px 14px',
          background: 'rgba(20,16,14,.8)',
          border: '1px solid rgba(212,168,81,.3)',
          color: 'var(--parchment-2)',
          fontFamily: 'var(--display)',
          fontSize: 10,
          letterSpacing: '.22em',
          textTransform: 'uppercase',
          zIndex: 200,
          maxWidth: 220,
          textAlign: 'right',
          animation: 'fade-in 1s ease 2s both',
          pointerEvents: 'none',
        }}>
          ↑ Light the ambient drone
        </div>
      )}
    </div>
  );
}
