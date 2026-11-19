import React, { createContext, useContext } from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { ACCENT, CARD, CARD_SLOT, FONT, Mode, modeColors } from "../tokens";
import type { Pose } from "../shots";
import { BG_Light_Grid, BG_Space_Dark } from "./Backgrounds";
import { CharacterRig } from "./CharacterRig";
import { ExplainerCard } from "./ExplainerCard";
import { stepped } from "./boil";

// ---------- shot timing ----------
export const ShotCtx = createContext({ dur: 90, start: 0 });
export const useShot = () => {
  const f = useCurrentFrame();
  const { dur, start } = useContext(ShotCtx);
  // t(sec): local frame of an absolute voice time (sub-beats are pinned to words in timestamps.json)
  return { f, sf: stepped(f), dur, at: (frac: number) => Math.round(frac * dur), t: (sec: number) => Math.round((sec - start) * 30) };
};
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
export const ramp = (f: number, a: number, b: number, from = 0, to = 1, ease = Easing.out(Easing.cubic)) =>
  interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: ease });

// ---------- entrances ----------
// Pop (Card Pop spring 0.92->1 over 8 frames) - smooth for UI, stepped for ink.
export const Appear: React.FC<{ at: number; kind?: "pop" | "fade" | "rise" | "slam"; ink?: boolean; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, kind = "pop", ink, children, style }) => {
  const f0 = useCurrentFrame();
  const f = ink ? stepped(f0) : f0;
  if (f < at) return null;
  const k = ramp(f, at, at + 8, 0, 1, Easing.out(Easing.back(2)));
  const o = ramp(f, at, at + 5);
  const st: React.CSSProperties =
    kind === "pop" ? { scale: `${0.92 + 0.08 * k}`, opacity: o }
    : kind === "fade" ? { opacity: o }
    : kind === "rise" ? { opacity: o, translate: `0px ${(1 - k) * 30}px` }
    : { scale: `${ramp(f, at, at + 6, 1.8, 1)}`, opacity: o };
  return <div style={{ position: "absolute", left: 0, top: 0, ...st, ...style }}>{children}</div>;
};

// ---------- text ----------
export const Txt: React.FC<{ x: number; y: number; size: number; color: string; font?: "head" | "body" | "mono"; w?: number; align?: "left" | "center" | "right"; children: React.ReactNode; weight?: number }> = ({ x, y, size, color, font = "head", w, align = "left", children, weight }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, whiteSpace: w ? "normal" : "nowrap", textAlign: align, fontFamily: FONT[font], fontWeight: weight ?? (font === "body" ? 600 : 700), fontSize: size, color, lineHeight: 1.05, fontVariantNumeric: "tabular-nums", letterSpacing: font === "head" ? -0.5 : 0 }}>{children}</div>
);
export const Counter: React.FC<{ x: number; y: number; size: number; color: string; from: number; to: number; a: number; b: number; fmt?: (v: number) => string; suffix?: string; w?: number; align?: "left" | "center" | "right" }> = ({ from, to, a, b, fmt, suffix = "", ...p }) => {
  const f = useCurrentFrame();
  const v = ramp(f, a, b, from, to, Easing.out(Easing.quad));
  const s = fmt ? fmt(v) : Math.round(v).toLocaleString("en-US");
  return <Txt {...p} font="mono">{s}{suffix}</Txt>;
};

// Red ink stamp that slams in (Stamp_Ink).
export const Stamp: React.FC<{ x: number; y: number; at: number; text: string; color?: string; size?: number; rot?: number }> = ({ x, y, at, text, color = ACCENT.red, size = 54, rot = -8 }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const s = ramp(f, at, at + 6, 1.9, 1);
  return (
    <div style={{ position: "absolute", left: x, top: y, rotate: `${rot}deg`, scale: `${s}`, opacity: ramp(f, at, at + 3), border: `6px solid ${color}`, color, fontFamily: FONT.head, fontWeight: 700, fontSize: size, padding: "6px 22px", borderRadius: 10, letterSpacing: 2, whiteSpace: "nowrap" }}>{text}</div>
  );
};

// Hand-drawn arrow that draws itself on.
export const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; at: number; color: string; w?: number; bend?: number; dash?: boolean }> = ({ x1, y1, x2, y2, at, color, w = 6, bend = 0, dash }) => {
  const f = stepped(useCurrentFrame());
  if (f < at) return null;
  const k = ramp(f, at, at + 9);
  const mx = (x1 + x2) / 2 - (y2 - y1) * bend, my = (y1 + y2) / 2 + (x2 - x1) * bend;
  const ang = Math.atan2(y2 - my, x2 - mx);
  const L = 1600;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
      <path d={`M${x1},${y1} Q${mx},${my} ${x2},${y2}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash ? "14 12" : `${L}`} strokeDashoffset={dash ? 0 : L * (1 - k)} opacity={dash ? k : 1} />
      {k > 0.95 ? <path d={`M${x2 - 22 * Math.cos(ang - 0.45)},${y2 - 22 * Math.sin(ang - 0.45)} L${x2},${y2} L${x2 - 22 * Math.cos(ang + 0.45)},${y2 - 22 * Math.sin(ang + 0.45)}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /> : null}
    </svg>
  );
};

// Radial flash / burst (grey or amber), ink -> stepped.
export const Burst: React.FC<{ x: number; y: number; at: number; r: number; color?: string; rays?: number }> = ({ x, y, at, r, color = ACCENT.amber, rays = 14 }) => {
  const f = stepped(useCurrentFrame());
  if (f < at) return null;
  const k = ramp(f, at, at + 15);
  const o = 1 - ramp(f, at + 10, at + 30);
  return (
    <svg style={{ position: "absolute", left: x - r * 1.4, top: y - r * 1.4, overflow: "visible", opacity: o }} width={r * 2.8} height={r * 2.8}>
      <circle cx={r * 1.4} cy={r * 1.4} r={r * k} fill={color} opacity={0.35} />
      {Array.from({ length: rays }, (_, i) => {
        const a = (i / rays) * Math.PI * 2;
        return <line key={i} x1={r * 1.4 + Math.cos(a) * r * 0.4 * k} y1={r * 1.4 + Math.sin(a) * r * 0.4 * k} x2={r * 1.4 + Math.cos(a) * r * 1.35 * k} y2={r * 1.4 + Math.sin(a) * r * 1.35 * k} stroke={color} strokeWidth={10} strokeLinecap="round" />;
      })}
      <circle cx={r * 1.4} cy={r * 1.4} r={r * 0.45 * k} fill="#FFF8E1" />
    </svg>
  );
};

// ---------- camera moves (smooth 30 fps) ----------
export const useCam = (opts: { push?: number; snapAt?: number; snapTo?: number }) => {
  const { f, dur } = useShot();
  const push = 1 + (opts.push ?? 0.03) * ramp(f, 0, dur, 0, 1, Easing.linear); // whole card drifts (Push-in)
  const snap = opts.snapAt !== undefined ? ramp(f, opts.snapAt, opts.snapAt + 6, 1, opts.snapTo ?? 1.18) : 1; // content only (Snap Zoom)
  return { push, snap };
};
const SnapLayer: React.FC<{ s: number; children: React.ReactNode }> = ({ s, children }) => (
  <div style={{ position: "absolute", inset: 0, scale: `${s}`, transformOrigin: "50% 55%" }}>{children}</div>
);

// ---------- shot shells ----------
// Standard shot: background + explainer card in the card slot + character on the left.
export const CardShot: React.FC<{
  mode: Mode; pose?: Pose; pill?: string; pillColor?: string; push?: number; snapAt?: number; snapTo?: number;
  poseSwap?: { at: number; pose: Pose }; children?: React.ReactNode; shake?: number; frost?: number; head?: React.ReactNode;
}> = ({ mode, pose, pill, pillColor, push, snapAt, snapTo, poseSwap, children, shake = 0, frost = 0, head }) => {
  const { f } = useShot();
  const cam = useCam({ push, snapAt, snapTo });
  const sx = shake ? Math.sin(f * 2.9) * shake : 0;
  const curPose = poseSwap && f >= poseSwap.at ? poseSwap.pose : pose;
  return (
    <AbsoluteFill style={{ translate: `${sx}px ${-sx * 0.4}px` }}>
      {mode === "space" ? <BG_Space_Dark /> : <BG_Light_Grid />}
      <div style={{ position: "absolute", left: CARD_SLOT.x, top: CARD_SLOT.y, scale: `${cam.push}`, transformOrigin: "50% 50%" }}>
        <ExplainerCard mode={mode} pill={pill ? { text: pill, color: pillColor ?? (pill === "THE CATCH" ? ACCENT.red : ACCENT.blue) } : undefined}><SnapLayer s={cam.snap}>{children}</SnapLayer>{head}</ExplainerCard>
      </div>
      {curPose ? <CharacterRig key={curPose} mode={mode} pose={curPose} x={330} bottom={1050} height={820} enterAt={poseSwap && curPose === poseSwap.pose ? poseSwap.at : 0} seed={13} /> : null}
      {frost > 0 ? <AbsoluteFill style={{ boxShadow: `inset 0 0 ${220 * frost}px ${90 * frost}px ${ACCENT.frost}`, opacity: 0.9 }} /> : null}
    </AbsoluteFill>
  );
};
// Wide shot: one big card across the frame (no character).
export const WideShot: React.FC<{ mode: Mode; pill?: string; pillColor?: string; push?: number; snapAt?: number; snapTo?: number; head?: React.ReactNode; children?: React.ReactNode }> = ({ mode, pill, pillColor, push, snapAt, snapTo, head, children }) => {
  const cam = useCam({ push, snapAt, snapTo });
  return (
    <AbsoluteFill>
      {mode === "space" ? <BG_Space_Dark /> : <BG_Light_Grid />}
      <div style={{ position: "absolute", left: 70, top: 110, scale: `${cam.push}`, transformOrigin: "50% 50%" }}>
        <ExplainerCard mode={mode} w={WIDE.w} h={WIDE.h} pill={pill ? { text: pill, color: pillColor ?? (pill === "THE CATCH" ? ACCENT.red : ACCENT.blue) } : undefined}><SnapLayer s={cam.snap}>{children}</SnapLayer>{head}</ExplainerCard>
      </div>
    </AbsoluteFill>
  );
};
export const WIDE = { w: 1780, h: 860 } as const;
export const CARDWH = { w: CARD.w, h: CARD.h } as const;
export const ink = (m: Mode) => modeColors(m).text;
export const muted = (m: Mode) => modeColors(m).muted;
