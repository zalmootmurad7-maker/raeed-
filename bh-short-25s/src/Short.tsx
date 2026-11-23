import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame } from "remotion";
import TS from "./timestamps.json";
import CUES from "./cues.json";

// 1080x1920 @ 30 fps. Every shot starts on a Whisper word boundary; motion is only interpolate()/spring() (0 px jitter).
const FPS = 30;
const F = (s: number) => Math.round(s * FPS);
export const TOTAL = Math.ceil(CUES.duration * FPS);
type Word = { word: string; start: number; end: number };
const WORDS = (TS as { words: Word[] }).words;
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const r = (f: number, a: number, b: number, from = 0, to = 1, e: (t: number) => number = Easing.out(Easing.cubic)) => interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: e });
const sp = (f: number, at: number, damping = 12, stiffness = 200) => (f < at ? 0 : spring({ frame: f - at, fps: FPS, config: { damping, stiffness, mass: 0.7 } }));
const wt = (w: string, nth = 0) => WORDS.filter((x) => x.word.replace(/[,.?!]/g, "").toLowerCase() === w)[nth].start;

// image 768x1376 -> cover 1080 wide (1935 tall, 7.5 px cropped top/bottom); px(x,y) maps image coords to frame coords
const S = 1080 / 768, OY = -(1376 * S - 1920) / 2;
const px = (x: number, y: number) => [x * S, y * S + OY];

const SHOTS = [
  { src: "01_hook_shocked_black_hole.jpg", t: 0 },
  { src: "02_floating_calm_event_horizon.jpg", t: wt("you", 1) },
  { src: "03_split_screen_1sec_vs_earth.jpg", t: wt("your") },
  { src: "04_centuries_flash_past_earth.jpg", t: wt("centuries") },
  { src: "05_thruster_button_one_burn.jpg", t: CUES.cut5 },
  { src: "06_dilemma_escape_vs_no_return.jpg", t: wt("escape") },
  { src: "07_tension_closeup_pull.jpg", t: wt("forever") },
  { src: "08_countdown_3_2_1_which_one.jpg", t: wt("three") },
];

const Photo: React.FC<{ src: string; style?: React.CSSProperties }> = ({ src, style }) => (
  <Img src={staticFile(`shots/${src}`)} style={{ position: "absolute", left: 0, top: OY, width: 1080, height: 1376 * S, ...style }} />
);
const Glow: React.FC<{ x: number; y: number; w: number; h: number; color: string; k: number; round?: number }> = ({ x, y, w, h, color, k, round = 28 }) =>
  k <= 0.01 ? null : <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: round, border: `8px solid ${color}`, boxShadow: `0 0 ${40 * k}px ${14 * k}px ${color}, inset 0 0 ${30 * k}px ${color}`, opacity: k }} />;
const Vignette: React.FC<{ color: string; k: number }> = ({ color, k }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0) 45%, ${color} 100%)`, opacity: k }} />
);

/** one shot: whip-in cut (5 frames: slide + blur + scale punch) then its own continuous motion */
const BASE: Record<number, React.CSSProperties> = {
  2: { translate: "0 -300px", scale: "1.15", transformOrigin: "50% 0%" }, // lift the "1 SEC" tag above the captions
  3: { translate: "0 -585px", scale: "1.3", transformOrigin: "50% 0%" }, // lift the face above the captions
  4: { translate: "0 -90px", scale: "1.05", transformOrigin: "50% 0%" }, // lift the red button out of the Shorts UI zone
};
const Shot: React.FC<{ i: number; a: number; b: number }> = (p) => (
  <AbsoluteFill>
    <AbsoluteFill style={BASE[p.i]}><ShotInner {...p} /></AbsoluteFill>
    {p.i === 4 ? <div style={{ position: "absolute", left: 0, top: 1560, width: 1080, height: 360, background: "linear-gradient(180deg, rgba(11,15,26,0) 0%, #0B0F1A 55%)" }} /> : null}
  </AbsoluteFill>
);
const ShotInner: React.FC<{ i: number; a: number; b: number }> = ({ i, a, b }) => {
  const f = useCurrentFrame();
  const sh = SHOTS[i];
  const t = (f - a) / FPS;
  const lin = r(f, a, b, 0, 1, Easing.linear);
  const whip = i === 0 ? 0 : 1 - r(f, a, a + 5, 0, 1, Easing.out(Easing.cubic));
  const dir = i % 2 ? 1 : -1;
  const punch = i === 0 ? 1.08 - 0.08 * r(f, 0, 8, 0, 1, Easing.out(Easing.back(1.6))) : 1 + 0.06 * whip;
  let scale = 1, origin = "50% 50%", ty = 0, tx = 0;
  let over: React.ReactNode = null;
  if (i === 0) { scale = 1 + 0.07 * lin; origin = "72% 72%"; }
  if (i === 1) { scale = 1.06 + 0.03 * lin; ty = -36 * lin + 14 * Math.sin(t * 2.6); }
  if (i === 2) {
    // split screen: halves slide in from opposite sides, 1 SEC pulse, then a quick pan toward the spinning Earth
    const pan = r(f, F(wt("look")), F(wt("look")) + 14, 0, 1, Easing.inOut(Easing.cubic));
    scale = 1 + 0.16 * pan; origin = "78% 46%";
    const [gx, gy] = px(40, 830);
    const pulse = f >= F(wt("ticks")) ? 0.55 + 0.45 * Math.sin((f - F(wt("ticks"))) / 4) : 0;
    const slide = 1 - r(f, a, a + 6, 0, 1, Easing.out(Easing.cubic));
    return (
      <AbsoluteFill style={{ scale: `${scale * punch}`, transformOrigin: origin }}>
        <div style={{ position: "absolute", inset: 0, clipPath: "polygon(0 0, 50% 0, 46% 100%, 0 100%)", translate: `${-1080 * slide}px 0` }}><Photo src={sh.src} /></div>
        <div style={{ position: "absolute", inset: 0, clipPath: "polygon(50% 0, 100% 0, 100% 100%, 46% 100%)", translate: `${1080 * slide}px 0` }}><Photo src={sh.src} /></div>
        <Glow x={gx} y={gy} w={260} h={170} color="rgba(255,184,0,0.9)" k={pulse * (1 - pan)} round={20} />
      </AbsoluteFill>
    );
  }
  if (i === 3) { scale = 1 + 0.12 * r(f, a, b, 0, 1, Easing.inOut(Easing.quad)); origin = "50% 54%"; over = <Vignette color="rgba(0,0,0,0.85)" k={0.35 + 0.3 * (0.5 + 0.5 * Math.sin(t * 7))} />; }
  if (i === 4) {
    scale = 0.96 + 0.08 * sp(f, a, 10, 170); origin = "33% 88%";
    const [bx, by] = px(115, 1150);
    over = <div style={{ position: "absolute", left: bx - 40, top: by - 30, width: 380, height: 260, borderRadius: 999, background: "radial-gradient(ellipse, rgba(255,60,40,0.55) 0%, rgba(255,60,40,0) 70%)", opacity: 0.5 + 0.5 * Math.sin(t * 9) }} />;
  }
  if (i === 5) {
    const noRet = F(wt("no"));
    const toRight = r(f, noRet - 8, noRet + 8, 0, 1, Easing.inOut(Easing.cubic));
    scale = 1 + 0.08 * lin; origin = `${22 + 56 * toRight}% 45%`;
    const [lx, ly] = px(32, 454), [rx, ry] = px(542, 454);
    const gIn = r(f, a + 2, a + 10), puls = 0.7 + 0.3 * Math.sin(t * 8);
    over = <>
      <Glow x={lx - 6} y={ly - 6} w={190 * S} h={318 * S} color="rgba(60,255,120,0.9)" k={gIn * puls * (1 - toRight)} />
      <Glow x={rx - 6} y={ry - 6} w={195 * S} h={326 * S} color="rgba(255,60,60,0.95)" k={toRight * puls} />
    </>;
    return <AbsoluteFill style={{ scale: `${scale * punch}`, transformOrigin: origin, translate: `${dir * 220 * whip}px 0`, filter: `blur(${18 * whip}px)` }}><Photo src={sh.src} />{over}</AbsoluteFill>;
  }
  if (i === 6) { scale = 1 + 0.15 * r(f, a, b, 0, 1, Easing.in(Easing.quad)); origin = "50% 62%"; over = <Vignette color="rgba(255,70,20,0.95)" k={(0.3 + 0.5 * lin) * (0.6 + 0.4 * Math.sin(t * 10))} />; }
  if (i === 7) {
    const beats = CUES.beats.map(F);
    const pop = beats.reduce((acc, bt) => acc + 0.06 * Math.max(0, 1 - sp(f, bt, 9, 260)) * (f >= bt ? 1 : 0), 0);
    scale = 1.0 + pop + 0.03 * lin; origin = "50% 40%";
    const flash = Math.max(...beats.map((bt) => (f >= bt ? 1 - r(f, bt, bt + 7) : 0)));
    over = <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 45%, rgba(255,45,45,0.15) 0%, rgba(255,45,45,0.55) 100%)", opacity: flash }} />;
  }
  return (
    <AbsoluteFill style={{ scale: `${scale * punch}`, transformOrigin: origin, translate: `${tx + dir * 220 * whip}px ${ty}px`, filter: whip > 0.01 ? `blur(${18 * whip}px)` : undefined }}>
      <Photo src={sh.src} />
      {over}
    </AbsoluteFill>
  );
};

// ---------- word-by-word captions (inside the 58–73% safe band, max 82% wide) ----------
const DANGER = new Set(["black", "hole", "supermassive", "ripped", "apart", "300", "years", "no", "return", "forever", "three", "two", "one"]);
const disp = (w: string, gi: number) => (gi >= COUNT0 && gi < COUNT0 + 3 ? ["3…", "2…", "1…"][gi - COUNT0] : w.toUpperCase());
type Chunk = { words: Word[]; i0: number };
const STARTS = [0, 3, 6, 8, 11, 13, 15, 17, 19, 22, 24, 25, 27, 29, 31, 34, 37, 39, 41, 43, 46, 48, 51, 53, 54, 55, 56, 57, 59];
const CHUNKS: Chunk[] = STARTS.map((i0, k) => ({ i0, words: WORDS.slice(i0, k < STARTS.length - 1 ? STARTS[k + 1] : WORDS.length) }));
const COUNT0 = 54; // "three, two, one."
const Captions: React.FC = () => {
  const f = useCurrentFrame();
  const sec = f / FPS;
  let ci = -1;
  CHUNKS.forEach((c, i) => { if (sec >= c.words[0].start - 0.04) ci = i; });
  if (ci < 0) ci = 0;
  const c = CHUNKS[ci];
  const k = sp(f, F(Math.max(0, c.words[0].start - 0.04)), 11, 260);
  return (
    <div style={{ position: "absolute", left: 540 - 443, top: 1114, width: 886, height: 288, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", lineHeight: 1.08, scale: `${0.86 + 0.14 * k}`, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 96, letterSpacing: -1 }}>
        {c.words.map((w, j) => {
          const gi = c.i0 + j;
          const active = sec >= w.start - 0.03 && (j === c.words.length - 1 || sec < c.words[j + 1].start - 0.03);
          const key = w.word.replace(/[,.?!]/g, "").toLowerCase();
          const danger = DANGER.has(key) && (!["three", "two", "one"].includes(key) || (gi >= COUNT0 && gi < COUNT0 + 3));
          const col = active ? (danger ? "#FF4D4D" : "#FFB800") : "#FFFFFF";
          return (
            <span key={j} style={{ display: "inline-block", margin: "0 14px", color: col, WebkitTextStroke: "16px #141824", paintOrder: "stroke fill", scale: active ? "1.08" : "1", textShadow: "0 8px 0 rgba(20,24,36,0.55)" }}>{disp(w.word, gi)}</span>
          );
        })}
      </div>
    </div>
  );
};

/** visual-only like banner over the last ~2 s (no voice line, the loop stays intact); sits above y 1560 */
const LikeBanner: React.FC = () => {
  const f = useCurrentFrame();
  const a = TOTAL - F(2.0);
  if (f < a) return null;
  const k = sp(f, a, 12, 220);
  return (
    <div style={{ position: "absolute", left: 540 - 190, top: 1440, width: 380, height: 92, borderRadius: 999, background: "#FFFFFF", border: "6px solid #141824", boxShadow: "0 8px 0 rgba(20,24,36,0.6)", display: "flex", alignItems: "center", justifyContent: "center", gap: 16, scale: `${0.6 + 0.4 * k}`, opacity: Math.min(1, k * 2), fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 46, color: "#141824" }}>
      <svg width="52" height="52" viewBox="-80 -80 160 160"><rect x="-70" y="-10" width="34" height="80" rx="6" fill="#FF4D4D" stroke="#141824" strokeWidth="9" /><path d="M -36 -6 L -6 -60 C 4 -76 26 -70 22 -48 L 16 -20 L 56 -20 C 72 -20 78 -6 74 6 L 62 58 C 58 68 50 72 40 72 L -36 72 Z" fill="#FFF" stroke="#141824" strokeWidth="9" strokeLinejoin="round" /></svg>
      LIKE
    </div>
  );
};

export const Short: React.FC = () => {
  const f = useCurrentFrame();
  let i = 0; while (i < SHOTS.length - 1 && f >= F(SHOTS[i + 1].t)) i++;
  const a = F(SHOTS[i].t), b = i < SHOTS.length - 1 ? F(SHOTS[i + 1].t) : TOTAL;
  return (
    <AbsoluteFill style={{ background: "#0B0F1A", overflow: "hidden" }}>
      <Shot key={i} i={i} a={a} b={b} />
      <Captions />
      <LikeBanner />
    </AbsoluteFill>
  );
};
