import React from "react";
import { AbsoluteFill } from "remotion";
import { Appear, Arrow, Burst, CardShot, Counter, Stamp, Txt, WideShot, ink, muted, ramp, useShot } from "../components/kit";
import { CardFace } from "../components/CardFaces";
import { CharacterRig } from "../components/CharacterRig";
import { BG_Light_Grid } from "../components/Backgrounds";
import { Icon_BlackHole_Accretion, Icon_BlackHole_Small, Icon_Star_Blue } from "../components/Icons";
import { City, Earth, Sun } from "../components/Props";
import { ACCENT, CARD_SLOT, SPACE } from "../tokens";

const L = ink("light"), LM = muted("light"), T = SPACE.text, M = muted("space");

// Shot 18: settle on card 03 (same pixels as the board zoom), character explains.
export const Shot18: React.FC = () => (
  <AbsoluteFill>
    <BG_Light_Grid />
    <div style={{ position: "absolute", left: CARD_SLOT.x, top: CARD_SLOT.y }}><CardFace chapter={3} seed={33} /></div>
    <CharacterRig mode="light" pose="explaining" x={330} bottom={1050} height={820} seed={13} />
  </AbsoluteFill>
);

export const Shot19: React.FC = () => {
  const { f, at } = useShot();
  const off = f >= at(0.6);
  const pulse = 1 + (off ? 0 : Math.sin(f * 0.25) * 0.03);
  return (
    <WideShot mode="light" pill="03 · STELLAR-MASS">
      <Txt x={60} y={110} size={60} color={L}>A GIANT STAR</Txt>
      <div style={{ position: "absolute", left: 640, top: 180, scale: `${pulse}`, filter: off ? "grayscale(0.6) brightness(0.8)" : undefined }}><Icon_Star_Blue size={500} seed={2} /></div>
      {!off ? [0, 1, 2, 3, 4, 5].map((i) => { const a = (i / 6) * Math.PI * 2; return <Arrow key={i} x1={890 + Math.cos(a) * 200} y1={430 + Math.sin(a) * 200} x2={890 + Math.cos(a) * 330} y2={430 + Math.sin(a) * 330} at={at(0.15)} color={ACCENT.amber} w={9} />; }) : null}
      <Appear at={at(0.15)} kind="rise"><Txt x={1340} y={240} size={56} color={L} font="mono">≥ 20× SUN</Txt></Appear>
      <Appear at={at(0.25)} kind="rise"><Txt x={60} y={700} size={42} color={LM} font="body">Fusion pushes out. Gravity pulls in.</Txt></Appear>
      <Stamp x={1250} y={560} at={at(0.62)} text="FUSION OFF" size={50} />
    </WideShot>
  );
};

export const Shot20: React.FC = () => {
  const { f, at } = useShot();
  const k = ramp(f, at(0.15), at(0.3), 0, 1);
  const boom = f >= at(0.5);
  return (
    <WideShot mode="light" pill="03 · STELLAR-MASS" snapAt={at(0.28)} snapTo={1.15} head={<Appear at={at(0.15)} kind="rise"><Txt x={60} y={110} size={60} color={L}>CORE COLLAPSE: &lt; 1 SECOND</Txt></Appear>}>
      {!boom ? <div style={{ position: "absolute", left: 890 - 250 * (1 - 0.85 * k), top: 430 - 250 * (1 - 0.85 * k) }}><Icon_Star_Blue size={500 * (1 - 0.85 * k)} seed={3} /></div> : null}
      <Burst x={890} y={430} at={at(0.5)} r={360} />
      {boom ? <Appear at={at(0.62)} ink><div style={{ position: "absolute", left: 890 - 110, top: 430 - 110 }}><Icon_BlackHole_Accretion size={220} seed={4} /></div></Appear> : null}
      <Appear at={at(0.52)} kind="slam"><Txt x={1180} y={640} size={84} color={ACCENT.red}>SUPERNOVA</Txt></Appear>
    </WideShot>
  );
};

export const Shot21: React.FC = () => {
  const { at } = useShot();
  return (
    <WideShot mode="light" pill="03 · STELLAR-MASS">
      <div style={{ position: "absolute", left: 140, top: 300 }}><City size={700} seed={5} /></div>
      <Appear at={at(0.15)} ink><div style={{ position: "absolute", left: 1000, top: 290 }}><Icon_BlackHole_Small size={360} seed={6} glow={false} /></div></Appear>
      <Counter x={1000} y={130} size={72} color={L} from={5} to={30} a={at(0.2)} b={at(0.6)} suffix=" SUNS" />
      <Txt x={60} y={110} size={44} color={LM} font="body">5 to a few dozen Suns…</Txt>
      <Appear at={at(0.5)} kind="rise"><Txt x={60} y={720} size={56} color={L}>…squeezed to the size of a city</Txt></Appear>
    </WideShot>
  );
};

export const Shot22: React.FC = () => {
  const { at } = useShot();
  return (
    <WideShot mode="space" pill="03 · STELLAR-MASS" push={0.04}>
      <div style={{ position: "absolute", left: 160, top: 200 }}><Icon_Star_Blue size={440} seed={7} ink="#E2E8F0" /></div>
      <Arrow x1={560} y1={380} x2={1240} y2={440} at={at(0.15)} color={ACCENT.blue} w={14} bend={-0.15} />
      <div style={{ position: "absolute", left: 1220, top: 330 }}><Icon_BlackHole_Accretion size={240} seed={8} ink="#E2E8F0" /></div>
      <Txt x={60} y={110} size={64} color={T}>CYGNUS X-1</Txt>
      <Appear at={at(0.3)} kind="rise"><Txt x={60} y={700} size={42} color={M} font="body">~7,000 light-years away · the first black hole we strongly confirmed</Txt></Appear>
    </WideShot>
  );
};

export const Shot23: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="space" pose="the_catch" pill="THE CATCH">
      <Appear at={2} kind="rise"><Txt x={56} y={130} size={80} color={T} w={1100}>SURPRISINGLY BORING</Txt></Appear>
      <Appear at={at(0.3)} kind="rise"><Txt x={58} y={300} size={46} color={M} font="body" w={1000}>From a safe distance, they don't suck everything in.</Txt></Appear>
      <Stamp x={640} y={480} at={at(0.55)} text="NOT A VACUUM" size={56} />
    </CardShot>
  );
};

const OrbitScene: React.FC<{ swapAt: number; dark?: boolean }> = ({ swapAt }) => {
  const { f } = useShot();
  const a = f * 0.035;
  const R = 230;
  return (
    <>
      <svg style={{ position: "absolute", left: 610 - R, top: 343 - R }} width={2 * R} height={2 * R}><circle cx={R} cy={R} r={R - 4} fill="none" stroke={ACCENT.blue} strokeWidth="5" strokeDasharray="10 12" /></svg>
      {f < swapAt ? <div style={{ position: "absolute", left: 610 - 80, top: 343 - 80 }}><Sun size={160} seed={9} /></div> : <div style={{ position: "absolute", left: 610 - 60, top: 343 - 60 }}><Icon_BlackHole_Small size={120} seed={9} /></div>}
      <div style={{ position: "absolute", left: 610 + Math.cos(a) * R - 34, top: 343 + Math.sin(a) * R - 34 }}><Earth size={68} seed={10} /></div>
    </>
  );
};

export const Shot24: React.FC = () => {
  const { at } = useShot();
  return (
    <WideShot mode="space" pill="03 · STELLAR-MASS">
      <div style={{ position: "absolute", left: 280, top: 87 }}><OrbitScene swapAt={at(0.3)} /></div>
      <Burst x={890} y={430} at={at(0.3)} r={110} color="#E2E8F0" rays={10} />
      <Txt x={60} y={110} size={56} color={T}>SWAP THE SUN</Txt>
      <Appear at={at(0.45)} kind="rise"><Txt x={1180} y={360} size={56} color={T} w={560}>SAME MASS → SAME ORBIT</Txt></Appear>
    </WideShot>
  );
};

export const Shot25: React.FC = () => {
  const { f, at, dur } = useShot();
  return (
    <CardShot mode="space" pose="shocked" pill="03 · STELLAR-MASS" frost={ramp(f, 0, dur, 0, 1, (t) => t)}>
      <div style={{ position: "absolute", left: 0, top: 0 }}><OrbitScene swapAt={-1} /></div>
      <Appear at={at(0.2)} kind="rise"><Txt x={860} y={250} size={60} color={T} w={330}>NO SUNLIGHT</Txt></Appear>
      <Appear at={at(0.45)} kind="rise"><Txt x={860} y={420} size={44} color="#CBD5E1" font="body" w={330}>You'd freeze… but you wouldn't get pulled in.</Txt></Appear>
    </CardShot>
  );
};
