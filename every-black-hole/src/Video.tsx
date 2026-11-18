import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SHOTS, shotDur, shotFrom } from "./shots";
import { BoardTransition, Shot00 } from "./scenes/00_MasterBoard";
import { Shot01, Shot06 } from "./scenes/01_Micro";
import { Shot39 } from "./scenes/06_Ultramassive";
import { Placeholder } from "./scenes/Placeholder";

export const EveryBlackHole: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {SHOTS.map((sh) => {
      const dur = shotDur(sh);
      let el: React.ReactNode;
      if (sh.id === "00") el = <Shot00 dur={dur} />;
      else if (sh.id === "01") el = <Shot01 />;
      else if (sh.id === "06") el = <Shot06 />;
      else if (sh.id === "39") el = <Shot39 dur={dur} />;
      else if (sh.id.endsWith("b")) el = <BoardTransition from={sh.chapter} to={sh.chapter + 1} dur={dur} />;
      else el = <Placeholder shot={sh} />;
      return (
        <Sequence key={sh.id} name={`Shot ${sh.id}`} from={shotFrom(sh)} durationInFrames={dur} premountFor={30}>
          {el}
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
