import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import TS from "../../public/audio/timestamps.json";
import { ACCENT, FONT, SPACE } from "../tokens";
import { CharacterRig } from "../components/CharacterRig";
import { Icon_Atom, Icon_SolarSystem } from "../components/Icons";
import { Mountain } from "../components/Props";
import { Beat, FPS, SHORTS, ShortCfg, shortDuration, toLocal } from "./shortsConfig";

// v2 (owner, 2026-11-19): a new beat every 1.3–2.5 s (Card Pop on the cut + Snap Zoom on the key word),
// the character always on screen reacting, hook-first audio order. Safe zone y 240–1560.
const W = 1080, INK = "#141824", YELLOW = "#FACC15";
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const r = (f: number, a: number, b: number, from = 0, to = 1, e = Easing.out(Easing.cubic)) => interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: e });

type Word = { word: string; start: number; end: number };
const RAW: Word[] = (TS as unknown as { words: Word[] }).words;
const WORDS: Word[] = RAW.reduce<Word[]>((acc, w) => { if (acc.length && /^[.,']/.test(w.word)) { const p = acc[acc.length - 1]; acc[acc.length - 1] = { word: p.word + w.word, start: p.start, end: w.end }; } else acc.push({ ...w }); return acc; }, []);
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
const Hole: React.FC<{ cx: number; cy: number; R: number; color?: string; fire?: boolean; rx?: number }> = ({ cx, cy, R, color = ACCENT.amber, fire, rx }) => (
  <div style={{ position: "absolute", left: cx - (rx ?? R), top: cy - R, width: 2 * (rx ?? R), height: 2 * R, borderRadius: "50%", background: "#05070C", border: `${Math.max(5, R * 0.07)}px solid ${color}`, boxShadow: `0 0 ${Math.max(14, R * 0.25)}px ${Math.max(4, R * 0.08)}px rgba(245,158,11,0.35)${fire ? `, 0 0 ${R * 0.5}px ${R * 0.15}px rgba(239,68,68,0.55)` : ""}`, boxSizing: "border-box" }} />
);
const Burst: React.FC<{ x: number; y: number; at: number; R: number }> = ({ x, y, at, R }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = r(f, at, at + 12), o = 1 - r(f, at + 14, at + 34);
  return (
    <svg style={{ position: "absolute", left: x - R * 1.4, top: y - R * 1.4, opacity: o, overflow: "visible" }} width={R * 2.8} height={R * 2.8}>
      <circle cx={R * 1.4} cy={R * 1.4} r={R * k} fill={ACCENT.amber} opacity={0.4} />
      {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; return <line key={i} x1={R * 1.4 + Math.cos(a) * R * 0.45 * k} y1={R * 1.4 + Math.sin(a) * R * 0.45 * k} x2={R * 1.4 + Math.cos(a) * R * 1.3 * k} y2={R * 1.4 + Math.sin(a) * R * 1.3 * k} stroke={ACCENT.amber} strokeWidth={14} strokeLinecap="round" />; })}
      <circle cx={R * 1.4} cy={R * 1.4} r={R * 0.45 * k} fill="#FFF8E1" />
    </svg>
  );
};
// Bold whale silhouette, thick ink outline (owner: "cleaner, bolder whale").
const Whale: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <svg style={{ position: "absolute", left: x, top: y, overflow: "visible" }} width={w} height={w * 0.55} viewBox="0 0 200 110">
    <path d="M14 58 C14 30 46 18 92 18 C138 18 158 34 166 50 L188 30 C192 27 197 30 195 35 L184 60 L195 84 C197 89 192 92 188 89 L166 70 C156 88 130 100 90 100 C44 100 14 86 14 58 Z" fill="#60A5FA" stroke={INK} strokeWidth="7" strokeLinejoin="round" />
    <path d="M22 68 C40 90 120 96 158 74" fill="#BFDBFE" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M${40 + i * 22} ${80 + i * 1.5} L${48 + i * 22} ${92 - i}`} stroke={INK} strokeWidth="4" strokeLinecap="round" />)}
    <path d="M18 60 C40 66 60 66 78 62" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <circle cx="44" cy="46" r="5.5" fill={INK} /><circle cx="45.5" cy="44.5" r="1.8" fill="#FFF" />
    <path d="M84 10 C82 2 92 0 90 10 M96 10 C98 2 108 2 102 12" fill="none" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
const Astro: React.FC<{ pose: string; x: number; bottom: number; h: number; sx?: number; sy?: number; at: number }> = ({ pose, x, bottom, h, sx = 1, sy = 1, at }) => {
  const f = useCurrentFrame();
  const k = r(f, at, at + 10, 0.96, 1);
  const fl = Math.sin((f / 30) * ((2 * Math.PI) / 6)) * 5;
  return <Img src={staticFile(`assets/character/space/${pose}.png`)} style={{ position: "absolute", left: x, top: bottom - h, height: h, scale: `${sx * k} ${sy * k}`, transformOrigin: "50% 100%", translate: `-50% ${fl}px` }} />;
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

// Scene context: f = global frame, b0 = beat start frame, b1 = beat end frame, w(src) = frame of a source time.
type Ctx = { f: number; b0: number; b1: number; w: (src: number) => number };
const UP = 665; // top of the content zone (just under the banner)
const SC: Record<string, React.FC<Ctx>> = {
  // ---- Short 1 ----
  shrink: ({ f, b0, b1 }) => (<>
    <Hole cx={700} cy={1010} R={r(f, b0, b1, 300, 110, Easing.inOut(Easing.cubic))} />
    {[[700, 640, 700, 760], [700, 1290, 700, 1170], [380, 1010, 500, 1010], [1020, 1010, 900, 1010]].map(([a, b, c, d], i) => <Arrow key={i} x1={a} y1={b} x2={c} y2={d} color={YELLOW} />)}
  </>),
  tons: ({ f, b0 }) => (<>
    <Hole cx={720} cy={1050} R={110} />
    <T y={UP} size={170} mono>~230 t</T>
    <T y={UP + 190} size={48} color="#CBD5E1">A TINY BLACK HOLE</T>
  </>),
  whale: () => (<>
    <T y={UP} size={110} mono>~230 t</T>
    <Whale x={400} y={820} w={600} />
    <T x={400} y={1170} w={600} size={52} color={YELLOW}>= 1 BLUE WHALE</T>
  </>),
  boom: ({ f, w }) => (<>
    <T y={UP} size={110} mono>~230 t</T>
    {f < w(64.84) ? <Whale x={400} y={820} w={600} /> : null}
    <Hole cx={700} cy={990} R={f < w(64.84) ? 40 : 18} />
    <Burst x={700} y={1000} at={w(64.84)} R={170} />
  </>),
  onesec: ({ f, b0, b1 }) => {
    const a = r(f, b0, b1, 0, Math.PI * 2, Easing.linear);
    return (<>
      <T y={UP} size={140} color={ACCENT.amber} mono>≈ 1 SECOND</T>
      <svg style={{ position: "absolute", left: 560, top: 860 }} width="300" height="320"><circle cx="150" cy="170" r="130" fill="#F6F4EF" stroke={INK} strokeWidth="12" /><rect x="135" y="14" width="30" height="24" rx="6" fill={INK} /><line x1="150" y1="170" x2={150 + Math.sin(a) * 100} y2={170 - Math.cos(a) * 100} stroke={ACCENT.red} strokeWidth="12" strokeLinecap="round" /><circle cx="150" cy="170" r="12" fill={INK} /></svg>
    </>);
  },
  atom: () => (<>
    <T y={UP} size={84}>A MICRO BLACK HOLE…</T>
    <div style={{ position: "absolute", left: 470, top: 790 }}><Icon_Atom size={460} ink="#E2E8F0" /></div>
  </>),
  smaller: ({ w }) => (<>
    <T y={UP} size={74} color={YELLOW}>SMALLER THAN AN ATOM</T>
    <div style={{ position: "absolute", left: 620, top: 860, scale: "0.75" }}><Icon_Atom size={420} ink="#E2E8F0" /></div>
    <div style={{ position: "absolute", left: 470, top: 1040, width: 20, height: 20, borderRadius: 99, background: "#05070C", border: `4px solid ${ACCENT.amber}`, boxShadow: "0 0 18px 6px rgba(245,158,11,0.6)" }} />
    <div style={{ position: "absolute", left: 420, top: 990, width: 120, height: 120, borderRadius: 99, border: `6px dashed ${ACCENT.red}` }} />
    <Arrow x1={480} y1={940} x2={480} y2={985} color={ACCENT.red} w={8} />
  </>),
  everest: () => (<>
    <T y={UP} size={96}>MOUNT EVEREST</T>
    <div style={{ position: "absolute", left: 420, top: 760 }}><Mountain size={540} ink="#E2E8F0" /></div>
  </>),
  crush: ({ f, b0, b1 }) => {
    const k = r(f, b0, b1, 0, 1, Easing.in(Easing.cubic));
    return (<>
      <T y={UP} size={96} color={YELLOW}>CRUSH IT…</T>
      <div style={{ position: "absolute", left: 420, top: 760, scale: `${1 - 0.9 * k} ${1 - 0.97 * k}`, transformOrigin: "50% 92%" }}><Mountain size={540} ink="#E2E8F0" /></div>
      <Arrow x1={690} y1={760} x2={690} y2={860 + 200 * k} color={ACCENT.red} />
      <Arrow x1={420} y1={1180} x2={520 + 120 * k} y2={1180} color={ACCENT.red} />
      <Arrow x1={1000} y1={1180} x2={880 - 120 * k} y2={1180} color={ACCENT.red} />
    </>);
  },
  ball: () => (<>
    <T y={UP} size={96}>INTO A BALL</T>
    <div style={{ position: "absolute", left: 690, top: 990, width: 36, height: 36, borderRadius: 99, background: ACCENT.blue, boxShadow: "0 0 50px 22px rgba(37,99,235,0.6)" }} />
    <svg style={{ position: "absolute", left: 708, top: 1008, overflow: "visible" }} width="1" height="1"><line x1="0" y1="0" x2="190" y2="-90" stroke="#FFF" strokeWidth="6" strokeDasharray="14 10" /></svg>
    <T x={760} y={860} w={260} size={44} color="#CBD5E1" align="left">radius?</T>
  </>),
  pm: () => (<>
    <T y={UP} size={150} color={ACCENT.amber} mono>0.24 pm</T>
    <div style={{ position: "absolute", left: 690, top: 1000, width: 36, height: 36, borderRadius: 99, background: ACCENT.blue, boxShadow: "0 0 50px 22px rgba(37,99,235,0.6)" }} />
    <T x={400} y={1130} w={620} size={42} color="#CBD5E1">≈ 4,000× smaller than 1 nm</T>
  </>),
  mtnmass: () => (<>
    <T y={UP} size={74}>A MOUNTAIN-MASS ONE…</T>
    <div style={{ position: "absolute", left: 420, top: 860 }}><Mountain size={280} ink="#E2E8F0" /></div>
    <Arrow x1={710} y1={1000} x2={820} y2={1000} color={YELLOW} />
    <Hole cx={900} cy={1000} R={50} />
  </>),
  outlive: ({ w }) => (<>
    <T y={UP} size={74}>LIVES LONGER THAN</T>
    <T y={UP + 90} size={74} color={YELLOW}>THE UNIVERSE</T>
    <Hole cx={720} cy={1050} R={70} />
    <Stamp x={410} y={1150} at={w(58.0)} text="OUTLIVES THE UNIVERSE" color={ACCENT.blue} size={44} rot={-4} />
  </>),
  // ---- Short 2 ----
  bigsmall: () => (<>
    <T y={UP} size={84}>THE BIGGER IT IS…</T>
    <Hole cx={520} cy={1020} R={40} /><T x={420} y={1080} w={200} size={40} color="#CBD5E1">SMALL</T>
    <Hole cx={830} cy={1000} R={190} /><T x={640} y={1205} w={380} size={40} color="#CBD5E1">SUPERMASSIVE</T>
  </>),
  gentle: () => (<>
    <T y={UP} size={76} color={YELLOW}>THE GENTLER THE EDGE</T>
    <Hole cx={520} cy={940} R={40} /><Hole cx={830} cy={940} R={150} />
    <T x={400} y={1110} w={620} size={36} color="#CBD5E1" align="left">STRETCH</T>
    <div style={{ position: "absolute", left: 420, top: 1160, width: 260, height: 34, borderRadius: 9, background: ACCENT.red }} />
    <div style={{ position: "absolute", left: 720, top: 1160, width: 50, height: 34, borderRadius: 9, background: "#22C55E" }} />
  </>),
  horizon: ({ f, b0 }) => (<>
    <T y={UP} size={76} color={ACCENT.red}>AT THE EVENT HORIZON</T>
    <Hole cx={720} cy={1010} R={190} />
    <div style={{ position: "absolute", left: 720 - 240, top: 1010 - 240, width: 480, height: 480, borderRadius: "50%", border: `8px dashed ${ACCENT.red}`, rotate: `${r(f, b0, b0 + 60, 0, 30, Easing.linear)}deg` }} />
  </>),
  fallsmall: ({ f, b0, b1 }) => (<>
    <T y={UP} size={84}>SMALL BLACK HOLE</T>
    <Hole cx={540} cy={1210} R={60} />
    <Astro pose="explaining" x={540} bottom={r(f, b0, b1, 1060, 1110, Easing.in(Easing.quad))} h={270} at={b0} />
  </>),
  spag: ({ f, b0 }) => (<>
    <T y={UP} size={84}>SMALL BLACK HOLE</T>
    <Hole cx={540} cy={1210} R={60} />
    <Astro pose="shocked" x={540} bottom={1130} h={215} sx={1 / Math.sqrt(r(f, b0, b0 + 18, 1, 1.6))} sy={r(f, b0, b0 + 18, 1, 1.6)} at={b0} />
    <Stamp x={610} y={880} at={b0} text="SPAGHETTI" size={64} rot={-8} />
  </>),
  outside: ({ w }) => (<>
    <T y={UP} size={84} color={YELLOW}>NOT EVEN IN YET!</T>
    <Hole cx={540} cy={1225} R={55} />
    <div style={{ position: "absolute", left: 540 - 120, top: 1225 - 120, width: 240, height: 240, borderRadius: "50%", border: `7px dashed ${ACCENT.red}` }} />
    <Astro pose="shocked" x={540} bottom={1100} h={215} sx={0.79} sy={1.6} at={w(340.44)} />
    <T x={650} y={960} w={380} size={40} color={ACCENT.red} align="left">STILL OUTSIDE THE HORIZON</T>
  </>),
  fallbig: ({ f, b0 }) => (<>
    <Hole cx={1320} cy={1000} R={620} />
    <Astro pose="explaining" x={r(f, b0, b0 + 50, 300, 360)} bottom={1240} h={420} at={b0} />

    <T y={UP} size={84}>SUPERMASSIVE</T>
  </>),
  cross: ({ f, b0, b1 }) => (<>
    <Hole cx={1320} cy={1000} R={620} />
    <svg style={{ position: "absolute", left: 640, top: 760 }} width="20" height="520"><line x1="10" y1="0" x2="10" y2="520" stroke={ACCENT.red} strokeWidth="10" strokeDasharray="26 18" /></svg>
    <Astro pose="explaining" x={r(f, b0, b1, 380, 820, Easing.inOut(Easing.sin))} bottom={1240} h={420} at={b0} />

    <T y={UP} size={84}>YOU CROSS THE HORIZON</T>
  </>),
  fine: ({ b0 }) => (<>
    <Hole cx={1320} cy={1000} R={620} />
    <svg style={{ position: "absolute", left: 640, top: 760 }} width="20" height="520"><line x1="10" y1="0" x2="10" y2="520" stroke={ACCENT.red} strokeWidth="10" strokeDasharray="26 18" /></svg>
    <Astro pose="thinking" x={820} bottom={1240} h={420} at={b0} />

    <T y={UP} size={90} color={YELLOW}>…AND FEEL FINE?</T>
  </>),
  until: ({ b0 }) => (<>
    <Hole cx={1320} cy={1000} R={620} color="#FB923C" />
    <svg style={{ position: "absolute", left: 640, top: 760 }} width="20" height="520"><line x1="10" y1="0" x2="10" y2="520" stroke={ACCENT.red} strokeWidth="10" strokeDasharray="26 18" /></svg>
    <Astro pose="shocked" x={820} bottom={1240} h={440} at={b0} />

    <T y={UP} size={90}>UNTIL…</T>
  </>),
  noway: ({ f, w, b0 }) => (<>
    <Hole cx={1320} cy={1000} R={620} color="#FB923C" />
    <Astro pose="shocked" x={820} bottom={1240} h={440} at={b0} />
    {f >= w(349.78) ? <><Arrow x1={760} y1={900} x2={480} y2={900} color={ACCENT.red} w={12} /><svg style={{ position: "absolute", left: 560, top: 840, overflow: "visible" }} width="1" height="1"><path d="M0 0 L120 120 M120 0 L0 120" stroke={ACCENT.red} strokeWidth="16" strokeLinecap="round" /></svg></> : null}
    {f >= w(349.78) ? <T y={UP} size={120} color="#FFFFFF">NO WAY BACK</T> : <T y={UP} size={90}>UNTIL…</T>}
  </>),
  // ---- Short 3 ----
  ton: () => (<><T y={UP} size={130}>TON 618</T><Hole cx={700} cy={1030} R={180} rx={340} /></>),
  quasar: ({ f, b0 }) => (<>
    <T y={UP} size={110} color={ACCENT.amber}>A QUASAR</T>
    <div style={{ position: "absolute", left: 700 - 26, top: 1030 - 230 * r(f, b0, b0 + 14), width: 52, height: 460 * r(f, b0, b0 + 14), background: `linear-gradient(${ACCENT.blue}, #BFDBFE, ${ACCENT.blue})`, borderRadius: 26, opacity: 0.9 }} />
    <Hole cx={700} cy={1030} R={180} rx={340} />
  </>),
  est: () => (<><T y={UP} size={120}>UP TO…</T><Hole cx={700} cy={1030} R={180} rx={340} /></>),
  sixtysix: ({ w }) => (<>
    <Count y={UP} size={128} color={ACCENT.amber} a={w(371.02)} b={w(371.02) + 20} from={1} to={66} fmt={(v) => `${Math.round(v)}B SUNS`} />
    <Hole cx={700} cy={1040} R={180} rx={340} />
  </>),
  sun: () => (<>
    <T y={UP} size={80}>× THE MASS OF</T><T y={UP + 90} size={80} color={YELLOW}>OUR SUN</T>
    <Hole cx={700} cy={1040} R={180} rx={340} />
    <div style={{ position: "absolute", left: 685, top: 1235, width: 30, height: 30, borderRadius: 99, background: "#FBBF24", boxShadow: "0 0 18px 6px rgba(251,191,36,0.7)" }} />
    <T x={735} y={1228} w={200} size={36} color={YELLOW} align="left">← 1 SUN</T>
  </>),
  lineup: ({ f, b0, b1 }) => {
    const n = Math.min(40, Math.floor(r(f, b0 + 3, b1, 0, 40, Easing.linear)));
    return (<>
      <T y={UP} size={120} mono>× {String(n).padStart(2, "0")}</T>
      <Hole cx={700} cy={1030} R={190} rx={350} />
      {Array.from({ length: 40 }, (_, i) => <div key={i} style={{ position: "absolute", left: 700 - 266 + (i % 8) * 76 - 24, top: 1030 - 140 + Math.floor(i / 8) * 58, opacity: i < n ? 1 : 0 }}><Icon_SolarSystem size={48} ink="#E2E8F0" /></div>)}
    </>);
  },
  onesys: () => (<>
    <T y={UP} size={80}>1 SOLAR SYSTEM</T><T y={UP + 90} size={60} color={YELLOW}>OUT TO NEPTUNE</T>
    <div style={{ position: "absolute", left: 520, top: 840 }}><Icon_SolarSystem size={380} ink="#E2E8F0" /></div>
  </>),
  x40: ({ w }) => (<>
    {f40(w)}
    <Hole cx={700} cy={1030} R={190} rx={350} />
    {Array.from({ length: 40 }, (_, i) => <div key={i} style={{ position: "absolute", left: 700 - 266 + (i % 8) * 76 - 24, top: 1030 - 140 + Math.floor(i / 8) * 58 }}><Icon_SolarSystem size={48} ink="#E2E8F0" /></div>)}
  </>),
  phoenix: ({ f, b0 }) => (<>
    <T y={UP} size={120}>PHOENIX A</T>
    <Hole cx={720} cy={1060} R={r(f, b0, b0 + 30, 120, 270)} fire />
    <Hole cx={720} cy={1060} R={44} rx={88} />
    <T x={580} y={1115} w={280} size={32} color="#94A3B8">TON 618</T>
  </>),
  grow: ({ f, b0, b1 }) => (<>
    <T y={UP} size={90}>ESTIMATED AT…</T>
    <Hole cx={720} cy={1060} R={r(f, b0, b1, 270, 285)} fire />
    <Hole cx={720} cy={1060} R={44} rx={88} />
    <T x={580} y={1115} w={280} size={32} color="#94A3B8">TON 618</T>
  </>),
  hundred: ({ f, w }) => (<>
    <Count y={UP} size={128} color={ACCENT.amber} a={w(392.12)} b={w(392.12) + 18} from={0} to={100} fmt={(v) => `${Math.round(v)}B SUNS`} />
    <Hole cx={720} cy={1075} R={285} fire />
    <Hole cx={720} cy={1075} R={44} rx={88} />
    {f >= w(393.44) ? <Stamp x={430} y={1190} at={w(393.44)} text="BIGGER THAN TON 618" color={ACCENT.amber} size={42} rot={-3} /> : null}
  </>),
};
function f40(w: (s: number) => number) {
  return <XTitle at={w(385.40)} />;
}
const XTitle: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  return <T y={UP} size={150} color={f >= at ? ACCENT.amber : "#FFFFFF"} mono>× 40</T>;
};

// characters that are already the faller in Short 2 (no extra standing character there)
const FALLER = new Set(["fallsmall", "spag", "outside", "fallbig", "cross", "fine", "until", "noway"]);

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
          <CharacterRig key={`${i}-${beat.pose}`} mode="space" pose={beat.pose as "explaining"} x={210} bottom={1285} height={440} enterAt={b0} />
        </div>
      )}
    </>
  );
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
      <BeatView key={i} c={c} i={i} b0={starts[i]} b1={starts[i + 1]} />
      <Banner lines={c.banner} size={c.bannerSize} />
      {cover ? null : <Captions c={c} />}
      {cover ? null : <EndCue total={total} />}
    </AbsoluteFill>
  );
};
export { SHORTS, shortDuration };
