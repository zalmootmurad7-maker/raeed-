import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Count, Pop, Stamp } from "../components/Base";
import { Presenter } from "../components/Char";
import { IconSupernova } from "../components/Icons";
import { BeatProps, ChapterTitle, Transition, WarnBeat } from "../components/Kit";
import { Arrow, BallotBox, Chip, DNA, Galaxy, Head, Laptop, PillAt, PopIn, Shock, Stage, Stream, Svg, Telescope, Check, Red, Blue, Green } from "../components/Prims";
import { C, F, FONT, LIGHT, r, sp } from "../lib/core";
import { Ray } from "./Hook";

const BADGE = "0s (HAPPENING NOW)";
const BA = F(19.5);
const S: React.FC<BeatProps & { children: React.ReactNode; overlay?: React.ReactNode }> = ({ b0, b1, children, overlay }) => (
  <Stage mode="light" badge={BADGE} badgeAt={BA} push={[b0, b1]} overlay={overlay}>{children}</Stage>
);
const t30 = (f: number) => f / 30;

export const C1Title: React.FC<BeatProps> = (p) => <ChapterTitle {...p} i={0} mode="light" badge={BADGE} />;

// Earth horizon + atmosphere band (light canvas)
const Horizon: React.FC<{ top: number; band?: number }> = ({ top, band = 160 }) => (
  <>
    <div style={{ position: "absolute", left: -600, top: top - band, width: 3120, height: 3120, borderRadius: 9999, background: "radial-gradient(circle, rgba(147,197,253,0.55) 47%, rgba(147,197,253,0) 50%)" }} />
    <div style={{ position: "absolute", left: -440, top, width: 2800, height: 2800, borderRadius: 9999, background: C.blue, border: `8px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
    <div style={{ position: "absolute", left: -440, top, width: 2800, height: 2800, borderRadius: 9999, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 900, top: 20, width: 700, height: 120, borderRadius: 999, background: C.green, border: `7px solid ${LIGHT.ink}` }} />
      <div style={{ position: "absolute", left: 1750, top: 50, width: 460, height: 100, borderRadius: 999, background: C.green, border: `7px solid ${LIGHT.ink}` }} />
    </div>
  </>
);

export const C1Sources: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = t30(f);
  const s1 = F(23.8), s2 = F(25.2);
  return (
    <S b0={b0} b1={b1} overlay={<Presenter pose="explaining" at={b0} heroFor={1.8} />}>
      <Horizon top={860} />
      <Head at={F(22.5)} y={175}>HIGH-ENERGY <Blue>PARTICLES</Blue> — EVERY SECOND</Head>
      <PopIn at={s1} x={520} y={300} w={220} h={220}><IconSupernova size={220} t={t} /></PopIn>
      <Pop at={s1 + 3} x={380} y={540} w={500} size={40} align="center">EXPLODING STARS</Pop>
      <PopIn at={s2} x={1330} y={290} w={260} h={260}><Galaxy cx={130} cy={130} R={130} t={t} dots={40} dotColor={LIGHT.ink} /></PopIn>
      <Pop at={s2 + 3} x={1210} y={540} w={500} size={40} align="center">DISTANT GALAXIES</Pop>
      {f >= s1 ? <Stream x1={630} y1={520} x2={900} y2={800} n={10} speed={1.6} f0={s1} /> : null}
      {f >= s2 ? <Stream x1={1440} y1={520} x2={1080} y2={800} n={10} speed={1.6} f0={s2} /> : null}
      <Stream x1={960} y1={-40} x2={960} y2={780} n={8} speed={1.4} spread={260} />
    </S>
  );
};

// branching air shower that dies out before the ground
const Shower: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const f = useCurrentFrame();
  const segs: { x1: number; y1: number; x2: number; y2: number; l: number }[] = [];
  const grow = (px: number, py: number, a: number, l: number) => {
    if (l > 3) return;
    [-0.42, 0, 0.42].forEach((d, i) => { if (l > 1 && i === 1) return; const na = a + d; const L = 120 - l * 14; const nx = px + Math.sin(na) * L, ny = py + Math.cos(na) * L; segs.push({ x1: px, y1: py, x2: nx, y2: ny, l }); grow(nx, ny, na, l + 1); });
  };
  grow(x, y, 0, 0);
  return (
    <Svg>
      {segs.map((s, i) => { const k = r(f, at + s.l * 6, at + s.l * 6 + 8); const o = 1 - s.l * 0.22; return k > 0 ? <line key={i} x1={s.x1} y1={s.y1} x2={s.x1 + (s.x2 - s.x1) * k} y2={s.y1 + (s.y2 - s.y1) * k} stroke={C.blue} strokeWidth={9 - s.l * 1.8} strokeLinecap="round" strokeDasharray={s.l > 1 ? "10 10" : undefined} opacity={o} /> : null; })}
    </Svg>
  );
};
export const C1Shower: React.FC<BeatProps> = ({ b0, b1 }) => {
  const hit = F(26.75);
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 0, top: 340, width: 1920, height: 640, background: "linear-gradient(180deg, rgba(147,197,253,0) 0%, rgba(147,197,253,0.45) 30%, rgba(147,197,253,0.6) 100%)" }} />
      <div style={{ position: "absolute", left: -200, top: 930, width: 2320, height: 400, borderRadius: "50% 50% 0 0", background: C.green, border: `8px solid ${LIGHT.ink}` }} />
      <Ray a={F(26.45)} dur={9} x0={960} y0={-60} x1={960} y1={400} width={12} />
      <Shower x={960} y={400} at={hit} />
      <Head at={F(26.2)} y={160} x={110} w={760} align="left" size={60}>SLAM INTO<br />EARTH&apos;S <Blue>ATMOSPHERE</Blue></Head>
      <Pop at={F(28.3)} x={140} y={600} w={420} size={46} color={C.blue}>AIR SHOWER</Pop>
      <Stamp at={F(29.9)} x={1280} y={600} text="HARMLESS" color={C.green} size={70} />
    </S>
  );
};

export const C1Year: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1}>
    <Pop at={F(31.2)} x={0} y={250} w={1920} size={280} align="center" from="scale" mono>1991</Pop>
    <Telescope x={520} y={820} s={160} rot={-40} />
    <Telescope x={1400} y={820} s={160} rot={-140} />
    <Pop at={F(32.7)} x={0} y={950} w={1920} size={48} align="center">DETECTORS SPOTTED…</Pop>
    <Ray a={F(33.4)} dur={8} x0={-60} y0={140} x1={1980} y1={220} width={9} />
    <Pop at={F(33.9)} x={0} y={560} w={1920} size={84} align="center" color={C.red} from="scale">SOMETHING ABSURD</Pop>
  </S>
);

export const C1OMG: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const ph = ((f - b0) / 30 / 1.1) % 1;
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 120, top: 520, width: 1680, height: 260, borderRadius: 18, background: "#0E131F", border: `3px solid ${LIGHT.ink}`, boxShadow: `4px 4px 0 ${LIGHT.ink}`, overflow: "hidden" }}>
        <div style={{ position: "absolute", left: -200 + 2000 * ph - 600, top: 128, width: 600, height: 6, background: "linear-gradient(90deg, rgba(37,99,235,0), #60A5FA)" }} />
        <div style={{ position: "absolute", left: -200 + 2000 * ph - 22, top: 108, width: 44, height: 44, borderRadius: 99, background: "#DBEAFE", border: `6px solid ${C.blue}`, boxShadow: "0 0 30px 10px rgba(37,99,235,0.7)", boxSizing: "border-box" }} />
        <Pop at={F(36.1)} x={1080} y={190} w={560} size={44} align="right" color="#F6F4EF" mono>3.2×10²⁰ eV</Pop>
      </div>
      <Stamp at={F(35.6)} x={560} y={230} text="OH-MY-GOD PARTICLE" size={84} rot={-4} />
    </S>
  );
};

export const C1Proton: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = sp(f, b0, 11, 200);
  return (
    <S b0={b0} b1={b1}>
      <Shock cx={960} cy={600} at={b0} R={340} color={C.blue} />
      <div style={{ position: "absolute", left: 960 - 170, top: 600 - 170, width: 340, height: 340, borderRadius: 999, background: "radial-gradient(circle, #DBEAFE 0%, #93C5FD 70%)", border: `10px solid ${LIGHT.ink}`, boxSizing: "border-box", scale: `${0.4 + 0.6 * k}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 150, color: LIGHT.ink, boxShadow: "0 0 80px 20px rgba(37,99,235,0.35)" }}>p<sup style={{ fontSize: 80 }}>+</sup></div>
      <Head at={F(38.1)} y={175}>MOST LIKELY A SINGLE <Blue>PROTON</Blue></Head>
    </S>
  );
};

const Lane: React.FC<{ y: number; label: string; color: string; head: number; at: number }> = ({ y, label, color, head, at }) => (
  <>
    <Pop at={at} x={120} y={y - 76} w={600} size={40} color={color}>{label}</Pop>
    <div style={{ position: "absolute", left: 120, top: y, width: Math.max(0, head - 120), height: 16, borderRadius: 8, background: color }} />
    <div style={{ position: "absolute", left: head - 24, top: y - 16, width: 48, height: 48, borderRadius: 99, background: color, border: `6px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
  </>
);
export const C1Race: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const h = 160 + 1560 * r(f, b0 + 6, b1, 0, 1, Easing.inOut(Easing.sin));
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(42.6)} y={175}>IF IT RACED A <Red>BEAM OF LIGHT</Red>…</Head>
      <Lane y={420} label="BEAM OF LIGHT" color={C.amber} head={h + 2} at={b0} />
      <Lane y={600} label="1 PROTON" color={C.blue} head={h} at={b0 + 4} />
      <Pop at={F(41.2)} x={0} y={760} w={1920} size={70} align="center" mono>99.99999999999999999999951%</Pop>
      <Pop at={F(41.5)} x={0} y={860} w={1920} size={44} align="center">OF THE SPEED OF LIGHT</Pop>
    </S>
  );
};
export const C1Gap: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const gap = 6 + 50 * r(f, F(44.9), F(48.0), 0, 1, Easing.inOut(Easing.cubic));
  return (
    <S b0={b0} b1={b1}>
      <Head at={b0} y={175}>THE LIGHT WOULD NEED…</Head>
      <div style={{ position: "absolute", left: 0, top: 380, width: 1300 + gap, height: 24, borderRadius: 12, background: C.amber }} />
      <div style={{ position: "absolute", left: 1300 + gap - 30, top: 362, width: 60, height: 60, borderRadius: 99, background: C.amber, border: `6px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 0, top: 520, width: 1300, height: 24, borderRadius: 12, background: C.blue }} />
      <div style={{ position: "absolute", left: 1270, top: 502, width: 60, height: 60, borderRadius: 99, background: C.blue, border: `6px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
      <Count a={F(44.9)} b={F(46.6)} to={200000} fmt={(v) => `>${Math.round(v).toLocaleString("en-US")} YEARS`} x={0} y={680} w={1920} size={120} color={C.red} align="center" />
    </S>
  );
};
export const C1Cm: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1}>
    <Head at={F(47.5)} y={175}>…TO PULL <Red>ONE CENTIMETER</Red> AHEAD</Head>
    <div style={{ position: "absolute", left: 0, top: 420, width: 1420, height: 30, borderRadius: 15, background: C.amber }} />
    <div style={{ position: "absolute", left: 1386, top: 400, width: 70, height: 70, borderRadius: 99, background: C.amber, border: `6px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
    <div style={{ position: "absolute", left: 0, top: 600, width: 1300, height: 30, borderRadius: 15, background: C.blue }} />
    <div style={{ position: "absolute", left: 1266, top: 580, width: 70, height: 70, borderRadius: 99, background: C.blue, border: `6px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
    <Svg><path d="M 1336 720 L 1336 760 L 1456 760 L 1456 720" fill="none" stroke={C.red} strokeWidth="8" strokeLinecap="round" /></Svg>
    <Pop at={F(47.7)} x={1196} y={790} w={400} size={64} align="center" color={C.red} mono>1 CM</Pop>
    <Pop at={F(47.9)} x={0} y={900} w={1200} size={40} align="center">AFTER &gt;200,000 YEARS OF RACING</Pop>
  </S>
);

export const C1Baseball: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = t30(f);
  return (
    <S b0={b0} b1={b1} overlay={<Presenter pose="shocked" at={b0} heroFor={1.6} />}>
      <Head at={F(50.2)} y={175}>THE ENERGY OF A <Red>PITCHED BASEBALL</Red></Head>
      <PopIn at={b0 + 6} x={700} y={420} w={240} h={240}><div style={{ position: "absolute", left: 96, top: 96, width: 48, height: 48, borderRadius: 99, background: C.blue, border: `5px solid ${LIGHT.ink}`, boxShadow: "0 0 30px 8px rgba(37,99,235,0.5)", boxSizing: "border-box" }} /><div style={{ position: "absolute", left: 0, top: 0, width: 240, height: 240, borderRadius: 999, border: `8px solid ${LIGHT.ink}`, boxSizing: "border-box" }} /><div style={{ position: "absolute", left: 200, top: 200, width: 110, height: 24, borderRadius: 12, background: LIGHT.ink, rotate: "45deg", transformOrigin: "0 50%" }} /></PopIn>
      <Pop at={b0 + 8} x={620} y={720} w={400} size={44} align="center" color={C.blue}>1 PROTON</Pop>
      <Pop at={F(50.6)} x={620} y={780} w={400} size={36} align="center" mono>3.2×10²⁰ eV</Pop>
      <Pop at={F(51.1)} x={1000} y={470} w={120} size={110} align="center" from="scale">=</Pop>
      <PopIn at={F(51.5)} x={1340} y={400} w={280} h={280}>
        <svg width="280" height="280" viewBox="-140 -140 280 280" style={{ overflow: "visible" }}>
          {[-40, 0, 40].map((yy, i) => <line key={i} x1={-215 - 12 * Math.sin(t * 4 + i)} y1={yy} x2={-150} y2={yy} stroke={LIGHT.ink} strokeWidth="9" strokeLinecap="round" />)}
          <circle r="120" fill="#FFF" stroke={LIGHT.ink} strokeWidth="9" />
          <path d="M -70 -95 C -30 -40 -30 40 -70 95 M 70 -95 C 30 -40 30 40 70 95" fill="none" stroke={C.red} strokeWidth="8" strokeDasharray="12 10" />
        </svg>
      </PopIn>
      <Pop at={F(51.7)} x={1280} y={720} w={400} size={44} align="center" color={C.red}>1 PITCHED BASEBALL</Pop>
      <Pop at={F(52.9)} x={560} y={900} w={1200} size={52} align="center">…PACKED INTO SOMETHING <Blue>SMALLER THAN AN ATOM</Blue></Pop>
    </S>
  );
};

export const C1Shield: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 160, top: 360, width: 1600, height: 1400, borderRadius: "50%", border: `10px dashed ${C.blue}`, background: "rgba(147,197,253,0.18)", boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: -200, top: 860, width: 2320, height: 400, borderRadius: "50% 50% 0 0", background: C.green, border: `8px solid ${LIGHT.ink}` }} />
      {[420, 760, 1160, 1500].map((x, i) => <Stream key={i} x1={x + 90} y1={270} x2={x} y2={i === 0 || i === 3 ? 600 : 420} n={5} speed={1.8} spread={6} size={9} />)}
      {[420, 760, 1160, 1500].map((x, i) => <Shock key={i} cx={x} cy={i === 0 || i === 3 ? 600 : 420} at={b0 + i * 7} R={70} color={C.blue} n={2} period={0.7} />)}
      <Head at={F(55.9)} y={175}>OUR ATMOSPHERE <Green>SHIELDS YOU</Green></Head>
      <Check x={960} y={700} s={70} at={F(57.0)} />
      {f < 0 ? null : null}
    </S>
  );
};

export const C1Laptop: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const hit = F(60.9);
  const glitch = f >= hit ? 1 - r(f, hit + 4, hit + 20) : 0;
  return (
    <S b0={b0} b1={b1} overlay={<Presenter pose="explaining" at={b0} heroFor={1.6} />}>
      <Head at={F(59.0)} y={175}>STRAY PARTICLES HIT <Red>ELECTRONICS</Red></Head>
      <Laptop x={1160} y={620} s={420} />
      {glitch > 0 ? <div style={{ position: "absolute", left: 1160 - 200, top: 620 - 180, width: 410, height: 240, background: `repeating-linear-gradient(0deg, rgba(229,57,53,${0.5 * glitch}) 0 14px, rgba(37,99,235,${0.3 * glitch}) 14px 22px)` }} /> : null}
      <Ray a={F(60.5)} dur={8} x0={1980} y0={300} x1={1190} y1={560} width={10} />
      <Shock cx={1190} cy={560} at={hit} R={160} color={C.red} n={2} />
    </S>
  );
};

export const C1Bits: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const flip = F(64.1);
  const cols = 12, rows = 4, cw = 110, ch = 120, x0 = 960 - (cols * cw) / 2, y0 = 360;
  return (
    <S b0={b0} b1={b1}>
      <PopIn at={b0} x={x0 - 30} y={y0 - 30} w={cols * cw + 60} h={rows * ch + 60}><div style={{ position: "absolute", inset: 0, borderRadius: 18, background: "#1E293B", border: `3px solid ${LIGHT.ink}`, boxShadow: `4px 4px 0 ${LIGHT.ink}` }} /></PopIn>
      {Array.from({ length: cols * rows }, (_, i) => { const cx = i % cols, cy = Math.floor(i / cols); const hot = cx === 7 && cy === 2; const v = hot ? (f >= flip ? 1 : 0) : (Math.sin(i * 9.1) > 0.2 ? 1 : 0); return <div key={i} style={{ position: "absolute", left: x0 + cx * cw, top: y0 + cy * ch, width: cw, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 80, color: hot && f >= flip ? C.red : "#94A3B8", opacity: f >= b0 + 4 ? 1 : 0, textShadow: hot && f >= flip ? "0 0 24px rgba(229,57,53,0.8)" : undefined }}>{v}</div>; })}
      <Ray a={F(63.6)} dur={6} x0={x0 + 7 * cw + 260} y0={290} x1={x0 + 7 * cw + cw / 2} y1={y0 + 2 * ch + 50} width={9} />
      <Head at={F(62.6)} y={175}>FLIP A COMPUTER BIT</Head>
      <Stamp at={F(64.5)} x={680} y={880} text="BIT FLIP: 0 → 1" size={64} />
    </S>
  );
};

export const C1Belgium1: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const flip = F(68.3);
  const bits = "0000000000000000".split("").map((b, i) => (i === 3 && f >= flip ? "1" : b));
  return (
    <S b0={b0} b1={b1}>
      <PillAt at={F(65.4)} x={120} y={175} text="2003 · BELGIUM ELECTION" color={C.red} size={40} />
      <BallotBox x={420} y={620} s={300} />
      <div style={{ position: "absolute", left: 760, top: 470, fontFamily: FONT.mono, fontWeight: 700, fontSize: 64, letterSpacing: 2, opacity: f >= b0 + 8 ? 1 : 0 }}>
        {bits.map((b, i) => <span key={i} style={{ color: i === 3 && f >= flip ? C.red : LIGHT.ink, marginRight: i % 4 === 3 ? 26 : 0, textShadow: i === 3 && f >= flip ? "0 0 20px rgba(229,57,53,0.7)" : undefined }}>{b}</span>)}
      </div>
      <Ray a={F(67.9)} dur={6} x0={1100} y0={-60} x1={943} y1={480} width={8} />
      <Pop at={F(66.7)} x={760} y={600} w={1100} size={44}>SUSPECTED <Blue>COSMIC-RAY</Blue> BIT FLIP</Pop>
      <Pop at={F(68.3)} x={760} y={680} w={1100} size={44} color={C.red}>0 → 1</Pop>
    </S>
  );
};
export const C1Belgium2: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <BallotBox x={420} y={640} s={300} />
      {Array.from({ length: 6 }, (_, i) => { const k = r(f, F(69.6) + i * 4, F(69.6) + i * 4 + 14, 0, 1, Easing.in(Easing.quad)); return k > 0 && k < 1 ? <div key={i} style={{ position: "absolute", left: 420 - 40 + (i - 3) * 60 * (1 - k), top: 120 + 380 * k, width: 70, height: 52, background: "#FFF", border: `4px solid ${LIGHT.ink}`, borderRadius: 4, rotate: `${(i - 3) * 9}deg` }} /> : null; })}
      <Count a={F(69.6)} b={F(70.6)} to={4096} fmt={(v) => `+${Math.round(v).toLocaleString("en-US")}`} x={760} y={340} w={1100} size={210} color={C.red} />
      <Pop at={F(71.6)} x={770} y={590} w={1000} size={64}>EXTRA VOTES</Pop>
      <Stamp at={F(73.6)} x={780} y={720} text="OUT OF THIN AIR" size={70} />
    </S>
  );
};

export const C1DeepSpace: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(75.1)} y={175}>DEEP SPACE · <Red>NO SHIELD</Red></Head>
      <DNA x={960} y={620} s={240} t={t30(f)} />
      {[0, 1, 2, 3, 4].map((i) => <Ray key={i} a={b0 + 4 + i * 11} dur={7} x0={-60} y0={330 + i * 130} x1={1980} y1={420 + ((i * 3) % 5) * 120} width={8} />)}
    </S>
  );
};
export const C1DNA: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const br = r(f, F(77.6), F(78.4));
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(77.6)} y={175}>DAMAGES HUMAN <Red>DNA</Red></Head>
      <DNA x={760} y={620} s={240} t={t30(f)} broken={br} />
      <Ray a={F(77.3)} dur={6} x0={-60} y0={380} x1={1980} y1={860} width={9} />
      <Stamp at={F(79.6)} x={1080} y={520} text="CANCER RISK" size={80} />
    </S>
  );
};

export const C1Warn: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} overlay={<><Presenter pose="the_catch" at={b0} heroFor={2.0} />{[0, 1, 2].map((i) => <Ray key={i} a={F(83.3) + i * 9} dur={6} x0={200 + i * 40} y0={-60} x1={140 + i * 40} y1={1140} width={7} />)}</>}>
    <WarnBeat b0={b0} b1={b1} mode="light" x={620} at={F(81.8)} value="0 SECONDS" sub={<>YOU&apos;RE GETTING HIT <Red>RIGHT NOW</Red></>} subAt={F(83.2)} />
  </S>
);

export const C1Count: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const sweep = r(f, b0 + 8, b1, 0, 0.35, Easing.inOut(Easing.cubic));
  return (
    <S b0={b0} b1={b1}>
      <Head at={b0} y={175}>NOW LET&apos;S <Red>COUNT DOWN</Red></Head>
      <div style={{ position: "absolute", left: 160, top: 560, width: 1600, height: 44, borderRadius: 22, border: `4px solid ${LIGHT.ink}`, background: `linear-gradient(90deg, ${C.green}, ${C.amber} 55%, ${C.red})`, boxSizing: "border-box", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 1600 * sweep, top: 0, right: 0, bottom: 0, background: "rgba(246,244,239,0.82)" }} />
      </div>
      <Arrow x1={160} y1={700} x2={160 + 1600 * sweep} y2={700} color={LIGHT.ink} w={8} k={sweep > 0.02 ? 1 : 0} />
      <Pop at={F(88.0)} x={120} y={760} w={600} size={56} color={C.green}>YEARS AHEAD</Pop>
      <Pop at={F(88.0) + 6} x={1200} y={760} w={600} size={56} align="right" color="#B7B0A2">0.00 SECONDS</Pop>
    </S>
  );
};

export const C1ToC2: React.FC<BeatProps> = (p) => <Transition {...p} next={1} label={<>…TO THE ONES YOU&apos;LL <Red>NEVER SEE COMING</Red></>} />;

export const CH1 = [
  { t: 19.5, C: C1Title }, { t: 21.8, C: C1Sources }, { t: 26.2, C: C1Shower }, { t: 31.0, C: C1Year }, { t: 34.9, C: C1OMG },
  { t: 37.5, C: C1Proton }, { t: 40.0, C: C1Race }, { t: 43.6, C: C1Gap }, { t: 47.0, C: C1Cm }, { t: 49.5, C: C1Baseball },
  { t: 54.3, C: C1Shield }, { t: 57.7, C: C1Laptop }, { t: 61.5, C: C1Bits }, { t: 65.2, C: C1Belgium1 }, { t: 69.6, C: C1Belgium2 },
  { t: 74.8, C: C1DeepSpace }, { t: 77.1, C: C1DNA }, { t: 80.9, C: C1Warn }, { t: 85.4, C: C1Count }, { t: 88.6, C: C1ToC2 },
];
export const _unused = [Chip];
