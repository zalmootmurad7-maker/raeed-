import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { CAM_OVERVIEW, camOnCard, lerpCam, MasterBoard } from "../components/MasterBoard";

const ease = Easing.bezier(0.65, 0, 0.35, 1);
// Board hook: overview held (cards 1-2 flash, #10 pulses red with "?"), then a 0.4 s zoom into card 01.
export const BoardHook: React.FC<{ dur: number; holdFrames?: number }> = ({ dur, holdFrames = 54 }) => {
  const f = useCurrentFrame();
  const zoomStart = Math.max(holdFrames, dur - 12);
  const t = interpolate(f, [zoomStart, zoomStart + 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  const pulse = 0.5 + 0.5 * Math.sin((f / 30) * Math.PI * 2 * 0.8);
  const flash = f < zoomStart ? (f % 40 < 20 ? [1] : [2]) : [];
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <MasterBoard cam={lerpCam(CAM_OVERVIEW, camOnCard(1), t)} mystery10 pulse10={0.4 + 0.6 * pulse} flash={flash} />
    </AbsoluteFill>
  );
};
export const BoardTransition: React.FC<{ from: number; to: number; dur: number }> = ({ from, to, dur }) => {
  const f = useCurrentFrame();
  const out = Math.round(dur * 0.35), inn = Math.round(dur * 0.35);
  const a = camOnCard(from), b = camOnCard(to);
  const midA = { s: 0.34, fx: a.fx, fy: a.fy }, midB = { s: 0.34, fx: b.fx, fy: b.fy };
  let cam;
  if (f < out) cam = lerpCam(a, midA, ease(f / out));
  else if (f < dur - inn) cam = lerpCam(midA, midB, ease((f - out) / Math.max(1, dur - inn - out)));
  else cam = lerpCam(midB, b, ease((f - (dur - inn)) / inn));
  const checks: Record<number, number> = {};
  for (let c = 1; c < from; c++) checks[c] = 1;
  checks[from] = interpolate(f, [out - 4, out + 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });
  return <AbsoluteFill style={{ overflow: "hidden" }}><MasterBoard cam={cam} checks={checks} mystery10={to < 10} /></AbsoluteFill>;
};
