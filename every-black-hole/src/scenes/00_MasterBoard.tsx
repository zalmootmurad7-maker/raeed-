import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { CAM_OVERVIEW, camOnCard, lerpCam, MasterBoard } from "../components/MasterBoard";

const ease = Easing.bezier(0.65, 0, 0.35, 1); // cubic in-out
const Z = 12; // board zoom = 12 frames (0.4 s)

// Shot 00: wide view of all 8 cards, then a rapid Board Zoom In onto card 01.
export const Shot00: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const t = interpolate(f, [dur - Z, dur], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <MasterBoard cam={lerpCam(CAM_OVERVIEW, camOnCard(1), t)} />
    </AbsoluteFill>
  );
};

// xxb shots: Board Zoom Out (0.35 s) -> check the finished card -> pan -> Zoom In (0.35 s).
export const BoardTransition: React.FC<{ from: number; to: number; dur: number }> = ({ from, to, dur }) => {
  const f = useCurrentFrame();
  const out = Math.round(dur * 0.35), inn = Math.round(dur * 0.35);
  const mid = { s: 0.34, fx: 0, fy: 0 };
  const a = camOnCard(from), b = camOnCard(to);
  const midA = { ...mid, fx: a.fx, fy: a.fy }, midB = { ...mid, fx: b.fx, fy: b.fy };
  let cam;
  if (f < out) cam = lerpCam(a, midA, ease(f / out));
  else if (f < dur - inn) cam = lerpCam(midA, midB, ease((f - out) / Math.max(1, dur - inn - out)));
  else cam = lerpCam(midB, b, ease((f - (dur - inn)) / inn));
  const checks: Record<number, number> = {};
  for (let c = 1; c < from; c++) checks[c] = 1;
  checks[from] = interpolate(f, [out - 4, out + 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(2)) });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <MasterBoard cam={cam} checks={checks} />
    </AbsoluteFill>
  );
};
