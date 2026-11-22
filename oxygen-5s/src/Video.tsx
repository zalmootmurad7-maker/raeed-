import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { BeatProps } from "./components/Oxy";
import { DURATION_S, F } from "./lib/core";
import * as S from "./scenes/Scenes";
import { Ears, GalileoBeat, HookCouch, SkyFire, Twist } from "./scenes/Test";

// Every beat starts on a spoken word (audio/timestamps.json). No beat holds a static frame: each has its own motion.
export const BEATS: { t: number; C: React.FC<BeatProps>; name: string }[] = [
  { t: 0, C: HookCouch, name: "HookCouch" }, { t: 3.32, C: S.AtomsEarth, name: "AtomsEarth" }, { t: 7.02, C: S.CouchFive, name: "CouchFive" },
  { t: 9.18, C: S.Viral, name: "Viral" }, { t: 11.3, C: S.Myths, name: "Myths" }, { t: 16.32, C: S.Wrong, name: "Wrong" },
  { t: 21.44, C: S.Experiment, name: "Experiment" }, { t: 25.74, C: S.Speeds, name: "Speeds" }, { t: 29.24, C: S.SlowMo, name: "SlowMo" },
  { t: 30.44, C: S.Pressure, name: "Pressure" }, { t: 35.58, C: S.Teleport, name: "Teleport" }, { t: 41.16, C: Ears, name: "Ears" },
  { t: 44.96, C: S.LungsBeat, name: "Lungs" }, { t: 51.32, C: S.Engines, name: "Engines" }, { t: 57.2, C: S.SkyDim, name: "SkyDim" },
  { t: 63.26, C: S.Pilots, name: "Pilots" }, { t: 67.1, C: S.Ozone, name: "Ozone" }, { t: 71.28, C: S.UV, name: "UV" },
  { t: 76.1, C: S.Skip, name: "Skip" }, { t: 78.94, C: S.TwoSec, name: "TwoSec" }, { t: 81.8, C: S.Crust, name: "Crust" },
  { t: 86.6, C: S.Silicate, name: "Silicate" }, { t: 90.78, C: S.Collapse, name: "Collapse" }, { t: 99.46, C: S.Fracture, name: "Fracture" },
  { t: 104.04, C: S.Metals, name: "Metals" }, { t: 107.56, C: S.Oxide, name: "Oxide" }, { t: 113.8, C: S.ColdWeld, name: "ColdWeld" },
  { t: 120.42, C: S.NotSciFi, name: "NotSciFi" }, { t: 122.24, C: GalileoBeat, name: "Galileo" }, { t: 133.44, C: S.Oceans, name: "Oceans" },
  { t: 135.76, C: S.Water89, name: "Water89" }, { t: 139.18, C: S.FlashH2, name: "FlashH2" }, { t: 145.2, C: S.Thousand, name: "Thousand" },
  { t: 148.02, C: S.Erupt, name: "Erupt" }, { t: 155.62, C: S.NotSpace, name: "NotSpace" }, { t: 159.52, C: S.SnapBack, name: "SnapBack" },
  { t: 164.72, C: S.Mix, name: "Mix" }, { t: 169.1, C: S.NoSpark, name: "NoSpark" }, { t: 171.1, C: S.Igniters, name: "Igniters" },
  { t: 175.2, C: SkyFire, name: "SkyFire" }, { t: 181.72, C: Twist, name: "Twist" }, { t: 196.4, C: S.Outro, name: "Outro" },
];
export const TOTAL_FRAMES = F(DURATION_S);
export const OxygenVideo: React.FC = () => {
  const f = useCurrentFrame();
  let i = 0; while (i < BEATS.length - 1 && f >= F(BEATS[i + 1].t)) i++;
  const b0 = F(BEATS[i].t), b1 = i < BEATS.length - 1 ? F(BEATS[i + 1].t) : TOTAL_FRAMES;
  const C = BEATS[i].C;
  return <AbsoluteFill><C key={i} b0={b0} b1={b1} /></AbsoluteFill>;
};
