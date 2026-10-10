import React from 'react';

// Airy climbing-pea vines: thin stems, small paired leaflets, curls and buds.
// The SVG is deliberately translucent and contains no shadows or filters.
const shoots = [
  { x: 47, y: 591, flip: false, delay: 0 },
  { x: 67, y: 510, flip: true, delay: 1 },
  { x: 82, y: 423, flip: false, delay: 2 },
  { x: 93, y: 350, flip: true, delay: 3 },
  { x: 118, y: 251, flip: false, delay: 1 },
  { x: 134, y: 171, flip: true, delay: 4 },
  { x: 148, y: 97, flip: false, delay: 2 },
];

function LeafPair({ x, y, flip, delay }) {
  return (
    <g transform={'translate(' + x + ' ' + y + ')' + (flip ? ' scale(-1 1)' : '')}>
      <g className={'pea-sprig pea-sprig--' + delay}>
        <path className="pea-petiole" d="M0 0 Q-8 -12 -21 -18 M0 0 Q11 -13 25 -17"/>
        <path className="pea-leaflet" d="M-20 -17 C-30 -33 -47 -35 -47 -23 C-46 -11 -33 -11 -20 -17 Z"/>
        <path className="pea-leaflet" d="M24 -17 C32 -30 49 -35 50 -24 C51 -13 37 -11 24 -17 Z"/>
        <path className="pea-midrib" d="M-21 -17 L-43 -23 M25 -17 L47 -24"/>
        <path className="pea-tendril" d="M0 -1 Q2 -16 -2 -26 C-8 -38 2 -46 10 -41 C18 -36 12 -28 7 -32 C3 -34 6 -37 9 -36"/>
      </g>
    </g>
  );
}

function PeaPlant({ right = false }) {
  return (
    <svg
      className={'biosphere__botanical ' + (right ? 'biosphere__botanical--right' : 'biosphere__botanical--left')}
      viewBox="0 0 240 720"
      preserveAspectRatio="xMinYMax meet"
      focusable="false"
      aria-hidden="true"
    >
      <g className="pea-vine pea-vine--main">
        <path className="pea-stem" d="M29 720 C23 634 42 568 66 508 C88 450 74 397 93 342 C121 266 110 214 133 158 C142 129 144 103 151 58"/>
        {shoots.map((shoot, i) => <LeafPair {...shoot} key={i}/>)}
        <path className="pea-tendril pea-tendril--tip" d="M151 58 C163 45 157 32 147 35 C135 39 144 52 151 45 C155 41 150 38 148 41"/>
      </g>
      <g className="pea-vine pea-vine--small">
        <path className="pea-stem" d="M15 720 C10 641 35 587 40 523 Q47 455 33 393"/>
        <g transform="translate(41 539) scale(.78)">
          <g className="pea-sprig pea-sprig--3">
            <path className="pea-petiole" d="M0 0 Q-11 -13 -25 -17 M0 0 Q9 -14 23 -19"/>
            <path className="pea-leaflet" d="M-24 -16 C-34 -29 -49 -28 -47 -19 C-44 -7 -32 -8 -24 -16 Z"/>
            <path className="pea-leaflet" d="M22 -18 C33 -30 48 -30 47 -20 C47 -11 35 -9 22 -18 Z"/>
            <path className="pea-tendril" d="M0 0 Q1 -17 -6 -28 C-13 -38 -1 -43 4 -37 C9 -31 2 -29 0 -33"/>
          </g>
        </g>
        <g transform="translate(34 438) scale(.73)">
          <g className="pea-sprig pea-sprig--1">
            <path className="pea-petiole" d="M0 0 Q-12 -12 -22 -17 M0 0 Q10 -15 23 -18"/>
            <path className="pea-leaflet" d="M-21 -17 C-33 -32 -47 -30 -46 -18 C-44 -8 -31 -9 -21 -17 Z"/>
            <path className="pea-leaflet" d="M22 -17 C32 -30 49 -31 49 -21 C47 -9 34 -9 22 -17 Z"/>
            <path className="pea-tendril" d="M0 0 Q-4 -20 3 -32 C10 -41 20 -33 15 -27 C12 -24 7 -28 10 -30"/>
          </g>
        </g>
        <path className="pea-tendril pea-tendril--tip" d="M33 393 Q22 372 28 359 C34 349 44 355 39 362 C36 366 31 363 33 360"/>
      </g>
      <g className="pea-grass pea-grass--a">
        <path d="M4 720 Q-5 669 15 615 M4 720 Q33 654 49 627 M4 720 Q8 654 7 638"/>
      </g>
      <g className="pea-grass pea-grass--b">
        <path d="M117 720 Q104 657 123 623 M117 720 Q140 665 155 642 M117 720 Q116 685 112 665"/>
      </g>
      <circle className="pea-bud" cx="151" cy="57" r="2"/>
      <circle className="pea-bud" cx="34" cy="393" r="1.6"/>
    </svg>
  );
}

export default function BotanicalGarden() {
  return <><PeaPlant/><PeaPlant right/></>;
}
