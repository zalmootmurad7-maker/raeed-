import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Card, Pop, Stamp } from "../components/Base";
import { CAM_FULL, Cam, MasterBoard, cardCenter, lerpCam } from "../components/Board";
import { Couch, Presenter } from "../components/Char";
import { BeatProps } from "../components/Kit";
import { Arrow, Earth, Head, PopIn, Stage, Svg, Red, Green } from "../components/Prims";
import { C, F, FONT, LIGHT, r } from "../lib/core";

const S: React.FC<BeatProps & { children: React.ReactNode; overlay?: React.ReactNode }> = ({ b0, b1, children, overlay }) => (
  <Stage mode="light" push={[b0, b1]} overlay={overlay}>{children}</Stage>
);
const ALL = [0, 1, 2, 3, 4, 5, 6, 7];

const Recap: React.FC<BeatProps & { row: number }> = ({ b0, b1, row }) => {
  const f = useCurrentFrame();
  const a = cardCenter(row * 4), b = cardCenter(row * 4 + 3);
  const target: Cam = { s: 1.45, fx: (a.x + b.x) / 2, fy: a.y };
  const cam = lerpCam(CAM_FULL, target, r(f, b0, b0 + 14, 0, 1, Easing.inOut(Easing.cubic)));
  const hits = [[0, 557.3], [3, 558.4], [6, 560.1], [7, 561.3]].filter(([, s]) => f >= F(s)).map(([i]) => i);
  return (<><Stage mode="light"><MasterBoard cam={cam} checks={ALL} redCards={hits} reveal8 /></Stage></>);
};
export const O1Recap: React.FC<BeatProps> = (p) => <Recap {...p} row={0} />;
export const O1Recap2: React.FC<BeatProps> = (p) => <Recap {...p} row={1} />;
export const O2Party: React.FC<BeatProps> = ({ b0 }) => {
  const f = useCurrentFrame();
  const cam = lerpCam({ s: 1.45, fx: 960, fy: 770 }, CAM_FULL, r(f, b0, b0 + 14, 0, 1, Easing.inOut(Easing.cubic)));
  return (
    <Stage mode="light">
      <MasterBoard cam={cam} checks={ALL} reveal8 title={<Pop at={F(563.4)} x={0} y={0} w={1708} size={58} align="center">PLENTY OF WAYS TO <Red>END THE PARTY</Red></Pop>} />
    </Stage>
  );
};
export const O3Rare: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1}>
    <Head at={F(565.8)} y={160}>THE GOOD NEWS?</Head>
    <Stamp at={F(567.8)} x={480} y={300} text="EXTRAORDINARILY RARE" color={C.green} size={88} rot={-3} />
    <Couch pose="couch_chill" x={960 - 380} bottom={1050} w={760} at={b0} />
  </S>
);
export const O4Life: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Earth cx={960} cy={560} R={260} t={f / 30} glow="rgba(16,185,129,0.35)" />
      <Pop at={F(570.3)} x={0} y={160} w={1920} size={60} align="center">EARTH HAS KEPT LIFE GOING FOR</Pop>
      <Pop at={F(571.4)} x={0} y={880} w={1920} size={80} align="center" color={C.green}>BILLIONS OF YEARS</Pop>
    </S>
  );
};
const GlassPlanet: React.FC<{ cx: number; cy: number; R: number; t: number }> = ({ cx, cy, R, t }) => (
  <>
    <div style={{ position: "absolute", left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: 999, background: "repeating-linear-gradient(180deg, #2563EB 0 26px, #1D4ED8 26px 46px, #60A5FA 46px 58px)", border: `8px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
    <Svg>{Array.from({ length: 12 }, (_, i) => { const ph = (t * 0.9 + i / 12) % 1; const x = cx - R - 120 + (2 * R + 240) * ph, y = cy - R * 0.8 + ((i * 53) % (R * 1.6)); return <path key={i} d={`M ${x} ${y} l 30 -9 l -12 20 Z`} fill="#BFDBFE" stroke={LIGHT.ink} strokeWidth="3" opacity={ph < 0.92 ? 1 : 0} />; })}</Svg>
  </>
);
const IronPlanet: React.FC<{ cx: number; cy: number; R: number; t: number }> = ({ cx, cy, R, t }) => (
  <>
    <div style={{ position: "absolute", left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: 999, background: `linear-gradient(90deg, ${C.amber} 50%, #334155 50%)`, border: `8px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
    <Svg>{Array.from({ length: 8 }, (_, i) => { const ph = (t * 1.1 + i / 8) % 1; const x = cx + 20 + ((i * 37) % (R * 0.8)), y = cy - R * 0.7 + R * 1.4 * ph; return <path key={i} d={`M ${x} ${y - 16} Q ${x + 10} ${y} ${x} ${y + 8} Q ${x - 10} ${y} ${x} ${y - 16} Z`} fill="#CBD5E1" stroke={LIGHT.ink} strokeWidth="3" opacity={ph < 0.9 ? 1 : 0} />; })}</Svg>
  </>
);
export const O5Places: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Pop at={F(574.1)} x={0} y={160} w={1920} size={60} align="center">PLACES WHERE THE UNIVERSE</Pop>
      <Pop at={F(575.1)} x={0} y={235} w={1920} size={60} align="center" color={C.red}>DOESN&apos;T EVEN WAIT TO KILL YOU</Pop>
      <PopIn at={F(575.7)} x={520 - 210} y={640 - 210} w={420} h={420}><GlassPlanet cx={210} cy={210} R={190} t={f / 30} /></PopIn>
      <PopIn at={F(576.4)} x={1400 - 210} y={640 - 210} w={420} h={420}><IronPlanet cx={210} cy={210} R={190} t={f / 30} /></PopIn>
    </S>
  );
};
export const O6Rain: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <GlassPlanet cx={520} cy={520} R={230} t={f / 30} />
      <IronPlanet cx={1400} cy={520} R={230} t={f / 30} />
      <Pop at={F(578.4)} x={270} y={820} w={500} size={46} align="center" color={C.blue}>MOLTEN GLASS,<br />SIDEWAYS</Pop>
      <Pop at={F(580.2)} x={1150} y={820} w={500} size={46} align="center">LIQUID IRON RAIN</Pop>
    </S>
  );
};
export const O7End: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1} overlay={<Presenter pose="explaining" at={b0} heroFor={1.5} />}>
      <PopIn at={F(582.1)} x={820} y={220} w={980} h={600}>
        <Card x={0} y={0} w={980} h={600} border={C.red}>
          <div style={{ position: "absolute", left: 40, top: 40, width: 900, fontFamily: FONT.head, fontWeight: 700, fontSize: 56, lineHeight: 1.05, color: LIGHT.ink }}>10 REAL PLANETS YOU<br />WOULDN&apos;T SURVIVE <span style={{ color: C.red }}>1 SECOND</span> ON</div>
          <div style={{ position: "absolute", left: 40, top: 230, width: 900, fontFamily: FONT.head, fontWeight: 700, fontSize: 36, color: "#64748B" }}>MOLTEN GLASS · LIQUID IRON</div>
          <GlassPlanet cx={250} cy={440} R={110} t={f / 30} />
          <IronPlanet cx={700} cy={440} R={110} t={f / 30} />
        </Card>
      </PopIn>
      <Arrow x1={480} y1={560} x2={780} y2={520} color={C.red} w={12} k={r(f, F(582.3), F(582.9))} />
      <Pop at={F(582.3)} x={820} y={860} w={980} size={52} align="center">CLICK THIS VIDEO <Red>NEXT</Red></Pop>
      <div style={{ display: "none" }}><Green>.</Green></div>
    </S>
  );
};

export const OUTRO = [
  { t: 556.4, C: O1Recap }, { t: 559.5, C: O1Recap2 }, { t: 562.8, C: O2Party }, { t: 565.6, C: O3Rare }, { t: 569.6, C: O4Life },
  { t: 572.8, C: O5Places }, { t: 577.1, C: O6Rain }, { t: 581.3, C: O7End },
];
