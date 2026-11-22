import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Card, Pop, Stamp } from "../components/Base";
import { Presenter } from "../components/Char";
import { BeatProps, ChapterTitle, Transition, WarnBeat } from "../components/Kit";
import { Arrow, Bank, City, Earth, Head, Orbit, Pin, PillAt, PopIn, Pylon, Satellite, Shock, Stage, Sun, Svg, Tap, Wifi, XMark, Red, Amber, Green } from "../components/Prims";
import { C, F, FONT, LIGHT, SPACE, r } from "../lib/core";
import { C4Race, SunBody } from "./Ch4";

const BADGE = "~18 HOURS TO 3 DAYS";
const BA = F(209.96);
const S: React.FC<BeatProps & { mode?: "light" | "space"; children: React.ReactNode; overlay?: React.ReactNode }> = ({ b0, b1, mode = "space", children, overlay }) => (
  <Stage mode={mode} badge={BADGE} badgeAt={BA} push={[b0, b1]} overlay={overlay}>{children}</Stage>
);
const T = SPACE.text;

export const C4Title: React.FC<BeatProps> = (p) => <ChapterTitle {...p} i={3} mode="space" badge={BADGE} />;

export const C4Gentle: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <SunBody cx={760} cy={620} R={300} t={f / 30} />
      <Head at={F(212.9)} y={160} mode="space">OUR SUN LOOKS <Green>GENTLE</Green>…</Head>
      <Earth cx={1650} cy={620} R={60} t={f / 30} />
    </S>
  );
};
export const C4Snap: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const snap = F(216.32);
  return (
    <S b0={b0} b1={b1}>
      <SunBody cx={620} cy={620} R={300} t={f / 30} />
      {f >= snap ? <Svg>{[0, 1, 2].map((i) => { const k = r(f, snap + i * 3, snap + i * 3 + 30); return <path key={i} d={`M ${910} ${560 + i * 40} Q ${1080 + 420 * k} ${380 - 200 * k + i * 90} ${1100 + 600 * k} ${600 + i * 50}`} fill="none" stroke={C.amber} strokeWidth={20 - i * 5} strokeLinecap="round" opacity={1 - 0.3 * k} />; })}</Svg> : null}
      <Shock cx={920} cy={600} at={snap} R={260} color={C.red} n={2} period={0.9} />
      <Head at={snap} y={160} mode="space">ITS MAGNETIC FIELDS <Red>SNAP</Red></Head>
      <Pop at={F(217.4)} x={1080} y={900} w={760} size={52} align="center" color={T}>BILLIONS OF TONS OF PLASMA</Pop>
    </S>
  );
};
export const C4CME: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const k = r(f, b0, b1, 0, 1, Easing.inOut(Easing.sin));
  const x = 520 + 900 * k;
  return (
    <S b0={b0} b1={b1}>
      <SunBody cx={-60} cy={560} R={400} t={t} />
      <Svg>
        <path d={`M ${x - 80} ${560 - 140 - 80 * k} Q ${x + 80} 560 ${x - 80} ${560 + 140 + 80 * k}`} fill="none" stroke={C.amber} strokeWidth="34" strokeLinecap="round" />
        <path d={`M ${x - 80} ${560 - 140 - 80 * k} Q ${x + 80} 560 ${x - 80} ${560 + 140 + 80 * k}`} fill="none" stroke="#FFF4D6" strokeWidth="10" strokeLinecap="round" />
      </Svg>
      <Earth cx={1700} cy={560} R={80} t={t} />
      <Head at={F(220.4)} y={160} mode="space">STRAIGHT TOWARD <Amber>EARTH</Amber></Head>
      <Pop at={F(221.7)} x={560} y={900} w={1100} size={56} align="center" color={C.amber}>CORONAL MASS EJECTION</Pop>
    </S>
  );
};
export const C4Year: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <SunBody cx={-160} cy={540} R={360} t={f / 30} />
      <Pop at={F(223.7)} x={360} y={260} w={1400} size={300} align="center" color={T} from="scale" mono>1859</Pop>
      <Pop at={F(225.5)} x={360} y={640} w={1400} size={58} align="center" color={T}>ONE OF THE <Red>STRONGEST SOLAR STORMS</Red></Pop>
      <Pop at={F(226.7)} x={360} y={730} w={1400} size={58} align="center" color={T}>EVER RECORDED</Pop>
    </S>
  );
};
export const C4Effects: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const sparks = F(234.8);
  const aur = r(f, F(236.4), F(237.4));
  return (
    <S b0={b0} b1={b1}>
      <Pylon x={420} y={560} s={260} on={f >= sparks ? 0 : 1} mode="space" />
      {[0, 1, 2].map((i) => <Shock key={i} cx={420 + 130 * i} cy={420 + 30 * i} at={sparks + i * 5} R={90} color={C.amber} n={2} period={0.6} />)}
      <Pop at={sparks} x={160} y={900} w={600} size={44} align="center" color={T}>TELEGRAPH WIRES SPARKED</Pop>
      <Earth cx={1360} cy={540} R={240} t={t} />
      {aur > 0 ? <Svg><path d={`M ${1360 - 230} ${540 - 40 + 120 * aur} Q 1360 ${540 - 200 + 220 * aur} ${1360 + 230} ${540 - 40 + 120 * aur}`} fill="none" stroke="#34D399" strokeWidth={28} strokeLinecap="round" opacity={0.85} /><path d={`M ${1360 - 220} ${540 - 70 + 120 * aur} Q 1360 ${540 - 230 + 220 * aur} ${1360 + 220} ${540 - 70 + 120 * aur}`} fill="none" stroke="#A855F7" strokeWidth={16} strokeLinecap="round" opacity={0.6} /></Svg> : null}
      <Pop at={F(236.6)} x={1000} y={830} w={720} size={44} align="center" color="#34D399">AURORAS AS FAR SOUTH</Pop>
      <Pop at={F(237.6)} x={1000} y={890} w={720} size={44} align="center" color="#34D399">AS THE CARIBBEAN</Pop>
    </S>
  );
};
const SUN = { x: 560, y: 600 }, OR = 520;
const MissBase: React.FC<BeatProps & { phase: number }> = ({ b0, b1, phase }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const ea = -0.5 - 0.25 * r(f, b0, b1, 0, 1, Easing.linear) - (phase ? 0.25 : 0);
  const ex = SUN.x + Math.cos(ea) * OR, ey = SUN.y + Math.sin(ea) * OR * 0.62;
  const launch = F(241.3);
  const k = r(f, launch, F(244.2), 0, 1, Easing.inOut(Easing.sin));
  const cx = SUN.x + 110 + (OR + 40 - 110) * k;
  return (
    <S b0={b0} b1={b1}>
      <PillAt at={F(239.7)} x={110} y={160} text="JULY 2012" color={C.red} size={44} />
      <Orbit cx={SUN.x} cy={SUN.y} rx={OR} ry={OR * 0.62} />
      <Sun cx={SUN.x} cy={SUN.y} R={90} t={t} />
      <Earth cx={ex} cy={ey} R={46} t={t} />
      {f >= launch ? <Svg><path d={`M ${cx - 40} ${SUN.y - 130} Q ${cx + 60} ${SUN.y} ${cx - 40} ${SUN.y + 130}`} fill="none" stroke={C.amber} strokeWidth="28" strokeLinecap="round" /></Svg> : null}
      {phase ? <>
        <Svg><path d={`M ${SUN.x + OR} ${SUN.y} A ${OR} ${OR * 0.62} 0 0 0 ${ex} ${ey}`} fill="none" stroke={C.red} strokeWidth="8" strokeDasharray="14 10" /></Svg>
        <Pop at={F(246.6)} x={1180} y={300} w={640} size={80} align="center" color={C.red} mono>~9 DAYS</Pop>
        <Pop at={F(244.8)} x={1180} y={420} w={640} size={44} align="center" color={T}>MISSED EARTH BY ONLY</Pop>
      </> : <Pop at={F(242.2)} x={1180} y={300} w={640} size={48} align="center" color={T}>A STORM JUST AS POWERFUL</Pop>}
    </S>
  );
};
export const C4Miss1: React.FC<BeatProps> = (p) => <MissBase {...p} phase={0} />;
export const C4Miss2: React.FC<BeatProps> = (p) => <MissBase {...p} phase={1} />;

export const C4Skin: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} mode="light" overlay={<Presenter pose="shocked" at={b0} heroFor={1.8} />}>
    <Head at={F(248.2)} y={160}>IF ONE HITS US <Red>DIRECTLY</Red> TODAY…</Head>
    <Pop at={F(250.3)} x={760} y={480} w={1060} size={74} align="center">IT WOULDN&apos;T BURN</Pop>
    <Pop at={F(250.8)} x={760} y={580} w={1060} size={74} align="center" color={C.green}>YOUR SKIN</Pop>
  </S>
);
export const C4Grid: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const items = [{ at: F(253.4), x: 420, l: "TRANSFORMERS", I: Pylon }, { at: F(255.3), x: 960, l: "SATELLITES", I: Satellite }, { at: F(256.0), x: 1500, l: "GPS", I: Pin }];
  return (
    <S b0={b0} b1={b1} mode="light">
      <Head at={F(252.7)} y={160}>IT COULD <Red>OVERLOAD</Red>…</Head>
      {items.map((it, i) => { const off = f >= it.at + 12; return <React.Fragment key={i}><PopIn at={b0 + i * 4} x={it.x - 170} y={360} w={340} h={340}><div style={{ position: "absolute", inset: 0, opacity: off ? 0.4 : 1 }}><it.I x={170} y={170} s={240} on={off ? 0 : 1} /></div></PopIn><Shock cx={it.x} cy={530} at={it.at} R={170} color={C.red} n={2} period={0.7} /><XMark x={it.x} y={530} s={80} at={it.at + 12} /><Pop at={it.at} x={it.x - 250} y={760} w={500} size={48} align="center">{it.l}</Pop></React.Fragment>; })}
    </S>
  );
};
export const C4Dark1: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const lights = 1 - r(f, F(258.5), F(259.3));
  return (
    <S b0={b0} b1={b1} mode="light">
      <div style={{ position: "absolute", left: 160, top: 300, width: 980, height: 620, borderRadius: 18, background: lights > 0.5 ? "#1E293B" : "#0B1120", border: `3px solid ${LIGHT.ink}` }} />
      <City x={650} y={880} s={190} lights={lights} />
      <Head at={F(257.0)} y={160}>ENTIRE REGIONS WITHOUT…</Head>
      <Pop at={F(258.7)} x={1220} y={380} w={600} size={52} align="center">ELECTRICITY</Pop>
      <PopIn at={F(259.8)} x={1380} y={500} w={280} h={240}><Tap x={140} y={120} s={150} /></PopIn>
      <XMark x={1520} y={620} s={70} at={F(260.1)} />
      <Pop at={F(259.9)} x={1220} y={780} w={600} size={52} align="center">CLEAN WATER</Pop>
    </S>
  );
};
export const C4Dark2: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} mode="light">
    <PopIn at={b0} x={340} y={300} w={300} h={260}><Bank x={150} y={150} s={180} /></PopIn>
    <XMark x={490} y={440} s={80} at={F(260.9)} />
    <Pop at={F(260.8)} x={240} y={600} w={500} size={52} align="center">BANKING</Pop>
    <Pop at={F(261.7)} x={760} y={340} w={1060} size={90} align="center" color={C.red}>FOR WEEKS…</Pop>
    <Pop at={F(262.6)} x={760} y={480} w={1060} size={90} align="center" color={C.red}>OR EVEN MONTHS</Pop>
  </S>
);
export const C4Warn: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} mode="light" overlay={<Presenter pose="shocked" at={b0} heroFor={1.6} />}>
    <WarnBeat b0={b0} b1={b1} mode="light" x={620} size={120} at={F(265.5)} value="18 HOURS – 3 DAYS" color={C.amber} />
  </S>
);
export const C4Wifi: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const bars = f < F(271.1) ? 3 : f < F(271.7) ? 2 : f < F(272.2) ? 1 : 0;
  return (
    <S b0={b0} b1={b1} mode="light">
      <Head at={F(268.2)} y={160}>JUST ENOUGH TIME TO WATCH THE <Amber>SUN FLASH</Amber>…</Head>
      <Sun cx={330} cy={560} R={130} t={f / 30} />
      <Shock cx={330} cy={560} at={F(269.6)} R={260} color={C.amber} n={2} period={0.8} />
      <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}><Wifi x={1180} y={600} s={330} bars={bars} color={bars ? C.blue : "#CBD5E1"} /></div>
      <Pop at={F(270.4)} x={760} y={880} w={900} size={52} align="center">…AND YOUR <Red>WI-FI VANISH</Red></Pop>
    </S>
  );
};
export const C4Bridge: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} mode="light">
    <PopIn at={F(273.6)} x={160} y={300} w={760} h={520}><Card x={0} y={0} w={760} h={520} border={C.amber}><div style={{ position: "absolute", left: 0, top: 70, width: 760, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 52 }}>SOLAR STORM</div><div style={{ position: "absolute", left: 0, top: 190, width: 760, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 120, color: C.amber }}>1+ DAY</div></Card></PopIn>
    <PopIn at={F(276.6)} x={1000} y={300} w={760} h={520}><Card x={0} y={0} w={760} h={520} border={C.red}><div style={{ position: "absolute", left: 0, top: 70, width: 760, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 52 }}>NEXT KILLER</div><div style={{ position: "absolute", left: 0, top: 190, width: 760, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 96, color: C.red }}>A FEW HOURS</div></Card></PopIn>
    <Arrow x1={930} y1={560} x2={990} y2={560} color={LIGHT.ink} w={8} />
  </S>
);
export const C4ToC5: React.FC<BeatProps> = (p) => <Transition {...p} next={4} />;

export const CH4 = [
  { t: 209.96, C: C4Title }, { t: 212.4, C: C4Gentle }, { t: 216.3, C: C4Snap }, { t: 219.4, C: C4CME }, { t: 223.2, C: C4Year },
  { t: 228.0, C: C4Race }, { t: 234.46, C: C4Effects }, { t: 239.3, C: C4Miss1 }, { t: 243.0, C: C4Miss2 }, { t: 247.9, C: C4Skin },
  { t: 251.8, C: C4Grid }, { t: 256.9, C: C4Dark1 }, { t: 260.7, C: C4Dark2 }, { t: 264.1, C: C4Warn }, { t: 267.8, C: C4Wifi },
  { t: 273.3, C: C4Bridge }, { t: 278.0, C: C4ToC5 },
];
export const _u4 = [Stamp, T];
