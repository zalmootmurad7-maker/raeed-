import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { Count, Pill, Pop, SpaceBg, WarningBadge } from "../components/Base";
import { C, F, FONT, SPACE, r } from "../lib/core";
import { BeatProps } from "./Hook";

// Full-stage solar pieces (no character: the diagram owns ~90% of the frame).
export const SunBody: React.FC<{ cx: number; cy: number; R: number; t: number }> = ({ cx, cy, R, t }) => (
  <>
    <div style={{ position: "absolute", left: cx - R * 1.7, top: cy - R * 1.7, width: R * 3.4, height: R * 3.4, borderRadius: 9999, background: "radial-gradient(circle, rgba(245,158,11,0.55) 0%, rgba(245,158,11,0.25) 38%, rgba(0,0,0,0) 62%)" }} />
    <svg style={{ position: "absolute", left: cx - R * 1.4, top: cy - R * 1.4, overflow: "visible" }} width={R * 2.8} height={R * 2.8}>
      <g transform={`translate(${R * 1.4} ${R * 1.4})`}>
        {Array.from({ length: 28 }, (_, i) => { const a = (i / 28) * Math.PI * 2 + t * 0.05; const L = R * (1.08 + 0.05 * Math.sin(t * 1.3 + i * 2.1)); return <path key={i} d={`M ${Math.cos(a - 0.05) * R} ${Math.sin(a - 0.05) * R} L ${Math.cos(a) * L} ${Math.sin(a) * L} L ${Math.cos(a + 0.05) * R} ${Math.sin(a + 0.05) * R} Z`} fill={i % 2 ? C.amber : "#FB923C"} />; })}
        <circle r={R} fill="url(#sunG)" stroke="#141824" strokeWidth="8" />
        {/* magnetic loops on the limb, gently pulsing */}
        {[-0.5, -0.1, 0.3].map((a, i) => { const s = 1 + 0.04 * Math.sin(t * 2 + i); const x0 = Math.cos(a - 0.12) * R, y0 = Math.sin(a - 0.12) * R, x1 = Math.cos(a + 0.12) * R, y1 = Math.sin(a + 0.12) * R, mx = Math.cos(a) * R * 1.32 * s, my = Math.sin(a) * R * 1.32 * s; return <path key={i} d={`M ${x0} ${y0} Q ${mx} ${my} ${x1} ${y1}`} fill="none" stroke={C.red} strokeWidth="9" strokeLinecap="round" opacity="0.9" />; })}
        <defs><radialGradient id="sunG"><stop offset="0%" stopColor="#FFF4D6" /><stop offset="55%" stopColor="#FBBF24" /><stop offset="100%" stopColor="#F59E0B" /></radialGradient></defs>
      </g>
    </svg>
  </>
);
export const Earth: React.FC<{ cx: number; cy: number; R: number; t: number; hit?: number }> = ({ cx, cy, R, t, hit = 0 }) => (
  <>
    {hit > 0 ? <div style={{ position: "absolute", left: cx - R * 1.9, top: cy - R * 1.9, width: R * 3.8, height: R * 3.8, borderRadius: 9999, background: `radial-gradient(circle, rgba(16,185,129,${0.0}) 52%, rgba(16,185,129,${0.55 * hit}) 58%, rgba(168,85,247,${0.35 * hit}) 64%, rgba(0,0,0,0) 72%)` }} /> : null}
    <svg style={{ position: "absolute", left: cx - R, top: cy - R, overflow: "visible" }} width={R * 2} height={R * 2}>
      <defs><clipPath id={`ec${R}`}><circle cx={R} cy={R} r={R - 3} /></clipPath></defs>
      <circle cx={R} cy={R} r={R} fill={C.blue} />
      <g clipPath={`url(#ec${R})`}>
        {[[0.2, 0.35, 0.32, 0.22], [0.62, 0.62, 0.26, 0.3], [0.5, 0.15, 0.2, 0.12]].map(([x, y, w, h], i) => { const dx = ((t * 0.04 + x) % 1.3) - 0.15; return <ellipse key={i} cx={dx * R * 2} cy={y * R * 2} rx={w * R} ry={h * R} fill={C.green} stroke="#141824" strokeWidth="4" />; })}
      </g>
      <circle cx={R} cy={R} r={R} fill="none" stroke="#141824" strokeWidth="7" />
      <circle cx={R} cy={R} r={R + 8} fill="none" stroke="#93C5FD" strokeWidth="5" opacity="0.6" />
    </svg>
  </>
);

// ---------- Beat 26: 228.00–234.46  CARRINGTON: plasma races 150M KM in 17.6 HOURS ----------
export const C4Race: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const sun = { cx: -70, cy: 560, R: 410 }, earth = { cx: 1630, cy: 560, R: 96 };
  const go = F(229.12), arrive = F(233.58);
  const k = r(f, go, arrive, 0, 1, Easing.inOut(Easing.sin));
  const startX = sun.cx + sun.R + 40, endX = earth.cx - earth.R - 30;
  const cx = startX + (endX - startX) * k;
  const cw = 70 + 150 * k; // the cloud widens as it travels
  const hit = r(f, arrive, arrive + 12);
  const cam = 1 + 0.03 * r(f, b0, b1, 0, 1, Easing.linear);
  return (
    <>
      <SpaceBg />
      <div style={{ position: "absolute", inset: 0, scale: `${cam}`, transformOrigin: "60% 55%" }}>
        <SunBody cx={sun.cx} cy={sun.cy} R={sun.R} t={t} />
        {/* the CME: an amber plasma shell + streaming particles behind it */}
        {f >= go ? (
          <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
            {Array.from({ length: 26 }, (_, i) => { const ph = (i / 26 + t * 0.9) % 1; const px = startX + (cx - startX) * ph; const py = sun.cy + Math.sin(i * 2.3) * (40 + 120 * ph * k); return <circle key={i} cx={px} cy={py} r={4 + 3 * ph} fill={i % 3 ? C.amber : "#FDBA74"} opacity={0.35 + 0.5 * ph} />; })}
            <path d={`M ${cx - cw * 0.35} ${sun.cy - 60 - 160 * k} Q ${cx + cw * 0.55} ${sun.cy} ${cx - cw * 0.35} ${sun.cy + 60 + 160 * k}`} fill="none" stroke={C.amber} strokeWidth={30} strokeLinecap="round" opacity={1 - 0.6 * hit} />
            <path d={`M ${cx - cw * 0.35} ${sun.cy - 60 - 160 * k} Q ${cx + cw * 0.55} ${sun.cy} ${cx - cw * 0.35} ${sun.cy + 60 + 160 * k}`} fill="none" stroke="#FFF4D6" strokeWidth={9} strokeLinecap="round" opacity={1 - 0.6 * hit} />
          </svg>
        ) : null}
        <Earth cx={earth.cx} cy={earth.cy} R={earth.R} t={t} hit={hit} />
        {/* distance arrow (labels keep ≥36 px from the Sun and Earth) */}
        {f >= F(229.38) ? (
          <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible", opacity: r(f, F(229.38), F(229.38) + 8) }} width="1" height="1">
            <line x1={startX + 20} y1={890} x2={startX + 20 + (endX - startX - 40) * r(f, F(229.38), F(229.38) + 18)} y2={890} stroke={SPACE.border} strokeWidth="6" strokeLinecap="round" strokeDasharray="18 14" />
            <path d={`M ${startX + 44} 870 L ${startX + 20} 890 L ${startX + 44} 910`} fill="none" stroke={SPACE.border} strokeWidth="6" strokeLinecap="round" />
            {r(f, F(229.38), F(229.38) + 18) >= 1 ? <path d={`M ${endX - 44} 870 L ${endX - 20} 890 L ${endX - 44} 910`} fill="none" stroke={SPACE.border} strokeWidth="6" strokeLinecap="round" /> : null}
          </svg>
        ) : null}
      </div>
      {/* labels sit outside the camera layer so they never collide or clip */}
      <div style={{ position: "absolute", left: 96, top: 56 }}><Pill text="1859 · CARRINGTON EVENT" color={C.red} size={34} /></div>
      <Pop at={F(229.12)} x={560} y={160} w={800} size={40} color={SPACE.text} align="center">CROSSED THE GAP IN</Pop>
      <Count a={F(229.12)} b={F(233.58)} from={0} to={17.6} fmt={(v) => `${v.toFixed(1)} HOURS`} x={560} y={210} w={800} size={110} color={C.amber} align="center" />
      <Pop at={F(229.38)} x={560} y={930} w={800} size={56} color={SPACE.text} align="center" mono>150M KM</Pop>
      <Pop at={F(233.58)} x={earth.cx - 220} y={earth.cy - earth.R - 160} w={440} size={36} color={C.green} align="center">DIRECT HIT</Pop>
      <WarningBadge value="~18 HOURS TO 3 DAYS" at={F(209.96)} mode="space" />
    </>
  );
};

// ---------- Beat 25: 209.96–228.00 placeholder-free launch (title card + Sun field lines snap) ----------
export const C4Launch: React.FC<BeatProps> = ({ b0 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const snap = F(216.32);
  return (
    <>
      <SpaceBg />
      <div style={{ position: "absolute", inset: 0, scale: `${1 + 0.04 * r(f, b0, b0 + 300, 0, 1, Easing.linear)}`, transformOrigin: "40% 55%" }}>
        <SunBody cx={700} cy={600} R={300} t={t} />
        {f >= snap ? <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
          {[0, 1, 2].map((i) => { const k = r(f, snap + i * 3, snap + i * 3 + 30); return <path key={i} d={`M ${1000} ${560 + i * 30} Q ${1180 + 500 * k} ${400 - 200 * k + i * 80} ${1200 + 700 * k} ${600 + i * 40}`} fill="none" stroke={C.amber} strokeWidth={18 - i * 4} strokeLinecap="round" opacity={1 - 0.3 * k} />; })}
        </svg> : null}
      </div>
      <div style={{ position: "absolute", left: 96, top: 56 }}><Pill text="04 · SOLAR SUPERSTORM" size={34} /></div>
      <Pop at={F(221.7)} x={1060} y={860} w={800} size={54} color={SPACE.text} align="center">CORONAL MASS EJECTION</Pop>
      <WarningBadge value="~18 HOURS TO 3 DAYS" at={b0} mode="space" />
      <div style={{ position: "absolute", left: 0, top: 0, fontFamily: FONT.head, opacity: 0 }}>.</div>
    </>
  );
};
