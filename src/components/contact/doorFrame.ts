/**
 * THE GREAT SEALED DOOR — static SVG markup string.
 * Rendered via dangerouslySetInnerHTML inside a pointer-events:none wrapper.
 * viewBox: 0 0 660 560 — double-leaf pointed-arch gate, stone jambs, lintel,
 * recessed panels, corner bosses, gilded filigree, vertical seam.
 */
export const DOOR_SVG = `
<svg
  viewBox="0 0 660 560"
  width="100%" height="100%"
  overflow="visible"
  style="position:absolute;top:0;left:0;z-index:20;pointer-events:none;"
  aria-hidden="true">

  <defs>
    <radialGradient id="door-stone" cx="38%" cy="28%" r="85%">
      <stop offset="0%"   stop-color="#302820" />
      <stop offset="38%"  stop-color="#1e1812" />
      <stop offset="75%"  stop-color="#140f0b" />
      <stop offset="100%" stop-color="#0a0806" />
    </radialGradient>
    <radialGradient id="jamb-stone" cx="35%" cy="25%" r="90%">
      <stop offset="0%"   stop-color="#2a2218" />
      <stop offset="55%"  stop-color="#161210" />
      <stop offset="100%" stop-color="#0c0a08" />
    </radialGradient>
    <radialGradient id="lintel-stone" cx="50%" cy="30%" r="80%">
      <stop offset="0%"   stop-color="#2e2619" />
      <stop offset="60%"  stop-color="#1a1410" />
      <stop offset="100%" stop-color="#0e0c09" />
    </radialGradient>
    <radialGradient id="door-vig" cx="50%" cy="50%" r="50%">
      <stop offset="45%"  stop-color="#000" stop-opacity="0" />
      <stop offset="100%" stop-color="#000" stop-opacity="0.62" />
    </radialGradient>
    <radialGradient id="beyond-light" cx="50%" cy="52%" r="48%">
      <stop offset="0%"   stop-color="#f1c85a" stop-opacity="0.18" />
      <stop offset="42%"  stop-color="#c47a3e" stop-opacity="0.08" />
      <stop offset="100%" stop-color="#000"    stop-opacity="0" />
    </radialGradient>
    <radialGradient id="arch-glow" cx="50%" cy="100%" r="60%">
      <stop offset="0%"   stop-color="#f1d27a" stop-opacity="0.22" />
      <stop offset="100%" stop-color="#000"    stop-opacity="0" />
    </radialGradient>
    <filter id="door-shadow" x="-18%" y="-8%" width="136%" height="124%">
      <feDropShadow dx="0" dy="12" stdDeviation="24" flood-color="#000" flood-opacity="0.9"/>
    </filter>
    <filter id="seam-glow" x="-600%" y="-20%" width="1200%" height="140%">
      <feGaussianBlur stdDeviation="3" />
    </filter>
    <filter id="boss-glow" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="2.5" />
    </filter>
  </defs>

  <!-- warm light bleeding from beyond -->
  <ellipse cx="330" cy="300" rx="280" ry="240"
           fill="url(#beyond-light)" opacity="0.9" />

  <!-- LEFT JAMB -->
  <rect x="52" y="180" width="52" height="346" fill="url(#jamb-stone)" rx="2" />
  <rect x="52" y="180" width="52" height="346" fill="none" stroke="#d4a851" stroke-width="0.8" stroke-opacity="0.28" rx="2"/>
  <line x1="104" y1="180" x2="104" y2="526" stroke="#000" stroke-opacity="0.5" stroke-width="2.5"/>
  <line x1="68" y1="195" x2="68" y2="520" stroke="#d4a851" stroke-opacity="0.09" stroke-width="0.7"/>
  <line x1="78" y1="195" x2="78" y2="520" stroke="rgba(247,232,184,0.07)" stroke-width="0.6"/>
  <line x1="88" y1="195" x2="88" y2="520" stroke="#d4a851" stroke-opacity="0.09" stroke-width="0.7"/>
  <path d="M 64,270 C 68,295 63,330 67,360" fill="none" stroke="#08060a" stroke-width="1.1" stroke-opacity="0.8" stroke-linecap="round"/>
  <path d="M 82,390 C 79,415 84,440 80,465" fill="none" stroke="#08060a" stroke-width="0.8" stroke-opacity="0.6" stroke-linecap="round"/>
  <line x1="57" y1="195" x2="57" y2="510" stroke="rgba(247,232,184,0.08)" stroke-width="1.4" stroke-linecap="round"/>

  <!-- RIGHT JAMB -->
  <rect x="556" y="180" width="52" height="346" fill="url(#jamb-stone)" rx="2" />
  <rect x="556" y="180" width="52" height="346" fill="none" stroke="#d4a851" stroke-width="0.8" stroke-opacity="0.28" rx="2"/>
  <line x1="556" y1="180" x2="556" y2="526" stroke="#000" stroke-opacity="0.5" stroke-width="2.5"/>
  <line x1="572" y1="195" x2="572" y2="520" stroke="#d4a851" stroke-opacity="0.09" stroke-width="0.7"/>
  <line x1="582" y1="195" x2="582" y2="520" stroke="rgba(247,232,184,0.07)" stroke-width="0.6"/>
  <line x1="592" y1="195" x2="592" y2="520" stroke="#d4a851" stroke-opacity="0.09" stroke-width="0.7"/>
  <path d="M 596,310 C 591,338 596,365 592,400" fill="none" stroke="#08060a" stroke-width="1.1" stroke-opacity="0.8" stroke-linecap="round"/>
  <path d="M 577,430 C 581,455 577,480 580,500" fill="none" stroke="#08060a" stroke-width="0.8" stroke-opacity="0.6" stroke-linecap="round"/>
  <line x1="603" y1="195" x2="603" y2="510" stroke="rgba(247,232,184,0.08)" stroke-width="1.4" stroke-linecap="round"/>

  <!-- LINTEL / CORNICE -->
  <rect x="48" y="160" width="564" height="36" fill="url(#lintel-stone)" rx="2"/>
  <line x1="48" y1="161" x2="612" y2="161" stroke="rgba(247,232,184,0.22)" stroke-width="1.2"/>
  <line x1="48" y1="196" x2="612" y2="196" stroke="#000" stroke-width="2.5" stroke-opacity="0.6"/>
  <rect x="52" y="164" width="556" height="28" fill="none" stroke="#d4a851" stroke-width="0.7" stroke-opacity="0.35" rx="1"/>
  <rect x="64" y="169" width="532" height="18" fill="none" stroke="#8a6a2c" stroke-width="0.7" stroke-opacity="0.4" rx="1"/>
  <rect x="220" y="168" width="220" height="20" fill="#12100d" fill-opacity="0.6" rx="1"
        stroke="#d4a851" stroke-width="0.6" stroke-opacity="0.4"/>
  <g fill="#b9913f" fill-opacity="0.45">
    <rect x="78"  y="174" width="3" height="3" transform="rotate(45 79.5 175.5)"/>
    <rect x="98"  y="174" width="3" height="3" transform="rotate(45 99.5 175.5)"/>
    <rect x="118" y="174" width="3" height="3" transform="rotate(45 119.5 175.5)"/>
    <rect x="138" y="174" width="3" height="3" transform="rotate(45 139.5 175.5)"/>
    <rect x="158" y="174" width="3" height="3" transform="rotate(45 159.5 175.5)"/>
    <rect x="482" y="174" width="3" height="3" transform="rotate(45 483.5 175.5)"/>
    <rect x="502" y="174" width="3" height="3" transform="rotate(45 503.5 175.5)"/>
    <rect x="522" y="174" width="3" height="3" transform="rotate(45 523.5 175.5)"/>
    <rect x="542" y="174" width="3" height="3" transform="rotate(45 543.5 175.5)"/>
    <rect x="562" y="174" width="3" height="3" transform="rotate(45 563.5 175.5)"/>
  </g>
  <path d="M 195,165 C 200,175 198,185 202,196" fill="none" stroke="#06050a" stroke-width="1" stroke-opacity="0.85" stroke-linecap="round"/>
  <path d="M 448,167 C 443,178 446,188 442,196" fill="none" stroke="#06050a" stroke-width="0.9" stroke-opacity="0.7" stroke-linecap="round"/>

  <!-- POINTED ARCH -->
  <path d="M 104,195 C 104,155 148,94 192,66 L 210,78 C 172,104 128,160 128,195 Z"
        fill="url(#lintel-stone)" />
  <path d="M 104,195 C 104,155 148,94 192,66"
        fill="none" stroke="#d4a851" stroke-width="0.8" stroke-opacity="0.32"/>
  <path d="M 556,195 C 556,155 512,94 468,66 L 450,78 C 488,104 532,160 532,195 Z"
        fill="url(#lintel-stone)" />
  <path d="M 556,195 C 556,155 512,94 468,66"
        fill="none" stroke="#d4a851" stroke-width="0.8" stroke-opacity="0.32"/>
  <path d="M 192,66 C 240,28 290,14 330,14 C 370,14 420,28 468,66 L 450,78 C 420,48 378,28 330,28 C 282,28 240,48 210,78 Z"
        fill="url(#lintel-stone)" />
  <path d="M 192,66 C 240,28 290,14 330,14 C 370,14 420,28 468,66"
        fill="none" stroke="#d4a851" stroke-width="1" stroke-opacity="0.38"/>
  <path d="M 210,78 C 252,44 292,30 330,30 C 368,30 408,44 450,78"
        fill="none" stroke="#8a6a2c" stroke-width="0.7" stroke-opacity="0.3"/>
  <g transform="translate(330,22)">
    <circle r="10" fill="#d4a851" opacity="0.18" filter="url(#boss-glow)"/>
    <path d="M0,-7 L5,0 L0,7 L-5,0 Z" fill="#2a2218" stroke="#d4a851" stroke-width="0.9" stroke-opacity="0.6"/>
    <path d="M0,-4 L3,0 L0,4 L-3,0 Z" fill="#d4a851" fill-opacity="0.25"/>
  </g>
  <g fill="none" stroke="#8a6a2c" stroke-width="0.7" stroke-opacity="0.3">
    <path d="M 248,46 C 255,62 268,82 272,104"/>
    <path d="M 290,26 C 294,42 298,64 300,86"/>
    <path d="M 330,18 L 330,44"/>
    <path d="M 370,26 C 366,42 362,64 360,86"/>
    <path d="M 412,46 C 405,62 392,82 388,104"/>
  </g>
  <path d="M 218,72 C 256,42 294,30 330,30 C 366,30 404,42 442,72"
        fill="none" stroke="rgba(247,232,184,0.10)" stroke-width="1.6" stroke-linecap="round"/>

  <!-- DOOR SURROUND -->
  <path d="M 92,526 L 92,220 C 92,110 202,40 330,40 C 458,40 568,110 568,220 L 568,526 Z"
        fill="none" stroke="#8a6a2c" stroke-width="1" stroke-opacity="0.45"/>
  <path d="M 98,526 L 98,222 C 98,116 204,46 330,46 C 456,46 562,116 562,222 L 562,526 Z"
        fill="none" stroke="#d4a851" stroke-width="0.65" stroke-opacity="0.22"/>

  <!-- LEFT LEAF -->
  <path d="M 104,526 L 104,222 C 104,125 195,56 330,56 L 330,526 Z"
        fill="url(#door-stone)" />
  <path d="M 104,526 L 104,222 C 104,125 195,56 330,56 L 330,526 Z"
        fill="url(#door-vig)" />
  <path d="M 104,526 L 104,222 C 104,125 195,56 330,56 L 330,526 Z"
        fill="none" stroke="#d4a851" stroke-width="0.9" stroke-opacity="0.3"/>

  <!-- RIGHT LEAF -->
  <path d="M 330,56 C 465,56 556,125 556,222 L 556,526 L 330,526 Z"
        fill="url(#door-stone)" />
  <path d="M 330,56 C 465,56 556,125 556,222 L 556,526 L 330,526 Z"
        fill="url(#door-vig)" />
  <path d="M 330,56 C 465,56 556,125 556,222 L 556,526 L 330,526 Z"
        fill="none" stroke="#d4a851" stroke-width="0.9" stroke-opacity="0.3"/>

  <!-- LEFT LEAF PANEL DIVISIONS -->
  <path d="M 118,520 L 118,226 C 118,140 192,72 316,72 L 316,520 Z"
        fill="none" stroke="#8a6a2c" stroke-width="0.8" stroke-opacity="0.35"/>
  <path d="M 126,516 L 126,228 C 126,148 196,80 312,80 L 312,516 Z"
        fill="none" stroke="#d4a851" stroke-width="0.5" stroke-opacity="0.2"/>
  <line x1="104" y1="200" x2="330" y2="200" stroke="#8a6a2c" stroke-width="0.8" stroke-opacity="0.4"/>
  <line x1="108" y1="204" x2="326" y2="204" stroke="#d4a851" stroke-width="0.4" stroke-opacity="0.18"/>
  <line x1="104" y1="440" x2="330" y2="440" stroke="#8a6a2c" stroke-width="0.8" stroke-opacity="0.4"/>
  <line x1="108" y1="444" x2="326" y2="444" stroke="#d4a851" stroke-width="0.4" stroke-opacity="0.18"/>
  <g fill="none" stroke="#8a6a2c" stroke-opacity="0.3">
    <path d="M 148,200 C 148,158 188,114 250,100 L 250,130 C 202,140 172,168 172,200 Z" stroke-width="0.7"/>
    <path d="M 300,100 L 300,130" stroke-width="0.7"/>
  </g>
  <g fill="none" stroke="#b9913f" stroke-opacity="0.22" stroke-width="0.65">
    <path d="M 160,200 C 160,166 196,130 240,118"/>
    <path d="M 270,108 C 290,106 310,108 316,114"/>
    <path d="M 200,200 C 200,176 218,154 240,146"/>
    <path d="M 240,118 L 240,148"/>
  </g>
  <path d="M 116,510 L 116,450 L 122,450 L 122,510 Z" fill="#1a1410" fill-opacity="0.4"/>
  <path d="M 318,510 L 318,450 L 312,450 L 312,510 Z" fill="#1a1410" fill-opacity="0.4"/>
  <rect x="136" y="454" width="178" height="56" fill="none" rx="2"
        stroke="#8a6a2c" stroke-width="0.7" stroke-opacity="0.35"/>
  <g transform="translate(225,482)">
    <path d="M0,-12 L10,0 L0,12 L-10,0 Z" fill="none" stroke="#b9913f" stroke-width="0.7" stroke-opacity="0.35"/>
    <path d="M0,-6 L5,0 L0,6 L-5,0 Z"   fill="none" stroke="#d4a851" stroke-width="0.5" stroke-opacity="0.28"/>
  </g>
  <path d="M 195,456 C 199,468 197,480 200,490 C 202,498 199,505 202,510"
        fill="none" stroke="#060508" stroke-width="0.9" stroke-opacity="0.75" stroke-linecap="round"/>

  <!-- RIGHT LEAF PANEL DIVISIONS -->
  <path d="M 344,72 C 468,72 542,140 542,226 L 542,520 L 344,520 Z"
        fill="none" stroke="#8a6a2c" stroke-width="0.8" stroke-opacity="0.35"/>
  <path d="M 348,80 C 464,80 534,148 534,228 L 534,516 L 348,516 Z"
        fill="none" stroke="#d4a851" stroke-width="0.5" stroke-opacity="0.2"/>
  <line x1="330" y1="200" x2="556" y2="200" stroke="#8a6a2c" stroke-width="0.8" stroke-opacity="0.4"/>
  <line x1="334" y1="204" x2="552" y2="204" stroke="#d4a851" stroke-width="0.4" stroke-opacity="0.18"/>
  <line x1="330" y1="440" x2="556" y2="440" stroke="#8a6a2c" stroke-width="0.8" stroke-opacity="0.4"/>
  <line x1="334" y1="444" x2="552" y2="444" stroke="#d4a851" stroke-width="0.4" stroke-opacity="0.18"/>
  <g fill="none" stroke="#8a6a2c" stroke-opacity="0.3">
    <path d="M 380,200 C 380,168 410,140 450,130" stroke-width="0.7"/>
    <path d="M 512,200 C 512,158 472,114 410,100" stroke-width="0.7"/>
    <path d="M 360,100 L 360,130" stroke-width="0.7"/>
  </g>
  <g fill="none" stroke="#b9913f" stroke-opacity="0.22" stroke-width="0.65">
    <path d="M 500,200 C 500,166 464,130 420,118"/>
    <path d="M 350,108 C 370,106 380,108 390,114"/>
    <path d="M 460,200 C 460,176 442,154 420,146"/>
    <path d="M 420,118 L 420,148"/>
  </g>
  <path d="M 342,510 L 342,450 L 348,450 L 348,510 Z" fill="#1a1410" fill-opacity="0.4"/>
  <path d="M 544,510 L 544,450 L 538,450 L 538,510 Z" fill="#1a1410" fill-opacity="0.4"/>
  <rect x="346" y="454" width="178" height="56" fill="none" rx="2"
        stroke="#8a6a2c" stroke-width="0.7" stroke-opacity="0.35"/>
  <g transform="translate(435,482)">
    <path d="M0,-12 L10,0 L0,12 L-10,0 Z" fill="none" stroke="#b9913f" stroke-width="0.7" stroke-opacity="0.35"/>
    <path d="M0,-6 L5,0 L0,6 L-5,0 Z"   fill="none" stroke="#d4a851" stroke-width="0.5" stroke-opacity="0.28"/>
  </g>
  <path d="M 465,456 C 461,468 463,480 460,490 C 458,498 461,505 458,510"
        fill="none" stroke="#060508" stroke-width="0.9" stroke-opacity="0.75" stroke-linecap="round"/>

  <!-- WARD BAND (where seals sit) -->
  <rect x="104" y="204" width="226" height="236" fill="none"
        stroke="#8a6a2c" stroke-width="1" stroke-opacity="0.28"/>
  <rect x="330" y="204" width="226" height="236" fill="none"
        stroke="#8a6a2c" stroke-width="1" stroke-opacity="0.28"/>
  <line x1="104" y1="210" x2="330" y2="210" stroke="#d4a851" stroke-opacity="0.14" stroke-width="0.6"/>
  <line x1="104" y1="434" x2="330" y2="434" stroke="#d4a851" stroke-opacity="0.14" stroke-width="0.6"/>
  <line x1="330" y1="210" x2="556" y2="210" stroke="#d4a851" stroke-opacity="0.14" stroke-width="0.6"/>
  <line x1="330" y1="434" x2="556" y2="434" stroke="#d4a851" stroke-opacity="0.14" stroke-width="0.6"/>

  <!-- WARD BAND CORNER BOSSES — left leaf -->
  <g fill="#d4a851" fill-opacity="0.55">
    <circle cx="116" cy="212" r="3.5"/><circle cx="116" cy="212" r="2" fill="#8a6a2c" fill-opacity="0.6"/>
    <circle cx="322" cy="212" r="3.5"/><circle cx="322" cy="212" r="2" fill="#8a6a2c" fill-opacity="0.6"/>
    <circle cx="116" cy="432" r="3.5"/><circle cx="116" cy="432" r="2" fill="#8a6a2c" fill-opacity="0.6"/>
    <circle cx="322" cy="432" r="3.5"/><circle cx="322" cy="432" r="2" fill="#8a6a2c" fill-opacity="0.6"/>
  </g>
  <!-- WARD BAND CORNER BOSSES — right leaf -->
  <g fill="#d4a851" fill-opacity="0.55">
    <circle cx="338" cy="212" r="3.5"/><circle cx="338" cy="212" r="2" fill="#8a6a2c" fill-opacity="0.6"/>
    <circle cx="544" cy="212" r="3.5"/><circle cx="544" cy="212" r="2" fill="#8a6a2c" fill-opacity="0.6"/>
    <circle cx="338" cy="432" r="3.5"/><circle cx="338" cy="432" r="2" fill="#8a6a2c" fill-opacity="0.6"/>
    <circle cx="544" cy="432" r="3.5"/><circle cx="544" cy="432" r="2" fill="#8a6a2c" fill-opacity="0.6"/>
  </g>
  <!-- boss seam glow -->
  <circle cx="322" cy="212" r="6" fill="#d4a851" opacity="0.12" filter="url(#boss-glow)"/>
  <circle cx="338" cy="212" r="6" fill="#d4a851" opacity="0.12" filter="url(#boss-glow)"/>
  <circle cx="322" cy="432" r="6" fill="#d4a851" opacity="0.12" filter="url(#boss-glow)"/>
  <circle cx="338" cy="432" r="6" fill="#d4a851" opacity="0.12" filter="url(#boss-glow)"/>

  <!-- WEATHERED CRACKS -->
  <path d="M 188,92 C 192,130 185,175 190,215" fill="none" stroke="#060508" stroke-width="1.2" stroke-opacity="0.82" stroke-linecap="round"/>
  <path d="M 190,215 C 193,240 188,265 191,290" fill="none" stroke="#060508" stroke-width="0.9" stroke-opacity="0.6" stroke-linecap="round"/>
  <path d="M 154,300 C 157,318 154,336 156,352" fill="none" stroke="#06050a" stroke-width="0.8" stroke-opacity="0.6" stroke-linecap="round"/>
  <path d="M 472,92 C 468,130 475,175 470,215" fill="none" stroke="#060508" stroke-width="1.2" stroke-opacity="0.82" stroke-linecap="round"/>
  <path d="M 470,215 C 467,240 472,265 469,290" fill="none" stroke="#060508" stroke-width="0.9" stroke-opacity="0.6" stroke-linecap="round"/>
  <path d="M 506,300 C 503,318 506,336 504,352" fill="none" stroke="#06050a" stroke-width="0.8" stroke-opacity="0.6" stroke-linecap="round"/>

  <!-- CATCH-LIGHTS -->
  <path d="M 116,70 C 150,62 195,68 220,88" fill="none" stroke="rgba(247,232,184,0.10)" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M 440,88 C 465,68 510,62 544,70" fill="none" stroke="rgba(247,232,184,0.10)" stroke-width="1.6" stroke-linecap="round"/>

  <!-- CENTRAL SEAM -->
  <rect x="326" y="56" width="8" height="470" fill="#d4a851" fill-opacity="0.06" filter="url(#seam-glow)"/>
  <line x1="330" y1="56" x2="330" y2="526" stroke="#000" stroke-width="2.5" stroke-opacity="0.9"/>
  <line x1="330" y1="60" x2="330" y2="522" stroke="#f1d27a" stroke-width="0.7" stroke-opacity="0.28"/>
  <rect x="328" y="240" width="4" height="160" fill="#f1c85a" fill-opacity="0.18" filter="url(#seam-glow)"/>

  <!-- DOOR SILL -->
  <rect x="88" y="524" width="484" height="12" fill="url(#jamb-stone)" rx="1"/>
  <line x1="88" y1="524" x2="572" y2="524" stroke="#d4a851" stroke-width="0.8" stroke-opacity="0.35"/>
  <line x1="88" y1="535" x2="572" y2="535" stroke="#000" stroke-opacity="0.6" stroke-width="1.5"/>
  <rect x="96" y="527" width="468" height="6" fill="none" stroke="#8a6a2c" stroke-width="0.6" stroke-opacity="0.3" rx="1"/>

  <!-- OUTER ARCH BORDER -->
  <path d="M 86,526 L 86,218 C 86,100 196,32 330,32 C 464,32 574,100 574,218 L 574,526"
        fill="none" stroke="#8a6a2c" stroke-width="1.2" stroke-opacity="0.4"/>
  <ellipse cx="330" cy="32" rx="60" ry="24" fill="url(#arch-glow)"/>
</svg>
`;
