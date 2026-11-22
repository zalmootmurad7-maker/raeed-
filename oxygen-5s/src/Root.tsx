import "./fonts";
import React from "react";
import { Composition, Still } from "remotion";
import { ThumbA, ThumbB, ThumbC, ThumbD, ThumbE } from "./Thumbnails";
import { FPS, H, W } from "./lib/core";
import { OxygenVideo, TOTAL_FRAMES } from "./Video";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="Oxygen5s" component={OxygenVideo} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
    <Still id="ThumbA-SkyOnFire" component={ThumbA} width={1280} height={720} />
    <Still id="ThumbB-NoOxygen" component={ThumbB} width={1280} height={720} />
    <Still id="ThumbC-VanishFirst" component={ThumbC} width={1280} height={720} />
    <Still id="ThumbD-65Gone" component={ThumbD} width={1280} height={720} />
    <Still id="ThumbE-DontSuffocate" component={ThumbE} width={1280} height={720} />
  </>
);
