import React from "react";
import { ACCENT, LIGHT } from "../tokens";
import { useBoil } from "./boil";

// Hand-drawn ink props (never the character). All stepped-boil like Icons.
type P = { size: number; ink?: string; style?: React.CSSProperties; seed?: number; vbw?: number; vbh?: number };
const Svg: React.FC<P & { children: React.ReactNode }> = ({ size, style, seed = 3, vbw = 100, vbh = 100, children }) => {
  const b = useBoil(seed, 1.2, 0.5);
  return <svg viewBox={`0 0 ${vbw} ${vbh}`} width={size} height={(size * vbh) / vbw} style={{ overflow: "visible", translate: `${b.x}px ${b.y}px`, rotate: `${b.r}deg`, ...style }}>{children}</svg>;
};
const st = (c: string, w = 3.5) => ({ stroke: c, strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });
const I = (p: P) => p.ink ?? LIGHT.ink;

export const Earth: React.FC<P> = (p) => (
  <Svg {...p}><circle cx="50" cy="50" r="44" fill="#3B82F6" {...st(I(p))} /><path d="M28 30 q10 -8 18 2 q-4 10 -14 8 q-6 -2 -4 -10z M58 52 q12 -4 16 8 q-6 14 -18 6 q-4 -8 2 -14z M40 70 q8 4 4 12 q-8 0 -10 -6z" fill="#22C55E" {...st(I(p), 2.5)} /></Svg>
);
export const Sun: React.FC<P & { glow?: boolean }> = (p) => (
  <Svg {...p}>{p.glow !== false ? <circle cx="50" cy="50" r="48" fill={ACCENT.amber} opacity="0.25" /> : null}<circle cx="50" cy="50" r="36" fill="#FBBF24" {...st(I(p))} /></Svg>
);
export const Atmosphere: React.FC<P> = (p) => (
  <Svg {...p} vbh={40}><path d="M0 38 Q50 -10 100 38" fill="#BFDBFE" opacity="0.7" {...st(I(p), 2.5)} /></Svg>
);
export const LHCRing: React.FC<P> = (p) => (
  <Svg {...p}><circle cx="50" cy="50" r="40" fill="none" stroke={ACCENT.blue} strokeWidth="9" /><circle cx="50" cy="50" r="40" fill="none" {...st(I(p), 2.5)} /><circle cx="50" cy="10" r="6" fill={ACCENT.red} {...st(I(p), 2)} /><circle cx="86" cy="62" r="5" fill={I(p)} /><circle cx="18" cy="70" r="5" fill={I(p)} /></Svg>
);
export const SwissMap: React.FC<P> = (p) => (
  <Svg {...p} vbh={64}><path d="M6 30 L18 14 L34 18 L46 6 L62 12 L78 8 L94 22 L88 40 L70 46 L60 58 L40 52 L22 56 L10 46 Z" fill="#FDE68A" {...st(I(p))} /><path d="M46 26 h10 v-8 h8 v8 h10 v8 h-10 v8 h-8 v-8 h-10z" fill={ACCENT.red} /></Svg>
);
export const City: React.FC<P> = (p) => (
  <Svg {...p} vbh={50}>{[[0, 22, 14], [15, 10, 12], [28, 28, 16], [45, 4, 10], [56, 18, 14], [71, 30, 12], [84, 14, 16]].map(([x, y, w], i) => <rect key={i} x={x} y={y} width={w} height={50 - y} fill="#CBD5E1" {...st(I(p), 2.5)} />)}</Svg>
);
export const Car: React.FC<P> = (p) => (
  <Svg {...p} vbh={50}><path d="M8 34 L14 20 L36 18 L50 30 L72 32 L72 40 L8 40 Z" fill={ACCENT.red} {...st(I(p))} /><circle cx="22" cy="42" r="7" fill={I(p)} /><circle cx="60" cy="42" r="7" fill={I(p)} /></Svg>
);
export const Van: React.FC<P & { dashed?: boolean }> = (p) => (
  <Svg {...p} vbh={50}><path d="M6 12 H62 L76 26 L76 40 H6 Z" fill={p.dashed ? "none" : "#FDE68A"} stroke={p.dashed ? ACCENT.red : I(p)} strokeWidth="3.5" strokeDasharray={p.dashed ? "6 5" : undefined} strokeLinejoin="round" /><circle cx="20" cy="42" r="6" fill="none" stroke={p.dashed ? ACCENT.red : I(p)} strokeWidth="3" strokeDasharray={p.dashed ? "4 4" : undefined} /><circle cx="62" cy="42" r="6" fill="none" stroke={p.dashed ? ACCENT.red : I(p)} strokeWidth="3" strokeDasharray={p.dashed ? "4 4" : undefined} /></Svg>
);
export const Ship: React.FC<P> = (p) => (
  <Svg {...p} vbh={50}><path d="M2 26 H98 L88 44 H12 Z" fill="#475569" {...st(I(p))} />{[10, 26, 42, 58, 74].map((x, i) => <rect key={i} x={x} y={12 - (i % 2) * 6} width="14" height={14 + (i % 2) * 6} fill={[ACCENT.red, ACCENT.blue, ACCENT.amber][i % 3]} {...st(I(p), 2)} />)}</Svg>
);
export const Telescope: React.FC<P> = (p) => (
  <Svg {...p}><path d="M14 58 L70 22 L78 36 L22 72 Z" fill="#E2E8F0" {...st(I(p))} /><path d="M40 56 L30 92 M44 54 L58 92" {...st(I(p))} /></Svg>
);
export const Magnifier: React.FC<P> = (p) => (
  <Svg {...p}><circle cx="40" cy="40" r="28" fill="#BFDBFE" fillOpacity="0.25" {...st(I(p), 5)} /><path d="M60 60 L90 90" {...st(I(p), 9)} /></Svg>
);
export const Pie: React.FC<P & { slice?: number }> = (p) => {
  const k = p.slice ?? 0;
  return (
    <Svg {...p}><circle cx="50" cy="50" r="40" fill="#94A3B8" {...st(I(p))} /><path d="M50 50 L50 10 A40 40 0 0 1 88 38 Z" fill="#1E293B" stroke={I(p)} strokeWidth="3" strokeDasharray="5 4" transform={`translate(${k * 10} ${-k * 8})`} /><text x={50 + k * 16} y={34 - k * 8} fontSize="16" fontWeight="700" fill="#F6F4EF" textAnchor="middle">?</text></Svg>
  );
};
export const Waveform: React.FC<P & { phase?: number }> = (p) => {
  const pts = Array.from({ length: 120 }, (_, i) => { const x = i * (200 / 119); const t = i / 119; const a = 6 + 30 * t * t * t; return `${x},${30 + Math.sin(i * (0.25 + t * 0.6) + (p.phase ?? 0)) * a * (i > 112 ? 0.2 : 1)}`; }).join(" ");
  return <Svg {...p} vbw={200} vbh={60}><polyline points={pts} fill="none" stroke={ACCENT.blue} strokeWidth="4" strokeLinejoin="round" /></Svg>;
};
export const Detector: React.FC<P> = (p) => (
  <Svg {...p}><path d="M14 86 L14 30 M14 86 L70 86" {...st(I(p), 7)} /><rect x="6" y="78" width="16" height="16" fill={ACCENT.blue} {...st(I(p), 2.5)} /></Svg>
);
export const Binoculars: React.FC<P> = (p) => (
  <Svg {...p} vbh={60}><circle cx="28" cy="34" r="20" fill="#1E293B" {...st(I(p))} /><circle cx="72" cy="34" r="20" fill="#1E293B" {...st(I(p))} /><rect x="42" y="22" width="16" height="12" fill="#475569" {...st(I(p), 2.5)} /></Svg>
);
export const Capsule: React.FC<P> = (p) => (
  <Svg {...p} vbh={50}><rect x="8" y="10" width="84" height="30" rx="15" fill="#94A3B8" {...st(I(p))} /><path d="M40 10 v30 M60 10 v30" {...st(I(p), 2.5)} /></Svg>
);
export const Stopwatch: React.FC<P> = (p) => (
  <Svg {...p}><circle cx="50" cy="56" r="36" fill="#FFF" {...st(I(p), 4)} /><path d="M50 56 L50 32 M44 12 h12 M50 12 v8" {...st(I(p), 4)} /></Svg>
);
export const LikeButton: React.FC<P & { on?: boolean }> = (p) => (
  <Svg {...p} vbw={160} vbh={70}><rect x="3" y="3" width="154" height="64" rx="32" fill={p.on ? ACCENT.red : "#FFFFFF"} {...st(I(p), 4)} /><path d="M34 56 V30 H44 L56 12 Q64 12 62 24 L60 30 H76 Q82 32 80 40 L76 54 Q74 58 68 58 H44 Z" fill={p.on ? "#FFFFFF" : "none"} {...st(p.on ? "#FFFFFF" : I(p), 3.5)} /><text x="114" y="46" fontSize="26" fontWeight="700" fontFamily="Space Grotesk" textAnchor="middle" fill={p.on ? "#FFFFFF" : I(p)}>LIKE</text></Svg>
);
export const BigBang: React.FC<P> = (p) => (
  <Svg {...p}>{Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <line key={i} x1={50 + Math.cos(a) * 14} y1={50 + Math.sin(a) * 14} x2={50 + Math.cos(a) * (36 + (i % 2) * 10)} y2={50 + Math.sin(a) * (36 + (i % 2) * 10)} stroke={i % 3 ? ACCENT.amber : ACCENT.red} strokeWidth="6" strokeLinecap="round" />; })}<circle cx="50" cy="50" r="12" fill="#FFF8E1" {...st(I(p), 3)} /></Svg>
);
export const Mountain: React.FC<P> = (p) => (
  <Svg {...p}><path d="M4 88 L40 22 L58 52 L68 38 L96 88 Z" fill="#9AA3B2" {...st(I(p))} /><path d="M40 22 L30 41 L37 37 L42 44 L49 36 Z" fill="#FFF" {...st(I(p), 3)} /></Svg>
);
export const Whale: React.FC<P> = (p) => (
  <Svg {...p} vbh={56}><path d="M6 30 Q10 10 42 10 Q76 10 84 28 L96 16 L94 40 L84 34 Q74 50 42 50 Q10 50 6 30 Z" fill="#60A5FA" {...st(I(p))} /><circle cx="22" cy="26" r="3" fill={I(p)} /></Svg>
);
export const WhiteHole: React.FC<P> = (p) => (
  <Svg {...p}>{Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2; const x1 = 50 + Math.cos(a) * 24, y1 = 50 + Math.sin(a) * 24, x2 = 50 + Math.cos(a) * 46, y2 = 50 + Math.sin(a) * 46; return <g key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} {...st(ACCENT.blue, 4)} /><path d={`M${x2 - 7 * Math.cos(a - 0.5)},${y2 - 7 * Math.sin(a - 0.5)} L${x2},${y2} L${x2 - 7 * Math.cos(a + 0.5)},${y2 - 7 * Math.sin(a + 0.5)}`} fill="none" {...st(ACCENT.blue, 4)} /></g>; })}<circle cx="50" cy="50" r="18" fill="#FFFFFF" {...st(I(p), 4)} /></Svg>
);
export const NoEntry: React.FC<P> = (p) => (
  <Svg {...p}><circle cx="50" cy="50" r="40" fill={ACCENT.red} {...st(I(p), 4)} /><rect x="22" y="42" width="56" height="16" rx="4" fill="#FFF" /></Svg>
);
export const Orbit: React.FC<P & { dash?: boolean }> = (p) => (
  <Svg {...p}><circle cx="50" cy="50" r="44" fill="none" stroke={ACCENT.blue} strokeWidth="3" strokeDasharray={p.dash === false ? undefined : "5 6"} /></Svg>
);
