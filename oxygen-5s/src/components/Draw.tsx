import React from "react";
import { C, FONT } from "../lib/core";
import { INK, Svg } from "./Prims";

// Flat vector props for the oxygen episode: thick #141824 ink, flat colours, no jitter.
type P = { x: number; y: number; s: number; t?: number; o?: number; rot?: number };
const G: React.FC<P & { children: React.ReactNode }> = ({ x, y, s, children, o = 1, rot = 0 }) => (
  <Svg style={{ opacity: o }}><g transform={`translate(${x} ${y}) scale(${s / 100}) rotate(${rot})`}>{children}</g></Svg>
);

/** a labelled atom (O = red). k = pop scale */
export const At: React.FC<{ x: number; y: number; r: number; label?: string; fill?: string; text?: string; k?: number; stroke?: string; o?: number }> = ({ x, y, r, label = "O", fill = C.red, text = "#FFF", k = 1, stroke = INK, o = 1 }) =>
  k <= 0.001 ? null : (
    <Svg style={{ opacity: o }}><g transform={`translate(${x} ${y}) scale(${k})`}>
      <circle r={r} fill={fill} stroke={stroke} strokeWidth={Math.max(3, r * 0.12)} />
      {label ? <text y={r * 0.36} textAnchor="middle" fontFamily={FONT.head} fontWeight={700} fontSize={r * 1.0} fill={text}>{label}</text> : null}
    </g></Svg>
  );

export const Car: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -92 14 L -74 -18 L -32 -40 L 30 -40 L 62 -18 L 92 -12 L 94 22 L -94 22 Z" fill={C.red} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <path d="M -54 -18 L -30 -33 L -2 -33 L -2 -18 Z M 8 -18 L 8 -33 L 28 -33 L 50 -18 Z" fill="#DBEAFE" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    {[-52, 54].map((cx) => <g key={cx}><circle cx={cx} cy="24" r="19" fill={INK} /><circle cx={cx} cy="24" r="7" fill="#CBD5E1" /></g>)}
  </G>
);
export const Jet: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -14 -12 L -46 -72 L -24 -72 L 34 -12 Z" fill="#94A3B8" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d="M -82 -14 L -104 -54 L -88 -54 L -60 -14 Z" fill="#94A3B8" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    <path d="M -104 0 Q -104 -16 -84 -16 L 70 -16 Q 102 -14 114 0 Q 102 14 70 16 L -84 16 Q -104 16 -104 0 Z" fill="#F1F5F9" stroke={INK} strokeWidth="6" />
    <path d="M -14 12 L -46 62 L -24 62 L 34 12 Z" fill="#94A3B8" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
    {[-50, -30, -10, 10, 30, 50].map((cx) => <circle key={cx} cx={cx} cy="-3" r="4" fill={C.blue} />)}
  </G>
);
export const Furnace: React.FC<P> = (p) => (
  <G {...p}>
    <rect x="-16" y="-124" width="32" height="50" fill="#94A3B8" stroke={INK} strokeWidth="5" />
    <rect x="-64" y="-80" width="128" height="150" rx="10" fill="#64748B" stroke={INK} strokeWidth="6" />
    <rect x="-44" y="-8" width="88" height="62" rx="6" fill="#1E293B" stroke={INK} strokeWidth="5" />
    {[-30, -10, 10, 30].map((xx) => <line key={xx} x1={xx} y1="-60" x2={xx} y2="-28" stroke="#475569" strokeWidth="6" strokeLinecap="round" />)}
  </G>
);
export const Flame: React.FC<P & { k: number }> = ({ x, y, s, t = 0, k }) =>
  k <= 0.01 ? null : (
    <G x={x} y={y} s={s * k}>
      <path d={`M 0 40 C -40 40 -46 8 -30 -16 C -24 0 -14 0 -12 -10 C -14 -40 0 -54 ${4 + 5 * Math.sin(t * 7)} -72 C 10 -44 40 -24 34 14 C 30 36 16 40 0 40 Z`} fill={C.amber} stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <path d={`M 0 34 C -16 34 -18 14 -8 2 C -2 12 4 8 ${2 + 3 * Math.sin(t * 9)} -14 C 12 0 18 14 14 24 C 10 32 6 34 0 34 Z`} fill={C.red} />
    </G>
  );
export const Lungs: React.FC<P> = ({ x, y, s, t = 0 }) => {
  const b = 1 + 0.035 * Math.sin(t * 2.2);
  return (
    <G x={x} y={y} s={s}>
      <rect x="-12" y="-150" width="24" height="90" rx="10" fill="#E2E8F0" stroke={INK} strokeWidth="6" />
      <path d="M 0 -64 L -36 -30 M 0 -64 L 36 -30" stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <g transform={`scale(${b})`}>
        <path d="M -22 -50 C -70 -74 -132 -26 -132 52 C -132 120 -74 136 -36 112 C -24 70 -22 10 -22 -50 Z" fill="#FCA5A5" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d="M 22 -50 C 70 -74 132 -26 132 52 C 132 120 74 136 36 112 C 24 70 22 10 22 -50 Z" fill="#FCA5A5" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
      </g>
    </G>
  );
};
export const SparkPlug: React.FC<P & { spark: number }> = ({ spark, ...p }) => (
  <G {...p}>
    <rect x="-14" y="-140" width="28" height="42" rx="4" fill="#CBD5E1" stroke={INK} strokeWidth="5" />
    <rect x="-30" y="-100" width="60" height="96" rx="12" fill="#F8FAFC" stroke={INK} strokeWidth="6" />
    <path d="M -40 -4 L 40 -4 L 40 30 L -40 30 Z" fill="#94A3B8" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
    <rect x="-22" y="30" width="44" height="48" fill="#CBD5E1" stroke={INK} strokeWidth="5" />
    {[42, 54, 66].map((yy) => <line key={yy} x1="-22" y1={yy} x2="22" y2={yy - 6} stroke={INK} strokeWidth="4" />)}
    <path d="M 0 78 L 0 98 M -4 108 L 26 108 L 26 88" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    {spark > 0 ? <path d="M 4 100 L 14 94 L 8 104 L 20 98" fill="none" stroke={C.amber} strokeWidth="5" opacity={spark} /> : null}
  </G>
);
export const Bolt: React.FC<P> = (p) => (
  <G {...p}><path d="M 18 -100 L -46 10 L -4 10 L -24 100 L 50 -16 L 8 -16 L 34 -100 Z" fill="#FDE047" stroke={INK} strokeWidth="7" strokeLinejoin="round" /></G>
);
export const HotPlate: React.FC<P> = ({ t = 0, ...p }) => (
  <G {...p}>
    {[-40, 0, 40].map((xx, i) => <path key={xx} d={`M ${xx} -30 C ${xx - 14} -50 ${xx + 14} -64 ${xx} ${-84 - 6 * Math.sin(t * 4 + i)}`} fill="none" stroke={C.red} strokeWidth="6" strokeLinecap="round" opacity="0.8" />)}
    <rect x="-90" y="-20" width="180" height="44" rx="8" fill="#F97316" stroke={INK} strokeWidth="6" />
    <rect x="-70" y="-10" width="140" height="10" rx="5" fill="#FDE68A" />
  </G>
);
export const Molten: React.FC<P> = ({ t = 0, ...p }) => (
  <G {...p}>
    {[[-50, 20, 34], [10, -6, 44], [60, 26, 28], [-10, 40, 22]].map(([cx, cy, rr], i) => (
      <g key={i}><circle cx={cx} cy={cy - 3 * Math.sin(t * 2 + i)} r={rr} fill="#7C2D12" stroke={INK} strokeWidth="6" /><circle cx={cx - rr * 0.2} cy={cy - rr * 0.2 - 3 * Math.sin(t * 2 + i)} r={rr * 0.5} fill="#FB923C" /></g>
    ))}
  </G>
);
/** cut-away Earth: crust (thin, red), mantle, outer + inner core */
export const EarthCut: React.FC<{ cx: number; cy: number; R: number; k: number }> = ({ cx, cy, R, k }) => {
  const a0 = -Math.PI / 2, a1 = a0 + (Math.PI / 2) * k;
  const wedge = (rr: number) => `M 0 0 L ${Math.cos(a0) * rr} ${Math.sin(a0) * rr} A ${rr} ${rr} 0 0 1 ${Math.cos(a1) * rr} ${Math.sin(a1) * rr} Z`;
  return (
    <Svg><g transform={`translate(${cx} ${cy})`}>
      <circle r={R} fill={C.blue} stroke={INK} strokeWidth="8" />
      <path d={`M ${-R * 0.5} ${-R * 0.55} C ${-R * 0.2} ${-R * 0.75} ${R * 0.05} ${-R * 0.3} ${-R * 0.25} ${-R * 0.05} C ${-R * 0.5} ${R * 0.1} ${-R * 0.75} ${-R * 0.2} ${-R * 0.5} ${-R * 0.55} Z M ${-R * 0.6} ${R * 0.35} C ${-R * 0.3} ${R * 0.25} ${-R * 0.1} ${R * 0.6} ${-R * 0.35} ${R * 0.7} C ${-R * 0.6} ${R * 0.7} ${-R * 0.8} ${R * 0.5} ${-R * 0.6} ${R * 0.35} Z`} fill={C.green} stroke={INK} strokeWidth="6" />
      {k > 0.01 ? <>
        <path d={wedge(R)} fill={C.red} stroke={INK} strokeWidth="6" strokeLinejoin="round" />
        <path d={wedge(R * 0.93)} fill="#EA580C" />
        <path d={wedge(R * 0.55)} fill={C.amber} />
        <path d={wedge(R * 0.25)} fill="#FDE68A" stroke={INK} strokeWidth="4" />
      </> : null}
    </g></Svg>
  );
};
/** SiO4 unit: silicon in the middle, four oxygens */
export const SiO4: React.FC<{ x: number; y: number; s: number; k: number }> = ({ x, y, s, k }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${(s / 100) * k})`}>
    {[[0, -120], [120, 0], [0, 120], [-120, 0]].map(([dx, dy], i) => <line key={i} x1="0" y1="0" x2={dx} y2={dy} stroke={INK} strokeWidth="12" />)}
    {[[0, -120], [120, 0], [0, 120], [-120, 0]].map(([dx, dy], i) => <g key={i} transform={`translate(${dx} ${dy})`}><circle r="46" fill={C.red} stroke={INK} strokeWidth="6" /><text y="17" textAnchor="middle" fontFamily={FONT.head} fontWeight={700} fontSize="48" fill="#FFF">O</text></g>)}
    <circle r="54" fill={C.blue} stroke={INK} strokeWidth="6" /><text y="18" textAnchor="middle" fontFamily={FONT.head} fontWeight={700} fontSize="48" fill="#FFF">Si</text>
  </g></Svg>
);
/** concrete block: grey binder with stones + red oxygen dots */
export const Concrete: React.FC<{ x: number; y: number; w: number; h: number; dots?: number }> = ({ x, y, w, h, dots = 1 }) => (
  <Svg><g transform={`translate(${x} ${y})`}>
    <rect width={w} height={h} rx="14" fill="#A8A29E" stroke={INK} strokeWidth="7" />
    {Array.from({ length: 16 }, (_, i) => { const q = (n: number) => { const v = Math.sin((i + 1) * 12.9898 * n) * 43758.5453; return v - Math.floor(v); }; return <ellipse key={i} cx={30 + q(1) * (w - 60)} cy={30 + q(2) * (h - 60)} rx={12 + q(3) * 16} ry={9 + q(4) * 10} fill="#78716C" stroke={INK} strokeWidth="4" />; })}
    {Array.from({ length: 22 }, (_, i) => { const q = (n: number) => { const v = Math.sin((i + 7) * 78.233 * n) * 43758.5453; return v - Math.floor(v); }; return <circle key={i} cx={20 + q(1) * (w - 40)} cy={20 + q(2) * (h - 40)} r="7" fill={C.red} opacity={dots} />; })}
  </g></Svg>
);
/** a bridge (deck + arch + piers) */
export const Bridge: React.FC<P> = (p) => (
  <G {...p}>
    <path d="M -200 0 Q 0 -130 200 0" fill="none" stroke="#64748B" strokeWidth="14" />
    {[-120, -60, 0, 60, 120].map((xx) => <line key={xx} x1={xx} y1={-xx * xx / 310 - 2} x2={xx} y2="-40" stroke="#64748B" strokeWidth="6" />)}
    <rect x="-230" y="-48" width="460" height="22" fill="#94A3B8" stroke={INK} strokeWidth="6" />
    <rect x="-210" y="-26" width="30" height="90" fill="#94A3B8" stroke={INK} strokeWidth="6" /><rect x="180" y="-26" width="30" height="90" fill="#94A3B8" stroke={INK} strokeWidth="6" />
  </G>
);
/** isometric cube of side a */
export const Cube: React.FC<{ x: number; y: number; a: number; fill?: string; stroke?: string; sw?: number }> = ({ x, y, a, fill = "#BFDBFE", stroke = INK, sw = 6 }) => {
  const d = a * 0.45;
  return (
    <Svg><g transform={`translate(${x} ${y})`} strokeLinejoin="round">
      <rect x={0} y={-a} width={a} height={a} fill={fill} stroke={stroke} strokeWidth={sw} />
      <path d={`M 0 ${-a} L ${d} ${-a - d} L ${a + d} ${-a - d} L ${a} ${-a} Z`} fill="#DBEAFE" stroke={stroke} strokeWidth={sw} />
      <path d={`M ${a} 0 L ${a + d} ${-d} L ${a + d} ${-a - d} L ${a} ${-a} Z`} fill="#93C5FD" stroke={stroke} strokeWidth={sw} />
    </g></Svg>
  );
};
/** old-school mountain with snow cap; returns peak via props */
export const Mountain: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <Svg><g transform={`translate(${x} ${y})`}>
    <path d={`M 0 0 L ${w * 0.3} ${-h * 0.55} L ${w * 0.42} ${-h * 0.4} L ${w * 0.62} ${-h} L ${w} 0 Z`} fill="#CBD5E1" stroke={INK} strokeWidth="8" strokeLinejoin="round" />
    <path d={`M ${w * 0.54} ${-h * 0.8} L ${w * 0.62} ${-h} L ${w * 0.71} ${-h * 0.8} L ${w * 0.66} ${-h * 0.84} L ${w * 0.62} ${-h * 0.77} L ${w * 0.58} ${-h * 0.84} Z`} fill="#FFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
  </g></Svg>
);
