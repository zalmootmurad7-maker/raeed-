import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { C, FONT, LIGHT, Mode, SPACE, r, sp } from "../lib/core";
import { Bg, Pill, Pop, WarningBadge } from "./Base";

// Reusable vector props & stage pieces. Everything is drawn with thick #141824 ink and flat colours,
// animated only with smooth eases/springs (0 px jitter).
export const INK = LIGHT.ink;
const ink = (m: Mode) => (m === "light" ? LIGHT.ink : SPACE.text);

// ---------- stage: background + chapter badge (badge pops once, at chapter start) ----------
export const Stage: React.FC<{ mode: Mode; badge?: string; badgeAt?: number; danger?: boolean; push?: [number, number]; origin?: string; children?: React.ReactNode; overlay?: React.ReactNode }> = ({ mode, badge, badgeAt = -999, danger, push, origin = "50% 50%", children, overlay }) => {
  const f = useCurrentFrame();
  const s = push ? 1 + 0.03 * r(f, push[0], push[1], 0, 1, Easing.linear) : 1;
  const pop = push ? 0.95 + 0.05 * sp(f, push[0], 14, 200) : 1;
  return (
    <AbsoluteFill>
      <Bg mode={mode} />
      <AbsoluteFill style={{ scale: `${s * pop}`, transformOrigin: origin }}>{children}</AbsoluteFill>
      {overlay}
      {badge ? <WarningBadge value={badge} at={badgeAt} mode={mode} danger={danger} /> : null}
    </AbsoluteFill>
  );
};

// ---------- text helpers ----------
export const Head: React.FC<{ at: number; y?: number; size?: number; mode?: Mode; children: React.ReactNode; x?: number; w?: number; align?: "left" | "center" | "right" }> = ({ at, y = 70, size = 68, mode = "light", children, x = 120, w = 1680, align = "center" }) => (
  <Pop at={at} x={x} y={y} w={w} size={size} align={align} color={ink(mode)}>{children}</Pop>
);
export const Red: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.red }}>{children}</span>;
export const Blue: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.blue }}>{children}</span>;
export const Amber: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.amber }}>{children}</span>;
export const Green: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: C.green }}>{children}</span>;
export const PillAt: React.FC<{ at: number; x: number; y: number; text: string; color?: string; size?: number }> = ({ at, x, y, text, color = C.blue, size = 34 }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = sp(f, at, 12, 240, 0.7);
  return <div style={{ position: "absolute", left: x, top: y, scale: `${0.6 + 0.4 * k}`, opacity: Math.min(1, k * 2), transformOrigin: "0% 50%" }}><Pill text={text} color={color} size={size} /></div>;
};
/** generic pop-in wrapper for any drawing: spring scale from its own centre */
export const PopIn: React.FC<{ at: number; x: number; y: number; w: number; h: number; children: React.ReactNode; from?: number }> = ({ at, x, y, w, h, children, from = 0.4 }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = sp(f, at, 11, 220, 0.7);
  return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, scale: `${from + (1 - from) * k}`, opacity: Math.min(1, k * 2), transformOrigin: "50% 50%" }}>{children}</div>;
};
export const Svg: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible", ...style }} width="1" height="1">{children}</svg>
);
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string; w?: number; k?: number; dash?: string; head?: boolean }> = ({ x1, y1, x2, y2, color = C.red, w = 10, k = 1, dash, head = true }) => {
  const ex = x1 + (x2 - x1) * k, ey = y1 + (y2 - y1) * k, a = Math.atan2(y2 - y1, x2 - x1), L = 14 + w * 2;
  return (
    <Svg>
      <line x1={x1} y1={y1} x2={ex} y2={ey} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} />
      {head && k > 0.05 ? <path d={`M ${ex - L * Math.cos(a - 0.5)} ${ey - L * Math.sin(a - 0.5)} L ${ex} ${ey} L ${ex - L * Math.cos(a + 0.5)} ${ey - L * Math.sin(a + 0.5)}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /> : null}
    </Svg>
  );
};
export const XMark: React.FC<{ x: number; y: number; s: number; at: number; color?: string }> = ({ x, y, s, at, color = C.red }) => {
  const f = useCurrentFrame();
  const k1 = r(f, at, at + 6), k2 = r(f, at + 4, at + 10);
  if (f < at) return null;
  return <Svg><line x1={x - s} y1={y - s} x2={x - s + 2 * s * k1} y2={y - s + 2 * s * k1} stroke={color} strokeWidth={s * 0.28} strokeLinecap="round" /><line x1={x + s} y1={y - s} x2={x + s - 2 * s * k2} y2={y - s + 2 * s * k2} stroke={color} strokeWidth={s * 0.28} strokeLinecap="round" /></Svg>;
};
export const Check: React.FC<{ x: number; y: number; s: number; at: number; color?: string }> = ({ x, y, s, at, color = C.green }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = r(f, at, at + 10);
  return <Svg><path d={`M ${x - s} ${y} L ${x - s * 0.3} ${y + s * 0.7} L ${x + s} ${y - s * 0.8}`} fill="none" stroke={color} strokeWidth={s * 0.3} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - k} /></Svg>;
};

// ---------- celestial bodies ----------
export const Earth: React.FC<{ cx: number; cy: number; R: number; t: number; glow?: string; aur?: number; frozen?: boolean }> = ({ cx, cy, R, t, glow, aur = 0, frozen }) => (
  <>
    {glow ? <div style={{ position: "absolute", left: cx - R * 1.7, top: cy - R * 1.7, width: R * 3.4, height: R * 3.4, borderRadius: 9999, background: `radial-gradient(circle, ${glow} 45%, rgba(0,0,0,0) 70%)` }} /> : null}
    {aur > 0 ? <div style={{ position: "absolute", left: cx - R * 1.9, top: cy - R * 1.9, width: R * 3.8, height: R * 3.8, borderRadius: 9999, background: `radial-gradient(circle, rgba(16,185,129,0) 52%, rgba(16,185,129,${0.55 * aur}) 58%, rgba(168,85,247,${0.35 * aur}) 64%, rgba(0,0,0,0) 72%)` }} /> : null}
    <svg style={{ position: "absolute", left: cx - R, top: cy - R, overflow: "visible" }} width={R * 2} height={R * 2}>
      <defs><clipPath id={`ec${Math.round(R)}${Math.round(cx)}`}><circle cx={R} cy={R} r={R - 2} /></clipPath></defs>
      <circle cx={R} cy={R} r={R} fill={frozen ? "#BFDBFE" : C.blue} />
      <g clipPath={`url(#ec${Math.round(R)}${Math.round(cx)})`}>
        {[[0.2, 0.35, 0.32, 0.22], [0.62, 0.62, 0.26, 0.3], [0.5, 0.15, 0.2, 0.12], [0.95, 0.4, 0.22, 0.18]].map(([x, y, w, h], i) => { const dx = ((t * 0.04 + x) % 1.3) - 0.15; return <ellipse key={i} cx={dx * R * 2} cy={y * R * 2} rx={w * R} ry={h * R} fill={frozen ? "#F8FAFC" : C.green} stroke={INK} strokeWidth={Math.max(2, R * 0.035)} />; })}
      </g>
      <circle cx={R} cy={R} r={R} fill="none" stroke={INK} strokeWidth={Math.max(3, R * 0.06)} />
    </svg>
  </>
);
export const Sun: React.FC<{ cx: number; cy: number; R: number; t: number; color?: string; spikes?: boolean }> = ({ cx, cy, R, t, color = C.amber, spikes = true }) => (
  <>
    <div style={{ position: "absolute", left: cx - R * 1.8, top: cy - R * 1.8, width: R * 3.6, height: R * 3.6, borderRadius: 9999, background: `radial-gradient(circle, rgba(245,158,11,0.5) 0%, rgba(245,158,11,0.2) 38%, rgba(0,0,0,0) 62%)` }} />
    <svg style={{ position: "absolute", left: cx - R * 1.4, top: cy - R * 1.4, overflow: "visible" }} width={R * 2.8} height={R * 2.8}>
      <g transform={`translate(${R * 1.4} ${R * 1.4})`}>
        {spikes ? Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2 + t * 0.06; const L = R * (1.1 + 0.05 * Math.sin(t * 1.4 + i * 2.1)); return <path key={i} d={`M ${Math.cos(a - 0.06) * R} ${Math.sin(a - 0.06) * R} L ${Math.cos(a) * L} ${Math.sin(a) * L} L ${Math.cos(a + 0.06) * R} ${Math.sin(a + 0.06) * R} Z`} fill={i % 2 ? color : "#FB923C"} />; }) : null}
        <circle r={R} fill={color} stroke={INK} strokeWidth={Math.max(4, R * 0.04)} />
        <circle r={R * 0.62} fill="#FFF4D6" opacity="0.45" />
      </g>
    </svg>
  </>
);
export const BlackHole: React.FC<{ cx: number; cy: number; R: number; t: number; ring?: number }> = ({ cx, cy, R, t, ring = 1 }) => (
  <svg style={{ position: "absolute", left: cx - R * 2, top: cy - R * 2, overflow: "visible" }} width={R * 4} height={R * 4}>
    <g transform={`translate(${R * 2} ${R * 2})`}>
      <circle r={R * 1.45} fill="none" stroke="#93C5FD" strokeWidth={R * 0.08} opacity={0.5 * ring} strokeDasharray={`${R * 0.5} ${R * 0.3}`} transform={`rotate(${t * 25})`} />
      <circle r={R * 1.12} fill="none" stroke="#F6F4EF" strokeWidth={R * 0.12} opacity={0.9 * ring} />
      <circle r={R} fill="#000" stroke="#F6F4EF" strokeWidth={Math.max(3, R * 0.04)} />
    </g>
  </svg>
);
export const Galaxy: React.FC<{ cx: number; cy: number; R: number; t: number; tilt?: number; dots?: number; dotColor?: string; dotsK?: number }> = ({ cx, cy, R, t, tilt = 0.55, dots = 0, dotColor = "#F6F4EF", dotsK = 1 }) => (
  <svg style={{ position: "absolute", left: cx - R, top: cy - R, overflow: "visible" }} width={R * 2} height={R * 2}>
    <g transform={`translate(${R} ${R}) scale(1 ${tilt}) rotate(${t * 4})`}>
      <circle r={R * 0.95} fill="rgba(147,197,253,0.07)" />
      {[0, 1, 2, 3].map((arm) => <path key={arm} d={Array.from({ length: 40 }, (_, i) => { const th = i * 0.12, rr = R * 0.12 + i * R * 0.021; const a = th + (arm * Math.PI) / 2; return `${i ? "L" : "M"} ${Math.cos(a) * rr} ${Math.sin(a) * rr}`; }).join(" ")} fill="none" stroke="#93C5FD" strokeWidth={R * 0.06} strokeLinecap="round" opacity="0.55" />)}
      <circle r={R * 0.14} fill="#FDE68A" opacity="0.9" />
      {Array.from({ length: Math.round(dots * dotsK) }, (_, i) => { const q = (n: number) => { const v = Math.sin((i + 1) * 12.9898 * n) * 43758.5453; return v - Math.floor(v); }; const a = q(1) * Math.PI * 2, rr = R * (0.15 + 0.78 * Math.sqrt(q(2))); return <circle key={i} cx={Math.cos(a) * rr} cy={Math.sin(a) * rr} r={R * 0.014} fill={dotColor} />; })}
    </g>
  </svg>
);
export const Orbit: React.FC<{ cx: number; cy: number; rx: number; ry?: number; color?: string; w?: number; rot?: number; dash?: string }> = ({ cx, cy, rx, ry, color = "rgba(226,232,240,0.6)", w = 4, rot = 0, dash = "14 12" }) => (
  <Svg><ellipse cx={cx} cy={cy} rx={rx} ry={ry ?? rx} fill="none" stroke={color} strokeWidth={w} strokeDasharray={dash} transform={`rotate(${rot} ${cx} ${cy})`} /></Svg>
);
/** stream of particles moving along a line, looping smoothly */
export const Stream: React.FC<{ x1: number; y1: number; x2: number; y2: number; n?: number; speed?: number; color?: string; size?: number; spread?: number; f0?: number }> = ({ x1, y1, x2, y2, n = 14, speed = 1, color = C.blue, size = 8, spread = 30, f0 = 0 }) => {
  const f = useCurrentFrame();
  const t = (f - f0) / 30;
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L;
  return (
    <Svg>
      {Array.from({ length: n }, (_, i) => { const ph = (t * speed * 0.6 + i / n) % 1; const off = Math.sin(i * 2.7) * spread; return <circle key={i} cx={x1 + dx * ph + nx * off} cy={y1 + dy * ph + ny * off} r={size * (0.6 + 0.4 * Math.sin(i))} fill={color} opacity={Math.min(1, ph * 4) * Math.min(1, (1 - ph) * 4)} />; })}
    </Svg>
  );
};
/** expanding shockwave rings */
export const Shock: React.FC<{ cx: number; cy: number; at: number; R: number; color?: string; n?: number; period?: number }> = ({ cx, cy, at, R, color = C.red, n = 3, period = 1.2 }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const t = (f - at) / 30;
  return <>{Array.from({ length: n }, (_, i) => { const ph = ((t / period) + i / n) % 1; const rr = R * ph; return <div key={i} style={{ position: "absolute", left: cx - rr, top: cy - rr, width: rr * 2, height: rr * 2, borderRadius: 9999, border: `${Math.max(2, 10 * (1 - ph))}px solid ${color}`, opacity: 1 - ph, boxSizing: "border-box" }} />; })}</>;
};
export const Flash: React.FC<{ at: number; color?: string; dur?: number }> = ({ at, color = "#FFFFFF", dur = 10 }) => {
  const f = useCurrentFrame();
  if (f < at || f > at + dur) return null;
  return <AbsoluteFill style={{ background: color, opacity: 0.85 * (1 - (f - at) / dur) }} />;
};

// ---------- everyday props (simple flat vector icons) ----------
type IP = { x: number; y: number; s: number; t?: number; mode?: Mode; on?: number };
export const Laptop: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    <rect x="-60" y="-52" width="120" height="78" rx="8" fill="#E2E8F0" stroke={INK} strokeWidth="6" /><rect x="-50" y="-43" width="100" height="58" rx="4" fill="#DBEAFE" />
    <path d="M -78 30 L 78 30 L 66 44 L -66 44 Z" fill="#CBD5E1" stroke={INK} strokeWidth="6" strokeLinejoin="round" />
  </g></Svg>
);
export const Chip: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    {Array.from({ length: 6 }, (_, i) => <React.Fragment key={i}><line x1={-40 + i * 16} y1="-62" x2={-40 + i * 16} y2="-48" stroke={INK} strokeWidth="6" /><line x1={-40 + i * 16} y1="48" x2={-40 + i * 16} y2="62" stroke={INK} strokeWidth="6" /><line x1="-62" y1={-40 + i * 16} x2="-48" y2={-40 + i * 16} stroke={INK} strokeWidth="6" /><line x1="48" y1={-40 + i * 16} x2="62" y2={-40 + i * 16} stroke={INK} strokeWidth="6" /></React.Fragment>)}
    <rect x="-48" y="-48" width="96" height="96" rx="10" fill="#334155" stroke={INK} strokeWidth="6" /><rect x="-26" y="-26" width="52" height="52" rx="6" fill="#64748B" />
  </g></Svg>
);
export const BallotBox: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    <rect x="-28" y="-78" width="56" height="44" rx="4" fill="#FFF" stroke={INK} strokeWidth="5" transform="rotate(-8)" /><line x1="-14" y1="-62" x2="14" y2="-66" stroke={C.blue} strokeWidth="5" />
    <rect x="-70" y="-40" width="140" height="100" rx="10" fill={C.blue} stroke={INK} strokeWidth="6" /><rect x="-40" y="-46" width="80" height="12" rx="6" fill={INK} />
    <text x="0" y="24" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="34" fill="#FFF">VOTE</text>
  </g></Svg>
);
export const DNA: React.FC<IP & { broken?: number }> = ({ x, y, s, t = 0, broken = 0 }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    {Array.from({ length: 13 }, (_, i) => { const yy = -120 + i * 20, ph = t * 2 + i * 0.55, a = Math.sin(ph) * 46, b = -a; const br = broken > 0 && (i === 5 || i === 8) ? broken : 0; return <g key={i}><line x1={a} y1={yy} x2={b} y2={yy} stroke={br ? C.red : "#94A3B8"} strokeWidth="6" strokeDasharray={br ? `${14 - 10 * br} ${8 + 30 * br}` : undefined} /><circle cx={a} cy={yy} r="9" fill={br ? C.red : C.blue} stroke={INK} strokeWidth="4" /><circle cx={b} cy={yy} r="9" fill={br ? C.red : C.amber} stroke={INK} strokeWidth="4" /></g>; })}
  </g></Svg>
);
export const Telescope: React.FC<IP & { rot?: number }> = ({ x, y, s, rot = -30, mode = "light" }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    {[-34, 34, 0].map((dx) => <line key={dx} x1="0" y1="0" x2={dx} y2="70" stroke={ink(mode)} strokeWidth="7" strokeLinecap="round" />)}
    <g transform={`rotate(${rot})`}><rect x="-70" y="-22" width="130" height="40" rx="8" fill="#E2E8F0" stroke={INK} strokeWidth="6" /><rect x="58" y="-28" width="20" height="52" rx="4" fill={C.blue} stroke={INK} strokeWidth="6" /></g>
  </g></Svg>
);
export const Hubble: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100}) rotate(-14)`}>
    <rect x="-130" y="-22" width="70" height="44" fill={C.blue} stroke={INK} strokeWidth="5" /><rect x="60" y="-22" width="70" height="44" fill={C.blue} stroke={INK} strokeWidth="5" />
    {[-110, -90, 80, 100].map((xx) => <line key={xx} x1={xx} y1="-22" x2={xx} y2="22" stroke="#93C5FD" strokeWidth="3" />)}
    <rect x="-60" y="-34" width="120" height="68" rx="10" fill="#E2E8F0" stroke={INK} strokeWidth="6" /><rect x="40" y="-30" width="30" height="60" rx="6" fill="#94A3B8" stroke={INK} strokeWidth="5" />
  </g></Svg>
);
export const City: React.FC<IP & { lights?: number }> = ({ x, y, s, lights = 1 }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    {[[-200, 120, 60], [-130, 190, 70], [-50, 150, 60], [20, 230, 80], [110, 170, 60], [180, 130, 70]].map(([bx, h, w], i) => (
      <g key={i}><rect x={bx} y={-h} width={w} height={h} fill="#475569" stroke={INK} strokeWidth="6" />
        {Array.from({ length: Math.floor(h / 34) }, (_, j) => [0, 1].map((c) => <rect key={`${j}${c}`} x={bx + 12 + c * (w / 2 - 4)} y={-h + 14 + j * 34} width={w / 2 - 22} height="14" fill="#FDE68A" opacity={lights * (((i + j + c) % 3) ? 1 : 0.6)} />))}</g>
    ))}
    <line x1="-220" y1="0" x2="270" y2="0" stroke={INK} strokeWidth="8" />
  </g></Svg>
);
export const Wifi: React.FC<IP & { bars?: number; color?: string }> = ({ x, y, s, bars = 3, color = C.blue }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    {[1, 2, 3].map((i) => <path key={i} d={`M ${-22 * i} ${-22 * i + 10} A ${31 * i} ${31 * i} 0 0 1 ${22 * i} ${-22 * i + 10}`} fill="none" stroke={i <= bars ? color : "#CBD5E1"} strokeWidth="11" strokeLinecap="round" />)}
    <circle cx="0" cy="22" r="10" fill={bars > 0 ? color : "#CBD5E1"} />
  </g></Svg>
);
export const Pylon: React.FC<IP & { on?: number }> = ({ x, y, s, on = 1, mode = "light" }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    <path d="M -30 80 L -8 -80 L 8 -80 L 30 80 M -20 10 L 20 10 M -14 -30 L 14 -30 M -50 -50 L 50 -50 M -40 -70 L 40 -70" fill="none" stroke={ink(mode)} strokeWidth="7" strokeLinejoin="round" />
    <path d="M 50 -50 Q 100 -30 150 -50" fill="none" stroke={on > 0.5 ? C.amber : "#94A3B8"} strokeWidth="5" />
  </g></Svg>
);
export const Satellite: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100}) rotate(-20)`}>
    <rect x="-90" y="-16" width="50" height="32" fill={C.blue} stroke={INK} strokeWidth="5" /><rect x="40" y="-16" width="50" height="32" fill={C.blue} stroke={INK} strokeWidth="5" />
    <rect x="-34" y="-28" width="68" height="56" rx="8" fill="#E2E8F0" stroke={INK} strokeWidth="6" /><path d="M 0 28 L 0 44 M -16 54 Q 0 34 16 54" fill="none" stroke={INK} strokeWidth="5" />
  </g></Svg>
);
export const Pin: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}><path d="M 0 60 C -40 10 -50 -10 -50 -30 A 50 50 0 1 1 50 -30 C 50 -10 40 10 0 60 Z" fill={C.red} stroke={INK} strokeWidth="6" /><circle cx="0" cy="-30" r="18" fill="#FFF" stroke={INK} strokeWidth="5" /></g></Svg>
);
export const Bank: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}><path d="M -70 -20 L 0 -64 L 70 -20 Z" fill="#E2E8F0" stroke={INK} strokeWidth="6" strokeLinejoin="round" />{[-50, -18, 14, 46].map((xx) => <rect key={xx} x={xx} y="-14" width="12" height="54" fill="#E2E8F0" stroke={INK} strokeWidth="5" />)}<rect x="-74" y="40" width="148" height="16" fill="#E2E8F0" stroke={INK} strokeWidth="6" /></g></Svg>
);
export const Tap: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}><path d="M -60 -30 L 20 -30 Q 50 -30 50 0 L 50 14" fill="none" stroke={INK} strokeWidth="22" strokeLinecap="round" /><path d="M -60 -30 L 20 -30 Q 50 -30 50 0 L 50 14" fill="none" stroke="#CBD5E1" strokeWidth="10" strokeLinecap="round" /><path d="M 50 34 C 38 52 38 62 50 66 C 62 62 62 52 50 34 Z" fill={C.blue} stroke={INK} strokeWidth="4" /></g></Svg>
);
export const Card$: React.FC<IP & { wiped?: number }> = ({ x, y, s, wiped = 0 }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}><rect x="-80" y="-50" width="160" height="100" rx="12" fill={wiped > 0.5 ? "#E2E8F0" : C.blue} stroke={INK} strokeWidth="6" /><rect x="-80" y="-30" width="160" height="22" fill={wiped > 0.5 ? "#CBD5E1" : INK} /><rect x="-60" y="10" width="34" height="24" rx="4" fill={wiped > 0.5 ? "#CBD5E1" : C.amber} stroke={INK} strokeWidth="4" /></g></Svg>
);
export const Fire: React.FC<IP> = ({ x, y, s, t = 0 }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}><path d={`M 0 60 C -50 60 -60 20 -40 -10 C -30 10 -20 10 -18 -4 C -20 -40 0 -60 ${6 + 4 * Math.sin(t * 5)} -80 C 10 -50 50 -30 44 20 C 40 50 20 60 0 60 Z`} fill={C.red} stroke={INK} strokeWidth="6" strokeLinejoin="round" /><path d="M 0 56 C -22 54 -24 30 -10 16 C -6 30 4 26 6 10 C 22 26 24 50 0 56 Z" fill={C.amber} /></g></Svg>
);
export const Wave: React.FC<IP> = ({ x, y, s, t = 0 }) => (
  <Svg><g transform={`translate(${x} ${y + 4 * Math.sin(t * 3)}) scale(${s / 100})`}><path d="M -80 40 C -60 -60 40 -70 60 -10 C 30 -30 10 -10 20 20 C 40 30 60 30 80 40 Z" fill={C.blue} stroke={INK} strokeWidth="6" strokeLinejoin="round" /><path d="M -90 50 L 90 50" stroke={INK} strokeWidth="6" /></g></Svg>
);
export const Dust: React.FC<IP> = ({ x, y, s, t = 0 }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>{[[-40, 10, 40], [0, -20, 50], [40, 14, 38], [-10, 30, 34]].map(([cx, cy, rr], i) => <circle key={i} cx={cx + 4 * Math.sin(t + i)} cy={cy} r={rr} fill={i % 2 ? "#A8A29E" : "#78716C"} stroke={INK} strokeWidth="5" />)}</g></Svg>
);
export const Dino: React.FC<IP & { gone?: number }> = ({ x, y, s, gone = 0 }) => (
  <Svg style={{ opacity: 1 - 0.75 * gone }}><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    <path d="M -90 30 C -70 20 -50 -10 -20 -10 C 10 -10 20 -40 30 -70 C 34 -84 60 -86 70 -74 C 80 -64 74 -54 60 -52 C 46 -50 44 -30 44 -10 C 44 20 30 40 10 44 L 14 76 L 0 76 L -6 46 L -30 46 L -28 76 L -42 76 L -44 40 C -60 40 -76 38 -90 30 Z" fill={gone > 0.5 ? "#CBD5E1" : C.green} stroke={INK} strokeWidth="6" strokeLinejoin="round" /><circle cx="56" cy="-70" r="4" fill={INK} />
  </g></Svg>
);
export const Brain: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}><path d="M -60 10 C -80 -20 -60 -60 -20 -60 C -10 -76 20 -76 30 -60 C 70 -60 84 -20 64 10 C 70 40 40 60 10 50 C -10 66 -50 56 -50 30 C -66 26 -66 16 -60 10 Z" fill="#FBCFE8" stroke={INK} strokeWidth="6" /><path d="M 0 -58 C -10 -30 10 -10 0 20 M -40 -20 C -20 -10 -30 10 -14 20 M 40 -30 C 24 -16 40 0 24 14" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" /></g></Svg>
);
export const ThumbUp: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}><rect x="-70" y="-10" width="34" height="80" rx="6" fill={C.blue} stroke={INK} strokeWidth="6" /><path d="M -36 -6 L -6 -60 C 4 -76 26 -70 22 -48 L 16 -20 L 56 -20 C 72 -20 78 -6 74 6 L 62 58 C 58 68 50 72 40 72 L -36 72 Z" fill="#FFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" /></g></Svg>
);
export const Bubble: React.FC<IP> = ({ x, y, s }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}><path d="M -80 -50 Q -80 -70 -60 -70 L 60 -70 Q 80 -70 80 -50 L 80 20 Q 80 40 60 40 L -20 40 L -50 70 L -44 40 L -60 40 Q -80 40 -80 20 Z" fill="#FFF" stroke={INK} strokeWidth="6" strokeLinejoin="round" />{[-34, 0, 34].map((xx) => <circle key={xx} cx={xx} cy="-14" r="9" fill={INK} />)}</g></Svg>
);
export const Atom: React.FC<IP & { stretch?: number; color?: string }> = ({ x, y, s, t = 0, stretch = 0, mode = "light", color }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}>
    {[0, 60, 120].map((a) => <ellipse key={a} rx={46 + 60 * stretch} ry={Math.max(3, 17 - 14 * stretch)} fill="none" stroke={color ?? (mode === "light" ? INK : SPACE.text)} strokeWidth="5" transform={`rotate(${a + t * 30 * (1 - stretch)})`} />)}
    <circle r="9" fill={C.blue} stroke={INK} strokeWidth="4" />
  </g></Svg>
);
export const Calendar: React.FC<IP & { text?: string }> = ({ x, y, s, text = "????" }) => (
  <Svg><g transform={`translate(${x} ${y}) scale(${s / 100})`}><rect x="-70" y="-60" width="140" height="130" rx="12" fill="#FFF" stroke={INK} strokeWidth="6" /><rect x="-70" y="-60" width="140" height="36" rx="12" fill={C.red} stroke={INK} strokeWidth="6" /><text x="0" y="36" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontWeight="700" fontSize="40" fill={INK}>{text}</text></g></Svg>
);

/** big kinetic statement card used for numbers / facts */
export const Fact: React.FC<{ at: number; pill?: string; pillColor?: string; big: React.ReactNode; sub?: React.ReactNode; mode: Mode; y?: number; bigSize?: number; bigColor?: string; x?: number; w?: number; align?: "left" | "center" }> = ({ at, pill, pillColor = C.red, big, sub, mode, y = 300, bigSize = 150, bigColor, x = 120, w = 1680, align = "center" }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = sp(f, at, 11, 220, 0.7);
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: align, scale: `${0.7 + 0.3 * k}`, opacity: Math.min(1, k * 2), transformOrigin: align === "center" ? "50% 50%" : "0% 50%" }}>
      {pill ? <div style={{ marginBottom: 28 }}><Pill text={pill} color={pillColor} size={36} /></div> : null}
      <div style={{ fontFamily: FONT.mono, fontWeight: 700, fontSize: bigSize, lineHeight: 1, color: bigColor ?? (mode === "light" ? LIGHT.ink : SPACE.text), fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{big}</div>
      {sub ? <div style={{ marginTop: 26, fontFamily: FONT.head, fontWeight: 700, fontSize: 52, color: mode === "light" ? LIGHT.ink : SPACE.text }}>{sub}</div> : null}
    </div>
  );
};
