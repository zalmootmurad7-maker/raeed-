import React from "react";
import { AbsoluteFill } from "remotion";
import { Appear, Burst, CardShot, Stamp, Txt, WideShot, ink, muted, ramp, useShot } from "../components/kit";
import { ChapterOpen } from "./ChapterOpen";
import { CAM_OVERVIEW, camOnCard, lerpCam, MasterBoard } from "../components/MasterBoard";
import { BigBang, NoEntry, WhiteHole } from "../components/Props";
import { Icon_BlackHole_Small } from "../components/Icons";
import { stepped } from "../components/boil";
import { ACCENT, SPACE } from "../tokens";
import { Easing } from "remotion";

const L = ink("light"), LM = muted("light"), T = SPACE.text, M = muted("space");

export const Shot48: React.FC = () => {
  const { at } = useShot();
  return (
    <ChapterOpen chapter={8} pose="thinking" hold={0.25}>
      <CardShot mode="light" pose="thinking" pill="08 · MATH-ONLY WING">
        <div style={{ position: "absolute", left: 640, top: 150, width: 420, height: 420, borderRadius: 999, background: "#05070C", border: "6px solid #141824" }} />
        <div style={{ position: "absolute", left: 740, top: 250, width: 220, height: 220, borderRadius: 999, border: `5px dashed ${ACCENT.amber}` }} />
        <Txt x={600} y={160} size={110} color={ACCENT.red}>+</Txt>
        <Txt x={1040} y={440} size={110} color={ACCENT.blue}>−</Txt>
        <Txt x={56} y={118} size={72} color={L} w={540}>CHARGED BLACK HOLE</Txt>
        <Appear at={at(0.45)} kind="rise"><Txt x={58} y={420} size={40} color={LM} font="body" w={520}>Reissner–Nordström: a second, inner horizon</Txt></Appear>
      </CardShot>
    </ChapterOpen>
  );
};

export const Shot49: React.FC = () => {
  const { f, at } = useShot();
  const sf = stepped(f);
  const x = sf < at(0.5) ? ramp(sf, at(0.2), at(0.5), 1500, 1120) : ramp(sf, at(0.5), at(0.7), 1120, 1500, Easing.out(Easing.back(1.5)));
  return (
    <WideShot mode="light" pill="08 · MATH-ONLY WING">
      <Txt x={60} y={110} size={64} color={L}>WHITE HOLE</Txt>
      <div style={{ position: "absolute", left: 500, top: 180 }}><WhiteHole size={520} seed={2} /></div>
      <div style={{ position: "absolute", left: x, top: 340, rotate: `${sf >= at(0.5) ? 20 : 0}deg` }}><NoEntry size={160} seed={3} /></div>
      <Appear at={at(0.3)} kind="rise"><Txt x={60} y={720} size={44} color={LM} font="body">Nothing can get in. Everything only blasts out.</Txt></Appear>
    </WideShot>
  );
};

export const Shot50: React.FC = () => {
  const { f, at } = useShot();
  const k = ramp(f, at(0.25), at(0.6));
  return (
    <CardShot mode="space" pose="the_catch" pill="THE CATCH">
      <Txt x={56} y={130} size={76} color={T} w={1100}>NATURE CANCELS THE CHARGE</Txt>
      <div style={{ position: "absolute", left: 500, top: 300, width: 220, height: 220, borderRadius: 999, background: "#05070C", border: `5px solid ${SPACE.border}` }} />
      {[0, 1, 2, 3, 4, 5].map((i) => { const a = (i / 6) * Math.PI * 2; const r = 320 - 210 * k; return <div key={i} style={{ position: "absolute", left: 610 + Math.cos(a) * r - 24, top: 410 + Math.sin(a) * r - 40, fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 64, color: ACCENT.blue, opacity: 1 - ramp(f, at(0.6), at(0.65)) }}>−</div>; })}
      <Txt x={575} y={355} size={110} color={f < at(0.62) ? ACCENT.red : T} font="mono">{f < at(0.62) ? "+" : "0"}</Txt>
      <Appear at={at(0.65)} kind="rise"><Txt x={820} y={360} size={44} color={M} font="body" w={360}>Neutral in seconds</Txt></Appear>
    </CardShot>
  );
};

export const Shot51: React.FC = () => {
  const { f, at } = useShot();
  const flash = f >= at(0.55);
  return (
    <WideShot mode="space" pill="THE CATCH">
      {!flash ? <div style={{ position: "absolute", left: 560, top: 180 }}><WhiteHole size={420} seed={2} ink="#E2E8F0" /></div> : <Appear at={at(0.58)} ink><div style={{ position: "absolute", left: 640, top: 200 }}><BigBang size={460} seed={4} /></div></Appear>}
      <Stamp x={180} y={600} at={at(0.25)} text="2ND LAW VIOLATION" size={60} />
      <Burst x={890} y={420} at={at(0.55)} r={420} color="#FFF8E1" />
      <Appear at={at(0.62)} kind="rise"><Txt x={1180} y={180} size={60} color={T} w={560}>…unless the Big Bang was one?</Txt></Appear>
    </WideShot>
  );
};

// Shot 52: all cards checked, then pull back across scales.
export const Shot52: React.FC = () => {
  const { f, dur } = useShot();
  const t1 = ramp(f, 0, 12, 0, 1, Easing.bezier(0.65, 0, 0.35, 1));
  const s2 = ramp(f, 30, dur, 1, 0.55, Easing.inOut(Easing.cubic));
  const cam = lerpCam(camOnCard(8), CAM_OVERVIEW, t1);
  const checks: Record<number, number> = {};
  for (let c = 1; c <= 8; c++) checks[c] = c < 8 ? 1 : ramp(f, 10, 16, 0, 1, Easing.out(Easing.back(2)));
  return (
    <AbsoluteFill style={{ background: SPACE.bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: `${s2}`, transformOrigin: "50% 50%" }}><MasterBoard cam={cam} checks={checks} /></AbsoluteFill>
    </AbsoluteFill>
  );
};

// Shot 53: end-screen bridge to the Moon episode.
export const Shot53: React.FC = () => {
  const { f, at } = useShot();
  const k = ramp(f, at(0.2), at(0.45));
  return (
    <CardShot mode="space" pose="explaining" pill="NEXT EXPERIMENT">
      <Txt x={56} y={118} size={64} color={T} w={1100}>WHAT IF THE MOON BECAME A BLACK HOLE?</Txt>
      <div style={{ position: "absolute", left: 160 + 60 * k, top: 290 + 60 * k, width: 240 * (1 - k * 0.97), height: 240 * (1 - k * 0.97), borderRadius: 999, background: "#CBD5E1", border: "5px solid #E2E8F0", opacity: 1 - k * 0.5 }} />
      {k > 0.95 ? <div style={{ position: "absolute", left: 270, top: 400 }}><Icon_BlackHole_Small size={30} seed={2} /></div> : null}
      <Appear at={at(0.45)} kind="rise"><Txt x={60} y={580} size={44} color={ACCENT.amber} font="mono">≈ 0.2 mm across</Txt></Appear>
      <div style={{ position: "absolute", left: 640, top: 260, width: 520, height: 300, border: `4px dashed ${M}`, borderRadius: 16 }} />
      <Appear at={at(0.3)} kind="fade"><Txt x={640} y={385} size={40} color={M} w={520} align="center" font="body">▶ watch next</Txt></Appear>
    </CardShot>
  );
};
