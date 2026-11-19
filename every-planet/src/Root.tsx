import "./fonts";
import React from "react";
import { Composition } from "remotion";
import { EveryPlanet, TOTAL_FRAMES } from "./Video";
import { FPS, H, W } from "./tokens";

export const RemotionRoot: React.FC = () => (
  <Composition id="EveryPlanet" component={EveryPlanet} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
);
