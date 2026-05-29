// ACHIEVEMENTS — RPG character sheet
(function () {
  const { useState, useEffect } = React;

  function Statline({ s, idx }) {
    const [reveal, setReveal] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setReveal(true), 200 + idx * 90);
      return () => clearTimeout(t);
    }, []);
    return (
      <div style={{
        display: "grid",
        gridTemplateColumns: "140px 1fr 56px",
        alignItems: "center",
        gap: 14,
        padding: "10px 0",
        borderBottom: "1px solid rgba(212,168,81,.12)",
      }}>
        <div style={{
          fontFamily: "var(--display)",
          fontSize: 12,
          letterSpacing: ".22em",
          color: "var(--parchment-2)",
          textTransform: "uppercase",
        }}>
          {s.key}
          <div style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 11,
            letterSpacing: "0",
            color: "var(--parchment-dim)",
            textTransform: "none",
            marginTop: 2,
          }}>{s.note}</div>
        </div>
        <div style={{
          height: 8,
          background: "rgba(212,168,81,.06)",
          border: "1px solid rgba(212,168,81,.18)",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: 0,
            width: reveal ? `${(s.val / 60) * 100}%` : "0%",
            background: "linear-gradient(90deg, var(--gold-deep), var(--gold), var(--gold-bright))",
            boxShadow: "0 0 10px rgba(241,210,122,.4)",
            transition: "width 1.2s cubic-bezier(.2,.7,.2,1)",
          }} />
          {/* tick segments */}
          <div style={{ position: "absolute", inset: 0,
            background: "repeating-linear-gradient(90deg, transparent 0 9.5%, rgba(0,0,0,.5) 9.5% 10%)" }} />
        </div>
        <div style={{
          textAlign: "right",
          fontFamily: "var(--display)",
          fontSize: 22,
          fontWeight: 600,
          color: "var(--gold-bright)",
          fontVariantNumeric: "tabular-nums",
          textShadow: "0 0 10px rgba(241,210,122,.4)",
        }}>{s.val}</div>
      </div>
    );
  }

  function TimelineEntry({ e, idx, last }) {
    const [reveal, setReveal] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setReveal(true), 400 + idx * 150);
      return () => clearTimeout(t);
    }, []);
    return (
      <div style={{
        position: "relative",
        paddingLeft: 44,
        paddingBottom: last ? 0 : 26,
        opacity: reveal ? 1 : 0,
        transform: reveal ? "translateX(0)" : "translateX(-10px)",
        transition: "opacity .8s, transform .8s",
      }}>
        {/* vertical line */}
        {!last && <div style={{
          position: "absolute", left: 11, top: 22, bottom: 0,
          width: 1, background: "linear-gradient(180deg, var(--gold-deep), transparent)",
          opacity: .55,
        }} />}
        {/* marker */}
        <div style={{
          position: "absolute", left: 0, top: 6,
          width: 22, height: 22,
        }}>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <circle cx="12" cy="12" r="10" fill="none" stroke="var(--gold)" strokeWidth="1" opacity=".55" />
            <circle cx="12" cy="12" r="6" fill="var(--void)" stroke="var(--gold-bright)" strokeWidth="1" />
            <circle cx="12" cy="12" r="2.2" fill="var(--gold-bright)" />
          </svg>
        </div>

        <div style={{
          fontFamily: "var(--display)",
          fontSize: 10, letterSpacing: ".3em",
          color: "var(--parchment-dim)",
          textTransform: "uppercase",
        }}>
          {e.year} · {e.org}
        </div>
        <div style={{
          fontFamily: "var(--display)",
          fontSize: 22, fontWeight: 600,
          color: "var(--gold-bright)",
          letterSpacing: ".04em",
          textShadow: "0 0 16px rgba(241,210,122,.25)",
          marginTop: 4,
        }}>
          {e.title}
        </div>
        <div style={{
          fontFamily: "var(--serif)",
          fontSize: 14,
          color: "var(--parchment)",
          lineHeight: 1.5,
          marginTop: 6,
          maxWidth: 540,
          textWrap: "pretty",
        }}>{e.body}</div>
      </div>
    );
  }

  // Character portrait — silhouette in cloak with crown
  function Portrait() {
    return (
      <div style={{
        position: "relative", width: 220, height: 280,
        border: "1px solid rgba(212,168,81,.28)",
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(122,46,31,.25) 0%, transparent 60%)," +
          "linear-gradient(180deg, #14110d 0%, #07060a 100%)",
        boxShadow: "inset 0 0 60px rgba(0,0,0,.7), 0 24px 60px rgba(0,0,0,.5)",
      }}>
        {/* corner ornaments */}
        {[[8,8,1,1],[8,8,-1,1],[8,8,1,-1],[8,8,-1,-1]].map(([x,y,sx,sy],i)=>(
          <svg key={i} viewBox="0 0 20 20" width="14" height="14"
            style={{ position: "absolute",
              [sx>0?"left":"right"]: x,
              [sy>0?"top":"bottom"]: y,
              transform: `scale(${sx},${sy})`,
              color: "var(--gold)" }}>
            <path d="M 0,0 L 18,0 M 0,0 L 0,18" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle cx="2" cy="2" r="1.2" fill="currentColor" />
          </svg>
        ))}

        <svg viewBox="0 0 280 360" style={{ position: "absolute", inset: 0 }}>
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
          {/* aura behind */}
          <circle cx="140" cy="120" r="100" fill="url(#pglow)" />

          {/* silhouette */}
          <g>
            {/* cloak */}
            <path d="M 60,360 L 70,220 Q 80,170 110,160 L 110,140 Q 110,100 140,90 Q 170,100 170,140 L 170,160 Q 200,170 210,220 L 220,360 Z" fill="url(#cloak)" />
            {/* head */}
            <ellipse cx="140" cy="120" rx="26" ry="32" fill="#0a0807" />
            {/* face shadow */}
            <ellipse cx="140" cy="128" rx="18" ry="20" fill="#000" />
            {/* hood opening */}
            <path d="M 110,130 Q 140,100 170,130 Q 165,160 140,168 Q 115,160 110,130 Z" fill="#000" />
            {/* crown / circlet */}
            <g stroke="#d4a851" strokeWidth="1.2" fill="none" filter="drop-shadow(0 0 6px rgba(241,210,122,.6))">
              <path d="M 116,88 Q 140,76 164,88" />
              <path d="M 116,88 L 116,82 M 140,76 L 140,68 M 164,88 L 164,82 M 128,80 L 128,76 M 152,80 L 152,76" />
              <circle cx="140" cy="68" r="2.5" fill="#d4a851" />
            </g>
            {/* glowing eyes */}
            <circle cx="132" cy="125" r="1.5" fill="#f1d27a">
              <animate attributeName="opacity" values=".5;1;.5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="148" cy="125" r="1.5" fill="#f1d27a">
              <animate attributeName="opacity" values=".5;1;.5" dur="3s" begin=".2s" repeatCount="indefinite" />
            </circle>
            {/* clasp */}
            <g transform="translate(140,170)" stroke="#d4a851" strokeWidth="1.2" fill="none">
              <circle r="8" />
              <path d="M -5,0 L 5,0 M 0,-5 L 0,5" />
            </g>
          </g>
        </svg>

        {/* slow rotating sigil overlay */}
        <svg viewBox="0 0 280 360" style={{ position: "absolute", inset: 0, pointerEvents: "none", animation: "slow-spin 100s linear infinite", transformOrigin: "center" }}>
          <g stroke="rgba(212,168,81,.18)" fill="none">
            <circle cx="140" cy="180" r="130" strokeDasharray="2 8" />
          </g>
        </svg>
      </div>
    );
  }

  window.AchievementsPage = function AchievementsPage({ onBack }) {
    const a = window.PORTFOLIO_DATA.achievements;
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(212,168,81,.10) 0%, transparent 60%)," +
            "linear-gradient(180deg, #0d0b0a 0%, #050307 100%)",
        }} />
        <EmberField count={26} intense={0.7} />

        {/* HEADER */}
        <div style={{
          position: "absolute", top: 36, left: 64, right: 64,
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          zIndex: 20,
        }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--gold-deep)" }}>
              ‹ Codex III · The Tarnished's Page ›
            </div>
            <h1 className="title-disp" style={{ fontSize: 42, marginTop: 6 }}>{a.title}</h1>
            <div style={{
              fontFamily: "var(--serif)", fontStyle: "italic",
              fontSize: 14, color: "var(--parchment-dim)", marginTop: 4,
            }}>
              Status, attributes, and the deeds upon thy name.
            </div>
          </div>
          <window.BackButton onBack={onBack} />
        </div>

        {/* CONTENT */}
        <div className="scroll" style={{
          position: "absolute",
          inset: "150px 56px 60px 56px",
          display: "grid",
          gridTemplateColumns: "240px 1fr 1.1fr",
          gap: 36,
          overflowY: "auto",
        }}>
          {/* LEFT — portrait + meta */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <Portrait />
            <div style={{ textAlign: "center" }}>
              <div className="eyebrow" style={{ color: "var(--gold-deep)" }}>Class</div>
              <div style={{
                fontFamily: "var(--display)", fontSize: 20, fontWeight: 600,
                color: "var(--gold-bright)", letterSpacing: ".08em",
                marginTop: 4,
              }}>{a.class}</div>
            </div>
            <div style={{ display: "flex", gap: 28, alignItems: "center", marginTop: 4 }}>
              <div style={{ textAlign: "center" }}>
                <div className="eyebrow" style={{ color: "var(--gold-deep)" }}>Level</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 36, color: "var(--gold-bright)", fontWeight: 600, textShadow: "0 0 16px rgba(241,210,122,.4)" }}>{a.level}</div>
              </div>
              <div style={{ width: 1, height: 50, background: "rgba(212,168,81,.3)" }} />
              <div style={{ textAlign: "center" }}>
                <div className="eyebrow" style={{ color: "var(--gold-deep)" }}>Runes</div>
                <div style={{ fontFamily: "var(--display)", fontSize: 24, color: "var(--gold-bright)", fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{a.runes.toLocaleString()}</div>
              </div>
            </div>
          </div>

          {/* MIDDLE — attributes */}
          <div>
            <div className="eyebrow" style={{ color: "var(--gold-deep)", marginBottom: 12 }}>
              ‹ Attributes ›
            </div>
            <div>
              {a.stats.map((s, i) => <Statline key={s.key} s={s} idx={i} />)}
            </div>
          </div>

          {/* RIGHT — timeline of deeds */}
          <div>
            <div className="eyebrow" style={{ color: "var(--gold-deep)", marginBottom: 16 }}>
              ‹ Deeds & Honors ›
            </div>
            <div>
              {a.timeline.map((e, i) => (
                <TimelineEntry key={i} e={e} idx={i} last={i === a.timeline.length - 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };
})();
