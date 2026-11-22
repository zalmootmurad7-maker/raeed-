import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { LightBg, Pop, SpaceBg, WarningBadge } from "../components/Base";
import { Couch } from "../components/Char";
import { C, F, FONT, LIGHT, r } from "../lib/core";
import { BeatProps } from "./Hook";

// ---------- Beat 53: 543.06–547.72  couch climax — "one instant you're on your couch, and the next… RESET" ----------
const Atom: React.FC<{ x: number; y: number; s: number; t: number; o: number }> = ({ x, y, s, t, o }) => (
  <svg style={{ position: "absolute", left: x - s, top: y - s, overflow: "visible", opacity: o }} width={s * 2} height={s * 2}>
    <g transform={`translate(${s} ${s}) rotate(${t * 30})`}>
      {[0, 60, 120].map((a) => <ellipse key={a} rx={s * 0.95} ry={s * 0.36} fill="none" stroke={LIGHT.ink} strokeWidth="5" transform={`rotate(${a})`} />)}
      <circle r={s * 0.16} fill={C.blue} stroke={LIGHT.ink} strokeWidth="4" />
    </g>
  </svg>
);

export const C8Couch: React.FC<BeatProps> = ({ b0, b1 }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const snap = F(544.84), done = F(546.45);
  const shocked = f >= snap;
  // the true-vacuum wall: edge of a huge circle centred off-screen right, sweeping right -> left
  const edge = 2000 - 2500 * r(f, snap + 12, done, 0, 1, Easing.inOut(Easing.sin));
  const BC = { x: 2900, y: 540 };
  const R = BC.x - edge;
  const w = 1040, x = 960 - w / 2, bottom = 1040;
  const cam = 1 + 0.04 * r(f, b0, b1, 0, 1, Easing.linear);
  const covered = (px: number) => px > edge;
  return (
    <>
      <LightBg />
      <div style={{ position: "absolute", inset: 0, scale: `${cam}`, transformOrigin: "50% 60%" }}>
        {/* everyday room details that get erased as the wall passes */}
        {[[260, 300, 54], [1640, 330, 60], [1500, 780, 46], [380, 800, 50]].map(([ax, ay, s], i) => <Atom key={i} x={ax} y={ay} s={s} t={t} o={covered(ax) ? 0 : 1} />)}
        <Couch pose={shocked ? "couch_shocked" : "couch_chill"} x={x} bottom={bottom} w={w} at={shocked ? snap : b0} flip={shocked} />
        {/* the bubble (drawn above the room: inside it, everything is gone) */}
        {f >= snap ? (
          <div style={{ position: "absolute", left: BC.x - R, top: BC.y - R, width: R * 2, height: R * 2, borderRadius: 9999, background: "#0E131F", border: `18px solid ${C.red}`, boxShadow: `0 0 70px 20px rgba(229,57,53,0.55)`, boxSizing: "border-box" }} />
        ) : null}
      </div>
      {/* dissolving debris inside the bubble, just behind the wall */}
      {f >= snap ? Array.from({ length: 22 }, (_, i) => { const ph = ((t * 1.4 + i / 22) % 1); const px = edge + 40 + ph * 520; const py = 80 + ((i * 97) % 920); return px < 1920 ? <div key={i} style={{ position: "absolute", left: px, top: py, width: 10, height: 10, borderRadius: 2, background: i % 2 ? C.red : "#94A3B8", opacity: 0.9 * (1 - ph) }} /> : null; }) : null}
      {/* kinetic words on the left (always ≥36 px from the couch) */}
      {!shocked ? <Pop at={F(543.06)} x={80} y={120} w={1760} size={72} align="center">ONE INSTANT, YOU&apos;RE ON YOUR COUCH…</Pop> : null}
      {shocked && f < F(545.66) ? <Pop at={snap} x={110} y={110} w={900} size={80} align="left" color={LIGHT.ink}>AND THE NEXT…</Pop> : null}
      {f >= F(546.34) ? <Pop at={F(546.34)} x={0} y={440} w={1920} size={190} align="center" color={C.red} from="scale" mono>RESET</Pop> : null}
      {(() => { let fc = snap; while (fc < done && 2000 - 2500 * r(fc, snap + 12, done, 0, 1, Easing.inOut(Easing.sin)) > 120) fc++; const at = Math.max(F(545.66), fc); return f >= at && f < F(546.34) ? <Pop at={at} x={0} y={470} w={1920} size={80} align="center" color="#F6F4EF">THE UNIVERSE HITS…</Pop> : null; })()}
      <WarningBadge value="0.00s (IMPOSSIBLE TO SEE)" at={b0} mode={covered(1700) ? "space" : "light"} danger />
      <div style={{ display: "none", fontFamily: FONT.head }} />
    </>
  );
};

// After the reset: the dark void (used until the next beat is built)
export const C8Void: React.FC<BeatProps> = ({ b0 }) => (
  <>
    <SpaceBg />
    <Pop at={b0} x={0} y={460} w={1920} size={80} align="center" color="#F6F4EF">FASTER THAN A NERVE SIGNAL</Pop>
    <WarningBadge value="0.00s (IMPOSSIBLE TO SEE)" at={b0} mode="space" danger />
  </>
);
