import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Count, Pop, Stamp } from "../components/Base";
import { Couch, Presenter } from "../components/Char";
import { BeatProps, FireSky, Galileo, Gauge, OxyStage, Stopwatch } from "../components/Oxy";
import { Earth, Head, PillAt, Red, Blue, Amber } from "../components/Prims";
import { C, F, FONT, LIGHT, SPACE, r, sp } from "../lib/core";

// ---------- HOOK A 0.0–3.3: couch_chill + a big red stopwatch counting the 5 seconds ----------
export const HookCouch: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const v = 5 * r(f, F(0.3), F(2.9), 0, 1, Easing.linear);
  return (
    <OxyStage mode="light" b0={b0} b1={b1} timer="none">
      <Couch pose="couch_chill" x={120} bottom={1030} w={980} at={b0} pop={false} />
      <Stopwatch cx={1440} cy={600} R={250} value={v} />
      <Pop at={F(0.0)} x={1010} y={160} w={860} size={64} align="center">HOLD YOUR BREATH…</Pop>
      <Pop at={F(2.2)} x={160} y={160} w={860} size={64} align="left" color={C.green}>EASY, RIGHT?</Pop>
    </OxyStage>
  );
};

// ---------- PRESSURE + EARS 41.2–45.0: gauge at 79%, "SEA LEVEL → 2,000 M", shocked presenter (hero ≤2 s, then docks) ----------
export const Ears: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const v = 100 - 21 * r(f, b0 - 300, b0 - 280);
  return (
    <OxyStage mode="light" b0={b0} b1={b1} overlay={<Presenter pose="shocked" at={b0} heroFor={1.8} />}>
      <Gauge cx={1000} cy={560} R={250} value={v} />
      <div style={{ position: "absolute", left: 1000 - 160, top: 640, width: 320, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 66, color: C.red }}>79%</div>
      <Pop at={b0} x={760} y={870} w={480} size={44} align="center" color={C.red}>−21% AIR PRESSURE</Pop>
      {/* elevation card: sea level → 2,000 m */}
      <div style={{ position: "absolute", left: 1340, top: 300, width: 470, height: 520, borderRadius: 18, background: "#FFF", border: `3px solid ${LIGHT.ink}`, boxShadow: `4px 4px 0 ${LIGHT.ink}`, overflow: "hidden" }}>
        <svg width="470" height="520" style={{ position: "absolute", left: 0, top: 0 }}>
          <path d="M 0 470 L 150 300 L 230 370 L 330 210 L 470 430 L 470 520 L 0 520 Z" fill="#CBD5E1" stroke={LIGHT.ink} strokeWidth="6" strokeLinejoin="round" />
          <path d="M 302 262 L 330 210 L 358 266 L 340 256 L 330 270 L 318 254 Z" fill="#FFF" stroke={LIGHT.ink} strokeWidth="4" />
          <rect x="0" y="470" width="470" height="50" fill={C.blue} />
          <path d={`M 70 450 C 70 ${450 - 330 * r(f, b0 + 6, b0 + 24)} 330 ${210 + 240 * (1 - r(f, b0 + 6, b0 + 24))} 330 210`} fill="none" stroke={C.red} strokeWidth="7" strokeDasharray="14 10" />
        </svg>
        <div style={{ position: "absolute", left: 20, top: 20, fontFamily: FONT.head, fontWeight: 700, fontSize: 30, color: LIGHT.ink }}>SEA LEVEL →</div>
        <div style={{ position: "absolute", left: 20, top: 58, fontFamily: FONT.mono, fontWeight: 700, fontSize: 48, color: C.red }}>2,000 M</div>
        <div style={{ position: "absolute", left: 20, top: 118, fontFamily: FONT.head, fontWeight: 700, fontSize: 26, color: "#64748B" }}>IN AN INSTANT</div>
      </div>
      <Head at={F(41.4)} y={170} x={620} w={1200}>YOUR EARDRUMS <Red>POP</Red></Head>
      {[0, 1].map((i) => { const k = sp(f, F(41.9) + i * 4, 9, 260, 0.6); return f >= F(41.9) ? <div key={i} style={{ position: "absolute", left: [40, 470][i], top: 240 + i * 20, fontFamily: FONT.head, fontWeight: 700, fontSize: 54, color: C.red, scale: `${0.4 + 0.6 * k}`, opacity: Math.min(1, k * 2) * (1 - r(f, F(43.9), F(44.4))), rotate: `${i ? 12 : -12}deg` }}>POP!</div> : null; })}
          </OxyStage>
  );
};

// ---------- GALILEO 122.2–133.4: 1991 NASA Galileo — antenna jammed half-open (cold welding + friction) ----------
export const GalileoBeat: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const open = 0.15 + 0.6 * r(f, F(125.8), F(127.4), 0, 1, Easing.out(Easing.cubic));
  return (
    <OxyStage mode="space" b0={b0} b1={b1} timer="flashback">
      <PillAt at={F(122.4)} x={110} y={170} text="1991 · NASA GALILEO" color={C.blue} size={46} />
      <Galileo cx={940} cy={540} s={250} t={t} open={open} />
      <Pop at={F(127.4)} x={1260} y={420} w={600} size={48} color={C.red}>MAIN DISH ANTENNA</Pop>
      <Pop at={F(127.6)} x={1260} y={480} w={600} size={48} color={C.red}>PARTIALLY JAMMED</Pop>
      <Pop at={F(130.6)} x={110} y={940} w={1700} size={50} align="center" color={SPACE.text}>ENGINEERS POINTED TO <Amber>COLD WELDING</Amber> + FRICTION</Pop>
    </OxyStage>
  );
};

const BodyBar: React.FC<{ at: number; x: number; y: number; w: number }> = ({ at, x, y, w }) => {
  const f = useCurrentFrame();
  const parts: [string, number, string][] = [["OXYGEN", 65, C.red], ["C", 18, "#64748B"], ["H", 10, "#94A3B8"], ["", 7, "#CBD5E1"]];
  let acc = 0;
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: 110 }}>
      {parts.map(([el, pct, col], i) => { const k = sp(f, at + i * 4, 12, 200); const left = (acc / 100) * w; acc += pct; return (
        <div key={i} style={{ position: "absolute", left, top: 0, width: (pct / 100) * w * k, height: 80, background: col, border: `3px solid ${SPACE.border}`, boxSizing: "border-box", borderRadius: i === 0 ? "14px 0 0 14px" : i === 3 ? "0 14px 14px 0" : 0, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", fontFamily: FONT.mono, fontWeight: 700, fontSize: i === 0 ? 40 : 26, color: "#FFF", whiteSpace: "nowrap" }}>{k > 0.9 && el ? `${el} ${pct}%` : ""}</div>
      ); })}
      <div style={{ position: "absolute", left: 0, top: 88, fontFamily: FONT.head, fontWeight: 700, fontSize: 24, color: "#94A3B8", opacity: sp(f, at + 16) }}>YOUR BODY, BY MASS (APPROX.)</div>
    </div>
  );
};

// ---------- TWIST 181.7–196.4: "You're 65% oxygen" — gone at 0.00s, the sky still burning behind ----------
export const Twist: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const fade = r(f, F(195.1), F(195.7));
  return (
    <OxyStage mode="space" b0={b0} b1={b1} timer="zero" timerAt={F(183.6)} overlay={<div style={{ opacity: 1 - fade }}><Presenter pose="shocked" at={b0} heroFor={1.8} /></div>}>
      <FireSky k={1 - 0.5 * r(f, b0, b0 + 60)} t={t} />
      <Earth cx={1680} cy={1250} R={420} t={t} />
      <BodyBar at={F(187.6)} x={630} y={650} w={880} />
      <Pop at={F(182.3)} x={620} y={170} w={1100} size={70} color={SPACE.text}>OH, AND <Red>YOU</Red>?</Pop>
      <Count a={F(185.4)} b={F(186.6)} to={65} fmt={(v) => `${Math.round(v)}%`} x={620} y={300} w={700} size={210} color={C.red} />
      <Pop at={F(186.9)} x={630} y={530} w={900} size={56} color={SPACE.text}>OXYGEN, BY MASS</Pop>
      <Stamp at={F(194.4)} x={640} y={840} text="GONE AT 0.00s" size={80} bg="rgba(14,19,31,0.92)" rot={-3} />
    </OxyStage>
  );
};

// ---------- THE SKY CATCHES FIRE 174.3–181.7 ----------
export const SkyFire: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const k = r(f, b0, b0 + 20);
  return (
    <OxyStage mode="space" b0={b0} b1={b1} timer="returns" timerAt={F(159.6)}>
      <FireSky k={k} t={t} />
      <Earth cx={960} cy={1350} R={620} t={t} />
      <Pop at={F(175.2)} x={0} y={170} w={1920} size={110} align="center" color="#FFF7D6" from="scale">THE SKY CATCHES FIRE</Pop>
      <Pop at={F(178.6)} x={0} y={330} w={1920} size={50} align="center" color={SPACE.text}>A HINDENBURG… <Amber>MULTIPLIED BY OCEANS</Amber></Pop>
      {sp(f, b0) < 0 ? <Blue>.</Blue> : null}
    </OxyStage>
  );
};
