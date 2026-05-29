'use client';

import { useState } from 'react';
import { getAudio } from '@/lib/audio';
import { PORTFOLIO_DATA } from '@/data/portfolio';
import EmberField from '@/components/shared/EmberField';
import BackButton from '@/components/shared/BackButton';
import Ornament from '@/components/shared/Ornament';

interface CarveFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multi?: boolean;
  placeholder?: string;
}

function CarveField({ label, value, onChange, multi = false, placeholder = '' }: CarveFieldProps) {
  const sharedStyle: React.CSSProperties = {
    fontFamily: 'var(--display)',
    fontSize: multi ? 16 : 18,
    letterSpacing: '.08em',
    color: 'var(--parchment)',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(212,168,81,.3)',
    outline: 'none',
    padding: '8px 0',
    resize: 'none',
    width: '100%',
    cursor: 'none',
    textShadow: value
      ? '0 0 8px rgba(241,210,122,.4), 0 0 1px rgba(0,0,0,.8)'
      : 'none',
    fontStyle: multi ? 'italic' : 'normal',
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    onChange(e.target.value);
    if (e.target.value.length > value.length) getAudio().carve();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontFamily: 'var(--display)',
        fontSize: 10,
        letterSpacing: '.32em',
        textTransform: 'uppercase',
        color: 'var(--gold-deep)',
      }}>
        {label}
      </label>
      {multi ? (
        <textarea value={value} placeholder={placeholder} onChange={handleChange} rows={5} style={sharedStyle} />
      ) : (
        <input value={value} placeholder={placeholder} onChange={handleChange} style={sharedStyle} />
      )}
    </div>
  );
}

export default function ContactPage({ onBack }: { onBack: () => void }) {
  const data = PORTFOLIO_DATA.contact;
  const [form, setForm] = useState({ name: '', origin: '', message: '' });
  const [sent, setSent] = useState(false);

  function update(k: keyof typeof form, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  function inscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.message) return;
    getAudio().confirm();
    setSent(true);
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'radial-gradient(ellipse at 50% 60%, rgba(122,46,31,.18) 0%, transparent 55%),' +
          'linear-gradient(180deg, #0a0809 0%, #050307 100%)',
      }} />
      <EmberField count={28} intense={0.6} />

      <div style={{
        position: 'absolute', top: 36, left: 64, right: 64,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        zIndex: 20,
      }}>
        <div>
          <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>
            ‹ Codex IV · Means of Summoning ›
          </div>
          <h1 className="title-disp" style={{ fontSize: 42, marginTop: 6 }}>
            Carve Thy Summons
          </h1>
          <div style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            fontSize: 14, color: 'var(--parchment-dim)', marginTop: 4,
            maxWidth: 560, textWrap: 'pretty',
          }}>
            {data.intro}
          </div>
        </div>
        <BackButton onBack={onBack} />
      </div>

      <div style={{
        position: 'absolute',
        inset: '170px 64px 60px 64px',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 56,
      }}>
        <div style={{ position: 'relative', maxWidth: 720, justifySelf: 'center', width: '100%' }}>
          <svg viewBox="0 0 720 640" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,.6))' }}>
            <defs>
              <linearGradient id="stone-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"  stopColor="#3a342e" />
                <stop offset="40%" stopColor="#2a2520" />
                <stop offset="100%" stopColor="#161310" />
              </linearGradient>
              <filter id="stone-rough">
                <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" />
                <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .25 0" />
                <feComposite in2="SourceGraphic" operator="in" />
              </filter>
            </defs>
            <path d="M 60,80 Q 60,12 130,12 L 590,12 Q 660,12 660,80 L 660,620 L 60,620 Z" fill="url(#stone-grad)" />
            <path d="M 60,80 Q 60,12 130,12 L 590,12 Q 660,12 660,80 L 660,620 L 60,620 Z" fill="black" opacity=".5" filter="url(#stone-rough)" />
            <path d="M 78,98 Q 78,30 142,30 L 578,30 Q 642,30 642,98 L 642,602 L 78,602 Z"
                  fill="none" stroke="rgba(212,168,81,.45)" strokeWidth="1" />
            <path d="M 86,106 Q 86,40 148,40 L 572,40 Q 634,40 634,106 L 634,594 L 86,594 Z"
                  fill="none" stroke="rgba(212,168,81,.18)" strokeWidth=".5" />
            <g stroke="#000" strokeWidth=".8" fill="none" opacity=".6">
              <path d="M 110,170 L 130,230 L 122,280 L 144,330" />
              <path d="M 580,100 L 590,140 L 576,200" />
              <path d="M 200,560 L 220,580 L 240,570" />
              <path d="M 460,440 L 470,460 L 460,478 L 480,500" />
            </g>
            <g fill="none" stroke="rgba(212,168,81,.5)" strokeWidth="1">
              <circle cx="130" cy="78"  r="9" />
              <circle cx="130" cy="78"  r="3" fill="rgba(212,168,81,.7)" />
              <circle cx="590" cy="78"  r="9" />
              <circle cx="590" cy="78"  r="3" fill="rgba(212,168,81,.7)" />
            </g>
          </svg>

          <div style={{ position: 'relative', padding: '76px 84px 70px', minHeight: 600 }}>
            {!sent ? (
              <form onSubmit={inscribe} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                <div style={{ textAlign: 'center', marginBottom: 4 }}>
                  <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Inscription</div>
                  <Ornament style={{ margin: '10px auto 0', color: 'var(--gold-deep)' }} />
                </div>
                <CarveField label="Thy Name" value={form.name} onChange={(v) => update('name', v)} placeholder="By what name art thou known…" />
                <CarveField label="Place of Origin" value={form.origin} onChange={(v) => update('origin', v)} placeholder="A kingdom, guild, or studio…" />
                <CarveField label="Thy Summons" value={form.message} onChange={(v) => update('message', v)} multi placeholder="Speak thy purpose, traveler…" />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <div className="er-prompt" style={{ color: 'var(--parchment-dim)' }}>
                    Each rune shall be carved unto stone.
                  </div>
                  <button type="submit"
                    onMouseEnter={() => getAudio().hover()}
                    disabled={!form.name || !form.message}
                    className="acquire-btn"
                    style={{
                      cursor: 'none',
                      display: 'inline-flex', alignItems: 'center', gap: 12,
                      padding: '12px 22px',
                      background: 'linear-gradient(180deg, rgba(212,168,81,.14) 0%, rgba(212,168,81,.03) 100%)',
                      border: '1px solid var(--gold-deep)',
                      color: form.name && form.message ? 'var(--gold-bright)' : 'var(--parchment-dim)',
                      fontFamily: 'var(--display)',
                      fontSize: 12,
                      letterSpacing: '.3em',
                      textTransform: 'uppercase',
                      opacity: form.name && form.message ? 1 : .4,
                      transition: 'all .3s',
                      position: 'relative', overflow: 'hidden',
                    }}>
                    <span>Inscribe</span>
                    <span style={{ fontSize: 14 }}>✦</span>
                  </button>
                </div>
              </form>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', gap: 18, paddingTop: 110, paddingBottom: 110,
                animation: 'fade-in .8s ease forwards',
              }}>
                <div style={{ width: 80, height: 80 }}>
                  <svg viewBox="0 0 80 80">
                    <g stroke="var(--gold-bright)" strokeWidth="1.2" fill="none" filter="drop-shadow(0 0 8px rgba(241,210,122,.7))">
                      <circle cx="40" cy="40" r="34" strokeDasharray="2 4" opacity=".7" />
                      <circle cx="40" cy="40" r="22" />
                      <path d="M 28,42 L 36,50 L 54,30" />
                    </g>
                  </svg>
                </div>
                <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>The deed is done</div>
                <h2 className="title-disp gold" style={{ fontSize: 34 }}>Thy Summons Echoes Across the Lands</h2>
                <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--parchment-2)', maxWidth: 440, lineHeight: 1.5 }}>
                  Thy words are carved into the stone. A reply shall come, in due time, upon the path of grace.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', origin: '', message: '' }); getAudio().back(); }}
                  onMouseEnter={() => getAudio().hover()}
                  style={{
                    cursor: 'none',
                    marginTop: 12,
                    background: 'transparent',
                    border: '1px solid rgba(212,168,81,.4)',
                    color: 'var(--parchment-2)',
                    padding: '8px 18px',
                    fontFamily: 'var(--display)', fontSize: 10,
                    letterSpacing: '.3em', textTransform: 'uppercase',
                  }}>
                  Carve Again
                </button>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignSelf: 'center' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--gold-deep)', marginBottom: 14 }}>
              ‹ Other Ways to be Found ›
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.handles.map((h, i) => (
                <a key={i} href={h.href} target="_blank" rel="noopener noreferrer"
                  onMouseEnter={() => getAudio().hover()}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px',
                    border: '1px solid rgba(212,168,81,.2)',
                    background: 'linear-gradient(180deg, rgba(20,16,14,.7) 0%, rgba(10,8,9,.7) 100%)',
                    textDecoration: 'none',
                    cursor: 'none',
                    transition: 'border-color .2s, background .2s',
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(212,168,81,.6)'; e.currentTarget.style.background = 'linear-gradient(180deg, rgba(212,168,81,.08) 0%, rgba(20,16,14,.7) 100%)'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(212,168,81,.2)'; e.currentTarget.style.background = 'linear-gradient(180deg, rgba(20,16,14,.7) 0%, rgba(10,8,9,.7) 100%)'; }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'rgba(212,168,81,.6)'; e.currentTarget.style.background = 'linear-gradient(180deg, rgba(212,168,81,.08) 0%, rgba(20,16,14,.7) 100%)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(212,168,81,.2)'; e.currentTarget.style.background = 'linear-gradient(180deg, rgba(20,16,14,.7) 0%, rgba(10,8,9,.7) 100%)'; }}
                >
                  <div style={{
                    width: 36, height: 36,
                    display: 'grid', placeItems: 'center',
                    border: '1px solid rgba(212,168,81,.35)',
                    borderRadius: 2,
                  }}>
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--gold)" fill="none" strokeWidth="1.2">
                      <circle cx="12" cy="12" r="9" strokeDasharray="2 3" opacity=".6" />
                      <circle cx="12" cy="12" r="3" fill="var(--gold)" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="eyebrow" style={{ color: 'var(--gold-deep)', fontSize: 9 }}>{h.label}</div>
                    <div style={{
                      fontFamily: 'var(--display)', fontSize: 14,
                      color: 'var(--parchment)', letterSpacing: '.04em', marginTop: 2,
                    }}>{h.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div style={{
            padding: '20px 22px',
            border: '1px solid rgba(212,168,81,.18)',
            background: 'rgba(20,16,14,.5)',
            borderRadius: 1,
            position: 'relative',
          }}>
            <div className="eyebrow" style={{ color: 'var(--gold-deep)' }}>Tarnished&apos;s Note</div>
            <p style={{
              fontFamily: 'var(--serif)', fontStyle: 'italic',
              fontSize: 14, color: 'var(--parchment-2)',
              lineHeight: 1.6, marginTop: 8,
              textWrap: 'pretty',
            }}>
              &ldquo;However grim the Lands Between may seem, do not forget — there are those who pursue a fair land. Among them I count my correspondents.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
