'use client';

import { useEffect, useState } from 'react';

export interface Viewport {
  /** Width <= 700px — the single-column handheld layout. */
  isMobile: boolean;
  /** 700px < width <= 1024px — desktop layouts with tightened spacing. */
  isTablet: boolean;
  /** Touch-first device: no hover, coarse pointer. Input, not width. */
  isCoarse: boolean;
}

const DESKTOP: Viewport = { isMobile: false, isTablet: false, isCoarse: false };

/**
 * Media-query state for the responsive layout switches. SSR renders the
 * desktop layout; the first client effect corrects it before paint settles.
 */
export function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(DESKTOP);

  useEffect(() => {
    const mobile = window.matchMedia('(max-width: 700px)');
    const tablet = window.matchMedia('(max-width: 1024px)');
    const coarse = window.matchMedia('(hover: none) and (pointer: coarse)');
    const update = () => setVp({
      isMobile: mobile.matches,
      isTablet: tablet.matches && !mobile.matches,
      isCoarse: coarse.matches,
    });
    update();
    const queries = [mobile, tablet, coarse];
    queries.forEach(q => q.addEventListener('change', update));
    return () => queries.forEach(q => q.removeEventListener('change', update));
  }, []);

  return vp;
}
