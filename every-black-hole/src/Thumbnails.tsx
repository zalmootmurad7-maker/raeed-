import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { ACCENT, FONT, LIGHT, SPACE } from "./tokens";

// Long-video thumbnails, 1280x720 (render with --scale=2 -> 2560x1440). Three concepts for Test & Compare.
const Label: React.FC<{ x: number; y: number; w: number; text: string; color?: string; size?: number }> = ({ x, y, w, text, color = LIGHT.ink, size = 34 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: size, color, letterSpacing: -0.5, lineHeight: 1 }}>
    <span style={{ borderBottom: `5px solid ${color}`, paddingBottom: 4 }}>{text}</span>
  </div>
);
const Hole: React.FC<{ cx: number; cy: number; r: number; ring?: boolean; glow?: boolean; disk?: boolean; ink?: string }> = ({ cx, cy, r, ring = true, glow = true, disk, ink = LIGHT.ink }) => (
  <svg style={{ position: "absolute", left: cx - r * 2, top: cy - r * 2, overflow: "visible" }} width={r * 4} height={r * 4}>
    {glow ? <circle cx={r * 2} cy={r * 2} r={r * 1.45} fill={ACCENT.amber} opacity={0.28} /> : null}
    {disk ? <ellipse cx={r * 2} cy={r * 2 + r * 0.05} rx={r * 1.9} ry={r * 0.5} fill="none" stroke={ACCENT.amber} strokeWidth={Math.max(4, r * 0.28)} /> : null}
    <circle cx={r * 2} cy={r * 2} r={r} fill="#05070C" stroke={ring ? ACCENT.amber : ink} strokeWidth={Math.max(3, r * 0.16)} />
    {disk ? <path d={`M ${r * 0.1} ${r * 2.05} A ${r * 1.9} ${r * 0.5} 0 0 0 ${r * 3.9} ${r * 2.05}`} fill="none" stroke={ACCENT.amber} strokeWidth={Math.max(4, r * 0.28)} /> : null}
  </svg>
);
const Char: React.FC<{ mode: "light" | "space"; pose: string; x: number; y: number; h: number; flip?: boolean }> = ({ mode, pose, x, y, h, flip }) => (
  <Img src={staticFile(`assets/character/${mode}/${pose}.png`)} style={{ position: "absolute", left: x, top: y, height: h, scale: flip ? "-1 1" : undefined }} />
);
const paper: React.CSSProperties = { backgroundColor: LIGHT.bg, backgroundImage: `radial-gradient(circle, ${LIGHT.grid} 2px, transparent 2.4px)`, backgroundSize: "28px 28px" };
const space: React.CSSProperties = { backgroundColor: SPACE.bg };

// A — the proven "every type" grid: 8 types, each a different size/look, label underlined.
export const ThumbGrid: React.FC = () => {
  const items: { t: string; r: number; disk?: boolean; ring?: boolean; spin?: boolean; white?: boolean }[] = [
    { t: "MICRO", r: 10 }, { t: "PRIMORDIAL", r: 34 }, { t: "STELLAR", r: 46, disk: true }, { t: "INTERMEDIATE", r: 58 },
    { t: "SUPERMASSIVE", r: 70, disk: true }, { t: "ULTRAMASSIVE", r: 86 }, { t: "KERR", r: 62, spin: true }, { t: "WHITE HOLE", r: 54, white: true },
  ];
  return (
    <AbsoluteFill style={paper}>
      {items.map((it, i) => {
        const col = i % 4, row = Math.floor(i / 4);
        const cx = 160 + col * 320, cy = 170 + row * 340;
        return (
          <div key={it.t}>
            {it.white ? (
              <svg style={{ position: "absolute", left: cx - 110, top: cy - 110 }} width="220" height="220">
                {Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2; return <line key={k} x1={110 + Math.cos(a) * 62} y1={110 + Math.sin(a) * 62} x2={110 + Math.cos(a) * 100} y2={110 + Math.sin(a) * 100} stroke={ACCENT.blue} strokeWidth="9" strokeLinecap="round" />; })}
                <circle cx="110" cy="110" r="48" fill="#FFFFFF" stroke={LIGHT.ink} strokeWidth="8" />
              </svg>
            ) : it.spin ? (
              <svg style={{ position: "absolute", left: cx - 120, top: cy - 120, overflow: "visible" }} width="240" height="240">
                <ellipse cx="120" cy="120" rx="112" ry="56" fill="none" stroke={ACCENT.blue} strokeWidth="12" strokeDasharray="30 14" />
                <circle cx="120" cy="120" r={it.r} fill="#05070C" stroke={LIGHT.ink} strokeWidth="8" />
              </svg>
            ) : (
              <Hole cx={cx} cy={cy} r={it.r} disk={it.disk} />
            )}
            {it.t === "MICRO" ? <div style={{ position: "absolute", left: cx - 70, top: cy - 70, width: 140, height: 140, borderRadius: 99, border: `5px dashed ${ACCENT.red}` }} /> : null}
            <Label x={cx - 160} y={cy + 110} w={320} text={it.t} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// B — size ladder on space: a speck grows into a monster that bursts out of the frame; astronaut stares at it.
export const ThumbLadder: React.FC = () => {
  const xs = [80, 175, 305, 480], rs = [6, 18, 36, 64];
  return (
    <AbsoluteFill style={space}>
      {Array.from({ length: 60 }, (_, i) => { const r = (n: number) => { const v = Math.sin((i + 1) * 91.7 * n) * 10000; return v - Math.floor(v); }; return <div key={i} style={{ position: "absolute", left: r(1) * 1280, top: r(2) * 720, width: 3, height: 3, borderRadius: 9, background: "#F6F4EF", opacity: 0.5 }} />; })}
      <Hole cx={1180} cy={360} r={330} />
      {xs.map((x, i) => <Hole key={i} cx={x} cy={470} r={rs[i]} disk={i === 1} />)}
      <svg style={{ position: "absolute", left: 60, top: 590 }} width="520" height="40"><line x1="0" y1="20" x2="490" y2="20" stroke={ACCENT.amber} strokeWidth="7" strokeLinecap="round" /><path d="M470 6 L496 20 L470 34" fill="none" stroke={ACCENT.amber} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div style={{ position: "absolute", left: 960, top: 330, width: 320, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 64, color: ACCENT.amber, letterSpacing: -1 }}>ULTRA</div>
      <Char mode="space" pose="shocked" x={560} y={250} h={470} />
      <div style={{ position: "absolute", left: 44, top: 44, fontFamily: FONT.head, fontWeight: 700, fontSize: 104, color: SPACE.text, lineHeight: 0.95, letterSpacing: -2 }}>
        TINY TO<br /><span style={{ color: ACCENT.amber }}>INSANE</span>
      </div>
    </AbsoluteFill>
  );
};

// C — the twist: smaller than an atom vs. 40 Solar Systems wide. Light character points, astonished.
export const ThumbTwist: React.FC = () => (
  <AbsoluteFill style={paper}>
    <div style={{ position: "absolute", left: 640, top: 0, width: 640, height: 720, background: SPACE.bg }} />
    <Hole cx={1010} cy={400} r={210} />
    <div style={{ position: "absolute", left: 870, top: 70, fontFamily: FONT.head, fontWeight: 700, fontSize: 54, color: SPACE.text, width: 400, textAlign: "center" }}>40 SOLAR<br />SYSTEMS</div>
    <Hole cx={470} cy={430} r={7} glow={false} />
    <div style={{ position: "absolute", left: 400, top: 360, width: 140, height: 140, borderRadius: 99, border: `6px solid ${ACCENT.red}` }} />
    <div style={{ position: "absolute", left: 300, top: 70, width: 330, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 54, color: LIGHT.ink, lineHeight: 1 }}>SMALLER<br />THAN AN ATOM</div>
    <Char mode="light" pose="shocked" x={-20} y={230} h={560} />
    <div style={{ position: "absolute", left: 470, top: 545, fontFamily: FONT.head, fontWeight: 700, fontSize: 86, color: ACCENT.red, rotate: "-6deg", textShadow: "4px 4px 0 #FFFFFF" }}>BOTH?!</div>
  </AbsoluteFill>
);
