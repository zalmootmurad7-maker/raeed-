import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { BG_Light_Grid, BG_Space_Dark } from "../components/Backgrounds";
import { CardFace } from "../components/CardFaces";
import { CharacterRig } from "../components/CharacterRig";
import { ExplainerCard } from "../components/ExplainerCard";
import { HawkingLeak } from "../components/BlackHoleViz";
import { ACCENT, CARD_SLOT, FONT, SPACE } from "../tokens";

// Shot 01: camera settles on card 01 (same pixels the board zoom landed on); character pops in, points right.
export const Shot01: React.FC = () => {
  const f = useCurrentFrame();
  const settle = interpolate(f, [0, 90], [1, 1.012], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <BG_Light_Grid />
      <div style={{ position: "absolute", left: CARD_SLOT.x, top: CARD_SLOT.y, scale: `${settle}`, transformOrigin: "50% 50%" }}>
        <CardFace chapter={1} seed={11} />
      </div>
      <CharacterRig mode="light" pose="explaining" x={340} bottom={1050} height={820} enterAt={0} seed={21} />
    </AbsoluteFill>
  );
};

// Shot 06: hard cut to Space Mode; red THE CATCH pill slams in.
export const Shot06: React.FC = () => {
  const f = useCurrentFrame();
  const slam = interpolate(f, [0, 6], [1.9, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const shake = 0;
  const textIn = interpolate(f, [6, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ translate: `${shake}px ${-shake * 0.4}px` }}>
      <BG_Space_Dark />
      <div style={{ position: "absolute", left: CARD_SLOT.x, top: CARD_SLOT.y }}>
        <ExplainerCard mode="space">
          <div style={{ position: "absolute", left: 28, top: 26, scale: `${slam}`, transformOrigin: "0% 50%" }}>
            <div style={{ background: ACCENT.red, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 40, padding: "12px 30px", borderRadius: 999, letterSpacing: 1 }}>THE CATCH</div>
          </div>
          <div style={{ position: "absolute", left: 56, top: 130, width: 600, fontFamily: FONT.head, fontWeight: 700, fontSize: 76, lineHeight: 1.0, color: SPACE.text, opacity: textIn }}>
            THEY POP THE INSTANT THEY&apos;RE BORN
          </div>
          <div style={{ position: "absolute", left: 58, bottom: 52, fontFamily: FONT.body, fontWeight: 600, fontSize: 40, color: "#94A3B8", opacity: textIn }}>
            Smaller = evaporates faster
          </div>
          <div style={{ position: "absolute", right: 60, top: 120 }}>
            <HawkingLeak size={190} />
          </div>
        </ExplainerCard>
      </div>
      <CharacterRig mode="space" pose="the_catch" x={340} bottom={1050} height={830} enterAt={0} seed={31} />
    </AbsoluteFill>
  );
};

// ===== remaining chapter 1 shots (provisional timing: beats are fractions of the shot) =====
import { Appear, Arrow, Burst, CardShot, Stamp, Txt, WideShot, ink, muted, ramp, useShot } from "../components/kit";
import { Icon_Atom, Icon_BlackHole_Accretion, Icon_BlackHole_Small } from "../components/Icons";
import { Atmosphere, Earth, LHCRing, Mountain, Stopwatch, SwissMap, Whale } from "../components/Props";
import { LIGHT } from "../tokens";

export const Shot02: React.FC = () => {
  const { f, at } = useShot();
  const k = ramp(f, at(0.35), at(0.35) + 6, 0, 1);
  const size = 620 - 588 * k;
  return (
    <WideShot mode="light" pill="01 · MICRO BLACK HOLE" push={0.02}>
      <div style={{ position: "absolute", left: 890 - size / 2 - 300 * k, top: 430 - size / 2 }}><Icon_BlackHole_Accretion size={size} seed={4} /></div>
      <Appear at={at(0.38)} ink><div style={{ position: "absolute", left: 1000, top: 250 }}><Icon_Atom size={360} seed={8} /></div></Appear>
      <Appear at={at(0.5)} kind="rise"><Txt x={300} y={690} size={64} color={ink("light")} w={1180} align="center">SMALLER THAN A SINGLE ATOM</Txt></Appear>
    </WideShot>
  );
};

export const Shot03: React.FC = () => {
  const { f, at } = useShot();
  const k = ramp(f, at(0.3), at(0.55), 0, 1);
  return (
    <WideShot mode="light" pill="01 · MICRO BLACK HOLE" push={0.03}>
      <Txt x={60} y={110} size={60} color={ink("light")}>MOUNT EVEREST → BLACK HOLE?</Txt>
      <div style={{ position: "absolute", left: 470, top: 230, scale: `${1 - 0.97 * k} ${1 - 0.995 * k}`, transformOrigin: "50% 100%" }}><Mountain size={460} seed={2} /></div>
      <Appear at={at(0.3)}><Arrow x1={1000} y1={420} x2={1180} y2={640} at={at(0.3)} color="#E53935" bend={0.2} /></Appear>
      <Appear at={at(0.55)}><div style={{ position: "absolute", left: 1185, top: 628, width: 26, height: 26, borderRadius: 99, background: "#2563EB", boxShadow: "0 0 30px 12px rgba(37,99,235,0.55)" }} /></Appear>
      <Appear at={at(0.6)} kind="rise"><Txt x={420} y={560} size={58} color={ink("light")} font="mono" w={720} align="right">r = 0.24 pm</Txt></Appear>
      <Appear at={at(0.7)} kind="rise"><Txt x={420} y={650} size={36} color={muted("light")} font="body" w={720} align="right">≈ 4,000× smaller than a nanometer</Txt></Appear>
    </WideShot>
  );
};

export const Shot04: React.FC = () => {
  const { at } = useShot();
  const ticks = Array.from({ length: 13 }, (_, i) => i);
  return (
    <WideShot mode="light" pill="01 · MICRO BLACK HOLE" push={0.06}>
      <Txt x={60} y={110} size={60} color={ink("light")}>THE PLANCK SCALE</Txt>
      <svg style={{ position: "absolute", left: 140, top: 260 }} width={1500} height={140}>
        <line x1="0" y1="70" x2="1500" y2="70" stroke={LIGHT.ink} strokeWidth="6" />
        {ticks.map((i) => <line key={i} x1={i * 125} y1={i % 4 === 0 ? 30 : 48} x2={i * 125} y2="70" stroke={LIGHT.ink} strokeWidth="5" />)}
      </svg>
      {["1 m", "10⁻¹⁰ m  atom", "10⁻¹⁵ m  proton", "10⁻³⁵ m"].map((t, i) => (
        <Txt key={t} x={140 + i * 500 - (i === 3 ? 160 : 0)} y={420} size={34} color={i === 3 ? "#E53935" : muted("light")} font="mono">{t}</Txt>
      ))}
      <Appear at={at(0.45)} ink><div style={{ position: "absolute", left: 480, top: 520 }}><Earth size={170} seed={5} /></div></Appear>
      <Appear at={at(0.45)} kind="rise"><Txt x={420} y={700} size={40} color={ink("light")} w={290} align="center">GRAVITY</Txt></Appear>
      <Appear at={at(0.55)} ink><div style={{ position: "absolute", left: 1110, top: 520 }}><Icon_Atom size={170} seed={6} /></div></Appear>
      <Appear at={at(0.55)} kind="rise"><Txt x={1050} y={700} size={40} color={ink("light")} w={290} align="center">QUANTUM</Txt></Appear>
      <Burst x={890} y={600} at={at(0.68)} r={90} color="#E53935" rays={10} />
      <Appear at={at(0.75)} kind="slam"><Txt x={760} y={560} size={56} color="#E53935" w={260} align="center">CLASH</Txt></Appear>
    </WideShot>
  );
};

export const Shot05: React.FC = () => {
  const { f, at } = useShot();
  const w = ramp(f, at(0.55), at(0.55) + 8, 0, -1220);
  return (
    <CardShot mode="light" pose="thinking" pill="01 · MICRO BLACK HOLE" push={0.02}>
      <div style={{ position: "absolute", left: w, top: 0, width: 2440, height: 686 }}>
        <div style={{ position: "absolute", left: 360, top: 330 }}><Earth size={520} seed={7} /></div>
        <div style={{ position: "absolute", left: 330, top: 290 }}><Atmosphere size={580} seed={8} /></div>
        {[0, 1, 2].map((i) => <Arrow key={i} x1={140 + i * 300} y1={110} x2={460 + i * 150} y2={310} at={at(0.1 + i * 0.08)} color="#F59E0B" w={8} />)}
        <Appear at={at(0.15)} kind="rise"><Txt x={60} y={110} size={48} color={ink("light")}>COSMIC RAYS</Txt></Appear>
        <div style={{ position: "absolute", left: 1220 + 380, top: 140 }}><LHCRing size={420} seed={9} /></div>
        <Txt x={1220 + 60} y={110} size={48} color={ink("light")}>LARGE HADRON COLLIDER</Txt>
        <Txt x={1220 + 60} y={600} size={36} color={muted("light")} font="body">27 km ring under Switzerland & France</Txt>
      </div>
    </CardShot>
  );
};

export const Shot07: React.FC = () => {
  const { f, at, dur } = useShot();
  const s = ramp(f, 0, dur, 300, 80, (t) => t);
  return (
    <WideShot mode="space" pill="THE CATCH" push={0.03}>
      <div style={{ position: "absolute", left: 890 - s * 1.2, top: 440 - s * 1.2 }}><HawkingLeak size={s} count={26} /></div>
      <Appear at={at(0.1)} kind="rise"><Txt x={60} y={110} size={64} color={SPACE.text}>HAWKING RADIATION</Txt></Appear>
      <Appear at={at(0.4)} kind="rise"><Txt x={60} y={720} size={44} color={muted("space")} font="body">Smaller hole → leaks faster → shrinks faster</Txt></Appear>
    </WideShot>
  );
};

export const Shot08: React.FC = () => {
  const { at } = useShot();
  return (
    <WideShot mode="space" pill="THE CATCH" push={0.02}>
      <div style={{ position: "absolute", left: 160, top: 210 }}><Mountain size={300} seed={3} ink="#E2E8F0" /></div>
      <Appear at={at(0.12)} ink><div style={{ position: "absolute", left: 270, top: 560 }}><Icon_BlackHole_Small size={70} seed={4} /></div></Appear>
      <Appear at={at(0.18)} kind="rise"><Txt x={80} y={660} size={40} color={SPACE.text} w={560} align="center">MOUNTAIN MASS</Txt></Appear>
      <Stamp x={150} y={730} at={at(0.25)} text="OUTLIVES THE UNIVERSE" size={34} rot={-4} color="#2563EB" />
      <div style={{ position: "absolute", left: 1060, top: 250 }}><Whale size={380} seed={5} ink="#E2E8F0" /></div>
      <Appear at={at(0.45)} kind="rise"><Txt x={1000} y={520} size={56} color={SPACE.text} w={560} align="center" font="mono">~230 t</Txt></Appear>
      <Burst x={1250} y={420} at={at(0.62)} r={220} />
      <Appear at={at(0.66)} kind="slam"><Txt x={1000} y={660} size={64} color="#F59E0B" w={560} align="center" font="mono">≈ 1 SECOND</Txt></Appear>
    </WideShot>
  );
};

export const Shot09: React.FC = () => {
  const { f, at } = useShot();
  const gone = ramp(f, at(0.8), at(0.8) + 6, 1, 0);
  return (
    <WideShot mode="space" pill="THE CATCH" snapAt={at(0.15)} snapTo={1.08}>
      <div style={{ position: "absolute", left: 160, top: 230, opacity: gone }}><Stopwatch size={300} seed={2} /></div>
      <div style={{ opacity: gone }}>
        <Txt x={560} y={250} size={190} color={SPACE.text} font="mono">10<sup style={{ fontSize: 100 }}>-27</sup> s</Txt>
        <Appear at={at(0.3)} kind="fade"><Txt x={560} y={520} size={30} color={muted("space")} font="mono">0.000000000000000000000000001 s</Txt></Appear>
      </div>
      <Appear at={at(0.45)} kind="rise"><Txt x={560} y={600} size={44} color={SPACE.text} font="body">Tiny LHC-size black holes would vanish this fast</Txt></Appear>
      <Burst x={1100} y={350} at={at(0.8)} r={160} color="#E2E8F0" />
    </WideShot>
  );
};

export const Shot10: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="light" pose="explaining" pill="01 · MICRO BLACK HOLE">
      <div style={{ position: "absolute", left: 120, top: 150 }}><SwissMap size={700} seed={6} /></div>
      <div style={{ position: "absolute", left: 360, top: 230 }}><LHCRing size={170} seed={7} /></div>
      <Appear at={at(0.3)}><Txt x={840} y={250} size={64} color={ink("light")} w={340}>CERN IS SAFE</Txt></Appear>
      <Appear at={at(0.4)} ink><svg style={{ position: "absolute", left: 900, top: 400 }} width="200" height="160"><path d="M20 80 L80 140 L180 20" fill="none" stroke="#22C55E" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round" /></svg></Appear>
      <Appear at={at(0.5)} kind="rise"><Txt x={60} y={600} size={38} color={muted("light")} font="body">Switzerland isn't going anywhere</Txt></Appear>
    </CardShot>
  );
};
