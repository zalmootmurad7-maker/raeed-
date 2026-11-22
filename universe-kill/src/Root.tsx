import "./fonts";
import React from "react";
import { Composition } from "remotion";
import { FPS, H, W } from "./lib/core";
import { TOTAL_FRAMES, UniverseKill } from "./Video";

export const RemotionRoot: React.FC = () => (
  <Composition id="UniverseKill" component={UniverseKill} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
);
