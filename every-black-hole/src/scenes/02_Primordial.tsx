import React from "react";
import { useCurrentFrame } from "remotion";
import { Appear, Arrow, Burst, CardShot, Stamp, Txt, WideShot, muted, ramp, useShot } from "../components/kit";
import { Icon_BlackHole_Small, Icon_CrossedStar } from "../components/Icons";
import { BigBang, Magnifier, Pie, Telescope } from "../components/Props";
import { stepped } from "../components/boil";
import { ACCENT, SPACE } from "../tokens";

const T = SPACE.text, M = muted("space");

export const Shot11: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="space" pose="thinking" pill="02 · PRIMORDIAL">
      <Txt x={56} y={118} size={88} color={T}>PRIMORDIAL</Txt>
      <Appear at={at(0.15)} ink><div style={{ position: "absolute", left: 760, top: 170 }}><Icon_CrossedStar size={340} seed={3} ink="#E2E8F0" /></div></Appear>
      <Appear at={at(0.3)} kind="rise"><Txt x={58} y={560} size={44} color={M} font="body">No star needed</Txt></Appear>
    </CardShot>
  );
};

const Soup: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => {
  const f = stepped(useCurrentFrame());
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: h }}>
      {Array.from({ length: 46 }, (_, i) => {
        const r = (n: number) => { const v = Math.sin((i + 1) * 78.233 * n) * 43758.5; return v - Math.floor(v); };
        const jx = Math.sin(f * 0.21 + i) * 10, jy = Math.cos(f * 0.17 + i * 2) * 10;
        const s = 16 + r(3) * 46;
        return <div key={i} style={{ position: "absolute", left: r(1) * w + jx, top: r(2) * h + jy, width: s, height: s, borderRadius: 99, background: i % 3 ? ACCENT.amber : ACCENT.red, opacity: 0.55 + r(4) * 0.4 }} />;
      })}
    </div>
  );
};

export const Shot12: React.FC = () => {
  const { at } = useShot();
  return (
    <WideShot mode="space" pill="02 · PRIMORDIAL" push={0.06}>
      <Soup x={120} y={140} w={1540} h={420} />
      <svg style={{ position: "absolute", left: 120, top: 640 }} width="1540" height="80"><line x1="0" y1="40" x2="1540" y2="40" stroke={SPACE.border} strokeWidth="6" strokeLinecap="round" /><circle cx="18" cy="40" r="14" fill={ACCENT.red} /></svg>
      <div style={{ position: "absolute", left: 60, top: 600 }}><BigBang size={110} seed={2} /></div>
      <Appear at={at(0.2)} kind="rise"><Txt x={180} y={720} size={38} color={ACCENT.amber} font="mono">↑ first fraction of a second</Txt></Appear>
      <Txt x={1300} y={720} size={34} color={M} font="mono" w={360} align="right">today →</Txt>
    </WideShot>
  );
};

export const Shot13: React.FC = () => {
  const { f, at } = useShot();
  const pk = [{ x: 330, s: 0.5, l: "ASTEROID MASS" }, { x: 890, s: 0.75, l: "≈ 1 SUN" }, { x: 1450, s: 1, l: "THOUSANDS OF SUNS" }];
  return (
    <WideShot mode="space" pill="02 · PRIMORDIAL">
      <Txt x={60} y={110} size={60} color={T}>DENSE POCKETS COLLAPSE</Txt>
      {pk.map((p, i) => {
        const k = ramp(f, at(0.2 + i * 0.12), at(0.2 + i * 0.12) + 9, 0, 1);
        const R = 170 * p.s;
        return (
          <div key={i}>
            <div style={{ position: "absolute", left: p.x - R * (1 - 0.7 * k), top: 430 - R * (1 - 0.7 * k), width: 2 * R * (1 - 0.7 * k), height: 2 * R * (1 - 0.7 * k), borderRadius: 999, background: k < 0.95 ? "rgba(245,158,11,0.55)" : "transparent", border: `4px dashed ${ACCENT.amber}`, opacity: 1 - k * 0.9 }} />
            {k > 0.9 ? <div style={{ position: "absolute", left: p.x - 80 * p.s, top: 430 - 80 * p.s }}><Icon_BlackHole_Small size={160 * p.s} seed={i} /></div> : null}
            <Appear at={at(0.3 + i * 0.12)} kind="rise"><Txt x={p.x - 260} y={660} size={36} color={T} w={520} align="center" font="mono">{p.l}</Txt></Appear>
          </div>
        );
      })}
    </WideShot>
  );
};

export const Shot14: React.FC = () => {
  const { f, at } = useShot();
  return (
    <WideShot mode="space" pill="02 · PRIMORDIAL" snapAt={at(0.55)} snapTo={1.1}>
      <div style={{ position: "absolute", left: 160, top: 160 }}><Pie size={560} slice={ramp(f, at(0.2), at(0.4))} seed={4} ink="#E2E8F0" /></div>
      <Appear at={at(0.5)} kind="slam"><Txt x={900} y={250} size={110} color={ACCENT.amber}>DARK MATTER?</Txt></Appear>
      <Appear at={at(0.65)} kind="rise"><Txt x={900} y={430} size={46} color={T} font="body" w={760}>Could part of the universe's missing mass be primordial black holes?</Txt></Appear>
    </WideShot>
  );
};

export const Shot15: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="space" pose="the_catch" pill="THE CATCH">
      <Appear at={2} kind="rise"><Txt x={56} y={130} size={84} color={T} w={1100}>NEVER CONFIRMED</Txt></Appear>
      <Appear at={at(0.3)} kind="rise"><Txt x={58} y={300} size={46} color={M} font="body" w={1000}>Not a single one has been found yet.</Txt></Appear>
      <Stamp x={600} y={470} at={at(0.5)} text="0 FOUND" size={70} />
    </CardShot>
  );
};

export const Shot16: React.FC = () => {
  const { f, at, dur } = useShot();
  const lx = ramp(f, 0, dur, 300, 1500, (t) => t);
  const near = Math.max(0, 1 - Math.abs(lx - 1150) / 220);
  return (
    <WideShot mode="space" pill="02 · PRIMORDIAL">
      <Txt x={60} y={110} size={60} color={T}>LOOKING FOR LENSING</Txt>
      <div style={{ position: "absolute", left: 80, top: 430 }}><Telescope size={300} seed={5} ink="#E2E8F0" /></div>
      <div style={{ position: "absolute", left: 1150 - 22 - near * 14, top: 420 - 22 - near * 14, width: 44 + near * 28, height: 44 + near * 28, borderRadius: 99, background: "#FFF8E1", boxShadow: `0 0 ${20 + near * 60}px ${6 + near * 20}px rgba(255,248,225,${0.4 + near * 0.5})` }} />
      <div style={{ position: "absolute", left: lx - 90, top: 330, width: 180, height: 180, borderRadius: 999, border: `4px dashed ${M}` }} />
      <Arrow x1={330} y1={470} x2={1100} y2={430} at={at(0.1)} color={M} dash w={4} />
      <Appear at={at(0.3)} kind="rise"><Txt x={60} y={720} size={42} color={M} font="body">An invisible black hole passing in front would briefly brighten a star</Txt></Appear>
    </WideShot>
  );
};

export const Shot17: React.FC = () => {
  const { f, at } = useShot();
  const mx = ramp(f, 0, at(0.6), 200, 900);
  return (
    <WideShot mode="space" pill="02 · PRIMORDIAL">
      <Txt x={60} y={110} size={60} color={T}>THE PERFECT SUSPECT</Txt>
      <div style={{ position: "absolute", left: 1120, top: 220, width: 300, height: 300, borderRadius: 999, border: `6px dashed ${M}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Space Grotesk", fontWeight: 700, fontSize: 180, color: M }}>?</div>
      <div style={{ position: "absolute", left: mx, top: 260 }}><Magnifier size={320} seed={6} ink="#E2E8F0" /></div>
      <Stamp x={1030} y={600} at={at(0.62)} text="0 FINGERPRINTS" size={58} />
      <Burst x={1270} y={370} at={at(0.62)} r={60} color={ACCENT.red} rays={8} />
    </WideShot>
  );
};
