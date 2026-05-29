'use client';

import React from 'react';

interface OrnamentProps {
  width?: number;
  style?: React.CSSProperties;
}

export default function Ornament({ width = 180, style }: OrnamentProps) {
  return (
    <div className="ornament" style={{ width, ...style }}>
      <svg viewBox="0 0 14 14">
        <path d="M 7 1 L 13 7 L 7 13 L 1 7 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <circle cx="7" cy="7" r="1.6" fill="currentColor" />
      </svg>
    </div>
  );
}
