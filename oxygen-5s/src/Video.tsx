import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LightBg, Pill } from "./components/Base";
import { BeatProps } from "./components/Oxy";
import { DURATION_S, F } from "./lib/core";
import { Ears, GalileoBeat, HookCouch, SkyFire, Twist } from "./scenes/Test";

const Todo = (label: string): React.FC<BeatProps> => () => (<AbsoluteFill><LightBg /><div style={{ position: "absolute", left: 96, top: 480 }}><Pill text={label} color="#94A3B8" size={40} /></div></AbsoluteFill>);
// Test-frame stage: only the 4 reviewed beats are built; the rest is placeholder until approval.
export const BEATS: { t: number; C: React.FC<BeatProps> }[] = [
  { t: 0, C: HookCouch }, { t: 3.3, C: Todo("hook — next") },
  { t: 41.2, C: Ears }, { t: 45.0, C: Todo("next") },
  { t: 122.2, C: GalileoBeat }, { t: 133.4, C: Todo("next") },
  { t: 174.3, C: SkyFire }, { t: 181.7, C: Twist }, { t: 196.4, C: Todo("outro — next") },
];
export const TOTAL_FRAMES = F(DURATION_S);
export const OxygenVideo: React.FC = () => {
  const f = useCurrentFrame();
  let i = 0; while (i < BEATS.length - 1 && f >= F(BEATS[i + 1].t)) i++;
  const b0 = F(BEATS[i].t), b1 = i < BEATS.length - 1 ? F(BEATS[i + 1].t) : TOTAL_FRAMES;
  const S = BEATS[i].C;
  return <AbsoluteFill><S key={i} b0={b0} b1={b1} /></AbsoluteFill>;
};
