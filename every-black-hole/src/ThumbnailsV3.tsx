import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { ACCENT, FONT, LIGHT } from "./tokens";
import { Disk, ShotCtx2, SpaceBG, LightBG } from "./v2/kit2";
import { Whale } from "./components/Props";
import { Icon_SolarSystem } from "./components/Icons";

// v2 thumbnails (1280x720, render --scale=2). Phone-first: 2–3 huge words top-left, one saturated focal point,
// the fixed character big with a clear reaction, nothing important in the bottom-right corner (duration badge).
const INK = LIGHT.ink;
const ctx = { f: 0, dur: 1, mode: "S" as const, at: () => 0, words: [] };
const Word: React.FC<{ x: number; y: number; size: number; color?: string; children: React.ReactNode; dark?: boolean }> = ({ x, y, size, color, children, dark }) => (
  <div style={{ position: "absolute", left: x, top: y, fontFamily: FONT.head, fontWeight: 700, fontSize: size, lineHeight: 0.95, letterSpacing: -3, color: color ?? (dark ? "#F6F4EF" : INK), whiteSpace: "nowrap", WebkitTextStroke: dark ? undefined : `0px ${INK}`, textShadow: dark ? "0 6px 0 rgba(0,0,0,0.6)" : undefined }}>{children}</div>
);
const Char: React.FC<{ src: string; x: number; y: number; h: number; flip?: boolean }> = ({ src, x, y, h, flip }) => (
  <Img src={staticFile(`assets/character/${src}.png`)} style={{ position: "absolute", left: x, top: y, height: h, transform: flip ? "scaleX(-1)" : undefined }} />
);
const Burst: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <svg style={{ position: "absolute", left: cx - r * 1.6, top: cy - r * 1.6, overflow: "visible" }} width={r * 3.2} height={r * 3.2}>
    <circle cx={r * 1.6} cy={r * 1.6} r={r * 1.35} fill="#FB923C" opacity={0.35} />
    {Array.from({ length: 18 }, (_, i) => { const a = (i / 18) * Math.PI * 2; return <line key={i} x1={r * 1.6 + Math.cos(a) * r * 0.45} y1={r * 1.6 + Math.sin(a) * r * 0.45} x2={r * 1.6 + Math.cos(a) * r * 1.5} y2={r * 1.6 + Math.sin(a) * r * 1.5} stroke={i % 2 ? "#FACC15" : "#FB923C"} strokeWidth={16} strokeLinecap="round" />; })}
    <circle cx={r * 1.6} cy={r * 1.6} r={r * 0.6} fill="#FFF3C4" />
  </svg>
);

// A — a whale-mass black hole detonating in one second
export const ThumbV3A: React.FC = () => (
  <ShotCtx2.Provider value={ctx}>
    <AbsoluteFill>
      <SpaceBG />
      <Burst cx={970} cy={300} r={175} /><div style={{ position: "absolute", left: 970 - 46, top: 300 - 46, width: 92, height: 92, borderRadius: 99, background: "#05070C", border: "6px solid #FACC15" }} />
      <div style={{ position: "absolute", left: 770, top: 470 }}><Whale size={300} /></div>
      <div style={{ position: "absolute", left: 700, top: 520, fontFamily: FONT.mono, fontWeight: 700, fontSize: 64, color: "#FACC15" }}>=</div>
      <Char src="space/shocked" x={-30} y={330} h={420} />
      <Word x={36} y={36} size={124} color="#FACC15" dark>230 TONS</Word>
      <Word x={36} y={160} size={92} color={ACCENT.red} dark>1 SECOND</Word>
    </AbsoluteFill>
  </ShotCtx2.Provider>
);

// B — TON 618 swallowing a row of solar systems
export const ThumbV3B: React.FC = () => (
  <ShotCtx2.Provider value={ctx}>
    <AbsoluteFill>
      <SpaceBG />
      <Disk cx={990} cy={330} r={165} glow={1.6} />
      {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ position: "absolute", left: 470 + i * 70, top: 520 }}><Icon_SolarSystem size={64} ink="#E2E8F0" boil={false} /></div>)}
      <div style={{ position: "absolute", left: 470, top: 600, fontFamily: FONT.mono, fontWeight: 700, fontSize: 40, color: "#FACC15" }}>× 43 …</div>
      <Char src="space/shocked" x={-30} y={330} h={420} />
      <Word x={36} y={36} size={118} dark>BIGGER</Word>
      <Word x={36} y={150} size={70} color="#FACC15" dark>THAN OUR</Word>
      <Word x={36} y={225} size={70} color="#FACC15" dark>SOLAR SYSTEM</Word>
    </AbsoluteFill>
  </ShotCtx2.Provider>
);

// C — all 8, from an atom-sized dot to a monster (size ladder)
export const ThumbV3C: React.FC = () => (
  <ShotCtx2.Provider value={ctx}>
    <AbsoluteFill>
      <LightBG />
      {[6, 12, 20, 30, 42, 58, 78, 104].map((r, i, a) => {
        const x = 410 + a.slice(0, i).reduce((acc, v) => acc + 2 * v + 18, 0) + r, y = 360;
        return <div key={i} style={{ position: "absolute", left: x - r, top: y - r, width: r * 2, height: r * 2, borderRadius: 999, background: "#05070C", border: `${Math.max(3, r * 0.1)}px solid ${i === 7 ? ACCENT.red : ACCENT.amber}`, boxShadow: i === 7 ? `0 0 50px 14px ${ACCENT.amber}88` : undefined }} />;
      })}
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1"><path d="M 430 500 Q 800 560 1160 490" fill="none" stroke={ACCENT.red} strokeWidth="9" strokeLinecap="round" /><path d="M 1130 470 L 1162 490 L 1128 512" fill="none" stroke={ACCENT.red} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <Char src="light/explaining" x={-20} y={300} h={430} />
      <Word x={36} y={36} size={124}>ALL 8</Word>
      <Word x={36} y={160} size={76} color={ACCENT.red}>BLACK HOLES</Word>
    </AbsoluteFill>
  </ShotCtx2.Provider>
);
