import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { DURATION_S, F } from "./lib/core";
import { BeatProps } from "./components/Kit";
import { H1Couch, H2Board, H3Through, H4Civ, H5Erase, H6Eight, H7Bar, H8ZoomIn } from "./scenes/Hook";
import { CH1 } from "./scenes/Ch1";
import { CH2 } from "./scenes/Ch2";
import { CH3 } from "./scenes/Ch3";
import { CH4 } from "./scenes/Ch4b";
import { CH5 } from "./scenes/Ch5";
import { CH6 } from "./scenes/Ch6";
import { CH7 } from "./scenes/Ch7";
import { CH8, CH8_END } from "./scenes/Ch8b";
import { C8Couch } from "./scenes/Ch8";
import { OUTRO } from "./scenes/Outro";

// Timeline: every beat starts on a spoken word (audio/timestamps.json) and runs until the next beat starts.
export const BEATS: { t: number; C: React.FC<BeatProps> }[] = [
  { t: 0.0, C: H1Couch }, { t: 3.12, C: H2Board }, { t: 5.36, C: H3Through }, { t: 7.06, C: H4Civ },
  { t: 9.4, C: H5Erase }, { t: 13.22, C: H6Eight }, { t: 16.04, C: H7Bar }, { t: 18.98, C: H8ZoomIn },
  ...CH1, ...CH2, ...CH3, ...CH4, ...CH5, ...CH6, ...CH7, ...CH8,
  { t: 543.06, C: C8Couch }, ...CH8_END, ...OUTRO,
];

export const TOTAL_FRAMES = F(DURATION_S);

export const UniverseKill: React.FC = () => {
  const f = useCurrentFrame();
  let i = 0;
  while (i < BEATS.length - 1 && f >= F(BEATS[i + 1].t)) i++;
  const b0 = F(BEATS[i].t), b1 = i < BEATS.length - 1 ? F(BEATS[i + 1].t) : TOTAL_FRAMES;
  const S = BEATS[i].C;
  return <AbsoluteFill><S key={i} b0={b0} b1={b1} /></AbsoluteFill>;
};
