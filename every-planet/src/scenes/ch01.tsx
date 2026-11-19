import React from "react";
import { AbsoluteFill, Easing } from "remotion";
import { Appear, Burst, CardShot, Counter, Stamp, Txt, ink, muted, ramp, useShot } from "../components/kit";
import { LOOKS, Planet } from "../components/Planet";
import { Earth, Sun } from "../components/Props";
import { Body, Cross, Flow, Line, Ring, Star, Tag, Title } from "../components/SpaceBits";
import { CAM_OVERVIEW, camOnCard, lerpCam, MasterBoard } from "../components/MasterBoard";
import { ChapterOpen } from "./ChapterOpen";
import { ACCENT, FONT, SPACE } from "../tokens";

const L = ink("light"), LM = muted("light"), T = SPACE.text, M = muted("space");
const P1 = "01 · HD 189733 b";

// 01 — hook: quiet Earth, then "SPACE DOES NOT".
export const Shot01: React.FC = () => {
  const { f, t } = useShot();
  const space = f >= t(10.86);
  return (
    <CardShot mode="space" pose={space ? "shocked" : "explaining"} poseSwap={{ at: t(10.86), pose: "shocked" }} push={0.05}
      head={space ? <Appear at={t(10.86)} kind="slam"><Txt x={56} y={250} size={120} color={ACCENT.red} w={1100} align="center">SPACE DOES NOT.</Txt></Appear>
        : <Title text={f >= t(9.4) ? "EARTH MAKES SENSE." : "A QUIET ROCK"} color={T} size={64} />}>
      {!space ? (<>
        <div style={{ position: "absolute", left: 720, top: 170 }}><Earth size={400} /></div>
        {f >= t(3.0) ? [0, 1, 2, 3, 4, 5].map((i) => <Line key={i} x1={740 + i * 60} y1={170} x2={740 + i * 60} y2={170 + 90 * ramp(f, t(3.0) + i * 2, t(3.0) + i * 2 + 12)} color="#93C5FD" w={6} head={false} />) : null}
        <Appear at={t(5.2)}><div style={{ position: "absolute", left: 300, top: 120 }}><Sun size={170} /></div></Appear>
        <Body y={470} text="Rain falls down. The Sun sits still." color={M} at={t(3.0)} />
      </>) : (<>
        {[2, 5, 4, 10].map((n, i) => <div key={n} style={{ position: "absolute", left: 120 + i * 260, top: 400 }}><Planet size={190} look={LOOKS[n]} id={`h${n}`} /></div>)}
      </>)}
    </CardShot>
  );
};

// 02 — 5x2 MasterBoard: flash the worlds as the narration names them, #10 pulses red; zoom to card 01 at the end.
export const Shot02: React.FC = () => {
  const { f, t, dur } = useShot();
  const zoom = ramp(f, dur - 12, dur, 0, 1, Easing.bezier(0.65, 0, 0.35, 1));
  const flash = f >= t(30.06) ? [] : f >= t(24.94) ? [10] : f >= t(22.66) ? [2] : f >= t(18.54) ? [1] : [];
  const pulse = 0.5 + 0.5 * Math.sin((f / 30) * Math.PI * 1.6);
  return <AbsoluteFill style={{ overflow: "hidden" }}><MasterBoard cam={lerpCam(CAM_OVERVIEW, camOnCard(1), zoom)} mystery10 pulse10={(f >= t(24.94) ? 0.7 : 0.35) + 0.3 * pulse} flash={flash} /></AbsoluteFill>;
};

// 03 — card 01, then the weird -> impossible scale.
export const Shot03: React.FC = () => {
  const { f, t } = useShot();
  return (
    <ChapterOpen chapter={1}>
      <CardShot mode="light" pose="explaining" pill="EVERY PLANET THAT SHOULDN'T EXIST" pillColor={ACCENT.red}>
        <Title text="FROM WEIRD..." color={L} />
        <div style={{ position: "absolute", left: 60, top: 300, width: 1100, height: 26, borderRadius: 13, background: `linear-gradient(90deg, ${ACCENT.blue}, ${ACCENT.amber}, ${ACCENT.red})`, scale: `${ramp(f, 4, 24)} 1`, transformOrigin: "0 50%" }} />
        {Array.from({ length: 10 }, (_, i) => <Appear key={i} at={6 + i * 3}><div style={{ position: "absolute", left: 60 + i * 115, top: 360 }}><Planet size={90} look={LOOKS[i + 1]} id={`sc${i}`} /></div></Appear>)}
        <Txt x={60} y={490} size={40} color={ACCENT.blue} w={500}>WEIRDLY EXTREME</Txt>
        <Appear at={t(35.0)} kind="slam"><Txt x={560} y={490} size={46} color={ACCENT.red} w={600} align="right">COMPLETELY IMPOSSIBLE</Txt></Appear>
      </CardShot>
    </ChapterOpen>
  );
};

// 04 — a calm blue marble?
export const Shot04: React.FC = () => {
  const { t } = useShot();
  return (
    <CardShot mode="light" pose="explaining" pill={P1} push={0.03}>
      <Txt x={56} y={118} size={76} color={L} w={600}>A CALM BLUE MARBLE?</Txt>
      <Appear at={4}><div style={{ position: "absolute", left: 650, top: 110 }}><Planet size={470} look={LOOKS[1]} id="s04" /></div></Appear>
      <Tag x={58} y={330} text="63 LIGHT-YEARS" at={t(43.5)} />
      <Appear at={t(47.0)} kind="rise"><div style={{ position: "absolute", left: 60, top: 440 }}><Earth size={110} /></div></Appear>
      <Body x={190} y={455} text="like a giant marble of Earth" color={LM} at={t(47.0)} w={420} />
    </CardShot>
  );
};

// 05 — not water: silicate = glass; 1,700 °F; 2.2-day orbit, permanent daylight.
export const Shot05: React.FC = () => {
  const { f, t } = useShot();
  const orbitPhase = f >= t(61.26);
  return (
    <CardShot mode="light" pose={f >= t(61.26) ? "explaining" : "thinking"} poseSwap={{ at: t(61.26), pose: "explaining" }} pill={P1} push={0.03}
      head={<Title text={orbitPhase ? "2.2-DAY YEAR" : f >= t(52.84) ? "SILICATE = GLASS" : "BUT THAT BLUE ISN'T WATER"} color={L} size={58} />}>
      {!orbitPhase ? (<>
        <div style={{ position: "absolute", left: 700, top: 150 }}><Planet size={400} look={LOOKS[1]} id="s05" /></div>
        <div style={{ position: "absolute", left: 120, top: 220, width: 90, height: 120, borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", background: "#60A5FA", border: "5px solid #141824", opacity: f >= t(52.84) ? 0.3 : 1 }} />
        <Cross x={165} y={280} s={140} at={t(51.5)} />
        <Appear at={t(52.84)}><svg style={{ position: "absolute", left: 300, top: 200 }} width="220" height="180"><path d="M20 160 L60 20 L110 90 L150 10 L200 160 Z" fill="#BFDBFE" stroke="#141824" strokeWidth="6" strokeLinejoin="round" /><path d="M60 20 L80 100 M150 10 L130 110" stroke="#FFF" strokeWidth="5" /></svg></Appear>
        {f >= t(56.5) ? <Counter x={60} y={460} size={88} color={ACCENT.amber} from={0} to={1700} a={t(56.5)} b={t(59.5)} suffix=" °F" w={620} /> : null}
      </>) : (<>
        <Star cx={260} cy={360} r={120} />
        <Ring cx={260} cy={360} rx={420} ry={150} color="#94A3B8" />
        <div style={{ position: "absolute", left: 680 - 70, top: 360 - 70, width: 140, height: 140, borderRadius: 999, background: "linear-gradient(90deg, #FDE68A 50%, #1E3A8A 50%)", border: "5px solid #141824" }} />
        <Tag x={560} y={470} text="PERMANENT DAYLIGHT →" at={t(64.0)} color={ACCENT.amber} size={32} />
        <Tag x={60} y={540} text="ORBIT: 2.2 DAYS" at={t(61.6)} size={34} />
      </>)}
    </CardShot>
  );
};

// 06 — 5,400 mph winds, ~7x the speed of sound.
export const Shot06: React.FC = () => {
  const { f, t } = useShot();
  return (
    <CardShot mode="light" pose="shocked" pill={P1} snapAt={t(74.0)} snapTo={1.08} push={0.02}
      head={<Title text="SUPERSONIC WINDS" color={L} />}>
      <div style={{ position: "absolute", left: 620, top: 150 }}><Planet size={430} look={LOOKS[1]} id="s06" /></div>
      {[0, 1, 2, 3].map((i) => <Line key={i} x1={540} y1={240 + i * 80} x2={1160} y2={240 + i * 80} color={ACCENT.red} w={12} k={ramp(f, t(68.6) + i * 4, t(68.6) + i * 4 + 14)} />)}
      {f >= t(69.5) ? <Counter x={56} y={260} size={96} color={ACCENT.red} from={0} to={5400} a={t(69.5)} b={t(72.5)} w={520} /> : null}
      <Appear at={t(72.5)} kind="rise"><Txt x={56} y={370} size={48} color={L} w={520} font="mono">MPH</Txt></Appear>
      <Stamp x={56} y={470} at={t(74.0)} text="≈ 7× SPEED OF SOUND" size={42} rot={-4} />
    </CardShot>
  );
};

// 07 — molten glass blasts sideways; umbrella shatters; teaser to the dark planet.
const Umbrella: React.FC<{ x: number; y: number; broken: number }> = ({ x, y, broken }) => (
  <svg style={{ position: "absolute", left: x, top: y, overflow: "visible" }} width="200" height="200">
    <g style={{ opacity: 1 - broken }}><path d="M10 90 Q100 -10 190 90 Z" fill={ACCENT.red} stroke="#141824" strokeWidth="6" /><path d="M100 90 L100 170 Q100 190 80 185" fill="none" stroke="#141824" strokeWidth="7" strokeLinecap="round" /></g>
    {broken > 0 ? Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${100 + i * 12 * broken * 3} ${60 + ((i * 29) % 70) - 30} l18 -10 l-6 22 z`} fill="#BFDBFE" stroke="#141824" strokeWidth="3" />) : null}
  </svg>
);
export const Shot07: React.FC = () => {
  const { f, t } = useShot();
  const dark = ramp(f, t(98.6), t(100.2));
  return (
    <CardShot mode="light" pose="shocked" pill={P1} push={0.03}
      head={<Title text={f >= t(94.52) ? "AT LEAST YOU CAN SEE IT..." : f >= t(84.06) ? "GLASS RAIN — SIDEWAYS" : "VAPOR → MOLTEN GLASS"} color={L} size={58} />}>
      <Flow from={[100, 260]} to={[1150, 320]} n={18} color="#93C5FD" size={18} a={t(76.72)} b={t(100)} />
      {f >= t(82.06) && f < t(84.06) ? (<><Line x1={600} y1={200} x2={600} y2={460} color="#94A3B8" w={10} /><Cross x={600} y={330} s={160} at={t(82.3)} /></>) : null}
      {f >= t(84.06) ? <Line x1={80} y1={480} x2={1150} y2={480} color={ACCENT.red} w={14} k={ramp(f, t(84.06), t(84.06) + 10)} /> : null}
      <Umbrella x={820} y={330} broken={ramp(f, t(86.0), t(87.0))} />
      <Stamp x={60} y={540} at={t(88.78)} text="SHREDDED IN 1 SECOND" size={40} />
      <div style={{ position: "absolute", inset: 0, background: "#0E131F", opacity: dark * 0.9 }} />
    </CardShot>
  );
};
export { Burst, FONT };
