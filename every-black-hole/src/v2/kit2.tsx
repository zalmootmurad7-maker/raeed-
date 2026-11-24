import React, { createContext, useContext } from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile } from "remotion";
import { ACCENT, CAM_BEZIER, FONT, FPS, LIGHT, SPACE, SPRING } from "../tokens";
import type { Pose } from "../shots";

// v2 kit: zero jitter. UI springs = SPRING, camera = CAM_EASE.
export const CAM_EASE = Easing.bezier(...CAM_BEZIER);
export type Mode2 = "L" | "S" | "B";
type Word = { word: string; start: number; end: number };
export type Ctx = { f: number; dur: number; mode: Mode2; at: (w: string, nth?: number) => number; words: Word[] };
export const ShotCtx2 = createContext<Ctx>({ f: 0, dur: 90, mode: "L", at: () => 0, words: [] });
export const useC = () => useContext(ShotCtx2);
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
export const rr = (f: number, a: number, b: number, from = 0, to = 1, e: (t: number) => number = Easing.out(Easing.cubic)) => interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: e });
export const spr = (f: number, at: number, cfg: { damping: number; stiffness: number; mass: number } = SPRING) => (f < at ? 0 : spring({ frame: f - at, fps: FPS, config: cfg }));
export const INK = LIGHT.ink;
export const txt = (m: Mode2) => (m === "S" ? SPACE.text : LIGHT.ink);
export const sub = (m: Mode2) => (m === "S" ? "#94A3B8" : "#4B5563");

// ---------- backgrounds ----------
export const LightBG: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: LIGHT.bg, backgroundImage: `radial-gradient(circle, ${LIGHT.grid} 2px, transparent 2.6px)`, backgroundSize: "36px 36px" }} />
);
export const SpaceBG: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: SPACE.bg }}>
    {Array.from({ length: 150 }, (_, i) => {
      const q = (n: number) => { const v = Math.sin((i + 1) * 78.233 * n) * 43758.5453; return v - Math.floor(v); };
      const s = 2 + Math.floor(q(3) * 3);
      return <div key={i} style={{ position: "absolute", left: q(1) * 1920, top: q(2) * 1080, width: s, height: s, borderRadius: 9, background: "#F6F4EF", opacity: 0.2 + q(4) * 0.5 }} />;
    })}
  </AbsoluteFill>
);
/** stage: background + continuous drift 1.00 -> 1.04 + optional hard-cut punch (scale 1.05 -> 1, 5 frames) */
export const Stage: React.FC<{ children?: React.ReactNode; overlay?: React.ReactNode; origin?: string; punch?: boolean; drift?: number }> = ({ children, overlay, origin = "50% 50%", punch = true, drift = 0.04 }) => {
  const { f, dur, mode } = useC();
  const s = (1 + drift * rr(f, 0, dur, 0, 1, Easing.linear)) * (punch ? 1 + 0.05 * (1 - rr(f, 0, 5, 0, 1, CAM_EASE)) : 1);
  return (
    <AbsoluteFill>
      {mode === "S" ? <SpaceBG /> : <LightBG />}
      <AbsoluteFill style={{ scale: `${s}`, transformOrigin: origin }}>{children}</AbsoluteFill>
      {overlay}
    </AbsoluteFill>
  );
};

// ---------- typography ----------
export const T: React.FC<{ x: number; y: number; w?: number; size?: number; color?: string; at?: number; align?: "left" | "center" | "right"; mono?: boolean; kind?: "pop" | "rise" | "slam"; children: React.ReactNode; glow?: string; weight?: number; stroke?: string }> = ({ x, y, w = 900, size = 52, color, at = 0, align = "left", mono, kind = "rise", children, glow, stroke }) => {
  const { f, mode } = useC();
  if (f < at) return null;
  const k = spr(f, at);
  const st: React.CSSProperties = kind === "slam" ? { scale: `${1.6 - 0.6 * k}` } : kind === "pop" ? { scale: `${0.85 + 0.15 * k}` } : { translate: `0 ${(1 - k) * 28}px` };
  const ox = align === "left" ? "0%" : align === "right" ? "100%" : "50%";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: align, fontFamily: mono ? FONT.mono : FONT.head, fontWeight: 700, fontSize: size, lineHeight: 1.04, letterSpacing: mono ? 0 : -1, color: color ?? txt(mode), fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", opacity: Math.min(1, k * 2.2), transformOrigin: `${ox} 50%`, textShadow: glow ? `0 0 28px ${glow}, 0 0 60px ${glow}` : undefined, WebkitTextStroke: stroke ? `${Math.max(3, size * 0.045)}px ${stroke}` : undefined, paintOrder: "stroke fill", ...st }}>{children}</div>
  );
};
/** hero number: mono, gold glow, optional count-up */
export const Hero: React.FC<{ x: number; y: number; w?: number; at: number; to?: number; from?: number; fmt?: (v: number) => string; text?: string; color?: string; size?: number; align?: "left" | "center" | "right"; countFrames?: number }> = ({ x, y, w = 900, at, to, from = 0, fmt, text, color = ACCENT.gold, size = 110, align = "center", countFrames = 18 }) => {
  const { f, mode } = useC();
  if (f < at) return null;
  const v = to !== undefined ? rr(f, at, at + countFrames, from, to, Easing.out(Easing.quad)) : 0;
  const s = text ?? (fmt ? fmt(v) : Math.round(v).toLocaleString("en-US"));
  const fit = Math.min(size, Math.floor(w / (Math.max(4, s.length) * 0.62)));
  return <T x={x} y={y} w={w} at={at} size={fit} color={color} align={align} mono kind="pop" glow={mode === "S" ? `${color}88` : undefined} stroke={mode === "S" ? undefined : INK}>{s}</T>;
};
export const Pill: React.FC<{ x: number; y: number; at: number; text: string; color?: string; size?: number }> = ({ x, y, at, text, color = ACCENT.red, size = 40 }) => {
  const { f } = useC();
  if (f < at) return null;
  const k = spr(f, at);
  return <div style={{ position: "absolute", left: x, top: y, scale: `${0.6 + 0.4 * k}`, opacity: Math.min(1, k * 2), transformOrigin: "0% 50%", background: color, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: size, padding: `${size * 0.28}px ${size * 0.75}px`, borderRadius: 999, border: `4px solid ${INK}`, boxShadow: `4px 4px 0 ${INK}`, whiteSpace: "nowrap", letterSpacing: 1 }}>{text}</div>;
};
/** big red THE CATCH pill dropping from the top (sub-bass impact) */
export const Catch: React.FC<{ line: string; at?: number }> = ({ line, at = 0 }) => {
  const { f, at: w } = useC();
  const k = spr(f, at, { damping: 12, stiffness: 200, mass: 0.8 });
  return (
    <>
      <div style={{ position: "absolute", left: 960, top: 300, translate: `-50% ${-220 * (1 - k)}px`, opacity: Math.min(1, k * 2), background: ACCENT.red, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 110, padding: "18px 64px 26px", borderRadius: 999, border: `5px solid ${INK}`, boxShadow: `6px 6px 0 ${INK}, 0 0 60px rgba(230,57,70,0.55)`, whiteSpace: "nowrap", letterSpacing: 2 }}>THE CATCH</div>
      <T x={360} y={560} w={1440} size={72} align="center" at={Math.max(at + 6, w(line.split(" ")[0].toLowerCase()))}>{line}</T>
    </>
  );
};
/** oversized chapter title slam on the exact word of the type's name */
export const TitleSlam: React.FC<{ n: number; name: string; color: string; nameWord: string; icon?: React.ReactNode }> = ({ n, name, color, nameWord, icon }) => {
  const { f, at, mode } = useC();
  const t = at(nameWord);
  const k = spr(f, t, { damping: 13, stiffness: 220, mass: 0.7 });
  const line = rr(f, t + 4, t + 14, 0, 1, CAM_EASE);
  return (
    <Stage>
      <T x={0} y={250} w={1920} size={56} align="center" color={sub(mode)} kind="pop">NUMBER {String(n).padStart(2, "0")}</T>
      <div style={{ position: "absolute", left: 960 - 520, top: 780 - 300, width: 1040, height: 600, borderRadius: 999, background: `radial-gradient(ellipse, ${color}44 0%, ${color}00 65%)`, opacity: f >= t ? 1 : 0 }} />
      {f >= t ? <div style={{ position: "absolute", left: 0, top: 360, width: 1920, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: Math.min(110, Math.floor(1760 / (name.length * 0.6))), letterSpacing: -2, color: txt(mode), scale: `${1.25 - 0.25 * k}`, opacity: Math.min(1, k * 2.5), textShadow: mode === "S" ? `0 0 40px ${color}66` : undefined, whiteSpace: "nowrap" }}>{name}</div> : null}
      <div style={{ position: "absolute", left: 960 - 380 * line, top: 510, width: 760 * line, height: 14, borderRadius: 7, background: color, border: `3px solid ${INK}` }} />
      {icon && f >= t ? <div style={{ position: "absolute", left: 960, top: 760, translate: "-50% -50%", scale: `${0.5 + 0.5 * spr(f, t + 6)}` }}>{icon}</div> : null}
    </Stage>
  );
};

// ---------- character: hero (≈28% width) for 1.5–2.5 s, then springs to the dock (≈17% width), or off ----------
const AR: Record<Pose, number> = { explaining: 1243 / 2000, shocked: 1311 / 2000, the_catch: 732 / 2000, thinking: 833 / 2000 };
export const Rig: React.FC<{ pose: Pose; state: "H" | "D"; heroFor?: number; flip?: boolean }> = ({ pose, state, heroFor = 1.9 }) => {
  const { f, mode } = useC();
  const dock = state === "D" ? 1 : spr(f, Math.round(heroFor * FPS), { damping: 15, stiffness: 160, mass: 0.8 });
  const enter = rr(f, 0, 10, 0.96, 1, CAM_EASE);
  const heroH = Math.min(760, (1920 * 0.28) / AR[pose]), dockH = Math.min(420, (1920 * 0.17) / AR[pose]);
  const h = heroH + (dockH - heroH) * dock;
  const cx = 330 + (40 + (dockH * AR[pose]) / 2 - 330) * dock;
  const float = mode === "S" ? 5 * Math.sin((f / FPS) * ((2 * Math.PI) / 6)) : 0;
  const w = h * AR[pose];
  return <Img src={staticFile(`assets/character/${mode === "S" ? "space" : "light"}/${pose}.png`)} style={{ position: "absolute", left: cx - w / 2, top: 1060 - h + float, height: h, scale: `${enter}`, transformOrigin: "50% 100%" }} />;
};

// ---------- cosmic visuals ----------
/** rotating accretion disk with orange/gold gradient, photon ring and lensing arc (smooth, no jitter) */
export const Disk: React.FC<{ cx: number; cy: number; r: number; tilt?: number; spin?: number; glow?: number }> = ({ cx, cy, r, tilt = 0.32, spin = 1, glow = 1 }) => {
  const { f } = useC();
  const t = (f / FPS) * spin;
  const id = `d${Math.round(cx)}${Math.round(cy)}${Math.round(r)}`;
  return (
    <svg style={{ position: "absolute", left: cx - r * 2.2, top: cy - r * 2.2, overflow: "visible" }} width={r * 4.4} height={r * 4.4}>
      <defs>
        <radialGradient id={`${id}g`}><stop offset="0%" stopColor="#FACC15" stopOpacity={0.55 * glow} /><stop offset="60%" stopColor="#FB923C" stopOpacity={0.18 * glow} /><stop offset="100%" stopColor="#FB923C" stopOpacity="0" /></radialGradient>
        <linearGradient id={`${id}l`} gradientTransform={`rotate(${(t * 60) % 360} 0.5 0.5)`}><stop offset="0%" stopColor="#FFF3C4" /><stop offset="35%" stopColor="#FACC15" /><stop offset="70%" stopColor="#FB923C" /><stop offset="100%" stopColor="#E63946" /></linearGradient>
      </defs>
      <g transform={`translate(${r * 2.2} ${r * 2.2})`}>
        <circle r={r * 2.1} fill={`url(#${id}g)`} />
        <path d={`M ${-r * 1.15} 0 A ${r * 1.15} ${r * 1.15} 0 0 1 ${r * 1.15} 0`} fill="none" stroke={`url(#${id}l)`} strokeWidth={r * 0.22} opacity="0.9" />
        <ellipse rx={r * 2} ry={r * 2 * tilt} fill="none" stroke={`url(#${id}l)`} strokeWidth={r * 0.38} opacity="0.95" />
        {Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * Math.PI * 2 + t * 1.4; return <circle key={i} cx={Math.cos(a) * r * 1.85} cy={Math.sin(a) * r * 1.85 * tilt} r={r * 0.05} fill="#FFF3C4" opacity={Math.sin(a) > 0 ? 0.9 : 0.35} />; })}
        <circle r={r} fill="#05070C" stroke="#111827" strokeWidth={4} />
        <circle r={r * 1.02} fill="none" stroke="#FFF3C4" strokeWidth={r * 0.04} opacity="0.85" />
        <path d={`M ${-r * 2} 0 A ${r * 2} ${r * 2 * tilt} 0 0 0 ${r * 2} 0`} fill="none" stroke={`url(#${id}l)`} strokeWidth={r * 0.38} />
      </g>
    </svg>
  );
};
/** plain black hole dot with an optional ring */
export const Hole: React.FC<{ cx: number; cy: number; r: number; ring?: string; glow?: string }> = ({ cx, cy, r, ring = ACCENT.amber, glow }) => (
  <div style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: 9999, background: "#05070C", border: `${Math.max(3, r * 0.08)}px solid ${ring}`, boxShadow: glow ? `0 0 ${r * 0.8}px ${r * 0.25}px ${glow}` : undefined }} />
);
/** generic pop-in wrapper for any absolutely positioned drawing (springs from its centre) */
export const Pop: React.FC<{ at: number; x: number; y: number; children: React.ReactNode; from?: number }> = ({ at, x, y, children, from = 0.4 }) => {
  const { f } = useC();
  if (f < at) return null;
  const k = spr(f, at);
  return <div style={{ position: "absolute", left: x, top: y, translate: "-50% -50%", scale: `${from + (1 - from) * k}`, opacity: Math.min(1, k * 2) }}>{children}</div>;
};
/** card panel used by split-screen analogies */
export const Panel: React.FC<{ x: number; y: number; w: number; h: number; at: number; from?: "left" | "right" | "up"; dark?: boolean; children?: React.ReactNode }> = ({ x, y, w, h, at, from = "up", dark, children }) => {
  const { f } = useC();
  if (f < at) return null;
  const k = spr(f, at);
  const tr = from === "left" ? `${-(1 - k) * 260}px 0` : from === "right" ? `${(1 - k) * 260}px 0` : `0 ${(1 - k) * 60}px`;
  return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, translate: tr, opacity: Math.min(1, k * 2), borderRadius: 18, background: dark ? SPACE.card : "#FFFFFF", border: `4px solid ${dark ? SPACE.border : INK}`, boxShadow: `6px 6px 0 ${dark ? "#060911" : INK}`, overflow: "hidden" }}>{children}</div>;
};
export const Burst2: React.FC<{ cx: number; cy: number; at: number; r: number }> = ({ cx, cy, at, r }) => {
  const { f } = useC();
  if (f < at) return null;
  const k = rr(f, at, at + 14, 0, 1, CAM_EASE), o = 1 - rr(f, at + 12, at + 34);
  return (
    <svg style={{ position: "absolute", left: cx - r * 1.6, top: cy - r * 1.6, overflow: "visible", opacity: o }} width={r * 3.2} height={r * 3.2}>
      <circle cx={r * 1.6} cy={r * 1.6} r={r * 1.3 * k} fill="#FB923C" opacity={0.35} />
      {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <line key={i} x1={r * 1.6 + Math.cos(a) * r * 0.4 * k} y1={r * 1.6 + Math.sin(a) * r * 0.4 * k} x2={r * 1.6 + Math.cos(a) * r * 1.5 * k} y2={r * 1.6 + Math.sin(a) * r * 1.5 * k} stroke={i % 2 ? "#FACC15" : "#FB923C"} strokeWidth={12} strokeLinecap="round" />; })}
      <circle cx={r * 1.6} cy={r * 1.6} r={r * 0.55 * k} fill="#FFF3C4" />
    </svg>
  );
};
/** stamp that slams in, fixed rotation */
export const Stamp2: React.FC<{ x: number; y: number; at: number; text: string; color?: string; size?: number; rot?: number }> = ({ x, y, at, text, color = ACCENT.red, size = 60, rot = -6 }) => {
  const { f } = useC();
  if (f < at) return null;
  const k = spr(f, at, { damping: 12, stiffness: 240, mass: 0.7 });
  return <div style={{ position: "absolute", left: x, top: y, translate: "-50% -50%", rotate: `${rot}deg`, scale: `${1.8 - 0.8 * k}`, opacity: Math.min(1, k * 2.5), border: `7px solid ${color}`, color, background: "rgba(246,244,239,0.0)", fontFamily: FONT.head, fontWeight: 700, fontSize: size, padding: "8px 26px", borderRadius: 12, letterSpacing: 2, whiteSpace: "nowrap" }}>{text}</div>;
};
/** horizontal bar that fills (scale comparisons) */
export const Bar: React.FC<{ x: number; y: number; w: number; h?: number; at: number; k?: number; color: string; label?: string; mode?: Mode2 }> = ({ x, y, w, h = 46, at, k = 1, color, label }) => {
  const { f, mode } = useC();
  if (f < at) return null;
  const p = rr(f, at, at + 16, 0, k, CAM_EASE);
  return (
    <>
      <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: h / 2, border: `4px solid ${mode === "S" ? SPACE.border : INK}`, background: mode === "S" ? "#0B1120" : "#FFF" }} />
      <div style={{ position: "absolute", left: x + 4, top: y + 4, width: Math.max(0, (w - 8) * p), height: h - 8, borderRadius: h / 2, background: color }} />
      {label ? <T x={x} y={y + h + 14} w={w} size={34} align="center" at={at}>{label}</T> : null}
    </>
  );
};
