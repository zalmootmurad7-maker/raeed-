import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import TS from "./timestamps.json";
import CUES from "./cues.json";

// Multi-layer rebuild: independent background + transparent character + live UI, 1080x1920 @ 30 fps.
// Motion is interpolate()/spring()/Math.sin only (0 px random jitter). Scene cuts sit on Whisper word starts.
const FPS = 30;
const F = (s: number) => Math.round(s * FPS);
export const TOTAL_L = Math.ceil(CUES.duration * FPS);
type Word = { word: string; start: number; end: number };
const WORDS = (TS as { words: Word[] }).words;
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const r = (f: number, a: number, b: number, from = 0, to = 1, e: (t: number) => number = Easing.out(Easing.cubic)) => interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: e });
const sp = (f: number, at: number, damping = 12, stiffness = 200, mass = 0.7) => (f < at ? 0 : spring({ frame: f - at, fps: FPS, config: { damping, stiffness, mass } }));
const W = (i: number) => WORDS[i].start; // word index → seconds (indices listed in the caption table below)
const HEAD = "'Space Grotesk', sans-serif";
const NAVY = "#141824";

const SC = [0, W(8), W(15), W(31), W(54)]; // scene starts: 0 · "you wouldn't" · "Your watch" · "You have fuel" · "three"
const BEATS = [W(54), W(55), W(56)]; // 3 · 2 · 1
const WHICH = W(57);

// ---------- layers ----------
const BG: React.FC<{ src: string; style?: React.CSSProperties }> = ({ src, style }) => (
  <Img src={staticFile(`layers/${src}`)} style={{ position: "absolute", left: 0, top: -7.5, width: 1080, height: 1935, ...style }} />
);
const Char: React.FC<{ src: string; cx: number; top: number; h: number; style?: React.CSSProperties; ar: number }> = ({ src, cx, top, h, style, ar }) => (
  <Img src={staticFile(`layers/${src}`)} style={{ position: "absolute", left: cx - (h * ar) / 2, top, height: h, width: h * ar, ...style }} />
);
const AR = { c1: 884 / 696, c2: 568 / 823, c3: 605 / 821, c4: 856 / 937 };
const Stars: React.FC<{ f: number; n?: number; toward?: [number, number] }> = ({ f, n = 46, toward = [540, 1450] }) => (
  <>
    {Array.from({ length: n }, (_, i) => {
      const q = (k: number) => { const v = Math.sin((i + 1) * 78.233 * k) * 43758.5453; return v - Math.floor(v); };
      const ph = (f / 30 * (0.06 + 0.05 * q(3)) + q(4)) % 1; // slow drift toward the vortex
      const x0 = q(1) * 1080, y0 = q(2) * 1400;
      const x = x0 + (toward[0] - x0) * ph * 0.5, y = y0 + (toward[1] - y0) * ph * 0.5, s = 2 + 3 * q(5);
      return <div key={i} style={{ position: "absolute", left: x, top: y, width: s, height: s, borderRadius: 9, background: "#FFF", opacity: (0.35 + 0.5 * q(6)) * Math.sin(Math.PI * ph) }} />;
    })}
  </>
);

// ---------- scene 1: falling toward the black hole ----------
const Scene1: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const f = useCurrentFrame();
  const lin = r(f, a, b, 0, 1, Easing.linear);
  const pop = 0.7 + 0.3 * sp(f, a, 10, 180);
  const t = f / FPS;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ scale: `${1.08 * (1 + 0.12 * lin)}`, rotate: `${-2 + 4 * lin}deg`, transformOrigin: "46% 72%" }}><BG src="bg_01_black_hole.jpg" /></AbsoluteFill>
      <Char src="char_01_shocked_floating.png" ar={AR.c1} cx={540} top={300 + 230 * r(f, a, b, 0, 1, Easing.in(Easing.quad))} h={600} style={{ scale: `${pop}`, rotate: `${4 * Math.sin(t * 2.2)}deg`, transformOrigin: "50% 50%" }} />
    </AbsoluteFill>
  );
};
// ---------- scene 2: calm at the edge (BG continues zooming) ----------
const Scene2: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const f = useCurrentFrame();
  const lin = r(f, a, b, 0, 1, Easing.linear);
  const inK = r(f, a, a + 8, 0, 1, Easing.out(Easing.cubic));
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ scale: `${1.08 * (1.12 + 0.1 * lin)}`, rotate: "2deg", transformOrigin: "46% 72%" }}><BG src="bg_01_black_hole.jpg" /></AbsoluteFill>
      <Char src="char_02_calm_confused.png" ar={AR.c2} cx={560} top={250 + Math.sin(f * 0.08) * 18} h={860} style={{ opacity: inK, translate: `${260 * (1 - inK)}px 0`, rotate: `${-3 + 2 * Math.sin(f * 0.05)}deg` }} />
    </AbsoluteFill>
  );
};
// ---------- scene 3: diagonal split — your 1 second vs centuries on Earth ----------
const Scene3: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const f = useCurrentFrame();
  const slideL = 1 - r(f, a, a + 7, 0, 1, Easing.out(Easing.cubic));
  const slideR = 1 - r(f, a + 2, a + 10, 0, 1, Easing.out(Easing.cubic));
  const spin = r(f, a, b, 0, 1, Easing.in(Easing.quad));
  const look = F(W(22)), secs = F(W(30)) + 6;
  const year = Math.round(2026 + 300 * r(f, look, secs, 0, 1, Easing.in(Easing.quad)));
  const counting = f >= look && f <= secs;
  const tickPulse = 0.5 + 0.5 * Math.cos(((f - a) / FPS) * Math.PI * 2 * 1.0);
  return (
    <AbsoluteFill>
      {/* left half: dark space */}
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0, 58% 0, 42% 100%, 0 100%)", translate: `${-700 * slideL}px 0` }}>
        <AbsoluteFill style={{ scale: "1.2", filter: "brightness(0.45) saturate(0.7)", transformOrigin: "10% 20%" }}><BG src="bg_01_black_hole.jpg" /></AbsoluteFill>
      </div>
      {/* right half: Earth time-warp, rotating/panning fast */}
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(58% 0, 100% 0, 100% 100%, 42% 100%)", translate: `${900 * slideR}px 0` }}>
        <AbsoluteFill style={{ scale: `${1.25 + 0.15 * spin}`, rotate: `${30 * spin}deg`, translate: `${-60 * spin}px 0`, transformOrigin: "72% 45%" }}><BG src="bg_02_earth_timewarp.jpg" /></AbsoluteFill>
        {/* fast-counting years streaking upward */}
        <div style={{ position: "absolute", left: 600, top: 300, width: 470 }}>
          {[3, 2, 1, 0].map((k) => (
            <div key={k} style={{ position: "absolute", left: 0, top: k * 70 + (counting ? -((f * 9) % 70) : 0), width: 470, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: k === 0 ? 150 : 110, color: k === 0 ? "#FFD166" : "#FFE7A3", opacity: k === 0 ? 1 : counting ? 0.28 / k : 0, WebkitTextStroke: k === 0 ? `10px ${NAVY}` : undefined, paintOrder: "stroke fill", textShadow: k === 0 ? "0 0 30px rgba(255,180,0,0.8)" : undefined }}>
              {k === 0 ? year : Math.max(2026, year - k * 17)}
            </div>
          ))}
        </div>
      </div>
      {/* the diagonal divider */}
      <svg style={{ position: "absolute", left: 0, top: 0, translate: `${-700 * slideL}px 0` }} width="1080" height="1920"><line x1={626} y1={0} x2={454} y2={1920} stroke="#FFE7A3" strokeWidth="10" /><line x1={626} y1={0} x2={454} y2={1920} stroke={NAVY} strokeWidth="4" /></svg>
      {/* you, on the left, looking at your watch */}
      <Char src="char_03_looking_watch.png" ar={AR.c3} cx={330} top={330 + 10 * Math.sin(f * 0.09)} h={820} style={{ translate: `${-700 * slideL}px 0` }} />
      {/* pulsing 1 SEC badge next to the watch */}
      <div style={{ position: "absolute", left: 360, top: 970 + 10 * Math.sin(f * 0.09), translate: `${-700 * slideL}px 0`, scale: `${1 + 0.12 * tickPulse}`, transformOrigin: "0% 50%", background: "#FFF", border: `7px solid ${NAVY}`, borderRadius: 18, padding: "6px 22px 10px", fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: NAVY, boxShadow: `0 0 ${24 * tickPulse}px rgba(255,184,0,0.9), 6px 6px 0 ${NAVY}`, rotate: "-6deg" }}>1 SEC</div>
    </AbsoluteFill>
  );
};
// ---------- scene 4: one burn left — the dilemma ----------
const Gauge: React.FC<{ f: number; a: number }> = ({ f, a }) => {
  const k = sp(f, a + 2, 12, 200);
  const level = 1 - 0.9 * r(f, F(W(33)), F(W(33)) + 18, 0, 1, Easing.inOut(Easing.cubic)); // needle drops on "fuel"
  const ang = Math.PI * (1 + level); // left = empty, right = full
  return (
    <div style={{ position: "absolute", left: 540 - 170, top: 430, width: 340, height: 190, scale: `${0.6 + 0.4 * k}`, opacity: Math.min(1, k * 2) }}>
      <svg width="340" height="190" viewBox="-170 -170 340 190">
        <path d="M -140 0 A 140 140 0 0 1 140 0" fill="none" stroke="#1F2937" strokeWidth="30" strokeLinecap="round" />
        <path d="M -140 0 A 140 140 0 0 1 -99 -99" fill="none" stroke="#FF4D4D" strokeWidth="30" strokeLinecap="round" />
        <path d="M -140 0 A 140 140 0 0 1 140 0" fill="none" stroke="#E2E8F0" strokeWidth="6" />
        <line x1="0" y1="0" x2={Math.cos(ang) * 120} y2={Math.sin(ang) * 120} stroke="#FF4D4D" strokeWidth="10" strokeLinecap="round" />
        <circle r="16" fill="#E2E8F0" stroke={NAVY} strokeWidth="5" />
        <text x="-150" y="14" fill="#FF4D4D" fontFamily={HEAD} fontWeight="700" fontSize="30" textAnchor="middle">E</text>
        <text x="150" y="14" fill="#E2E8F0" fontFamily={HEAD} fontWeight="700" fontSize="30" textAnchor="middle">F</text>
      </svg>
    </div>
  );
};
const Card: React.FC<{ f: number; at: number; hot: [number, number]; x: number; color: string; lines: string[] }> = ({ f, at, hot, x, color, lines }) => {
  const k = sp(f, at, 10, 220);
  if (f < at) return null;
  const on = f >= F(hot[0]) && f <= F(hot[1]) + 10;
  const glow = on ? 0.75 + 0.25 * Math.sin(f * 0.6) : 0.35;
  return (
    <div style={{ position: "absolute", left: x, top: 760, width: 240, height: 270, scale: `${(0.5 + 0.5 * k) * (on ? 1.06 : 1)}`, opacity: Math.min(1, k * 2), borderRadius: 26, border: `8px solid ${color}`, background: "rgba(10,14,24,0.82)", boxShadow: `0 0 ${50 * glow}px ${16 * glow}px ${color}, inset 0 0 ${26 * glow}px ${color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: HEAD, fontWeight: 700, color }}>
      {lines.map((l, i) => <div key={i} style={{ fontSize: i === 0 ? 50 : 34, lineHeight: 1.05, textShadow: `0 0 18px ${color}` }}>{l}</div>)}
    </div>
  );
};
const Scene4: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const f = useCurrentFrame();
  const lin = r(f, a, b, 0, 1, Easing.linear);
  const punch = 1.06 - 0.06 * r(f, a, a + 6);
  const blink = f >= F(W(35)) ? (Math.floor((f - F(W(35))) / 8) % 2 === 0 ? 1 : 0.35) : 0;
  const badgeK = sp(f, F(W(35)), 10, 220);
  return (
    <AbsoluteFill style={{ scale: `${punch}` }}>
      <AbsoluteFill style={{ scale: `${1 + 0.1 * lin}`, filter: "brightness(0.62)", transformOrigin: "50% 75%" }}><BG src="bg_03_event_horizon_pull.jpg" /></AbsoluteFill>
      <Stars f={f} />
      <Char src="char_04_sweating_torn.png" ar={AR.c4} cx={540} top={740 + 12 * Math.sin(f * 0.11)} h={820} style={{ rotate: `${1.5 * Math.sin(f * 0.13)}deg`, scale: `${1 + 0.012 * Math.sin(f * 0.22)}`, transformOrigin: "50% 100%" }} />
      <Gauge f={f} a={a} />
      {f >= F(W(35)) ? <div style={{ position: "absolute", left: 540 - 230, top: 632, width: 460, height: 92, borderRadius: 16, border: "6px solid #FF4D4D", background: "rgba(40,6,10,0.85)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 58, color: "#FF4D4D", opacity: blink, scale: `${0.6 + 0.4 * badgeK}`, textShadow: "0 0 20px #FF4D4D", boxShadow: "0 0 30px rgba(255,77,77,0.7)" }}>1 BURN LEFT</div> : null}
      <Card f={f} at={F(W(37))} hot={[W(37), W(45)]} x={22} color="#3CFF7A" lines={["ESCAPE", "(+300 YRS)"]} />
      <Card f={f} at={F(W(46))} hot={[W(51), W(53)]} x={1080 - 22 - 240} color="#FF4D4D" lines={["NO", "RETURN"]} />
    </AbsoluteFill>
  );
};
// ---------- scene 5: 3 · 2 · 1 — pulled into the vortex ----------
const Scene5: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const f = useCurrentFrame();
  const z = r(f, a, b, 0, 1, Easing.in(Easing.quad));
  const swap = F(BEATS[2]);
  const pull = r(f, a, swap, 0, 1, Easing.inOut(Easing.quad)), pull2 = r(f, swap, b, 0, 1, Easing.out(Easing.quad));
  const flash = Math.max(...BEATS.map((bt) => (f >= F(bt) ? 1 - r(f, F(bt), F(bt) + 8) : 0)));
  const cur = BEATS.reduce((acc, bt, i) => (f >= F(bt) ? i : acc), -1);
  const which = f >= F(WHICH);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ scale: `${1 + 0.25 * z}`, translate: `0 ${-80 * z}px`, transformOrigin: "50% 78%" }}><BG src="bg_03_event_horizon_pull.jpg" /></AbsoluteFill>
      <Stars f={f} n={60} toward={[540, 1500]} />
      {f < swap
        ? <Char src="char_04_sweating_torn.png" ar={AR.c4} cx={540} top={740 + 160 * pull} h={780} style={{ scale: `${1 - 0.18 * pull}`, transformOrigin: "50% 100%", rotate: `${1.5 * Math.sin(f * 0.13)}deg` }} />
        : <Char src="char_01_shocked_floating.png" ar={AR.c1} cx={540} top={1100 + 400 * pull2} h={460} style={{ scale: `${0.82 - 0.4 * pull2}`, rotate: `${-8 + 40 * pull2}deg`, transformOrigin: "50% 50%", opacity: 1 - 0.3 * pull2 }} />}
      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(255,40,40,0) 40%, rgba(255,40,40,0.75) 100%)", opacity: flash }} />
      {!which && cur >= 0 ? (
        <div key={cur} style={{ position: "absolute", left: 0, top: 461 - 190, width: 1080, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 380, lineHeight: 1, color: "#FF4D4D", WebkitTextStroke: `14px ${NAVY}`, paintOrder: "stroke fill", textShadow: "0 0 60px rgba(255,60,60,0.95), 0 0 120px rgba(255,60,60,0.6)", scale: `${1.6 - 0.6 * sp(f, F(BEATS[cur]), 9, 260)}` }}>{3 - cur}</div>
      ) : null}
      {which ? (
        <div style={{ position: "absolute", left: 0, top: 461 - 165, width: 1080, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 165, lineHeight: 1.0, color: "#FF4D4D", WebkitTextStroke: `12px ${NAVY}`, paintOrder: "stroke fill", textShadow: "0 0 50px rgba(255,60,60,0.9)", scale: `${1.25 - 0.25 * sp(f, F(WHICH), 10, 240)}` }}>WHICH<br />ONE?</div>
      ) : null}
    </AbsoluteFill>
  );
};

// ---------- captions: word-by-word, strictly inside 60–73% height; the countdown is NOT captioned ----------
const DANGER = new Set(["black", "hole", "supermassive", "ripped", "apart", "300", "years", "no", "return", "forever"]);
const STARTS = [0, 3, 6, 8, 11, 13, 15, 17, 19, 22, 24, 25, 27, 29, 31, 34, 37, 39, 41, 43, 46, 48, 51, 53, 57, 59];
const HIDDEN = new Set([54, 55, 56]);
const CHUNKS = STARTS.map((i0, k) => ({ i0, words: WORDS.slice(i0, k < STARTS.length - 1 ? STARTS[k + 1] : WORDS.length).filter((_, j) => !HIDDEN.has(i0 + j)) }));
const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / FPS;
  if (sec >= W(54) - 0.04 && sec < W(57) - 0.04) return null; // countdown: no caption
  let ci = 0;
  CHUNKS.forEach((c, i) => { if (sec >= c.words[0].start - 0.04) ci = i; });
  const c = CHUNKS[ci];
  const k = sp(f, F(Math.max(0, c.words[0].start - 0.04)), 11, 260);
  return (
    <div style={{ position: "absolute", left: 97, top: 1152, width: 886, height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", lineHeight: 1.06, scale: `${0.86 + 0.14 * k}`, fontFamily: HEAD, fontWeight: 700, fontSize: 92, letterSpacing: -1 }}>
        {c.words.map((w, j) => {
          const active = sec >= w.start - 0.03 && (j === c.words.length - 1 || sec < c.words[j + 1].start - 0.03);
          const key = w.word.replace(/[,.?!]/g, "").toLowerCase();
          const col = active ? (DANGER.has(key) ? "#FF4D4D" : "#FFB800") : "#FFFFFF";
          return <span key={j} style={{ display: "inline-block", margin: "0 13px", color: col, WebkitTextStroke: `16px ${NAVY}`, paintOrder: "stroke fill", scale: active ? "1.08" : "1", textShadow: "0 8px 0 rgba(20,24,36,0.55)" }}>{w.word.toUpperCase()}</span>;
        })}
      </div>
    </div>
  );
};

export const Layered: React.FC = () => {
  const f = useCurrentFrame();
  let i = 0; while (i < SC.length - 1 && f >= F(SC[i + 1])) i++;
  const a = F(SC[i]), b = i < SC.length - 1 ? F(SC[i + 1]) : TOTAL_L;
  const S = [Scene1, Scene2, Scene3, Scene4, Scene5][i];
  // whip cut into scenes 3–5 (scene 2 keeps the same background and crossfades the character)
  const whip = i >= 2 && i !== 2 ? 1 - r(f, a, a + 5) : 0;
  return (
    <AbsoluteFill style={{ background: "#0B0F1A", overflow: "hidden" }}>
      <AbsoluteFill style={{ translate: `${(i % 2 ? 1 : -1) * 200 * whip}px 0`, filter: whip > 0.01 ? `blur(${16 * whip}px)` : undefined }}><S key={i} a={a} b={b} /></AbsoluteFill>
      <Captions />
    </AbsoluteFill>
  );
};
