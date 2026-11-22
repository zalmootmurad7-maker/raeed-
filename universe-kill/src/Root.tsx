import "./fonts";
import React from "react";
import { Composition, Still } from "remotion";
import { ThumbA, ThumbB, ThumbC } from "./Thumbnails";
import { FPS, H, W } from "./lib/core";
import { TOTAL_FRAMES, UniverseKill } from "./Video";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="UniverseKill" component={UniverseKill} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
    <Still id="ThumbA-NoWarning" component={ThumbA} width={1280} height={720} />
    <Still id="ThumbB-8Ways" component={ThumbB} width={1280} height={720} />
    <Still id="ThumbC-NeverSeeIt" component={ThumbC} width={1280} height={720} />
  </>
);
