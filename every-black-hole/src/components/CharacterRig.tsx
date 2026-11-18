import React from "react";
import { Img, interpolate, Easing, staticFile, useCurrentFrame } from "remotion";
import type { Mode } from "../tokens";
import type { Pose } from "../shots";
import { stepped, useBoil } from "./boil";

// Never draw the character in code: load the pre-cut PNGs (CLAUDE.md §4).
// Stepped 10 fps pop-in + subtle line boil.
export const CharacterRig: React.FC<{
  mode: Mode;
  pose: Pose;
  x: number; // centre x on screen
  bottom: number; // feet line (y) on screen
  height: number;
  flip?: boolean;
  enterAt?: number; // frame (local) when the pose pops in
  seed?: number;
}> = ({ mode, pose, x, bottom, height, flip, enterAt = 0, seed = 7 }) => {
  const f = useCurrentFrame();
  const sf = stepped(f);
  const b = useBoil(seed);
  const pop = interpolate(sf, [enterAt, enterAt + 9], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2.2)),
  });
  return (
    <Img
      src={staticFile(`assets/character/${mode === "light" ? "light" : "space"}/${pose}.png`)}
      style={{
        position: "absolute",
        height,
        left: x,
        top: bottom - height,
        translate: `calc(-50% + ${b.x}px) ${b.y}px`,
        rotate: `${b.r}deg`,
        scale: `${flip ? -pop : pop} ${pop}`,
        transformOrigin: "50% 100%",
      }}
    />
  );
};
