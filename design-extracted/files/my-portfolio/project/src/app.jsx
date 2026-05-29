// APP — root component, routing, cursor, audio button, tweaks panel.

const { useState, useEffect, useRef, useCallback } = React;

// Tweak defaults — wrapped for the host's edit-mode protocol
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "grain": 0.18,
  "cursor": "rune",
  "speed": 1
}/*EDITMODE-END*/;

const MENU_ITEMS = [
  { id: "projects",     label: "Works of Old" },
  { id: "achievements", label: "Chronicle" },
  { id: "contact",      label: "Summon" },
  { id: "tome",         label: "Resume · Tome" },
];

// ─────────────────────────────────────────────────────────────
// CURSOR — three styles: rune (default), blade, classic
// ─────────────────────────────────────────────────────────────
function CustomCursor({ style }) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: -100, y: -100 });
  const trailRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    function onMove(e) { targetRef.current = { x: e.clientX, y: e.clientY }; setPos({ x: e.clientX, y: e.clientY }); }
    function onOver(e) {
      const t = e.target.closest("a, button, [data-cursor='hover'], .menu-item, input, textarea, .gem-hit");
      setHover(!!t);
    }
    function onDown() { window.SFX && window.SFX.select && window.SFX.hover(); }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  // smooth trail
  useEffect(() => {
    function tick() {
      trailRef.current.x += (targetRef.current.x - trailRef.current.x) * 0.18;
      trailRef.current.y += (targetRef.current.y - trailRef.current.y) * 0.18;
      setTrail({ x: trailRef.current.x, y: trailRef.current.y });
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  if (style === "classic") {
    return (
      <>
        <div className={`cursor ${hover ? "hovering" : ""}`} style={{ left: pos.x, top: pos.y }}>
          <svg width="14" height="14" viewBox="0 0 14 14">
            <circle cx="7" cy="7" r="3" fill="var(--gold-bright)" />
          </svg>
        </div>
        <div className={`cursor-trail ${hover ? "hovering" : ""}`} style={{ left: trail.x, top: trail.y }} />
      </>
    );
  }
  if (style === "blade") {
    return (
      <>
        <div className={`cursor ${hover ? "hovering" : ""}`} style={{ left: pos.x, top: pos.y, transform: `translate(-30%, -100%) rotate(${hover ? 6 : -8}deg)`, transition: "transform .25s" }}>
          <svg width="28" height="42" viewBox="0 0 28 42" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,.7))" }}>
            <defs>
              <linearGradient id="bladeg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f1d27a" />
                <stop offset="100%" stopColor="#8a6a2c" />
              </linearGradient>
            </defs>
            {/* blade */}
            <path d="M 14,2 L 18,28 L 14,32 L 10,28 Z" fill="url(#bladeg)" stroke="#2a2520" strokeWidth=".5" />
            <path d="M 14,2 L 14,32" stroke="#fff7d8" strokeWidth=".4" opacity=".6" />
            {/* guard */}
            <rect x="6" y="30" width="16" height="2.5" fill="#3b332b" />
            {/* hilt */}
            <rect x="12" y="32.5" width="4" height="7" fill="#2a2520" />
            {/* pommel */}
            <circle cx="14" cy="40" r="2" fill="#d4a851" />
          </svg>
        </div>
        <div className={`cursor-trail ${hover ? "hovering" : ""}`} style={{ left: trail.x, top: trail.y }} />
      </>
    );
  }
  // RUNE (default) — a small radiant sigil that rotates slowly
  return (
    <>
      <div className={`cursor ${hover ? "hovering" : ""}`} style={{ left: pos.x, top: pos.y }}>
        <svg width="36" height="36" viewBox="0 0 36 36" style={{ animation: "slow-spin 12s linear infinite", filter: "drop-shadow(0 0 6px rgba(241,210,122,.7))" }}>
          <g stroke="var(--gold-bright)" fill="none" strokeWidth=".9">
            <circle cx="18" cy="18" r="16" strokeDasharray="1 3" opacity=".7" />
            <path d="M 18,6 L 20,16 L 30,18 L 20,20 L 18,30 L 16,20 L 6,18 L 16,16 Z" />
            <circle cx="18" cy="18" r="3" fill="var(--gold-bright)" stroke="none" />
          </g>
        </svg>
      </div>
      <div className={`cursor-trail ${hover ? "hovering" : ""}`} style={{ left: trail.x, top: trail.y }} />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// AUDIO BUTTON — floating, top right
// ─────────────────────────────────────────────────────────────
function AudioToggle({ muted, setMuted }) {
  return (
    <button
      onClick={() => { const next = !muted; setMuted(next); window.SFX.setMuted(next); }}
      onMouseEnter={() => window.SFX && window.SFX.hover()}
      title={muted ? "Unmute ambient drone" : "Mute ambient drone"}
      style={{
        position: "fixed",
        top: 28, right: 28,
        zIndex: 200,
        width: 44, height: 44,
        background: "rgba(20,16,14,.6)",
        border: "1px solid rgba(212,168,81,.3)",
        color: "var(--gold)",
        display: "grid", placeItems: "center",
        cursor: "none",
        transition: "all .3s",
        backdropFilter: "blur(6px)",
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

// ─────────────────────────────────────────────────────────────
// PAGE TRANSITION OVERLAY
// ─────────────────────────────────────────────────────────────
function PageTransition({ playing }) {
  if (!playing) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 7000, pointerEvents: "none",
      background: "radial-gradient(circle, rgba(241,210,122,.2) 0%, #07060a 60%)",
      animation: "wipe .9s ease",
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

// ─────────────────────────────────────────────────────────────
// RESUME / TOME stub — simple modal
// ─────────────────────────────────────────────────────────────
function TomePage({ onBack }) {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 50%, rgba(122,46,31,.12) 0%, transparent 60%), linear-gradient(180deg, #0a0809 0%, #050307 100%)" }} />
      <EmberField count={20} intense={0.5} />
      <div style={{
        position: "absolute", top: 36, left: 64, right: 64,
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
      }}>
        <div>
          <div className="eyebrow" style={{ color: "var(--gold-deep)" }}>‹ Codex V · The Sealed Tome ›</div>
          <h1 className="title-disp" style={{ fontSize: 42, marginTop: 6 }}>The Tarnished's Tome</h1>
        </div>
        <window.BackButton onBack={onBack} />
      </div>
      <div style={{
        position: "absolute", inset: "180px 64px 64px 64px",
        display: "grid", placeItems: "center",
      }}>
        <div style={{ textAlign: "center", maxWidth: 560 }}>
          <svg viewBox="0 0 120 120" width="120" height="120" style={{ margin: "0 auto" }}>
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
            fontFamily: "var(--serif)", fontStyle: "italic",
            fontSize: 16, color: "var(--parchment-2)",
            marginTop: 12, lineHeight: 1.6,
          }}>
            The full curriculum vitæ shall be inscribed in time. For now, take what is known of the wanderer from yon Chronicle.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = useState("menu");
  const [transitioning, setTransitioning] = useState(false);
  const [muted, setMuted] = useState(true);
  const [showHint, setShowHint] = useState(true);

  // Apply tweaks to CSS vars
  useEffect(() => {
    document.documentElement.style.setProperty("--grain-opacity", t.grain);
    document.documentElement.style.setProperty("--speed", t.speed);
    document.body.classList.toggle("cursor-rune", t.cursor === "rune");
  }, [t]);

  // ESC key returns to menu
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && page !== "menu") {
        navigate("menu");
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page]);

  const navigate = useCallback((target) => {
    if (target === page) return;
    setTransitioning(true);
    setTimeout(() => {
      setPage(target);
      setTransitioning(false);
    }, 350);
  }, [page]);

  // Dismiss the audio hint after first interaction
  useEffect(() => {
    function onFirst() {
      setShowHint(false);
      window.removeEventListener("click", onFirst);
      window.removeEventListener("keydown", onFirst);
    }
    window.addEventListener("click", onFirst);
    window.addEventListener("keydown", onFirst);
    return () => {
      window.removeEventListener("click", onFirst);
      window.removeEventListener("keydown", onFirst);
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#000" }}>
      {/* PAGES */}
      <div style={{ position: "absolute", inset: 0, opacity: transitioning ? 0 : 1, transition: "opacity .35s ease" }}>
        {page === "menu" && (
          <MainMenu onNavigate={navigate} menuItems={MENU_ITEMS} tweaks={t} />
        )}
        {page === "projects" && <ProjectsPage onBack={() => navigate("menu")} />}
        {page === "achievements" && <AchievementsPage onBack={() => navigate("menu")} />}
        {page === "contact" && <ContactPage onBack={() => navigate("menu")} />}
        {page === "tome" && <TomePage onBack={() => navigate("menu")} />}
      </div>

      {/* Vignette + grain + cursor */}
      <div className="vignette" />
      <div className="grain" />

      <PageTransition playing={transitioning} />

      <CustomCursor style={t.cursor} />

      <AudioToggle muted={muted} setMuted={setMuted} />

      {/* First-load audio hint */}
      {muted && showHint && (
        <div style={{
          position: "fixed",
          top: 84, right: 28,
          padding: "8px 14px",
          background: "rgba(20,16,14,.8)",
          border: "1px solid rgba(212,168,81,.3)",
          color: "var(--parchment-2)",
          fontFamily: "var(--display)",
          fontSize: 10,
          letterSpacing: ".22em",
          textTransform: "uppercase",
          zIndex: 200,
          maxWidth: 220,
          textAlign: "right",
          animation: "fade-in 1s ease 2s both",
          pointerEvents: "none",
        }}>
          ↑ Light the ambient drone
        </div>
      )}

      {/* TWEAKS PANEL */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Atmosphere" />
        <TweakSlider label="Grain intensity" value={t.grain} min={0} max={0.5} step={0.01}
                     onChange={(v) => setTweak("grain", v)} />
        <TweakSlider label="Animation speed" value={t.speed} min={0.5} max={2} step={0.1} unit="×"
                     onChange={(v) => setTweak("speed", v)} />
        <TweakSection label="Cursor" />
        <TweakRadio label="Style" value={t.cursor} options={["rune","blade","classic"]}
                    onChange={(v) => setTweak("cursor", v)} />
      </TweaksPanel>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
