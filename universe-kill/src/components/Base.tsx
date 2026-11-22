import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { C, CARD_RADIUS, FONT, LIGHT, Mode, SPACE, r, sp } from "../lib/core";

// ---------- backgrounds (static: no drift, no boil) ----------
export const LightBg: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: LIGHT.bg, backgroundImage: `radial-gradient(circle, rgba(230,226,216,0.9) 2px, transparent 2.6px)`, backgroundSize: "34px 34px" }} />
);
export const SpaceBg: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: SPACE.bg }}>
    {Array.from({ length: 140 }, (_, i) => {
      const q = (n: number) => { const v = Math.sin((i + 1) * 78.233 * n) * 43758.5453; return v - Math.floor(v); };
      const s = 2 + Math.floor(q(3) * 3);
      return <div key={i} style={{ position: "absolute", left: q(1) * 1920, top: q(2) * 1080, width: s, height: s, borderRadius: 9, background: "#F6F4EF", opacity: 0.25 + q(4) * 0.45 }} />;
    })}
  </AbsoluteFill>
);
export const Bg: React.FC<{ mode: Mode }> = ({ mode }) => (mode === "light" ? <LightBg /> : <SpaceBg />);

// ---------- WARNING TIME badge: always TOP-RIGHT (top 48, right 64) ----------
export const WarningBadge: React.FC<{ value: string; at: number; mode: Mode; danger?: boolean }> = ({ value, at, mode, danger }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = sp(f, at, 13, 220);
  const glow = danger ? 0.35 + 0.35 * (0.5 + 0.5 * Math.sin(((f - at) / 30) * Math.PI * 2 * 0.8)) : 0;
  const light = mode === "light";
  return (
    <div style={{ position: "absolute", top: 48, right: 64, transformOrigin: "100% 0%", scale: `${0.75 + 0.25 * k}`, opacity: Math.min(1, k * 1.5) }}>
      <div style={{ display: "flex", alignItems: "stretch", borderRadius: 16, overflow: "hidden", border: `3px solid ${light ? LIGHT.ink : SPACE.border}`, boxShadow: `4px 4px 0 ${light ? LIGHT.ink : SPACE.shadow}${danger ? `, 0 0 ${28 * glow}px rgba(229,57,53,${glow})` : ""}` }}>
        <div style={{ background: C.red, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 22, letterSpacing: 1, padding: "10px 14px", display: "flex", alignItems: "center", lineHeight: 1.05, textAlign: "center" }}>WARNING<br />TIME</div>
        <div style={{ background: light ? LIGHT.card : SPACE.card, color: light ? LIGHT.ink : SPACE.text, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, padding: "10px 20px", display: "flex", alignItems: "center", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{value}</div>
      </div>
    </div>
  );
};

// ---------- pill tag (chapter number / callouts) ----------
export const Pill: React.FC<{ text: string; color?: string; size?: number; style?: React.CSSProperties }> = ({ text, color = C.blue, size = 28, style }) => (
  <span style={{ display: "inline-block", background: color, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: size, letterSpacing: 0.5, padding: `${size * 0.28}px ${size * 0.7}px`, borderRadius: 999, whiteSpace: "nowrap", textTransform: "uppercase", ...style }}>{text}</span>
);

// ---------- card ----------
export const Card: React.FC<{ x: number; y: number; w: number; h: number; mode?: Mode; children?: React.ReactNode; style?: React.CSSProperties; border?: string }> = ({ x, y, w, h, mode = "light", children, style, border }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: CARD_RADIUS, background: mode === "light" ? LIGHT.card : SPACE.card, border: `3px solid ${border ?? (mode === "light" ? LIGHT.ink : SPACE.border)}`, boxShadow: `4px 4px 0 ${mode === "light" ? LIGHT.ink : SPACE.shadow}`, overflow: "hidden", boxSizing: "border-box", ...style }}>{children}</div>
);

// ---------- kinetic typography: a word/number pops in with a strong spring at its spoken frame ----------
export const Pop: React.FC<{ at: number; x: number; y: number; w?: number; size: number; color?: string; mono?: boolean; align?: "left" | "center" | "right"; children: React.ReactNode; from?: "up" | "down" | "scale"; weight?: number; shadow?: string }> = ({ at, x, y, w = 1600, size, color = LIGHT.ink, mono, align = "left", children, from = "up", shadow }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = sp(f, at, 11, 240, 0.7);
  const dy = from === "up" ? (1 - k) * 40 : from === "down" ? -(1 - k) * 40 : 0;
  const sc = from === "scale" ? 0.4 + 0.6 * k : 0.85 + 0.15 * k;
  const ox = align === "left" ? "0%" : align === "right" ? "100%" : "50%";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: align, translate: `0 ${dy}px`, scale: `${sc}`, transformOrigin: `${ox} 50%`, opacity: Math.min(1, k * 2), fontFamily: mono ? FONT.mono : FONT.head, fontWeight: 700, fontSize: size, color, lineHeight: 1.0, letterSpacing: mono ? 0 : -1, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", textShadow: shadow }}>{children}</div>
  );
};

// ---------- count-up number (tabular-nums so digits never jitter) ----------
export const Count: React.FC<{ a: number; b: number; from?: number; to: number; fmt: (v: number) => string; x: number; y: number; w?: number; size: number; color?: string; align?: "left" | "center" | "right" }> = ({ a, b, from = 0, to, fmt, x, y, w = 800, size, color = LIGHT.ink, align = "left" }) => {
  const f = useCurrentFrame();
  if (f < a) return null;
  const v = r(f, a, b, from, to, Easing.out(Easing.quad));
  const k = sp(f, a, 11, 240, 0.7);
  return <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: align, fontFamily: FONT.mono, fontWeight: 700, fontSize: size, color, lineHeight: 1, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap", scale: `${0.8 + 0.2 * k}`, transformOrigin: align === "center" ? "50% 50%" : "0% 50%" }}>{fmt(v)}</div>;
};

// ---------- stamp (slams in with a spring, rotation fixed — no wobble) ----------
export const Stamp: React.FC<{ at: number; x: number; y: number; text: string; color?: string; size?: number; rot?: number; bg?: string }> = ({ at, x, y, text, color = C.red, size = 56, rot = -6, bg = "rgba(246,244,239,0.92)" }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = sp(f, at, 9, 260, 0.7);
  return <div style={{ position: "absolute", left: x, top: y, rotate: `${rot}deg`, scale: `${2 - k}`, opacity: Math.min(1, k * 2.5), transformOrigin: "50% 50%", border: `7px solid ${color}`, color, background: bg, fontFamily: FONT.head, fontWeight: 700, fontSize: size, lineHeight: 1, padding: "10px 24px 12px", borderRadius: 14, whiteSpace: "nowrap" }}>{text}</div>;
};

/** Card Pop for a whole beat: 0.92 -> 1 spring on the cut, plus a slow push so no frame is ever static */
export const BeatCam: React.FC<{ b0: number; b1: number; origin?: string; push?: number; children: React.ReactNode }> = ({ b0, b1, origin = "50% 50%", push = 0.03, children }) => {
  const f = useCurrentFrame();
  const pop = 0.94 + 0.06 * sp(f, b0, 14, 200);
  const p = r(f, b0, b1, 1, 1 + push, Easing.linear);
  return <AbsoluteFill style={{ scale: `${pop * p}`, transformOrigin: origin }}>{children}</AbsoluteFill>;
};
