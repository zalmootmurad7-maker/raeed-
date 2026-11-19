import "./fonts";
import React from "react";
import { AbsoluteFill, Composition } from "remotion";
import { ShotCtx } from "./components/kit";
import { BoardHook } from "./scenes/00_Board";
import { Shot04, Shot15, Shot34 } from "./scenes/testShots";
import { FPS, H, W } from "./tokens";

const Test: React.FC<{ which: string }> = ({ which }) => (
  <ShotCtx.Provider value={{ dur: 150 }}>
    <AbsoluteFill style={{ background: "#000" }}>
      {which === "01" ? <BoardHook dur={150} holdFrames={140} /> : which === "02" ? <Shot04 /> : which === "03" ? <Shot15 /> : <Shot34 />}
    </AbsoluteFill>
  </ShotCtx.Provider>
);

export const RemotionRoot: React.FC = () => (
  <>
    {["01", "02", "03", "04"].map((w) => <Composition key={w} id={`Test${w}`} component={Test} defaultProps={{ which: w }} durationInFrames={150} fps={FPS} width={W} height={H} />)}
  </>
);
