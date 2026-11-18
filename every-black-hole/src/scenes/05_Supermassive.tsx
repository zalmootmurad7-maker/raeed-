import React from "react";
import { Img, staticFile } from "remotion";
import { Appear, CardShot, Counter, Stamp, Txt, WideShot, muted, ramp, useShot } from "../components/kit";
import { Icon_BlackHole_Small, Icon_Galaxy } from "../components/Icons";
import { Orbit } from "../components/Props";
import { stepped, useBoil } from "../components/boil";
import { ACCENT, SPACE } from "../tokens";

const T = SPACE.text, M = muted("space");

export const Shot32: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="space" pose="explaining" pill="05 · SUPERMASSIVE" push={0.06}>
      <div style={{ position: "absolute", left: 640, top: 120, width: 520, height: 520, borderRadius: 999, background: "radial-gradient(circle, rgba(245,158,11,0.45) 0%, rgba(245,158,11,0) 60%)" }} />
      <div style={{ position: "absolute", left: 660, top: 140 }}><Icon_Galaxy size={480} seed={2} ink="#E2E8F0" /></div>
      <Txt x={56} y={118} size={80} color={T} w={560}>SUPER-MASSIVE</Txt>
      <Appear at={at(0.3)} kind="rise"><Txt x={58} y={460} size={42} color={M} font="body" w={560}>At the centre of almost every big galaxy</Txt></Appear>
    </CardShot>
  );
};

export const Shot33: React.FC = () => {
  const { at } = useShot();
  return (
    <WideShot mode="space" pill="05 · SUPERMASSIVE">
      <Txt x={60} y={110} size={64} color={T}>SAGITTARIUS A*</Txt>
      <Counter x={60} y={220} size={110} color={ACCENT.amber} from={0} to={4300000} a={at(0.1)} b={at(0.5)} suffix=" SUNS" />
      <div style={{ position: "absolute", left: 1080, top: 260 }}><Orbit size={480} seed={3} /></div>
      <div style={{ position: "absolute", left: 1320 - 10, top: 500 - 10 }}><Icon_BlackHole_Small size={20} seed={4} glow={false} /></div>
      <Appear at={at(0.55)} kind="rise"><Txt x={1080} y={760} size={36} color={ACCENT.blue} font="mono" w={480} align="center">Mercury's orbit</Txt></Appear>
      <Appear at={at(0.6)} kind="rise"><Txt x={60} y={500} size={50} color={T} w={900}>…all of it fits inside Mercury's orbit</Txt></Appear>
    </WideShot>
  );
};

export const Shot34: React.FC = () => {
  const { f, at } = useShot();
  const b = useBoil(5, 1, 0.3);
  return (
    <WideShot mode="space" pill="05 · SUPERMASSIVE" snapAt={at(0.2)} snapTo={1.15} head={<><Appear at={at(0.3)} kind="rise"><Txt x={60} y={110} size={58} color={T}>2022 · EVENT HORIZON TELESCOPE</Txt></Appear><Appear at={at(0.4)} kind="rise"><Txt x={60} y={720} size={42} color={M} font="body">The first photo of the black hole at the heart of our galaxy</Txt></Appear></>}>
      <div style={{ position: "absolute", left: 890 - 240, top: 430 - 240, width: 480, height: 480, borderRadius: 999, background: "radial-gradient(circle, #05070C 34%, #F59E0B 46%, #B45309 60%, rgba(180,83,9,0) 72%)", filter: "blur(10px)", translate: `${b.x}px ${b.y}px` }} />
      <Appear at={at(0.22)} kind="fade"><div style={{ position: "absolute", left: 0, top: 0, width: 1780, height: 860, background: "#FFFFFF", opacity: 1 - ramp(f, at(0.22), at(0.22) + 6) }} /></Appear>
    </WideShot>
  );
};

export const Shot35: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="space" pose="the_catch" pill="THE CATCH">
      <Appear at={2} kind="rise"><Txt x={56} y={130} size={80} color={T} w={1100}>BIGGER = GENTLER EDGE</Txt></Appear>
      <Appear at={at(0.3)} kind="rise"><Txt x={58} y={300} size={46} color={M} font="body" w={1000}>The bigger the black hole, the weaker the stretching at its event horizon.</Txt></Appear>
    </CardShot>
  );
};

const Astro: React.FC<{ pose: string; x: number; y: number; h: number; sx?: number; sy?: number }> = ({ pose, x, y, h, sx = 1, sy = 1 }) => {
  const b = useBoil(7);
  return <Img src={staticFile(`assets/character/space/${pose}.png`)} style={{ position: "absolute", left: x, top: y, height: h, scale: `${sx} ${sy}`, transformOrigin: "50% 100%", translate: `calc(-50% + ${b.x}px) ${b.y}px` }} />;
};

export const Shot36: React.FC = () => {
  const { f, at } = useShot();
  const st = ramp(stepped(f), at(0.15), at(0.6), 1, 1.8);
  return (
    <WideShot mode="space" pill="05 · SUPERMASSIVE">
      <div style={{ position: "absolute", left: 890, top: 150, width: 4, height: 620, background: M }} />
      <Txt x={60} y={110} size={48} color={T}>SMALL BLACK HOLE</Txt>
      <Txt x={950} y={110} size={48} color={T}>SUPERMASSIVE</Txt>
      <Astro pose="shocked" x={450} y={700 - 240} h={240} sx={1 / Math.sqrt(st)} sy={st} />
      <div style={{ position: "absolute", left: 580, top: 650 }}><Icon_BlackHole_Small size={70} seed={2} /></div>
      <Astro pose="explaining" x={1330} y={330} h={400} />
      <Stamp x={70} y={740} at={at(0.55)} text="SPAGHETTI" size={46} />
      <Appear at={at(0.6)} kind="rise"><Txt x={950} y={760} size={40} color={M} font="body">You might not even notice…</Txt></Appear>
    </WideShot>
  );
};

export const Shot37: React.FC = () => {
  const { f, at } = useShot();
  const x = ramp(stepped(f), at(0.1), at(0.55), 330, 1200);
  const shocked = f >= at(0.65);
  return (
    <WideShot mode="space" pill="05 · SUPERMASSIVE">
      <svg style={{ position: "absolute", left: 860, top: 120 }} width="20" height="700"><line x1="10" y1="0" x2="10" y2="700" stroke={ACCENT.red} strokeWidth="8" strokeDasharray="22 16" /></svg>
      <Txt x={900} y={130} size={40} color={ACCENT.red}>EVENT HORIZON</Txt>
      <Astro pose={shocked ? "shocked" : "explaining"} x={x} y={300} h={460} />
      <Appear at={at(0.66)} kind="slam"><Txt x={1440} y={330} size={64} color={T} w={300}>NO WAY BACK</Txt></Appear>
    </WideShot>
  );
};
