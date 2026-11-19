import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import TIMING from "./timing.json";
import { ShotCtx } from "./components/kit";
import { BoardTransition } from "./scenes/00_Board";
import * as C1 from "./scenes/ch01";
import * as C2 from "./scenes/ch02_04";
import * as C3 from "./scenes/ch05_07";
import * as C4 from "./scenes/ch08_10";
import { FPS } from "./tokens";

const SH = (TIMING as unknown as { shots: Record<string, [number, number]> }).shots;
const ALL: Record<string, React.FC> = { ...C1, ...C2, ...C3, ...C4 } as never;
export const TOTAL_FRAMES = Math.round((TIMING as unknown as { end: number }).end * FPS);

export const EveryPlanet: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {Object.entries(SH).map(([id, [a, b]]) => {
      const from = Math.round(a * FPS), dur = Math.max(1, Math.round(b * FPS) - from);
      let el: React.ReactNode;
      if (id.endsWith("b")) { const n = parseInt(id); el = <BoardTransition from={n} to={n + 1} dur={dur} />; }
      else { const C = ALL[`Shot${id}`]; el = C ? <C /> : null; }
      return (
        <Sequence key={id} name={`Shot ${id}`} from={from} durationInFrames={dur} premountFor={30}>
          <ShotCtx.Provider value={{ dur, start: a }}>{el}</ShotCtx.Provider>
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
