import React from "react";
import { Appear, CardShot, Counter, Stamp, Txt, ink, muted, ramp, useShot } from "../components/kit";
import { LikeButton } from "../components/Props";
import { LOOKS, Planet } from "../components/Planet";
import { Body, Cross, Flow, Line, Ring, Star, Tag, Title } from "../components/SpaceBits";
import { ChapterOpen } from "./ChapterOpen";
import { ACCENT, FONT, SPACE } from "../tokens";

const T = SPACE.text, M = muted("space"), L = ink("light"), LM = muted("light");
const P5 = "05 · WASP-12b", P6 = "06 · TOI-849b", P7 = "07 · PSR J1719-1438 b";

// ---------- Chapter 5: WASP-12b ----------
export const Shot17: React.FC = () => {
  const { f, t } = useShot();
  const egg = ramp(f, t(293.0), t(294.6), 1, 1.45);
  return (
    <ChapterOpen chapter={5} pose="thinking">
      <CardShot mode="light" pose="thinking" pill={P5} push={0.03}
        head={<Title text={f >= t(302.78) ? "STRETCHED LIKE TAFFY" : f >= t(293.54) ? "YOU'D SEE AN EGG" : "NOT A SPHERE..."} color={L} />}>
        <Star cx={200} cy={390} r={130} />
        <div style={{ position: "absolute", left: 620, top: 200 }}><Planet size={360} look={{ ...LOOKS[5], egg }} id="s17" /></div>
        {f >= t(302.78) ? <Line x1={600} y1={380} x2={360} y2={380} color={ACCENT.red} w={10} k={ramp(f, t(302.78), t(303.6))} /> : null}
        <Tag x={720} y={560} text="ORBIT ≈ 1 DAY" at={t(295.08)} color={ACCENT.amber} size={34} />
      </CardShot>
    </ChapterOpen>
  );
};
export const Shot18: React.FC = () => {
  const { f, t } = useShot();
  return (
    <CardShot mode="space" pose="the_catch" pill={P5} push={0.04} head={<Title text={f >= t(314.36) ? "FEEDING THE STAR LIKE A STRAW" : "PITCH-BLACK, LEAKING GAS"} color={T} size={54} />}>
      <Star cx={170} cy={400} r={150} />
      <div style={{ position: "absolute", left: 640, top: 230 }}><Planet size={330} look={{ ...LOOKS[5], egg: 1.45 }} id="s18" /></div>
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
        <path d="M640 390 C 560 330, 500 470, 420 400 S 330 360, 300 400" fill="none" stroke={ACCENT.red} strokeWidth="18" strokeLinecap="round" strokeDasharray="900" strokeDashoffset={900 * (1 - ramp(f, t(310.0), t(313.0)))} opacity="0.85" />
      </svg>
      <Flow from={[640, 390]} to={[320, 400]} n={8} color="#FCA5A5" size={14} a={t(313.0)} b={t(319.4)} />
    </CardShot>
  );
};
export const Shot19: React.FC = () => {
  const { f, t } = useShot();
  const shrink = ramp(f, t(328.16), t(333.0));
  const sand = ramp(f, t(333.44), t(345.5));
  return (
    <CardShot mode="light" pose="shocked" pill={P5} snapAt={t(333.6)} snapTo={1.06} push={0.03}
      head={<Title text={f >= t(341.14) ? "CAUGHT MID-MEAL" : f >= t(333.44) ? "TIME LEFT?" : f >= t(328.16) ? "ITS ORBIT IS SHRINKING" : "ARRIVING EARLY..."} color={L} />}>
      <Star cx={380} cy={390} r={70} />
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
        <path d={Array.from({ length: 80 }, (_, i) => { const a = i * 0.16, r = 220 - (220 - 90) * shrink * (i / 79); return `${i ? "L" : "M"}${380 + Math.cos(a) * r} ${390 + Math.sin(a) * r * 0.55}`; }).join(" ")} fill="none" stroke="#94A3B8" strokeWidth="4" strokeDasharray="10 8" />
      </svg>
      <div style={{ position: "absolute", left: 380 + 220 - 130 * shrink - 40, top: 390 - 30 }}><Planet size={80} look={{ ...LOOKS[5], egg: 1.45 }} id="s19" /></div>
      {f >= t(333.44) ? (
        <svg style={{ position: "absolute", left: 780, top: 190 }} width="160" height="260"><path d="M20 10 H140 M20 250 H140 M30 10 C30 100 130 120 130 130 C130 140 30 160 30 250 M130 10 C130 100 30 120 30 130 C30 140 130 160 130 250" fill="none" stroke="#141824" strokeWidth="7" /><path d={`M${45 + 35 * sand} ${30 + 90 * sand} Q80 ${120} ${115 - 35 * sand} ${30 + 90 * sand} Z`} fill={ACCENT.amber} /><path d={`M40 240 Q80 ${240 - 90 * sand} 120 240 Z`} fill={ACCENT.amber} /></svg>
      ) : null}
      {f >= t(333.44) ? <Tag x={690} y={480} text="~3–10 MILLION YEARS" at={t(334.2)} color={ACCENT.red} size={34} /> : null}
      <Body y={560} text="Spiraling inward to its doom." color={LM} at={t(329.98)} w={520} size={34} />
    </CardShot>
  );
};
export const Shot20: React.FC = () => {
  const { f, t } = useShot();
  return (
    <CardShot mode="light" pose="explaining" pill="QUICK QUESTION" push={0.03}
      head={<Title text={f >= t(355.68) ? "#6 ISN'T A GAS GIANT AT ALL..." : "WHICH WORLD WOULD YOU LAST SHORTEST ON?"} color={f >= t(355.68) ? ACCENT.red : L} size={46} />}>
      {[1, 2, 3, 4, 5].map((n, i) => <Appear key={n} at={t(349.0) + i * 4}><div style={{ position: "absolute", left: 70 + i * 220, top: 210 }}><Planet size={170} look={LOOKS[n]} id={`cta${n}`} /></div><Txt x={60 + i * 220} y={395} size={34} color={L} w={190} align="center" font="mono">#{n}</Txt></Appear>)}
      <Appear at={t(346.6)}><div style={{ position: "absolute", left: 120, top: 480 }}><LikeButton size={230} on={f >= t(348.0)} /></div></Appear>
      <Tag x={420} y={500} text="COMMENT YOUR PICK ↓" at={t(350.5)} size={34} />
    </CardShot>
  );
};

// ---------- Chapter 6: TOI-849b ----------
const Cutaway: React.FC<{ x: number; y: number; r: number; gas: number }> = ({ x, y, r, gas }) => (
  <>
    <div style={{ position: "absolute", left: x - r, top: y - r, width: 2 * r, height: 2 * r, borderRadius: 999, background: "#FCD34D", border: "6px solid #141824", opacity: gas, scale: `${0.4 + 0.6 * gas}`, boxSizing: "border-box" }} />
    <div style={{ position: "absolute", left: x - r * 0.38, top: y - r * 0.38, width: r * 0.76, height: r * 0.76, borderRadius: 999, background: "#92400E", border: "6px solid #141824", boxSizing: "border-box" }} />
  </>
);
export const Shot21: React.FC = () => {
  const { f, t } = useShot();
  return (
    <ChapterOpen chapter={6}>
      <CardShot mode="light" pose="explaining" pill={P6} push={0.03}
        head={<Title text={f >= t(377.74) ? "NEPTUNE-SIZED..." : f >= t(373.18) ? "THEN CAME TOI-849b" : "A GAS GIANT HIDES A CORE"} color={L} />}>
        {f < t(373.18) ? (<>
          <Cutaway x={760} y={380} r={200} gas={1} />
          <Line x1={430} y1={380} x2={700} y2={380} color={ACCENT.red} w={8} k={ramp(f, t(364.0), t(365.0))} />
          <Body y={330} text="rocky + metallic core" color={L} at={t(364.0)} w={320} size={34} />
          <Body y={540} text="Normally you can never see it." color={LM} at={t(371.66)} w={520} size={34} />
        </>) : (<>
          <div style={{ position: "absolute", left: 300, top: 190 }}><Planet size={330} look={{ fill: "#60A5FA", bands: ["#3B82F6", "#93C5FD"] }} id="nep" /></div>
          <Txt x={300} y={520} size={34} color={LM} w={330} align="center" font="mono">NEPTUNE</Txt>
          <Appear at={t(374.5)}><div style={{ position: "absolute", left: 720, top: 210 }}><Planet size={300} look={LOOKS[6]} id="toi" /></div><Txt x={720} y={520} size={34} color={L} w={300} align="center" font="mono">TOI-849b</Txt></Appear>
        </>)}
      </CardShot>
    </ChapterOpen>
  );
};
export const Shot22: React.FC = () => {
  const { f, t } = useShot();
  const tip = ramp(f, t(385.5), t(387.5), 0, 14);
  return (
    <CardShot mode="light" pose="shocked" pill={P6} snapAt={t(385.5)} snapTo={1.06} push={0.03}
      head={<Title text={f >= t(393.58) ? "IN THE NEPTUNE DESERT" : "...UNTIL YOU WEIGH IT"} color={L} />}>
      <svg style={{ position: "absolute", left: 120, top: 200, overflow: "visible" }} width="520" height="400">
        <path d="M260 380 L230 380 L260 120 L290 380 Z" fill="#94A3B8" stroke="#141824" strokeWidth="6" />
        <g transform={`rotate(${tip} 260 120)`}><line x1="20" y1="120" x2="500" y2="120" stroke="#141824" strokeWidth="10" strokeLinecap="round" /><circle cx="60" cy="70" r="46" fill="#92400E" stroke="#141824" strokeWidth="6" /><circle cx="460" cy="95" r="22" fill="#3B82F6" stroke="#141824" strokeWidth="5" /></g>
      </svg>
      <Tag x={700} y={200} text="≈ 40× EARTH MASS" at={t(385.5)} color={ACCENT.red} size={36} />
      <Body x={700} y={290} text="Density ≈ solid rock, not gas" color={L} at={t(389.0)} w={480} size={34} />
      <Tag x={700} y={400} text="NEPTUNE DESERT" at={t(395.5)} color={ACCENT.amber} size={34} />
      <Tag x={700} y={480} text="YEAR = 18 HOURS" at={t(399.88)} size={34} />
    </CardShot>
  );
};
export const Shot23: React.FC = () => {
  const { f, t } = useShot();
  const peel = ramp(f, t(406.0), t(410.0));
  const st = f >= t(424.64) ? 2 : f >= t(418.14) ? 1 : 0;
  return (
    <CardShot mode="light" pose="thinking" pill={P6} push={0.04}
      head={<Title text={["A NAKED CORE", "A COSMIC PEACH PIT", "NEXT: A PLANET OF CRYSTAL CARBON"][st]} color={st === 2 ? ACCENT.blue : L} />}>
      {st === 0 ? (<>
        <Cutaway x={820} y={380} r={200} gas={1 - peel} />
        <Body y={220} text="Atmosphere blasted away?" color={L} at={t(407.0)} w={480} size={36} />
        <Body y={320} text="...or it ran out of gas?" color={LM} at={t(413.48)} w={480} size={36} />
      </>) : (<>
        <svg style={{ position: "absolute", left: 360, top: 190 }} width="420" height="400"><circle cx="210" cy="210" r="170" fill="none" stroke="#FDBA74" strokeWidth="8" strokeDasharray="20 16" /><ellipse cx="210" cy="215" rx="80" ry="100" fill="#92400E" stroke="#141824" strokeWidth="7" /><path d="M210 125 Q230 215 210 305 M175 170 Q200 215 180 270 M245 170 Q225 215 240 270" fill="none" stroke="#141824" strokeWidth="4" /><path d="M210 40 Q250 0 290 30 Q250 50 210 40 Z" fill="#22C55E" stroke="#141824" strokeWidth="5" opacity={st === 1 ? 1 : 0.3} /></svg>
        <Body x={800} y={330} text="...with the whole fruit missing" color={LM} at={t(419.0)} w={380} size={34} />
      </>)}
    </CardShot>
  );
};

// ---------- Chapter 7: PSR J1719-1438 b ----------
const Pulsar: React.FC<{ cx: number; cy: number }> = ({ cx, cy }) => {
  const { f } = useShot();
  const a = (f / 30) * 1.2;
  return (
    <>
      {[0, Math.PI].map((o, i) => <div key={i} style={{ position: "absolute", left: cx, top: cy - 22, width: 520, height: 44, transformOrigin: "0 50%", rotate: `${((a + o) * 180) / Math.PI}deg`, background: "linear-gradient(90deg, rgba(37,99,235,0.95), rgba(37,99,235,0))", clipPath: "polygon(0 35%, 100% 0, 100% 100%, 0 65%)" }} />)}
      <div style={{ position: "absolute", left: cx - 34, top: cy - 34, width: 68, height: 68, borderRadius: 99, background: "radial-gradient(circle, #FFFFFF, #93C5FD)", border: `4px solid ${SPACE.border}`, boxShadow: "0 0 40px 12px rgba(147,197,253,0.6)" }} />
    </>
  );
};
export const Shot24: React.FC = () => {
  const { f, t } = useShot();
  const a = (f / 30) * 0.9;
  return (
    <ChapterOpen chapter={7}>
      <CardShot mode="space" pose="explaining" pill={P7} push={0.03}
        head={<Title text={f >= t(452.66) ? "THE ORBIT FITS INSIDE OUR SUN" : f >= t(440.44) ? "IT ORBITS A DEAD STAR" : "TERRIBLE NAME. WILD STORY."} color={T} size={54} />}>
        {f >= t(452.66) ? <div style={{ position: "absolute", left: 760 - 230, top: 400 - 230, width: 460, height: 460, borderRadius: 999, border: `6px dashed ${ACCENT.amber}`, background: "rgba(251,191,36,0.12)" }} /> : null}
        <Pulsar cx={760} cy={400} />
        <Ring cx={760} cy={400} rx={170} color="#E2E8F0" />
        <div style={{ position: "absolute", left: 760 + Math.cos(a) * 170 - 26, top: 400 + Math.sin(a) * 170 - 26 }}><Planet size={52} look={LOOKS[7]} id="pj" /></div>
        <Tag x={58} y={200} text="MILLISECOND PULSAR" at={t(441.0)} size={30} />
        <Tag x={58} y={280} text="ORBIT: 2 H 10 MIN" at={t(447.74)} color={ACCENT.amber} size={34} />
        {f >= t(452.66) ? <Txt x={620} y={150} size={30} color={ACCENT.amber} w={300} align="center" font="mono">OUR SUN</Txt> : null}
      </CardShot>
    </ChapterOpen>
  );
};
export const Shot25: React.FC = () => {
  const { f, t } = useShot();
  const sq = ramp(f, t(459.5), t(462.0));
  return (
    <CardShot mode="space" pose="shocked" pill={P7} snapAt={t(466.92)} snapTo={1.06} push={0.03}
      head={<Title text={f >= t(466.92) ? "DENSER THAN PLATINUM" : "JUPITER'S MASS, SQUEEZED"} color={f >= t(466.92) ? ACCENT.amber : T} size={56} />}>
      <div style={{ position: "absolute", left: 700, top: 200 }}><Planet size={360 - 200 * sq} look={sq < 0.95 ? { fill: "#D6B88A", bands: ["#B08A5A", "#E7D3B0", "#A47C4C"] } : LOOKS[7]} id="s25" style={{ marginLeft: 100 * sq, marginTop: 100 * sq }} /></div>
      {[0, 1, 2, 3].map((i) => <Line key={i} x1={[620, 1140, 880, 880][i]} y1={[380, 380, 170, 600][i]} x2={[720, 1040, 880, 880][i]} y2={[380, 380, 250, 520][i]} color={ACCENT.red} w={8} k={ramp(f, t(459.0), t(460.0))} />)}
      <Tag x={58} y={210} text="≈ 1 JUPITER MASS" at={t(458.5)} size={34} />
      <Tag x={58} y={290} text="< 4.5× EARTH WIDE" at={t(461.5)} color={ACCENT.red} size={34} />
      {f >= t(466.92) ? <Txt x={58} y={400} size={40} color={T} w={520} font="mono">Pt 21.4 g/cm³ &lt; 🪐</Txt> : null}
    </CardShot>
  );
};
export const Shot26: React.FC = () => {
  const { f, t } = useShot();
  const cr = ramp(f, t(480.2), t(483.5));
  const tease = f >= t(492.64);
  return (
    <CardShot mode="space" pose="the_catch" pill={P7} push={0.04}
      head={<Title text={tease ? "NEXT: A PLANET WITH NO SUN" : f >= t(484.0) ? "A PLANET-SIZED DIAMOND" : f >= t(480.2) ? "ITS CARBON CRYSTALLIZED" : "THE CORE OF A STRIPPED STAR"} color={tease ? ACCENT.red : T} size={52} />}>
      <Pulsar cx={250} cy={400} />
      {f < t(480.2) ? <Flow from={[820, 380]} to={[300, 400]} n={10} color="#FDE68A" size={16} a={t(474.0)} b={t(480.2)} /> : null}
      <div style={{ position: "absolute", left: 640, top: 200, opacity: 1 - cr }}><Planet size={360} look={{ fill: "#F59E0B", bands: ["#FBBF24", "#FDE68A"], glow: "#FDE68A" }} id="s26a" /></div>
      <div style={{ position: "absolute", left: 640, top: 200, opacity: cr, scale: `${0.85 + 0.15 * cr}` }}><Planet size={360} look={LOOKS[7]} id="s26b" /></div>
      <Body y={560} text="the glittering skeleton of a dead star" color={M} at={t(489.0)} w={560} size={34} />
    </CardShot>
  );
};
export { FONT, Counter, Cross, Stamp };
