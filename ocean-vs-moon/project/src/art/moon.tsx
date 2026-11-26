import React from "react";
import { AbsoluteFill } from "remotion";
import { C, OUT, OW, Svg, rnd } from "./kit";

// WORLD B — the Moon: orange / amber / warm gold / dark charcoal / space blue.
export const SpaceSky: React.FC<{ t?: number }> = ({ t = 0 }) => (
  <>
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #050A1A 0%, #0B1630 55%, #1A1F33 100%)" }} />
    <Svg>{Array.from({ length: 160 }, (_, i) => <circle key={i} cx={rnd(i, 11) * 1920} cy={rnd(i, 12) * 760} r={0.8 + rnd(i, 13) * 2.2} fill="#FFF" opacity={0.35 + 0.55 * Math.abs(Math.sin(t * (0.5 + rnd(i, 14)) + i))} />)}</Svg>
  </>
);
/** Earth with continents, clouds and a thin atmosphere glow */
export const EarthDisc: React.FC<{ cx: number; cy: number; r: number; t?: number }> = ({ cx, cy, r, t = 0 }) => (
  <Svg>
    <defs><clipPath id={`e${cx}${cy}`}><circle cx={cx} cy={cy} r={r - 3} /></clipPath><radialGradient id={`eg${cx}`}><stop offset="80%" stopColor="#5CC8FF" stopOpacity="0.45" /><stop offset="100%" stopColor="#5CC8FF" stopOpacity="0" /></radialGradient></defs>
    <circle cx={cx} cy={cy} r={r * 1.18} fill={`url(#eg${cx})`} />
    <circle cx={cx} cy={cy} r={r} fill="#1E7BFF" />
    <g clipPath={`url(#e${cx}${cy})`} transform={`translate(${(t * 6) % (r * 0.6)} 0)`}>
      <path d={`M ${cx - r * 0.9} ${cy - r * 0.3} C ${cx - r * 0.6} ${cy - r * 0.75} ${cx - r * 0.1} ${cy - r * 0.6} ${cx - r * 0.2} ${cy - r * 0.15} C ${cx - r * 0.3} ${cy + r * 0.25} ${cx - r * 0.75} ${cy + r * 0.05} ${cx - r * 0.9} ${cy - r * 0.3} Z`} fill="#3DDC84" stroke={OUT} strokeWidth={4} />
      <path d={`M ${cx + r * 0.1} ${cy + r * 0.05} C ${cx + r * 0.5} ${cy - r * 0.2} ${cx + r * 0.85} ${cy + r * 0.1} ${cx + r * 0.6} ${cy + r * 0.55} C ${cx + r * 0.35} ${cy + r * 0.85} ${cx} ${cy + r * 0.5} ${cx + r * 0.1} ${cy + r * 0.05} Z`} fill="#3DDC84" stroke={OUT} strokeWidth={4} />
      {[[-0.4, -0.55, 0.5], [0.2, -0.35, 0.35], [-0.1, 0.45, 0.6], [0.55, -0.1, 0.3]].map(([dx, dy, w], i) => <path key={i} d={`M ${cx + r * dx} ${cy + r * dy} q ${r * w * 0.5} -${r * 0.08} ${r * w} 0`} fill="none" stroke="#FFFFFF" strokeWidth={r * 0.07} strokeLinecap="round" opacity={0.9} />)}
      <circle cx={cx + r * 0.35} cy={cy + r * 0.2} r={r} fill="#000" opacity={0.0} />
      <path d={`M ${cx + r * 0.15} ${cy - r} A ${r} ${r} 0 0 1 ${cx + r * 0.15} ${cy + r} A ${r * 0.7} ${r} 0 0 0 ${cx + r * 0.15} ${cy - r} Z`} fill="#000" opacity={0.28} />
    </g>
    <circle cx={cx} cy={cy} r={r} fill="none" stroke={OUT} strokeWidth={OW} />
  </Svg>
);
/** lunar ground with craters (y = horizon) */
export const MoonGround: React.FC<{ y?: number; warm?: number }> = ({ y = 700, warm = 1 }) => (
  <Svg>
    <defs><linearGradient id="mg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={warm ? "#E0B07A" : "#8F8A84"} /><stop offset="100%" stopColor={warm ? "#9A5E36" : "#4E4A46"} /></linearGradient></defs>
    <path d={`M -20 ${y + 40} C 200 ${y - 10} 420 ${y + 30} 700 ${y + 5} C 980 ${y - 25} 1300 ${y + 30} 1560 ${y} C 1720 ${y - 15} 1840 ${y + 10} 1940 ${y} L 1940 1100 L -20 1100 Z`} fill="url(#mg)" stroke={OUT} strokeWidth={OW} />
    {[[300, y + 120, 110], [900, y + 230, 170], [1500, y + 140, 120], [1220, y + 60, 60], [520, y + 300, 90], [1750, y + 280, 100]].map(([x, yy, r], i) => (
      <g key={i}><ellipse cx={x} cy={yy} rx={r} ry={r * 0.32} fill="#7A4A2A" stroke={OUT} strokeWidth={OW - 1} /><ellipse cx={x + r * 0.08} cy={yy + r * 0.04} rx={r * 0.8} ry={r * 0.22} fill="#5E3820" /><path d={`M ${x - r} ${yy} A ${r} ${r * 0.32} 0 0 0 ${x + r} ${yy}`} fill="none" stroke="#FFD9A8" strokeWidth={6} opacity={0.7} /></g>
    ))}
    {Array.from({ length: 40 }, (_, i) => <circle key={i} cx={rnd(i, 21) * 1920} cy={y + 30 + rnd(i, 22) * 380} r={2 + rnd(i, 23) * 5} fill="#7A4A2A" opacity={0.7} />)}
  </Svg>
);
/** habitat module: cylinder with windows and an amber light strip */
export const Module: React.FC<{ x: number; y: number; w: number; h: number; t?: number; dome?: boolean }> = ({ x, y, w, h, t = 0, dome }) => (
  <Svg>
    {dome ? <path d={`M ${x} ${y} A ${w / 2} ${h} 0 0 1 ${x + w} ${y} Z`} fill="#E8E6E1" stroke={OUT} strokeWidth={OW} /> : <rect x={x} y={y - h} width={w} height={h} rx={h * 0.45} fill="#E8E6E1" stroke={OUT} strokeWidth={OW} />}
    {!dome ? <rect x={x + 10} y={y - h * 0.55} width={w - 20} height={h * 0.16} rx={6} fill={C.orange} stroke={OUT} strokeWidth={4} /> : null}
    {Array.from({ length: dome ? Math.max(1, Math.floor(w * 0.6 / 80)) : Math.max(1, Math.floor(w / 80)) }, (_, i) => { const wx = (dome ? x + w * 0.2 : x + 30) + i * 80, wy = y - h * (dome ? 0.55 : 0.85), ww = Math.max(36, h * 0.24), wh = Math.max(24, h * 0.16); return <g key={i}><rect x={wx - 10} y={wy - 10} width={ww + 20} height={wh + 20} rx={14} fill={C.amber} opacity={0.3} /><rect x={wx} y={wy} width={ww} height={wh} rx={8} fill={C.gold} stroke={OUT} strokeWidth={4} opacity={0.85 + 0.15 * Math.sin(t * 2 + i)} /></g>; })}
    {!dome ? <rect x={x + w * 0.15} y={y - 6} width={w * 0.7} height={14} rx={5} fill="#8D8A85" stroke={OUT} strokeWidth={4} /> : null}
  </Svg>
);
export const Antenna: React.FC<{ x: number; y: number; t?: number }> = ({ x, y, t = 0 }) => (
  <Svg>
    <line x1={x} y1={y} x2={x} y2={y - 220} stroke={OUT} strokeWidth={14} /><line x1={x} y1={y} x2={x} y2={y - 220} stroke="#C9C6C0" strokeWidth={7} />
    <path d={`M ${x - 60} ${y - 250} Q ${x} ${y - 200} ${x + 60} ${y - 250} Z`} fill="#E8E6E1" stroke={OUT} strokeWidth={OW} />
    <circle cx={x} cy={y - 262} r={9} fill="#FF3B3B" opacity={0.5 + 0.5 * Math.sin(t * 4)} stroke={OUT} strokeWidth={3} />
  </Svg>
);
export const Rover: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x={-120} y={-80} width={240} height={60} rx={16} fill="#E8E6E1" stroke={OUT} strokeWidth={OW} />
    <rect x={-70} y={-130} width={110} height={56} rx={14} fill="#9AD8FF" stroke={OUT} strokeWidth={OW} />
    <rect x={-120} y={-56} width={240} height={14} fill={C.orange} stroke={OUT} strokeWidth={3} />
    {[-80, 0, 80].map((dx) => <g key={dx}><circle cx={dx} cy={-6} r={30} fill="#3A3F4A" stroke={OUT} strokeWidth={OW} /><circle cx={dx} cy={-6} r={12} fill="#8D8A85" /></g>)}
  </g></Svg>
);
/** floating lunar dust motes */
export const Dust: React.FC<{ t: number; n?: number; color?: string }> = ({ t, n = 50, color = "#FFC58A" }) => (
  <Svg>{Array.from({ length: n }, (_, i) => { const x = (rnd(i, 31) * 1920 + t * (10 + rnd(i, 32) * 25)) % 1920, y = 300 + rnd(i, 33) * 780 + 10 * Math.sin(t + i); return <circle key={i} cx={x} cy={y} r={1.5 + rnd(i, 34) * 3} fill={color} opacity={0.35 + 0.4 * rnd(i, 35)} />; })}</Svg>
);
