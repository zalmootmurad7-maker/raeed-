import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { LightBg, SpaceBg } from "./components/Base";
import { At, Flame } from "./components/Draw";
import { City, Dust, Earth } from "./components/Prims";
import { C, FONT, LIGHT } from "./lib/core";

// Long-video thumbnails 1280x720 (render --scale=2 -> 2560x1440). Phone-first: 2–3 huge words top-left,
// one saturated focal point, the fixed character big with a clear reaction, nothing in the bottom-right corner.
const INK = LIGHT.ink;
const Word: React.FC<{ x: number; y: number; size: number; color?: string; children: React.ReactNode; shadow?: boolean }> = ({ x, y, size, color = INK, children, shadow }) => (
  <div style={{ position: "absolute", left: x, top: y, fontFamily: FONT.head, fontWeight: 700, fontSize: size, color, lineHeight: 0.95, letterSpacing: -3, whiteSpace: "nowrap", textShadow: shadow ? "0 6px 0 rgba(0,0,0,0.55)" : undefined }}>{children}</div>
);
const Timer: React.FC<{ x: number; y: number; scale: number; value: string; dark?: boolean }> = ({ x, y, scale, value, dark }) => (
  <div style={{ position: "absolute", left: x, top: y, transformOrigin: "0 0", scale: `${scale}`, display: "flex", borderRadius: 16, overflow: "hidden", border: `3px solid ${dark ? "#E2E8F0" : INK}`, boxShadow: `4px 4px 0 ${dark ? "#060911" : INK}` }}>
    <div style={{ background: C.red, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 22, padding: "10px 14px", lineHeight: 1.05, textAlign: "center" }}>OXYGEN<br />OFF</div>
    <div style={{ background: dark ? "#161E2E" : "#FFF", color: dark ? "#F6F4EF" : INK, fontFamily: FONT.mono, fontWeight: 700, fontSize: 38, padding: "8px 18px", display: "flex", alignItems: "center" }}>{value}</div>
  </div>
);
const Sprite: React.FC<{ src: string; x: number; y: number; h?: number; w?: number; flip?: boolean; mask?: string }> = ({ src, x, y, h, w, flip, mask }) => (
  <Img src={staticFile(src)} style={{ position: "absolute", left: x, top: y, height: h, width: w, transform: flip ? "scaleX(-1)" : undefined, WebkitMaskImage: mask, maskImage: mask }} />
);

// A — the sky catches fire: Earth wrapped in a burning hydrogen shell, shocked on the couch.
export const ThumbA: React.FC = () => (
  <AbsoluteFill>
    <SpaceBg />
    <div style={{ position: "absolute", left: 860 - 300, top: 400 - 300, width: 600, height: 600, borderRadius: 9999, background: "radial-gradient(circle, rgba(253,224,71,0.95) 38%, rgba(245,158,11,0.9) 50%, rgba(229,57,53,0.85) 60%, rgba(229,57,53,0) 72%)" }} />
    {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * 6.283 + 0.2; return <Flame key={i} x={860 + Math.cos(a) * 225} y={400 + Math.sin(a) * 225 + 20} s={70} t={i * 0.7} k={1} />; })}
    <Earth cx={860} cy={400} R={170} t={0.6} />
    <Sprite src="assets/character/couch/couch_shocked.png" x={-70} y={318} w={600} flip />
    <Word x={40} y={36} size={112} color="#F6F4EF" shadow>SKY ON</Word>
    <Word x={40} y={146} size={112} color={C.red} shadow>FIRE?!</Word>
  </AbsoluteFill>
);

// B — every building crumbles to powder as its oxygen atoms fly out.
export const ThumbB: React.FC = () => (
  <AbsoluteFill>
    <LightBg />
    <City x={830} y={610} s={150} lights={0} />
    {[[690, 560], [840, 585], [990, 560], [1120, 590]].map(([x, y], i) => <Dust key={i} x={x} y={y} s={120} t={i} />)}
    {Array.from({ length: 16 }, (_, i) => { const v = (n: number) => { const s = Math.sin((i + 1) * 78.233 * n) * 43758.5453; return s - Math.floor(s); }; return <At key={i} x={580 + v(1) * 620} y={90 + v(2) * 300} r={22 + v(3) * 10} />; })}
    <Sprite src="assets/character/couch/couch_shocked.png" x={-80} y={330} w={560} flip />
    <Word x={36} y={40} size={118}>NO</Word>
    <Word x={36} y={150} size={118} color={C.red}>OXYGEN?!</Word>
  </AbsoluteFill>
);

// C — the twist: you're 65% oxygen, so you'd vanish first (the fixed sprite fades out into red O atoms).
export const ThumbC: React.FC = () => (
  <AbsoluteFill>
    <SpaceBg />
    <div style={{ position: "absolute", left: 700, top: 60, width: 560, height: 560, borderRadius: 9999, background: "radial-gradient(circle, rgba(229,57,53,0.35) 0%, rgba(229,57,53,0) 65%)" }} />
    <Sprite src="assets/character/light/shocked.png" x={760} y={40} h={680} mask="linear-gradient(180deg, #000 0%, #000 42%, rgba(0,0,0,0.15) 72%, rgba(0,0,0,0) 86%)" />
    {Array.from({ length: 22 }, (_, i) => { const v = (n: number) => { const s = Math.sin((i + 3) * 12.9898 * n) * 43758.5453; return s - Math.floor(s); }; return <At key={i} x={780 + v(1) * 430} y={330 + v(2) * 300} r={16 + v(3) * 14} o={0.7 + 0.3 * v(4)} />; })}
    <Timer x={40} y={40} scale={1.7} value="0.00s" dark />
    <Word x={40} y={190} size={112} color="#F6F4EF" shadow>YOU&apos;D</Word>
    <Word x={40} y={300} size={112} color={C.red} shadow>VANISH</Word>
    <Word x={40} y={410} size={112} color="#F6F4EF" shadow>FIRST</Word>
  </AbsoluteFill>
);
