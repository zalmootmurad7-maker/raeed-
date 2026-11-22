import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Pop, Stamp } from "../components/Base";
import { BeatProps, ChapterTitle, Transition, WarnBeat } from "../components/Kit";
import { Atom, Brain, Earth, Head, Stage, Svg, Red, Blue, Green } from "../components/Prims";
import { C, F, FONT, LIGHT, SPACE, r, sp } from "../lib/core";

const BADGE = "0.00s (IMPOSSIBLE TO SEE)";
const BA = F(483.3);
const S: React.FC<BeatProps & { mode?: "light" | "space"; children: React.ReactNode; overlay?: React.ReactNode }> = ({ b0, b1, mode = "light", children, overlay }) => (
  <Stage mode={mode} badge={BADGE} badgeAt={BA} danger push={[b0, b1]} overlay={overlay}>{children}</Stage>
);
const T = SPACE.text;
const STAMP_BG = "rgba(14,19,31,0.92)";

export const C8Title: React.FC<BeatProps> = (p) => <ChapterTitle {...p} i={7} mode="light" badge={BADGE} reveal danger />;

// ---------- energy landscape: a shallow "false vacuum" shelf, a barrier, and a deeper "true vacuum" valley ----------
const CP: [number, number][] = [[60, 260], [300, 430], [560, 560], [760, 500], [980, 380], [1200, 560], [1460, 900], [1700, 720], [1880, 420]];
const curvePts = (() => {
  const out: [number, number][] = [];
  for (let i = 0; i < CP.length - 1; i++) {
    const p0 = CP[Math.max(0, i - 1)], p1 = CP[i], p2 = CP[i + 1], p3 = CP[Math.min(CP.length - 1, i + 2)];
    for (let s = 0; s < 20; s++) { const t = s / 20, t2 = t * t, t3 = t2 * t;
      out.push([0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3), 0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3)]); }
  }
  out.push(CP[CP.length - 1]);
  return out;
})();
const yAt = (x: number) => { for (let i = 0; i < curvePts.length - 1; i++) { const [x0, y0] = curvePts[i], [x1, y1] = curvePts[i + 1]; if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / Math.max(1e-6, x1 - x0); } return curvePts[curvePts.length - 1][1]; };
const SHELF_X = 560, DEEP_X = 1460;
const Landscape: React.FC<{ cam: { s: number; fx: number; fy: number }; draw?: number; ballX: number; labels?: number; tunnel?: number; children?: React.ReactNode }> = ({ cam, draw = 1, ballX, labels = 0, tunnel = 0, children }) => {
  const d = "M " + curvePts.map((p) => p.join(" ")).join(" L ");
  const ballY = tunnel > 0 ? yAt(SHELF_X) + (yAt(DEEP_X) - yAt(SHELF_X)) * tunnel : yAt(ballX);
  const bx = tunnel > 0 ? SHELF_X + (DEEP_X - SHELF_X) * tunnel : ballX;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${960 - cam.fx * cam.s}px, ${560 - cam.fy * cam.s}px) scale(${cam.s})`, transformOrigin: "0 0" }}>
      <Svg>
        <path d={d + " L 1880 1080 L 60 1080 Z"} fill="rgba(37,99,235,0.08)" />
        <path d={d} fill="none" stroke={LIGHT.ink} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - draw} />
        {tunnel > 0 ? <path d={`M ${SHELF_X} ${yAt(SHELF_X) - 34} Q 1000 ${yAt(980) + 60} ${DEEP_X} ${yAt(DEEP_X) - 34}`} fill="none" stroke={C.red} strokeWidth="8" strokeDasharray="18 14" /> : null}
      </Svg>
      <div style={{ position: "absolute", left: bx - 34, top: ballY - 34 - 34, width: 68, height: 68, borderRadius: 99, background: C.blue, border: `6px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
      {labels > 0 ? <>
        <div style={{ position: "absolute", left: SHELF_X - 220, top: yAt(SHELF_X) + 50, width: 440, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 44, color: C.amber, opacity: labels }}>FALSE VACUUM</div>
        <div style={{ position: "absolute", left: DEEP_X - 220, top: yAt(DEEP_X) + 40, width: 440, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 44, color: C.red, opacity: labels }}>TRUE VACUUM</div>
      </> : null}
      {children}
    </div>
  );
};
const ZOOM = { s: 1.9, fx: 560, fy: 470 }, FULL = { s: 0.92, fx: 960, fy: 560 };

export const C8Curve: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Landscape cam={ZOOM} draw={r(f, b0, b0 + 30)} ballX={340} />
      <Head at={F(488.6)} y={160}>EVERYTHING SETTLES INTO ITS <Blue>LOWEST ENERGY</Blue></Head>
    </S>
  );
};
export const C8Roll: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const x = 340 + (SHELF_X - 340) * r(f, F(491.4), F(492.8), 0, 1, Easing.inOut(Easing.quad));
  return (
    <S b0={b0} b1={b1}>
      <Landscape cam={ZOOM} ballX={x} />
      <Head at={F(491.0)} y={160}>LIKE A BALL ROLLING TO THE <Blue>BOTTOM</Blue></Head>
    </S>
  );
};
export const C8Wait: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = r(f, F(494.4), F(496.4), 0, 1, Easing.inOut(Easing.cubic));
  const cam = { s: ZOOM.s + (FULL.s - ZOOM.s) * k, fx: ZOOM.fx + (FULL.fx - ZOOM.fx) * k, fy: ZOOM.fy + (FULL.fy - ZOOM.fy) * k };
  return (
    <S b0={b0} b1={b1}>
      <Landscape cam={cam} ballX={SHELF_X} />
      <Pop at={F(493.4)} x={110} y={160} w={500} size={90} color={C.red} from="scale">WAIT…</Pop>
      <Pop at={F(494.2)} x={560} y={170} w={1260} size={56} align="right">WHAT IF WE&apos;RE NOT AT THE BOTTOM?</Pop>
    </S>
  );
};
export const C8Higgs: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = (f - b0) / 30;
  const gain = r(f, F(501.4), F(502.6));
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(499.4)} y={160}>THE <Blue>HIGGS FIELD</Blue></Head>
      {Array.from({ length: 13 * 6 }, (_, i) => { const x = 220 + (i % 13) * 123, y = 330 + Math.floor(i / 13) * 100; const w = 1 + 0.25 * Math.sin(t * 2 + i * 0.7); return <div key={i} style={{ position: "absolute", left: x - 6 * w, top: y - 6 * w, width: 12 * w, height: 12 * w, borderRadius: 99, background: "rgba(37,99,235,0.35)" }} />; })}
      {[0, 1, 2].map((i) => { const x = ((t * (300 - 120 * gain) + i * 620) % 1900) - 40; const s = 26 + 26 * gain * (i === 1 ? 1.4 : 1); return <div key={i} style={{ position: "absolute", left: x - s, top: 430 + i * 130 - s, width: s * 2, height: s * 2, borderRadius: 99, background: [C.red, C.amber, C.blue][i], border: `5px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />; })}
      <Pop at={F(501.5)} x={0} y={940} w={1920} size={52} align="center">GIVES ELEMENTARY PARTICLES THEIR <Red>MASS</Red></Pop>
    </S>
  );
};
export const C8False: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Landscape cam={FULL} ballX={SHELF_X} labels={r(f, F(504.6), F(505.2))} />
      <Head at={F(506.1)} y={160}>A <Red>TEMPORARY LEDGE</Red>?</Head>
    </S>
  );
};
export const C8Tunnel: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = r(f, F(510.9), F(511.9), 0, 1, Easing.inOut(Easing.cubic));
  return (
    <S b0={b0} b1={b1}>
      <Landscape cam={FULL} ballX={SHELF_X} labels={1} tunnel={k} />
      <Head at={F(508.4)} y={160}>A RANDOM <Red>QUANTUM GLITCH</Red> TUNNELS THROUGH</Head>
    </S>
  );
};
const Bubble: React.FC<{ cx: number; cy: number; R: number }> = ({ cx, cy, R }) => (
  <div style={{ position: "absolute", left: cx - R, top: cy - R, width: R * 2, height: R * 2, borderRadius: 9999, background: "#05070C", border: `${Math.max(6, Math.min(18, R * 0.05))}px solid ${C.red}`, boxShadow: `0 0 ${Math.min(80, R * 0.3)}px ${Math.min(20, R * 0.08)}px rgba(229,57,53,0.55)`, boxSizing: "border-box" }} />
);
export const C8Bubble: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const R = 10 + 230 * r(f, F(513.2), b1, 0, 1, Easing.out(Easing.cubic));
  return (
    <S b0={b0} b1={b1} mode="space">
      <Bubble cx={960} cy={600} R={R} />
      <Head at={F(513.4)} y={160} mode="space">A BUBBLE OF <Red>TRUE VACUUM</Red></Head>
    </S>
  );
};
export const C8Expand: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const R = 240 + 900 * r(f, b0, b1, 0, 1, Easing.in(Easing.quad));
  return (
    <S b0={b0} b1={b1} mode="space">
      {[[300, 300], [1600, 260], [1700, 800], [250, 850], [1300, 950]].map(([x, y], i) => Math.hypot(x - 960, y - 600) > R ? <div key={i} style={{ position: "absolute", left: x - 10, top: y - 10, width: 20, height: 20, borderRadius: 99, background: "#FDE68A", boxShadow: "0 0 16px 4px rgba(253,230,138,0.6)" }} /> : null)}
      <Bubble cx={960} cy={600} R={R} />
      <Pop at={F(515.6)} x={0} y={160} w={1920} size={64} align="center" color={T}>EXPANDING IN EVERY DIRECTION</Pop>
      <Pop at={F(517.8)} x={0} y={560} w={1920} size={80} align="center" color={C.red} mono>NEARLY SPEED OF LIGHT</Pop>
    </S>
  );
};
export const C8Rules: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const sh = F(520.6);
  const eq = ["E = mc²", "F = ma", "ħ", "G"];
  return (
    <S b0={b0} b1={b1} mode="space">
      {eq.map((e, i) => { const k = r(f, sh + i * 6, sh + i * 6 + 70, 0, 1, Easing.out(Easing.quad)); const x = 300 + i * 360, y = 520; return [0, 1].map((h) => <div key={`${i}${h}`} style={{ position: "absolute", left: x + (h ? 150 : 0) + (h ? 1 : -1) * 120 * k, top: y + 200 * k * (h ? 1.2 : 0.8), width: 150, height: 200, overflow: "hidden", rotate: `${(h ? 1 : -1) * 40 * k}deg`, opacity: 1 - 0.6 * k }}><div style={{ position: "absolute", left: h ? -150 : 0, top: 0, width: 300, height: 200, borderRadius: 18, background: SPACE.card, border: `3px solid ${SPACE.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 60, color: T, boxSizing: "border-box" }}>{e}</div></div>); })}
      <Head at={F(521.4)} y={160} mode="space">THE RULES OF PHYSICS: <Red>REWRITTEN</Red></Head>
    </S>
  );
};
export const C8Atoms: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = r(f, F(523.7), F(524.9));
  return (
    <S b0={b0} b1={b1} mode="space">
      {[560, 960, 1360].map((x, i) => <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, opacity: 1 - 0.7 * k }}><Atom x={x} y={580} s={160 + 200 * k} t={f / 30} mode="space" /></div>)}
      <Head at={F(523.4)} y={160} mode="space">ATOMS CAN&apos;T <Red>HOLD TOGETHER</Red></Head>
    </S>
  );
};
export const C8Dissolve: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const items = [{ at: F(526.1), x: 480 }, { at: F(526.5), x: 960 }, { at: F(527.1), x: 1440 }];
  return (
    <S b0={b0} b1={b1} mode="space">
      {items.map((it, i) => { const k = r(f, it.at + 14, it.at + 64); return <React.Fragment key={i}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, opacity: 1 - k }}>
          {i === 0 ? <div style={{ position: "absolute", left: it.x - 90, top: 500, width: 180, height: 180, borderRadius: 99, background: "#FDE68A", boxShadow: "0 0 40px 10px rgba(253,230,138,0.6)" }} /> : i === 1 ? <Earth cx={it.x} cy={590} R={95} t={f / 30} /> : <svg style={{ position: "absolute", left: it.x - 120, top: 470, overflow: "visible" }} width="240" height="240"><line x1="60" y1="150" x2="120" y2="80" stroke={T} strokeWidth="10" /><line x1="180" y1="150" x2="120" y2="80" stroke={T} strokeWidth="10" /><circle cx="120" cy="80" r="44" fill={C.red} stroke="#141824" strokeWidth="6" /><circle cx="60" cy="150" r="30" fill="#F6F4EF" stroke="#141824" strokeWidth="6" /><circle cx="180" cy="150" r="30" fill="#F6F4EF" stroke="#141824" strokeWidth="6" /></svg>}
        </div>
        {k > 0 && k < 1 ? Array.from({ length: 14 }, (_, j) => <div key={j} style={{ position: "absolute", left: it.x + Math.cos(j * 2.4) * 150 * k, top: 590 + Math.sin(j * 1.9) * 120 * k - 60 * k, width: 10, height: 10, borderRadius: 2, background: j % 2 ? C.red : "#94A3B8", opacity: 1 - k }} />) : null}
        <Pop at={it.at} x={it.x - 200} y={760} w={400} size={44} align="center" color={T}>{["STARS", "PLANETS", "MOLECULES"][i]}</Pop>
      </React.Fragment>; })}
      <Head at={F(527.6)} y={160} mode="space">INSTANTLY <Red>DISSOLVE</Red></Head>
    </S>
  );
};
export const C8Relief: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  return (
    <S b0={b0} b1={b1}>
      <Head at={F(529.4)} y={160}>OUR VACUUM SHOULD LAST…</Head>
      <div style={{ position: "absolute", left: 200, top: 460, width: 260 * r(f, b0 + 8, b0 + 24), height: 70, borderRadius: 35, background: C.blue, border: `4px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
      <Pop at={b0 + 16} x={200} y={560} w={600} size={44}>13.8 BILLION YEARS</Pop>
      <Pop at={b0 + 20} x={200} y={620} w={600} size={36} color="#64748B">THE UNIVERSE SO FAR</Pop>
    </S>
  );
};
export const C8Longer: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const k = r(f, F(532.2), b1, 0, 1, Easing.in(Easing.quad));
  return (
    <S b0={b0} b1={b1}>
      <div style={{ position: "absolute", left: 200, top: 460, width: 260, height: 70, borderRadius: 35, background: C.blue, border: `4px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
      <Pop at={b0} x={200} y={560} w={600} size={44}>13.8 BILLION YEARS</Pop>
      <div style={{ position: "absolute", left: 200, top: 300, width: 260 + 2000 * k, height: 70, borderRadius: 35, background: C.green, border: `4px solid ${LIGHT.ink}`, boxSizing: "border-box" }} />
      <Pop at={F(532.4)} x={700} y={160} w={1100} size={80} align="right" color={C.green}>FAR, FAR LONGER</Pop>
      <Pop at={F(533.8)} x={0} y={800} w={1920} size={52} align="center">THAN THE UNIVERSE HAS EXISTED SO FAR</Pop>
    </S>
  );
};
export const C8IfEver: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1}>
    <Pop at={F(535.9)} x={0} y={400} w={1920} size={110} align="center" from="scale">BUT IF IT</Pop>
    <Pop at={F(536.3)} x={0} y={530} w={1920} size={110} align="center" color={C.red} from="scale">EVER DID HAPPEN?</Pop>
  </S>
);
export const C8Unseen: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame(); const t = f / 30;
  const edge = -400 + 1500 * r(f, b0, b1, 0, 1, Easing.in(Easing.quad));
  return (
    <S b0={b0} b1={b1} mode="space">
      <Earth cx={1500} cy={600} R={170} t={t} />
      <div style={{ position: "absolute", left: edge - 2400, top: 600 - 2400, width: 4800, height: 4800, borderRadius: 9999, border: `10px dashed rgba(229,57,53,0.5)`, boxSizing: "border-box" }} />
      <Pop at={F(539.8)} x={110} y={160} w={1000} size={60} color={T}>THE WALL MOVES AT <Red>NEARLY LIGHT SPEED</Red></Pop>
      <Pop at={F(541.3)} x={110} y={880} w={1200} size={60} color={T}>YOU COULD <Red>NEVER</Red> SEE IT COMING</Pop>
    </S>
  );
};
export const C8Nerve: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const sig = r(f, b0 + 6, b1, 0, 0.35, Easing.linear);
  const wall = -300 + 2600 * r(f, b0 + 20, b1 - 20, 0, 1, Easing.in(Easing.quad));
  return (
    <S b0={b0} b1={b1} mode="space">
      <Brain x={1500} y={560} s={260} />
      <Svg><path d="M 300 560 C 600 400 900 720 1340 560" fill="none" stroke="#FBCFE8" strokeWidth="10" strokeDasharray="20 12" /></Svg>
      <div style={{ position: "absolute", left: 300 + (1340 - 300) * sig - 20, top: 560 - 20 + Math.sin(sig * 6) * 60, width: 40, height: 40, borderRadius: 99, background: "#FDE68A", boxShadow: "0 0 20px 6px rgba(253,230,138,0.7)" }} />
      <div style={{ position: "absolute", left: wall - 3000, top: 560 - 3000, width: 3000 * 2, height: 3000 * 2, borderRadius: 9999, background: "#05070C", border: `16px solid ${C.red}`, boxSizing: "border-box", boxShadow: "0 0 60px 20px rgba(229,57,53,0.5)" }} />
      <Pop at={F(547.9)} x={0} y={160} w={1920} size={64} align="center" color={T}>FASTER THAN A <Red>NERVE SIGNAL</Red> CAN REACH YOUR BRAIN</Pop>
    </S>
  );
};
export const C8End: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} mode="space"><WarnBeat b0={b0} b1={b1} mode="space" at={F(551.8)} value="0.00 SECONDS" /></S>
);
export const C8End2: React.FC<BeatProps> = ({ b0, b1 }) => (
  <S b0={b0} b1={b1} mode="space"><Stamp at={F(554.3)} x={320} y={430} text="LITERALLY IMPOSSIBLE TO DETECT" size={84} bg={STAMP_BG} rot={-3} /></S>
);
export const C8ToOutro: React.FC<BeatProps> = (p) => <Transition {...p} next={7} reveal8 />;

export const CH8 = [
  { t: 483.3, C: C8Title }, { t: 485.9, C: C8Curve }, { t: 490.8, C: C8Roll }, { t: 493.4, C: C8Wait }, { t: 497.7, C: C8Higgs }, { t: 501.3, C: C8Higgs },
  { t: 503.7, C: C8False }, { t: 507.6, C: C8Tunnel }, { t: 512.6, C: C8Bubble }, { t: 515.3, C: C8Expand }, { t: 519.2, C: C8Rules },
  { t: 523.4, C: C8Atoms }, { t: 526.1, C: C8Dissolve }, { t: 529.3, C: C8Relief }, { t: 532.2, C: C8Longer }, { t: 535.9, C: C8IfEver },
  { t: 537.96, C: C8Unseen },
];
export const CH8_END = [{ t: 547.72, C: C8Nerve }, { t: 550.84, C: C8End }, { t: 554.0, C: C8End2 }];
export const _u8 = [sp, Green, C8ToOutro];
