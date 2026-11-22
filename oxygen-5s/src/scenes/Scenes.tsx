import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Card, Count, Pop, Stamp } from "../components/Base";
import { Couch, Presenter } from "../components/Char";
import { At, Bolt, Bridge, Car, Concrete, Cube, EarthCut, Flame, Furnace, HotPlate, Jet, Lungs, Molten, Mountain, SiO4, SparkPlug } from "../components/Draw";
import { BeatProps, OxyStage, Stopwatch } from "../components/Oxy";
import { Arrow, Check, City, Dust, Earth, Flash, Head, INK, Pin, Red, Sun, Svg, Wave, XMark } from "../components/Prims";
import { C, F, FONT, LIGHT, SPACE, r, sp } from "../lib/core";

const q = (i: number, n: number) => { const v = Math.sin((i + 1) * 78.233 * n) * 43758.5453; return v - Math.floor(v); };
const VIOLET = "#A78BFA";
const HAZE = "rgba(191,219,254,0.85)";
/** scale-pop wrapper around page-coordinate drawings: springs from (ox, oy) */
const Grow: React.FC<{ at: number; ox: number; oy: number; children: React.ReactNode; from?: number }> = ({ at, ox, oy, children, from = 0.3 }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = sp(f, at, 11, 220, 0.7);
  return <div style={{ position: "absolute", inset: 0, scale: `${from + (1 - from) * k}`, opacity: Math.min(1, k * 2), transformOrigin: `${ox}px ${oy}px` }}>{children}</div>;
};
// ================= HOOK =================
export const AtomsEarth: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const gone = F(6.38);
  return (
    <OxyStage mode="space" b0={b0} b1={b1} timer="none" overlay={<Flash at={gone} dur={8} />}>
      <Earth cx={960} cy={590} R={220} t={t} />
      {Array.from({ length: 36 }, (_, i) => {
        const a = q(i, 1) * 6.283 + t * 0.25 * (q(i, 2) > 0.5 ? 1 : -1), rr = 290 + q(i, 3) * 170;
        const kin = sp(f, b0 + Math.floor(q(i, 4) * 20), 12, 220);
        const d = gone + Math.floor(q(i, 5) * 8);
        return <At key={i} x={960 + Math.cos(a) * rr * 1.25} y={590 + Math.sin(a) * rr * 0.7} r={20} k={kin * (1 - r(f, d, d + 6))} />;
      })}
      <Head at={F(3.92)} y={160} mode="space">EVERY <Red>OXYGEN ATOM</Red> ON EARTH</Head>
      <Pop at={gone} x={0} y={960} w={1920} size={80} align="center" color={C.red} from="scale">…VANISHED</Pop>
    </OxyStage>
  );
};
export const CouchFive: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <OxyStage mode="light" b0={b0} b1={b1} timer="none">
      <Couch pose="couch_shocked" x={60} bottom={1040} w={900} at={b0} flip />
      <Stopwatch cx={1420} cy={600} R={230} value={5 * r(f, F(7.5), F(8.7), 0, 1, Easing.linear)} />
      <Pop at={F(7.3)} x={1000} y={160} w={840} size={62} align="center">FOR THE SAME <Red>5 SECONDS</Red></Pop>
    </OxyStage>
  );
};
export const Viral: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <OxyStage mode="light" b0={b0} b1={b1} timer="none" overlay={<Presenter pose="explaining" at={b0} heroFor={1.6} />}>
      <Grow at={b0 + 4} ox={1110} oy={610}>
        <div style={{ position: "absolute", left: 900, top: 260, width: 420, height: 700, borderRadius: 48, background: INK, boxShadow: `6px 6px 0 ${LIGHT.shadow}` }}>
          <div style={{ position: "absolute", left: 18, top: 18, right: 18, bottom: 18, borderRadius: 34, background: "#1E293B", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 440, width: 384, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 44, color: "#FFF", lineHeight: 1.05 }}>NO OXYGEN<br /><span style={{ color: C.red }}>FOR 5 SECONDS?!</span></div>
            <div style={{ position: "absolute", left: 24, bottom: 34, width: 336, height: 10, borderRadius: 5, background: "#475569" }}><div style={{ width: `${30 + 60 * r(f, b0, b1, 0, 1, Easing.linear)}%`, height: 10, borderRadius: 5, background: C.red }} /></div>
          </div>
        </div>
        <Earth cx={1110} cy={430} R={120} t={t} />
      </Grow>
      <Pop at={F(10.18)} x={1380} y={300} w={400} size={64} color={C.red} from="scale">VIRAL</Pop>
      {f >= F(10.18) ? Array.from({ length: 7 }, (_, i) => { const ph = (t * 0.55 + i / 7) % 1; return <Svg key={i} style={{ opacity: 1 - ph }}><path transform={`translate(${1440 + 50 * Math.sin(ph * 6 + i)} ${930 - 520 * ph}) scale(1.7)`} d="M 0 10 C -30 -14 -16 -36 0 -20 C 16 -36 30 -14 0 10 Z" fill={C.red} stroke={INK} strokeWidth="3" /></Svg>; }) : null}
      <Head at={F(9.48)} y={160} x={620} w={1200}>YOU&apos;VE HEARD THE <Red>VIRAL STORY</Red></Head>
    </OxyStage>
  );
};
const MYTHS = [
  { x: 170, label: <>BUILDINGS<br />TURN TO DUST</> },
  { x: 760, label: <>OCEANS BOIL<br />INTO SPACE</> },
  { x: 1350, label: <>EVERYONE GETS<br />A SUNBURN</> },
];
const MythCards: React.FC<{ pops: number[]; dim?: number }> = ({ pops, dim = 0 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <div style={{ position: "absolute", inset: 0, opacity: 1 - 0.45 * dim }}>
      {MYTHS.map((m, i) => (
        <Grow key={i} at={pops[i]} ox={m.x + 200} oy={560}>
          <Card x={m.x} y={330} w={400} h={460} />
          {i === 0 ? <City x={m.x + 175} y={570} s={70} /> : i === 1 ? <Wave x={m.x + 200} y={520} s={150} t={t} /> : <Sun cx={m.x + 200} cy={490} R={78} t={t} />}
          <Pop at={pops[i]} x={m.x} y={650} w={400} size={40} align="center">{m.label}</Pop>
        </Grow>
      ))}
    </div>
  );
};
export const Myths: React.FC<BeatProps> = ({ b0, b1 }) => (
  <OxyStage mode="light" b0={b0} b1={b1} timer="none">
    <MythCards pops={[F(11.3), F(12.68), F(14.58)]} />
    <Head at={F(11.3)} y={160}>THE VIRAL VERSION</Head>
  </OxyStage>
);
export const Wrong: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <OxyStage mode="light" b0={b0} b1={b1} timer="none">
      <MythCards pops={[-99, -99, -99]} dim={r(f, F(17.44), F(17.9))} />
      <Head at={b0} y={160}>THE VIRAL VERSION</Head>
      <Stamp at={F(17.44)} x={520} y={470} text="3 THINGS WRONG" size={110} rot={-6} />
      <Pop at={F(19.28)} x={0} y={860} w={1920} size={60} align="center">THE REAL ANSWER IS <Red>EVEN SCARIER</Red></Pop>
    </OxyStage>
  );
};
export const Experiment: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const gone = F(24.08);
  return (
    <OxyStage mode="light" b0={b0} b1={b1} timerAt={F(22.86)} overlay={<Presenter pose="explaining" at={b0} heroFor={1.8} />}>
      <Grow at={b0 + 3} ox={1220} oy={560}><Card x={640} y={290} w={1160} h={540} /></Grow>
      <At x={790} y={520} r={70} k={sp(f, F(22.86), 11, 220) * (1 - r(f, gone, gone + 8))} />
      {f >= gone ? <Svg style={{ opacity: r(f, gone, gone + 8) }}><circle cx={790} cy={520} r={70} fill="none" stroke={C.red} strokeWidth="6" strokeDasharray="14 12" /></Svg> : null}
      <Pop at={F(22.86)} x={910} y={410} w={860} size={58}>EVERY OXYGEN ATOM</Pop>
      <Pop at={gone} x={910} y={490} w={860} size={58} color={C.red}>VANISHES</Pop>
      <Pop at={F(24.62)} x={910} y={600} w={860} size={46} color="#475569">ALL AT ONCE · FOR 5.00 SECONDS</Pop>
      <Head at={b0} y={160} x={620} w={1200}>HERE&apos;S THE EXPERIMENT</Head>
    </OxyStage>
  );
};
export const Speeds: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const x0 = 200, x1 = 1720, y = 620, k = r(f, b0, b0 + 18);
  const xs = (s: number) => x0 + ((x1 - x0) * s) / 5;
  const br = (a: number, b: number, col: string, kk: number) => <path d={`M ${a} ${y - 40} L ${a} ${y - 70} L ${a + (b - a) * kk} ${y - 70} L ${a + (b - a) * kk} ${y - 40}`} fill="none" stroke={col} strokeWidth="8" strokeLinejoin="round" />;
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <Svg>
        <line x1={x0} y1={y} x2={x0 + (x1 - x0) * k} y2={y} stroke={INK} strokeWidth="8" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((s) => <line key={s} x1={xs(s)} y1={y - 16} x2={xs(s)} y2={y + 16} stroke={INK} strokeWidth="6" opacity={k} />)}
        {f >= F(26.7) ? br(xs(0), xs(0) + 46, C.red, r(f, F(26.7), F(26.7) + 8)) : null}
        {f >= F(27.78) ? br(xs(1), xs(5), C.blue, r(f, F(27.78), F(27.78) + 14)) : null}
      </Svg>
      {[0, 1, 2, 3, 4, 5].map((s) => <div key={s} style={{ position: "absolute", left: xs(s) - 60, top: y + 34, width: 120, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 36, color: INK, opacity: k }}>{s}s</div>)}
      <Pop at={F(26.7)} x={x0 - 10} y={y - 160} w={600} size={56} color={C.red}>MILLISECONDS</Pop>
      <Pop at={F(27.78)} x={xs(1)} y={y - 160} w={xs(5) - xs(1)} size={56} color={C.blue} align="center">SECONDS</Pop>
      <Head at={b0} y={160}>SOME THINGS REACT IN…</Head>
    </OxyStage>
  );
};
export const SlowMo: React.FC<BeatProps> = ({ b0, b1 }) => (
  <OxyStage mode="light" b0={b0} b1={b1}>
    <Pop at={b0} x={0} y={300} w={1920} size={120} align="center" from="scale">LET&apos;S <Red>SLOW IT DOWN</Red></Pop>
    <Count a={b0 + 6} b={b1} to={0.001} fmt={(v) => `${v.toFixed(3)}s`} x={0} y={520} w={1920} size={170} align="center" color={C.blue} />
  </OxyStage>
);

// ================= THE AIR =================
export const Pressure: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <Card x={220} y={270} w={640} h={660} />
      <div style={{ position: "absolute", left: 223, top: 860, width: 634, height: 67, background: C.green, borderRadius: "0 0 15px 15px" }} />
      {Array.from({ length: 56 }, (_, i) => {
        const ox = i % 2 === 0 && i % 7 < 3 && i < 50 ? 1 : 0; // ~21% oxygen pairs
        const x = 270 + (i % 8) * 74 + 10 * Math.sin(t * 1.3 + i), y = 330 + Math.floor(i / 8) * 74 + 8 * Math.cos(t * 1.1 + i * 2);
        const d = F(30.96) + (i % 6) * 2;
        const k = ox ? 1 - r(f, d, d + 6) : 1;
        const col = ox ? C.red : C.blue;
        return <React.Fragment key={i}><At x={x - 11} y={y} r={12} label="" fill={col} k={k} /><At x={x + 11} y={y} r={12} label="" fill={col} k={k} /></React.Fragment>;
      })}
      <div style={{ position: "absolute", left: 220, top: 950, width: 640, display: "flex", justifyContent: "center", gap: 40, fontFamily: FONT.mono, fontWeight: 700, fontSize: 30 }}>
        <span style={{ color: C.blue }}>● N₂ 78%</span><span style={{ color: C.red }}>● O₂ 21%</span>
      </div>
      <Pop at={F(32.56)} x={1000} y={290} w={860} size={48}>THE ATMOSPHERE LOSES</Pop>
      <Count a={F(33.4)} b={F(34.4)} from={100} to={79} fmt={(v) => `${Math.round(v)}%`} x={1000} y={370} w={860} size={230} color={C.red} />
      <Pop at={F(34.84)} x={1000} y={640} w={860} size={64}>OF ITS PRESSURE <Red>(−21%)</Red></Pop>
      <Head at={F(30.7)} y={160}>IN THE FIRST <Red>MILLISECONDS</Red></Head>
    </OxyStage>
  );
};
export const Teleport: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = r(f, F(37.78), F(39.0), 0, 1, Easing.inOut(Easing.cubic));
  const P0 = [840, 925], P1 = [840, 400], P2 = [1417, 382];
  const bz = (u: number) => [(1 - u) ** 2 * P0[0] + 2 * (1 - u) * u * P1[0] + u * u * P2[0], (1 - u) ** 2 * P0[1] + 2 * (1 - u) * u * P1[1] + u * u * P2[1]];
  const [px, py] = bz(k);
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 0, top: 940, width: 1920, height: 140, background: C.blue }} />
      <Mountain x={760} y={942} w={1060} h={560} />
      <Svg><path d={`M ${P0[0]} ${P0[1]} Q ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}`} fill="none" stroke={C.red} strokeWidth="8" strokeDasharray="18 14" pathLength={1000} strokeDashoffset={0} opacity={k > 0 ? 1 : 0} style={{ clipPath: "none" }} /></Svg>
      <Pin x={px} y={py - 40} s={60} />
      <Pop at={F(36.98)} x={150} y={330} w={600} size={44} color="#64748B">ALTITUDE</Pop>
      <Count a={F(38.32)} b={F(39.4)} to={2000} fmt={(v) => `${Math.round(v).toLocaleString("en-US")} M`} x={150} y={400} w={620} size={130} color={C.red} />
      <Pop at={F(39.82)} x={150} y={580} w={600} size={56}>IN AN INSTANT</Pop>
      <Head at={F(36.12)} y={160}>LIKE TELEPORTING UP A <Red>MOUNTAIN</Red></Head>
    </OxyStage>
  );
};
export const LungsBeat: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <OxyStage mode="light" b0={b0} b1={b1} overlay={<Presenter pose="thinking" at={b0} heroFor={1.8} />}>
      <Lungs x={900} y={580} s={190} t={t} />
      <Grow at={F(46.76)} ox={1530} oy={545}>
        <Card x={1240} y={330} w={580} h={430} />
        <div style={{ position: "absolute", left: 1270, top: 360, fontFamily: FONT.head, fontWeight: 700, fontSize: 34, color: "#64748B" }}>YOUR BODY&apos;S ALARM</div>
      </Grow>
      <Pop at={F(48.02)} x={1270} y={470} w={460} size={52}>↑ CO₂ RISING</Pop>
      <Check x={1740} y={495} s={34} at={F(48.86)} />
      <Pop at={F(49.76)} x={1270} y={620} w={460} size={52}>↓ O₂ MISSING</Pop>
      <XMark x={1740} y={645} s={30} at={F(50.02)} />
      <Head at={F(45.32)} y={160} x={620} w={1200}>YOUR LUNGS WOULDN&apos;T PANIC… <Red>YET</Red></Head>
    </OxyStage>
  );
};
export const Engines: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const off = 1 - r(f, F(55.28), F(55.28) + 12);
  const items = [{ at: F(53.6), x: 480, label: "CARS" }, { at: F(54.24), x: 960, label: "JETS" }, { at: F(54.76), x: 1440, label: "FURNACES" }];
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      {items.map((it, i) => { const k = sp(f, it.at, 11, 220, 0.7); return f < it.at ? null : (
        <React.Fragment key={i}>
          {i === 0 ? <><Flame x={290} y={612} s={55} t={t} k={k * off} /><Car x={480} y={600} s={180 * k} /></> : i === 1 ? <><Flame x={760} y={590} s={60} t={t} k={k * off} /><Jet x={960} y={600} s={160 * k} /></> : <><Furnace x={1440} y={620} s={150 * k} /><Flame x={1440} y={680} s={70} t={t} k={k * off} /></>}
          <Pop at={it.at} x={it.x - 200} y={780} w={400} size={44} align="center">{it.label}</Pop>
        </React.Fragment>
      ); })}
      <Stamp at={F(55.28)} x={760} y={870} text="ALL STALL" size={66} rot={-4} />
      <Head at={F(52.04)} y={160}>EVERY <Red>COMBUSTION ENGINE</Red></Head>
    </OxyStage>
  );
};
export const SkyDim: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const dim = r(f, F(61.44), F(62.6));
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <div style={{ position: "absolute", inset: -60, background: "linear-gradient(180deg, #4F97DE 0%, #A5D2F7 100%)" }} />
      <div style={{ position: "absolute", inset: -60, background: `rgba(12,24,52,${0.5 * dim})` }} />
      <Sun cx={250} cy={330} R={80} t={t} />
      {Array.from({ length: 40 }, (_, i) => {
        const x = 520 + q(i, 1) * 1280 + 14 * Math.sin(t + i), y = 380 + q(i, 2) * 440 + 10 * Math.cos(t * 0.8 + i);
        const d = F(57.76) + (i % 5) * 2, gone = i % 5 === 0 ? r(f, d, d + 6) : 0;
        return <Svg key={i} style={{ opacity: 1 - gone }}>
          {[0, 1, 2, 3].map((j) => { const a = j * 1.57 + t * 0.8; return <line key={j} x1={x + Math.cos(a) * 16} y1={y + Math.sin(a) * 16} x2={x + Math.cos(a) * (30 + 6 * Math.sin(t * 3 + i))} y2={y + Math.sin(a) * (30 + 6 * Math.sin(t * 3 + i))} stroke="#E0F2FE" strokeWidth="4" strokeLinecap="round" opacity={0.9 * (1 - dim * 0.7)} />; })}
          <circle cx={x} cy={y} r={10} fill="#FFF" stroke={INK} strokeWidth="3" />
        </Svg>;
      })}
      <Head at={F(57.76)} y={160}>A FIFTH OF THE AIR: <Red>GONE</Red></Head>
      <Pop at={F(59.12)} x={0} y={262} w={1920} size={44} align="center">FEWER MOLECULES SCATTER SUNLIGHT</Pop>
      <Pop at={F(61.44)} x={0} y={900} w={1920} size={84} align="center" color="#FFF">THE SKY VISIBLY DIMS</Pop>
    </OxyStage>
  );
};
export const Pilots: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <OxyStage mode="space" b0={b0} b1={b1}>
      <div style={{ position: "absolute", inset: -60, background: "linear-gradient(180deg, #060B1A 0%, #0F1F4A 55%, #1E3A8A 85%)" }} />
      <div style={{ position: "absolute", left: 960 - 1750, top: 860, width: 3500, height: 3500, borderRadius: 9999, background: C.blue, border: `8px solid ${INK}`, boxShadow: "0 0 60px 24px rgba(147,197,253,0.65)" }} />
      <Jet x={560 + 760 * r(f, b0, b1, 0, 1, Easing.linear)} y={640} s={180} />
      <Head at={F(63.92)} y={160} mode="space">WHAT <Red>HIGH-ALTITUDE PILOTS</Red> SEE</Head>
      <Pop at={F(65.3)} x={0} y={250} w={1920} size={44} align="center" color="#93C5FD">ABOVE MOST OF THE ATMOSPHERE</Pop>
    </OxyStage>
  );
};
export const Ozone: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const gone = r(f, F(70.42), F(70.42) + 16);
  return (
    <OxyStage mode="space" b0={b0} b1={b1}>
      <Earth cx={960} cy={1680} R={1000} t={t} />
      <Svg style={{ opacity: (1 - gone) * r(f, b0, b0 + 12) }}>
        <circle cx={960} cy={1680} r={1090} fill="none" stroke={VIOLET} strokeWidth="34" opacity="0.55" />
        {Array.from({ length: 14 }, (_, i) => { const a = -Math.PI / 2 + (i - 6.5) * 0.085 + t * 0.01; const x = 960 + Math.cos(a) * 1090, y = 1680 + Math.sin(a) * 1090; return <g key={i}>{[-14, 0, 14].map((dx, j) => <circle key={j} cx={x + dx} cy={y + (j === 1 ? -10 : 4)} r="9" fill={C.red} stroke={INK} strokeWidth="3" />)}</g>; })}
      </Svg>
      <Head at={F(67.3)} y={160} mode="space">HIGH ABOVE…</Head>
      <Pop at={F(70.42)} x={0} y={260} w={1920} size={64} align="center" color={C.red}>VANISHES</Pop>
      <Pop at={F(68.1)} x={0} y={380} w={1920} size={64} align="center" color="#C4B5FD">THE OZONE LAYER</Pop>
      <Pop at={F(69.28)} x={0} y={460} w={1920} size={44} align="center" color={SPACE.text}>= PURE OXYGEN (O₃)</Pop>
    </OxyStage>
  );
};
export const UV: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const tg = [[700, 714], [900, 682], [1100, 690], [1300, 739], [1500, 838]];
  return (
    <OxyStage mode="space" b0={b0} b1={b1}>
      <Earth cx={960} cy={1680} R={1000} t={t} />
      <Sun cx={250} cy={330} R={95} t={t} />
      {tg.map(([x, y], i) => <Arrow key={i} x1={360} y1={400} x2={x} y2={y - 14} color={VIOLET} w={8} dash="22 14" k={r(f, F(72.5) + i * 3, F(72.5) + i * 3 + 14)} />)}
      <Pop at={F(72.5)} x={1180} y={420} w={600} size={52} color="#C4B5FD">HARSHEST UV</Pop>
      <Head at={F(73.74)} y={160} mode="space">HITS THE GROUND <Red>UNFILTERED</Red></Head>
      <Pop at={F(74.82)} x={0} y={250} w={1920} size={52} align="center" color={SPACE.text}>FOR 5 SECONDS</Pop>
    </OxyStage>
  );
};

// ================= THE GROUND =================
export const Skip: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const jump = r(f, F(77.62), F(77.62) + 6, 0, 1, Easing.inOut(Easing.cubic));
  const head = 520 + 160 * r(f, b0, F(77.62), 0, 1, Easing.linear) + (1110 - 680) * jump;
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <Grow at={b0} ox={960} oy={560}>
        <div style={{ position: "absolute", left: 380, top: 280, width: 1160, height: 560, borderRadius: 18, background: "#1E293B", border: `3px solid ${INK}`, boxShadow: `4px 4px 0 ${INK}` }} />
        <Svg><path d="M 920 470 L 920 590 L 1020 530 Z" fill="#FFF" /></Svg>
        <div style={{ position: "absolute", left: 420, top: 770, width: 1080, height: 16, borderRadius: 8, background: "#475569" }} />
        <div style={{ position: "absolute", left: 420, top: 770, width: head - 420, height: 16, borderRadius: 8, background: C.red }} />
        <div style={{ position: "absolute", left: head - 14, top: 764, width: 28, height: 28, borderRadius: 14, background: "#FFF", border: `4px solid ${C.red}` }} />
      </Grow>
      {f >= F(77.62) ? <Svg><rect x={690} y={750} width={410} height={56} rx="12" fill="none" stroke={C.amber} strokeWidth="6" strokeDasharray="16 10" /></Svg> : null}
      <Pop at={F(77.62)} x={690} y={690} w={410} size={36} align="center" color={C.amber}>CONCRETE &amp; ROCK</Pop>
      <Stamp at={F(78.02)} x={1180} y={340} text="SKIPPED" size={70} rot={-6} bg="rgba(30,41,59,0.95)" />
      <Head at={F(76.56)} y={160}>THE FIRST THING <Red>MOST VIDEOS SKIP</Red></Head>
    </OxyStage>
  );
};
export const TwoSec: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const x0 = 700, x1 = 1760, y = 620, xs = (s: number) => x0 + ((x1 - x0) * s) / 5;
  const k = r(f, b0, b0 + 14);
  return (
    <OxyStage mode="light" b0={b0} b1={b1} overlay={<Presenter pose="the_catch" at={b0} heroFor={1.8} />}>
      <Svg>
        <line x1={x0} y1={y} x2={x0 + (x1 - x0) * k} y2={y} stroke={INK} strokeWidth="8" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5].map((s) => <line key={s} x1={xs(s)} y1={y - 16} x2={xs(s)} y2={y + 16} stroke={INK} strokeWidth="6" opacity={k} />)}
        {f >= F(81.28) ? <rect x={x0 - 6} y={y - 30} width={36 * r(f, F(81.28), F(81.28) + 6)} height="60" rx="8" fill={C.red} /> : null}
      </Svg>
      {[0, 1, 2, 3, 4, 5].map((s) => <div key={s} style={{ position: "absolute", left: xs(s) - 60, top: y + 34, width: 120, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 36, color: INK, opacity: k }}>{s}s</div>)}
      <Pop at={F(80.34)} x={xs(2) - 150} y={y - 140} w={300} size={60} align="center" color={C.amber}>WAIT 2 s?</Pop>
      <XMark x={xs(2)} y={y} s={40} at={F(80.88)} />
      <Pop at={F(81.28)} x={x0 - 20} y={y + 110} w={500} size={48} color={C.red}>FAIL AT ONCE</Pop>
      <Head at={b0} y={160} x={620} w={1200}>CONCRETE &amp; ROCK <Red>DON&apos;T WAIT</Red></Head>
    </OxyStage>
  );
};
export const Crust: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <OxyStage mode="space" b0={b0} b1={b1}>
      <EarthCut cx={600} cy={610} R={320} k={r(f, b0 + 4, b0 + 24, 0, 1, Easing.inOut(Easing.cubic))} />
      <Pop at={F(85.36)} x={850} y={196} w={300} size={40} color={C.red}>CRUST</Pop>
      {f >= F(85.36) ? <Arrow x1={900} y1={250} x2={790} y2={330} color={C.red} w={6} k={r(f, F(85.36), F(85.36) + 8)} /> : null}
      <Pop at={F(81.8)} x={1080} y={300} w={800} size={46} color={SPACE.text}>OXYGEN MAKES UP</Pop>
      <Count a={F(83.5)} b={F(84.4)} to={45} fmt={(v) => `${Math.round(v)}%`} x={1080} y={370} w={800} size={230} color={C.red} />
      <Pop at={F(84.86)} x={1080} y={640} w={800} size={56} color={SPACE.text}>OF EARTH&apos;S CRUST</Pop>
      <Pop at={F(85.52)} x={1080} y={710} w={800} size={46} color="#94A3B8">BY MASS</Pop>
    </OxyStage>
  );
};
export const Silicate: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <SiO4 x={560} y={580} s={150} k={sp(f, F(86.86), 11, 220, 0.7)} />
      <Pop at={F(87.26)} x={260} y={870} w={600} size={46} align="center">SILICATES (SiO₄)</Pop>
      <Grow at={F(88.24)} ox={1410} oy={580}><Concrete x={1100} y={380} w={620} h={400} /></Grow>
      <Pop at={F(88.54)} x={1100} y={870} w={620} size={46} align="center">CONCRETE BINDERS</Pop>
      <Head at={b0} y={160}>OXYGEN, <Red>LOCKED INSIDE</Red></Head>
    </OxyStage>
  );
};
export const Collapse: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const down = r(f, F(97.98), F(97.98) + 16, 0, 1, Easing.in(Easing.quad));
  const puff = sp(f, F(98.2), 14, 120);
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <div style={{ position: "absolute", inset: 0, scale: `1 ${1 - 0.92 * down}`, transformOrigin: "960px 820px", opacity: 1 - 0.3 * down }}>
        <City x={700} y={820} s={200} lights={0} />
        <Bridge x={1560} y={770} s={120} />
      </div>
      <div style={{ position: "absolute", left: 180, top: 820, width: 1680, height: 34, background: "#94A3B8", border: `5px solid ${INK}`, borderRadius: 6, scale: `1 ${1 - 0.6 * down}`, transformOrigin: "50% 100%" }} />
      {Array.from({ length: 22 }, (_, i) => { const d = F(91.54) + (i % 8) * 2; const u = r(f, d, d + 18, 0, 1, Easing.in(Easing.quad)); return <At key={i} x={320 + q(i, 1) * 1460} y={400 + q(i, 2) * 380 - 300 * u} r={14} label="" k={f < F(90.78) ? 0 : 1 - u} />; })}
      {puff > 0 ? [400, 720, 1040, 1560].map((x, i) => <Dust key={i} x={x} y={790} s={170 * puff} t={t} />) : null}
      <Head at={F(90.78)} y={160}>STRIP EVERY <Red>OXYGEN ATOM</Red> AWAY</Head>
      <Pop at={F(96.42)} x={0} y={262} w={1920} size={52} align="center" color={C.red}>EVERYTHING LOSES ITS STRUCTURE</Pop>
      <Pop at={F(94.46)} x={370} y={890} w={300} size={44} align="center">BUILDINGS</Pop>
      <Pop at={F(95.8)} x={850} y={890} w={300} size={44} align="center">SIDEWALKS</Pop>
      <Pop at={F(95.28)} x={1410} y={890} w={300} size={44} align="center">BRIDGES</Pop>
      <Stamp at={F(98.82)} x={760} y={430} text="→ POWDER" size={96} rot={-5} />
    </OxyStage>
  );
};
export const Fracture: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const cracks = ["M 300 560 L 340 650 L 310 740 L 360 860 L 330 1000", "M 700 560 L 660 640 L 720 760 L 690 900", "M 1050 560 L 1090 680 L 1040 800 L 1100 960 L 1080 1080", "M 1400 560 L 1370 660 L 1430 760 L 1390 880", "M 1700 560 L 1740 690 L 1690 820 L 1730 1000"];
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: -60, top: 560, width: 2040, height: 600, background: "linear-gradient(180deg, #92400E 0%, #78350F 40%, #57534E 100%)", borderTop: `8px solid ${INK}` }} />
      <Svg>{cracks.map((d, i) => <path key={i} d={d} fill="none" stroke={INK} strokeWidth="10" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - r(f, F(100.94) + i * 3, F(100.94) + i * 3 + 14)} />)}</Svg>
      {f >= F(102.08) ? Array.from({ length: 16 }, (_, i) => { const d = F(102.08) + (i % 6) * 2; const u = r(f, d, d + 40); const x = 160 + q(i, 1) * 1600, rr = 30 + 40 * u + q(i, 2) * 20; return <div key={i} style={{ position: "absolute", left: x - rr + 10 * Math.sin(t + i), top: 540 - 210 * u * (0.6 + 0.4 * q(i, 3)) - rr, width: rr * 2, height: rr * 2, borderRadius: 999, background: i % 2 ? "#A8A29E" : "#D6D3D1", border: `4px solid ${INK}`, opacity: 0.95 }} />; }) : null}
      <Head at={F(100.2)} y={160}>THE ROCKY CRUST <Red>FRACTURES</Red></Head>
      <Pop at={F(102.08)} x={0} y={900} w={1920} size={64} align="center" color="#FFF">A CHOKING CLOUD OF DUST</Pop>
    </OxyStage>
  );
};
const steel = "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 55%, #CBD5E1 100%)";
export const Metals: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <OxyStage mode="light" b0={b0} b1={b1} overlay={<Presenter pose="thinking" at={b0} heroFor={1.8} />}>
      <Grow at={F(104.76)} ox={1200} oy={580}>
        <div style={{ position: "absolute", left: 820, top: 330, width: 420, height: 200, borderRadius: 14, background: steel, border: `7px solid ${INK}`, rotate: `${-6 + 3 * Math.sin(t)}deg` }} />
        <div style={{ position: "absolute", left: 1180, top: 600, width: 420, height: 200, borderRadius: 14, background: steel, border: `7px solid ${INK}`, rotate: `${5 - 3 * Math.sin(t)}deg` }} />
      </Grow>
      <Pop at={F(106.12)} x={1560} y={420} w={200} size={150} color={C.red} from="scale">?</Pop>
      <Head at={F(104.76)} y={160} x={620} w={1200}>EXPOSED <Red>METALS</Red>…</Head>
      <Pop at={F(106.12)} x={620} y={880} w={1200} size={58} align="center">DO SOMETHING <Red>BIZARRE</Red></Pop>
    </OxyStage>
  );
};
const MetalPair: React.FC<{ oxide: number; gap: number; seam: number }> = ({ oxide, gap, seam }) => (
  <>
    <div style={{ position: "absolute", left: 640, top: 300, width: 880, height: 260 - gap / 2, borderRadius: "18px 18px 0 0", background: steel, border: `7px solid ${INK}`, borderBottomWidth: seam > 0.02 ? 7 * seam : 0, boxSizing: "border-box" }} />
    <div style={{ position: "absolute", left: 640, top: 560 + gap / 2, width: 880, height: 260 - gap / 2, borderRadius: "0 0 18px 18px", background: steel, border: `7px solid ${INK}`, borderTopWidth: seam > 0.02 ? 7 * seam : 0, boxSizing: "border-box" }} />
    {oxide > 0.01 ? [560 - gap / 2 - 20, 560 + gap / 2].map((y, i) => (
      <div key={i} style={{ position: "absolute", left: 647, top: y, width: 866, height: 20, background: "rgba(229,57,53,0.85)", opacity: oxide, display: "flex", justifyContent: "space-around", alignItems: "center" }}>
        {Array.from({ length: 18 }, (_, j) => <div key={j} style={{ width: 12, height: 12, borderRadius: 6, background: "#FFF" }} />)}
      </div>
    )) : null}
  </>
);
export const Oxide: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <MetalPair oxide={r(f, F(109.98), F(109.98) + 10)} gap={90} seam={1} />
      <Pop at={F(109.98)} x={110} y={515} w={480} size={40} color={C.red} align="right">OXIDE LAYERS</Pop>
      {f >= F(109.98) ? <Arrow x1={540} y1={580} x2={630} y2={555} color={C.red} w={6} k={r(f, F(109.98), F(109.98) + 8)} /> : null}
      <Pop at={F(108.42)} x={1560} y={400} w={340} size={40}>RAW STEEL</Pop>
      <Pop at={F(109.12)} x={1560} y={680} w={340} size={40}>ALUMINUM</Pop>
      <Head at={F(109.86)} y={160}>AN <Red>INVISIBLE</Red> CRUST OF OXYGEN</Head>
      <Pop at={F(111.74)} x={0} y={880} w={1920} size={52} align="center">KEEPS PARTS FROM STICKING</Pop>
    </OxyStage>
  );
};
export const ColdWeld: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const gap = 90 * (1 - r(f, F(115.64), F(116.42), 0, 1, Easing.inOut(Easing.cubic)));
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <MetalPair oxide={1 - r(f, F(114.06), F(114.7))} gap={gap} seam={1 - r(f, F(118.84), F(119.56))} />
      {f >= F(115.64) ? <><Arrow x1={580} y1={330} x2={580} y2={430} color={C.red} w={9} k={r(f, F(115.64), F(115.64) + 8)} /><Arrow x1={580} y1={790} x2={580} y2={690} color={C.red} w={9} k={r(f, F(115.64), F(115.64) + 8)} /></> : null}
      <Head at={b0} y={160}>WITHOUT IT…</Head>
      <Stamp at={F(117.64)} x={720} y={860} text="COLD WELD" size={72} rot={-4} />
      <Pop at={F(119.14)} x={1560} y={500} w={340} size={46} color={C.red}>ONE SOLID<br />PIECE</Pop>
    </OxyStage>
  );
};
export const NotSciFi: React.FC<BeatProps> = ({ b0, b1 }) => (
  <OxyStage mode="space" b0={b0} b1={b1}>
    <Pop at={b0} x={0} y={380} w={1920} size={90} align="center" color={SPACE.text}>THAT ISN&apos;T</Pop>
    <Pop at={F(121.16)} x={0} y={500} w={1920} size={130} align="center" color={C.red} from="scale">SCIENCE FICTION</Pop>
  </OxyStage>
);

// ================= THE OCEANS =================
export const Oceans: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const R = 240 + 280 * r(f, b0, b1, 0, 1, Easing.inOut(Easing.cubic));
  return (
    <OxyStage mode="space" b0={b0} b1={b1}>
      <Earth cx={960} cy={290 + R} R={R} t={t} />
      <Head at={F(134.12)} y={160} mode="space">NOW LOOK AT THE <Red>OCEANS</Red></Head>
    </OxyStage>
  );
};
const H2O: React.FC<{ ox: number; oy: number; ko: number; hk: number; pair: number; o?: number }> = ({ ox, oy, ko, hk, pair, o = 1 }) => {
  const hx = 200 - 120 * pair, hy = 150 + 60 * pair;
  return (
    <>
      <At x={720 - hx} y={600 + hy} r={80} label="H" fill="#FFF" text={INK} k={hk} />
      <At x={720 + hx} y={600 + hy} r={80} label="H" fill="#FFF" text={INK} k={hk} />
      <At x={ox} y={oy} r={170} k={ko} o={o} />
    </>
  );
};
export const Water89: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <H2O ox={720} oy={600} ko={sp(f, b0 + 2, 11, 220, 0.7)} hk={sp(f, b0 + 6, 11, 220, 0.7)} pair={0} />
      <Pop at={F(136.2)} x={1160} y={290} w={700} size={46}>WATER IS NEARLY</Pop>
      <Count a={F(136.48)} b={F(137.3)} to={89} fmt={(v) => `${Math.round(v)}%`} x={1160} y={360} w={700} size={230} color={C.red} />
      <Pop at={F(137.62)} x={1160} y={630} w={700} size={64}>OXYGEN</Pop>
      <Pop at={F(138.04)} x={1160} y={710} w={700} size={46} color="#64748B">BY MASS</Pop>
      <Head at={b0} y={160}>WATER = H₂O</Head>
    </OxyStage>
  );
};
export const FlashH2: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const out = r(f, F(139.54), F(140.3), 0, 1, Easing.in(Easing.cubic));
  const pair = r(f, F(140.6), F(141.5), 0, 1, Easing.inOut(Easing.cubic));
  const gas = r(f, F(142.5), F(144.3));
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - gas }}>
        <H2O ox={720 - 1000 * out} oy={600} ko={1} hk={1} pair={pair} o={1 - out} />
      </div>
      {gas > 0 ? Array.from({ length: 10 }, (_, i) => { const a = (i / 10) * 6.283 + 0.3, d = 40 + 330 * gas, x = 720 + Math.cos(a) * d * 1.15 + 8 * Math.sin(t * 2 + i), y = 640 + Math.sin(a) * d * 0.8; return <React.Fragment key={i}><At x={x - 24} y={y} r={26} label="H" fill="#FFF" text={INK} k={gas} /><At x={x + 24} y={y} r={26} label="H" fill="#FFF" text={INK} k={gas} /></React.Fragment>; }) : null}
      <Head at={b0} y={160}>TAKE THE <Red>OXYGEN</Red> OUT OF H₂O</Head>
      <Pop at={F(141.72)} x={1200} y={420} w={700} size={56}>LIQUID WATER</Pop>
      <Pop at={F(142.5)} x={1200} y={500} w={700} size={56} color={C.red}>↓ FLASHES INTO</Pop>
      <Pop at={F(143.44)} x={1200} y={580} w={700} size={56} color={C.blue}>PURE HYDROGEN GAS</Pop>
    </OxyStage>
  );
};
export const Thousand: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const a = 40 + 360 * r(f, F(145.2), F(146.6), 0, 1, Easing.inOut(Easing.cubic));
  return (
    <OxyStage mode="light" b0={b0} b1={b1}>
      <Cube x={330} y={800} a={40} fill="#3B82F6" />
      <Pop at={b0} x={200} y={830} w={300} size={36} align="center">WATER</Pop>
      <Cube x={720} y={900} a={a} />
      <Pop at={F(146.6)} x={720} y={930} w={400} size={36} align="center" color={C.blue}>HYDROGEN GAS</Pop>
      <Pop at={F(145.6)} x={1360} y={330} w={520} size={52}>OVER</Pop>
      <Count a={F(145.98)} b={F(146.9)} from={1} to={1000} fmt={(v) => `${Math.round(v).toLocaleString("en-US")}×`} x={1360} y={400} w={540} size={130} color={C.red} />
      <Pop at={F(147.04)} x={1360} y={560} w={520} size={52}>THE VOLUME</Pop>
      <Head at={F(145.2)} y={160}>EXPANDING…</Head>
    </OxyStage>
  );
};
const Cloud: React.FC<{ cx: number; cy: number; R: number; k: number; t: number; n?: number; startAt?: number }> = ({ cx, cy, R, k, t, n = 26, startAt = -999 }) => {
  const f = useCurrentFrame();
  return (
    <>
      {Array.from({ length: n }, (_, i) => {
        const a = (i / n) * 6.283 + t * 0.05; const pk = sp(f, startAt + (i % 9) * 2, 12, 200);
        const rr = (R + 20 * Math.sin(t * 1.5 + i)) * (0.75 + 0.25 * pk), pr = (44 + 20 * q(i, 3)) * pk;
        return pr > 0.5 ? <div key={i} style={{ position: "absolute", left: cx + Math.cos(a) * rr * k - pr, top: cy + Math.sin(a) * rr * k - pr, width: pr * 2, height: pr * 2, borderRadius: 999, background: HAZE, border: "4px solid #E2E8F0" }} /> : null;
      })}
    </>
  );
};
export const Erupt: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const g = r(f, F(151.28), F(154.6));
  return (
    <OxyStage mode="space" b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 960 - (210 + 150 * g), top: 680 - (210 + 150 * g), width: (210 + 150 * g) * 2, height: (210 + 150 * g) * 2, borderRadius: 9999, background: `rgba(191,219,254,${0.18 + 0.2 * g})` }} />
      <Earth cx={960} cy={680} R={210} t={t} />
      <Cloud cx={960} cy={680} R={260 + 120 * g} k={1} t={t} startAt={F(149.22)} />
      <Head at={F(149.22)} y={160} mode="space">EVERY OCEAN, LAKE &amp; RIVER</Head>
      <Pop at={F(151.28)} x={1430} y={430} w={480} size={72} color={C.red}>ERUPTS</Pop>
      <Pop at={F(152.52)} x={1430} y={530} w={480} size={36} color={SPACE.text}>INTO A PLANET-SIZED</Pop>
      <Pop at={F(153.66)} x={1430} y={580} w={480} size={36} color="#93C5FD">HYDROGEN CLOUD</Pop>
    </OxyStage>
  );
};
export const NotSpace: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const h = 110 + 70 * r(f, F(158.4), F(159.2));
  return (
    <OxyStage mode="space" b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 960 - 1000 - h, top: 1700 - 1000 - h, width: 2 * (1000 + h), height: 2 * (1000 + h), borderRadius: 9999, background: "rgba(191,219,254,0.5)" }} />
      <Earth cx={960} cy={1700} R={1000} t={t} />
      <Svg><line x1={0} y1={330} x2={1920} y2={330} stroke="#94A3B8" strokeWidth="5" strokeDasharray="20 14" /></Svg>
      <Pop at={F(156.24)} x={1280} y={276} w={540} size={34} align="right" color="#94A3B8">SPACE (~100 KM UP)</Pop>
      <XMark x={200} y={330} s={44} at={F(157.02)} />
      <Head at={F(155.78)} y={160} mode="space">IT WOULDN&apos;T REACH SPACE IN 5 s</Head>
      <Pop at={F(158.02)} x={0} y={400} w={1920} size={56} align="center" color="#BFDBFE">…BUT IT WOULD <Red>ENGULF THE PLANET</Red></Pop>
    </OxyStage>
  );
};

// ================= 5.00 s: OXYGEN RETURNS =================
export const SnapBack: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <OxyStage mode="space" b0={b0} b1={b1} timer="returns" timerAt={F(160.04)} overlay={<Flash at={F(163.38)} color="#FFF7D6" dur={8} />}>
      <div style={{ position: "absolute", left: 1260 - 330, top: 620 - 330, width: 660, height: 660, borderRadius: 9999, background: "rgba(191,219,254,0.35)" }} />
      <Earth cx={1260} cy={620} R={250} t={t} />
      {Array.from({ length: 30 }, (_, i) => {
        const a = q(i, 1) * 6.283, rr = 290 + q(i, 2) * 110, d = F(162.3) + Math.floor(q(i, 3) * 24);
        const u = r(f, d, d + 12, 0, 1, Easing.out(Easing.cubic));
        const sx = 1260 + Math.cos(a) * 1400, sy = 620 + Math.sin(a) * 1000, ex = 1260 + Math.cos(a) * rr, ey = 620 + Math.sin(a) * rr * 0.8;
        return f < d ? null : <At key={i} x={sx + (ex - sx) * u} y={sy + (ey - sy) * u} r={20} />;
      })}
      <Pop at={F(160.04)} x={140} y={330} w={700} size={170} mono color={C.green}>5.00s</Pop>
      <Pop at={F(162.3)} x={150} y={560} w={700} size={52} color={SPACE.text}>EVERY OXYGEN ATOM</Pop>
      <Pop at={F(163.38)} x={150} y={630} w={700} size={76} color={C.red}>SNAPS BACK</Pop>
    </OxyStage>
  );
};
export const Mix: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  return (
    <OxyStage mode="space" b0={b0} b1={b1} timer="returns">
      <div style={{ position: "absolute", left: 960 - 380, top: 660 - 380, width: 760, height: 760, borderRadius: 9999, background: "rgba(191,219,254,0.3)" }} />
      <Earth cx={960} cy={660} R={220} t={t} />
      {Array.from({ length: 34 }, (_, i) => {
        const a = q(i, 1) * 6.283 + t * (0.3 + 0.3 * q(i, 2)) * (i % 2 ? 1 : -1), rr = 255 + q(i, 3) * 100, ox = i % 3 === 0;
        const k = ox ? sp(f, F(167.56) + (i % 6) * 2, 12, 200) : 1;
        const x = 960 + Math.cos(a) * rr, y = 660 + Math.sin(a) * rr, col = ox ? C.red : "#FFF", tc = ox ? "#FFF" : INK;
        return <React.Fragment key={i}><At x={x - 10} y={y} r={11} label="" fill={col} text={tc} k={k} /><At x={x + 10} y={y} r={11} label="" fill={col} text={tc} k={k} /></React.Fragment>;
      })}
      <Pop at={F(166.44)} x={130} y={470} w={400} size={120} mono color="#BFDBFE">H₂</Pop>
      <Pop at={F(166.44)} x={120} y={610} w={420} size={36} color={SPACE.text}>HYDROGEN GAS</Pop>
      <Pop at={F(167.88)} x={1440} y={470} w={400} size={120} mono color={C.red}>O₂</Pop>
      <Pop at={F(167.88)} x={1440} y={610} w={420} size={36} color={SPACE.text}>FRESH OXYGEN</Pop>
      <Head at={F(165.64)} y={160} mode="space">EARTH, <Red>WRAPPED</Red> IN HYDROGEN</Head>
    </OxyStage>
  );
};
export const NoSpark: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <OxyStage mode="light" b0={b0} b1={b1} timer="returns">
      <SparkPlug x={960} y={560} s={220} spark={0.5 + 0.5 * Math.sin(f * 1.3)} />
      <XMark x={960} y={560} s={230} at={F(169.8)} />
      <Head at={F(169.3)} y={160}>NO ENGINE <Red>SPARKS</Red> NEEDED</Head>
    </OxyStage>
  );
};
export const Igniters: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const ign = F(173.68);
  const items = [{ at: F(171.1), x: 480, label: "LIGHTNING" }, { at: F(171.66), x: 960, label: "HOT SURFACES" }, { at: F(172.64), x: 1440, label: "MOLTEN DEBRIS" }];
  return (
    <OxyStage mode="space" b0={b0} b1={b1} timer="returns" overlay={<Flash at={ign} color={C.amber} dur={10} />}>
      {items.map((it, i) => { const k = sp(f, it.at, 11, 220, 0.7); return f < it.at ? null : (
        <React.Fragment key={i}>
          {i === 0 ? <Bolt x={480} y={560} s={190 * k} /> : i === 1 ? <HotPlate x={960} y={620} s={180 * k} t={t} /> : <Molten x={1440} y={610} s={170 * k} t={t} />}
          <Flame x={it.x + 110} y={420} s={90} t={t} k={sp(f, ign + i * 3, 10, 200)} />
          <Pop at={it.at} x={it.x - 230} y={790} w={460} size={44} align="center" color={SPACE.text}>{it.label}</Pop>
        </React.Fragment>
      ); })}
      <Stamp at={F(174.26)} x={600} y={880} text="IGNITES INSTANTLY" size={64} rot={-4} bg="rgba(14,19,31,0.92)" />
    </OxyStage>
  );
};

// ================= OUTRO (end-screen area on the right) =================
export const Outro: React.FC<BeatProps> = ({ b0, b1 }) => (
  <OxyStage mode="light" b0={b0} b1={b1} timer="none" overlay={<Presenter pose="explaining" at={b0} heroFor={99} />}>
    <Grow at={b0 + 3} ox={1260} oy={580}><Card x={760} y={300} w={1000} h={560} border={C.red} /></Grow>
    <Pop at={F(197.92)} x={760} y={340} w={1000} size={260} align="center" mono color={C.red} from="scale">8</Pop>
    <Pop at={F(198.64)} x={760} y={630} w={1000} size={58} align="center">REAL COSMIC THREATS</Pop>
    <Pop at={F(200.76)} x={760} y={910} w={1000} size={56} align="center" color={C.red}>0 SECONDS OF WARNING</Pop>
    <Head at={b0} y={160} x={620} w={1200}>WATCH THIS NEXT</Head>
  </OxyStage>
);
