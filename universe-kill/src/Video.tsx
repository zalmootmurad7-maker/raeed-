import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LightBg, Pill } from "./components/Base";
import { DURATION_S, F, FONT, LIGHT } from "./lib/core";
import { BeatProps, H1Couch, H2Board, H3Through, H4Civ, H5Erase, H6Eight, H7Bar, H8ZoomIn } from "./scenes/Hook";
import { C4Launch, C4Race } from "./scenes/Ch4";
import { C8Couch, C8Void } from "./scenes/Ch8";

// Timeline: every beat starts on a spoken word (audio/timestamps.json). A beat runs until the next one starts.
// Beats not built yet render a clearly-labelled placeholder (test-frame stage only).
const Todo = (label: string): React.FC<BeatProps> => () => (
  <AbsoluteFill><LightBg /><div style={{ position: "absolute", left: 96, top: 480 }}><Pill text={label} color="#94A3B8" size={40} /></div><div style={{ display: "none", fontFamily: FONT.head, color: LIGHT.ink }} /></AbsoluteFill>
);
export const BEATS: { t: number; C: React.FC<BeatProps> }[] = [
  { t: 0.0, C: H1Couch },
  { t: 3.12, C: H2Board },
  { t: 5.36, C: H3Through },
  { t: 7.06, C: H4Civ },
  { t: 9.4, C: H5Erase },
  { t: 13.22, C: H6Eight },
  { t: 16.04, C: H7Bar },
  { t: 18.98, C: H8ZoomIn },
  { t: 19.9, C: Todo("CH 1 · COSMIC RAYS — next") },
  { t: 209.96, C: C4Launch },
  { t: 228.0, C: C4Race },
  { t: 234.46, C: Todo("CH 4 · effects — next") },
  { t: 543.06, C: C8Couch },
  { t: 547.72, C: C8Void },
  { t: 550.84, C: Todo("CH 8 · end + outro — next") },
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
