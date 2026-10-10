import React from 'react';

// New forms: pointed willow leaves, rounded ginkgo leaves, heart-shaped
// shoots and soft grass, crossed with glowing cybernetic veins.
function Plant({ mirrored = false }) {
  const id = mirrored ? 'botanical-gradient-right' : 'botanical-gradient-left';
  const fill = { fill: 'url(#' + id + ')' };
  return <svg
    className={'biosphere__botanical ' + (mirrored ? 'biosphere__botanical--right' : 'biosphere__botanical--left')}
    viewBox="0 0 240 720" preserveAspectRatio="xMinYMax meet" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={id} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stopColor="#154936" stopOpacity="0.4"/>
        <stop offset=".55" stopColor="#67dca5" stopOpacity=".3"/>
        <stop offset="1" stopColor="#e0ffc2" stopOpacity=".6"/>
      </linearGradient>
    </defs>
    <g className="garden-stalk garden-stalk--tall">
      <path className="bio-stem" d="M29 718 C30 568 64 465 95 339 S124 156 133 31"/>
      <path className="bio-branch" d="M55 504 Q90 464 141 460 M79 399 Q45 364 20 348 M105 281 Q143 276 182 246 M125 146 Q92 126 68 96"/>
      <g className="garden-leaf garden-leaf--1">
        <path className="garden-leaf-fill" style={fill} d="M141 460 C147 417 192 395 222 407 C211 442 176 466 141 460 Z"/>
        <path className="garden-vein" d="M141 460 Q183 427 215 411 M176 433 l0 -13 M190 422 l9 8"/>
      </g>
      <g className="garden-leaf garden-leaf--2">
        <path className="garden-leaf-fill" style={fill} d="M20 348 C-3 323 -4 280 18 255 C43 282 48 318 20 348 Z"/>
        <path className="garden-vein" d="M20 348 Q20 292 18 262 M20 308 L7 295 M21 320 L35 298"/>
      </g>
      <g className="garden-leaf garden-leaf--3">
        <path className="garden-leaf-fill" style={fill} d="M182 246 C166 216 174 178 211 164 C227 202 217 231 182 246 Z"/>
        <path className="garden-vein" d="M182 246 Q207 214 208 173 M196 222 L186 203 M207 199 L218 194"/>
      </g>
      <g className="garden-leaf garden-leaf--4">
        <path className="garden-leaf-fill" style={fill} d="M68 96 C38 102 14 80 13 50 C43 44 67 62 68 96 Z"/>
        <path className="garden-vein" d="M68 96 L19 53 M47 80 L50 58"/>
      </g>
      <g className="garden-leaf garden-leaf--5">
        <path className="garden-leaf-fill" style={fill} d="M133 50 C117 16 129 -11 154 -22 C174 8 162 36 133 50 Z"/>
        <path className="garden-vein" d="M133 50 Q154 9 154 -13"/>
      </g>
      <path className="garden-circuit" d="M62 470 H24 V448 M105 294 H154 V274 M119 170 H171 V153"/>
      <circle className="garden-node" cx="24" cy="448" r="3"/>
      <circle className="garden-node" cx="154" cy="274" r="3"/>
      <circle className="garden-node" cx="171" cy="153" r="3"/>
    </g>
    <g className="garden-stalk garden-stalk--broad">
      <path className="bio-stem" d="M14 718 C11 605 33 531 63 486 Q87 440 92 388"/>
      <path className="bio-branch" d="M44 549 Q17 523 8 501 M59 492 Q95 479 119 464"/>
      <g className="garden-leaf garden-leaf--6">
        <path className="garden-leaf-fill" style={fill} d="M92 400 C64 370 71 344 91 341 C107 348 112 371 92 400 Z"/>
        <path className="garden-vein" d="M92 400 L92 349"/>
      </g>
      <g className="garden-leaf garden-leaf--7">
        <path className="garden-leaf-fill" style={fill} d="M119 464 C135 431 169 424 185 433 C178 463 147 475 119 464 Z"/>
        <path className="garden-vein" d="M119 464 L179 438"/>
      </g>
      <path className="garden-circuit" d="M37 560 H80 V543"/>
      <circle className="garden-node" cx="80" cy="543" r="3"/>
    </g>
    <g className="garden-grass garden-grass--left">
      <path className="bio-stem" d="M18 719 Q-10 645 16 599 M18 719 Q47 641 58 616 M18 719 Q14 663 37 579"/>
      <path className="garden-blade" d="M18 719 Q17 644 27 572 Q34 634 18 719 Z M18 719 Q39 652 82 634 Q49 682 18 719 Z"/>
    </g>
    <g className="garden-grass garden-grass--right">
      <path className="bio-stem" d="M127 719 Q97 651 108 611 M127 719 Q171 662 185 635 M127 719 Q128 644 145 581"/>
      <path className="garden-blade" d="M127 719 Q119 650 139 586 Q149 655 127 719 Z M127 719 Q168 663 201 650 Q172 688 127 719 Z"/>
    </g>
    <path className="garden-root" d="M0 719 H226"/>
  </svg>;
}
export default function BotanicalGarden() {
  return <><Plant/><Plant mirrored/></>;
}
