// PROJECTS — gemstone constellation. Hover -> crack -> rune + stat panel.

(function () {
  const { useState, useEffect, useRef, useMemo } = React;

  function StatBar({ label, value, max = 99 }) {
    const pct = Math.min(100, (value / max) * 100);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "var(--ui)", fontSize: 12 }}>
        <div style={{
          flex: "0 0 64px",
          fontFamily: "var(--display)",
          fontSize: 10,
          letterSpacing: ".18em",
          color: "var(--parchment-dim)",
          textTransform: "uppercase",
        }}>{label}</div>
        <div style={{ flex: 1, height: 6, background: "rgba(212,168,81,.08)", border: "1px solid rgba(212,168,81,.18)", position: "relative", overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: 0, left: 0, bottom: 0,
            width: `${pct}%`,
            background: "linear-gradient(90deg, var(--gold-deep) 0%, var(--gold) 60%, var(--gold-bright) 100%)",
            boxShadow: "0 0 8px rgba(241,210,122,.5)",
            transition: "width .6s cubic-bezier(.2,.7,.2,1)",
          }} />
          {/* tick marks */}
          <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg, transparent 0 9.5%, rgba(0,0,0,.4) 9.5% 10%)" }} />
        </div>
        <div style={{
          flex: "0 0 32px",
          textAlign: "right",
          fontFamily: "var(--display)",
          fontSize: 13,
          color: "var(--gold-bright)",
          fontVariantNumeric: "tabular-nums",
        }}>{value}</div>
      </div>
    );
  }

  function StatPanel({ project, visible }) {
    if (!project) return null;
    return (
      <div style={{
        position: "absolute",
        right: 56,
        top: "50%",
        transform: `translateY(-50%) translateX(${visible ? 0 : 40}px)`,
        opacity: visible ? 1 : 0,
        transition: "opacity .35s ease, transform .45s cubic-bezier(.2,.7,.2,1)",
        width: 360,
        pointerEvents: visible ? "auto" : "none",
        zIndex: 30,
      }}>
        {/* parchment-meets-stone card */}
        <div style={{
          position: "relative",
          padding: "28px 26px 22px",
          background:
            "linear-gradient(180deg, rgba(20,16,14,.94) 0%, rgba(12,10,9,.96) 100%)",
          border: "1px solid rgba(212,168,81,.32)",
          boxShadow: "0 30px 80px rgba(0,0,0,.7), 0 0 40px rgba(212,168,81,.08), inset 0 0 60px rgba(0,0,0,.6)",
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

          <div style={{
            fontFamily: "var(--display)",
            fontSize: 9,
            letterSpacing: ".32em",
            color: "var(--parchment-dim)",
            textTransform: "uppercase",
            marginBottom: 4,
          }}>
            {project.type} · {project.rarity}
          </div>
          <h2 style={{
            fontFamily: "var(--display)",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: ".06em",
            color: "var(--gold-bright)",
            textShadow: "0 0 20px rgba(241,210,122,.4)",
            margin: 0,
          }}>
            {project.name}
          </h2>
          <div style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontSize: 14,
            color: "var(--parchment-2)",
            marginTop: 2,
            marginBottom: 16,
          }}>
            &ldquo;{project.epithet}&rdquo;
          </div>

          <Ornament style={{ marginBottom: 16 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
            {Object.entries(project.stats).map(([k, v]) => (
              <StatBar key={k} label={k} value={v} />
            ))}
          </div>

          <Ornament style={{ marginBottom: 14 }} />

          <p style={{
            fontFamily: "var(--serif)",
            fontSize: 14,
            lineHeight: 1.55,
            color: "var(--parchment)",
            margin: "0 0 18px",
            textWrap: "pretty",
          }}>
            {project.desc}
          </p>

          {/* tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: "var(--display)",
                fontSize: 9,
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "var(--parchment-dim)",
                padding: "4px 8px",
                border: "1px solid rgba(212,168,81,.22)",
                background: "rgba(212,168,81,.04)",
              }}>{t}</span>
            ))}
          </div>

          {/* acquire button */}
          <a href={project.github} target="_blank" rel="noopener"
             onClick={() => window.SFX && window.SFX.confirm()}
             onMouseEnter={() => window.SFX && window.SFX.hover()}
             className="acquire-btn"
             style={{
               display: "flex", alignItems: "center", justifyContent: "space-between",
               padding: "11px 16px",
               textDecoration: "none",
               color: "var(--gold-bright)",
               fontFamily: "var(--display)",
               fontSize: 11,
               letterSpacing: ".3em",
               textTransform: "uppercase",
               border: "1px solid var(--gold-deep)",
               background: "linear-gradient(180deg, rgba(212,168,81,.08) 0%, rgba(212,168,81,.02) 100%)",
               position: "relative", overflow: "hidden",
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

  // Constellation line — fades in/out, slight glow
  function ConstLine({ a, b, active, bounds }) {
    const x1 = (a.xp / 100) * bounds.w;
    const y1 = (a.yp / 100) * bounds.h;
    const x2 = (b.xp / 100) * bounds.w;
    const y2 = (b.yp / 100) * bounds.h;
    return (
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={active ? "rgba(241,210,122,.8)" : "rgba(212,168,81,.35)"}
        strokeWidth={active ? 1.4 : 0.8}
        strokeDasharray="3 6"
        style={{ transition: "stroke .4s, stroke-width .4s" }}
      />
    );
  }

  window.ProjectsPage = function ProjectsPage({ onBack }) {
    const data = window.PORTFOLIO_DATA;
    const [hoveredId, setHoveredId] = useState(null);
    const [bounds, setBounds] = useState({ w: 1200, h: 700 });
    const fieldRef = useRef(null);

    useEffect(() => {
      function measure() {
        if (!fieldRef.current) return;
        const r = fieldRef.current.getBoundingClientRect();
        setBounds({ w: r.width, h: r.height });
      }
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }, []);

    const project = useMemo(
      () => data.projects.find(p => p.id === hoveredId),
      [hoveredId]
    );

    const projectById = useMemo(() => {
      const m = {};
      data.projects.forEach(p => { m[p.id] = p; });
      return m;
    }, []);

    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {/* deep void background w/ subtle nebula */}
        <div style={{
          position: "absolute", inset: 0,
          background:
            "radial-gradient(ellipse at 30% 30%, rgba(122,46,31,.18) 0%, transparent 50%)," +
            "radial-gradient(ellipse at 75% 70%, rgba(58,107,138,.12) 0%, transparent 55%)," +
            "radial-gradient(ellipse at 50% 50%, #0d0b10 0%, #050307 80%)",
        }} />

        {/* stars */}
        <Starfield count={140} />
        <EmberField count={20} intense={0.55} />

        {/* HEADER */}
        <div style={{
          position: "absolute", top: 36, left: 64, right: 64,
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          zIndex: 20,
        }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--gold-deep)" }}>
              ‹ Codex II ·  The Vault of Lesser Stones ›
            </div>
            <h1 className="title-disp" style={{
              fontSize: 42,
              marginTop: 6,
              color: "var(--parchment)",
            }}>
              Constellation of Works
            </h1>
            <div style={{
              fontFamily: "var(--serif)", fontStyle: "italic",
              fontSize: 14,
              color: "var(--parchment-dim)",
              marginTop: 4,
            }}>
              Trace a stone to behold the rune it bears. Strike to step within.
            </div>
          </div>
          <BackButton onBack={onBack} />
        </div>

        {/* CONSTELLATION FIELD */}
        <div ref={fieldRef} style={{
          position: "absolute",
          inset: "150px 56px 96px 56px",
        }}>
          {/* connection lines */}
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <g>
              {data.constellationEdges.map(([a, b], i) => {
                const A = projectById[a], B = projectById[b];
                if (!A || !B) return null;
                const active = hoveredId === a || hoveredId === b;
                return <ConstLine key={i} a={A} b={B} active={active} bounds={bounds} />;
              })}
            </g>
          </svg>

          {/* gemstones */}
          {data.projects.map((p) => {
            const isHovered = hoveredId === p.id;
            const isDimmed  = hoveredId && !isHovered;
            const Rune = window.Runes[p.id] || window.Runes._generic;
            return (
              <div key={p.id}
                onMouseEnter={() => { setHoveredId(p.id); window.SFX && window.SFX.crack(); }}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: "absolute",
                  left: `${p.xp}%`,
                  top:  `${p.yp}%`,
                  transform: "translate(-50%, -50%)",
                  cursor: "none",
                  zIndex: isHovered ? 12 : 10,
                  filter: isDimmed ? "brightness(.55) saturate(.8)" : "none",
                  transition: "filter .5s ease, transform .6s cubic-bezier(.2,.7,.2,1)",
                }}>
                <div style={{ position: "relative", width: 110, height: 110 }}>
                  {/* gem */}
                  <div style={{
                    position: "absolute", inset: 0,
                    transition: "transform .6s cubic-bezier(.2,.7,.2,1), opacity .5s",
                    transform: isHovered ? "scale(1.08)" : "scale(1)",
                  }}>
                    <Gemstone shape={p.shape} hue={p.hue} size={110} hovered={isHovered} cracked={isHovered} id={p.id} />
                  </div>

                  {/* rune emerging through the crack */}
                  <div style={{
                    position: "absolute",
                    left: "50%", top: "50%",
                    transform: `translate(-50%, -50%) scale(${isHovered ? 1.35 : 0.5})`,
                    opacity: isHovered ? 1 : 0,
                    transition: "transform .6s cubic-bezier(.2,.7,.2,1) .15s, opacity .5s ease .15s",
                    pointerEvents: "none",
                  }}>
                    <Rune size={120} color={`hsl(${p.hue} 90% 75%)`} />
                  </div>

                  {/* label under */}
                  <div style={{
                    position: "absolute",
                    left: "50%", bottom: -28,
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    fontFamily: "var(--display)",
                    fontSize: 10,
                    letterSpacing: ".28em",
                    textTransform: "uppercase",
                    color: isHovered ? "var(--gold-bright)" : "var(--parchment-dim)",
                    textShadow: isHovered ? "0 0 12px rgba(241,210,122,.6)" : "none",
                    transition: "color .4s, text-shadow .4s",
                    pointerEvents: "none",
                  }}>
                    {p.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* STAT PANEL */}
        <StatPanel project={project} visible={!!project} />

        {/* hint */}
        <div style={{
          position: "absolute", bottom: 28, left: 64,
          opacity: hoveredId ? 0 : 1,
          transition: "opacity .3s",
        }}>
          <div className="er-prompt" style={{ color: "var(--parchment-dim)" }}>
            <span className="key">✦</span> Hover a stone &nbsp;·&nbsp; <span className="key">Click</span> the rune to enter
          </div>
        </div>
      </div>
    );
  };

  // Tiny starfield
  function Starfield({ count = 100 }) {
    const stars = useMemo(() => {
      const a = [];
      for (let i = 0; i < count; i++) {
        a.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          s: 0.4 + Math.random() * 1.4,
          o: 0.3 + Math.random() * 0.6,
          dur: 2 + Math.random() * 6,
          delay: -Math.random() * 6,
        });
      }
      return a;
    }, [count]);
    return (
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {stars.map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${s.x}%`, top: `${s.y}%`,
            width: s.s, height: s.s,
            borderRadius: "50%",
            background: "rgba(241,210,122,.9)",
            opacity: s.o,
            boxShadow: "0 0 4px rgba(241,210,122,.7)",
            animation: `shimmer ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }} />
        ))}
      </div>
    );
  }

  function BackButton({ onBack }) {
    return (
      <a href="#" onClick={(e) => { e.preventDefault(); window.SFX && window.SFX.back(); onBack(); }}
         onMouseEnter={() => window.SFX && window.SFX.hover()}
         className="er-prompt"
         style={{
           textDecoration: "none",
           padding: "8px 14px",
           border: "1px solid rgba(212,168,81,.25)",
           color: "var(--parchment-2)",
           background: "rgba(7,6,10,.7)",
           backdropFilter: "blur(4px)",
         }}>
        <span className="key">Esc</span> Title
      </a>
    );
  }
  window.BackButton = BackButton;
})();
