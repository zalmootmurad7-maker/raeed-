import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { LightBg, SpaceBg } from "./components/Base";
import { THREATS } from "./components/Icons";
import { Earth } from "./components/Prims";
import { C, FONT, LIGHT } from "./lib/core";

// Long-video thumbnails (1280x720, render --scale=2 -> 2560x1440). Phone-first: 2–3 huge words in the top area,
// one saturated focal point, the fixed character big with a clear reaction, nothing important in the bottom-right corner.
const INK = LIGHT.ink;
const Couch: React.FC<{ pose: string; x: number; y: number; w: number; flip?: boolean }> = ({ pose, x, y, w, flip }) => (
  <Img src={staticFile(`assets/character/couch/${pose}.png`)} style={{ position: "absolute", left: x, top: y, width: w, transform: flip ? "scaleX(-1)" : undefined }} />
);
const Word: React.FC<{ x: number; y: number; size: number; color?: string; children: React.ReactNode; bg?: string; rot?: number }> = ({ x, y, size, color = INK, children, bg, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, fontFamily: FONT.head, fontWeight: 700, fontSize: size, color, lineHeight: 0.95, letterSpacing: -3, whiteSpace: "nowrap", rotate: `${rot}deg`, background: bg, padding: bg ? "6px 22px 12px" : 0, borderRadius: bg ? 18 : 0, border: bg ? `5px solid ${INK}` : undefined, boxShadow: bg ? `6px 6px 0 ${INK}` : undefined }}>{children}</div>
);
const Badge: React.FC<{ x: number; y: number; scale: number; value: string }> = ({ x, y, scale, value }) => (
  <div style={{ position: "absolute", left: x, top: y, transformOrigin: "0 0", scale: `${scale}`, display: "flex", borderRadius: 16, overflow: "hidden", border: `3px solid ${INK}`, boxShadow: `4px 4px 0 ${INK}` }}>
    <div style={{ background: C.red, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 22, padding: "10px 14px", lineHeight: 1.05, textAlign: "center" }}>WARNING<br />TIME</div>
    <div style={{ background: "#FFF", color: INK, fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, padding: "10px 18px", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}>{value}</div>
  </div>
);

// A — the reality-reset wall swallowing your living room: "0.00 SECONDS" warning + shocked couch character.
export const ThumbA: React.FC = () => (
  <AbsoluteFill>
    <LightBg />
    <div style={{ position: "absolute", left: 760, top: 360 - 1300, width: 2600, height: 2600, borderRadius: 9999, background: "#05070C", border: `16px solid ${C.red}`, boxShadow: "0 0 70px 24px rgba(229,57,53,0.6)", boxSizing: "border-box" }} />
    {Array.from({ length: 14 }, (_, i) => <div key={i} style={{ position: "absolute", left: 830 + ((i * 97) % 420), top: 60 + ((i * 131) % 600), width: 10, height: 10, borderRadius: 2, background: i % 2 ? C.red : "#94A3B8", opacity: 0.8 }} />)}
    <Couch pose="couch_shocked" x={-40} y={250} w={860} flip />
    <Badge x={40} y={36} scale={1.9} value="0.00 SECONDS" />
    <Word x={880} y={250} size={92} color="#F6F4EF">NO</Word>
    <Word x={880} y={340} size={92} color={C.red}>WARNING</Word>
  </AbsoluteFill>
);

// B — the locked card #8 glowing red, the 7 known threats around it, the character peeking from behind the couch.
export const ThumbB: React.FC = () => (
  <AbsoluteFill>
    <LightBg />
    {THREATS.slice(0, 7).map((th, i) => { const a = -2.6 + i * 0.62; const x = 880 + Math.cos(a) * 375, y = 360 + Math.sin(a) * 262; return <div key={i} style={{ position: "absolute", left: x - 60, top: y - 60 }}><th.Icon size={120} t={0.4} /></div>; })}
    <div style={{ position: "absolute", left: 880 - 170, top: 370 - 150, width: 340, height: 300, borderRadius: 20, background: "#FFF5F5", border: `8px solid ${C.red}`, boxShadow: `6px 6px 0 ${INK}, 0 0 60px 22px rgba(229,57,53,0.5)`, boxSizing: "border-box" }}>
      <div style={{ position: "absolute", left: 0, top: 58, width: 324, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 160, color: C.red, lineHeight: 1 }}>???</div>
      <div style={{ position: "absolute", left: 16, top: 12, background: C.red, color: "#FFF", fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, padding: "2px 14px", borderRadius: 999 }}>08</div>
    </div>
    <Couch pose="couch_hide" x={-50} y={330} w={600} />
    <Word x={36} y={34} size={104}>8 WAYS</Word>
    <Word x={36} y={140} size={104} color={C.red}>TO DIE</Word>
  </AbsoluteFill>
);

// C — space: a gamma-ray beam aimed straight at a small Earth through a red crosshair; "0.00 SECONDS".
export const ThumbC: React.FC = () => (
  <AbsoluteFill>
    <SpaceBg />
    <svg style={{ position: "absolute", left: 0, top: 0 }} width="1280" height="720">
      <line x1="1330" y1="-60" x2="1010" y2="390" stroke={C.red} strokeWidth="60" strokeLinecap="round" opacity="0.25" />
      <line x1="1330" y1="-60" x2="1010" y2="390" stroke={C.red} strokeWidth="22" strokeLinecap="round" />
      <line x1="1330" y1="-60" x2="1010" y2="390" stroke="#FFF7D6" strokeWidth="6" strokeLinecap="round" />
      <circle cx="950" cy="440" r="165" fill="none" stroke={C.red} strokeWidth="8" />
      <line x1="740" y1="440" x2="1160" y2="440" stroke={C.red} strokeWidth="5" /><line x1="950" y1="230" x2="950" y2="640" stroke={C.red} strokeWidth="5" />
    </svg>
    <Earth cx={950} cy={440} R={105} t={0.3} />
    <Badge x={36} y={36} scale={1.75} value="0.00 SECONDS" />
    <Word x={36} y={190} size={84} color="#F6F4EF">YOU&apos;D NEVER</Word>
    <Word x={36} y={275} size={84} color={C.red}>SEE IT</Word>
    <Couch pose="couch_hide" x={-30} y={420} w={430} />
  </AbsoluteFill>
);
