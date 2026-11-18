import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { ACCENT, FONT, LIGHT } from "./tokens";

// Owner's thumbnail layouts, rebuilt with correct text/numbers (2026-11-18). 1280x720, render --scale=2.
const INK = LIGHT.ink;
const paper: React.CSSProperties = { backgroundColor: "#F6F1EA", backgroundImage: `radial-gradient(circle, #E9E1D4 2px, transparent 2.4px)`, backgroundSize: "26px 26px" };
const Card: React.FC<{ x: number; y: number; w: number; h: number; bg?: string; children?: React.ReactNode }> = ({ x, y, w, h, bg = "#FFFFFF", children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, background: bg, border: `5px solid ${INK}`, borderRadius: 22, boxShadow: `7px 7px 0 ${INK}`, overflow: "hidden", boxSizing: "border-box" }}>{children}</div>
);
const Hole: React.FC<{ cx: number; cy: number; r: number; disk?: boolean; fire?: boolean; glow?: boolean }> = ({ cx, cy, r, disk, fire, glow = true }) => (
  <svg style={{ position: "absolute", left: cx - r * 2.2, top: cy - r * 2.2, overflow: "visible" }} width={r * 4.4} height={r * 4.4}>
    {glow ? <circle cx={r * 2.2} cy={r * 2.2} r={r * (fire ? 1.35 : 1.4)} fill={fire ? "#F97316" : ACCENT.amber} opacity={fire ? 0.55 : 0.25} /> : null}
    {fire ? Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <path key={i} d={`M ${r * 2.2 + Math.cos(a - 0.12) * r} ${r * 2.2 + Math.sin(a - 0.12) * r} L ${r * 2.2 + Math.cos(a) * r * 1.32} ${r * 2.2 + Math.sin(a) * r * 1.32} L ${r * 2.2 + Math.cos(a + 0.12) * r} ${r * 2.2 + Math.sin(a + 0.12) * r} Z`} fill={i % 2 ? ACCENT.amber : "#EF4444"} />; }) : null}
    {disk ? <ellipse cx={r * 2.2} cy={r * 2.25} rx={r * 2} ry={r * 0.5} fill="none" stroke={ACCENT.amber} strokeWidth={Math.max(4, r * 0.3)} /> : null}
    <circle cx={r * 2.2} cy={r * 2.2} r={r} fill="#05070C" stroke={fire ? "#F59E0B" : ACCENT.amber} strokeWidth={Math.max(2.5, r * 0.14)} />
    {disk ? <path d={`M ${r * 0.2} ${r * 2.25} A ${r * 2} ${r * 0.5} 0 0 0 ${r * 4.2} ${r * 2.25}`} fill="none" stroke={ACCENT.amber} strokeWidth={Math.max(4, r * 0.3)} /> : null}
  </svg>
);
const Lbl: React.FC<{ w: number; y: number; text: string; color?: string; size?: number }> = ({ w, y, text, color = INK, size = 30 }) => (
  <div style={{ position: "absolute", left: 0, top: y, width: w, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: size, color, letterSpacing: -0.5 }}>{text}</div>
);
const Char: React.FC<{ pose: string; x: number; y: number; h: number }> = ({ pose, x, y, h }) => (
  <Img src={staticFile(`assets/character/light/${pose}.png`)} style={{ position: "absolute", left: x, top: y, height: h }} />
);
const Arrow: React.FC<{ d: string; head: [number, number, number] }> = ({ d, head: [x, y, a] }) => (
  <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
    <path d={d} fill="none" stroke={ACCENT.red} strokeWidth="9" strokeLinecap="round" />
    <path d={`M ${x - 26 * Math.cos(a - 0.5)} ${y - 26 * Math.sin(a - 0.5)} L ${x} ${y} L ${x - 26 * Math.cos(a + 0.5)} ${y - 26 * Math.sin(a + 0.5)}`} fill="none" stroke={ACCENT.red} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const GX = 340, GY = 182, CW = 215, CH = 245, GAP = 14;
const cell = (i: number) => ({ x: GX + (i % 4) * (CW + GAP), y: GY + Math.floor(i / 4) * (CH + GAP) });

// Thumbnail 1 — "ALL 8 EXPLAINED": each type a different size, #8 (white hole) shouldn't exist.
export const ThumbOwner1: React.FC = () => {
  const items = [
    { t: "MICRO", r: 5 }, { t: "PRIMORDIAL", r: 18 }, { t: "STELLAR", r: 24, disk: true }, { t: "MID", r: 36 },
    { t: "SUPER", r: 42, disk: true }, { t: "ULTRA", r: 62 }, { t: "KERR", r: 38, kerr: true },
  ];
  return (
    <AbsoluteFill style={paper}>
      <div style={{ position: "absolute", left: 40, top: 22, fontFamily: FONT.head, fontWeight: 700, fontSize: 96, color: INK, letterSpacing: -3, lineHeight: 1, whiteSpace: "nowrap" }}>ALL 8 EXPLAINED</div>
      <div style={{ position: "absolute", left: 845, top: 38, background: ACCENT.red, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 32, padding: "14px 22px", borderRadius: 999, rotate: "-3deg", whiteSpace: "nowrap" }}>#8 SHOULDN'T EXIST</div>
      {items.map((it, i) => {
        const { x, y } = cell(i);
        return (
          <Card key={it.t} x={x} y={y} w={CW} h={CH}>
            {it.kerr ? (
              <svg style={{ position: "absolute", left: 0, top: 0 }} width={CW} height={CH}>
                <ellipse cx={CW / 2 - 5} cy="100" rx="88" ry="34" fill="none" stroke={ACCENT.blue} strokeWidth="9" strokeDasharray="26 12" />
                <circle cx={CW / 2 - 5} cy="100" r={it.r} fill="#05070C" stroke={INK} strokeWidth="5" />
              </svg>
            ) : <Hole cx={CW / 2 - 5} cy={100} r={it.r} disk={it.disk} glow={i > 0} />}
            {i === 0 ? <div style={{ position: "absolute", left: CW / 2 - 5 - 36, top: 64, width: 72, height: 72, borderRadius: 99, border: `4px dashed ${ACCENT.red}` }} /> : null}
            <Lbl w={CW - 10} y={180} text={it.t} size={it.t.length > 8 ? 26 : 32} />
          </Card>
        );
      })}
      <Card x={cell(7).x} y={cell(7).y} w={CW} h={CH} bg={ACCENT.red}>
        <svg style={{ position: "absolute", left: 0, top: 0 }} width={CW} height={CH}>
          <circle cx={CW / 2 - 5} cy="100" r="78" fill={ACCENT.amber} />
          {Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * Math.PI * 2; return <line key={k} x1={CW / 2 - 5 + Math.cos(a) * 30} y1={100 + Math.sin(a) * 30} x2={CW / 2 - 5 + Math.cos(a) * 70} y2={100 + Math.sin(a) * 70} stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />; })}
          <circle cx={CW / 2 - 5} cy="100" r="26" fill="#FFFFFF" stroke={INK} strokeWidth="5" />
        </svg>
        <Lbl w={CW - 10} y={182} text="WHITE HOLE" color="#FFFFFF" size={30} />
      </Card>
      <Char pose="the_catch" x={-30} y={190} h={640} />
    </AbsoluteFill>
  );
};

// Thumbnail 3 — "SMALLEST TO BIGGEST": 7 types by size, the last (Phoenix A) bursts out of a double-wide card.
export const ThumbOwner3: React.FC = () => {
  const rs = [3, 12, 20, 30, 40, 52];
  const disks = [false, false, true, false, true, true];
  return (
    <AbsoluteFill style={paper}>
      <div style={{ position: "absolute", left: 40, top: 26, fontFamily: FONT.head, fontWeight: 700, fontSize: 96, color: INK, letterSpacing: -3, lineHeight: 1, whiteSpace: "nowrap" }}>
        SMALLEST TO <span style={{ background: ACCENT.red, color: "#FFF", padding: "0 22px 6px", borderRadius: 26 }}>BIGGEST</span>
      </div>
      {rs.map((r, i) => {
        const { x, y } = cell(i);
        return (
          <Card key={i} x={x} y={y} w={CW} h={CH}>
            <Hole cx={CW / 2 - 5} cy={CH / 2 + (i === 0 ? 14 : 0)} r={r} disk={disks[i]} glow={i > 0} />
            {i === 0 ? <div style={{ position: "absolute", left: 0, top: 26, width: CW - 10, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 40, color: ACCENT.blue }}>0.24 pm</div> : null}
            {i === 5 ? <div style={{ position: "absolute", left: 0, top: 22, width: CW - 10, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: INK }}>66B SUNS</div> : null}
          </Card>
        );
      })}
      {(() => { const { x, y } = cell(6); return (
        <Card x={x} y={y} w={CW * 2 + GAP} h={CH}>
          <Hole cx={300} cy={CH / 2 - 4} r={86} fire />
          <div style={{ position: "absolute", left: 18, top: 62, fontFamily: FONT.mono, fontWeight: 700, fontSize: 54, lineHeight: 1, color: ACCENT.red }}>100B<br />SUNS</div>
        </Card>
      ); })()}
      <Arrow d="M 300 560 C 280 420, 300 300, 360 260" head={[360, 260, -0.75]} />
      <Arrow d="M 1110 160 C 1230 170, 1260 300, 1215 430" head={[1215, 430, 1.75]} />
      <Char pose="thinking" x={-20} y={180} h={640} />
    </AbsoluteFill>
  );
};
