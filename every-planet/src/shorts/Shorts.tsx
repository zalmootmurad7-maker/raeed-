import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import TS from "../../public/audio/timestamps.json";
import { ACCENT, FONT, SPACE } from "../tokens";
import { CharacterRig } from "../components/CharacterRig";
import { LOOKS, Planet, PlanetLook } from "../components/Planet";
import { Beat, FPS, SHORTS, ShortCfg, shortDuration, toLocal } from "./shortsConfig";

// v2 (owner, 2026-11-19): a new beat every 1.3–2.5 s (Card Pop on the cut + Snap Zoom on the key word),
// the character always on screen reacting, hook-first audio order. Safe zone y 240–1560.
const W = 1080, INK = "#141824", YELLOW = "#FACC15";
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const r = (f: number, a: number, b: number, from = 0, to = 1, e = Easing.out(Easing.cubic)) => interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: e });

type Word = { word: string; start: number; end: number };
const RAW: Word[] = (TS as unknown as { words: Word[] }).words;
const FIX: Record<string, string> = { Hala: "Halla", "Hala,": "Halla,", "Hala's": "Halla's", Bekdu: "Baekdu", "UMIB,": "UMi b,", eight: "8" };
const WORDS: Word[] = RAW.map((w) => ({ ...w, word: FIX[w.word] ?? w.word })).reduce<Word[]>((acc, w) => { if (acc.length && /^[.,'-]/.test(w.word)) { const p = acc[acc.length - 1]; acc[acc.length - 1] = { word: p.word + w.word, start: p.start, end: w.end }; } else acc.push({ ...w }); return acc; }, []);
const fr = (c: ShortCfg, src: number) => Math.round((toLocal(c, src) ?? 0) * FPS);

// ---------- shared ----------
const Stars: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: SPACE.bg }}>
    {Array.from({ length: 90 }, (_, i) => { const q = (n: number) => { const v = Math.sin((i + 1) * 91.7 * n) * 10000; return v - Math.floor(v); }; return <div key={i} style={{ position: "absolute", left: q(1) * W, top: q(2) * 1920, width: 3, height: 3, borderRadius: 9, background: "#F6F4EF", opacity: 0.25 + q(3) * 0.5 }} />; })}
  </AbsoluteFill>
);
const Banner: React.FC<{ lines: string[]; size: number }> = ({ lines, size }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 50, top: 240, width: 980, padding: "24px 20px 28px", background: YELLOW, border: `7px solid ${INK}`, borderRadius: 34, boxShadow: `10px 10px 0 ${INK}`, textAlign: "center", scale: `${r(f, 0, 9, 1.06, 1)}`, transformOrigin: "50% 0%", boxSizing: "border-box" }}>
      {lines.map((l, i) => <div key={i} style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: Math.min(size, 900 / (l.length * 0.6)), lineHeight: 1.0, color: INK, letterSpacing: -2, whiteSpace: "nowrap" }}>{l}</div>)}
    </div>
  );
};
const Captions: React.FC<{ c: ShortCfg }> = ({ c }) => {
  const t = useCurrentFrame() / FPS;
  const ws = WORDS.map((w) => ({ ...w, ls: toLocal(c, w.start + 0.01), le: toLocal(c, w.end - 0.01) })).filter((w) => w.ls !== null)
    .sort((a, b) => (a.ls as number) - (b.ls as number)) as (Word & { ls: number; le: number })[];
  const ph: (typeof ws)[] = []; let cur: typeof ws = [];
  ws.forEach((w) => { cur.push(w); if (/[.,?!]$/.test(w.word) || cur.length >= 4) { ph.push(cur); cur = []; } });
  if (cur.length) ph.push(cur);
  const p = ph.find((x, i) => t >= x[0].ls - 0.05 && t < (ph[i + 1] ? ph[i + 1][0].ls - 0.05 : x[x.length - 1].le + 0.4));
  if (!p) return null;
  return (
    <div style={{ position: "absolute", left: 60, width: 960, top: 1300, textAlign: "center" }}>
      <span style={{ display: "inline-block", background: "rgba(6,9,17,0.9)", borderRadius: 18, padding: "10px 22px", fontFamily: FONT.head, fontWeight: 700, fontSize: 62, lineHeight: 1.15 }}>
        {p.map((w, i) => <span key={i} style={{ color: t >= w.ls ? YELLOW : "#FFFFFF" }}>{w.word.toUpperCase()}{i < p.length - 1 ? " " : ""}</span>)}
      </span>
    </div>
  );
};
const EndCue: React.FC<{ total: number }> = ({ total }) => {
  const f = useCurrentFrame(); const a = total - 2.2 * FPS;
  if (f < a) return null;
  return (
    <div style={{ position: "absolute", left: 0, width: W, top: 1480, textAlign: "center", opacity: r(f, a, a + 5), scale: `${r(f, a, a + 8, 0.9, 1, Easing.out(Easing.back(1.8)))}` }}>
      <span style={{ display: "inline-block", background: ACCENT.red, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 46, padding: "10px 30px", borderRadius: 999, border: `5px solid ${INK}` }}>Full video linked below ↓</span>
    </div>
  );
};
const T: React.FC<{ y: number; size: number; color?: string; x?: number; w?: number; mono?: boolean; align?: "left" | "center" | "right"; children: React.ReactNode }> = ({ y, size, color = "#FFFFFF", x = 60, w = 960, mono, align = "center", children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: align, fontFamily: mono ? FONT.mono : FONT.head, fontWeight: 700, fontSize: size, color, lineHeight: 1.02, fontVariantNumeric: "tabular-nums", letterSpacing: mono ? 0 : -1.5 }}>{children}</div>
);
const Stamp: React.FC<{ x: number; y: number; at: number; text: string; color?: string; size?: number; rot?: number }> = ({ x, y, at, text, color = ACCENT.red, size = 56, rot = -6 }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  return <div style={{ position: "absolute", left: x, top: y, rotate: `${rot}deg`, scale: `${r(f, at, at + 6, 1.8, 1)}`, border: `7px solid ${color}`, color, background: "rgba(14,19,31,0.85)", fontFamily: FONT.head, fontWeight: 700, fontSize: size, padding: "6px 20px", borderRadius: 12, whiteSpace: "nowrap" }}>{text}</div>;
};
const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string; w?: number }> = ({ x1, y1, x2, y2, color = ACCENT.red, w = 10 }) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  return (
    <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <path d={`M${x2 - 30 * Math.cos(a - 0.5)} ${y2 - 30 * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - 30 * Math.cos(a + 0.5)} ${y2 - 30 * Math.sin(a + 0.5)}`} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
const Count: React.FC<{ y: number; size: number; color: string; a: number; b: number; from: number; to: number; fmt: (v: number) => string }> = ({ y, size, color, a, b, from, to, fmt }) => {
  const f = useCurrentFrame();
  return <T y={y} size={size} color={color} mono>{fmt(r(f, a, b, from, to, Easing.out(Easing.quad)))}</T>;
};

// Scene context: f = global frame, b0/b1 = beat start/end frame, w(src) = frame of a voice time.
type Ctx = { f: number; b0: number; b1: number; w: (src: number) => number };
const UP = 665;
const Pl: React.FC<{ n: number; x: number; y: number; size: number; look?: Partial<PlanetLook> }> = ({ n, x, y, size, look }) => (
  <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2 }}><Planet size={size} look={{ ...LOOKS[n], ...(look ?? {}) }} id={`sp${n}${size}`} /></div>
);
const StarV: React.FC<{ cx: number; cy: number; r: number; core?: string; edge?: string; glow?: string }> = ({ cx, cy, r, core = "#FFF7D6", edge = "#FBBF24", glow = "rgba(251,191,36,0.45)" }) => (
  <>
    <div style={{ position: "absolute", left: cx - r * 1.9, top: cy - r * 1.9, width: r * 3.8, height: r * 3.8, borderRadius: 9999, background: `radial-gradient(circle, ${glow} 0%, ${glow} 45%, rgba(0,0,0,0) 70%)` }} />
    <div style={{ position: "absolute", left: cx - r, top: cy - r, width: 2 * r, height: 2 * r, borderRadius: 9999, background: `radial-gradient(circle, ${core} 0%, ${edge} 78%)`, border: `6px solid ${INK}`, boxSizing: "border-box" }} />
  </>
);
const Shards: React.FC<{ f: number; a: number; y: number; n?: number; speed?: number }> = ({ f, a, y, n = 16, speed = 1 }) => (
  <>{Array.from({ length: n }, (_, i) => { const ph = (((f - a) / 30) * 0.9 * speed + i / n) % 1; const x = 380 + 700 * ph; const yy = y + ((i * 53) % 260) - 130; return <svg key={i} style={{ position: "absolute", left: x, top: yy, overflow: "visible", opacity: ph < 0.95 ? 1 : 0 }} width="1" height="1"><path d="M0 0 L34 -10 L14 12 Z" fill="#BFDBFE" stroke={INK} strokeWidth="3" /></svg>; })}</>
);
const Thermo: React.FC<{ x: number; k: number; label: string; color: string; max?: number; f: number; a: number }> = ({ x, k, label, color, max = 5000, f, a }) => {
  const fill = r(f, a, a + 18, 0, k / max);
  return (<>
    <div style={{ position: "absolute", left: x - 34, top: 770, width: 68, height: 360, borderRadius: 34, border: "6px solid #E2E8F0", background: "#0B1020", overflow: "hidden", boxSizing: "border-box" }}><div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: `${fill * 100}%`, background: color }} /></div>
    <div style={{ position: "absolute", left: x - 52, top: 1100, width: 104, height: 104, borderRadius: 99, background: color, border: "6px solid #E2E8F0", boxSizing: "border-box" }} />
    <T x={x - 200} y={1212} w={400} size={44} color="#FFFFFF">{label}</T>
  </>);
};
const SC: Record<string, React.FC<Ctx>> = {
  // ---- Short 1: HD 189733 b sideways glass ----
  g_stand: ({ f, b0 }) => (<><T y={UP} size={84} color={YELLOW}>IF YOU STOOD THERE...</T><Pl n={1} x={720} y={1010} size={480} /><Shards f={f} a={b0 - 20} y={1010} n={20} speed={1.8} /></>),
  g_burn: ({ w }) => (<><Count y={UP} size={150} color={ACCENT.red} a={w(90.74)} b={w(91.6)} from={0} to={1700} fmt={(v) => `${Math.round(v).toLocaleString("en-US")}°F`} /><Pl n={1} x={720} y={1080} size={420} look={{ glow: "#F97316" }} /></>),
  g_shred: ({ f, b0, w }) => (<><T y={UP} size={84} color={ACCENT.red}>FLYING GLASS</T><Pl n={1} x={720} y={1010} size={420} /><Shards f={f} a={b0} y={1010} n={30} speed={2.4} /><Stamp x={400} y={1110} at={w(92.40)} text="SHREDDED" size={68} /></>),
  g_gap: () => (<><T y={UP} size={80}>HD 189733 b</T><Pl n={1} x={720} y={1010} size={480} /></>),
  g_winds: ({ f, b0 }) => (<><T y={UP} size={84} color={YELLOW}>SUPERSONIC WINDS</T><Pl n={1} x={720} y={1010} size={480} />{[0, 1, 2, 3].map((i) => <Arrow key={i} x1={400} y1={860 + i * 100} x2={400 + 640 * r(f, b0 + i * 3, b0 + i * 3 + 10)} y2={860 + i * 100} color={ACCENT.red} w={14} />)}</>),
  g_mph: ({ w }) => (<><Count y={UP} size={150} color={ACCENT.red} a={w(71.28)} b={w(72.66)} from={0} to={5400} fmt={(v) => Math.round(v).toLocaleString("en-US")} /><T x={400} w={640} y={UP + 165} size={64}>MILES PER HOUR</T><Pl n={1} x={720} y={1110} size={360} />{[0, 1, 2].map((i) => <Arrow key={i} x1={420} y1={1010 + i * 100} x2={1040} y2={1010 + i * 100} color={ACCENT.red} w={14} />)}</>),
  g_sound: () => (<><T y={UP} size={150} color={ACCENT.red} mono>≈ 7×</T><T x={400} w={640} y={UP + 165} size={58}>THE SPEED OF SOUND</T><Pl n={1} x={720} y={1110} size={360} />{[0, 1, 2].map((i) => <Arrow key={i} x1={420} y1={1010 + i * 100} x2={1040} y2={1010 + i * 100} color={ACCENT.red} w={14} />)}</>),
  g_storm: ({ f, b0 }) => (<><T y={UP} size={84}>IN THOSE STORMS...</T><Pl n={1} x={720} y={1010} size={480} />{Array.from({ length: 14 }, (_, i) => { const ph = (((f - b0) / 30) * 0.8 + i / 14) % 1; return <div key={i} style={{ position: "absolute", left: 420 + 620 * ph, top: 820 + ((i * 41) % 380), width: 22, height: 22, borderRadius: 99, background: "#93C5FD", opacity: 0.85 }} />; })}</>),
  g_vapor: ({ f, b0 }) => (<><T y={UP} size={84} color={YELLOW}>SILICATE VAPOR...</T><Pl n={1} x={720} y={1010} size={480} />{Array.from({ length: 14 }, (_, i) => { const ph = (((f - b0) / 30) * 0.8 + i / 14) % 1; return <div key={i} style={{ position: "absolute", left: 420 + 620 * ph, top: 820 + ((i * 41) % 380), width: 22, height: 22, borderRadius: 99, background: "#E2E8F0", opacity: 0.85 }} />; })}</>),
  g_glass: ({ f, b0 }) => (<><T y={UP} size={110} color="#BFDBFE">MOLTEN GLASS</T><Pl n={1} x={720} y={1010} size={480} /><Shards f={f} a={b0} y={1010} /></>),
  g_side: ({ f, b0 }) => (<><T y={UP} size={110} color={ACCENT.red}>SIDEWAYS!</T><Arrow x1={380} y1={1240} x2={1040} y2={1240} color={ACCENT.red} w={18} /><Shards f={f} a={b0} y={1000} n={22} speed={1.6} /></>),
  g_sand: ({ f, b0 }) => (<><T y={UP} size={84}>A SANDBLASTER...</T><Shards f={f} a={b0} y={1000} n={28} speed={2} /><Arrow x1={380} y1={1240} x2={1040} y2={1240} color={ACCENT.red} w={18} /></>),
  g_razor: ({ f, b0 }) => (<><T y={UP} size={84} color={ACCENT.red}>...OF RAZOR BLADES</T><Shards f={f} a={b0} y={1000} n={30} speed={2.2} /></>),
  // ---- Short 2: KELT-9b ----
  k_rule: () => (<><T y={UP} size={84}>PLANETS ARE COOLER</T><T y={UP + 95} size={84}>THAN STARS...</T><StarV cx={860} cy={1050} r={180} /><Pl n={9} x={520} y={1080} size={120} /></>),
  k_cool: ({ f, w }) => (<><T y={UP} size={84} color={YELLOW}>COOLER. ALWAYS.</T><Thermo x={560} k={1500} label="PLANET" color="#60A5FA" f={f} a={w(227.08)} /><Thermo x={860} k={5800} max={6000} label="STAR" color={ACCENT.amber} f={f} a={w(227.08)} /></>),
  k_deal: ({ f, w }) => (<><T y={UP} size={84}>THAT&apos;S THE DEAL</T><Thermo x={560} k={1500} label="PLANET" color="#60A5FA" f={f} a={w(227.08) - 18} /><Thermo x={860} k={5800} max={6000} label="STAR" color={ACCENT.amber} f={f} a={w(227.08) - 18} /></>),
  k_memo: ({ w }) => (<><T y={UP} size={110} color={ACCENT.red}>KELT-9b</T><T x={400} w={640} y={UP + 125} size={56}>DIDN&apos;T GET THE MEMO</T><Pl n={4} x={720} y={1080} size={380} look={{ glow: "#93C5FD" }} /><Stamp x={430} y={1150} at={w(230.86)} text="RULE BROKEN" size={52} /></>),
  k_day: () => (<><T y={UP} size={84}>ITS DAYSIDE...</T><StarV cx={1000} cy={1020} r={150} core="#FFFFFF" edge="#93C5FD" glow="rgba(147,197,253,0.55)" /><Pl n={4} x={640} y={1060} size={300} /></>),
  k_4600: ({ w }) => (<><Count y={UP} size={150} color={ACCENT.amber} a={w(252.32)} b={w(253.58)} from={0} to={4600} fmt={(v) => `${Math.round(v).toLocaleString("en-US")} K`} /><StarV cx={1000} cy={1040} r={150} core="#FFFFFF" edge="#93C5FD" glow="rgba(147,197,253,0.55)" /><Pl n={4} x={640} y={1080} size={300} look={{ glow: ACCENT.amber }} /></>),
  k_f: () => (<><T y={UP} size={150} color={ACCENT.amber} mono>≈ 7,800°F</T><Pl n={4} x={720} y={1080} size={380} look={{ glow: ACCENT.amber }} /></>),
  k_dwarf: ({ f, w }) => (<><T y={UP} size={70} color="#F87171">HOTTER THAN RED DWARFS</T><Thermo x={560} k={3500} label="RED DWARF" color="#F87171" f={f} a={w(259.54)} /></>),
  k_win: ({ f, w }) => (<><T y={UP} size={110} color={ACCENT.amber}>PLANET WINS</T><Thermo x={560} k={3500} label="RED DWARF" color="#F87171" f={f} a={w(259.54) - 30} /><Thermo x={860} k={4600} label="KELT-9b" color={ACCENT.amber} f={f} a={w(259.54)} /></>),
  // ---- Short 3: Halla ----
  h_meet: ({ f }) => { const a = -0.9 + (f / 30) * 0.12; return (<><T y={UP} size={110}>THIS IS HALLA</T><StarV cx={720} cy={1040} r={110} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.5)" /><Ring cx={720} cy={1040} R={230} /><Pl n={10} x={720 + Math.cos(a) * 230} y={1040 + Math.sin(a) * 230} size={80} /></>); },
  h_name: ({ f }) => { const a = -0.9 + (f / 30) * 0.12; return (<><T y={UP} size={110}>8 UMi b</T><T y={UP + 120} size={56} color="#CBD5E1">NICKNAME: HALLA</T><StarV cx={720} cy={1110} r={110} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.5)" /><Ring cx={720} cy={1110} R={210} /><Pl n={10} x={720 + Math.cos(a) * 210} y={1110 + Math.sin(a) * 210} size={80} /></>); },
  h_model: ({ f }) => { const a = -0.9 + (f / 30) * 0.12; return (<><T y={UP} size={80}>BY EVERY NORMAL</T><T y={UP + 90} size={80} color={YELLOW}>MODEL OF STARS...</T><StarV cx={720} cy={1080} r={110} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.5)" /><Ring cx={720} cy={1080} R={230} /><Pl n={10} x={720 + Math.cos(a) * 230} y={1080 + Math.sin(a) * 230} size={80} /></>); },
  h_dust: ({ f, b0, w }) => (<><T y={UP} size={110} color={ACCENT.red}>...IT&apos;S DUST</T>{Array.from({ length: 22 }, (_, i) => { const k = r(f, b0, b0 + 30); const ang = (i / 22) * Math.PI * 2; return <div key={i} style={{ position: "absolute", left: 720 + Math.cos(ang) * 160 * k - 8, top: 1060 + Math.sin(ang) * 160 * k - 8, width: 16, height: 16, borderRadius: 99, background: "#FB923C", opacity: 1 - 0.6 * k }} />; })}<Stamp x={380} y={1090} at={w(637.16)} text="SHOULD BE GONE" size={46} /></>),
  h_phys: () => (<><T y={UP} size={84}>ITS STAR: BAEKDU</T><T y={UP + 95} size={56} color="#FB923C">A RED GIANT</T><StarV cx={720} cy={1080} r={130} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.5)" /><Ring cx={720} cy={1080} R={230} /><Pl n={10} x={720 + Math.cos(-0.9) * 230} y={1080 + Math.sin(-0.9) * 230} size={80} /></>),
  h_swell: ({ f, b0, b1 }) => { const R = r(f, b0, b1, 130, 260, Easing.inOut(Easing.cubic)); return (<><Swell cx={720} cy={1150} R={R} /><Ring cx={720} cy={1150} R={200} /><Pl n={10} x={720 + Math.cos(-0.9) * 200} y={1150 + Math.sin(-0.9) * 200} size={80} /><T y={UP} size={84} color={ACCENT.red}>BAEKDU SWELLS...</T></>); },
  h_15: ({ f, b0 }) => { const R = r(f, b0, b0 + 30, 260, 300, Easing.inOut(Easing.cubic)); return (<><Swell cx={720} cy={1150} R={R} /><Ring cx={720} cy={1150} R={200} /><Pl n={10} x={720 + Math.cos(-0.9) * 200} y={1150 + Math.sin(-0.9) * 200} size={80} /><T y={UP} size={150} color={ACCENT.red} mono>1.5×</T><T x={400} w={640} y={UP + 165} size={56}>HALLA&apos;S ORBIT</T></>); },
  h_swallow: () => (<><Swell cx={720} cy={1150} R={300} /><Ring cx={720} cy={1150} R={200} /><Pl n={10} x={720 + Math.cos(-0.9) * 200} y={1150 + Math.sin(-0.9) * 200} size={80} /><T y={UP} size={76}>SWALLOWING IT WHOLE</T></>),
  h_check: ({ f, b0 }) => { const R = r(f, b0 + 6, b0 + 40, 300, 130, Easing.inOut(Easing.cubic)); return (<><Swell cx={720} cy={1150} R={R} /><Ring cx={720} cy={1150} R={200} /><Pl n={10} x={720 + Math.cos(-0.9) * 200} y={1150 + Math.sin(-0.9) * 200} size={80} /><T y={UP} size={80} color={YELLOW}>WHEN THEY CHECKED...</T></>); },
  h_still: ({ f, w }) => { const a = -0.9 + (f / 30) * 0.2; return (<><T y={UP} size={110} color={ACCENT.amber}>STILL THERE!</T><StarV cx={720} cy={1100} r={130} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.5)" /><Ring cx={720} cy={1100} R={230} /><Pl n={10} x={720 + Math.cos(a) * 230} y={1100 + Math.sin(a) * 230} size={100} /><Stamp x={720} y={830} at={w(669.10)} text="ALIVE" size={52} color={ACCENT.amber} rot={8} /></>); },
  h_how: () => (<><T y={UP} size={160} color="#FFFFFF">HOW?!</T><StarV cx={720} cy={1100} r={130} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.5)" /><Ring cx={720} cy={1100} R={230} /><Pl n={10} x={720 + Math.cos(-0.6) * 230} y={1100 + Math.sin(-0.6) * 230} size={100} /></>),
};
const Ring: React.FC<{ cx: number; cy: number; R: number }> = ({ cx, cy, R }) => <div style={{ position: "absolute", left: cx - R, top: cy - R, width: 2 * R, height: 2 * R, borderRadius: 9999, border: "7px dashed #FFFFFF", boxSizing: "border-box" }} />;
const Swell: React.FC<{ cx: number; cy: number; R: number }> = ({ cx, cy, R }) => (<>
  <div style={{ position: "absolute", left: cx - R * 1.25, top: cy - R * 1.25, width: R * 2.5, height: R * 2.5, borderRadius: 9999, background: "radial-gradient(circle, rgba(229,57,53,0.45) 0%, rgba(229,57,53,0.45) 55%, rgba(0,0,0,0) 72%)" }} />
  <div style={{ position: "absolute", left: cx - R, top: cy - R, width: 2 * R, height: 2 * R, borderRadius: 9999, background: "radial-gradient(circle, #FED7AA 0%, #E53935 55%, #991B1B 100%)", opacity: 0.92 }} />
</>);

// characters that are already the faller in Short 2 (no extra standing character there)
const FALLER = new Set<string>([]);

const BeatView: React.FC<{ c: ShortCfg; i: number; b0: number; b1: number }> = ({ c, i, b0, b1 }) => {
  const f = useCurrentFrame();
  const beat: Beat = c.beats[i];
  const w = (src: number) => fr(c, src);
  const pop = r(f, b0, b0 + 8, 0.92, 1, Easing.out(Easing.back(2.2)));                  // Card Pop on the cut
  const s1 = beat.snap !== undefined ? r(f, w(beat.snap), w(beat.snap) + 6, 1, 1.1) : 1; // Snap Zoom on the key word
  const s2 = beat.snap2 !== undefined ? r(f, w(beat.snap2), w(beat.snap2) + 6, 1, 1.08) : 1;
  const push = r(f, b0, b1, 1, 1.025, Easing.linear);                                    // never fully static
  const Scene = SC[beat.scene];
  return (
    <>
      <AbsoluteFill style={{ scale: `${pop * s1 * s2 * push}`, transformOrigin: "60% 34%" }}>
        <Scene f={f} b0={b0} b1={b1} w={w} />
      </AbsoluteFill>
      {FALLER.has(beat.scene) ? null : (
        <div style={{ position: "absolute", inset: 0, scale: `${s1 * s2}`, transformOrigin: "20% 70%" }}>
          <CharacterRig key={`${i}-${beat.pose}`} mode="space" pose={beat.pose as "explaining"} x={200} bottom={1290} height={380} enterAt={b0} />
        </div>
      )}
    </>
  );
};


// Covers (channel page / search): one big moment filling y 650–1700, big shocked character, no captions.
const CoverChar: React.FC<{ pose?: string }> = ({ pose = "shocked" }) => (
  <Img src={staticFile(`assets/character/space/${pose}.png`)} style={{ position: "absolute", left: -30, top: 1060, height: 640 }} />
);
const CoverView: React.FC<{ id: string }> = ({ id }) => {
  if (id === "Short1-GlassRain") return (<>
    <T y={665} size={170} color={ACCENT.red} mono>5,400</T><T x={430} w={620} y={850} size={66}>MPH WINDS</T>
    <Pl n={1} x={700} y={1260} size={640} />
    <Shards f={14} a={0} y={1230} n={34} speed={1} />
    {[0, 1, 2].map((k) => <Arrow key={k} x1={380} y1={1050 + k * 210} x2={1050} y2={1050 + k * 210} color={ACCENT.red} w={16} />)}
    <Stamp x={470} y={1560} at={0} text="GLASS!" size={64} />
    <CoverChar />
  </>);
  if (id === "Short2-HotterThanStar") return (<>
    <T y={665} size={170} color={ACCENT.amber} mono>4,600 K</T>
    <Pl n={4} x={700} y={1180} size={600} look={{ glow: "#93C5FD" }} />
    <T x={430} w={540} y={1500} size={50} color="#FFFFFF">KELT-9b</T>
    <StarV cx={960} cy={1600} r={64} core="#FCA5A5" edge="#DC2626" glow="rgba(220,38,38,0.45)" />
    <T x={760} w={400} y={1440} size={40} color="#F87171">RED DWARF</T>
    <CoverChar />
  </>);
  return (<>
    <T y={665} size={160} color="#FFFFFF">HOW?!</T>
    <div style={{ position: "absolute", left: 700 - 400, top: 1200 - 400, width: 800, height: 800, borderRadius: 9999, background: "radial-gradient(circle, rgba(234,88,12,0.55) 0%, rgba(234,88,12,0.3) 40%, rgba(0,0,0,0) 70%)" }} />
    <div style={{ position: "absolute", left: 700 - 340, top: 1200 - 340, width: 680, height: 680, borderRadius: 9999, border: `9px dashed ${ACCENT.red}`, boxSizing: "border-box" }} />
    <StarV cx={700} cy={1200} r={150} core="#FED7AA" edge="#EA580C" glow="rgba(234,88,12,0.5)" />
    <div style={{ position: "absolute", left: 700 - 250, top: 1200 - 250, width: 500, height: 500, borderRadius: 9999, border: "5px dashed #E2E8F0", boxSizing: "border-box" }} />
    <Pl n={10} x={700 + 250 * Math.cos(-0.45)} y={1200 + 250 * Math.sin(-0.45)} size={130} />
    <Stamp x={690} y={870} at={0} text="ALIVE" size={60} color={ACCENT.amber} rot={8} />
    <CoverChar />
  </>);
};
export const ShortVideo: React.FC<{ id: string; cover?: boolean }> = ({ id, cover }) => {
  const f = useCurrentFrame();
  const c = SHORTS.find((s) => s.id === id)!;
  const total = Math.round(shortDuration(c) * FPS);
  const starts = c.beats.map((b) => fr(c, b.src)).concat([total]);
  let i = 0; while (i < c.beats.length - 1 && f >= starts[i + 1]) i++;
  return (
    <AbsoluteFill>
      <Stars />
      {cover ? <CoverView id={id} /> : <BeatView key={i} c={c} i={i} b0={starts[i]} b1={starts[i + 1]} />}
      <Banner lines={c.banner} size={c.bannerSize} />
      {cover ? null : <Captions c={c} />}
      {cover ? null : <EndCue total={total} />}
    </AbsoluteFill>
  );
};
export { SHORTS, shortDuration };
