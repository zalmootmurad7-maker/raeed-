import "./fonts";
import React from "react";
import { Composition } from "remotion";
import { Short, TOTAL } from "./Short";
import { Layered, TOTAL_L } from "./Layered";
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="BHShort" component={Short} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />
    <Composition id="BHShortLayered" component={Layered} durationInFrames={TOTAL_L} fps={30} width={1080} height={1920} />
  </>
);
