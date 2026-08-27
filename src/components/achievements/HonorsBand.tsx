'use client';

import { motion } from 'framer-motion';
import type { Honors } from '@/data/portfolio';

const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * This block sits below the fold inside the page's scroll container, so
 * mount-time delays would burn while it is invisible. It waits to be seen.
 */
const VIEW = { once: true, amount: 0.2 } as const;

const group = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const rise  = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } };

/** The laurelled seal, worn only by the night's highest honor. */
function LaurelSeal({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block' }}>
      <g stroke="var(--gold)" strokeWidth="1.2" fill="none" opacity=".65">
        <path d="M 24,76 Q 6,52 18,24" />
        <path d="M 76,76 Q 94,52 82,24" />
        <path d="M 20,66 q -8,-2 -9,-9   M 18,53 q -8,-1 -10,-9   M 18,40 q -8,-1 -9,-8" />
        <path d="M 80,66 q 8,-2 9,-9   M 82,53 q 8,-1 10,-9   M 82,40 q 8,-1 9,-8" />
      </g>
      <path d="M 50,26 L 74,50 L 50,74 L 26,50 Z" fill="rgba(212,168,81,.09)" stroke="var(--gold-bright)" strokeWidth="1.1" />
      <path d="M 50,38 L 53.5,46.5 L 62,50 L 53.5,53.5 L 50,62 L 46.5,53.5 L 38,50 L 46.5,46.5 Z" fill="var(--gold-bright)" />
    </svg>
  );
}

/** The plainer seal the activity laurels carry. */
function AwardSeal({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block' }}>
      <circle cx="50" cy="50" r="30" fill="none" stroke="var(--gold)" strokeWidth="1.1" opacity=".45" />
      <path d="M 50,24 L 72,37 L 72,63 L 50,76 L 28,63 L 28,37 Z" fill="rgba(212,168,81,.06)" stroke="var(--gold)" strokeWidth="1.1" />
      <path d="M 50,38 L 53.5,46.5 L 62,50 L 53.5,53.5 L 50,62 L 46.5,53.5 L 38,50 L 46.5,46.5 Z" fill="var(--gold-bright)" />
    </svg>
  );
}

const kindStyle: React.CSSProperties = {
  fontFamily: 'var(--display)', fontSize: 12,
  letterSpacing: '.2em', textTransform: 'uppercase',
  color: 'var(--parchment-2)', lineHeight: 1.5,
};
const detailStyle: React.CSSProperties = {
  fontFamily: 'var(--serif)', fontSize: 15,
  lineHeight: 1.6, color: 'var(--parchment-2)', textWrap: 'pretty',
};

/** One of the three activity laurels, as a quiet row beside the lead. */
function LaurelRow({ a, last }: { a: Honors['awards'][number]; last: boolean }) {
  return (
    <motion.div
      variants={rise}
      style={{
        display: 'grid', gridTemplateColumns: '34px 1fr', gap: 16,
        alignItems: 'baseline', padding: '13px 0',
        borderBottom: last ? 'none' : '1px solid rgba(212,168,81,.11)',
      }}>
      <AwardSeal size={30} />
      <div>
        <div style={kindStyle}>{a.kind}</div>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 19.5,
          letterSpacing: '.04em', lineHeight: 1.3,
          color: 'var(--gold-bright)', marginTop: 3,
          textShadow: '0 0 13px rgba(241,210,122,.2)',
        }}>{a.event}</div>
        <div style={{ ...detailStyle, marginTop: 4 }}>{a.detail}</div>
      </div>
    </motion.div>
  );
}

/**
 * The ASR laurels, carried at the same rank as any other section on this page:
 * eyebrow, note, content, no frame. The highest honor takes a marked rail and
 * larger type rather than a pedestal, so the hierarchy survives without the
 * block turning back into the page's headline.
 */
export default function HonorsBand({
  h, isMobile,
}: { h: Honors; isMobile: boolean }) {
  const lead = h.awards.find(a => a.lead);
  const rest = h.awards.filter(a => !a.lead);

  return (
    <motion.section
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={VIEW}
      /* the scroll container is a flex column, and overflow:hidden children
         lose their automatic minimum size, so without this it gets crushed */
      style={{ flexShrink: 0 }}>

      <motion.div variants={rise}>
        <div className="eyebrow" style={{ color: 'var(--gold)', marginBottom: 6 }}>
          ‹ {h.label} ›
        </div>
        <div style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          fontSize: 16, color: 'var(--parchment-2)', maxWidth: 660,
        }}>{h.note}</div>
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '330px 1fr',
        gap: isMobile ? 28 : 46,
        marginTop: 26,
        alignItems: 'start',
      }}>
        {lead && (
          <motion.div variants={rise} style={{
            borderLeft: '2px solid rgba(241,210,122,.4)',
            paddingLeft: 22,
          }}>
            <LaurelSeal size={44} />
            <div style={{
              ...kindStyle,
              fontSize: 12.5,
              color: 'var(--gold-bright)',
              textShadow: '0 0 12px rgba(241,210,122,.28)',
              marginTop: 12,
            }}>{lead.kind}</div>
            <div style={{
              fontFamily: 'var(--display)', fontSize: 23,
              letterSpacing: '.04em', lineHeight: 1.3,
              color: 'var(--gold-bright)', marginTop: 7,
              textShadow: '0 0 14px rgba(241,210,122,.22)',
            }}>{lead.event}</div>
            <div style={{ ...detailStyle, marginTop: 7 }}>{lead.detail}</div>
          </motion.div>
        )}

        <div style={{ display: 'grid' }}>
          {rest.map((a, i) => (
            <LaurelRow key={a.kind} a={a} last={i === rest.length - 1} />
          ))}
        </div>
      </div>

      <motion.div variants={rise} style={{
        fontFamily: 'var(--serif)', fontStyle: 'italic',
        fontSize: 14.5, color: 'var(--parchment-2)',
        marginTop: 26, opacity: .78,
      }}>{h.footnote}</motion.div>
    </motion.section>
  );
}
