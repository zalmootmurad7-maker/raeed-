import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { BeatCam, Count, LightBg, Pop, Stamp } from "../components/Base";
import { CAM_FULL, Cam, MasterBoard, cardCenter, lerpCam } from "../components/Board";
import { COUCH_AR, COUCH_HEAD, Couch } from "../components/Char";
import { THREATS } from "../components/Icons";
import { C, F, FONT, LIGHT, r, sp } from "../lib/core";

export type BeatProps = { b0: number; b1: number };

// A cosmic-ray streak: a bright head travelling from (x0,y0) to (x1,y1) between frames a..a+dur, with a fading glow trail.
export const Ray: React.FC<{ a: number; dur?: number; x0: number; y0: number; x1: number; y1: number; width?: number; color?: string }> = ({ a, dur = 9, x0, y0, x1, y1, width = 10, color = C.blue }) => {
  const f = useCurrentFrame();
  if (f < a) return null;
  const k = r(f, a, a + dur, 0, 1, Easing.in(Easing.quad));
  const fade = r(f, a + dur, a + dur + 24, 1, 0);
  if (fade <= 0) return null;
  const hx = x0 + (x1 - x0) * k, hy = y0 + (y1 - y0) * k;
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
      <line x1={x0} y1={y0} x2={hx} y2={hy} stroke={color} strokeWidth={width * 6} strokeLinecap="round" opacity={0.10 * fade} />
      <line x1={x0} y1={y0} x2={hx} y2={hy} stroke={color} strokeWidth={width * 3.2} strokeLinecap="round" opacity={0.22 * fade} />
      <line x1={x0} y1={y0} x2={hx} y2={hy} stroke={color} strokeWidth={width} strokeLinecap="round" opacity={0.95 * fade} />
      <line x1={x0} y1={y0} x2={hx} y2={hy} stroke="#DBEAFE" strokeWidth={width * 0.35} strokeLinecap="round" opacity={fade} />
      {k < 1 ? <circle cx={hx} cy={hy} r={width * 1.3} fill="#DBEAFE" stroke={color} strokeWidth={width * 0.5} /> : null}
    </svg>
  );
};

// ---------- H1 0.00–3.12  couch_chill + a cosmic ray pierces the ceiling past his head ----------
const CEIL = 128;
export const H1Couch: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const w = 1120, x = 960 - w / 2, bottom = 1030, top = bottom - w * COUCH_AR;
  const headR = x + COUCH_HEAD.x1 * w; // right edge of the head
  const rayX = headR + 110;            // ≥36 px clear of the head even with the glow
  const hole = sp(f, F(0.62), 10, 200);
  return (
    <BeatCam b0={b0} b1={b1} push={0.05} origin="50% 35%">
      <LightBg />
      {/* ceiling slab */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: CEIL, background: "#E9E3D6", borderBottom: `6px solid ${LIGHT.ink}` }} />
      {/* hole + cracks where the ray came through */}
      {f >= F(0.62) ? (
        <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
          <ellipse cx={rayX + 22} cy={CEIL} rx={26 * hole} ry={9 * hole} fill={LIGHT.ink} />
          {[-0.9, -0.3, 0.4, 1.0].map((a, i) => <path key={i} d={`M ${rayX + 22} ${CEIL} l ${Math.cos(Math.PI + a) * 60 * hole} ${-Math.abs(Math.sin(a)) * 40 * hole - 10 * hole}`} stroke={LIGHT.ink} strokeWidth="4" strokeLinecap="round" />)}
          {Array.from({ length: 7 }, (_, i) => { const t = (f - F(0.62)) / 30; const y = CEIL + 10 + t * (260 + i * 30) * t; return y < bottom - 40 ? <rect key={i} x={rayX - 40 + i * 11} y={y} width="7" height="7" fill="#B8AE9C" transform={`rotate(${i * 25} ${rayX - 40 + i * 11} ${y})`} /> : null; })}
        </svg>
      ) : null}
      <Couch pose="couch_chill" x={x} bottom={bottom} w={w} at={b0} pop={false} />
      <Ray a={F(0.6)} dur={8} x0={rayX + 30} y0={-60} x1={rayX - 40} y1={bottom + 20} width={11} />
      <Ray a={F(2.2)} dur={6} x0={x + 120} y0={-60} x1={x + 60} y1={bottom + 20} width={7} />
      {/* tag next to the ray (≥36 px gap) */}
      <Pop at={F(0.72)} x={rayX + 70} y={CEIL + 70} w={520} size={46} color={C.blue}>COSMIC RAY</Pop>
      <Pop at={F(0.86)} x={rayX + 70} y={CEIL + 126} w={520} size={32} color={LIGHT.ink}>PASSING THROUGH. RIGHT NOW.</Pop>
      {top < 0 ? null : null}
    </BeatCam>
  );
};

// ---------- H2 3.12–5.36  "the universe's WEAPONS" — 4x2 board staggers in, a particle stream crosses it ----------
export const H2Board: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const cam: Cam = { s: 1 + 0.02 * r(f, b0, b1, 0, 1, Easing.linear), fx: 960, fy: 560 };
  return (
    <>
      <LightBg />
      <MasterBoard cam={cam} appearAt={b0} stagger={3} pulse8 title={<Pop at={F(4.18)} x={0} y={0} w={1708} size={60} align="center" from="scale">THE UNIVERSE&apos;S <span style={{ color: C.red }}>WEAPONS</span></Pop>} />
    </>
  );
};

// ---------- H3 5.36–7.06  "passing THROUGH YOUR BODY" — couch_shocked, rays pass straight through him ----------
export const H3Through: React.FC<BeatProps> = ({ b0, b1 }) => {
  const w = 1240, x = 960 - w / 2 - 40, bottom = 1100;
  const hx = x + ((COUCH_HEAD.x0 + COUCH_HEAD.x1) / 2) * w, chestY = bottom - w * COUCH_AR * 0.52;
  return (
    <BeatCam b0={b0} b1={b1} push={0.04} origin="45% 50%">
      <LightBg />
      <Couch pose="couch_shocked" x={x} bottom={bottom} w={w} at={b0} />
      {[0, 1, 2, 3].map((i) => <Ray key={i} a={b0 + 4 + i * 11} dur={7} x0={hx - 520 + i * 90} y0={-80} x1={hx + 260 + i * 60} y1={chestY + 420} width={8} />)}
      <Pop at={F(5.36)} x={80} y={70} w={1760} size={70} align="center">PASSING <span style={{ color: C.blue }}>THROUGH</span> <span style={{ color: C.red }}>YOUR BODY</span></Pop>
    </BeatCam>
  );
};

// ---------- H4 7.06–9.40  "could destroy CIVILIZATION" — camera pushes into cards 3 & 4 ----------
export const H4Civ: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const a = cardCenter(2), b = cardCenter(3);
  const target: Cam = { s: 1.55, fx: (a.x + b.x) / 2, fy: (a.y + b.y) / 2 + 60 };
  const cam = lerpCam(CAM_FULL, target, r(f, b0, b0 + 14, 0, 1, Easing.inOut(Easing.cubic)));
  const cam2: Cam = { ...cam, s: cam.s * r(f, b0 + 14, b1, 1, 1.04, Easing.linear) };
  return (
    <>
      <LightBg />
      <MasterBoard cam={cam2} redCards={[2, 3]} pulse8 />
      <Stamp at={F(7.64)} x={520} y={40} text="COULD DESTROY CIVILIZATION" size={58} rot={-3} />
    </>
  );
};

// ---------- H5 9.40–13.22  "one might ERASE the rules of REALITY" — card #8 ??? fills the stage ----------
const LAWS = ["E = mc²", "F = ma", "ħ", "c", "G", "e⁻", "π", "λ"];
export const H5Erase: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const k = sp(f, b0, 12, 200);
  const er = F(10.38);
  const pulse = 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 0.9);
  return (
    <BeatCam b0={b0} b1={b1} push={0.05}>
      <LightBg />
      {/* the locked card #8 */}
      <div style={{ position: "absolute", left: 960 - 360, top: 250, width: 720, height: 660, borderRadius: 18, background: "#FFF5F5", border: `6px solid ${C.red}`, boxShadow: `6px 6px 0 ${LIGHT.ink}, 0 0 ${30 + 40 * pulse}px rgba(229,57,53,${0.35 + 0.35 * pulse})`, scale: `${0.6 + 0.4 * k}`, transformOrigin: "50% 50%", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", left: 24, top: 22 }}><span style={{ background: C.red, color: "#FFF", fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, padding: "6px 18px", borderRadius: 999 }}>08</span></div>
        <div style={{ position: "absolute", left: 0, width: 708, top: 170, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 240, color: C.red, lineHeight: 1, scale: `${1 + 0.05 * pulse}` }}>???</div>
        <div style={{ position: "absolute", left: 0, width: 708, top: 520, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 38, color: LIGHT.ink }}>LOCKED UNTIL THE END</div>
      </div>
      {/* laws of physics orbit the card, then dissolve into red dust on "erase" */}
      {LAWS.map((s, i) => {
        const a = (i / LAWS.length) * Math.PI * 2 + t * 0.35;
        const rx = 640, ry = 360, cx = 960 + Math.cos(a) * rx, cy = 580 + Math.sin(a) * ry;
        const d = r(f, er + i * 9, er + i * 9 + 22);
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: cx - 120, top: cy - 30, width: 240, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 66, color: LIGHT.ink, opacity: 1 - d, scale: `${1 - 0.4 * d}` }}>{s}</div>
            {d > 0 && d < 1 ? Array.from({ length: 6 }, (_, j) => <div key={j} style={{ position: "absolute", left: cx + Math.cos(j) * 60 * d, top: cy + Math.sin(j * 1.7) * 50 * d - 40 * d, width: 8, height: 8, borderRadius: 2, background: C.red, opacity: 1 - d }} />) : null}
          </React.Fragment>
        );
      })}
      <Pop at={er} x={80} y={96} w={1760} size={70} align="center" from="scale"><span style={{ color: C.red }}>ERASE</span> THE RULES OF REALITY</Pop>
    </BeatCam>
  );
};

// ---------- H6 13.22–16.04  "Here are 8 WAYS the universe could KILL YOU" — counter 1→8 + icons pop on each tick ----------
export const H6Eight: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const c0 = F(13.6), c1 = F(14.9);
  return (
    <BeatCam b0={b0} b1={b1} push={0.03}>
      <LightBg />
      <Count a={c0} b={c1} from={1} to={8} fmt={(v) => `${Math.round(v)}`} x={140} y={300} w={420} size={420} color={C.red} align="center" />
      <Pop at={F(13.84)} x={140} y={760} w={420} size={56} align="center">WAYS</Pop>
      {THREATS.map((th, i) => {
        const at = c0 + Math.round(((c1 - c0) * i) / 7);
        const k = sp(f, at, 10, 240, 0.6);
        const x = 700 + (i % 4) * 280, y = 250 + Math.floor(i / 4) * 330;
        return (
          <div key={i} style={{ position: "absolute", left: x, top: y, width: 230, height: 280, scale: `${0.3 + 0.7 * k}`, opacity: Math.min(1, k * 2), transformOrigin: "50% 50%" }}>
            <div style={{ position: "absolute", left: 15, top: 0 }}><th.Icon size={200} t={t} /></div>
            <div style={{ position: "absolute", left: 0, top: 220, width: 230, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 34, color: i === 7 ? C.red : LIGHT.ink }}>{String(i + 1).padStart(2, "0")}</div>
          </div>
        );
      })}
      <Pop at={F(15.16)} x={700} y={930} w={1100} size={54} align="center">THE UNIVERSE COULD <span style={{ color: C.red }}>KILL YOU</span></Pop>
    </BeatCam>
  );
};

// ---------- H7 16.04–18.98  "ranked by how much WARNING" — countdown bar YEARS → HOURS → 0.00 SECONDS ----------
const STOPS = [{ x: 330, l: "YEARS" }, { x: 800, l: "DAYS" }, { x: 1230, l: "HOURS" }, { x: 1620, l: "0.00 SECONDS" }];
const ON_BAR = [{ i: 1, x: 250 }, { i: 2, x: 420 }, { i: 3, x: 800 }, { i: 4, x: 1230 }, { i: 5, x: 1500 }, { i: 6, x: 1620 }, { i: 7, x: 1740 }, { i: 0, x: 1620, up: true }];
export const H7Bar: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const X0 = 160, X1 = 1760, Y = 700;
  const sweep = r(f, F(16.5), F(18.6), 0, 1, Easing.inOut(Easing.cubic));
  const mx = X0 + (X1 - X0) * sweep;
  return (
    <BeatCam b0={b0} b1={b1} push={0.03}>
      <LightBg />
      <Pop at={b0} x={80} y={90} w={1760} size={64} align="center">RANKED BY <span style={{ color: C.red }}>WARNING TIME</span></Pop>
      {/* bar */}
      <div style={{ position: "absolute", left: X0, top: Y, width: X1 - X0, height: 40, borderRadius: 20, border: `4px solid ${LIGHT.ink}`, background: `linear-gradient(90deg, ${C.green}, ${C.amber} 55%, ${C.red})`, boxSizing: "border-box", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: (mx - X0), top: 0, right: 0, bottom: 0, background: "rgba(246,244,239,0.82)" }} />
      </div>
      {/* sweeping marker */}
      <div style={{ position: "absolute", left: mx - 4, top: Y - 34, width: 8, height: 108, borderRadius: 4, background: LIGHT.ink }} />
      {STOPS.map((s, i) => { const on = mx >= s.x - 10; return <div key={i} style={{ position: "absolute", left: s.x - 220, top: Y + 92, width: 440, textAlign: "center", fontFamily: i === 3 ? FONT.mono : FONT.head, fontWeight: 700, fontSize: i === 3 ? 54 : 56, color: on ? (i === 3 ? C.red : LIGHT.ink) : "#B7B0A2", fontVariantNumeric: "tabular-nums", scale: `${on ? 1 + 0.15 * (1 - r(f, F(16.5) + Math.round(((s.x - X0) / (X1 - X0)) * 63), F(16.5) + Math.round(((s.x - X0) / (X1 - X0)) * 63) + 10)) : 1}` }}>{s.l}</div>; })}
      {/* threat icons pop above the bar as the marker reaches them */}
      {ON_BAR.map((o, j) => {
        const th = THREATS[o.i];
        const at = F(16.5) + Math.round(((o.x - X0) / (X1 - X0)) * 63);
        const k = sp(f, at, 10, 240, 0.6);
        const y = o.up ? Y - 420 : Y - 220;
        return <div key={j} style={{ position: "absolute", left: o.x - 85, top: y, width: 170, height: 170, scale: `${0.3 + 0.7 * k}`, opacity: Math.min(1, k * 2), transformOrigin: "50% 100%" }}><th.Icon size={170} t={t} /></div>;
      })}
    </BeatCam>
  );
};

// ---------- H8 18.98–(ch1)  zoom straight into card #1 ----------
export const H8ZoomIn: React.FC<BeatProps> = ({ b0 }) => {
  const f = useCurrentFrame();
  const c = cardCenter(0);
  const k = r(f, b0 + 6, b0 + 18, 0, 1, Easing.inOut(Easing.cubic));
  const cam = lerpCam(CAM_FULL, { s: 2.7, fx: c.x, fy: c.y }, k);
  return (<><LightBg /><MasterBoard cam={cam} pulse8 /></>);
};
