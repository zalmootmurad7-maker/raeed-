import "./fonts";
import React from "react";
import { Composition } from "remotion";
import { EveryBlackHole } from "./Video";
import { TOTAL_FRAMES } from "./shots";
import { FPS, H, W } from "./tokens";

export const RemotionRoot: React.FC = () => (
  <Composition id="EveryBlackHole" component={EveryBlackHole} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
);
