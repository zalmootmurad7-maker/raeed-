import React from "react";
import { Appear, CardShot, Stamp, Txt, WideShot, ink, muted, ramp, useShot } from "../components/kit";
import { ChapterOpen } from "./ChapterOpen";
import { Icon_BlackHole_Small, Icon_Spin } from "../components/Icons";
import { Capsule } from "../components/Props";
import { stepped } from "../components/boil";
import { ACCENT, LIGHT, SPACE } from "../tokens";

const L = ink("light"), LM = muted("light"), T = SPACE.text, M = muted("space");

export const Shot43: React.FC = () => (
  <ChapterOpen chapter={7} hold={0.25}>
    <WideShot mode="light" pill="07 · SCHWARZSCHILD VS KERR">
      <div style={{ position: "absolute", left: 890, top: 140, width: 4, height: 640, background: L }} />
      <Txt x={60} y={110} size={60} color={L}>STATIC</Txt>
      <Txt x={950} y={110} size={60} color={L}>SPINNING</Txt>
      <div style={{ position: "absolute", left: 260, top: 260 }}><Icon_BlackHole_Small size={360} seed={2} glow={false} /></div>
      <div style={{ position: "absolute", left: 1150, top: 240 }}><Icon_Spin size={400} seed={3} /></div>
      <Txt x={60} y={700} size={44} color={LM} font="mono">SCHWARZSCHILD</Txt>
      <Txt x={950} y={700} size={44} color={LM} font="mono">KERR</Txt>
    </WideShot>
  </ChapterOpen>
);

export const Shot44: React.FC = () => {
  const { at } = useShot();
  return (
    <WideShot mode="light" pill="07 · SCHWARZSCHILD VS KERR" push={0.04}>
      <div style={{ position: "absolute", left: 220, top: 170, width: 520, height: 520, borderRadius: 999, background: "#05070C", border: `6px solid ${LIGHT.ink}` }} />
      <Txt x={880} y={200} size={72} color={L}>SCHWARZSCHILD</Txt>
      <Appear at={at(0.2)} kind="rise"><Txt x={880} y={320} size={56} color={L} font="mono">0 SPIN · 0 CHARGE</Txt></Appear>
      <Appear at={at(0.35)} kind="rise"><Txt x={880} y={420} size={42} color={LM} font="body" w={820}>Just mass. A perfect sphere.</Txt></Appear>
      <Stamp x={880} y={560} at={at(0.5)} text="TEXTBOOK MODEL" size={48} color={ACCENT.blue} rot={-3} />
    </WideShot>
  );
};

const Swirl: React.FC<{ cx: number; cy: number; rx: number; ry: number }> = ({ cx, cy, rx, ry }) => {
  const { sf } = useShot();
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
      {Array.from({ length: 7 }, (_, r) => {
        const k = (r + 1) / 7;
        const pts = Array.from({ length: 73 }, (_, i) => { const a = (i / 72) * Math.PI * 2; const tw = (1 - k) * 2.4 + sf * 0.06 * (1.6 - k); const rr = 1 + 0.06 * Math.sin(a * 6 + tw * 3); return `${cx + Math.cos(a + tw) * rx * k * rr},${cy + Math.sin(a + tw) * ry * k * rr}`; }).join(" ");
        return <polyline key={r} points={pts} fill="none" stroke={r === 6 ? ACCENT.amber : "#475569"} strokeWidth={r === 6 ? 6 : 3} strokeDasharray={r === 6 ? "16 10" : undefined} />;
      })}
    </svg>
  );
};

export const Shot45: React.FC = () => {
  const { at } = useShot();
  return (
    <WideShot mode="space" pill="07 · SCHWARZSCHILD VS KERR">
      <Swirl cx={890} cy={450} rx={560} ry={300} />
      <div style={{ position: "absolute", left: 890 - 120, top: 450 - 120, width: 240, height: 240, borderRadius: 999, background: "#05070C", border: `5px solid ${SPACE.border}` }} />
      <Txt x={60} y={110} size={60} color={T}>KERR: IT SPINS</Txt>
      <Appear at={at(0.35)} kind="rise"><Txt x={1180} y={140} size={44} color={ACCENT.amber} font="mono">ERGOSPHERE</Txt></Appear>
      <Appear at={at(0.5)} kind="rise"><Txt x={60} y={740} size={42} color={M} font="body">Space itself gets dragged around, like a blender</Txt></Appear>
    </WideShot>
  );
};

export const Shot46: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="space" pose="the_catch" pill="THE CATCH">
      <Appear at={2} kind="rise"><Txt x={56} y={130} size={84} color={T} w={1100}>A COSMIC BATTERY</Txt></Appear>
      <Appear at={at(0.3)} kind="rise"><Txt x={58} y={300} size={46} color={M} font="body" w={1000}>You can steal energy from a spinning black hole.</Txt></Appear>
      <Appear at={at(0.45)} ink><div style={{ position: "absolute", left: 820, top: 400 }}><Icon_Spin size={240} seed={4} ink="#E2E8F0" /></div></Appear>
    </CardShot>
  );
};

export const Shot47: React.FC = () => {
  const { f, at } = useShot();
  const sf = stepped(f);
  const fall = ramp(sf, at(0.1), at(0.4));
  const split = sf >= at(0.4);
  const out = ramp(sf, at(0.42), at(0.8));
  return (
    <WideShot mode="space" pill="07 · SCHWARZSCHILD VS KERR">
      <Swirl cx={600} cy={470} rx={420} ry={240} />
      <div style={{ position: "absolute", left: 600 - 100, top: 470 - 100, width: 200, height: 200, borderRadius: 999, background: "#05070C", border: `5px solid ${SPACE.border}` }} />
      <Txt x={60} y={110} size={60} color={T}>PENROSE PROCESS</Txt>
      {!split ? <div style={{ position: "absolute", left: 1500 - 650 * fall, top: 200 + 170 * fall, rotate: `${-30 * fall}deg` }}><Capsule size={220} seed={2} ink="#E2E8F0" /></div>
        : <>
          <div style={{ position: "absolute", left: 850 - 200 * out, top: 370 + 60 * out, opacity: 1 - out, scale: `${1 - 0.6 * out}` }}><Capsule size={110} seed={3} ink="#E2E8F0" /></div>
          <div style={{ position: "absolute", left: 900 + 760 * out, top: 380 - 260 * out, filter: "drop-shadow(0 0 18px #2563EB)" }}><Capsule size={130} seed={4} ink={ACCENT.blue} /></div>
        </>}
      <Appear at={at(0.5)} kind="rise"><Txt x={1060} y={640} size={44} color={ACCENT.blue} w={680}>OUT FASTER THAN IT WENT IN</Txt></Appear>
      <Stamp x={1060} y={730} at={at(0.75)} text="+ ENERGY" size={44} color={ACCENT.amber} rot={-3} />
    </WideShot>
  );
};
