import "./fonts";
import React from "react";
import { Composition, Still } from "remotion";
import { ThumbA, ThumbB, ThumbC } from "./Thumbnails";
import { ShortPlanets, SP_FRAMES, SP_ID } from "./shorts/ShortPlanets";
import { ShortHalla, ShortHallaCover, SH_FRAMES, SH_ID } from "./shorts/ShortHalla";
import { EveryPlanet, TOTAL_FRAMES } from "./Video";
import { ShortVideo, SHORTS, shortDuration } from "./shorts/Shorts";
import { FPS, H, W } from "./tokens";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="EveryPlanet" component={EveryPlanet} durationInFrames={TOTAL_FRAMES} fps={FPS} width={W} height={H} />
    {SHORTS.map((c) => <Composition key={c.id} id={c.id} component={ShortVideo} defaultProps={{ id: c.id }} durationInFrames={Math.round(shortDuration(c) * FPS)} fps={FPS} width={1080} height={1920} />)}
    <Composition id={SP_ID} component={ShortPlanets} defaultProps={{ qa: false }} durationInFrames={SP_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id={SH_ID} component={ShortHalla} defaultProps={{ qa: false }} durationInFrames={SH_FRAMES} fps={FPS} width={1080} height={1920} />
    <Still id="ShortHalla-Cover" component={ShortHallaCover} width={1080} height={1920} />
    <Still id="ThumbA-Board" component={ThumbA} width={1280} height={720} />
    <Still id="ThumbB-GlassRain" component={ThumbB} width={1280} height={720} />
    <Still id="ThumbC-Halla" component={ThumbC} width={1280} height={720} />
  </>
);
