import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Count, Pop, Stamp } from "../components/Base";
import { Presenter } from "../components/Char";
import { IconMagnetar } from "../components/Icons";
import { BeatProps, ChapterTitle, Transition, WarnBeat } from "../components/Kit";
import { Arrow, Atom, Card$, Earth, Flash, Galaxy, Head, PillAt, PopIn, Shock, Stage, Sun, Svg, XMark, Red, Blue, Amber } from "../components/Prims";
import { C, F, FONT, SPACE, r } from "../lib/core";

const BADGE = "0.00 SECONDS";
const BA = F(352.5);
const S: React.FC<BeatProps & { children: React.ReactNode; overlay?: React.ReactNode }> = ({ b0, b1, children, overlay }) => (
  <Stage mode="space" badge={BADGE} badgeAt={BA} danger push={[b0, b1]} overlay={overlay}>{children}</Stage>
);
const T = SPACE.text;
const STAMP_BG = "rgba(14,19,31,0.92)";

export const C6Title: React.FC<BeatProps> = (p) => <ChapterTitle {...p} i={5} mode="space" badge={BADGE} danger />;

// a magnetar: small white-blue sphere with rotating dipole field loops
const Mag: React.FC<{ cx: number; cy: number; R: number; t: number; loops?: number; crack?: number }> = ({ cx, cy, R, t, loops = 3, crack = 0 }) => (
  <svg style={{ position: "absolute", left: cx - R * 6, top: cy - R * 6, overflow: "visible" }} width={R * 12} height={R * 12}>
    <g transform={`translate(${R * 6} ${R * 6}) rotate(${t * 40})`}>
      {Array.from({ length: loops }, (_, i) => { const w = R * (1.8 + i * 1.3); return <ellipse key={i} rx={w * 0.55} ry={w} fill="none" stroke={C.blue} strokeWidth={Math.max(3, R * 0.12)} opacity={0.95 - i * 0.12} />; })}
    </g>
    <circle cx={R * 6} cy={R * 6} r={R} fill="#DBEAFE" stroke="#141824" strokeWidth={Math.max(4, R * 0.1)} />
    {crack > 0 ? <path d={`M ${R * 6 - R * 0.7} ${R * 6 - R * 0.3} L ${R * 6 - R * 0.1} ${R * 6 + R * 0.1} L ${R * 6 + R * 0.2} ${R * 6 - R * 0.5} L ${R * 6 + R * 0.7} ${R * 6 + R * 0.2}`} fill="none" stroke={C.red} strokeWidth={R * 0.12} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - crack} /> : null}
  </svg>
);

export const C6Core: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(356.4)} y={160} mode="space">THE COLLAPSED CORE OF A <Red>DEAD STAR</Red></Head>
      <Mag cx={960} cy={600} R={70} t={f / 30} loops={3} />
      <Pop at={F(357.9)} x={0} y={940} w={1920} size={48} align="center" color={T} mono>~20 KM WIDE</Pop>
    </S>
  );
};
export const C6Field: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const g = r(f, F(359.6), F(361.6));
  return (
    <S b0={b0} b1={b1}>
      <Count a={F(360.4)} b={F(361.4)} from={1} to={1000} fmt={(v) => `${Math.round(v).toLocaleString("en-US")} TRILLION×`} x={0} y={150} w={1920} size={104} color={C.blue} align="center" />
      <Pop at={F(361.9)} x={0} y={275} w={1920} size={48} align="center" color={T}>STRONGER THAN EARTH&apos;S MAGNETIC FIELD</Pop>
      <Mag cx={960} cy={720} R={46 + 6 * g} t={f / 30} loops={2 + Math.round(2 * g)} />
    </S>
  );
};
export const C6Moon: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const wipe = F(366.8);
  return (
    <S b0={b0} b1={b1}>
      <Earth cx={260} cy={460} R={120} t={t} />
      <div style={{ position: "absolute", left: 1660 - 50, top: 460 - 50, width: 100, height: 100, borderRadius: 99, background: "#CBD5E1", border: "6px solid #141824", boxSizing: "border-box" }} />
      <Svg><line x1="400" y1="460" x2="1590" y2="460" stroke={T} strokeWidth="4" strokeDasharray="16 14" opacity="0.6" /></Svg>
      <PopIn at={F(364.4)} x={960 - 120} y={460 - 120} w={240} h={240}><IconMagnetar size={240} t={t} /></PopIn>
      <Pop at={F(364.4)} x={660} y={260} w={600} size={44} align="center" color={C.blue}>HALFWAY TO THE MOON</Pop>
      {[640, 960, 1280].map((x, i) => <React.Fragment key={i}><Card$ x={x} y={790} s={120} wiped={r(f, wipe + i * 3, wipe + i * 3 + 6)} /><XMark x={x} y={790} s={60} at={wipe + i * 3 + 4} /></React.Fragment>)}
      <Pop at={F(366.0)} x={0} y={930} w={1920} size={52} align="center" color={T}>WIPES EVERY <Red>CREDIT CARD</Red> ON EARTH</Pop>
    </S>
  );
};
export const C6Km: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  return (
    <S b0={b0} b1={b1} overlay={<Presenter pose="shocked" at={b0} heroFor={1.6} />}>
      <Mag cx={1500} cy={600} R={60} t={t} loops={4} />
      <Arrow x1={760} y1={900} x2={1440} y2={900} color={T} w={6} dash="16 12" />
      <Arrow x1={1440} y1={900} x2={760} y2={900} color={T} w={6} dash="16 12" />
      <Pop at={F(369.4)} x={800} y={940} w={600} size={56} align="center" color={C.red} mono>1,000 KM</Pop>
      <Head at={F(371.5)} y={160} mode="space" x={560} w={1260}>ITS FIELD IS <Red>SO INTENSE</Red>…</Head>
    </S>
  );
};
export const C6Atoms: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const st = r(f, F(373.4), F(375.0), 0, 1, Easing.inOut(Easing.cubic));
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(373.4)} y={160} mode="space">IT DISTORTS THE <Blue>ELECTRON CLOUDS</Blue></Head>
      {[480, 960, 1440].map((x, i) => <Atom key={i} x={x} y={580} s={190} t={t} stretch={st} mode="space" />)}
      <Pop at={F(375.4)} x={0} y={880} w={1920} size={52} align="center" color={T}>OF THE ATOMS IN YOUR BODY</Pop>
    </S>
  );
};
export const C6Chem: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  return (
    <S b0={b0} b1={b1}>
      {[480, 960, 1440].map((x, i) => <Atom key={i} x={x} y={520} s={190} t={t} stretch={1} mode="space" color={C.red} />)}
      <Stamp at={F(377.6)} x={460} y={760} text="CHEMISTRY IMPOSSIBLE" size={84} bg={STAMP_BG} rot={-3} />
    </S>
  );
};
export const C6Quake: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const q = F(382.1);
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(379.7)} y={160} mode="space">EVEN FROM ACROSS THE GALAXY…</Head>
      <Mag cx={960} cy={620} R={130} t={f / 30} loops={1} crack={r(f, q, q + 10)} />
      <Shock cx={960} cy={620} at={q} R={320} color={C.red} n={3} period={0.9} />
      <Flash at={q} color="#FCA5A5" dur={8} />
      <Pop at={F(383.4)} x={0} y={940} w={1920} size={60} align="center" color={C.red}>A VIOLENT STARQUAKE</Pop>
    </S>
  );
};
export const C6Sgr: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <PillAt at={F(384.7)} x={110} y={160} text="DECEMBER 2004" color={C.red} size={48} />
      <Mag cx={500} cy={620} R={70} t={f / 30} loops={3} />
      <Pop at={F(387.3)} x={820} y={520} w={1000} size={130} color={T} mono>SGR 1806-20</Pop>
      <Pop at={F(387.6)} x={820} y={690} w={1000} size={48} color={C.blue}>A MAGNETAR</Pop>
    </S>
  );
};
export const C6Dist: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  return (
    <S b0={b0} b1={b1}>
      <Galaxy cx={960} cy={520} R={460} t={t * 0.3} />
      <div style={{ position: "absolute", left: 960 + 260 - 14, top: 520 + 70 - 14, width: 28, height: 28, borderRadius: 99, background: C.blue, border: "4px solid #F6F4EF" }} />
      <Pop at={b0 + 4} x={960 + 300} y={520 + 60} w={300} size={34} color={T}>EARTH</Pop>
      <div style={{ position: "absolute", left: 960 - 300 - 16, top: 520 - 60 - 16, width: 32, height: 32, borderRadius: 99, background: C.red, boxShadow: "0 0 24px 8px rgba(229,57,53,0.7)" }} />
      <Svg><line x1={960 + 250} y1={520 + 68} x2={960 - 290} y2={520 - 56} stroke={C.red} strokeWidth="5" strokeDasharray="14 10" /></Svg>
      <Pop at={F(390.3)} x={0} y={930} w={1920} size={60} align="center" color={C.amber}>TENS OF THOUSANDS OF LIGHT-YEARS AWAY</Pop>
    </S>
  );
};
export const C6Blast: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Count a={F(393.4)} b={F(394.2)} to={0.2} fmt={(v) => `${v.toFixed(1)} s`} x={0} y={420} w={1920} size={240} color={T} align="center" />
      <Pop at={F(394.0)} x={0} y={720} w={1920} size={64} align="center" color={C.red}>TWO-TENTHS OF A SECOND</Pop>
      <Flash at={F(393.4)} color="#FCA5A5" dur={8} />
      {f < 0 ? null : null}
    </S>
  );
};
export const C6Years: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(395.2)} y={160} mode="space">MORE ENERGY THAN OUR SUN EMITS IN…</Head>
      <Sun cx={480} cy={600} R={170} t={f / 30} />
      <Count a={F(397.3)} b={F(398.7)} to={100000} fmt={(v) => `>${Math.round(v).toLocaleString("en-US")}`} x={780} y={470} w={1100} size={150} color={C.amber} />
      <Pop at={F(398.7)} x={790} y={650} w={1000} size={60} color={T}>YEARS OF SUNLIGHT</Pop>
    </S>
  );
};
export const C6Iono: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const spike = r(f, F(400.3), F(400.8)) * (1 - 0.6 * r(f, F(401.2), b1));
  const pts = Array.from({ length: 50 }, (_, i) => { const x = 1080 + i * 14; const s = i > 24 && i < 30 ? spike * (1 - Math.abs(i - 27) / 3) : 0; return `${x},${700 - 20 * Math.sin(i * 0.9) * 0.3 - 260 * s}`; });
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 600 - 260, top: 560 - 260, width: 520, height: 520, borderRadius: 999, border: `16px solid rgba(147,197,253,${0.4 + 0.5 * spike})`, boxSizing: "border-box" }} />
      <Earth cx={600} cy={560} R={210} t={t} />
      <div style={{ position: "absolute", left: 1040, top: 360, width: 760, height: 400, borderRadius: 18, background: SPACE.card, border: `3px solid ${SPACE.border}` }} />
      <Svg><polyline points={pts.join(" ")} fill="none" stroke={C.amber} strokeWidth="7" strokeLinejoin="round" /></Svg>
      <Pop at={b0} x={1060} y={380} w={700} size={32} color={T}>UPPER ATMOSPHERE</Pop>
      <Pop at={F(400.4)} x={0} y={890} w={1920} size={56} align="center" color={T}>MEASURABLY <Amber>DISTURBED</Amber></Pop>
    </S>
  );
};
export const C6Ten: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(403.0)} y={160} mode="space">A FLARE LIKE THAT WITHIN…</Head>
      <PopIn at={b0} x={240} y={460} w={200} h={200}><IconMagnetar size={200} t={t} /></PopIn>
      <Earth cx={1600} cy={560} R={110} t={t} />
      <Arrow x1={460} y1={560} x2={1460} y2={560} color={C.red} w={8} k={r(f, F(404.2), F(405.0))} dash="18 12" />
      <Pop at={F(404.7)} x={660} y={620} w={600} size={90} align="center" color={C.red} mono>10 LY</Pop>
    </S>
  );
};
export const C6Ozone: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const strip = r(f, F(407.2), F(408.4));
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 960 - 300 - 80 * strip, top: 560 - 300 - 80 * strip, width: 600 + 160 * strip, height: 600 + 160 * strip, borderRadius: 999, border: `18px dashed rgba(147,197,253,${0.7 * (1 - strip)})`, boxSizing: "border-box" }} />
      <Earth cx={960} cy={560} R={230} t={t} />
      {Array.from({ length: 6 }, (_, i) => <Arrow key={i} x1={360 + i * 30} y1={200 + i * 120} x2={700 + i * 10} y2={330 + i * 90} color={C.red} w={9} k={r(f, F(406.5) + i * 2, F(406.5) + i * 2 + 10)} />)}
      <Pop at={F(407.4)} x={0} y={880} w={1920} size={60} align="center" color={C.red}>10 LY = OZONE STRIPPED</Pop>
    </S>
  );
};
export const C6Zero: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = r(f, F(413.3), F(414.5), 0, 1, Easing.linear);
  return (
    <S b0={b0} b1={b1}>
      <WarnBeat b0={b0} b1={b1} mode="space" at={F(410.8)} value="0.00 SECONDS" />
      {k > 0 ? <Svg><line x1={-100 + 2100 * k - 500} y1={830} x2={-100 + 2100 * k} y2={830} stroke="#FDE68A" strokeWidth="14" strokeLinecap="round" /></Svg> : null}
      <Pop at={F(414.0)} x={0} y={900} w={1920} size={48} align="center" color="#FDE68A">AT THE SPEED OF LIGHT</Pop>
    </S>
  );
};
export const C6ToC7: React.FC<BeatProps> = (p) => <Transition {...p} next={6} label={<>AN EXPLOSION <Red>EVEN BRIGHTER</Red>…</>} />;

export const CH6 = [
  { t: 352.5, C: C6Title }, { t: 355.0, C: C6Core }, { t: 359.3, C: C6Field }, { t: 363.5, C: C6Moon }, { t: 368.5, C: C6Km },
  { t: 372.6, C: C6Atoms }, { t: 376.2, C: C6Chem }, { t: 379.5, C: C6Quake }, { t: 384.4, C: C6Sgr }, { t: 389.1, C: C6Dist },
  { t: 392.5, C: C6Blast }, { t: 394.9, C: C6Years }, { t: 399.2, C: C6Iono }, { t: 402.7, C: C6Ten }, { t: 406.3, C: C6Ozone },
  { t: 409.9, C: C6Zero }, { t: 415.3, C: C6ToC7 },
];
export const _u6 = [FONT];
