import React from "react";
import { AbsoluteFill } from "remotion";
import { BG_Light_Grid, BG_Space_Dark } from "../components/Backgrounds";
import { ExplainerCard } from "../components/ExplainerCard";
import { CHAPTERS } from "../components/CardFaces";
import { CharacterRig } from "../components/CharacterRig";
import type { Shot } from "../shots";
import { ACCENT, CARD_SLOT, FONT, modeColors } from "../tokens";

// Stand-in for shots not built yet: shows the layout + shot note so timing can be reviewed.
export const Placeholder: React.FC<{ shot: Shot }> = ({ shot }) => {
  const mode = shot.kind === "dark" ? "space" : "light";
  const c = modeColors(mode);
  const ch = CHAPTERS[Math.max(0, shot.chapter - 1)];
  return (
    <AbsoluteFill>
      {mode === "space" ? <BG_Space_Dark /> : <BG_Light_Grid />}
      <div style={{ position: "absolute", left: CARD_SLOT.x, top: CARD_SLOT.y }}>
        <ExplainerCard mode={mode} pill={{ text: shot.pose === "the_catch" ? "THE CATCH" : ch.pill, color: shot.pose === "the_catch" ? ACCENT.red : ACCENT.blue }}>
          <div style={{ position: "absolute", left: 56, top: 140, right: 56, fontFamily: FONT.body, fontWeight: 600, fontSize: 48, color: c.text }}>
            SHOT {shot.id} — TODO
            <div style={{ fontSize: 36, color: c.muted, marginTop: 20 }}>{shot.note}</div>
          </div>
        </ExplainerCard>
      </div>
      {shot.pose ? <CharacterRig mode={mode} pose={shot.pose} x={340} bottom={1050} height={820} /> : null}
    </AbsoluteFill>
  );
};
