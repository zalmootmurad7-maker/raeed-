import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Count, Pop, Stamp } from "../components/Base";
import { Couch } from "../components/Char";
import { BeatProps, ChapterTitle, Transition } from "../components/Kit";
import { Arrow, Check, Earth, Flash, Galaxy, Head, PillAt, Shock, Stage, Svg, Red, Blue, Green } from "../components/Prims";
import { C, F, FONT, LIGHT, SPACE, r, sp } from "../lib/core";

const BADGE = "0.00 SECONDS";
const BA = F(419.6);
const S: React.FC<BeatProps & { mode?: "light" | "space"; children: React.ReactNode; overlay?: React.ReactNode }> = ({ b0, b1, mode = "space", children, overlay }) => (
  <Stage mode={mode} badge={BADGE} badgeAt={BA} danger push={[b0, b1]} overlay={overlay}>{children}</Stage>
);
const T = SPACE.text;
const STAMP_BG = "rgba(14,19,31,0.92)";

export const C7Title: React.FC<BeatProps> = (p) => <ChapterTitle {...p} i={6} mode="space" badge={BADGE} danger />;

const Beams: React.FC<{ cx: number; cy: number; k: number; len?: number; a?: number; w?: number }> = ({ cx, cy, k, len = 1200, a = -0.6, w = 18 }) => {
  const dx = Math.cos(a), dy = Math.sin(a);
  return (
    <Svg>
      <line x1={cx} y1={cy} x2={cx - dx * len * k} y2={cy + dy * len * k} stroke={C.blue} strokeWidth={w * 2.4} strokeLinecap="round" opacity="0.25" />
      <line x1={cx} y1={cy} x2={cx + dx * len * k} y2={cy - dy * len * k} stroke={C.red} strokeWidth={w * 2.4} strokeLinecap="round" opacity="0.25" />
      <line x1={cx} y1={cy} x2={cx - dx * len * k} y2={cy + dy * len * k} stroke={C.blue} strokeWidth={w} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + dx * len * k} y2={cy - dy * len * k} stroke={C.red} strokeWidth={w} strokeLinecap="round" />
    </Svg>
  );
};
const Star: React.FC<{ cx: number; cy: number; R: number; color?: string }> = ({ cx, cy, R, color = "#BFDBFE" }) => (
  <>
    <div style={{ position: "absolute", left: cx - R * 1.8, top: cy - R * 1.8, width: R * 3.6, height: R * 3.6, borderRadius: 999, background: `radial-gradient(circle, rgba(191,219,254,0.5) 0%, rgba(0,0,0,0) 60%)` }} />
    <div style={{ position: "absolute", left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: 999, background: color, border: `${Math.max(4, R * 0.04)}px solid #141824`, boxSizing: "border-box" }} />
  </>
);

export const C7Collapse: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const c = 1 - 0.85 * r(f, F(423.7), F(424.4), 0, 1, Easing.in(Easing.cubic));
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(422.4)} y={160} mode="space">WHEN <Blue>HYPERMASSIVE STARS</Blue> COLLAPSE…</Head>
      <Star cx={960} cy={620} R={260 * c} />
      {c < 0.3 ? <Shock cx={960} cy={620} at={F(424.3)} R={300} color={C.blue} n={2} period={0.6} /> : null}
    </S>
  );
};
export const C7Merge: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const smash = F(426.1);
  const k = r(f, b0, smash, 0, 1, Easing.in(Easing.quad));
  const a = (f - b0) / 30 * (3 + 9 * k), d = 260 * (1 - k);
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(424.9)} y={160} mode="space">…OR TWO <Blue>NEUTRON STARS</Blue> SMASH TOGETHER</Head>
      {f < smash ? <><Star cx={960 + Math.cos(a) * d} cy={620 + Math.sin(a) * d * 0.6} R={46} /><Star cx={960 - Math.cos(a) * d} cy={620 - Math.sin(a) * d * 0.6} R={46} /></> : <Star cx={960} cy={620} R={60} color="#FEF3C7" />}
      <Shock cx={960} cy={620} at={smash} R={370} color={C.amber} n={3} period={0.8} />
      <Flash at={smash} dur={10} />
    </S>
  );
};
export const C7Jets: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = r(f, F(427.7), F(428.6), 0, 1, Easing.out(Easing.cubic));
  return (
    <S b0={b0} b1={b1}>
      <Beams cx={960} cy={600} k={k} a={-0.25} />
      <Star cx={960} cy={600} R={50} color="#FEF3C7" />
      <Head at={F(428.1)} y={160} mode="space">TWO NARROW, ULTRA-FOCUSED <Red>JETS</Red></Head>
      <Pop at={F(431.5)} x={0} y={940} w={1920} size={56} align="center" color={T}>BLASTING OUT INTENSE <Blue>GAMMA RAYS</Blue></Pop>
    </S>
  );
};
export const C7Bright: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 960 - 900, top: 540 - 900, width: 1800, height: 1800, borderRadius: 9999, background: `radial-gradient(circle, rgba(253,230,138,${0.25 + 0.15 * Math.sin(f / 30 * 4)}) 0%, rgba(253,230,138,0) 55%)` }} />
      <Pop at={F(432.7)} x={0} y={380} w={1920} size={86} align="center" color={T} from="scale">THE BRIGHTEST EXPLOSIONS</Pop>
      <Pop at={F(433.9)} x={0} y={490} w={1920} size={86} align="center" color="#FDE68A" from="scale">IN THE UNIVERSE</Pop>
      <Pop at={F(435.5)} x={0} y={700} w={1920} size={50} align="center" color={T}>AND WE&apos;VE SEEN THEIR REACH UP CLOSE</Pop>
      {f < 0 ? null : null}
    </S>
  );
};
export const C7Boat: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <PillAt at={F(437.8)} x={110} y={160} text="OCTOBER 2022" color={C.red} size={48} />
      <Beams cx={420} cy={640} k={r(f, b0, b0 + 20)} len={500} w={12} />
      <Pop at={F(440.7)} x={760} y={520} w={1100} size={140} color={T} mono>GRB 221009A</Pop>
    </S>
  );
};
export const C7Record: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const spike = r(f, F(443.6), F(444.2), 0, 1, Easing.out(Easing.cubic));
  const pts = Array.from({ length: 60 }, (_, i) => { const x = 260 + i * 23; const s = i > 34 && i < 40 ? spike * (1 - Math.abs(i - 37) / 3) : 0; return `${x},${800 - 18 * Math.abs(Math.sin(i * 1.7)) - 600 * s}`; });
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 220, top: 260, width: 1480, height: 600, borderRadius: 18, background: SPACE.card, border: `3px solid ${SPACE.border}` }} />
      <Svg><polyline points={pts.join(" ")} fill="none" stroke={C.amber} strokeWidth="8" strokeLinejoin="round" /></Svg>
      <Pop at={b0} x={250} y={280} w={700} size={32} color={T}>GAMMA-RAY DETECTOR</Pop>
      <Stamp at={F(444.0)} x={560} y={900} text="BRIGHTEST EVER RECORDED" size={64} bg={STAMP_BG} rot={-2} />
    </S>
  );
};
export const C7Dist: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const k = r(f, b0 + 4, b1, 0, 1, Easing.inOut(Easing.sin));
  return (
    <S b0={b0} b1={b1}>
      <Galaxy cx={200} cy={560} R={110} t={t} />
      <Svg><line x1={300} y1={560} x2={300 + (1300 - 300) * k} y2={560} stroke={C.red} strokeWidth="14" strokeLinecap="round" /></Svg>
      <Earth cx={1560} cy={560} R={100} t={t} />
      <Count a={F(447.9)} b={F(448.8)} to={2.4} fmt={(v) => `~${v.toFixed(1)} BILLION LY`} x={0} y={180} w={1920} size={110} color={C.amber} align="center" />
      <Pop at={F(449.6)} x={0} y={800} w={1920} size={48} align="center" color={T}>AWAY FROM EARTH</Pop>
    </S>
  );
};
export const C7Iono: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Svg><line x1={-40} y1={560} x2={700} y2={560} stroke={C.red} strokeWidth="14" strokeLinecap="round" /></Svg>
      <Shock cx={960} cy={560} at={F(451.6)} R={290} color="#93C5FD" n={3} period={1.0} />
      <Earth cx={960} cy={560} R={230} t={f / 30} />
      <Pop at={F(451.7)} x={0} y={880} w={1920} size={56} align="center" color={T}>IT STILL DISTURBED EARTH&apos;S <Blue>UPPER IONOSPHERE</Blue></Pop>
    </S>
  );
};
export const C7Sniper: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const aim = r(f, b0, F(457.6), 0, 1, Easing.inOut(Easing.cubic));
  const cx = 1300 + (960 - 1300) * aim, cy = 380 + (560 - 380) * aim;
  return (
    <S b0={b0} b1={b1}>
      <Earth cx={960} cy={560} R={170} t={t} />
      <Svg><circle cx={cx} cy={cy} r={260} fill="none" stroke={C.red} strokeWidth="6" /><line x1={cx - 320} y1={cy} x2={cx + 320} y2={cy} stroke={C.red} strokeWidth="4" /><line x1={cx} y1={cy - 320} x2={cx} y2={cy + 320} stroke={C.red} strokeWidth="4" /></Svg>
      <Pop at={F(455.1)} x={110} y={160} w={800} size={56} color={T}>WITHIN <Red>SEVERAL THOUSAND LY</Red></Pop>
      <Pop at={F(457.4)} x={0} y={920} w={1920} size={56} align="center" color={C.red}>POINTED STRAIGHT DOWN EARTH&apos;S BARREL</Pop>
    </S>
  );
};
export const C7Ozone: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const shred = r(f, F(459.5), F(460.6));
  return (
    <S b0={b0} b1={b1}>
      <Svg><line x1={-40} y1={560} x2={620} y2={560} stroke={C.red} strokeWidth="18" strokeLinecap="round" /></Svg>
      <Svg>{Array.from({ length: 14 }, (_, i) => { const a0 = (i / 14) * Math.PI * 2, a1 = a0 + Math.PI / 14; const off = shred * (20 + (i % 4) * 22); const R = 250 + off; return <path key={i} d={`M ${960 + Math.cos(a0) * R} ${600 + Math.sin(a0) * R} A ${R} ${R} 0 0 1 ${960 + Math.cos(a1) * R} ${600 + Math.sin(a1) * R}`} fill="none" stroke="#93C5FD" strokeWidth="18" strokeLinecap="round" opacity={1 - 0.7 * shred} />; })}</Svg>
      <Earth cx={960} cy={600} R={190} t={t} />
      <Head at={F(459.5)} y={160} mode="space">IT COULD <Red>SHRED OUR OZONE LAYER</Red></Head>
      <Pop at={F(461.1)} x={0} y={920} w={1920} size={52} align="center" color="#A855F7">EXPOSING THE SURFACE TO DEADLY UV</Pop>
    </S>
  );
};
export const C7Extinct: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const grey = r(f, F(464.4), F(465.3));
  return (
    <S b0={b0} b1={b1}>
      <div style={{ filter: `grayscale(${grey})` }}><Earth cx={960} cy={500} R={210} t={t} /></div>
      <Stamp at={F(465.0)} x={540} y={790} text="MASS EXTINCTION" size={96} bg={STAMP_BG} rot={-4} />
      <Head at={F(464.3)} y={160} mode="space">AND TRIGGER A…</Head>
    </S>
  );
};
export const C7Hide: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const flash = 0.5 + 0.5 * Math.sin(((f - b0) / 30) * Math.PI * 2 * 1.4);
  return (
    <Stage mode="light" badge={BADGE} badgeAt={BA} danger push={[b0, b1]}>
      <Couch pose="couch_hide" x={960 - 440} bottom={1050} w={880} at={b0} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, boxShadow: `inset 0 0 ${120 + 80 * flash}px rgba(229,57,53,${0.25 + 0.2 * flash})` }} />
      <Pop at={F(466.6)} x={0} y={160} w={1920} size={60} align="center">WARNING TIME?</Pop>
      <Pop at={F(467.5)} x={0} y={240} w={1920} size={104} align="center" color={C.red} from="scale" mono>0.00 SECONDS</Pop>
    </Stage>
  );
};
export const C7Speed: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const k = r(f, b0 + 6, b1 - 4, 0, 1, Easing.linear);
  return (
    <S b0={b0} b1={b1}>
      <Earth cx={1640} cy={600} R={110} t={t} />
      <Svg><line x1={-100} y1={600} x2={-100 + 1640 * k} y2={600} stroke={C.red} strokeWidth="18" strokeLinecap="round" /></Svg>
      <Head at={F(470.3)} y={160} mode="space">IT TRAVELS AT <Red>LIGHT SPEED</Red></Head>
    </S>
  );
};
export const C7Seen: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const hit = F(474.5);
  return (
    <S b0={b0} b1={b1}>
      <Svg><line x1={-100} y1={600} x2={Math.min(1540, -100 + 1640 * r(f, b0, hit, 0, 1, Easing.linear))} y2={600} stroke={C.red} strokeWidth="18" strokeLinecap="round" /></Svg>
      <Earth cx={1640} cy={600} R={110} t={t} />
      <Shock cx={1640} cy={600} at={hit} R={300} color={C.red} n={2} period={0.6} />
      <Pop at={F(472.0)} x={110} y={160} w={1100} size={60} color={T}>THE FIRST MOMENT WE <Blue>SEE IT</Blue>…</Pop>
      <Pop at={F(474.1)} x={110} y={830} w={1300} size={60} color={T}>…IS THE MOMENT <Red>IT HITS</Red></Pop>
    </S>
  );
};
export const C7Intact: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const laws = ["E = mc²", "F = ma", "G", "ħ"];
  return (
    <S b0={b0} b1={b1} mode="light">
      <Head at={F(476.8)} y={160}>AT LEAST IT LEAVES THE <Green>LAWS OF PHYSICS INTACT</Green></Head>
      {laws.map((l, i) => { const k = sp(f, b0 + 6 + i * 4, 12, 220); return <div key={i} style={{ position: "absolute", left: 260 + i * 370, top: 420, width: 300, height: 220, borderRadius: 18, background: "#FFF", border: `3px solid ${LIGHT.ink}`, boxShadow: `4px 4px 0 ${LIGHT.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 64, scale: `${0.5 + 0.5 * k}`, opacity: Math.min(1, k * 2) }}>{l}</div>; })}
      <Check x={960} y={820} s={70} at={F(479.0)} />
    </S>
  );
};
export const C7ToC8: React.FC<BeatProps> = (p) => <Transition {...p} next={7} label={<>NUMBER 8 <Red>DELETES REALITY ITSELF</Red></>} />;

export const CH7 = [
  { t: 419.6, C: C7Title }, { t: 421.6, C: C7Collapse }, { t: 424.5, C: C7Merge }, { t: 427.2, C: C7Jets }, { t: 432.6, C: C7Bright },
  { t: 437.0, C: C7Boat }, { t: 441.5, C: C7Record }, { t: 446.7, C: C7Dist }, { t: 450.5, C: C7Iono }, { t: 454.0, C: C7Sniper },
  { t: 459.2, C: C7Ozone }, { t: 462.4, C: C7Extinct }, { t: 465.9, C: C7Hide }, { t: 469.7, C: C7Speed }, { t: 472.0, C: C7Seen },
  { t: 476.0, C: C7Intact }, { t: 480.3, C: C7ToC8 },
];
export const _u7 = [Arrow, T];
