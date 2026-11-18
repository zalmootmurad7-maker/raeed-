import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import TS from "../../public/audio/timestamps.json";
import { ACCENT, FONT, SPACE } from "../tokens";
import { CharacterRig } from "../components/CharacterRig";
import { Icon_Atom, Icon_BlackHole_Small, Icon_SolarSystem } from "../components/Icons";
import { Mountain, Whale } from "../components/Props";
import { FPS, SHORTS, ShortCfg, shortDuration, toLocal } from "./shortsConfig";

// 1080x1920 layout. YouTube Shorts UI: keep everything inside y 230–1560, x 40–960 (right rail starts ~x 960 low down).
const W = 1080;
const YELLOW = "#FACC15";
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const r = (f: number, a: number, b: number, from = 0, to = 1, e = Easing.out(Easing.cubic)) => interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: e });

type Word = { word: string; start: number; end: number };
const ALL: Word[] = (TS as unknown as { words: Word[] }).words;
const merged: Word[] = ALL.reduce<Word[]>((acc, w) => { if (acc.length && /^[.,']/.test(w.word)) { const p = acc[acc.length - 1]; acc[acc.length - 1] = { word: p.word + w.word, start: p.start, end: w.end }; } else acc.push({ ...w }); return acc; }, []);
const localWords = (c: ShortCfg) => merged.map((w) => ({ ...w, ls: toLocal(c, w.start + 0.01), le: toLocal(c, w.end - 0.01) })).filter((w) => w.ls !== null) as (Word & { ls: number; le: number })[];
const wAt = (c: ShortCfg, src: number) => Math.round((toLocal(c, src) ?? 0) * FPS); // frame of a source time

// ---------- shared pieces ----------
const Stars: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: SPACE.bg }}>
    {Array.from({ length: 90 }, (_, i) => { const q = (n: number) => { const v = Math.sin((i + 1) * 91.7 * n) * 10000; return v - Math.floor(v); }; return <div key={i} style={{ position: "absolute", left: q(1) * W, top: q(2) * 1920, width: 3, height: 3, borderRadius: 9, background: "#F6F4EF", opacity: 0.25 + q(3) * 0.5 }} />; })}
  </AbsoluteFill>
);
const Banner: React.FC<{ lines: string[]; size: number }> = ({ lines, size }) => {
  const f = useCurrentFrame();
  const k = r(f, 0, 9, 1.06, 1); // punch-in from frame 0, fully readable at frame 0
  return (
    <div style={{ position: "absolute", left: 50, top: 240, width: 980, padding: "26px 20px 30px", background: YELLOW, border: `7px solid #141824`, borderRadius: 34, boxShadow: "10px 10px 0 #141824", textAlign: "center", scale: `${k}`, transformOrigin: "50% 0%", boxSizing: "border-box" }}>
      {lines.map((l, i) => (
        <div key={i} style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: Math.min(size, 900 / (l.length * 0.6)), lineHeight: 1.0, color: "#141824", letterSpacing: -2, whiteSpace: "nowrap" }}>{l}</div>
      ))}
    </div>
  );
};
const Captions: React.FC<{ c: ShortCfg }> = ({ c }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const ws = localWords(c);
  // phrases: break on punctuation or every 4 words
  const phrases: (typeof ws)[] = [];
  let cur: typeof ws = [];
  ws.forEach((w) => { cur.push(w); if (/[.,?!]$/.test(w.word) || cur.length >= 4) { phrases.push(cur); cur = []; } });
  if (cur.length) phrases.push(cur);
  const p = phrases.find((ph, i) => t >= ph[0].ls - 0.05 && t < (phrases[i + 1] ? phrases[i + 1][0].ls - 0.05 : ph[ph.length - 1].le + 0.4));
  if (!p) return null;
  return (
    <div style={{ position: "absolute", left: 60, width: 960, top: 1290, textAlign: "center" }}>
      <span style={{ display: "inline-block", background: "rgba(6,9,17,0.88)", borderRadius: 18, padding: "12px 24px", fontFamily: FONT.head, fontWeight: 700, fontSize: 64, lineHeight: 1.15, letterSpacing: -0.5 }}>
        {p.map((w, i) => <span key={i} style={{ color: t >= w.ls ? YELLOW : "#FFFFFF" }}>{w.word.replace(/^(\d)\s?/, "$1").toUpperCase()}{i < p.length - 1 ? " " : ""}</span>)}
      </span>
    </div>
  );
};
const EndCue: React.FC<{ total: number }> = ({ total }) => {
  const f = useCurrentFrame();
  const a = total - 2.2 * FPS;
  if (f < a) return null;
  const k = r(f, a, a + 8, 0, 1, Easing.out(Easing.back(1.8)));
  return (
    <div style={{ position: "absolute", left: 0, width: W, top: 1480, textAlign: "center", opacity: r(f, a, a + 5), scale: `${0.9 + 0.1 * k}` }}>
      <span style={{ display: "inline-block", background: ACCENT.red, color: "#FFFFFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 46, padding: "10px 30px", borderRadius: 999, border: "5px solid #141824" }}>Full video linked below ↓</span>
    </div>
  );
};
const T: React.FC<{ x: number; y: number; size: number; color: string; w?: number; mono?: boolean; children: React.ReactNode; o?: number; s?: number }> = ({ x, y, size, color, w = 960, mono, children, o = 1, s = 1 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: "center", fontFamily: mono ? FONT.mono : FONT.head, fontWeight: 700, fontSize: size, color, lineHeight: 1.05, opacity: o, scale: `${s}`, fontVariantNumeric: "tabular-nums", letterSpacing: mono ? 0 : -1 }}>{children}</div>
);
const Burst: React.FC<{ x: number; y: number; at: number; R: number }> = ({ x, y, at, R }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = r(f, at, at + 14), o = 1 - r(f, at + 10, at + 30);
  return (
    <svg style={{ position: "absolute", left: x - R * 1.4, top: y - R * 1.4, opacity: o, overflow: "visible" }} width={R * 2.8} height={R * 2.8}>
      <circle cx={R * 1.4} cy={R * 1.4} r={R * k} fill={ACCENT.amber} opacity={0.35} />
      {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <line key={i} x1={R * 1.4 + Math.cos(a) * R * 0.4 * k} y1={R * 1.4 + Math.sin(a) * R * 0.4 * k} x2={R * 1.4 + Math.cos(a) * R * 1.3 * k} y2={R * 1.4 + Math.sin(a) * R * 1.3 * k} stroke={ACCENT.amber} strokeWidth={14} strokeLinecap="round" />; })}
      <circle cx={R * 1.4} cy={R * 1.4} r={R * 0.45 * k} fill="#FFF8E1" />
    </svg>
  );
};
const Ring: React.FC<{ cx: number; cy: number; R: number; color?: string; glow?: number; fire?: boolean }> = ({ cx, cy, R, color = ACCENT.amber, glow = 0.3, fire }) => (
  <div style={{ position: "absolute", left: cx - R, top: cy - R, width: 2 * R, height: 2 * R, borderRadius: 9999, background: "#05070C", border: `${Math.max(6, R * 0.07)}px solid ${color}`, boxShadow: `0 0 ${R * 0.25}px ${R * 0.08}px rgba(245,158,11,${glow})${fire ? `, 0 0 ${R * 0.5}px ${R * 0.15}px rgba(239,68,68,0.55)` : ""}`, boxSizing: "border-box" }} />
);

// ---------- Short 1: Everest -> 0.24 pm, 230 t -> boom in 1 s ----------
const Scene1: React.FC<{ c: ShortCfg }> = ({ c }) => {
  const f = useCurrentFrame();
  const fEverest = wAt(c, 11.6), fCrush = wAt(c, 13.82), fBall = wAt(c, 15.96), fPm = wAt(c, 17.08);
  const fMtn = wAt(c, 56.22), f230 = wAt(c, 60.72), fBlow = wAt(c, 64.84);
  const CY = 930;
  if (f < fEverest) {
    return (<>
      <div style={{ position: "absolute", left: 540 - 260, top: CY - 260 }}><Icon_Atom size={520} ink="#E2E8F0" /></div>
      <div style={{ position: "absolute", left: 130, top: CY + 150, width: 34, height: 34, borderRadius: 99, background: "#05070C", border: `5px solid ${ACCENT.amber}`, boxShadow: "0 0 18px 6px rgba(245,158,11,0.6)" }} />
      <T x={40} y={CY + 200} size={50} color={ACCENT.amber} w={420}>MICRO BLACK HOLE</T>
    </>);
  }
  if (f < fMtn) {
    const k = r(f, fCrush, fBall, 0, 1, Easing.in(Easing.cubic));
    return (<>
      <div style={{ position: "absolute", left: 540 - 260, top: CY - 250, scale: `${1 - 0.985 * k} ${1 - 0.995 * k}`, transformOrigin: "50% 100%", opacity: 1 - r(f, fBall - 3, fBall + 2) }}><Mountain size={520} ink="#E2E8F0" /></div>
      {f >= fBall - 2 ? <div style={{ position: "absolute", left: 540 - 14, top: CY + 60 - 14, width: 28, height: 28, borderRadius: 99, background: ACCENT.blue, boxShadow: "0 0 40px 18px rgba(37,99,235,0.6)" }} /> : null}
      <T x={60} y={640} size={58} color="#E2E8F0" o={r(f, fEverest, fEverest + 8)}>MOUNT EVEREST → ?</T>
      {f >= fPm ? <T x={60} y={CY + 140} size={110} color={ACCENT.amber} mono s={r(f, fPm, fPm + 8, 1.5, 1)}>r = 0.24 pm</T> : null}
    </>);
  }
  const boom = f >= fBlow;
  return (<>
    <div style={{ position: "absolute", left: 70, top: 620 }}><Mountain size={230} ink="#E2E8F0" /></div>
    <div style={{ position: "absolute", left: 162, top: 860 }}><Icon_BlackHole_Small size={46} /></div>
    <div style={{ position: "absolute", left: 50, top: 935, rotate: "-4deg", border: `5px solid ${ACCENT.blue}`, color: ACCENT.blue, fontFamily: FONT.head, fontWeight: 700, fontSize: 30, padding: "4px 12px", borderRadius: 10, opacity: r(f, fMtn + 20, fMtn + 26), whiteSpace: "nowrap" }}>OUTLIVES THE UNIVERSE</div>
    {f >= f230 && !boom ? <div style={{ position: "absolute", left: 470, top: 630, scale: `${r(f, f230, f230 + 9, 0.9, 1)}` }}><Whale size={500} ink="#E2E8F0" /></div> : null}
    {f >= f230 ? <T x={470} y={930} size={96} color="#FFFFFF" w={540} mono>~230 t</T> : null}
    <Burst x={720} y={770} at={fBlow} R={260} />
    {boom ? <T x={380} y={1100} size={104} color={ACCENT.amber} w={680} mono s={r(f, fBlow + 2, fBlow + 9, 1.6, 1)}>≈ 1 SECOND</T> : null}
    {boom ? <CharacterRig mode="space" pose="shocked" x={190} bottom={1280} height={300} enterAt={fBlow} /> : null}
  </>);
};

// ---------- Short 2: bigger = gentler edge ----------
const Astro: React.FC<{ pose: string; x: number; y: number; h: number; sx?: number; sy?: number }> = ({ pose, x, y, h, sx = 1, sy = 1 }) => {
  const f = useCurrentFrame();
  const fl = Math.sin((f / 30) * ((2 * Math.PI) / 6)) * 5;
  return <Img src={staticFile(`assets/character/space/${pose}.png`)} style={{ position: "absolute", left: x, top: y, height: h, scale: `${sx} ${sy}`, transformOrigin: "50% 100%", translate: `-50% ${fl}px` }} />;
};
const Scene2: React.FC<{ c: ShortCfg }> = ({ c }) => {
  const f = useCurrentFrame();
  const fFall1 = wAt(c, 337.26), fSpag = wAt(c, 339.32), fFall2 = wAt(c, 342.94), fUntil = wAt(c, 348.30), fLate = wAt(c, 349.78);
  const CY = 930;
  if (f < fFall1) {
    return (<>
      <div style={{ position: "absolute", left: 160, top: CY - 30 }}><Icon_BlackHole_Small size={90} /></div>
      <T x={60} y={CY + 90} size={48} color="#E2E8F0" w={380}>SMALL</T>
      <Ring cx={740} cy={CY + 20} R={250} />
      <T x={500} y={CY + 300} size={48} color="#E2E8F0" w={480}>SUPERMASSIVE</T>
      <T x={60} y={630} size={72} color={ACCENT.amber} o={r(f, wAt(c, 334.28), wAt(c, 334.28) + 8)}>GENTLER EDGE?!</T>
    </>);
  }
  if (f < fFall2) {
    const st = r(f, fSpag - 6, fSpag + 18, 1, 1.6);
    return (<>
      <div style={{ position: "absolute", left: 540 - 60, top: CY + 220 }}><Icon_BlackHole_Small size={120} /></div>
      <Astro pose="shocked" x={540} y={CY + 230 - 280} h={280} sx={1 / Math.sqrt(st)} sy={st} />
      <T x={60} y={630} size={56} color="#E2E8F0">SMALL BLACK HOLE</T>
      {f >= fSpag ? <div style={{ position: "absolute", left: 590, top: CY + 60, rotate: "-8deg", border: `7px solid ${ACCENT.red}`, color: ACCENT.red, fontFamily: FONT.head, fontWeight: 700, fontSize: 64, padding: "6px 20px", borderRadius: 12, scale: `${r(f, fSpag, fSpag + 6, 1.8, 1)}` }}>SPAGHETTI</div> : null}
    </>);
  }
  const x = r(f, fFall2 + 10, fUntil, 260, 700, Easing.inOut(Easing.sin));
  return (<>
    <Ring cx={1300} cy={CY} R={600} glow={0.35} />
    <svg style={{ position: "absolute", left: 640, top: 600 }} width="20" height="540"><line x1="10" y1="0" x2="10" y2="540" stroke={ACCENT.red} strokeWidth="9" strokeDasharray="26 18" /></svg>
    <T x={330} y={1160} size={44} color={ACCENT.red} w={300}>EVENT HORIZON</T>
    <Astro pose={f >= fUntil ? "shocked" : "explaining"} x={x} y={CY - 180} h={380} />
    <T x={60} y={620} size={52} color="#E2E8F0" w={560} o={f < fUntil ? 1 : 0}>SUPERMASSIVE: YOU DON'T EVEN NOTICE…</T>
    {f >= fLate ? <T x={60} y={620} size={110} color="#FFFFFF" s={r(f, fLate, fLate + 7, 1.6, 1)}>NO WAY BACK</T> : null}
  </>);
};

// ---------- Short 3: TON 618 + 40 Solar Systems + Phoenix A ----------
const Count: React.FC<{ from: number; to: number; a: number; b: number; fmt: (v: number) => string; y: number; size: number; color: string }> = ({ from, to, a, b, fmt, y, size, color }) => {
  const f = useCurrentFrame();
  return <T x={60} y={y} size={size} color={color} mono>{fmt(r(f, a, b, from, to, Easing.out(Easing.quad)))}</T>;
};
const Scene3: React.FC<{ c: ShortCfg }> = ({ c }) => {
  const f = useCurrentFrame();
  const f66 = wAt(c, 371.02), fLine = wAt(c, 380.58), fAcross = wAt(c, 386.0), fPhx = wAt(c, 387.6), f100 = wAt(c, 392.12);
  const CY = 900;
  if (f < fPhx) {
    const shown = f < fLine ? 0 : Math.min(40, Math.floor(r(f, fLine + 4, fAcross, 0, 40, Easing.linear)));
    return (<>
      <div style={{ position: "absolute", left: 540 - 470, top: CY - 190, width: 940, height: 420, borderRadius: "50%", background: "#05070C", border: `14px solid ${ACCENT.amber}`, boxShadow: "0 0 70px 18px rgba(245,158,11,0.35)", boxSizing: "border-box" }} />
      <T x={60} y={600} size={84} color="#FFFFFF">TON 618</T>
      {f >= f66 ? <Count from={1} to={66} a={f66} b={f66 + 24} fmt={(v) => `UP TO ${Math.round(v)} BILLION SUNS`} y={CY + 245} size={52} color={ACCENT.amber} /> : null}
      {Array.from({ length: 40 }, (_, i) => {
        const col = i % 10, row = Math.floor(i / 10);
        return <div key={i} style={{ position: "absolute", left: 540 - 380 + col * 84 - 26, top: CY - 135 + row * 74, opacity: i < shown ? 1 : 0 }}><Icon_SolarSystem size={52} ink="#E2E8F0" /></div>;
      })}
      {f >= fLine ? <T x={60} y={CY + 310} size={60} color="#FFFFFF" mono>× {String(shown).padStart(2, "0")} SOLAR SYSTEMS</T> : null}
    </>);
  }
  const g = r(f, fPhx, fPhx + 30, 0.7, 1);
  return (<>
    <Ring cx={540} cy={950} R={330 * g} fire glow={0.5} />
    <T x={60} y={700} size={84} color="#FFFFFF" o={r(f, fPhx, fPhx + 8)}>PHOENIX A</T>
    <div style={{ position: "absolute", left: 540 - 90, top: 850, width: 180, height: 80, borderRadius: "50%", border: `6px solid ${ACCENT.amber}`, opacity: 0.85, boxSizing: "border-box" }} />
    <T x={60} y={940} size={34} color="#94A3B8">TON 618</T>
    {f >= f100 ? <Count from={0} to={100} a={f100} b={f100 + 18} fmt={(v) => `${Math.round(v)}B SUNS`} y={1030} size={80} color={ACCENT.amber} /> : null}
    <CharacterRig mode="space" pose="shocked" x={150} bottom={1285} height={300} enterAt={fPhx} />
  </>);
};

const SCENES: Record<string, React.FC<{ c: ShortCfg }>> = { "Short1-230Tons": Scene1, "Short2-BiggerSafer": Scene2, "Short3-40SolarSystems": Scene3 };
export const ShortVideo: React.FC<{ id: string; cover?: boolean }> = ({ id, cover }) => {
  const c = SHORTS.find((s) => s.id === id)!;
  const total = Math.round(shortDuration(c) * FPS);
  const Scene = SCENES[id];
  return (
    <AbsoluteFill>
      <Stars />
      <Scene c={c} />
      <Banner lines={c.banner} size={c.bannerSize} />
      {cover ? null : <Captions c={c} />}
      {cover ? null : <EndCue total={total} />}
    </AbsoluteFill>
  );
};
export { SHORTS, shortDuration };
