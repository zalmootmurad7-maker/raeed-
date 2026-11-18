import "./fonts";
import React from "react";
import { Composition, Still } from "remotion";
import { ThumbGrid, ThumbLadder, ThumbTwist } from "./Thumbnails";
import { ThumbOwner1, ThumbOwner3 } from "./ThumbnailsV2";
import { EveryBlackHole } from "./Video";
import { TOTAL_FRAMES } from "./shots";
import { FPS, H, W } from "./tokens";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="EveryBlackHole" component={EveryBlackHole} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
    <Still id="ThumbA-Grid" component={ThumbGrid} width={1280} height={720} />
    <Still id="ThumbB-Ladder" component={ThumbLadder} width={1280} height={720} />
    <Still id="ThumbC-Twist" component={ThumbTwist} width={1280} height={720} />
    <Still id="Thumb1-All8" component={ThumbOwner1} width={1280} height={720} />
    <Still id="Thumb3-SmallToBig" component={ThumbOwner3} width={1280} height={720} />
  </>
);
