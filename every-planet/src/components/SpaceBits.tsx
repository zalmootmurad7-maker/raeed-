import React from "react";
import { ACCENT, FONT, LIGHT, SPACE } from "../tokens";
import { Appear, Txt, ramp, useShot } from "./kit";

// Shared drawing bits for the planets video. All steady (0 px jitter); motion only from smooth ramps.
// Glow is a radial gradient (not a wide box-shadow): wide shadows render with visible tiles at 4K.
export const Star: React.FC<{ cx: number; cy: number; r: number; core?: string; edge?: string; glow?: string }> = ({ cx, cy, r, core = "#FFF7D6", edge = "#FBBF24", glow = "rgba(251,191,36,0.45)" }) => (
  <>
    <div style={{ position: "absolute", left: cx - r * 1.9, top: cy - r * 1.9, width: r * 3.8, height: r * 3.8, borderRadius: 9999, background: `radial-gradient(circle, ${glow} 0%, ${glow} 45%, rgba(0,0,0,0) 70%)` }} />
    <div style={{ position: "absolute", left: cx - r, top: cy - r, width: 2 * r, height: 2 * r, borderRadius: 9999, background: `radial-gradient(circle, ${core} 0%, ${edge} 78%)`, border: `4px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
  </>
);
export const Tag: React.FC<{ x: number; y: number; text: string; at: number; color?: string; size?: number }> = ({ x, y, text, at, color = ACCENT.blue, size = 40 }) => (
  <Appear at={at} kind="pop"><div style={{ position: "absolute", left: x, top: y, whiteSpace: "nowrap", background: color, color: "#FFF", fontFamily: FONT.mono, fontWeight: 700, fontSize: size, padding: "8px 20px", borderRadius: 999, border: `3px solid ${LIGHT.ink}` }}>{text}</div></Appear>
);
export const Title: React.FC<{ text: string; color: string; size?: number; w?: number; y?: number; at?: number }> = ({ text, color, size = 62, w = 1100, y = 92, at }) =>
  at === undefined ? <Txt x={56} y={y} size={size} color={color} w={w}>{text}</Txt> : <Appear at={at} kind="rise"><Txt x={56} y={y} size={size} color={color} w={w}>{text}</Txt></Appear>;
export const Body: React.FC<{ x?: number; y: number; text: React.ReactNode; color: string; at: number; w?: number; size?: number }> = ({ x = 58, y, text, color, at, w = 560, size = 38 }) => (
  <Appear at={at} kind="rise"><Txt x={x} y={y} size={size} color={color} font="body" w={w}>{text}</Txt></Appear>
);
export const Line: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; w?: number; dash?: string; head?: boolean; k?: number }> = ({ x1, y1, x2, y2, color, w = 8, dash, head = true, k = 1 }) => {
  const X = x1 + (x2 - x1) * k, Y = y1 + (y2 - y1) * k, a = Math.atan2(y2 - y1, x2 - x1);
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
      <line x1={x1} y1={y1} x2={X} y2={Y} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} />
      {head && k > 0.9 ? <path d={`M${X - 24 * Math.cos(a - 0.5)} ${Y - 24 * Math.sin(a - 0.5)} L${X} ${Y} L${X - 24 * Math.cos(a + 0.5)} ${Y - 24 * Math.sin(a + 0.5)}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /> : null}
    </svg>
  );
};
export const Ring: React.FC<{ cx: number; cy: number; rx: number; ry?: number; color: string; w?: number; dash?: string }> = ({ cx, cy, rx, ry, color, w = 4, dash = "12 10" }) => (
  <svg style={{ position: "absolute", left: cx - rx - 10, top: cy - (ry ?? rx) - 10, overflow: "visible" }} width={2 * rx + 20} height={2 * (ry ?? rx) + 20}>
    <ellipse cx={rx + 10} cy={(ry ?? rx) + 10} rx={rx} ry={ry ?? rx} fill="none" stroke={color} strokeWidth={w} strokeDasharray={dash} />
  </svg>
);
// Animated dot moving along a path between two points (particles / droplets)
export const Flow: React.FC<{ from: [number, number]; to: [number, number]; n: number; color: string; size?: number; a: number; b: number; fall?: number }> = ({ from, to, n, color, size = 16, a, b, fall = 0 }) => {
  const { f } = useShot();
  if (f < a) return null;
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const ph = (((f - a) / 30) * 0.6 + i / n) % 1;
        const x = from[0] + (to[0] - from[0]) * ph, y = from[1] + (to[1] - from[1]) * ph + fall * ph * ph + ((i * 37) % 60) - 30;
        return <div key={i} style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size * (fall ? 1.3 : 1), borderRadius: fall ? "50% 50% 50% 50% / 60% 60% 40% 40%" : 99, background: color, opacity: ramp(f, a, Math.min(b, a + 10)) }} />;
      })}
    </>
  );
};
export const Cross: React.FC<{ x: number; y: number; s: number; at: number; color?: string }> = ({ x, y, s, at, color = ACCENT.red }) => {
  const { f } = useShot();
  if (f < at) return null;
  const k = ramp(f, at, at + 8);
  return <svg style={{ position: "absolute", left: x - s / 2, top: y - s / 2, overflow: "visible" }} width={s} height={s}><path d={`M0 0 L${s * k} ${s * k} M${s} 0 L${s - s * k} ${s * k}`} stroke={color} strokeWidth={s * 0.12} strokeLinecap="round" /></svg>;
};
export const SPACE_T = SPACE.text;
