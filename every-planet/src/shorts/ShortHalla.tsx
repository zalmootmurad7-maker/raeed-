import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import TS from "./short_halla_ts.json";
import { ACCENT, FONT, SPACE } from "../tokens";
import { LOOKS, Planet } from "../components/Planet";

// "VAPORIZED?!" — Halla (8 UMi b) Short. 1080x1920, 30 fps, 0 px jitter (smooth springs / eases only).
// SAFE ZONE (owner, 2026-11-21): everything between 22% and 76% of the height -> y 422..1459.
// The star + orbit fill ~85% of the width; the astronaut appears ONLY in the hook and the "STILL THERE?!" beat.
export const SH_ID = "ShortHalla-Vaporized";
export const SH_FPS = 30;
export const SH_FRAMES = Math.round(19.0 * SH_FPS);
const W = 1080, INK = "#141824", YELLOW = "#FACC15", RED = ACCENT.red, AMBER = ACCENT.amber;
const SAFE_TOP = 422, SAFE_BOT = 1459;
const SX = 540, SY = 890;          // star centre (stage coords)
const ORBIT = 420;                 // Halla's orbit radius on screen (0.5 AU)
const BASE_R = 150;                // Baekdu's radius at rest
const SWELL_R = ORBIT * 1.5;       // "should have swelled to 1.5x the orbit"
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const r = (f: number, a: number, b: number, from = 0, to = 1, e = Easing.out(Easing.cubic)) => interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: e });
const F = (s: number) => Math.round(s * SH_FPS);
const sp = (f: number, at: number, damping = 11, stiffness = 170) => spring({ frame: f - at, fps: SH_FPS, config: { damping, stiffness, mass: 0.7 } });

type Word = { word: string; start: number; end: number };
const FIX: Record<string, string> = { "Hala.": "Halla.", Hala: "Halla" };
const WORDS: Word[] = (TS as { words: Word[] }).words.map((w) => ({ ...w, word: FIX[w.word] ?? w.word }));
const HOT: Record<string, string> = {
  vaporized: RED, star: AMBER, halla: AMBER, red: RED, giant: RED, swelled: RED, orbit: AMBER, swallowing: RED, whole: RED,
  physics: AMBER, "shouldn't": RED, exist: RED, still: AMBER, there: AMBER, survive: RED, related: AMBER, video: AMBER,
};
const key = (w: string) => w.toLowerCase().replace(/[^a-z']/g, "");

// ---------- timeline (seconds, from the Whisper words) ----------
// camera keyframes: [t, scale, focusX, focusY]  (focus = stage point placed at the frame centre)
const planetAngle = (t: number) => 1.45 - 0.107 * t; // calm, steady glide (counter-clockwise): lower right -> upper right, clear of the astronaut and headlines
const planetPos = (t: number) => ({ x: SX + Math.cos(planetAngle(t)) * ORBIT, y: SY + Math.sin(planetAngle(t)) * ORBIT });
const P3 = planetPos(3.6);
const CAM: [number, number, number, number][] = [
  [0.0, 0.78, SX, SY], [1.3, 1.0, SX, SY],                       // hook: fast zoom-in
  [2.5, 1.0, SX, SY], [3.2, 1.75, P3.x, P3.y],                    // onto Halla's glowing orbit
  [4.1, 1.85, P3.x, P3.y], [4.6, 1.0, SX, SY],                    // "Meet Halla" -> pull back to the red giant
  [5.9, 1.0, SX, SY], [7.0, 0.74, SX, SY],                        // swelling: zoom out to see it all
  [9.1, 0.74, SX, SY], [10.2, 0.9, SX, SY],                       // flood: push in
  [10.54, 0.9, SX, SY], [10.8, 0.78, SX, SY],                     // twist: camera snaps back
  [12.0, 0.82, SX, SY], [13.3, 1.0, SX, SY], [15.2, 1.08, SX + 60, SY - 40], // payoff: gentle push
  [15.6, 0.7, SX, SY + 190], [19.0, 0.72, SX, SY + 190],          // CTA: star up, room for the arrow
];
const camAt = (t: number) => {
  let i = 0; while (i < CAM.length - 2 && t >= CAM[i + 1][0]) i++;
  const [t0, s0, x0, y0] = CAM[i], [t1, s1, x1, y1] = CAM[i + 1];
  const k = interpolate(t, [t0, t1], [0, 1], { ...cl, easing: Easing.inOut(Easing.cubic) });
  return { s: s0 + (s1 - s0) * k, fx: x0 + (x1 - x0) * k, fy: y0 + (y1 - y0) * k };
};
const starR = (f: number) => {
  const swell = r(f, F(5.9), F(8.3), BASE_R, SWELL_R, Easing.out(Easing.back(1.15)));   // violent swell past the orbit
  const back = sp(f, F(10.6), 14, 120);                                                   // twist: shrinks back (spring)
  const pulse = 1 + 0.025 * Math.sin((f / 30) * Math.PI * 2 * 0.9);
  return (swell + (BASE_R - swell) * Math.min(1, back)) * pulse;
};
const planetVis = (f: number) => (f < F(9.25) ? 1 : f < F(13.3) ? r(f, F(9.25), F(9.6), 1, 0) : Math.min(1.15, sp(f, F(13.3), 9, 200)));

// ---------- pieces ----------
const Stars: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: SPACE.bg }}>
    {Array.from({ length: 110 }, (_, i) => { const q = (n: number) => { const v = Math.sin((i + 1) * 77.3 * n) * 10000; return v - Math.floor(v); }; return <div key={i} style={{ position: "absolute", left: q(1) * W, top: q(2) * 1920, width: 3, height: 3, borderRadius: 9, background: "#F6F4EF", opacity: 0.2 + q(3) * 0.5 }} />; })}
  </AbsoluteFill>
);
// Baekdu: glowing red giant with pulsing corona rings + flare spikes
const RedGiant: React.FC<{ f: number; R: number; flood: number }> = ({ f, R, flood }) => {
  const t = f / 30;
  const flares = 22;
  return (
    <>
      <div style={{ position: "absolute", left: SX - R * 2, top: SY - R * 2, width: R * 4, height: R * 4, borderRadius: 9999, background: `radial-gradient(circle, rgba(229,57,53,${0.55 + 0.3 * flood}) 0%, rgba(229,57,53,${0.3 + 0.3 * flood}) 32%, rgba(0,0,0,0) 62%)` }} />
      {[0, 1, 2].map((k) => { const ph = (t * 0.8 + k / 3) % 1; const rr = R * (1.05 + 0.6 * ph); return <div key={k} style={{ position: "absolute", left: SX - rr, top: SY - rr, width: 2 * rr, height: 2 * rr, borderRadius: 9999, border: `${Math.max(3, 9 * (1 - ph))}px solid ${k % 2 ? AMBER : RED}`, opacity: 0.75 * (1 - ph), boxSizing: "border-box" }} />; })}
      <svg style={{ position: "absolute", left: SX - R * 2, top: SY - R * 2, overflow: "visible" }} width={R * 4} height={R * 4}>
        {Array.from({ length: flares }, (_, i) => {
          const a = (i / flares) * Math.PI * 2 + t * 0.15;
          const len = R * (0.14 + 0.1 * flood + 0.07 * Math.sin(t * 3.1 + i * 1.7));
          const w = 0.09, c = R * 2;
          return <path key={i} d={`M ${c + Math.cos(a - w) * R} ${c + Math.sin(a - w) * R} L ${c + Math.cos(a) * (R + len)} ${c + Math.sin(a) * (R + len)} L ${c + Math.cos(a + w) * R} ${c + Math.sin(a + w) * R} Z`} fill={i % 2 ? AMBER : RED} />;
        })}
        <circle cx={R * 2} cy={R * 2} r={R} fill="url(#hgiant)" stroke={INK} strokeWidth={Math.max(6, R * 0.045)} />
        <defs><radialGradient id="hgiant"><stop offset="0%" stopColor="#FFEDD5" /><stop offset="45%" stopColor="#FB923C" /><stop offset="100%" stopColor="#DC2626" /></radialGradient></defs>
      </svg>
    </>
  );
};
const OrbitRing: React.FC<{ f: number; opacity?: number; color?: string }> = ({ f, opacity = 1, color = "#E2E8F0" }) => (
  <svg style={{ position: "absolute", left: SX - ORBIT, top: SY - ORBIT, overflow: "visible", rotate: `${(f / 30) * 14}deg`, opacity }} width={ORBIT * 2} height={ORBIT * 2}>
    <circle cx={ORBIT} cy={ORBIT} r={ORBIT} fill="none" stroke={color} strokeWidth="7" strokeDasharray="26 18" strokeLinecap="round" />
  </svg>
);
const Halla: React.FC<{ f: number }> = ({ f }) => {
  const p = planetPos(f / 30), v = planetVis(f);
  if (v <= 0.01) return null;
  return (
    <div style={{ position: "absolute", left: p.x - 60, top: p.y - 60, width: 120, height: 120, scale: `${v}`, opacity: Math.min(1, v) }}>
      <div style={{ position: "absolute", left: -40, top: -40, width: 200, height: 200, borderRadius: 999, background: "radial-gradient(circle, rgba(251,146,60,0.55) 0%, rgba(0,0,0,0) 65%)" }} />
      <Planet size={120} look={LOOKS[10]} id="halla-sh" />
    </div>
  );
};
const Head: React.FC<{ y: number; size: number; color?: string; at: number; children: React.ReactNode }> = ({ y, size, color = "#FFFFFF", at, children }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = sp(f, at, 10, 220);
  return (
    <div style={{ position: "absolute", left: 20, width: 1040, top: y, textAlign: "center", scale: `${0.6 + 0.4 * k}`, opacity: Math.min(1, k * 1.6), transformOrigin: "50% 50%" }}>
      <span style={{ display: "inline-block", background: "rgba(6,9,17,0.88)", borderRadius: 24, padding: "6px 26px 12px", fontFamily: FONT.head, fontWeight: 700, fontSize: size, color, lineHeight: 1.0, letterSpacing: -2, whiteSpace: "nowrap" }}>{children}</span>
    </div>
  );
};
const Astronaut: React.FC<{ f: number; from: number; to: number; x: number; bottom: number; h: number }> = ({ f, from, to, x, bottom, h }) => {
  if (f < from || f > to + 8) return null;
  const inK = sp(f, from, 9, 230);                 // spring pop
  const outK = r(f, to, to + 7, 1, 0, Easing.in(Easing.cubic));
  const k = inK * outK;
  return <Img src={staticFile("assets/character/space/shocked.png")} style={{ position: "absolute", height: h, left: x - h * 0.33, top: bottom - h, scale: `${k}`, transformOrigin: "50% 100%" }} />;
};
const Stamp: React.FC<{ f: number; at: number }> = ({ f, at }) => {
  if (f < at || f > F(13.45)) return null;
  const k = sp(f, at, 7, 260);                                  // slam with spring bounce
  const out = r(f, F(13.15), F(13.45), 1, 0, Easing.in(Easing.cubic)); // shrinks away before the payoff
  return (
    <div style={{ position: "absolute", left: 0, width: W, top: SY - 95, textAlign: "center" }}>
      <span style={{ display: "inline-block", rotate: "-8deg", scale: `${(1.8 - 0.8 * k) * (0.5 + 0.5 * out)}`, border: `12px solid ${RED}`, color: RED, background: "rgba(14,19,31,0.9)", fontFamily: FONT.head, fontWeight: 700, fontSize: 108, lineHeight: 1, padding: "16px 34px", borderRadius: 22, whiteSpace: "nowrap", opacity: Math.min(1, k * 3) * out }}>BROKE PHYSICS</span>
    </div>
  );
};
// kinetic captions: 2–3 word chunks popping on, key words in red / amber
const CHUNKS: Word[][] = (() => { const out: Word[][] = []; let cur: Word[] = []; WORDS.forEach((w) => { cur.push(w); if (/[.,?!]$/.test(w.word) || cur.length >= 3) { out.push(cur); cur = []; } }); if (cur.length) out.push(cur); return out; })();
const Captions: React.FC = () => {
  const f = useCurrentFrame(), t = f / SH_FPS;
  const i = CHUNKS.findIndex((c, k) => t >= c[0].start - 0.04 && t < (CHUNKS[k + 1] ? CHUNKS[k + 1][0].start - 0.04 : c[c.length - 1].end + 1.2));
  if (i < 0) return null;
  const c = CHUNKS[i], k = sp(f, F(c[0].start - 0.04), 12, 260);
  return (
    <div style={{ position: "absolute", left: 40, width: 1000, top: 1330, textAlign: "center" }}>
      <span style={{ display: "inline-block", background: "rgba(6,9,17,0.92)", borderRadius: 20, padding: "8px 26px 12px", fontFamily: FONT.head, fontWeight: 700, fontSize: 76, lineHeight: 1.05, scale: `${0.7 + 0.3 * k}`, whiteSpace: "nowrap", letterSpacing: -1 }}>
        {c.map((w, j) => <span key={j} style={{ color: HOT[key(w.word)] ?? "#FFFFFF", opacity: t >= w.start - 0.04 ? 1 : 0.35 }}>{w.word.toUpperCase().replace(/[.,]$/, "")}{j < c.length - 1 ? " " : ""}</span>)}
      </span>
    </div>
  );
};
const SafeLines: React.FC = () => (<>
  <div style={{ position: "absolute", left: 0, width: W, top: SAFE_TOP, borderTop: "3px dashed #22D3EE" }} />
  <div style={{ position: "absolute", left: 0, width: W, top: SAFE_BOT, borderTop: "3px dashed #22D3EE" }} />
</>);

export const ShortHalla: React.FC<{ qa?: boolean }> = ({ qa }) => {
  const f = useCurrentFrame(), t = f / SH_FPS;
  const cam = camAt(t);
  const R = starR(f);
  const flood = r(f, F(7.4), F(9.4)) * (1 - r(f, F(10.6), F(11.4)));
  const ringOp = 1 - 0.55 * flood;
  const tx = SX - cam.fx * cam.s, ty = SY - cam.fy * cam.s;
  // stage is masked to the safe band with soft 50 px edges (the swollen star never spills into the UI zones)
  const mask = `linear-gradient(to bottom, transparent ${SAFE_TOP}px, black ${SAFE_TOP + 50}px, black ${SAFE_BOT - 50}px, transparent ${SAFE_BOT}px)`;
  const ctaBob = Math.sin(((f - F(15.32)) / 30) * Math.PI * 2 * 1.1) * 18;
  return (
    <AbsoluteFill>
      <Stars />
      <AbsoluteFill style={{ WebkitMaskImage: mask, maskImage: mask }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: 1920, transform: `translate(${tx}px, ${ty}px) scale(${cam.s})`, transformOrigin: "0 0" }}>
          <Halla f={f} />
          <RedGiant f={f} R={R} flood={flood} />
          <OrbitRing f={f} opacity={ringOp} />
          {f >= F(5.9) && f < F(10.6) ? <div style={{ position: "absolute", left: SX + ORBIT * 0.72 + 6, top: SY + ORBIT * 0.72 + 4, fontFamily: FONT.mono, fontWeight: 700, fontSize: 52, color: "#E2E8F0", opacity: r(f, F(5.9), F(6.2)), textShadow: "0 4px 0 #060911" }}>0.5 AU</div> : null}
        </div>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 47%, rgba(229,57,53,${0.0 + 0.32 * flood}) 0%, rgba(229,57,53,${0.18 * flood}) 55%, rgba(0,0,0,0) 85%)` }} />
      </AbsoluteFill>

      {/* headlines (each pops with a spring, timed to the voice) */}
      {t < 2.5 ? <><Head y={445} size={68} at={0}>SHOULD BE</Head><Head y={530} size={146} color={RED} at={2}>VAPORIZED?!</Head></> : null}
      {t >= 2.5 && t < 3.3 ? <Head y={460} size={92} color={AMBER} at={F(2.5)}>BY ITS OWN STAR</Head> : null}
      {t >= 3.3 && t < 4.26 ? <Head y={460} size={120} color={AMBER} at={F(3.4)}>MEET HALLA</Head> : null}
      {t >= 4.26 && t < 5.9 ? <Head y={460} size={100} color={RED} at={F(4.3)}>RED GIANT BAEKDU</Head> : null}
      {t >= 5.9 && t < 9.2 ? <Head y={455} size={150} color={RED} at={F(5.9)}><span style={{ fontFamily: FONT.mono }}>{r(f, F(5.9), F(8.3), 0.4, 1.5, Easing.out(Easing.quad)).toFixed(1)}×</span><span style={{ fontSize: 64, color: "#FFFFFF" }}> THE ORBIT</span></Head> : null}
      {t >= 9.2 && t < 10.54 ? <Head y={460} size={120} color={RED} at={F(9.2)}>SWALLOWED?!</Head> : null}
      {t >= 12.06 && t < 13.3 ? <Head y={460} size={104} color="#FFFFFF" at={F(12.1)}>IT SHOULDN&apos;T EXIST</Head> : null}
      {t >= 13.3 && t < 15.32 ? <Head y={455} size={140} color={AMBER} at={F(13.3)}>STILL THERE?!</Head> : null}
      {t >= 15.32 ? (
        <div style={{ position: "absolute", left: 50, top: 440, width: 980, padding: "16px 16px 20px", background: YELLOW, border: `7px solid ${INK}`, borderRadius: 30, boxShadow: `10px 10px 0 ${INK}`, textAlign: "center", boxSizing: "border-box", scale: `${0.7 + 0.3 * sp(f, F(15.32), 10, 220)}` }}>
          <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 104, lineHeight: 1.0, color: INK, letterSpacing: -2 }}>HOW DID IT</div>
          <div style={{ fontFamily: FONT.head, fontWeight: 700, fontSize: 104, lineHeight: 1.0, color: INK, letterSpacing: -2 }}>SURVIVE? ↓</div>
        </div>
      ) : null}
      {t >= 15.32 ? (
        <svg style={{ position: "absolute", left: 0, top: ctaBob, overflow: "visible", scale: `${sp(f, F(16.28), 9, 220)}`, transformOrigin: "540px 1180px" }} width="1" height="1">
          <line x1={540} y1={1080} x2={540} y2={1270} stroke={RED} strokeWidth="34" strokeLinecap="round" />
          <path d="M 470 1200 L 540 1275 L 610 1200" fill="none" stroke={RED} strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}

      <Stamp f={f} at={F(11.44)} />
      <Astronaut f={f} from={0} to={F(2.5)} x={210} bottom={1300} h={420} />
      <Astronaut f={f} from={F(13.3)} to={F(16.0)} x={210} bottom={1300} h={420} />
      <Captions />
      {qa ? <SafeLines /> : null}
    </AbsoluteFill>
  );
};
