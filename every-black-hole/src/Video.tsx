import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SHOTS, shotDur, shotFrom } from "./shots";
import { ShotCtx } from "./components/kit";
import { BoardTransition, Shot00 } from "./scenes/00_MasterBoard";
import * as C1 from "./scenes/01_Micro";
import * as C2 from "./scenes/02_Primordial";
import * as C3 from "./scenes/03_Stellar";
import * as C4 from "./scenes/04_Intermediate";
import * as C5 from "./scenes/05_Supermassive";
import * as C6 from "./scenes/06_Ultramassive";
import * as C7 from "./scenes/07_Kerr";
import * as C8 from "./scenes/08_WhiteHoles";
import { Placeholder } from "./scenes/Placeholder";

const ALL: Record<string, React.FC<{ dur: number }>> = { ...C1, ...C2, ...C3, ...C4, ...C5, ...C6, ...C7, ...C8 } as never;

export const EveryBlackHole: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {SHOTS.map((sh) => {
      const dur = shotDur(sh);
      const Comp = ALL[`Shot${sh.id}`];
      let el: React.ReactNode;
      if (sh.id === "00") el = <Shot00 dur={dur} />;
      else if (sh.id.endsWith("b")) el = <BoardTransition from={sh.chapter} to={sh.chapter + 1} dur={dur} />;
      else if (Comp) el = <Comp dur={dur} />;
      else el = <Placeholder shot={sh} />;
      return (
        <Sequence key={sh.id} name={`Shot ${sh.id}`} from={shotFrom(sh)} durationInFrames={dur} premountFor={30}>
          <ShotCtx.Provider value={{ dur }}>{el}</ShotCtx.Provider>
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
