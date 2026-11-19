import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { Appear, CardShot, Stamp, Txt, ink, muted, ramp, useShot } from "../components/kit";
import { LOOKS, Planet } from "../components/Planet";
import { Body, Line, Ring, Star, Tag, Title } from "../components/SpaceBits";
import { CAM_OVERVIEW, camOnCard, lerpCam, MasterBoard } from "../components/MasterBoard";
import { CharacterRig } from "../components/CharacterRig";
import { BG_Light_Grid } from "../components/Backgrounds";
import { ExplainerCard } from "../components/ExplainerCard";
import { ChapterOpen } from "./ChapterOpen";
import { ACCENT, FONT, SPACE } from "../tokens";

const T = SPACE.text, M = muted("space"), L = ink("light"), LM = muted("light");
const P8 = "08 · PSO J318.5-22", P9 = "09 · Methuselah", P10 = "10 · 8 UMi b / Halla";

// ---------- Chapter 8: PSO J318.5-22 ----------
export const Shot27: React.FC = () => {
  const { f, t, dur } = useShot();
  return (
    <ChapterOpen chapter={8}>
      <CardShot mode="space" pose="explaining" pill={P8} push={0.03}
        head={<Title text={f >= t(515.74) ? "NO STAR. NO ORBIT. NO SUNRISE." : f >= t(507.82) ? "A ROGUE PLANET" : "NO DAWN. NO SUNSET."} color={T} size={54} />}>
        <div style={{ position: "absolute", left: ramp(f, 0, dur, 760, 520, (k) => k), top: 220 }}><Planet size={300} look={LOOKS[8]} id="s27" /></div>
        <Tag x={58} y={210} text="80 LIGHT-YEARS" at={t(502.24)} size={34} />
        <Tag x={58} y={290} text="≈ 6× JUPITER MASS" at={t(508.5)} color={ACCENT.red} size={34} />
        <Body y={560} text="Drifting alone between the stars." color={M} at={t(511.0)} w={600} size={34} />
      </CardShot>
    </ChapterOpen>
  );
};
export const Shot28: React.FC = () => {
  const { f, t } = useShot();
  return (
    <CardShot mode="space" pose="thinking" pill={P8} push={0.04} head={<Title text="HOW DOES A PLANET END UP ALONE?" color={T} size={52} />}>
      <Appear at={t(520.6)}><div style={{ position: "absolute", left: 60, top: 200, width: 520, height: 400, border: `4px solid ${SPACE.border}`, borderRadius: 16 }} />
        <Star cx={320} cy={360} r={90} core="#FCA5A5" edge="#7F1D1D" glow="rgba(127,29,29,0.5)" />
        <Txt x={60} y={500} size={38} color={T} w={520} align="center">FAILED STAR?</Txt></Appear>
      <Appear at={t(523.4)}><div style={{ position: "absolute", left: 640, top: 200, width: 520, height: 400, border: `4px solid ${SPACE.border}`, borderRadius: 16 }} />
        <Star cx={780} cy={360} r={50} />
        <Ring cx={780} cy={360} rx={110} color="#94A3B8" />
        <Line x1={900} y1={330} x2={1100} y2={240} color={ACCENT.red} w={10} k={ramp(f, t(524.5), t(526.0))} />
        <div style={{ position: "absolute", left: 870 + 200 * ramp(f, t(524.5), t(526.0)), top: 290 - 90 * ramp(f, t(524.5), t(526.0)) }}><Planet size={60} look={LOOKS[8]} id="ej" /></div>
        <Txt x={640} y={500} size={38} color={T} w={520} align="center">KICKED OUT?</Txt></Appear>
    </CardShot>
  );
};
export const Shot29: React.FC = () => {
  const { f, t } = useShot();
  const cold = ramp(f, t(546.5), t(552.0));
  const tease = f >= t(556.24);
  return (
    <CardShot mode="space" pose="the_catch" pill={P8} push={0.04}
      head={<Title text={tease ? "NEXT: A PLANET SO OLD..." : f >= t(546.5) ? "ONE DAY: A FROZEN GHOST" : f >= t(536.72) ? "GLOWING WITH BIRTH HEAT" : "A NEWBORN WORLD"} color={tease ? ACCENT.amber : T} size={54} />}>
      <div style={{ position: "absolute", left: 660, top: 200, filter: `grayscale(${cold}) brightness(${1 - 0.3 * cold})`, opacity: 1 - 0.5 * cold }}><Planet size={380} look={{ ...LOOKS[8], glow: f >= t(536.72) ? ACCENT.red : undefined }} id="s29" /></div>
      <Tag x={58} y={210} text="~12 MILLION YRS OLD" at={t(531.5)} color={ACCENT.amber} size={34} />
      <Body y={290} text="In cosmic terms: a newborn." color={M} at={t(534.5)} w={560} size={36} />
      <Body y={400} text="Clouds hot enough to rain molten metal." color={M} at={t(540.0)} w={560} size={34} />
    </CardShot>
  );
};

// ---------- Chapter 9: Methuselah ----------
const Timeline: React.FC<{ pin?: number; earthAt: number; pinAt?: number }> = ({ earthAt, pinAt }) => {
  const { f } = useShot();
  const x = (gyrAgo: number) => 80 + (1 - gyrAgo / 13.8) * 1040;
  return (
    <>
      <div style={{ position: "absolute", left: 80, top: 330, width: 1040, height: 18, borderRadius: 9, background: "linear-gradient(90deg, #FBBF24, #60A5FA)" }} />
      <Txt x={40} y={370} size={30} color={L} w={260} font="mono">BIG BANG</Txt>
      <Txt x={40} y={410} size={26} color={LM} w={260} font="mono">13.8 B yrs</Txt>
      <Txt x={980} y={370} size={30} color={L} w={200} font="mono" align="right">TODAY</Txt>
      {f >= earthAt ? <><div style={{ position: "absolute", left: x(4.5) - 12, top: 320, width: 24, height: 38, background: ACCENT.blue, borderRadius: 6 }} /><Txt x={x(4.5) - 120} y={250} size={30} color={ACCENT.blue} w={240} align="center" font="mono">EARTH 4.5 B</Txt></> : null}
      {pinAt !== undefined && f >= pinAt ? (
        <div style={{ position: "absolute", left: x(12.7) - 22, top: 220 - 60 * (1 - ramp(f, pinAt, pinAt + 6, 0, 1, Easing.out(Easing.back(2)))) }}>
          <svg width="44" height="110"><circle cx="22" cy="22" r="20" fill={ACCENT.red} stroke="#141824" strokeWidth="4" /><line x1="22" y1="40" x2="22" y2="108" stroke="#141824" strokeWidth="6" /></svg>
          <div style={{ position: "absolute", left: -80, top: -60, width: 210, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 30, color: ACCENT.red }}>12.7 B</div>
        </div>
      ) : null}
    </>
  );
};
export const Shot30: React.FC = () => {
  const { f, t } = useShot();
  return (
    <ChapterOpen chapter={9}>
      <CardShot mode="light" pose="explaining" pill={P9} push={0.03}
        head={<Title text={f >= t(574.42) ? "THEN CAME METHUSELAH" : f >= t(564.14) ? "PLANETS NEED HEAVY ELEMENTS" : "EARTH: 4.5 BILLION YEARS"} color={L} />}>
        <Timeline earthAt={t(561.6)} />
        {["Fe", "Si", "C"].map((e, i) => <Tag key={e} x={420 + i * 150} y={470} text={e} at={t(566.5) + i * 8} color={["#64748B", "#A16207", "#141824"][i]} size={40} />)}
        <Body y={560} text="forged by generations of earlier stars" color={LM} at={t(568.5)} w={700} size={34} />
      </CardShot>
    </ChapterOpen>
  );
};
export const Shot31: React.FC = () => {
  const { f, t } = useShot();
  return (
    <CardShot mode="light" pose="shocked" pill={P9} snapAt={t(589.0)} snapTo={1.05} push={0.02}
      head={<Title text={f >= t(597.26) ? "~1 BILLION YEARS AFTER THE BIG BANG" : f >= t(587.18) ? "12.7 BILLION YEARS OLD" : "AN ANCIENT GAS GIANT"} color={f >= t(587.18) ? ACCENT.red : L} size={52} />}>
      <Timeline earthAt={0} pinAt={t(589.0)} />
      <Tag x={58} y={460} text="~7,200 LY (updated est.)" at={t(580.5)} size={32} />
      <Tag x={58} y={540} text="> 2× JUPITER MASS" at={t(585.0)} color={ACCENT.amber} size={32} />
      <Tag x={640} y={540} text="≈ 3× OLDER THAN EARTH" at={t(601.0)} color={ACCENT.red} size={32} />
    </CardShot>
  );
};
export const Shot32: React.FC = () => {
  const { f, t } = useShot();
  const a = (f / 30) * 0.25, b = (f / 30) * 2.2;
  const tease = f >= t(623.72);
  return (
    <CardShot mode="space" pose="thinking" pill={P9} push={0.03}
      head={<Title text={tease ? "AND NUMBER 10..." : f >= t(618.9) ? "PLANETS FORMED EARLY" : "IT ORBITS TWO DEAD STARS"} color={tease ? ACCENT.red : T} size={54} />}>
      <div style={{ position: "absolute", left: 640 + Math.cos(b) * 40 - 18, top: 400 + Math.sin(b) * 20 - 18, width: 36, height: 36, borderRadius: 99, background: "#FFFFFF", boxShadow: "0 0 24px 8px rgba(147,197,253,0.8)" }} />
      <div style={{ position: "absolute", left: 640 - Math.cos(b) * 40 - 14, top: 400 - Math.sin(b) * 20 - 14, width: 28, height: 28, borderRadius: 99, background: "#E2E8F0", border: "3px solid #94A3B8" }} />
      <Ring cx={640} cy={400} rx={400} ry={160} color="#94A3B8" />
      <div style={{ position: "absolute", left: 640 + Math.cos(a) * 400 - 40, top: 400 + Math.sin(a) * 160 - 40 }}><Planet size={80} look={LOOKS[9]} id="meth" /></div>
      <Tag x={58} y={190} text="PULSAR + WHITE DWARF" at={t(611.5)} size={30} />
      <Tag x={58} y={590} text="ONE LAP ≈ 100 YEARS" at={t(614.5)} color={ACCENT.amber} size={30} />
    </CardShot>
  );
};

// ---------- Chapter 10: Halla ----------
export const Shot33: React.FC = () => {
  const { f, t } = useShot();
  const a = -0.9 + (f / 30) * 0.15;
  return (
    <ChapterOpen chapter={10}>
      <CardShot mode="space" pose="explaining" pill={P10} pillColor={ACCENT.red} push={0.03}
        head={<Title text={f >= t(647.64) ? "BAEKDU: A RED GIANT" : "HALLA SHOULD BE DUST"} color={T} size={56} />}>
        <Star cx={820} cy={380} r={110} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.5)" />
        <Ring cx={820} cy={380} rx={190} color="#FFFFFF" />
        <div style={{ position: "absolute", left: 820 + Math.cos(a) * 190 - 26, top: 380 + Math.sin(a) * 190 - 26 }}><Planet size={52} look={LOOKS[10]} id="h33" /></div>
        <Tag x={58} y={210} text="500+ LIGHT-YEARS" at={t(640.0)} size={32} />
        <Tag x={58} y={290} text="ORBIT: 0.5 AU" at={t(644.6)} color={ACCENT.blue} size={32} />
        <Body y={380} text="half the Earth–Sun distance" color={M} at={t(645.0)} w={460} size={32} />
        <Tag x={58} y={470} text="HELIUM-BURNING PHASE" at={t(650.5)} color={ACCENT.amber} size={30} />
      </CardShot>
    </ChapterOpen>
  );
};
export const Shot34: React.FC = () => {
  const { f, t } = useShot();
  const cx = 820, cy = 360, orbit = 150, a = -0.9;
  const grow = ramp(f, t(653.9), t(658.9), 70, orbit * 1.5, Easing.inOut(Easing.cubic));
  const swell = f < t(667.0) ? grow : ramp(f, t(667.0), t(668.6), orbit * 1.5, 70, Easing.inOut(Easing.cubic));
  const still = f >= t(668.6);
  return (
    <CardShot mode="space" pose="shocked" pill={P10} pillColor={ACCENT.red} push={0.02}
      head={<Txt x={56} y={110} size={60} color={T} w={420}>{still ? (f >= t(672.8) ? "HOW?!" : "HALLA IS STILL THERE!") : "BAEKDU SWELLED…"}</Txt>}>
      <div style={{ position: "absolute", left: cx - swell, top: cy - swell, width: 2 * swell, height: 2 * swell, borderRadius: 999, background: "radial-gradient(circle, #FCA5A5 0%, #E53935 55%, #991B1B 100%)", opacity: 0.85, boxShadow: "0 0 50px 10px rgba(229,57,53,0.45)" }} />
      <div style={{ position: "absolute", left: cx - 70, top: cy - 70, width: 140, height: 140, borderRadius: 999, background: "radial-gradient(circle, #FED7AA, #EA580C)", border: `5px solid ${SPACE.border}`, boxSizing: "border-box" }} />
      <Ring cx={cx} cy={cy} rx={orbit} color="#FFFFFF" w={5} dash="14 10" />
      <div style={{ position: "absolute", left: cx + Math.cos(a) * orbit - 26, top: cy + Math.sin(a) * orbit - 26 }}><Planet size={52} look={LOOKS[10]} id="halla" /></div>
      <Txt x={cx + Math.cos(a) * orbit - 60} y={cy + Math.sin(a) * orbit - 70} size={30} color={T} w={120} align="center">HALLA</Txt>
      <Appear at={t(658.9)} kind="slam"><Txt x={56} y={250} size={88} color={ACCENT.red} font="mono" w={420}>1.5×</Txt></Appear>
      <Body y={360} text={still ? "Circling happily, nearly circular orbit." : "Halla's orbit should have been swallowed."} color={M} at={t(660.0)} w={400} size={36} />
      {f >= t(658.9) && !still ? <div style={{ position: "absolute", left: cx - 150, top: cy + 245, width: 300, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: "#FECACA" }}>STAR = 1.5× ORBIT</div> : null}
      <Stamp x={700} y={560} at={t(668.6)} text="STILL THERE!" size={48} color={ACCENT.amber} />
    </CardShot>
  );
};
export const Shot35: React.FC = () => {
  const { f, t } = useShot();
  return (
    <CardShot mode="space" pose="the_catch" pill={P10} pillColor={ACCENT.red} push={0.03} head={<Title text="TWO WILD THEORIES" color={T} />}>
      <Appear at={t(676.78)}><div style={{ position: "absolute", left: 60, top: 190, width: 520, height: 360, border: `4px solid ${SPACE.border}`, borderRadius: 16 }} />
        <Star cx={240 + 60 * ramp(f, t(677.5), t(680.0))} cy={340} r={60} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.4)" />
        <Star cx={400 - 60 * ramp(f, t(677.5), t(680.0))} cy={340} r={45} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.4)" />
        <Txt x={60} y={460} size={34} color={T} w={520} align="center">1 · TWO STARS MERGED</Txt></Appear>
      <Appear at={t(683.0)}><div style={{ position: "absolute", left: 640, top: 190, width: 520, height: 360, border: `4px solid ${SPACE.border}`, borderRadius: 16 }} />
        <div style={{ position: "absolute", left: 830, top: 270, scale: `${ramp(f, t(684.0), t(686.0), 0.2, 1)}` }}><Planet size={140} look={LOOKS[10]} id="reborn" /></div>
        <Txt x={640} y={460} size={34} color={T} w={520} align="center">2 · REBORN FROM THE ASHES</Txt></Appear>
      <Stamp x={380} y={575} at={t(690.94)} text="CHEATED COSMIC DEATH" size={42} rot={-3} />
    </CardShot>
  );
};

// ---------- 36 · Outro: board (all checked) -> end-screen card ----------
export const Shot36: React.FC = () => {
  const { f, t } = useShot();
  const zoom = ramp(f, 0, 12, 0, 1, Easing.bezier(0.65, 0, 0.35, 1));
  const slide = ramp(f, t(708.2), t(708.2) + 18, 0, 1, Easing.inOut(Easing.cubic));
  const checks: Record<number, number> = {};
  for (let c = 1; c <= 10; c++) checks[c] = c < 10 ? 1 : ramp(f, 10, 16, 0, 1, Easing.out(Easing.back(2)));
  const flash = f >= t(694.6) && f < t(702.7) ? [f < t(696.4) ? 1 : f < t(698.2) ? 3 : f < t(700.0) ? 7 : 10] : [];
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <BG_Light_Grid />
      <AbsoluteFill style={{ translate: `${-900 * slide}px 0px`, scale: `${1 - 0.25 * slide}`, opacity: 1 - 0.85 * slide }}>
        <MasterBoard cam={lerpCam(camOnCard(10), CAM_OVERVIEW, zoom)} checks={checks} flash={flash} />
      </AbsoluteFill>
      {slide > 0 ? (
        <div style={{ position: "absolute", left: 1960 - 1060 * slide, top: 200 }}>
          <ExplainerCard mode="space" w={860} h={560} pill={{ text: "WATCH NEXT", color: ACCENT.red }}>
            <Txt x={40} y={100} size={56} color={T} w={780}>EVERY TYPE OF BLACK HOLE EXPLAINED</Txt>
            {[14, 30, 48, 70].map((r, i) => <div key={i} style={{ position: "absolute", left: 90 + i * 190 - r, top: 400 - r, width: 2 * r, height: 2 * r, borderRadius: 999, background: "#05070C", border: `${Math.max(4, r * 0.15)}px solid ${ACCENT.amber}`, boxShadow: "0 0 20px 4px rgba(245,158,11,0.35)" }} />)}
          </ExplainerCard>
        </div>
      ) : null}
      {slide > 0.5 ? <CharacterRig mode="light" pose="explaining" x={420} bottom={1060} height={760} enterAt={t(708.2) + 10} /> : null}
    </AbsoluteFill>
  );
};
export { L, LM };
