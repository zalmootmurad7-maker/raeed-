import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Bg } from "./Base";
import { C, F, FONT, FPS, LIGHT, Mode, SPACE, r, sp } from "../lib/core";

export type BeatProps = { b0: number; b1: number };

// ---------- OXYGEN OFF timer (experiment clock) — always TOP-RIGHT, top 48 / right 64 ----------
// [timeline seconds, clock value]; the clock runs in slow motion through the first second, then counts to 5.00.
const CLOCK: [number, number][] = [[22.9, 0], [29.8, 0], [51.3, 0.01], [76.1, 0.5], [104.0, 1.0], [122.2, 2.0], [133.4, 2.0], [159.0, 4.99], [159.6, 5.0]];
export const clockAt = (sec: number) => {
  if (sec <= CLOCK[0][0]) return 0;
  for (let i = 0; i < CLOCK.length - 1; i++) { const [t0, v0] = CLOCK[i], [t1, v1] = CLOCK[i + 1]; if (sec <= t1) return v0 + (v1 - v0) * ((sec - t0) / (t1 - t0)); }
  return 5;
};
export const OxygenTimer: React.FC<{ mode: Mode; state?: "run" | "flashback" | "returns" | "zero"; at?: number }> = ({ mode, state = "run", at = 0 }) => {
  const f = useCurrentFrame();
  const sec = f / FPS;
  const k = sp(f, at, 13, 220);
  const v = state === "zero" ? Math.max(0, 5 * (1 - r(f, at, at + 24, 0, 1, Easing.inOut(Easing.cubic)))) : clockAt(sec);
  const label = state === "returns" ? "OXYGEN BACK" : "OXYGEN OFF";
  const tag = state === "flashback" ? "PAUSED" : sec > 29.8 && sec < 104 && state === "run" ? "SLOW-MO" : null;
  const light = mode === "light";
  const labelBg = state === "returns" ? C.green : C.red;
  return (
    <div style={{ position: "absolute", top: 48, right: 64, transformOrigin: "100% 0%", scale: `${0.8 + 0.2 * k}`, display: "flex", alignItems: "stretch", borderRadius: 16, overflow: "hidden", border: `3px solid ${light ? LIGHT.ink : SPACE.border}`, boxShadow: `4px 4px 0 ${light ? LIGHT.ink : SPACE.shadow}` }}>
      <div style={{ background: labelBg, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 22, padding: "10px 14px", lineHeight: 1.05, textAlign: "center", display: "flex", alignItems: "center" }}>{label.split(" ")[0]}<br />{label.split(" ")[1]}</div>
      <div style={{ background: light ? LIGHT.card : SPACE.card, color: state === "zero" ? C.red : light ? LIGHT.ink : SPACE.text, fontFamily: FONT.mono, fontWeight: 700, fontSize: 40, padding: "8px 20px", display: "flex", alignItems: "center", gap: 14, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
        {v.toFixed(2)}s{tag ? <span style={{ fontFamily: FONT.head, fontSize: 18, color: state === "flashback" ? C.amber : "#94A3B8" }}>{tag}</span> : null}
      </div>
    </div>
  );
};
/** stage: background + optional camera push + the timer */
export const OxyStage: React.FC<{ mode: Mode; b0: number; b1: number; timer?: "run" | "flashback" | "returns" | "zero" | "none"; timerAt?: number; children?: React.ReactNode; overlay?: React.ReactNode }> = ({ mode, b0, b1, timer = "run", timerAt, children, overlay }) => {
  const f = useCurrentFrame();
  const s = (0.95 + 0.05 * sp(f, b0, 14, 200)) * (1 + 0.03 * r(f, b0, b1, 0, 1, Easing.linear));
  return (
    <AbsoluteFill>
      <Bg mode={mode} />
      <AbsoluteFill style={{ scale: `${s}` }}>{children}</AbsoluteFill>
      {overlay}
      {timer !== "none" ? <OxygenTimer mode={mode} state={timer} at={timerAt ?? b0} /> : null}
    </AbsoluteFill>
  );
};

// ---------- big stopwatch (hook) ----------
export const Stopwatch: React.FC<{ cx: number; cy: number; R: number; value: number; color?: string; mode?: Mode }> = ({ cx, cy, R, value, color = C.red, mode = "light" }) => {
  const ink = mode === "light" ? LIGHT.ink : SPACE.text;
  const a = (value / 5) * Math.PI * 2 - Math.PI / 2;
  return (
    <>
      <svg style={{ position: "absolute", left: cx - R * 1.2, top: cy - R * 1.35, overflow: "visible" }} width={R * 2.4} height={R * 2.6}>
        <g transform={`translate(${R * 1.2} ${R * 1.35})`}>
          <rect x={-R * 0.16} y={-R * 1.3} width={R * 0.32} height={R * 0.2} rx={6} fill={ink} />
          <rect x={-R * 0.06} y={-R * 1.14} width={R * 0.12} height={R * 0.16} fill={ink} />
          <circle r={R} fill={mode === "light" ? "#FFF" : SPACE.card} stroke={ink} strokeWidth={R * 0.07} />
          <path d={`M 0 ${-R * 0.86} A ${R * 0.86} ${R * 0.86} 0 ${value > 2.5 ? 1 : 0} 1 ${Math.cos(a) * R * 0.86} ${Math.sin(a) * R * 0.86}`} fill="none" stroke={color} strokeWidth={R * 0.12} strokeLinecap="round" opacity={value > 0.01 ? 1 : 0} />
          {Array.from({ length: 5 }, (_, i) => { const t = (i / 5) * Math.PI * 2 - Math.PI / 2; return <line key={i} x1={Math.cos(t) * R * 0.66} y1={Math.sin(t) * R * 0.66} x2={Math.cos(t) * R * 0.78} y2={Math.sin(t) * R * 0.78} stroke={ink} strokeWidth={R * 0.04} strokeLinecap="round" />; })}
          <line x1={0} y1={0} x2={Math.cos(a) * R * 0.62} y2={Math.sin(a) * R * 0.62} stroke={color} strokeWidth={R * 0.06} strokeLinecap="round" />
          <circle r={R * 0.07} fill={ink} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: cx - R, top: cy + R * 1.08, width: R * 2, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: R * 0.4, color, fontVariantNumeric: "tabular-nums" }}>{value.toFixed(2)}s</div>
    </>
  );
};

// ---------- pressure gauge (dial 0–100%) ----------
export const Gauge: React.FC<{ cx: number; cy: number; R: number; value: number; mode?: Mode }> = ({ cx, cy, R, value, mode = "light" }) => {
  const ink = mode === "light" ? LIGHT.ink : SPACE.text;
  const a0 = Math.PI * 0.8, a1 = Math.PI * 2.2, a = a0 + (a1 - a0) * (value / 100);
  const arc = (from: number, to: number, rad: number) => `M ${Math.cos(from) * rad} ${Math.sin(from) * rad} A ${rad} ${rad} 0 ${to - from > Math.PI ? 1 : 0} 1 ${Math.cos(to) * rad} ${Math.sin(to) * rad}`;
  return (
    <svg style={{ position: "absolute", left: cx - R * 1.15, top: cy - R * 1.15, overflow: "visible" }} width={R * 2.3} height={R * 2.3}>
      <g transform={`translate(${R * 1.15} ${R * 1.15})`}>
        <circle r={R} fill={mode === "light" ? "#FFF" : SPACE.card} stroke={ink} strokeWidth={R * 0.06} />
        <path d={arc(a0, a1, R * 0.8)} fill="none" stroke="#E2E8F0" strokeWidth={R * 0.12} strokeLinecap="round" />
        <path d={arc(a0, a, R * 0.8)} fill="none" stroke={value < 90 ? C.red : C.blue} strokeWidth={R * 0.12} strokeLinecap="round" />
        {[0, 25, 50, 75, 100].map((v) => { const t = a0 + (a1 - a0) * (v / 100); return <line key={v} x1={Math.cos(t) * R * 0.6} y1={Math.sin(t) * R * 0.6} x2={Math.cos(t) * R * 0.68} y2={Math.sin(t) * R * 0.68} stroke={ink} strokeWidth={R * 0.03} />; })}
        <line x1={0} y1={0} x2={Math.cos(a) * R * 0.62} y2={Math.sin(a) * R * 0.62} stroke={ink} strokeWidth={R * 0.05} strokeLinecap="round" />
        <circle r={R * 0.08} fill={ink} />
      </g>
    </svg>
  );
};

// ---------- NASA Galileo (1991): spacecraft with its umbrella antenna stuck half-open ----------
export const Galileo: React.FC<{ cx: number; cy: number; s: number; t: number; open: number; stuck?: number[] }> = ({ cx, cy, s, t, open, stuck = [2, 6, 9] }) => (
  <svg style={{ position: "absolute", left: cx - s * 2, top: cy - s * 2, overflow: "visible" }} width={s * 4} height={s * 4}>
    <g transform={`translate(${s * 2} ${s * 2}) rotate(${-8 + 4 * Math.sin(t * 0.6)})`}>
      {/* antenna ribs: most open, a few stay stuck along the mast */}
      {Array.from({ length: 18 }, (_, i) => { const isStuck = stuck.includes(i % 12); const ang = -Math.PI / 2 + ((i - 8.5) / 17) * Math.PI * (isStuck ? 0.12 : 1.05 * open); const L = s * 1.15; return <line key={i} x1={0} y1={-s * 0.15} x2={Math.cos(ang) * L} y2={-s * 0.15 + Math.sin(ang) * L * 0.6 - (isStuck ? s * 0.25 : 0)} stroke={isStuck ? C.red : "#E2E8F0"} strokeWidth={s * (isStuck ? 0.05 : 0.03)} strokeLinecap="round" />; })}
      <path d={`M ${-s * 1.1 * open} ${-s * 0.15 - s * 0.55 * open} Q 0 ${-s * 0.9} ${s * 1.1 * open} ${-s * 0.15 - s * 0.55 * open}`} fill="none" stroke="#94A3B8" strokeWidth={s * 0.02} opacity={0.7} />
      <line x1={0} y1={-s * 1.2} x2={0} y2={s * 0.2} stroke="#E2E8F0" strokeWidth={s * 0.05} />
      <rect x={-s * 0.32} y={s * 0.1} width={s * 0.64} height={s * 0.5} rx={s * 0.05} fill="#CBD5E1" stroke="#141824" strokeWidth={s * 0.04} />
      <rect x={-s * 0.9} y={s * 0.26} width={s * 0.5} height={s * 0.18} fill={C.blue} stroke="#141824" strokeWidth={s * 0.03} />
      <rect x={s * 0.4} y={s * 0.26} width={s * 0.5} height={s * 0.18} fill={C.blue} stroke="#141824" strokeWidth={s * 0.03} />
      <line x1={-s * 0.1} y1={s * 0.6} x2={-s * 0.32} y2={s * 0.98} stroke="#E2E8F0" strokeWidth={s * 0.04} />
      <circle cx={-s * 0.32} cy={s * 0.98} r={s * 0.07} fill={C.amber} stroke="#141824" strokeWidth={s * 0.03} />
    </g>
  </svg>
);

/** the sky on fire: a red/amber rolling gradient band over a dark planet limb */
export const FireSky: React.FC<{ k: number; t: number }> = ({ k, t }) => (
  <>
    <AbsoluteFill style={{ background: `linear-gradient(180deg, rgba(229,57,53,${0.75 * k}) 0%, rgba(245,158,11,${0.55 * k}) ${38 + 6 * Math.sin(t * 1.3)}%, rgba(14,19,31,0) 78%)` }} />
    {Array.from({ length: 9 }, (_, i) => { const ph = (t * 0.35 + i / 9) % 1; return <div key={i} style={{ position: "absolute", left: -200 + ((i * 263) % 2100), top: 520 - 420 * ph, width: 360, height: 160, borderRadius: 999, background: `radial-gradient(ellipse, rgba(253,186,116,${0.55 * k * (1 - ph)}) 0%, rgba(229,57,53,0) 70%)` }} />; })}
  </>
);

export const lerp = (f: number, pts: [number, number][]) => interpolate(f, pts.map((p) => p[0]), pts.map((p) => p[1]), { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
export { F };
