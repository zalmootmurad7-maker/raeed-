import React from "react";
import { AbsoluteFill } from "remotion";
import { C, OUT, OW, Svg, rnd } from "./kit";

// WORLD A — the ocean: electric blue / deep navy / turquoise / cyan / coral.
export const OceanWater: React.FC<{ t?: number; dark?: boolean }> = ({ t = 0, dark }) => (
  <>
    <AbsoluteFill style={{ background: dark ? "linear-gradient(180deg, #0B4C86 0%, #06203F 45%, #020A18 100%)" : "linear-gradient(180deg, #1E9BFF 0%, #0E5DAA 35%, #0A2E5C 70%, #061833 100%)" }} />
    <Svg>
      <defs>
        <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF" stopOpacity={dark ? 0.14 : 0.32} /><stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" /></linearGradient>
      </defs>
      {[0, 1, 2, 3, 4, 5].map((i) => { const x = 140 + i * 330 + 40 * Math.sin(t * 0.4 + i); return <polygon key={i} points={`${x},-20 ${x + 110},-20 ${x + 360},1080 ${x + 120},1080`} fill="url(#ray)" />; })}
      {Array.from({ length: 70 }, (_, i) => <circle key={i} cx={rnd(i, 1) * 1920} cy={(rnd(i, 2) * 1080 - t * 18 * (0.3 + rnd(i, 3))) % 1080 + (rnd(i, 2) * 1080 - t * 18 * (0.3 + rnd(i, 3)) < 0 ? 1080 : 0)} r={1.5 + rnd(i, 4) * 2.5} fill={C.cyan} opacity={0.25 + 0.4 * rnd(i, 5)} />)}
    </Svg>
  </>
);
export const Bubbles: React.FC<{ t: number; n?: number; x0?: number; x1?: number }> = ({ t, n = 26, x0 = 0, x1 = 1920 }) => (
  <Svg>{Array.from({ length: n }, (_, i) => { const sp = 40 + rnd(i, 7) * 80, y = 1100 - ((t * sp + rnd(i, 8) * 1200) % 1200), x = x0 + rnd(i, 9) * (x1 - x0) + 14 * Math.sin(t * 2 + i), r = 5 + rnd(i, 6) * 12; return <g key={i}><circle cx={x} cy={y} r={r} fill="rgba(180,240,255,0.18)" stroke="#BFF6FF" strokeWidth={2.5} /><circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.28} fill="#FFF" opacity={0.8} /></g>; })}</Svg>
);
/** distant hazy silhouettes of domes and towers */
export const FarCity: React.FC<{ y?: number }> = ({ y = 700 }) => (
  <Svg>
    {[[180, 170], [470, 120], [1500, 150], [1760, 110]].map(([x, r], i) => <ellipse key={i} cx={x} cy={y} rx={r} ry={r * 0.85} fill="#0F4D86" opacity={0.55} />)}
    {[[300, 220], [360, 160], [1620, 240], [1680, 180]].map(([x, h], i) => <rect key={i} x={x} y={y - h} width={34} height={h} rx={10} fill="#0F4D86" opacity={0.55} />)}
  </Svg>
);
/** seabed with rocks */
export const Seabed: React.FC<{ y?: number }> = ({ y = 860 }) => (
  <Svg>
    <path d={`M -20 ${y} C 300 ${y - 40} 520 ${y + 30} 860 ${y - 10} C 1180 ${y - 50} 1500 ${y + 20} 1940 ${y - 20} L 1940 1100 L -20 1100 Z`} fill="#123A5E" stroke={OUT} strokeWidth={OW} />
    <path d={`M -20 ${y + 70} C 400 ${y + 40} 900 ${y + 100} 1940 ${y + 60} L 1940 1100 L -20 1100 Z`} fill="#0D2B47" />
    {[[260, y + 10, 60], [1180, y - 20, 80], [1700, y + 4, 50]].map(([x, yy, r], i) => <path key={i} d={`M ${x - r} ${yy + 20} Q ${x - r * 0.8} ${yy - r * 0.6} ${x} ${yy - r * 0.7} Q ${x + r * 0.9} ${yy - r * 0.5} ${x + r} ${yy + 20} Z`} fill="#1C4E78" stroke={OUT} strokeWidth={OW - 1} />)}
  </Svg>
);
/** transparent dome with glowing buildings inside */
export const Dome: React.FC<{ cx: number; by: number; rx: number; ry: number; seed?: number; t?: number }> = ({ cx, by, rx, ry, seed = 1, t = 0 }) => {
  const id = `dome${seed}`;
  const n = Math.round(rx / 55);
  return (
    <Svg>
      <defs>
        <clipPath id={id}><ellipse cx={cx} cy={by} rx={rx - 4} ry={ry - 4} /></clipPath>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3FC7FF" /><stop offset="100%" stopColor="#0B4F8F" /></linearGradient>
      </defs>
      <ellipse cx={cx} cy={by} rx={rx + 26} ry={ry + 26} fill={C.cyan} opacity={0.12} />
      <g clipPath={`url(#${id})`}>
        <rect x={cx - rx} y={by - ry} width={rx * 2} height={ry} fill="rgba(90,210,255,0.16)" />
        {Array.from({ length: n }, (_, i) => {
          const w = 40 + rnd(i + seed * 7, 1) * 60, h = ry * (0.35 + rnd(i + seed * 7, 2) * 0.55), x = cx - rx + 30 + (i / n) * (rx * 2 - 60);
          return <g key={i}>
            <rect x={x} y={by - h} width={w} height={h} rx={14} fill={`url(#${id}b)`} stroke={OUT} strokeWidth={4} />
            {Array.from({ length: Math.floor(h / 34) }, (_, j) => [0, 1].map((c) => <rect key={`${j}${c}`} x={x + 9 + c * (w / 2 - 4)} y={by - h + 14 + j * 34} width={w / 2 - 14} height={14} rx={4} fill={(i + j + c) % 3 ? C.cyan : C.gold} opacity={0.6 + 0.4 * Math.sin(t * 2 + i + j)} />))}
            <circle cx={x + w / 2} cy={by - h - 10} r={8} fill={C.cyan} stroke={OUT} strokeWidth={3} />
          </g>;
        })}
        <rect x={cx - rx} y={by - 40} width={rx * 2} height={40} fill="#0E3A63" />
      </g>
      <path d={`M ${cx - rx} ${by} A ${rx} ${ry} 0 0 1 ${cx + rx} ${by}`} fill="rgba(140,230,255,0.10)" stroke={OUT} strokeWidth={OW} />
      <path d={`M ${cx - rx * 0.78} ${by - ry * 0.45} A ${rx * 0.82} ${ry * 0.82} 0 0 1 ${cx - rx * 0.2} ${by - ry * 0.9}`} fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" opacity={0.65} />
      {[0.25, 0.5, 0.75].map((k, i) => <path key={i} d={`M ${cx - rx + rx * 2 * k} ${by} Q ${cx - rx + rx * 2 * k + (k - 0.5) * rx * 0.4} ${by - ry * 0.95} ${cx} ${by - ry}`} fill="none" stroke="#9BE7FF" strokeWidth={3} opacity={0.5} />)}
      <rect x={cx - rx - 20} y={by - 6} width={rx * 2 + 40} height={30} rx={10} fill="#5B6B80" stroke={OUT} strokeWidth={OW} />
      {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={cx - rx + (i + 0.5) * (rx * 2) / 8} cy={by + 9} r={6} fill={C.cyan} />)}
    </Svg>
  );
};
/** horizontal glass tube between two points */
export const Tube: React.FC<{ x1: number; x2: number; y: number; r: number }> = ({ x1, x2, y, r }) => (
  <Svg>
    <rect x={x1} y={y - r} width={x2 - x1} height={r * 2} rx={r} fill="rgba(140,230,255,0.18)" stroke={OUT} strokeWidth={OW} />
    <line x1={x1 + r} y1={y - r * 0.55} x2={x2 - r} y2={y - r * 0.55} stroke="#FFF" strokeWidth={6} strokeLinecap="round" opacity={0.6} />
    {Array.from({ length: Math.floor((x2 - x1) / 90) }, (_, i) => <line key={i} x1={x1 + 50 + i * 90} y1={y - r} x2={x1 + 50 + i * 90} y2={y + r} stroke="#7FD8F5" strokeWidth={3} opacity={0.6} />)}
  </Svg>
);
/** coral cluster */
export const Coral: React.FC<{ x: number; y: number; s: number; color?: string; seed?: number }> = ({ x, y, s, color = C.coral, seed = 1 }) => (
  <Svg>
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[-50, -20, 10, 40].map((dx, i) => <path key={i} d={`M ${dx} 0 C ${dx - 10} -40 ${dx + 20 * (rnd(i, seed) - 0.5)} -70 ${dx + 6} -${100 + 50 * rnd(i, seed + 1)} M ${dx + 2} -50 C ${dx + 20} -60 ${dx + 26} -80 ${dx + 30} -95`} fill="none" stroke={OUT} strokeWidth={24} strokeLinecap="round" />)}
      {[-50, -20, 10, 40].map((dx, i) => <path key={i} d={`M ${dx} 0 C ${dx - 10} -40 ${dx + 20 * (rnd(i, seed) - 0.5)} -70 ${dx + 6} -${100 + 50 * rnd(i, seed + 1)} M ${dx + 2} -50 C ${dx + 20} -60 ${dx + 26} -80 ${dx + 30} -95`} fill="none" stroke={color} strokeWidth={13} strokeLinecap="round" />)}
    </g>
  </Svg>
);
export const SeaFan: React.FC<{ x: number; y: number; s: number; color?: string }> = ({ x, y, s, color = "#C77DFF" }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M 0 0 C -90 -40 -110 -150 -40 -190 C 0 -210 40 -210 70 -180 C 130 -120 90 -30 0 0 Z" fill={color} stroke={OUT} strokeWidth={OW} />
    {[-60, -30, 0, 30, 60].map((a, i) => <line key={i} x1={0} y1={0} x2={a * 1.2} y2={-170 + Math.abs(a) * 0.5} stroke={OUT} strokeWidth={3} opacity={0.6} />)}
  </g></Svg>
);
export const Kelp: React.FC<{ x: number; y: number; h: number; t: number; color?: string; seed?: number }> = ({ x, y, h, t, color = "#18C29C", seed = 1 }) => {
  const sw = 26 * Math.sin(t * 1.1 + seed);
  return <Svg><path d={`M ${x} ${y} C ${x + sw} ${y - h * 0.35} ${x - sw} ${y - h * 0.65} ${x + sw * 0.8} ${y - h}`} fill="none" stroke={OUT} strokeWidth={26} strokeLinecap="round" /><path d={`M ${x} ${y} C ${x + sw} ${y - h * 0.35} ${x - sw} ${y - h * 0.65} ${x + sw * 0.8} ${y - h}`} fill="none" stroke={color} strokeWidth={14} strokeLinecap="round" /></Svg>;
};
/** bioluminescent plant: stems with glowing bulbs */
export const GlowPlant: React.FC<{ x: number; y: number; s: number; t: number; seed?: number }> = ({ x, y, s, t, seed = 1 }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s})`}>
    {[-30, 0, 28].map((dx, i) => { const h = 90 + 50 * rnd(i, seed); const bx = dx + 10 * Math.sin(t + i), glow = 0.6 + 0.4 * Math.sin(t * 2.5 + i + seed); return <g key={i}><path d={`M ${dx} 0 Q ${dx - 8} ${-h / 2} ${bx} ${-h}`} fill="none" stroke={OUT} strokeWidth={10} /><path d={`M ${dx} 0 Q ${dx - 8} ${-h / 2} ${bx} ${-h}`} fill="none" stroke="#14B8A6" strokeWidth={5} /><circle cx={bx} cy={-h} r={26} fill={C.cyan} opacity={0.25 * glow} /><circle cx={bx} cy={-h} r={13} fill="#B6FFF9" stroke={OUT} strokeWidth={4} /></g>; })}
  </g></Svg>
);
/** comic fish facing right (flip with s<0) */
export const Fish: React.FC<{ x: number; y: number; s: number; color: string; stripe?: string }> = ({ x, y, s, color, stripe = "#FFFFFF" }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s} ${Math.abs(s)})`}>
    <path d="M -60 0 L -95 -28 L -88 0 L -95 28 Z" fill={color} stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
    <ellipse cx={0} cy={0} rx={62} ry={34} fill={color} stroke={OUT} strokeWidth={5} />
    <path d="M -10 -32 Q 0 0 -10 32" fill="none" stroke={stripe} strokeWidth={9} />
    <circle cx={34} cy={-8} r={9} fill="#FFF" stroke={OUT} strokeWidth={3} /><circle cx={37} cy={-8} r={4} fill={OUT} />
  </g></Svg>
);
/** giant deep-sea creature silhouette with a glowing eye (not graphic) */
export const DeepCreature: React.FC<{ x: number; y: number; s: number; eye?: number }> = ({ x, y, s, eye = 1 }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M -520 30 C -380 -150 -60 -170 160 -90 C 300 -40 420 -60 520 -150 C 500 -40 520 60 560 140 C 440 70 320 70 180 110 C -40 170 -360 170 -520 30 Z" fill="#0B2A4A" stroke="#1F5F96" strokeWidth={6} />
    <path d="M -470 40 C -330 120 -60 130 170 80" fill="none" stroke="#06182C" strokeWidth={10} opacity={0.7} />
    <path d="M -520 30 L -470 50 L -440 25 L -410 55 L -380 30 L -350 60" fill="none" stroke="#DDEFFF" strokeWidth={6} strokeLinejoin="round" />
    <path d="M -300 -110 L -260 -210 L -210 -120 Z M -120 -140 L -70 -250 L -20 -150 Z" fill="#0B2A4A" stroke="#1F5F96" strokeWidth={5} />
    <circle cx={-380} cy={-40} r={46} fill="#FFDD55" opacity={0.22 * eye} /><circle cx={-380} cy={-40} r={20} fill="#FFE97A" stroke="#06182C" strokeWidth={4} opacity={eye} /><ellipse cx={-380} cy={-40} rx={5} ry={14} fill="#06182C" />
  </g></Svg>
);
