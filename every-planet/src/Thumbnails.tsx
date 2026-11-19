import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Planet, LOOKS } from "./components/Planet";
import { ACCENT, FONT, LIGHT, SPACE } from "./tokens";

// Long-video thumbnails for "Every Planet That Shouldn't Exist". 1280x720, render with --scale=2 (2560x1440).
const INK = LIGHT.ink;
const YEL = "#FACC15";
const paper: React.CSSProperties = { backgroundColor: "#F6F1EA", backgroundImage: `radial-gradient(circle, #E9E1D4 2px, transparent 2.4px)`, backgroundSize: "26px 26px" };
const space: React.CSSProperties = { backgroundColor: SPACE.bg, backgroundImage: `radial-gradient(circle, #1A2233 2px, transparent 2.4px)`, backgroundSize: "30px 30px" };
const Char: React.FC<{ mode: "light" | "space"; pose: string; x: number; y: number; h: number; flip?: boolean }> = ({ mode, pose, x, y, h, flip }) => (
  <Img src={staticFile(`assets/character/${mode}/${pose}.png`)} style={{ position: "absolute", left: x, top: y, height: h, transform: flip ? "scaleX(-1)" : undefined }} />
);
const Head: React.FC<{ x: number; y: number; size: number; color?: string; children: React.ReactNode }> = ({ x, y, size, color = INK, children }) => (
  <div style={{ position: "absolute", left: x, top: y, fontFamily: FONT.head, fontWeight: 700, fontSize: size, color, letterSpacing: -3, lineHeight: 0.95, whiteSpace: "nowrap" }}>{children}</div>
);
const Pill: React.FC<{ x: number; y: number; size: number; bg?: string; color?: string; rot?: number; children: React.ReactNode }> = ({ x, y, size, bg = ACCENT.red, color = "#FFF", rot = -3, children }) => (
  <div style={{ position: "absolute", left: x, top: y, background: bg, color, fontFamily: FONT.head, fontWeight: 700, fontSize: size, padding: "10px 22px", borderRadius: 999, rotate: `${rot}deg`, whiteSpace: "nowrap", border: `4px solid ${INK}`, boxShadow: `5px 5px 0 ${INK}` }}>{children}</div>
);
const Stars: React.FC = () => (
  <>{Array.from({ length: 60 }, (_, i) => <div key={i} style={{ position: "absolute", left: (i * 211) % 1280, top: (i * 137) % 720, width: 3 + (i % 3), height: 3 + (i % 3), borderRadius: 9, background: "#E2E8F0", opacity: 0.5 }} />)}</>
);

// A — the board: all 10 worlds, #10 flagged in red.
const NAMES = ["GLASS RAIN", "PITCH BLACK", "IRON RAIN", "HOTTER THAN A STAR", "EATEN ALIVE", "NAKED CORE", "DIAMOND", "NO SUN", "TOO OLD", "SHOULD BE DEAD"];
export const ThumbA: React.FC = () => {
  const CW = 172, CH = 222, GAP = 12, X0 = 330, Y0 = 182;
  return (
    <AbsoluteFill style={paper}>
      <Head x={36} y={26} size={104}>IMPOSSIBLE WORLDS</Head>
      {NAMES.map((n, i) => {
        const x = X0 + (i % 5) * (CW + GAP), y = Y0 + Math.floor(i / 5) * (CH + GAP);
        const red = i === 9;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: CW, height: CH, background: red ? ACCENT.red : i % 2 ? "#161E2E" : "#FFFFFF", border: `5px solid ${INK}`, borderRadius: 20, boxShadow: `6px 6px 0 ${INK}`, boxSizing: "border-box", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 18, width: CW - 10, display: "flex", justifyContent: "center" }}><Planet size={i === 4 ? 144 : 126} look={LOOKS[i + 1]} id={`ta${i}`} /></div>
            <div style={{ position: "absolute", left: 6, top: 152, width: CW - 22, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: n.length > 11 ? 21 : 26, lineHeight: 1, color: red || i % 2 ? "#FFFFFF" : INK }}>{n}</div>
          </div>
        );
      })}
      <Char mode="light" pose="the_catch" x={-40} y={175} h={620} />
    </AbsoluteFill>
  );
};

// B — one absurd moment: glass rain blasting sideways past a giant blue planet.
export const ThumbB: React.FC = () => {
  const shards = Array.from({ length: 34 }, (_, i) => ({ x: 360 + ((i * 167) % 560), y: 210 + ((i * 89) % 430), s: 0.8 + ((i * 7) % 5) * 0.12 }));
  return (
    <AbsoluteFill style={space}>
      <Stars />
      <div style={{ position: "absolute", left: 700, top: 120 }}><Planet size={720} look={LOOKS[1]} id="tb" /></div>
      {shards.map((p, i) => (
        <svg key={i} style={{ position: "absolute", left: p.x, top: p.y, overflow: "visible" }} width="1" height="1">
          <line x1={-70 * p.s} y1={0} x2={-10} y2={0} stroke="#BFDBFE" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          <path d={`M0 0 L${46 * p.s} ${-13 * p.s} L${18 * p.s} ${15 * p.s} Z`} fill="#E0F2FE" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        </svg>
      ))}
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
        <line x1="380" y1="650" x2="1060" y2="650" stroke={ACCENT.red} strokeWidth="16" strokeLinecap="round" />
        <path d="M1020 616 L1066 650 L1020 684" fill="none" stroke={ACCENT.red} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <Head x={36} y={26} size={112} color="#FFFFFF">IT RAINS GLASS</Head>
      <Pill x={830} y={150} size={44} rot={4}>SIDEWAYS!</Pill>
      <Char mode="space" pose="shocked" x={-30} y={180} h={600} />
    </AbsoluteFill>
  );
};

// C — the twist: the red giant's "should-be" size swallows the orbit, yet the planet is still there.
export const ThumbC: React.FC = () => {
  const cx = 860, cy = 430;
  return (
    <AbsoluteFill style={space}>
      <Stars />
      <div style={{ position: "absolute", left: cx - 420, top: cy - 420, width: 840, height: 840, borderRadius: 9999, background: "radial-gradient(circle, rgba(234,88,12,0.55) 0%, rgba(234,88,12,0.35) 40%, rgba(0,0,0,0) 70%)" }} />
      <div style={{ position: "absolute", left: cx - 330, top: cy - 330, width: 660, height: 660, borderRadius: 9999, border: `8px dashed ${ACCENT.red}`, boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: cx - 150, top: cy - 150, width: 300, height: 300, borderRadius: 9999, background: "radial-gradient(circle, #FED7AA 0%, #EA580C 78%)", border: `8px solid ${INK}`, boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: cx - 240, top: cy - 240, width: 480, height: 480, borderRadius: 9999, border: "5px dashed #E2E8F0", boxSizing: "border-box", opacity: 0.8 }} />
      <div style={{ position: "absolute", left: cx + 154 - 65, top: cy - 184 - 65 }}><Planet size={130} look={LOOKS[10]} id="tc" /></div>
      <Pill x={cx + 220} y={cy - 330} size={40} bg={YEL} color={INK} rot={8}>ALIVE?!</Pill>
      <div style={{ position: "absolute", left: 590, top: 44, fontFamily: FONT.head, fontWeight: 700, fontSize: 32, color: ACCENT.red, rotate: "3deg", whiteSpace: "nowrap" }}>STAR SHOULD BE THIS BIG ↓</div>
      <Head x={36} y={26} size={104} color="#FFFFFF">IT SHOULD<br />BE DEAD</Head>
      <Char mode="space" pose="shocked" x={-20} y={270} h={520} />
    </AbsoluteFill>
  );
};
