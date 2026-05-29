// MAIN MENU — full-bleed hero, giant title, corner menu list.

(function () {
  const { useState, useEffect } = React;

  window.MainMenu = function MainMenu({ onNavigate, menuItems, tweaks }) {
    const [hovered, setHovered] = useState(null);
    const [m, setM] = useState(0); // mount progress: increments after delays
    useEffect(() => {
      const ts = [120, 400, 900, 1200, 1500, 1700];
      const ids = ts.map((t, i) => setTimeout(() => setM(i + 1), t));
      return () => ids.forEach(clearTimeout);
    }, []);
    const reveal = (n) => ({
      opacity: m >= n ? 1 : 0,
      transform: m >= n ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 1.2s ease, transform 1.2s cubic-bezier(.2,.7,.2,1)",
    });
    const data = window.PORTFOLIO_DATA;

    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <HeroBackground />

        {/* SCREEN-EDGE FILIGREE CORNERS */}
        <div style={{ position: "absolute", top: 18, left: 18, zIndex: 30, opacity: m >= 1 ? .9 : 0, transition: "opacity 1.4s ease .2s", pointerEvents: "none" }}>
          <FiligreeCorner size={110} flip="tl" />
        </div>
        <div style={{ position: "absolute", top: 18, right: 18, zIndex: 30, opacity: m >= 1 ? .9 : 0, transition: "opacity 1.4s ease .3s", pointerEvents: "none" }}>
          <FiligreeCorner size={110} flip="tr" />
        </div>
        <div style={{ position: "absolute", bottom: 18, left: 18, zIndex: 30, opacity: m >= 1 ? .9 : 0, transition: "opacity 1.4s ease .4s", pointerEvents: "none" }}>
          <FiligreeCorner size={110} flip="bl" />
        </div>
        <div style={{ position: "absolute", bottom: 18, right: 18, zIndex: 30, opacity: m >= 1 ? .9 : 0, transition: "opacity 1.4s ease .5s", pointerEvents: "none" }}>
          <FiligreeCorner size={110} flip="br" />
        </div>

        {/* GIANT CENTERED TITLE */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "flex-start",
          pointerEvents: "none",
          paddingTop: "min(20vh, 200px)",
        }}>
          <div style={{
            ...reveal(1),
            display: "flex", alignItems: "center", gap: 22,
            marginBottom: 28,
            color: "var(--parchment-dim)",
          }}>
            <span style={{ width: 80, height: 1, background: "linear-gradient(to right, transparent, currentColor)" }} />
            <span className="eyebrow" style={{ marginBottom: 0 }}>
              A Portfolio of the Lands Coded
            </span>
            <span style={{ width: 80, height: 1, background: "linear-gradient(to left, transparent, currentColor)" }} />
          </div>
          <h1 className="title-disp gold" style={{
            fontSize: "min(14vw, 24vh, 200px)",
            lineHeight: 0.95,
            margin: 0,
            ...reveal(2),
          }}>
            {data.hero.name}
          </h1>
          <div style={{ ...reveal(2), marginTop: 6, display: "flex", justifyContent: "center" }}>
            <svg viewBox="0 0 300 14" width="min(60vw, 520px)" height="14" style={{ opacity: .8 }}>
              <line x1="0" y1="7" x2="120" y2="7" stroke="rgba(212,168,81,.55)" strokeWidth=".6" />
              <line x1="180" y1="7" x2="300" y2="7" stroke="rgba(212,168,81,.55)" strokeWidth=".6" />
              <g transform="translate(150,7)" fill="none" stroke="rgba(212,168,81,.85)" strokeWidth=".8" filter="drop-shadow(0 0 4px rgba(241,210,122,.6))">
                <path d="M -8,0 L 0,-5 L 8,0 L 0,5 Z" />
                <circle r="1.3" fill="rgba(241,210,122,.85)" stroke="none" />
              </g>
            </svg>
          </div>
          <div style={{
            marginTop: 14,
            display: "flex", alignItems: "center", gap: 18,
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 17,
            letterSpacing: ".24em",
            color: "var(--parchment-2)",
            textTransform: "uppercase",
            ...reveal(3),
          }}>
            <span style={{ width: 60, height: 1, background: "currentColor", opacity: .5 }} />
            {data.hero.epithet}
            <span style={{ width: 60, height: 1, background: "currentColor", opacity: .5 }} />
          </div>
        </div>

        {/* MENU — bottom left, like ER's main menu */}
        <div style={{
          position: "absolute",
          left: "5vw", bottom: "10vh",
          display: "flex", flexDirection: "column",
          gap: 2,
          minWidth: 300,
          ...reveal(4),
        }}>
          <div className="eyebrow" style={{ marginBottom: 14, color: "var(--gold-deep)" }}>
            ‹ Menu ›
          </div>
          {menuItems.map((it, i) => (
            <a key={it.id}
               className={`menu-item ${hovered === it.id ? "active" : ""}`}
               onMouseEnter={() => { setHovered(it.id); window.SFX && window.SFX.hover(); }}
               onMouseLeave={() => setHovered(null)}
               onClick={(e) => { e.preventDefault(); window.SFX && window.SFX.select(); onNavigate(it.id); }}
               href="#">
              {it.label}
              <span className="num">{String(i + 1).padStart(2, "0")}</span>
            </a>
          ))}
          <div style={{
            marginTop: 18,
            paddingLeft: 28,
            fontFamily: "var(--display)",
            fontSize: 10,
            letterSpacing: ".32em",
            color: "var(--parchment-dim)",
            opacity: .55,
            textTransform: "uppercase",
          }}>
            v. 0.1 — Tarnished Build
          </div>
        </div>

        {/* RIGHT-SIDE CARTOUCHE — a small ornament with crest */}
        <div style={{
          position: "absolute",
          right: "6vw", top: "calc(50% + 4vh)",
          transform: m >= 5 ? "translateY(-50%)" : "translateY(calc(-50% + 16px))",
          width: "min(110px, 12vw)",
          opacity: m >= 5 ? 0.85 : 0,
          transition: "opacity 1.2s ease, transform 1.2s cubic-bezier(.2,.7,.2,1)",
          pointerEvents: "none",
        }}>
          <svg viewBox="0 0 200 320" style={{ width: "100%", display: "block", opacity: .85 }}>
            <defs>
              <radialGradient id="crest-fade" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#f1d27a" stopOpacity=".25" />
                <stop offset="100%" stopColor="transparent" />
              </radialGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#crest-fade)" />
            <g stroke="#d4a851" fill="none" strokeWidth=".8" style={{ animation: "slow-spin 80s linear infinite", transformOrigin: "100px 100px" }}>
              <circle cx="100" cy="100" r="78" strokeDasharray="2 4" opacity=".6" />
              <circle cx="100" cy="100" r="64" />
            </g>
            <g stroke="#d4a851" fill="none" strokeWidth="1" filter="drop-shadow(0 0 4px rgba(241,210,122,.6))">
              {/* radiant star */}
              <path d="M 100,50 L 105,90 L 145,100 L 105,110 L 100,150 L 95,110 L 55,100 L 95,90 Z" />
              <circle cx="100" cy="100" r="20" />
              <circle cx="100" cy="100" r="6" fill="#d4a851" />
              <line x1="100" y1="180" x2="100" y2="290" />
              <line x1="80"  y1="200" x2="120" y2="200" />
              <line x1="85"  y1="260" x2="115" y2="260" />
              <path d="M 90,290 L 100,310 L 110,290 Z" fill="#d4a851" />
            </g>
          </svg>
        </div>

        {/* BOTTOM BAR — ER-style prompts */}
        <div style={{
          position: "absolute",
          bottom: 24, left: 0, right: 0,
          display: "flex", justifyContent: "space-between",
          padding: "0 64px",
          ...reveal(6),
        }}>
          <div className="er-prompt">
            <span className="key">↑↓</span> Navigate
            <span style={{ width: 18 }} />
            <span className="key">Enter</span> Select
          </div>
          <div className="er-prompt" style={{ color: "var(--gold-deep)" }}>
            ✦ &nbsp; Grace will guide you &nbsp; ✦
          </div>
        </div>

        {/* keyframes used inline */}
        <style>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes fade-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  };
})();
