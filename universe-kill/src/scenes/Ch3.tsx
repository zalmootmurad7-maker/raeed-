import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Card, Count, Pop, Stamp } from "../components/Base";
import { Presenter } from "../components/Char";
import { IconAsteroid } from "../components/Icons";
import { BeatProps, ChapterTitle, Transition } from "../components/Kit";
import { Check, City, Dino, Dust, Earth, Fact, Fire, Flash, Head, PillAt, PopIn, Shock, Stage, Sun, Svg, Telescope, Wave, Red, Green, Amber } from "../components/Prims";
import { C, F, FONT, LIGHT, r, sp } from "../lib/core";

const BADGE = "YEARS — OR 0s";
const BA = F(151.2);
const S: React.FC<BeatProps & { children: React.ReactNode; overlay?: React.ReactNode }> = ({ b0, b1, children, overlay }) => (
  <Stage mode="light" badge={BADGE} badgeAt={BA} push={[b0, b1]} overlay={overlay}>{children}</Stage>
);

export const C3Title: React.FC<BeatProps> = (p) => <ChapterTitle {...p} i={2} mode="light" badge={BADGE} />;

const Rock: React.FC<{ x: number; y: number; s: number; t: number; trail?: number }> = ({ x, y, s, t, trail = 1 }) => (
  <>
    {trail > 0 ? <Svg><line x1={x - s * 1.6} y1={y - s * 0.9} x2={x - s * 0.2} y2={y - s * 0.1} stroke={C.amber} strokeWidth={s * 0.5} strokeLinecap="round" opacity={0.45 * trail} /></Svg> : null}
    <div style={{ position: "absolute", left: x - s / 2, top: y - s / 2 }}><IconAsteroid size={s} t={t} /></div>
  </>
);

export const C3Approach: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const k = r(f, b0, b1, 0, 1, Easing.in(Easing.quad));
  return (
    <S b0={b0} b1={b1}>
      <Pop at={F(153.3)} x={110} y={170} w={1000} size={84} mono>66 MILLION</Pop>
      <Pop at={F(154.7)} x={110} y={270} w={1000} size={56}>YEARS AGO…</Pop>
      <Earth cx={1460} cy={660} R={300} t={t} />
      <Rock x={260 + 640 * k} y={420 + 140 * k} s={170} t={t} />
    </S>
  );
};
export const C3Impact: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const hit = F(158.2);
  const k = r(f, b0, hit, 0, 1, Easing.in(Easing.quad));
  return (
    <S b0={b0} b1={b1}>
      <Earth cx={1460} cy={660} R={300} t={t} />
      {f < hit ? <Rock x={900 + 290 * k} y={560 + 40 * k} s={170 - 40 * k} t={t} /> : null}
      <Pop at={F(156.9)} x={140} y={820} w={600} size={70} align="center" mono>~10 KM WIDE</Pop>
      <Shock cx={1180} cy={600} at={hit} R={250} color={C.red} n={3} period={0.9} />
      <Flash at={hit} />
      <Head at={hit} y={175} x={110} w={1000} align="left">SLAMMED INTO <Red>EARTH</Red></Head>
    </S>
  );
};
export const C3After: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const items = [{ at: F(160.8), x: 460, l: "WILDFIRES", I: Fire }, { at: F(161.9), x: 960, l: "TSUNAMIS", I: Wave }, { at: F(163.7), x: 1460, l: "CHOKING DUST", I: Dust }];
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(160.0)} y={175}>IT TRIGGERED…</Head>
      {items.map((it, i) => <React.Fragment key={i}><PopIn at={it.at} x={it.x - 160} y={380} w={320} h={320}><it.I x={160} y={160} s={220} t={t} /></PopIn><Pop at={it.at + 3} x={it.x - 250} y={760} w={500} size={52} align="center">{it.l}</Pop></React.Fragment>)}
    </S>
  );
};
export const C3Species: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = r(f, F(165.4), F(166.8), 0, 0.75, Easing.out(Easing.cubic));
  return (
    <S b0={b0} b1={b1}>
      <Count a={F(165.4)} b={F(166.8)} to={75} fmt={(v) => `~${Math.round(v)}%`} x={0} y={210} w={1920} size={170} color={C.red} align="center" />
      <div style={{ position: "absolute", left: 260, top: 470, width: 1400, height: 90, borderRadius: 45, border: `5px solid ${LIGHT.ink}`, background: "#FFF", overflow: "hidden", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${k * 100}%`, background: C.red }} />
      </div>
      <Pop at={F(167.2)} x={0} y={610} w={1920} size={56} align="center">OF ALL SPECIES WIPED OUT</Pop>
      <Dino x={1500} y={860} s={150} gone={r(f, F(168.8), F(169.6))} />
      <Pop at={F(168.5)} x={560} y={830} w={760} size={46} align="right" color={C.red}>INCLUDING THE DINOSAURS</Pop>
    </S>
  );
};
export const C3Radar: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const cx = 1100, cy = 600, R = 360, a = (t * 2.2) % (Math.PI * 2);
  const rocks = [[0.6, 0.5], [1.9, 0.75], [3.1, 0.4], [4.3, 0.85], [5.4, 0.6]];
  return (
    <S b0={b0} b1={b1}>
      <PillAt at={F(170.6)} x={110} y={175} text="NASA PLANETARY DEFENSE" color={C.blue} size={40} />
      <Pop at={F(171.8)} x={110} y={300} w={560} size={48}>TRACKS MOST OF THE<br /><Red>GIANT PLANET-KILLERS</Red></Pop>
      <div style={{ position: "absolute", left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: 999, background: "#0F172A", border: `6px solid ${LIGHT.ink}`, boxSizing: "border-box", overflow: "hidden" }}>
        {[0.33, 0.66].map((q) => <div key={q} style={{ position: "absolute", left: R - R * q, top: R - R * q, width: R * 2 * q, height: R * 2 * q, borderRadius: 999, border: "3px solid rgba(16,185,129,0.4)", boxSizing: "border-box" }} />)}
        <div style={{ position: "absolute", left: 0, top: 0, width: R * 2, height: R * 2, background: `conic-gradient(from ${(a * 180) / Math.PI + 90}deg, rgba(16,185,129,0.55), rgba(16,185,129,0) 60deg)` }} />
      </div>
      {rocks.map(([ra, rr], i) => { const x = cx + Math.cos(ra) * R * rr, y = cy + Math.sin(ra) * R * rr; const seen = f > b0 + 10 + i * 8; return <React.Fragment key={i}><div style={{ position: "absolute", left: x - 12, top: y - 12, width: 24, height: 24, borderRadius: 6, background: "#9CA3AF", border: "3px solid #F6F4EF", rotate: "20deg" }} />{seen ? <div style={{ position: "absolute", left: x - 30, top: y - 30, width: 60, height: 60, borderRadius: 99, border: `5px solid ${C.green}`, boxSizing: "border-box" }} /> : null}</React.Fragment>; })}
    </S>
  );
};
export const C3Years: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1}>
    <Fact at={F(174.2)} mode="light" pill="USUALLY BUYS US" pillColor={C.green} big="YEARS OR DECADES" bigColor={C.green} bigSize={130} sub="OF WARNING" y={330} />
    <Check x={960} y={860} s={60} at={F(176.1)} />
  </S>
);
export const C3Usually: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  return (
    <S b0={b0} b1={b1}>
      <Stamp at={F(176.8)} x={760} y={175} text="USUALLY." size={90} rot={-4} />
      <PillAt at={F(177.9)} x={110} y={420} text="2013" color={C.red} size={56} />
      <PopIn at={F(179.1)} x={860} y={460} w={220} h={220}><IconAsteroid size={220} t={t} /></PopIn>
      <Pop at={F(179.1)} x={660} y={740} w={600} size={64} align="center" mono>20 METERS</Pop>
      <Pop at={F(180.3)} x={0} y={880} w={1920} size={52} align="center">EXPLODED OVER…</Pop>
      {f < 0 ? null : null}
    </S>
  );
};
export const C3Chely: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const burst = F(181.5), glass = F(186.0);
  return (
    <S b0={b0} b1={b1}>
      <PillAt at={F(181.3)} x={110} y={175} text="CHELYABINSK, RUSSIA" color={C.red} size={40} />
      <Count a={F(183.5)} b={F(184.7)} to={1500} fmt={(v) => `~${Math.round(v).toLocaleString("en-US")}`} x={110} y={290} w={700} size={130} color={C.red} />
      <Pop at={F(184.7)} x={110} y={440} w={600} size={52}>PEOPLE INJURED</Pop>
      <Shock cx={1150} cy={390} at={burst} R={220} color={C.amber} n={3} period={1.0} />
      {f >= burst ? <div style={{ position: "absolute", left: 1150 - 60, top: 390 - 60, width: 120, height: 120, borderRadius: 99, background: "radial-gradient(circle, #FFF 0%, #FDE68A 40%, rgba(245,158,11,0) 70%)" }} /> : null}
      <City x={1180} y={1000} s={170} />
      {f >= glass ? Array.from({ length: 10 }, (_, i) => { const k = r(f, glass + i, glass + i + 18); return <div key={i} style={{ position: "absolute", left: 900 + i * 60 + 40 * k * Math.cos(i), top: 700 + 120 * k, width: 18, height: 18, background: "#BFDBFE", border: `3px solid ${LIGHT.ink}`, rotate: `${i * 37 + 90 * k}deg`, opacity: 1 - k * 0.6 }} />; }) : null}
      <Pop at={F(186.2)} x={110} y={620} w={600} size={50} color={C.blue}>MOSTLY FROM<br />SHATTERED WINDOWS</Pop>
      <Flash at={burst} color="#FFF7D6" dur={8} />
    </S>
  );
};
export const C3Glare: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const k = r(f, b0, b1, 0, 1, Easing.linear);
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(187.7)} y={160}>NOBODY SAW IT <Red>COMING</Red></Head>
      <Svg><path d={`M 300 540 L 1520 400 L 1520 700 Z`} fill="rgba(245,158,11,0.22)" stroke="rgba(245,158,11,0.5)" strokeWidth="4" /></Svg>
      <Sun cx={260} cy={540} R={150} t={t} />
      <Earth cx={1620} cy={560} R={110} t={t} />
      <Telescope x={1640} y={420} s={70} rot={200} />
      <div style={{ position: "absolute", left: 0, top: 0, opacity: 0.85 }}><Rock x={560 + 760 * k} y={530 + 10 * k} s={90} t={t} trail={0} /></div>
      <Pop at={F(192.1)} x={0} y={860} w={1920} size={56} align="center">IT CAME FROM THE <Amber>SUN&apos;S GLARE</Amber></Pop>
    </S>
  );
};
export const C3Blind: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const glare = 0.6 + 0.4 * Math.sin(f / 30 * 3);
  return (
    <S b0={b0} b1={b1} overlay={<Presenter pose="the_catch" at={b0} heroFor={1.8} />}>
      <div style={{ position: "absolute", left: 960 - 300, top: 560 - 300, width: 600, height: 600, borderRadius: 999, border: `14px solid ${LIGHT.ink}`, background: `radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(253,230,138,${glare}) 45%, rgba(245,158,11,0.75) 100%)`, boxSizing: "border-box" }} />
      <Svg><line x1={960 - 300} y1={560} x2={960 + 300} y2={560} stroke={LIGHT.ink} strokeWidth="4" opacity="0.4" /><line x1={960} y1={260} x2={960} y2={860} stroke={LIGHT.ink} strokeWidth="4" opacity="0.4" /></Svg>
      <Head at={F(194.7)} y={160}>OUR TELESCOPES&apos; <Red>BLIND SPOT</Red></Head>
      <Stamp at={F(196.4)} x={1240} y={760} text="0s WARNING" size={74} />
    </S>
  );
};
export const C3Split: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1}>
    <Head at={b0} y={160}>WARNING TIME?</Head>
    <PopIn at={F(198.9)} x={160} y={300} w={760} h={560}><Card x={0} y={0} w={760} h={560} border={C.green}><div style={{ position: "absolute", left: 0, top: 150, width: 760, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 130, color: C.green }}>YEARS</div><div style={{ position: "absolute", left: 0, top: 330, width: 760, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 48 }}>IF WE SPOT IT EARLY</div></Card></PopIn>
    <PopIn at={F(200.9)} x={1000} y={300} w={760} h={560}><Card x={0} y={0} w={760} h={560} border={C.red}><div style={{ position: "absolute", left: 0, top: 150, width: 760, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 130, color: C.red }}>0 SEC</div><div style={{ position: "absolute", left: 0, top: 330, width: 760, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 44 }}>IF IT SNEAKS OUT<br />OF THE SUN</div></Card></PopIn>
  </S>
);
export const C3Bridge: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = sp(f, b0, 12, 160);
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", inset: 0, scale: `${0.7 + 0.3 * k}` }}><Sun cx={960} cy={620} R={250} t={f / 30} /></div>
      <Head at={F(205.0)} y={160}>STRAIGHT FROM <Amber>THE SUN ITSELF</Amber></Head>
    </S>
  );
};
export const C3ToC4: React.FC<BeatProps> = (p) => <Transition {...p} next={3} label={<>IT DOESN&apos;T NEED TO HIT THE GROUND TO <Red>WRECK MODERN LIFE</Red></>} />;

export const CH3 = [
  { t: 151.2, C: C3Title }, { t: 153.3, C: C3Approach }, { t: 156.5, C: C3Impact }, { t: 159.8, C: C3After }, { t: 164.6, C: C3Species },
  { t: 169.8, C: C3Radar }, { t: 173.6, C: C3Years }, { t: 176.8, C: C3Usually }, { t: 181.3, C: C3Chely }, { t: 184.7, C: C3Chely }, { t: 187.5, C: C3Glare },
  { t: 193.1, C: C3Blind }, { t: 197.8, C: C3Split }, { t: 200.7, C: C3Split }, { t: 203.8, C: C3Bridge }, { t: 207.0, C: C3ToC4 },
];
export const _u3 = [Green];
