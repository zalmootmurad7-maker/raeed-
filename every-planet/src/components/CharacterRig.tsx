import React from "react";
import { Img, interpolate, Easing, staticFile, useCurrentFrame } from "remotion";
import type { Mode } from "../tokens";
import type { Pose } from "../shots";

// Never draw the character in code: load the PNGs. Crisp and steady at 30 fps:
// smooth ease-out entry (scale 0.96 -> 1 over 10 frames), no jitter.
// Space Mode only: a very slow, subtle float (±5 px over ~6 s).
export const CharacterRig: React.FC<{
  mode: Mode;
  pose: Pose;
  x: number;
  bottom: number;
  height: number;
  flip?: boolean;
  enterAt?: number;
  seed?: number;
}> = ({ mode, pose, x, bottom, height, flip, enterAt = 0 }) => {
  const f = useCurrentFrame();
  const k = interpolate(f, [enterAt, enterAt + 10], [0.96, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const float = mode === "space" ? Math.sin((f / 30) * ((2 * Math.PI) / 6)) * 5 : 0;
  return (
    <Img
      src={staticFile(`assets/character/${mode === "light" ? "light" : "space"}/${pose}.png`)}
      style={{
        position: "absolute",
        height,
        left: x,
        top: bottom - height,
        translate: `-50% ${float}px`,
        scale: `${flip ? -k : k} ${k}`,
        transformOrigin: "50% 100%",
      }}
    />
  );
};
