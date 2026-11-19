import React from "react";
import { Appear, CardShot, Counter, Stamp, Txt, muted, ramp, useShot } from "../components/kit";
import { LOOKS, Planet } from "../components/Planet";
import { Body, Cross, Flow, Line, Ring, Star, Tag, Title } from "../components/SpaceBits";
import { ChapterOpen } from "./ChapterOpen";
import { ACCENT, FONT, SPACE } from "../tokens";

const T = SPACE.text, M = muted("space"), L = "#141824", LM = muted("light");
const P2 = "02 · TrES-2b", P3 = "03 · WASP-76b", P4 = "04 · KELT-9b";

// ---------- Chapter 2: TrES-2b ----------
export const Shot08: React.FC = () => {
  const { f, t } = useShot();
  const beam = ramp(f, t(103.5), t(104.5));
  return (
    <ChapterOpen chapter={2} pose="thinking">
      <CardShot mode="space" pose="thinking" pill={P2} push={0.04} head={<Title text={f >= t(113.62) ? "THE DARKEST KNOWN PLANET" : "A JUPITER-SIZED... NOTHING?"} color={T} size={56} />}>
        <div style={{ position: "absolute", left: 640, top: 160 }}><Planet size={440} look={{ ...LOOKS[2], rim: f >= t(113.62) ? ACCENT.red : undefined }} id="s08" /></div>
        {f >= t(103.5) ? <div style={{ position: "absolute", left: 120, top: 330, width: 640 * beam, height: 70, background: `linear-gradient(90deg, rgba(37,99,235,0.85), rgba(37,99,235,${0.6 * (1 - ramp(f, t(105.5), t(107)))}))`, clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 60%)" }} /> : null}
        <Tag x={58} y={190} text="750 LIGHT-YEARS · DRACO" at={6} size={34} />
        <Appear at={t(108.66)}><svg style={{ position: "absolute", left: 70 + 400 * ramp(f, t(108.66), t(112)), top: 470, overflow: "visible" }} width="140" height="70"><path d="M10 35 L90 10 L130 35 L90 60 Z" fill="#E2E8F0" stroke="#141824" strokeWidth="5" /><path d="M10 35 L-20 20 M10 35 L-20 50" stroke={ACCENT.amber} strokeWidth="6" /></svg></Appear>
        <Body y={570} text="You might crash before you ever saw it." color={M} at={t(109.5)} w={560} size={34} />
      </CardShot>
    </ChapterOpen>
  );
};
const Bar: React.FC<{ y: number; label: string; pct: number; text: string; color: string; at: number }> = ({ y, label, pct, text, color, at }) => {
  const { f } = useShot();
  return (
    <Appear at={at} kind="fade">
      <Txt x={56} y={y} size={40} color={T} w={300}>{label}</Txt>
      <div style={{ position: "absolute", left: 340, top: y + 4, width: 640, height: 44, borderRadius: 10, border: `3px solid ${SPACE.border}`, boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 343, top: y + 7, width: Math.max(6, 634 * pct * ramp(f, at, at + 18)), height: 38, borderRadius: 8, background: color }} />
      <Txt x={1000} y={y} size={40} color={color} font="mono" w={180}>{text}</Txt>
    </Appear>
  );
};
export const Shot09: React.FC = () => {
  const { t } = useShot();
  return (
    <CardShot mode="space" pose="explaining" pill={P2} push={0.03} head={<Title text="HOW MUCH LIGHT DOES IT REFLECT?" color={T} size={52} />}>
      <Bar y={220} label="TrES-2b" pct={0.01} text="< 1%" color={ACCENT.red} at={t(117.5)} />
      <Bar y={330} label="JUPITER" pct={0.5} text="~50%" color={ACCENT.amber} at={t(120.42)} />
      <Bar y={440} label="COAL" pct={0.04} text="~4%" color="#94A3B8" at={t(124.36)} />
      <Stamp x={360} y={540} at={t(126.0)} text="DARKER THAN COAL" size={44} />
    </CardShot>
  );
};
export const Shot10: React.FC = () => {
  const { f, t } = useShot();
  const s = f >= t(156.02) ? 3 : f >= t(143.32) ? 2 : f >= t(134.96) ? 1 : 0;
  return (
    <CardShot mode="space" pose="the_catch" pill={s === 0 ? "THE CATCH" : P2} pillColor={s === 0 ? ACCENT.red : undefined} push={0.03}
      head={<Title text={["WHY SO DARK? (NOT FULLY SOLVED)", "SODIUM + POTASSIUM EAT LIGHT", "A FAINT RED EMBER GLOW", "NEXT: MELTING METAL..."][s]} color={s === 3 ? ACCENT.amber : T} size={50} />}>
      <div style={{ position: "absolute", left: 700, top: 170 }}><Planet size={400} look={{ ...LOOKS[2], rim: s >= 2 ? ACCENT.red : undefined, glow: s >= 2 ? "rgba(229,57,53,0.7)" : undefined }} id="s10" /></div>
      {s === 0 ? (<>
        <Appear at={t(131.42)}><svg style={{ position: "absolute", left: 100, top: 250 }} width="260" height="150"><path d="M40 120 Q10 120 20 90 Q20 60 60 65 Q75 25 125 35 Q175 15 195 60 Q245 60 235 100 Q235 125 205 120 Z" fill="#E2E8F0" stroke="#141824" strokeWidth="5" /></svg></Appear>
        <Cross x={230} y={320} s={170} at={t(132.8)} />
        <Body y={450} text="Too hot for bright ammonia clouds." color={M} at={t(131.42)} w={520} size={34} />
      </>) : null}
      {s === 1 ? (<>
        <Flow from={[60, 300]} to={[760, 360]} n={10} color="#FDE047" size={14} a={t(135.5)} b={t(143.3)} />
        <Tag x={70} y={420} text="Na" at={t(136.5)} color="#F59E0B" size={48} />
        <Tag x={220} y={420} text="K" at={t(138.0)} color="#A855F7" size={48} />
        <Body y={530} text="Photons go in. Nothing comes back." color={M} at={t(139.0)} w={520} size={34} />
      </>) : null}
      {s >= 2 ? <Body y={300} text={s === 2 ? (f >= t(152.4) ? "An invisible void next to a star." : "Like a dying ember in a pitch-black room.") : "...in broad daylight."} color={M} at={t(143.8)} w={540} size={38} /> : null}
    </CardShot>
  );
};

// ---------- Chapter 3: WASP-76b ----------
export const Shot11: React.FC = () => {
  const { t } = useShot();
  return (
    <ChapterOpen chapter={3}>
      <CardShot mode="light" pose="explaining" pill={P3} push={0.03} head={<Title text="TIDALLY LOCKED" color={L} />}>
        <Star cx={140} cy={380} r={90} />
        <div style={{ position: "absolute", left: 560, top: 180, width: 380, height: 380, borderRadius: 999, background: `linear-gradient(90deg, ${ACCENT.amber} 50%, #1E293B 50%)`, border: "6px solid #141824" }} />
        <Tag x={58} y={190} text="640 LIGHT-YEARS" at={8} size={34} />
        <Appear at={t(168.48)} kind="rise"><Txt x={470} y={580} size={40} color={ACCENT.amber} w={300}>ETERNAL NOON</Txt></Appear>
        <Appear at={t(170.74)} kind="rise"><Txt x={830} y={580} size={40} color={L} w={360}>ETERNAL MIDNIGHT</Txt></Appear>
      </CardShot>
    </ChapterOpen>
  );
};
export const Shot12: React.FC = () => {
  const { f, t } = useShot();
  const vapor = ramp(f, t(181.5), t(184));
  return (
    <CardShot mode="space" pose="shocked" pill={P3} snapAt={t(173.4)} snapTo={1.06} push={0.03}
      head={<Title text={f >= t(186.1) ? "OCEANS OF STEEL → CLOUDS" : f >= t(180.74) ? "IRON TURNS INTO GAS" : "THE DAYSIDE"} color={T} size={56} />}>
      <div style={{ position: "absolute", left: 700, top: 170, width: 420, height: 420, borderRadius: 999, background: `linear-gradient(90deg, ${ACCENT.amber} 50%, #1E293B 50%)`, border: `6px solid ${SPACE.border}`, boxShadow: "0 0 60px 10px rgba(245,158,11,0.45)" }} />
      {f >= t(173.4) ? <Counter x={56} y={200} size={96} color={ACCENT.amber} from={0} to={2400} a={t(173.4)} b={t(176.5)} suffix="°C" w={600} /> : null}
      <Appear at={t(177.0)} kind="rise"><Txt x={56} y={320} size={52} color={T} font="mono" w={600}>&gt; 4,300°F</Txt></Appear>
      {f >= t(180.74) ? (<>
        <div style={{ position: "absolute", left: 120, top: 440, width: 160, height: 100, background: "#94A3B8", border: "5px solid #141824", opacity: 1 - vapor, borderRadius: 8 }} />
        <Txt x={120} y={470} size={40} color="#141824" font="mono" w={160} align="center">Fe</Txt>
        <Flow from={[200, 490]} to={[600, 300]} n={12} color="#CBD5E1" size={14} a={t(181.5)} b={t(189.8)} />
      </>) : null}
    </CardShot>
  );
};
export const Shot13: React.FC = () => {
  const { f, t } = useShot();
  const st = f >= t(216.42) ? 3 : f >= t(210.66) ? 2 : f >= t(202.12) ? 1 : 0;
  return (
    <CardShot mode="space" pose="the_catch" pill={P3} push={0.03}
      head={<Title text={["18,000 KM/H WINDS", "IRON RAIN ON THE NIGHTSIDE", "TONIGHT'S FORECAST", "...AND IT'S ONLY HALF AS HOT"][st]} color={st === 3 ? ACCENT.amber : T} size={56} />}>
      <div style={{ position: "absolute", left: 0, top: 180, width: 610, height: 420, background: "rgba(245,158,11,0.25)" }} />
      <div style={{ position: "absolute", left: 610, top: 180, width: 610, height: 420, background: "rgba(15,23,42,0.6)" }} />
      <div style={{ position: "absolute", left: 606, top: 180, width: 8, height: 420, background: SPACE.border, opacity: 0.6 }} />
      <Txt x={40} y={190} size={36} color={ACCENT.amber} w={500} font="mono">DAY 2,400°C</Txt>
      <Appear at={t(197.66)} kind="rise"><Txt x={640} y={190} size={36} color="#93C5FD" w={540} font="mono">NIGHT ~1,500°C</Txt></Appear>
      <Line x1={100} y1={300} x2={1080} y2={300} color={ACCENT.red} w={14} k={ramp(f, t(190.2), t(191.2))} />
      <Tag x={330} y={240} text="18,000 KM/H" at={t(191.0)} color={ACCENT.red} size={34} />
      <Flow from={[120, 340]} to={[620, 340]} n={10} color="#CBD5E1" size={14} a={t(191.5)} b={t(222)} />
      <Flow from={[700, 340]} to={[1100, 360]} n={12} color="#94A3B8" size={18} a={t(202.12)} b={t(222)} fall={200} />
      {st >= 2 ? (
        <Appear at={t(210.66)}><div style={{ position: "absolute", left: 640, top: 380, width: 520, padding: "18px 22px", background: "#0E131F", border: `4px solid ${SPACE.border}`, borderRadius: 16, fontFamily: FONT.head, fontWeight: 700, fontSize: 40, color: T }}>TONIGHT: <span style={{ color: ACCENT.amber }}>MOLTEN IRON</span> 🌧</div></Appear>
      ) : null}
    </CardShot>
  );
};

// ---------- Chapter 4: KELT-9b ----------
export const Shot14: React.FC = () => {
  const { f, t } = useShot();
  return (
    <ChapterOpen chapter={4}>
      <CardShot mode="space" pose="explaining" pill={P4} push={0.04}
        head={<Title text={f >= t(230.18) ? "KELT-9b DIDN'T GET THE MEMO" : "PLANETS < STARS (RIGHT?)"} color={T} size={56} />}>
        <Star cx={330} cy={400} r={190} core="#FFFFFF" edge="#93C5FD" glow="rgba(147,197,253,0.6)" />
        <div style={{ position: "absolute", left: 600, top: 330 }}><Planet size={130} look={LOOKS[4]} id="s14" /></div>
        <Ring cx={330} cy={400} rx={330} ry={110} color="#94A3B8" />
        <Tag x={720} y={190} text="670 LIGHT-YEARS" at={t(232.74)} size={32} />
        <Tag x={720} y={260} text="STAR: 10,170 K" at={t(238.0)} color="#60A5FA" size={32} />
        <Appear at={t(240.6)} kind="rise"><Txt x={720} y={335} size={34} color={M} w={460} font="body">≈ 2× hotter than our Sun</Txt></Appear>
        <Tag x={720} y={420} text="YEAR < 1.5 DAYS" at={t(243.58)} color={ACCENT.amber} size={32} />
      </CardShot>
    </ChapterOpen>
  );
};
const Thermo: React.FC<{ x: number; label: string; sub: string; kelvin: number; color: string; at: number }> = ({ x, label, sub, kelvin, color, at }) => {
  const { f } = useShot();
  const H = 340, top = 160, max = 5000, fill = ramp(f, at, at + 24, 0, kelvin / max);
  return (
    <Appear at={at} kind="fade">
      <div style={{ position: "absolute", left: x + 120, top, width: 60, height: H, borderRadius: 30, border: `5px solid ${SPACE.border}`, background: "#0B1020", overflow: "hidden", boxSizing: "border-box" }}><div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: `${fill * 100}%`, background: color }} /></div>
      <div style={{ position: "absolute", left: x + 105, top: top + H - 22, width: 90, height: 90, borderRadius: 99, background: color, border: `5px solid ${SPACE.border}`, boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: x, width: 300, top: 104, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 44, color }}>{(Math.round((fill * max) / 100) * 100).toLocaleString("en-US")} K</div>
      <div style={{ position: "absolute", left: x, width: 300, top: top + H + 80, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 32, color: T }}>{label}</div>
      <div style={{ position: "absolute", left: x, width: 300, top: top + H + 118, textAlign: "center", fontFamily: FONT.body, fontWeight: 600, fontSize: 24, color: M }}>{sub}</div>
    </Appear>
  );
};
export const Shot15: React.FC = () => {
  const { t } = useShot();
  return (
    <CardShot mode="space" pose="shocked" pill={P4} snapAt={t(257.8)} snapTo={1.05} push={0.02} head={<Txt x={56} y={96} size={52} color={T} w={420}>HOTTER THAN A STAR?</Txt>}>
      <Thermo x={800} label="KELT-9b" sub="planet · dayside" kelvin={4600} color={ACCENT.amber} at={t(249.6)} />
      <Thermo x={470} label="RED DWARF" sub="star · ~3,500 K" kelvin={3500} color="#F87171" at={t(257.58)} />
      <Appear at={t(253.5)} kind="rise"><Txt x={56} y={300} size={46} color={ACCENT.amber} font="mono" w={420}>≈ 7,800°F</Txt></Appear>
      <Stamp x={60} y={420} at={t(259.2)} text="PLANET WINS" size={44} rot={-5} />
    </CardShot>
  );
};
const Mol: React.FC<{ x: number; y: number; label: string; atoms: string[]; split: number }> = ({ x, y, label, atoms, split }) => (
  <>
    {atoms.map((c, i) => { const a = (i / atoms.length) * Math.PI * 2; const d = 26 + 90 * split; return <div key={i} style={{ position: "absolute", left: x + Math.cos(a) * d - 22, top: y + Math.sin(a) * d - 22, width: 44, height: 44, borderRadius: 99, background: c, border: "4px solid #141824" }} />; })}
    <Txt x={x - 90} y={y + 80 + 40 * split} size={30} color={T} w={180} align="center" font="mono">{label}</Txt>
  </>
);
export const Shot16: React.FC = () => {
  const { f, t } = useShot();
  const split = ramp(f, t(265.5), t(268));
  const tail = ramp(f, t(270.6), t(276));
  const tease = f >= t(281.86);
  return (
    <CardShot mode="space" pose="shocked" pill={P4} push={0.04}
      head={<Title text={tease ? "NEXT: STRETCHED INTO AN EGG..." : f >= t(270.14) ? "BOILING AWAY: A COMET TAIL" : f >= t(264.9) ? "RIPPED INTO RAW ATOMS" : "MOLECULES CAN'T HOLD TOGETHER"} color={tease ? ACCENT.amber : T} size={52} />}>
      {f < t(270.14) ? (<>
        <Mol x={240} y={340} label="H₂O" atoms={["#EF4444", "#E2E8F0", "#E2E8F0"]} split={split} />
        <Mol x={600} y={340} label="CO₂" atoms={["#475569", "#EF4444", "#EF4444"]} split={split} />
        <Mol x={960} y={340} label="CH₄" atoms={["#475569", "#E2E8F0", "#E2E8F0", "#E2E8F0", "#E2E8F0"]} split={split} />
      </>) : (<>
        <Star cx={150} cy={380} r={130} core="#FFFFFF" edge="#93C5FD" glow="rgba(147,197,253,0.6)" />
        {[0, 1, 2].map((i) => <Line key={i} x1={300} y1={300 + i * 70} x2={500} y2={330 + i * 40} color="#A78BFA" w={6} dash="10 8" />)}
        <div style={{ position: "absolute", left: 600, top: 300 }}><Planet size={150} look={LOOKS[4]} id="s16" /></div>
        <div style={{ position: "absolute", left: 740, top: 335, width: 420 * tail, height: 80, background: "linear-gradient(90deg, rgba(147,197,253,0.8), rgba(147,197,253,0))", clipPath: "polygon(0 0, 100% 40%, 100% 60%, 0 100%)" }} />
        <Body y={540} text={f >= t(279.2) ? "KELT-9b is slowly evaporating." : "UV light boils its atmosphere into space."} color={M} at={t(271)} w={700} size={36} />
      </>)}
    </CardShot>
  );
};
export { Cross, L, LM };
