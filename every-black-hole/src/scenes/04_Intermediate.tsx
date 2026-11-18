import React from "react";
import { Appear, Burst, CardShot, Counter, Stamp, Txt, WideShot, ink, muted, ramp, useShot } from "../components/kit";
import { ChapterOpen } from "./ChapterOpen";
import { Icon_BlackHole_Small } from "../components/Icons";
import { Binoculars, Car, Detector, LikeButton, Ship, Van, Waveform } from "../components/Props";
import { Icon_CrossedStar, Icon_BlackHole_Accretion } from "../components/Icons";
import { ACCENT, SPACE } from "../tokens";

const L = ink("light"), LM = muted("light"), T = SPACE.text, M = muted("space");

export const Shot26: React.FC = () => {
  const { f, at } = useShot();
  const x = ramp(f, at(0.62), at(0.62) + 8, 0, -1220);
  return (
    <ChapterOpen chapter={4} pose="thinking" hold={0.25}>
      <CardShot mode="light" pose="thinking" pill="04 · INTERMEDIATE">
        <div style={{ position: "absolute", left: x, top: 0, width: 2440, height: 686 }}>
          <div style={{ position: "absolute", left: 380, top: 220 }}><Car size={440} seed={2} /></div>
          <Txt x={60} y={110} size={64} color={L}>STELLAR = A CAR</Txt>
          <div style={{ position: "absolute", left: 1220 + 200, top: 180 }}><Ship size={820} seed={3} /></div>
          <Txt x={1220 + 60} y={110} size={64} color={L}>SUPERMASSIVE = A CARGO SHIP</Txt>
        </div>
      </CardShot>
    </ChapterOpen>
  );
};

export const Shot27: React.FC = () => {
  const { at } = useShot();
  return (
    <WideShot mode="light" pill="04 · INTERMEDIATE">
      <div style={{ position: "absolute", left: 100, top: 360 }}><Car size={300} seed={4} /></div>
      <Appear at={at(0.2)} ink><div style={{ position: "absolute", left: 620, top: 330 }}><Van size={420} dashed seed={5} /></div></Appear>
      <div style={{ position: "absolute", left: 1150, top: 300 }}><Ship size={560} seed={6} /></div>
      <Appear at={at(0.25)} kind="rise"><Txt x={600} y={600} size={44} color={ACCENT.red} w={460} align="center">THE MISSING VAN</Txt></Appear>
      <Appear at={at(0.4)} kind="slam"><Txt x={60} y={110} size={84} color={L} font="mono">100 – 100,000 SUNS</Txt></Appear>
    </WideShot>
  );
};

export const Shot28: React.FC = () => {
  const { f, at } = useShot();
  const steps = [0.15, 0.4, 0.65];
  const level = steps.filter((s) => f >= at(s) + 8).length;
  return (
    <WideShot mode="light" pill="04 · INTERMEDIATE">
      <Txt x={60} y={110} size={60} color={L}>GROWING BY MERGING</Txt>
      <svg style={{ position: "absolute", left: 1500, top: 180 }} width="120" height="560"><rect x="20" y="10" width="80" height="540" rx="14" fill="none" stroke={L} strokeWidth="6" /><rect x="26" y={550 - 6 - level * 170} width="68" height={level * 170} rx="10" fill={ACCENT.blue} /></svg>
      {steps.map((s, i) => {
        const k = ramp(f, at(s), at(s) + 8, 0, 1);
        const cx = 320 + i * 400, cy = 450, sz = 70 + i * 40;
        return (
          <div key={i}>
            {k < 1 ? <><div style={{ position: "absolute", left: cx - 140 + 100 * k - sz / 2, top: cy - sz / 2 }}><Icon_BlackHole_Small size={sz} seed={i} glow={false} /></div><div style={{ position: "absolute", left: cx + 140 - 100 * k - sz / 2, top: cy - sz / 2 }}><Icon_BlackHole_Small size={sz} seed={i + 5} glow={false} /></div></> : <div style={{ position: "absolute", left: cx - sz * 0.65, top: cy - sz * 0.65 }}><Icon_BlackHole_Small size={sz * 1.3} seed={i + 9} /></div>}
            <Burst x={cx} y={cy} at={at(s) + 8} r={60} color={ACCENT.blue} rays={8} />
          </div>
        );
      })}
      <Appear at={at(0.75)} kind="rise"><Txt x={60} y={700} size={42} color={LM} font="body">Small black holes merge and feed… up toward the giants</Txt></Appear>
    </WideShot>
  );
};

export const Shot29: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="space" pose="the_catch" pill="THE CATCH">
      <Appear at={2} kind="rise"><Txt x={56} y={130} size={80} color={T} w={760}>HARD TO CATCH IN THE ACT</Txt></Appear>
      <Appear at={at(0.2)} ink><div style={{ position: "absolute", left: 820, top: 150 }}><Binoculars size={330} seed={2} ink="#E2E8F0" /></div></Appear>
      <Appear at={at(0.4)} kind="rise"><Txt x={58} y={480} size={44} color={M} font="body" w={1080}>Only a handful of strong candidates so far.</Txt></Appear>
    </CardShot>
  );
};

export const Shot30: React.FC = () => {
  const { f, at } = useShot();
  return (
    <WideShot mode="space" pill="04 · INTERMEDIATE" push={0.06}>
      <Txt x={60} y={110} size={56} color={T}>LIGO · GRAVITATIONAL WAVES</Txt>
      <div style={{ position: "absolute", left: 80, top: 260 }}><Waveform size={1100} phase={f * 0.35} seed={3} /></div>
      <div style={{ position: "absolute", left: 1280, top: 230 }}><Detector size={300} seed={4} ink="#E2E8F0" /></div>
      <Counter x={1180} y={600} size={96} color={ACCENT.amber} from={0} to={142} a={at(0.35)} b={at(0.7)} suffix=" M☉" w={560} align="right" />
      <Appear at={at(0.4)} kind="rise"><Txt x={60} y={640} size={40} color={M} font="body">One merger left a black hole of ~142 solar masses</Txt></Appear>
    </WideShot>
  );
};

export const Shot31: React.FC = () => {
  const { f, at } = useShot();
  return (
    <CardShot mode="light" pose="explaining" pill="QUICK QUESTION">
      <Txt x={56} y={110} size={56} color={L} w={1100}>WHICH WOULD YOU ORBIT FOR AN HOUR?</Txt>
      <div style={{ position: "absolute", left: 60, top: 250, width: 520, height: 300, border: `4px solid ${L}`, borderRadius: 16 }} />
      <div style={{ position: "absolute", left: 640, top: 250, width: 520, height: 300, border: `4px solid ${L}`, borderRadius: 16 }} />
      <div style={{ position: "absolute", left: 120, top: 300 }}><Icon_CrossedStar size={150} seed={2} /></div>
      <Txt x={300} y={320} size={40} color={L} w={260}>PRIMORDIAL</Txt>
      <Txt x={300} y={380} size={30} color={LM} font="body" w={260}>asteroid-sized</Txt>
      <div style={{ position: "absolute", left: 690, top: 290 }}><Icon_BlackHole_Accretion size={180} seed={3} /></div>
      <Txt x={890} y={320} size={40} color={L} w={260}>STELLAR</Txt>
      <Txt x={890} y={380} size={30} color={LM} font="body" w={260}>city-sized</Txt>
      <Appear at={at(0.55)}><div style={{ position: "absolute", left: 640, top: 590 }}><LikeButton size={190} on={f >= at(0.7)} seed={5} /></div></Appear>
      <Burst x={735} y={632} at={at(0.7)} r={80} color={ACCENT.red} rays={8} />
      <Stamp x={70} y={598} at={at(0.4)} text="COMMENT ↓" size={34} rot={-3} color={ACCENT.blue} />
    </CardShot>
  );
};
