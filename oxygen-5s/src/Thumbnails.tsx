import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { LightBg, SpaceBg } from "./components/Base";
import { At, Flame, Lungs } from "./components/Draw";
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

const rnd = (i: number, n: number) => { const v = Math.sin((i + 1) * 78.233 * n) * 43758.5453; return v - Math.floor(v); };
const Ruins: React.FC<{ y: number; col: string }> = ({ y, col }) => (
  <svg style={{ position: "absolute", left: 0, top: 0 }} width="1280" height="720">
    <path d={`M 0 ${y} L 0 ${y - 210} L 60 ${y - 210} L 60 ${y - 150} L 110 ${y - 170} L 120 ${y - 280} L 190 ${y - 300} L 200 ${y - 120} L 300 ${y - 140} L 320 ${y - 230} L 360 ${y - 215} L 380 ${y - 90} L 520 ${y - 110} L 540 ${y - 200} L 600 ${y - 190} L 640 ${y - 60} L 1280 ${y - 60} L 1280 ${y} Z`} fill={col} />
    <path d={`M 1040 ${y} L 1040 ${y - 330} L 1110 ${y - 360} L 1150 ${y - 300} L 1160 ${y - 420} L 1230 ${y - 400} L 1240 ${y - 250} L 1280 ${y - 260} L 1280 ${y} Z`} fill={col} />
  </svg>
);

// D — (owner concept) "65% GONE in 0.00 seconds": the fixed character dissolves into oxygen atoms over a burning, ruined sky.
export const ThumbD: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(ellipse at 55% 35%, #B4321F 0%, #6B1A14 45%, #1A0A0D 100%)" }}>
    <Ruins y={720} col="#1B0D10" />
    {Array.from({ length: 60 }, (_, i) => <div key={i} style={{ position: "absolute", left: rnd(i, 1) * 1280, top: rnd(i, 2) * 720, width: 3 + rnd(i, 3) * 5, height: 3 + rnd(i, 3) * 5, borderRadius: 9, background: rnd(i, 4) > 0.5 ? "#FDBA74" : "#F97316", opacity: 0.55 + 0.4 * rnd(i, 5) }} />)}
    <Sprite src="assets/character/light/shocked.png" x={560} y={30} h={1120} mask="linear-gradient(90deg, #000 0%, #000 56%, rgba(0,0,0,0.25) 70%, rgba(0,0,0,0) 80%)" />
    {Array.from({ length: 70 }, (_, i) => { const x = 930 + rnd(i, 6) * 330, y = 40 + rnd(i, 7) * 640, sz = 8 + rnd(i, 8) * 16; return rnd(i, 9) > 0.62
      ? <At key={i} x={x} y={y} r={10 + rnd(i, 8) * 12} o={0.9} />
      : <div key={i} style={{ position: "absolute", left: x, top: y, width: sz, height: sz, background: rnd(i, 10) > 0.5 ? "#F6F4EF" : C.red, opacity: 0.85 }} />; })}
    <Word x={36} y={30} size={210} color="#FFF" shadow>65%</Word>
    <Word x={36} y={225} size={210} color={C.red} shadow>GONE</Word>
    <div style={{ position: "absolute", left: 46, top: 470, rotate: "-4deg", background: "#FACC15", border: `6px solid ${INK}`, borderRadius: 14, boxShadow: `6px 6px 0 ${INK}`, padding: "8px 22px 12px", fontFamily: FONT.head, fontWeight: 700, fontSize: 64, color: INK, whiteSpace: "nowrap" }}>IN 0.00 SECONDS</div>
  </AbsoluteFill>
);

// E — (owner concept, simplified) "YOU DON'T SUFFOCATE.": lungs crossed out, the city crumbling behind.
export const ThumbE: React.FC = () => (
  <AbsoluteFill>
    <LightBg />
    <div style={{ position: "absolute", left: 500, top: 0, width: 780, height: 720, background: "linear-gradient(180deg, #1F2937 0%, #7C2D12 70%, #F97316 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 34%)", maskImage: "linear-gradient(90deg, transparent 0%, #000 34%)" }} />
    <div style={{ position: "absolute", inset: 0, rotate: "0deg" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: 1280, height: 720, transformOrigin: "980px 640px", rotate: "-4deg" }}><City x={980} y={650} s={150} lights={0} /></div>
    </div>
    {[[720, 640], [880, 660], [1040, 640], [1190, 660]].map(([x, y], i) => <Dust key={i} x={x} y={y} s={150} t={i * 1.3} />)}
    {Array.from({ length: 24 }, (_, i) => <div key={i} style={{ position: "absolute", left: 680 + rnd(i, 1) * 580, top: 60 + rnd(i, 2) * 420, width: 10 + rnd(i, 3) * 18, height: 10 + rnd(i, 3) * 14, rotate: `${rnd(i, 4) * 90}deg`, background: "#78716C", border: `3px solid ${INK}` }} />)}
    <Sprite src="assets/character/light/the_catch.png" x={20} y={250} h={900} />
    <Lungs x={520} y={500} s={95} t={0} />
    <svg style={{ position: "absolute", left: 0, top: 0 }} width="1280" height="720"><path d="M 420 390 L 620 620 M 620 390 L 420 620" stroke={C.red} strokeWidth="26" strokeLinecap="round" /></svg>
    <div style={{ position: "absolute", left: 30, top: 30, width: 1220, height: 230 }}>
      <Word x={0} y={0} size={104}>YOU DON&apos;T</Word>
      <Word x={0} y={104} size={112} color={C.red}>SUFFOCATE</Word>
    </div>
  </AbsoluteFill>
);
