import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Count, Pop, Stamp } from "../components/Base";
import { Presenter } from "../components/Char";
import { BeatProps, ChapterTitle, Transition, WarnBeat } from "../components/Kit";
import { Arrow, BlackHole, City, Earth, Galaxy, Head, Hubble, Orbit, PillAt, PopIn, Shock, Stage, Sun, Svg, XMark, Red, Blue, Amber } from "../components/Prims";
import { C, F, SPACE, r } from "../lib/core";

const BADGE = "YEARS TO DECADES";
const BA = F(91.3);
const S: React.FC<BeatProps & { children: React.ReactNode; overlay?: React.ReactNode }> = ({ b0, b1, children, overlay }) => (
  <Stage mode="space" badge={BADGE} badgeAt={BA} push={[b0, b1]} overlay={overlay}>{children}</Stage>
);
const T = SPACE.text;
const STAMP_BG = "rgba(14,19,31,0.92)";

export const C2Title: React.FC<BeatProps> = (p) => <ChapterTitle {...p} i={1} mode="space" badge={BADGE} />;

export const C2Galaxy: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(94.9)} y={175} mode="space">OUR <Blue>MILKY WAY</Blue> HOLDS…</Head>
      <PopIn at={b0} x={960 - 460} y={600 - 460} w={920} h={920} from={0.7}><Galaxy cx={460} cy={460} R={440} t={f / 30} /></PopIn>
    </S>
  );
};
export const C2Count: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = r(f, F(96.4), F(97.6));
  return (
    <S b0={b0} b1={b1}>
      <Galaxy cx={960} cy={500} R={400} t={f / 30} dots={90} dotColor={C.red} dotsK={k} />
      <Count a={F(96.5)} b={F(97.3)} to={100} fmt={(v) => `~${Math.round(v)} MILLION`} x={0} y={790} w={1920} size={110} color={C.red} align="center" />
      <Pop at={F(97.8)} x={0} y={930} w={1920} size={50} align="center" color={T}>STELLAR-MASS BLACK HOLES</Pop>
    </S>
  );
};
export const C2Alone: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const x = 420 + 1080 * r(f, b0, b1, 0, 1, Easing.linear);
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(100.4)} y={175} mode="space">DRIFTING <Red>COMPLETELY ALONE</Red></Head>
      <BlackHole cx={x} cy={480} R={90} t={f / 30} />
      <PopIn at={F(102.4)} x={430} y={720} w={260} h={140}><Svg><ellipse cx={130} cy={70} rx={110} ry={34} fill="none" stroke={C.amber} strokeWidth="16" /><circle cx={130} cy={70} r={30} fill="#000" stroke={T} strokeWidth="4" /></Svg></PopIn>
      <XMark x={560} y={790} s={70} at={F(102.6)} />
      <Pop at={F(102.4)} x={310} y={900} w={500} size={40} align="center" color={T}>NO GLOWING DISC</Pop>
      <PopIn at={F(103.5)} x={1230} y={720} w={260} h={140}><Svg><circle cx={130} cy={70} r={56} fill="#FDE68A" stroke="#141824" strokeWidth="6" /></Svg></PopIn>
      <XMark x={1360} y={790} s={70} at={F(103.7)} />
      <Pop at={F(103.5)} x={1110} y={900} w={500} size={40} align="center" color={T}>NO PARTNER STAR</Pop>
    </S>
  );
};
export const C2City: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(105.5)} y={175} mode="space">PITCH-BLACK GRAVITY…</Head>
      <BlackHole cx={600} cy={600} R={190} t={f / 30} />
      <Pop at={F(107.3)} x={350} y={880} w={500} size={64} align="center" color={T} mono>~40 KM</Pop>
      <PopIn at={F(107.7)} x={1000} y={420} w={700} h={420}><City x={350} y={380} s={140} /></PopIn>
      <Pop at={F(107.9)} x={1000} y={880} w={700} size={56} align="center" color={C.amber}>THE SIZE OF A CITY</Pop>
    </S>
  );
};
export const C2Hubble: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Stamp at={F(110.1)} x={620} y={175} text="NOT JUST THEORY" size={72} bg={STAMP_BG} rot={-3} />
      <div style={{ position: "absolute", left: 0, top: 30 * Math.sin(f / 30), width: 1920, height: 1080 }}><Hubble x={960} y={600} s={300} /></div>
      <PillAt at={F(111.1)} x={560} y={860} text="2022 · HUBBLE SPACE TELESCOPE" color={C.blue} size={44} />
    </S>
  );
};
export const C2First: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(115.3)} y={175} mode="space" size={62}>THE FIRST <Amber>ISOLATED</Amber> BLACK HOLE EVER DETECTED</Head>
      <Shock cx={960} cy={560} at={b0} R={250} color={C.blue} />
      <BlackHole cx={960} cy={540} R={120} t={f / 30} />
      <Count a={F(118.5)} b={F(119.6)} to={5000} fmt={(v) => `~${Math.round(v).toLocaleString("en-US")} LY AWAY`} x={0} y={820} w={1920} size={100} color={C.amber} align="center" />
    </S>
  );
};
export const C2Lens: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const bx = 520 + 900 * r(f, b0, b1, 0, 1, Easing.inOut(Easing.sin));
  const align = Math.max(0, 1 - Math.abs(bx - 980) / 260);
  const sx = 980, sy = 450;
  // light-curve plot
  const pts = Array.from({ length: 60 }, (_, i) => { const xx = 360 + i * 20; const bxx = 520 + 900 * (i / 59); const a = Math.max(0, 1 - Math.abs(bxx - 980) / 260); return { x: xx, y: 900 - 120 * a * a, bxx }; }).filter((p) => p.bxx <= bx);
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(122.4)} y={160} mode="space">ITS GRAVITY <Blue>BENT THE STARLIGHT</Blue></Head>
      <div style={{ position: "absolute", left: sx - 60, top: sy - 60, width: 120, height: 120, borderRadius: 99, background: `radial-gradient(circle, rgba(255,255,255,${0.9}) 0%, rgba(253,230,138,${0.5 + 0.4 * align}) 30%, rgba(0,0,0,0) 70%)`, opacity: 1 - 0.6 * align }} />
      {align > 0.05 ? <Svg><circle cx={bx} cy={sy} r={110} fill="none" stroke="#FDE68A" strokeWidth={4 + 14 * align} opacity={align} strokeDasharray={align > 0.9 ? undefined : `${200 * align} ${300 * (1 - align)}`} /></Svg> : null}
      <BlackHole cx={bx} cy={sy} R={70} t={t} ring={0.5} />
      <Svg>
        <line x1="340" y1="920" x2="1580" y2="920" stroke={T} strokeWidth="4" opacity="0.6" />
        <polyline points={pts.map((p) => `${p.x},${p.y}`).join(" ")} fill="none" stroke={C.amber} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
      <Pop at={b0 + 6} x={1600} y={880} w={300} size={32} color={T}>STAR BRIGHTNESS</Pop>
    </S>
  );
};
const SOL = { cx: 900, cy: 600 };
const PLANETS = [{ r: 150, sp: 0.5, c: "#94A3B8", s: 16 }, { r: 240, sp: 0.36, c: "#FDBA74", s: 22 }, { r: 330, sp: 0.28, c: C.blue, s: 26, earth: true }, { r: 430, sp: 0.2, c: "#F87171", s: 20 }];
export const C2Solar: React.FC<BeatProps & { warp?: number; bhx?: number; bhy?: number; head?: React.ReactNode; headAt?: number }> = ({ b0, b1, warp = 0, bhx, bhy, head, headAt }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const ent = r(f, F(125.4), b1, 0, 1, Easing.out(Easing.cubic));
  const x = bhx ?? 2100 - 600 * ent, y = bhy ?? 330 + 40 * ent;
  return (
    <S b0={b0} b1={b1}>
      {head ? <Head at={headAt ?? b0} y={160} mode="space" size={60}>{head}</Head> : null}
      <Sun cx={SOL.cx} cy={SOL.cy} R={58} t={t} />
      {PLANETS.map((p, i) => { const rx = p.r * (1 + 0.35 * warp * (i / 3)), ry = p.r * 0.55 * (1 - 0.2 * warp * (i / 3)); const rot = -18 * warp; const a = t * p.sp + i; const cx = SOL.cx + Math.cos(a) * rx * Math.cos((rot * Math.PI) / 180) - Math.sin(a) * ry * Math.sin((rot * Math.PI) / 180); const cy = SOL.cy + Math.cos(a) * rx * Math.sin((rot * Math.PI) / 180) + Math.sin(a) * ry * Math.cos((rot * Math.PI) / 180); return <React.Fragment key={i}><Orbit cx={SOL.cx} cy={SOL.cy} rx={rx} ry={ry} rot={rot} color={warp > 0 && i >= 2 ? "rgba(229,57,53,0.8)" : undefined} />{p.earth ? <Earth cx={cx} cy={cy} R={p.s} t={t} /> : <div style={{ position: "absolute", left: cx - p.s, top: cy - p.s, width: p.s * 2, height: p.s * 2, borderRadius: 99, background: p.c, border: "4px solid #141824", boxSizing: "border-box" }} />}</React.Fragment>; })}
      <BlackHole cx={x} cy={y} R={70} t={t} />
    </S>
  );
};
export const C2SolarIn: React.FC<BeatProps> = (p) => <C2Solar {...p} head={<>IF ONE WANDERED THROUGH OUR <Blue>SOLAR SYSTEM</Blue>…</>} headAt={p.b0} />;
export const C2Warp: React.FC<BeatProps> = (p) => {
  const f = useCurrentFrame();
  return <C2Solar {...p} warp={r(f, F(131.0), F(132.4), 0, 1, Easing.inOut(Easing.cubic))} bhx={1500 - 120 * r(f, p.b0, p.b1)} bhy={370} head={<>A CLOSE PASS COULD <Red>WARP PLANETARY ORBITS</Red></>} headAt={F(131.3)} />;
};
export const C2Fling: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const k1 = r(f, F(133.4), F(134.8), 0, 1, Easing.inOut(Easing.cubic)), k2 = r(f, F(136.6), F(137.8), 0, 1, Easing.inOut(Easing.cubic));
  return (
    <S b0={b0} b1={b1}>
      <Head at={b0} y={160} mode="space">FLINGING EARTH…</Head>
      <Earth cx={960} cy={560} R={90} t={t} />
      <Arrow x1={880} y1={500} x2={430} y2={360} color="#93C5FD" w={10} k={k1} dash="22 16" />
      {k1 > 0.95 ? <Earth cx={330} cy={330} R={70} t={t} frozen /> : null}
      <Pop at={F(134.5)} x={100} y={460} w={500} size={44} align="center" color="#93C5FD">INTO THE FREEZING DARK</Pop>
      <Arrow x1={1040} y1={620} x2={1450} y2={770} color={C.amber} w={10} k={k2} dash="22 16" />
      <Sun cx={1590} cy={830} R={90} t={t} />
      <Pop at={F(136.9)} x={1250} y={980} w={600} size={44} align="center" color={C.amber}>…OR TOWARD THE SUN</Pop>
    </S>
  );
};
export const C2Warn: React.FC<BeatProps & { hero?: number }> = ({ b0, b1, hero = 1.8 }) => (
  <S b0={b0} b1={b1} overlay={<Presenter pose="thinking" at={b0} heroFor={hero} />}>
    <WarnBeat b0={b0} b1={b1} mode="space" x={620} size={104} at={F(139.1)} value={<><span style={{ fontSize: 60 }}>PROBABLY</span><br />YEARS TO DECADES</>} color={C.amber} sub={<>IF WE NOTICE ITS GRAVITY <Blue>TUGGING</Blue> ON THE OUTER SOLAR SYSTEM</>} subAt={F(141.6)} />
  </S>
);
export const C2Warn2: React.FC<BeatProps> = (p) => <C2Warn {...p} hero={0} />;
export const C2Bridge: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Shock cx={960} cy={620} at={b0} R={330} color={C.blue} n={4} period={1.4} />
      <BlackHole cx={960} cy={600} R={110} t={f / 30} />
      <Head at={F(146.4)} y={175} mode="space">GRAVITY <Blue>GIVES IT AWAY EARLY</Blue></Head>
    </S>
  );
};
export const C2ToC3: React.FC<BeatProps> = (p) => <Transition {...p} next={2} label={<>THE NEXT THREAT CAN <Red>HIDE IN OUR BLIND SPOT</Red></>} />;

export const CH2 = [
  { t: 91.3, C: C2Title }, { t: 93.3, C: C2Galaxy }, { t: 96.2, C: C2Count }, { t: 99.2, C: C2Alone }, { t: 104.6, C: C2City },
  { t: 109.1, C: C2Hubble }, { t: 114.4, C: C2First }, { t: 119.8, C: C2Lens }, { t: 125.0, C: C2SolarIn }, { t: 130.1, C: C2Warp },
  { t: 133.0, C: C2Fling }, { t: 138.2, C: C2Warn }, { t: 141.1, C: C2Warn2 }, { t: 144.5, C: C2Bridge }, { t: 147.9, C: C2ToC3 },
];
