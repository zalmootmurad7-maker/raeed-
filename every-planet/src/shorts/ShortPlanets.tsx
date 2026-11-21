import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import TS from "./short_planets_ts.json";
import CFG from "./short_planets.json";
import { ACCENT, FONT, SPACE } from "../tokens";
import { CharacterRig } from "../components/CharacterRig";
import { LOOKS, Planet, PlanetLook } from "../components/Planet";

// "1 SECOND TO LIVE?" — 3 planets in one Short (HD 189733 b, WASP-76b, Halla). 1080x1920, 30 fps, 0 px shake.
// SAFE ZONE (owner, 2026-11-21): everything between 20% and 78% of the height -> y 384..1498.
// Cuts follow the Whisper word times in short_planets.json (a new beat every ~2-3 s).
export const SP_ID = CFG.id;
export const SP_FPS = 30;
export const SP_FRAMES = Math.round(CFG.duration * SP_FPS);
const W = 1080, INK = "#141824", YELLOW = "#FACC15";
const SAFE_TOP = 384, SAFE_BOT = 1498;
const HEAD = 432;        // header row (pill / banner)
const CY = 880;          // stage centre (planets)
const PX = 690;          // stage centre x (right of the character)
const CAP = 1318;        // captions top (2 lines end before 1498)
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const r = (f: number, a: number, b: number, from = 0, to = 1, e = Easing.out(Easing.cubic)) => interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: e });
const F = (sec: number) => Math.round(sec * SP_FPS);

type Word = { word: string; start: number; end: number };
const FIX: Record<string, string> = { Hala: "Halla", "Hala.": "Halla.", "Hala's": "Halla's", Wasp: "WASP", "76b.": "-76b.", "189733b.": "189733 b." };
const WORDS: Word[] = (TS as { words: Word[] }).words.map((w) => ({ ...w, word: FIX[w.word] ?? w.word }))
  .reduce<Word[]>((acc, w) => { if (acc.length && /^[.,'-]/.test(w.word)) { const p = acc[acc.length - 1]; acc[acc.length - 1] = { word: p.word + w.word, start: p.start, end: w.end }; } else acc.push({ ...w }); return acc; }, []);

// ---------- shared pieces ----------
const Stars: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: SPACE.bg }}>
    {Array.from({ length: 90 }, (_, i) => { const q = (n: number) => { const v = Math.sin((i + 1) * 91.7 * n) * 10000; return v - Math.floor(v); }; return <div key={i} style={{ position: "absolute", left: q(1) * W, top: q(2) * 1920, width: 3, height: 3, borderRadius: 9, background: "#F6F4EF", opacity: 0.25 + q(3) * 0.5 }} />; })}
  </AbsoluteFill>
);
const T: React.FC<{ y: number; size: number; color?: string; x?: number; w?: number; mono?: boolean; children: React.ReactNode }> = ({ y, size, color = "#FFFFFF", x = 60, w = 960, mono, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: "center", fontFamily: mono ? FONT.mono : FONT.head, fontWeight: 700, fontSize: size, color, lineHeight: 1.02, fontVariantNumeric: "tabular-nums", letterSpacing: mono ? 0 : -1.5 }}>{children}</div>
);
const Banner: React.FC<{ text: string; at?: number; size?: number; y?: number }> = ({ text, at = 0, size = 140, y = HEAD }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return (
    <div style={{ position: "absolute", left: 50, top: y, width: 980, padding: "18px 16px 22px", background: YELLOW, border: `7px solid ${INK}`, borderRadius: 30, boxShadow: `10px 10px 0 ${INK}`, textAlign: "center", scale: `${r(f, at, at + 8, 1.03, 1, Easing.out(Easing.back(1.6)))}`, transformOrigin: "50% 0%", boxSizing: "border-box" }}>
      {text.split("|").map((l, i) => <div key={i} style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: Math.min(size, 920 / (l.length * 0.6)), lineHeight: 1.0, color: INK, letterSpacing: -2, whiteSpace: "nowrap" }}>{l}</div>)}
    </div>
  );
};
const Pill: React.FC<{ text: string; color?: string }> = ({ text, color = ACCENT.blue }) => (
  <div style={{ position: "absolute", left: 0, width: W, top: HEAD, textAlign: "center" }}>
    <span style={{ display: "inline-block", background: color, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 52, padding: "10px 30px", borderRadius: 999, border: `5px solid ${INK}`, boxShadow: `6px 6px 0 #060911`, whiteSpace: "nowrap" }}>{text}</span>
  </div>
);
const Stamp: React.FC<{ x: number; y: number; at: number; text: string; color?: string; size?: number; rot?: number }> = ({ x, y, at, text, color = ACCENT.red, size = 64, rot = -6 }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return <div style={{ position: "absolute", left: x, top: y, rotate: `${rot}deg`, scale: `${r(f, at, at + 6, 1.8, 1)}`, border: `8px solid ${color}`, color, background: "rgba(14,19,31,0.88)", fontFamily: FONT.head, fontWeight: 700, fontSize: size, padding: "6px 22px", borderRadius: 14, whiteSpace: "nowrap" }}>{text}</div>;
};
const Pl: React.FC<{ n: number; x: number; y: number; size: number; look?: Partial<PlanetLook> }> = ({ n, x, y, size, look }) => (
  <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2 }}><Planet size={size} look={{ ...LOOKS[n], ...(look ?? {}) }} id={`spl${n}${size}`} /></div>
);
const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string; w?: number }> = ({ x1, y1, x2, y2, color = ACCENT.red, w = 14 }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path d={`M${x2 - 34 * Math.cos(a - 0.5)} ${y2 - 34 * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - 34 * Math.cos(a + 0.5)} ${y2 - 34 * Math.sin(a + 0.5)}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
const Count: React.FC<{ y: number; size: number; color: string; a: number; b: number; to: number; from?: number; fmt: (v: number) => string }> = ({ y, size, color, a, b, to, from = 0, fmt }) => {
  const f = useCurrentFrame();
  return <T y={y} size={size} color={color} mono>{fmt(r(f, a, b, from, to, Easing.out(Easing.quad)))}</T>;
};
// glass shards blowing sideways (left -> right), looping smoothly
const Shards: React.FC<{ f: number; a: number; y: number; n?: number; speed?: number; x0?: number; span?: number; h?: number; color?: string }> = ({ f, a, y, n = 18, speed = 1, x0 = 380, span = 680, h = 300, color = "#BFDBFE" }) => (
  <>{Array.from({ length: n }, (_, i) => { const ph = (((f - a) / 30) * 0.9 * speed + i / n) % 1; const x = x0 + span * ph; const yy = y + ((i * 53) % h) - h / 2; return <svg key={i} style={{ position: "absolute", left: x, top: yy, overflow: "visible", opacity: ph < 0.94 ? 1 : 0 }} width="1" height="1"><line x1={-50} y1={0} x2={-6} y2={0} stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.5" /><path d="M0 0 L38 -11 L15 13 Z" fill={color} stroke={INK} strokeWidth="3.5" strokeLinejoin="round" /></svg>; })}</>
);
const Glow: React.FC<{ cx: number; cy: number; r: number; color: string }> = ({ cx, cy, r: R, color }) => (
  <div style={{ position: "absolute", left: cx - R, top: cy - R, width: 2 * R, height: 2 * R, borderRadius: 9999, background: `radial-gradient(circle, ${color} 0%, ${color} 35%, rgba(0,0,0,0) 70%)` }} />
);
const Star: React.FC<{ cx: number; cy: number; R: number }> = ({ cx, cy, R }) => (
  <>
    <Glow cx={cx} cy={cy} r={R * 1.7} color="rgba(234,88,12,0.45)" />
    <div style={{ position: "absolute", left: cx - R, top: cy - R, width: 2 * R, height: 2 * R, borderRadius: 9999, background: "radial-gradient(circle, #FED7AA 0%, #F97316 55%, #DC2626 100%)", border: `7px solid ${INK}`, boxSizing: "border-box" }} />
  </>
);
const Orbit: React.FC<{ cx: number; cy: number; R: number; color?: string; w?: number }> = ({ cx, cy, R, color = "#E2E8F0", w = 5 }) => (
  <div style={{ position: "absolute", left: cx - R, top: cy - R, width: 2 * R, height: 2 * R, borderRadius: 9999, border: `${w}px dashed ${color}`, boxSizing: "border-box" }} />
);
// split day/night planet for WASP-76b
const SplitPlanet: React.FC<{ cx: number; cy: number; R: number; heat?: number }> = ({ cx, cy, R, heat = 1 }) => (
  <>
    <Glow cx={cx - R * 0.35} cy={cy} r={R * 1.5} color={`rgba(245,158,11,${0.45 * heat})`} />
    <svg style={{ position: "absolute", left: cx - R, top: cy - R, overflow: "visible" }} width={2 * R} height={2 * R}>
      <defs>
        <clipPath id="wclip"><circle cx={R} cy={R} r={R - 4} /></clipPath>
        <radialGradient id="wday" cx="30%" cy="50%" r="80%"><stop offset="0%" stopColor="#FEF3C7" /><stop offset="45%" stopColor="#F59E0B" /><stop offset="100%" stopColor="#B45309" /></radialGradient>
      </defs>
      <g clipPath="url(#wclip)">
        <rect x={0} y={0} width={R} height={2 * R} fill="url(#wday)" />
        <rect x={R} y={0} width={R} height={2 * R} fill="#1E293B" />
        <rect x={R - 10} y={0} width={20} height={2 * R} fill="#7C2D12" opacity="0.6" />
      </g>
      <circle cx={R} cy={R} r={R - 4} fill="none" stroke={INK} strokeWidth="8" />
    </svg>
  </>
);

// ---------- scenes ----------
type Ctx = { f: number; b0: number; b1: number };
const HALLA = { cx: PX, cy: CY + 20, orbit: 200 };
const SC: Record<string, React.FC<Ctx>> = {
  // HOOK — frame 0 is full: banner + the 3 planets flashing + big shocked character
  hook: ({ f }) => (<>
    <Banner text="1 SECOND|TO LIVE?" />
    {[1, 3, 10].map((n, i) => { const ph = ((f + i * 6) % 18) / 18; const k = 1 + 0.12 * Math.max(0, 1 - ph * 3); const x = [470, 690, 900][i], y = [880, 1080, 880][i];
      return (<React.Fragment key={n}><Glow cx={x} cy={y} r={150 * k} color={["rgba(59,130,246,0.55)", "rgba(245,158,11,0.55)", "rgba(234,88,12,0.55)"][i]} /><div style={{ position: "absolute", left: 0, top: 0, scale: `${k}`, transformOrigin: `${x}px ${y}px`, width: W, height: 1920 }}><Pl n={n} x={x} y={y} size={200} /></div></React.Fragment>); })}
  </>),
  hook3: ({ f }) => (<>
    <Banner text="1 SECOND|TO LIVE?" />
    <T y={780} size={70} color={YELLOW}>3 REAL PLANETS</T>
    {[1, 3, 10].map((n, i) => { const at = F([2.1, 2.32, 2.68][i]); const k = r(f, at, at + 8, 0.6, 1, Easing.out(Easing.back(2))); const x = [470, 700, 930][i];
      return (<div key={n} style={{ position: "absolute", left: 0, top: 0, width: W, height: 1920, scale: `${k}`, transformOrigin: `${x}px 980px`, opacity: r(f, at, at + 4) }}><Pl n={n} x={x} y={980} size={200} /><T x={x - 110} w={220} y={1095} size={64} color="#FFFFFF" mono>{i + 1}</T></div>); })}
  </>),
  // HD 189733 b
  hd_intro: () => (<><Pill text="01 · HD 189733 b" /><Pl n={1} x={PX} y={CY + 20} size={500} /></>),
  hd_marble: ({ f, b0 }) => (<><Pill text="01 · HD 189733 b" /><T y={530} size={84}>A CALM BLUE MARBLE?</T><div style={{ position: "absolute", left: 0, top: 0, width: W, height: 1920, rotate: `${r(f, b0, b0 + 90, -2, 2, Easing.inOut(Easing.sin))}deg`, transformOrigin: `${PX}px ${CY + 40}px` }}><Pl n={1} x={PX} y={CY + 40} size={480} /></div></>),
  hd_mph: ({ f, b0 }) => (<>
    <Count y={HEAD} size={150} color={ACCENT.red} a={F(10.6)} b={F(11.9)} to={5400} fmt={(v) => Math.round(v).toLocaleString("en-US")} />
    <T x={380} w={660} y={HEAD + 160} size={64}>MILES PER HOUR</T>
    <Pl n={1} x={PX} y={CY + 80} size={400} />
    {[0, 1, 2].map((i) => <Arrow key={i} x1={400} y1={800 + i * 140} x2={400 + 640 * r(f, b0 + i * 3, b0 + i * 3 + 12)} y2={800 + i * 140} />)}
  </>),
  hd_winds: ({ f, b0 }) => (<>
    <T y={HEAD + 10} size={96} color={YELLOW}>SUPERSONIC WINDS</T>
    <Pl n={1} x={PX} y={CY + 40} size={440} />
    {[0, 1, 2, 3].map((i) => { const ph = (((f - b0) / 30) * 1.3 + i * 0.25) % 1; return <Arrow key={i} x1={380 + 600 * ph - 180} y1={720 + i * 110} x2={380 + 600 * ph} y2={720 + i * 110} />; })}
  </>),
  hd_glass: ({ f, b0 }) => (<>
    <T y={HEAD + 10} size={84}>SILICATE CLOUDS</T>
    <T y={HEAD + 105} size={84} color="#BFDBFE">↓ MOLTEN GLASS</T>
    <Pl n={1} x={PX} y={CY + 60} size={440} />
    <Shards f={f} a={b0} y={CY + 60} n={18} speed={1.4} />
  </>),
  hd_umbrella: ({ f, b0 }) => {
    const hit = F(18.3), k = r(f, hit, hit + 14);
    const piece = (i: number) => ({ dx: 320 * k * (0.6 + i * 0.25), dy: (i - 1) * 90 * k, rot: (i - 1) * 50 * k + 30 * k });
    return (<>
      <T y={HEAD + 10} size={110} color={ACCENT.red}>SIDEWAYS!</T>
      {[0, 1, 2].map((i) => { const p = piece(i); return (
        <svg key={i} style={{ position: "absolute", left: 700 + p.dx, top: 860 + p.dy, overflow: "visible", rotate: `${p.rot}deg`, opacity: 1 - 0.7 * k }} width="1" height="1">
          {/* umbrella dome split in 3 panels + handle on the middle one */}
          <path d={i === 0 ? "M-180 0 Q-170 -150 -60 -170 L-60 0 Z" : i === 1 ? "M-60 -170 Q0 -180 60 -170 L60 0 L-60 0 Z" : "M60 -170 Q170 -150 180 0 L60 0 Z"} fill={["#E2E8F0", "#CBD5E1", "#E2E8F0"][i]} stroke={INK} strokeWidth="9" strokeLinejoin="round" />
          {i === 1 ? <path d="M0 0 L0 170 Q0 210 -40 200" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" /> : null}
        </svg>); })}
      <Shards f={f} a={b0 - 30} y={800} n={26} speed={2.4} x0={300} span={780} h={360} />
      {[0, 1, 2].map((i) => <Arrow key={i} x1={360} y1={700 + i * 130} x2={360 + 300 * r(f, b0 + i * 2, b0 + i * 2 + 10)} y2={700 + i * 130} />)}
      <Stamp x={360} y={1160} at={F(18.7)} text="SIDEWAYS GLASS RAIN" size={46} />
    </>);
  },
  // WASP-76b
  w_intro: () => (<><Pill text="02 · WASP-76b" /><SplitPlanet cx={PX} cy={CY + 20} R={240} /></>),
  w_day: () => (<>
    <Count y={HEAD} size={140} color={ACCENT.amber} a={F(23.2)} b={F(24.6)} to={4300} fmt={(v) => `${Math.round(v).toLocaleString("en-US")}°F`} />
    <SplitPlanet cx={PX} cy={CY + 60} R={250} heat={1.4} />
    <T x={PX - 250} w={250} y={CY + 340} size={56} color={ACCENT.amber}>DAY</T>
    <T x={PX} w={250} y={CY + 340} size={56} color="#94A3B8">NIGHT</T>
  </>),
  w_boil: ({ f, b0 }) => (<>
    <T y={HEAD + 10} size={84} color={ACCENT.amber}>IRON BOILS</T>
    <T y={HEAD + 105} size={84}>INTO CLOUDS</T>
    <SplitPlanet cx={PX} cy={CY + 120} R={230} heat={1.4} />
    {Array.from({ length: 14 }, (_, i) => { const ph = (((f - b0) / 30) * 0.7 + i / 14) % 1; const x = PX - 200 + ((i * 37) % 180); return <div key={i} style={{ position: "absolute", left: x, top: CY - 60 - 200 * ph, width: 30 - 10 * ph, height: 30 - 10 * ph, borderRadius: 99, background: "#A8A29E", border: `3px solid ${INK}`, opacity: 1 - ph }} />; })}
  </>),
  w_winds: ({ f, b0 }) => (<>
    <T y={HEAD + 10} size={84}>WINDS CARRY IT</T>
    <T y={HEAD + 105} size={84} color="#94A3B8">TO THE NIGHT SIDE</T>
    <SplitPlanet cx={PX} cy={CY + 120} R={230} />
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
      {[0, 1].map((i) => { const p = r(f, b0 + i * 8, b0 + i * 8 + 24); const y0 = CY + 120 - 280 - i * 50; return <path key={i} d={`M ${PX - 220} ${y0 + 150} Q ${PX} ${y0 - 40} ${PX + 220} ${y0 + 150}`} fill="none" stroke={ACCENT.red} strokeWidth="14" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />; })}
    </svg>
    {r(f, b0 + 24, b0 + 26) > 0.5 ? <Arrow x1={PX + 200} y1={CY - 40} x2={PX + 225} y2={CY - 5} /> : null}
  </>),
  w_rain: ({ f, b0 }) => (<>
    <T y={HEAD + 10} size={84} color="#CBD5E1">IT FALLS AS...</T>
    <SplitPlanet cx={PX} cy={CY + 60} R={240} />
    {Array.from({ length: 16 }, (_, i) => { const ph = (((f - b0) / 30) * 1.2 + i / 16) % 1; const x = PX + 30 + ((i * 47) % 190); return <svg key={i} style={{ position: "absolute", left: x, top: CY - 120 + 330 * ph, overflow: "visible", opacity: ph < 0.92 ? 1 : 0 }} width="1" height="1"><path d="M0 -22 Q14 0 0 12 Q-14 0 0 -22 Z" fill="#CBD5E1" stroke={INK} strokeWidth="3.5" /></svg>; })}
    <Stamp x={370} y={1150} at={F(33.66)} text="LIQUID IRON RAIN" size={58} color="#CBD5E1" />
  </>),
  // HALLA / 8 UMi b
  l_intro: ({ f }) => { const a = -0.9 + (f / 30) * 0.15; return (<><Pill text="03 · 8 UMi b · HALLA" color={ACCENT.red} /><Star cx={HALLA.cx} cy={HALLA.cy} R={110} /><Orbit cx={HALLA.cx} cy={HALLA.cy} R={HALLA.orbit} /><Pl n={10} x={HALLA.cx + Math.cos(a) * HALLA.orbit} y={HALLA.cy + Math.sin(a) * HALLA.orbit} size={90} /></>); },
  l_swell: ({ f, b0 }) => { const R = r(f, F(38.0), F(40.4), 110, 300, Easing.inOut(Easing.cubic)); return (<>
    <Star cx={HALLA.cx} cy={HALLA.cy} R={R} /><Orbit cx={HALLA.cx} cy={HALLA.cy} R={HALLA.orbit} />
    <Pl n={10} x={HALLA.cx + Math.cos(-0.9) * HALLA.orbit} y={HALLA.cy + Math.sin(-0.9) * HALLA.orbit} size={90} />
    <Count y={HEAD} size={140} color={ACCENT.red} a={F(38.0)} b={F(40.4)} from={0.5} to={1.5} fmt={(v) => `${v.toFixed(1)}×`} />
    <T y={HEAD + 150} size={60}>THE ORBIT</T>
    {f < b0 ? null : null}
  </>); },
  l_swallow: () => (<>
    <Star cx={HALLA.cx} cy={HALLA.cy} R={300} /><Orbit cx={HALLA.cx} cy={HALLA.cy} R={HALLA.orbit} color="rgba(226,232,240,0.6)" />
    <T y={HEAD + 10} size={96} color={ACCENT.red}>SWALLOWED</T>
    <T y={HEAD + 110} size={84}>WHOLE?</T>
  </>),
  l_still: ({ f, b0 }) => { const R = r(f, b0, b0 + 24, 300, 110, Easing.inOut(Easing.cubic)); const a = -0.9 + ((f - b0) / 30) * 0.15; return (<>
    <Star cx={HALLA.cx} cy={HALLA.cy} R={R} /><Orbit cx={HALLA.cx} cy={HALLA.cy} R={HALLA.orbit} />
    <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 1920, opacity: r(f, b0 + 16, b0 + 22) }}><Pl n={10} x={HALLA.cx + Math.cos(a) * HALLA.orbit} y={HALLA.cy + Math.sin(a) * HALLA.orbit} size={110} /></div>
    <T y={HEAD + 10} size={110} color={ACCENT.amber}>STILL THERE</T>
    <Stamp x={720} y={600} at={F(46.2)} text="ALIVE" size={56} color={ACCENT.amber} rot={8} />
  </>); },
  l_how: ({ f }) => { const a = -0.9 + (f / 30) * 0.15; return (<>
    <Banner text="HOW IS IT|ALIVE?!" />
    <Star cx={HALLA.cx} cy={HALLA.cy + 110} R={100} /><Orbit cx={HALLA.cx} cy={HALLA.cy + 110} R={180} />
    <Pl n={10} x={HALLA.cx + Math.cos(a) * 180} y={HALLA.cy + 110 + Math.sin(a) * 180} size={100} />
  </>); },
  l_seven: ({ f }) => (<>
    <Banner text="HOW IS IT|ALIVE?!" at={-99} />
    <T y={770} size={78} color={YELLOW}>+ 7 MORE</T>
    <T y={855} size={62}>IMPOSSIBLE WORLDS</T>
    {[2, 4, 5, 6, 7, 8, 9].map((n, i) => { const at = F(49.12 + i * 0.12); const x = 440 + (i % 4) * 160, y = 1030 + Math.floor(i / 4) * 160;
      return <div key={n} style={{ position: "absolute", left: 0, top: 0, width: W, height: 1920, scale: `${r(f, at, at + 8, 0.5, 1, Easing.out(Easing.back(2)))}`, opacity: r(f, at, at + 4), transformOrigin: `${x}px ${y}px` }}><Pl n={n} x={x} y={y} size={n === 5 ? 140 : 125} /></div>; })}
  </>),
  // CTA — arrow straight down toward the Related Video link
  cta: ({ f, b0 }) => { const bob = Math.sin(((f - b0) / 30) * Math.PI * 2 * 0.9) * 14; return (<>
    <Banner text="WATCH|ALL 10 ↓" />
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => { const at = b0 + i * 2; const x = 425 + (i % 5) * 122, y = 830 + Math.floor(i / 5) * 135;
      return <div key={n} style={{ position: "absolute", left: 0, top: 0, width: W, height: 1920, scale: `${r(f, at, at + 8, 0.5, 1, Easing.out(Easing.back(2)))}`, opacity: r(f, at, at + 4), transformOrigin: `${x}px ${y}px` }}><Pl n={n} x={x} y={y} size={105} /></div>; })}
    <div style={{ position: "absolute", left: 0, top: bob, width: W, height: 1920 }}><Arrow x1={670} y1={1030} x2={670} y2={1200} w={30} /></div>
  </>); },
};

const BEATS = CFG.beats as { t: number; scene: string; pose: string; snap?: number; stamp?: number }[];

const BeatView: React.FC<{ i: number; b0: number; b1: number }> = ({ i, b0, b1 }) => {
  const f = useCurrentFrame();
  const beat = BEATS[i];
  const pop = i === 0 ? r(f, 0, 9, 1.03, 1) : r(f, b0, b0 + 8, 0.92, 1, Easing.out(Easing.back(2.2)));   // Card Pop on the cut
  const s1 = beat.snap !== undefined ? r(f, F(beat.snap), F(beat.snap) + 6, 1, 1.06) : 1;              // Snap Zoom on the key word
  const push = r(f, b0, b1, 1, 1.02, Easing.linear);                                                     // never fully static
  const Scene = SC[beat.scene];
  return (
    <>
      <AbsoluteFill style={{ scale: `${pop * s1 * push}`, transformOrigin: "50% 46%" }}>
        <Scene f={f} b0={b0} b1={b1} />
      </AbsoluteFill>
      <CharacterRig key={`${i}-${beat.pose}`} mode="space" pose={beat.pose as "explaining"} x={190} bottom={1290} height={370} enterAt={b0} />
    </>
  );
};

const Captions: React.FC = () => {
  const t = useCurrentFrame() / SP_FPS;
  const ph: Word[][] = []; let cur: Word[] = [];
  WORDS.forEach((w) => { cur.push(w); if (/[.,?!]$/.test(w.word) || cur.length >= 4) { ph.push(cur); cur = []; } });
  if (cur.length) ph.push(cur);
  const p = ph.find((x, i) => t >= x[0].start - 0.05 && t < (ph[i + 1] ? ph[i + 1][0].start - 0.05 : x[x.length - 1].end + 0.4));
  if (!p) return null;
  return (
    <div style={{ position: "absolute", left: 60, width: 960, top: CAP, textAlign: "center" }}>
      <span style={{ display: "inline-block", background: "rgba(6,9,17,0.92)", borderRadius: 18, padding: "8px 22px", fontFamily: FONT.head, fontWeight: 700, fontSize: 58, lineHeight: 1.12 }}>
        {p.map((w, i) => <span key={i} style={{ color: t >= w.start ? YELLOW : "#FFFFFF" }}>{w.word.toUpperCase()}{i < p.length - 1 ? " " : ""}</span>)}
      </span>
    </div>
  );
};

// Debug overlay for QA stills only: the 20% / 78% safe-zone lines.
const SafeLines: React.FC = () => (<>
  <div style={{ position: "absolute", left: 0, width: W, top: SAFE_TOP, borderTop: "3px dashed #22D3EE" }} />
  <div style={{ position: "absolute", left: 0, width: W, top: SAFE_BOT, borderTop: "3px dashed #22D3EE" }} />
</>);

export const ShortPlanets: React.FC<{ qa?: boolean }> = ({ qa }) => {
  const f = useCurrentFrame();
  const starts = BEATS.map((b) => F(b.t)).concat([SP_FRAMES]);
  let i = 0; while (i < BEATS.length - 1 && f >= starts[i + 1]) i++;
  return (
    <AbsoluteFill>
      <Stars />
      <BeatView key={i} i={i} b0={starts[i]} b1={starts[i + 1]} />
      <Captions />
      {qa ? <SafeLines /> : null}
    </AbsoluteFill>
  );
};
