import "./fonts";
import React from "react";
import { Composition } from "remotion";
import { FPS, H, W } from "./lib/core";
import { OxygenVideo, TOTAL_FRAMES } from "./Video";

export const RemotionRoot: React.FC = () => (
  <Composition id="Oxygen5s" component={OxygenVideo} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
);
