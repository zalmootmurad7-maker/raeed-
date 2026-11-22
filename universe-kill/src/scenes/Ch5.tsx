import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Count, Pop } from "../components/Base";
import { BoardCard, cardPos } from "../components/Board";
import { Presenter } from "../components/Char";
import { IconSupernova } from "../components/Icons";
import { BeatProps, ChapterTitle, Transition, WarnBeat } from "../components/Kit";
import { Arrow, Bubble, Calendar, Earth, Flash, Galaxy, Head, PillAt, PopIn, Shock, Stage, Stream, Sun, Svg, Telescope, ThumbUp, Red, Blue, Amber, Green } from "../components/Prims";
import { C, F, LIGHT, SPACE, r, sp } from "../lib/core";

const BADGE = "HOURS (NEUTRINO FLASH)";
const BA = F(279.7);
const S: React.FC<BeatProps & { mode?: "light" | "space"; children: React.ReactNode; overlay?: React.ReactNode }> = ({ b0, b1, mode = "space", children, overlay }) => (
  <Stage mode={mode} badge={BADGE} badgeAt={BA} push={[b0, b1]} overlay={overlay}>{children}</Stage>
);
const T = SPACE.text;

export const C5Title: React.FC<BeatProps> = (p) => <ChapterTitle {...p} i={4} mode="space" badge={BADGE} />;

export const C5Core: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const c = 1 - 0.8 * r(f, F(285.8), F(286.4), 0, 1, Easing.in(Easing.cubic));
  return (
    <S b0={b0} b1={b1}>
      <Sun cx={960} cy={600} R={300} t={f / 30} color="#EF4444" />
      <div style={{ position: "absolute", left: 960 - 110 * c, top: 600 - 110 * c, width: 220 * c, height: 220 * c, borderRadius: 999, background: "#FFF7D6", border: "6px solid #141824", boxSizing: "border-box" }} />
      <Head at={F(283.3)} y={160} mode="space">A MASSIVE STAR <Red>RUNS OUT OF FUEL</Red></Head>
      <Pop at={F(285.8)} x={0} y={960} w={1920} size={52} align="center" color={C.amber}>ITS CORE COLLAPSES</Pop>
    </S>
  );
};
export const C5Boom: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const boom = F(286.8);
  const k = sp(f, boom, 10, 140);
  return (
    <S b0={b0} b1={b1}>
      <Shock cx={760} cy={640} at={boom} R={360} color={C.amber} n={3} period={1.2} />
      <div style={{ position: "absolute", left: 760 - 280, top: 640 - 280, width: 560, height: 560, scale: `${0.2 + 0.8 * k}` }}><IconSupernova size={560} t={t} /></div>
      <Galaxy cx={1600} cy={760} R={170} t={t} />
      <Flash at={boom} dur={12} />
      <Head at={F(288.6)} y={160} mode="space">IT CAN <Amber>OUTSHINE ITS ENTIRE GALAXY</Amber></Head>
    </S>
  );
};
export const C5Show: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const tw = 0.7 + 0.3 * Math.sin(f / 30 * 5);
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: -300, top: 820, width: 2520, height: 900, borderRadius: "50%", background: "#1E3A5F", border: "6px solid #E2E8F0" }} />
      <div style={{ position: "absolute", left: 1340 - 70, top: 360 - 70, width: 140, height: 140, borderRadius: 99, background: `radial-gradient(circle, rgba(255,255,255,${tw}) 0%, rgba(253,230,138,0.6) 25%, rgba(0,0,0,0) 70%)` }} />
      <Head at={F(292.3)} y={160} mode="space">THOUSANDS OF LIGHT-YEARS AWAY…</Head>
      <Pop at={F(294.5)} x={0} y={600} w={1920} size={70} align="center" color={C.green}>= A PRETTY LIGHT SHOW</Pop>
    </S>
  );
};
export const C5Zone: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const X0 = 360, X1 = 1760, Y = 560, ly = (v: number) => X0 + ((X1 - X0) * v) / 100;
  const z = r(f, F(298.5), F(299.4));
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(297.9)} y={160} mode="space">A SUPERNOVA WITHIN <Red>30–50 LIGHT-YEARS</Red></Head>
      <Earth cx={220} cy={Y + 20} R={80} t={f / 30} />
      <div style={{ position: "absolute", left: X0, top: Y, width: X1 - X0, height: 40, borderRadius: 20, background: "#1E293B", border: "4px solid #E2E8F0", boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: ly(0), top: Y, width: (ly(50) - ly(0)) * z, height: 40, borderRadius: 20, background: `linear-gradient(90deg, ${C.red}, ${C.red} 60%, rgba(229,57,53,0.5))` }} />
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => <React.Fragment key={v}><div style={{ position: "absolute", left: ly(v) - 2, top: Y + 48, width: 4, height: 24, background: "#E2E8F0" }} />{v % 10 === 0 && (v === 0 || v === 30 || v === 50 || v === 100) ? <Pop at={b0} x={ly(v) - 80} y={Y + 84} w={160} size={36} align="center" color={v === 30 || v === 50 ? C.red : T} mono>{v}</Pop> : null}</React.Fragment>)}
      <Pop at={b0} x={X1 - 300} y={Y + 140} w={300} size={32} align="right" color={T}>LIGHT-YEARS</Pop>
      <Pop at={F(299.6)} x={ly(10)} y={Y - 110} w={ly(50) - ly(10)} size={44} align="center" color={C.red}>DANGER ZONE</Pop>
    </S>
  );
};
export const C5Flood: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const rays = [{ at: F(302.4), y: 380, c: "#93C5FD", l: "X-RAYS" }, { at: F(303.6), y: 560, c: C.red, l: "GAMMA RAYS" }, { at: F(304.4), y: 740, c: C.amber, l: "COSMIC RAYS" }];
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(301.0)} y={160} mode="space">FLOODING OUR <Red>ATMOSPHERE</Red></Head>
      <div style={{ position: "absolute", left: 1320 - 290, top: 560 - 290, width: 580, height: 580, borderRadius: 999, border: "16px solid rgba(147,197,253,0.45)", boxSizing: "border-box" }} />
      <Earth cx={1320} cy={560} R={240} t={t} />
      {rays.map((rr, i) => <React.Fragment key={i}>{f >= rr.at ? <Stream x1={380} y1={rr.y} x2={1060} y2={560 + (rr.y - 560) * 0.4} n={10} speed={2} color={rr.c} spread={10} size={9} f0={rr.at} /> : null}<Pop at={rr.at} x={60} y={rr.y - 30} w={300} size={40} align="right" color={rr.c}>{rr.l}</Pop></React.Fragment>)}
    </S>
  );
};
export const C5Ozone: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const crack = r(f, F(305.6), F(307.0));
  const uv = F(309.2);
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(305.5)} y={160} mode="space">RIPPING APART OUR <Blue>OZONE LAYER</Blue></Head>
      <Earth cx={900} cy={660} R={230} t={t} />
      <Svg>{Array.from({ length: 10 }, (_, i) => { const a0 = Math.PI + (i / 10) * Math.PI, a1 = a0 + Math.PI / 10 - 0.05; const off = crack * (10 + (i % 3) * 18); const R = 300 + off; const cx = 900 + Math.cos((a0 + a1) / 2) * off * 0.5, cy = 660 + Math.sin((a0 + a1) / 2) * off * 0.5; return <path key={i} d={`M ${cx + Math.cos(a0) * R} ${cy + Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${cx + Math.cos(a1) * R} ${cy + Math.sin(a1) * R}`} fill="none" stroke="#93C5FD" strokeWidth={16} strokeLinecap="round" opacity={1 - 0.5 * crack * (i % 2)} />; })}</Svg>
      {f >= uv ? [0, 1, 2, 3].map((i) => <Arrow key={i} x1={1400 - i * 90} y1={300 + i * 30} x2={1080 - i * 60} y2={500 + i * 40} color="#A855F7" w={10} k={r(f, uv + i * 3, uv + i * 3 + 10)} />) : null}
      <Pop at={F(309.4)} x={1260} y={760} w={600} size={52} align="center" color="#A855F7">BRUTAL ULTRAVIOLET</Pop>
    </S>
  );
};
export const C5Catch: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} overlay={<Presenter pose="the_catch" at={b0} heroFor={1.8} />}>
    <Head at={F(311.3)} y={160} mode="space">HERE&apos;S <Red>THE CATCH</Red></Head>
    <PopIn at={F(313.6)} x={960} y={340} w={360} h={360}><Calendar x={180} y={180} s={260} /></PopIn>
    <Pop at={F(314.1)} x={760} y={800} w={760} size={52} align="center" color={T}>NOBODY CAN PREDICT THE YEAR</Pop>
  </S>
);
export const C5Watch: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const stars = [{ x: 900, y: 380, c: "#F87171", s: 34 }, { x: 1260, y: 300, c: "#93C5FD", s: 28 }, { x: 1560, y: 520, c: "#F87171", s: 40 }, { x: 1100, y: 640, c: "#93C5FD", s: 26 }];
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(317.3)} y={160} mode="space">THEY KEEP WATCH ON <Amber>MASSIVE STARS</Amber></Head>
      {stars.map((s, i) => { const k = sp(f, F(317.5) + i * 6, 12, 220); return <React.Fragment key={i}><div style={{ position: "absolute", left: s.x - s.s, top: s.y - s.s, width: s.s * 2, height: s.s * 2, borderRadius: 99, background: s.c, boxShadow: `0 0 30px 6px ${s.c}` }} /><div style={{ position: "absolute", left: s.x - 70, top: s.y - 70, width: 140, height: 140, border: `5px dashed ${C.green}`, borderRadius: 12, scale: `${1.6 - 0.6 * k}`, opacity: k, boxSizing: "border-box" }} /></React.Fragment>; })}
      <Telescope x={420} y={760} s={230} rot={-35} mode="space" />
    </S>
  );
};
export const C5None: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = sp(f, b0, 12, 160);
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 960 - 330 * k, top: 600 - 330 * k, width: 660 * k, height: 660 * k, borderRadius: 999, border: `8px dashed ${C.green}`, background: "rgba(16,185,129,0.08)", boxSizing: "border-box" }} />
      <Sun cx={960} cy={600} R={36} t={f / 30} />
      <Pop at={b0 + 8} x={1310} y={570} w={260} size={44} color={C.green} mono>50 LY</Pop>
      {[[300, 330], [1650, 300], [1580, 900], [260, 880], [1720, 620]].map(([x, y], i) => <div key={i} style={{ position: "absolute", left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 99, background: i % 2 ? "#F87171" : "#93C5FD", boxShadow: "0 0 24px 4px rgba(248,113,113,0.6)" }} />)}
      <Head at={F(322.0)} y={160} mode="space"><Green>NONE</Green> WITHIN 50 LIGHT-YEARS</Head>
    </S>
  );
};
const RaceBase: React.FC<BeatProps & { part: number }> = ({ b0, b1, part }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const nk = part === 0 ? r(f, F(325.8), F(329.4), 0, 0.85, Easing.inOut(Easing.sin)) : 0.85 + 0.25 * r(f, b0, F(331.0));
  const rk = part === 0 ? 0 : r(f, F(331.6), b1, 0, 0.55, Easing.in(Easing.quad));
  const X0 = 260, X1 = 1660, nx = X0 + (X1 - X0) * nk, rx = X0 + (X1 - X0) * rk;
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: X0 - 50, top: 560 - 50, width: 100, height: 100 }}><IconSupernova size={100} t={t} /></div>
      <Earth cx={X1} cy={560} R={90} t={t} />
      {nk > 0 ? <Svg><path d={`M ${nx} ${360} Q ${nx + 70} 560 ${nx} ${760}`} fill="none" stroke="#93C5FD" strokeWidth="12" strokeDasharray="18 14" /></Svg> : null}
      {nk > 0 ? <Pop at={F(325.8)} x={Math.min(nx, X1 - 200) - 200} y={260} w={400} size={40} align="center" color="#93C5FD">NEUTRINO ALARM</Pop> : null}
      {rk > 0 ? <Svg><path d={`M ${rx} ${340} Q ${rx + 90} 560 ${rx} ${780}`} fill="none" stroke={C.red} strokeWidth="26" strokeLinecap="round" /></Svg> : null}
      {rk > 0 ? <Pop at={F(332.3)} x={rx - 200} y={820} w={400} size={40} align="center" color={C.red}>DEADLY RADIATION</Pop> : null}
      {part === 0 ? <><Head at={F(324.6)} y={130} mode="space">OUR REAL-TIME ALARM…</Head><Pop at={F(328.3)} x={0} y={900} w={1920} size={48} align="center" color={C.green}>A HARMLESS BURST OF GHOST-LIKE NEUTRINOS</Pop></>
        : <Pop at={F(331.2)} x={960 - 400} y={130} w={800} size={64} align="center" color={T}>ARRIVING <Amber>HOURS</Amber> BEFORE</Pop>}
    </S>
  );
};
export const C5Race1: React.FC<BeatProps> = (p) => <RaceBase {...p} part={0} />;
export const C5Race2: React.FC<BeatProps> = (p) => <RaceBase {...p} part={1} />;
export const C5Warn: React.FC<BeatProps> = ({ b0, b1 }) => <S b0={b0} b1={b1}><WarnBeat b0={b0} b1={b1} mode="space" at={F(335.8)} value="JUST A FEW HOURS" color={C.amber} /></S>;
export const C5Final3: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1} mode="light">
      <Head at={F(338.3)} y={160}>THE FINAL THREE THREATS</Head>
      {[5, 6, 7].map((i, j) => { const p = cardPos(i); const k = sp(f, b0 + j * 5, 12, 220); return <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${300 + j * 460 - p.x}px, ${330 - p.y}px)`, scale: `${0.5 + 0.5 * k}`, opacity: Math.min(1, k * 2), transformOrigin: `${p.x + 200}px ${p.y + 180}px` }}><BoardCard i={i} t={f / 30} red /></div>; })}
      <Pop at={F(340.8)} x={0} y={790} w={1920} size={110} align="center" color={C.red} mono>0.00 SECONDS</Pop>
    </S>
  );
};
export const C5Like: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} mode="light">
    <PillAt at={F(342.4)} x={760} y={160} text="ENJOYING THIS TOUR?" color={C.blue} size={44} />
    <PopIn at={F(342.5)} x={760} y={340} w={400} h={400}><ThumbUp x={200} y={200} s={300} /></PopIn>
    <Pop at={F(342.6)} x={0} y={800} w={1920} size={70} align="center">HIT <Blue>LIKE</Blue></Pop>
  </S>
);
export const C5Comment: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} mode="light">
    <PopIn at={b0} x={360} y={320} w={400} h={360}><Bubble x={200} y={180} s={300} /></PopIn>
    <Pop at={F(344.7)} x={820} y={380} w={1000} size={64}>WHICH THREAT</Pop>
    <Pop at={F(345.5)} x={820} y={480} w={1000} size={64} color={C.red}>SCARES YOU MOST?</Pop>
    <Pop at={F(347.4)} x={820} y={640} w={1000} size={44} color={LIGHT.ink}>#6 IS A DEAD STAR THAT BREAKS CHEMISTRY…</Pop>
  </S>
);
export const C5ToC6: React.FC<BeatProps> = (p) => <Transition {...p} next={5} label={<>A DEAD STAR THAT <Red>BREAKS CHEMISTRY ITSELF</Red></>} />;

export const CH5 = [
  { t: 279.7, C: C5Title }, { t: 282.5, C: C5Core }, { t: 286.5, C: C5Boom }, { t: 291.4, C: C5Show }, { t: 295.7, C: C5Zone },
  { t: 301.0, C: C5Flood }, { t: 305.5, C: C5Ozone }, { t: 311.3, C: C5Catch }, { t: 316.3, C: C5Watch }, { t: 320.9, C: C5None },
  { t: 324.6, C: C5Race1 }, { t: 329.4, C: C5Race2 }, { t: 334.9, C: C5Warn }, { t: 337.3, C: C5Final3 }, { t: 342.4, C: C5Like },
  { t: 344.4, C: C5Comment }, { t: 349.0, C: C5ToC6 },
];
export const _u5 = [Count];
