import "./fonts";
import React from "react";
import { Composition } from "remotion";
import { Short, TOTAL } from "./Short";
export const RemotionRoot: React.FC = () => <Composition id="BHShort" component={Short} durationInFrames={TOTAL} fps={30} width={1080} height={1920} />;
