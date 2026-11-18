import React from "react";
import { AbsoluteFill } from "remotion";
import { BG_Light_Grid } from "../components/Backgrounds";
import { CardFace } from "../components/CardFaces";
import { CharacterRig } from "../components/CharacterRig";
import type { Pose } from "../shots";
import { CARD_SLOT } from "../tokens";
import { useShot } from "../components/kit";

// First frames of a light chapter: the exact card face the board zoom landed on, then the shot's own content.
export const ChapterOpen: React.FC<{ chapter: number; pose?: Pose; hold?: number; children: React.ReactNode }> = ({ chapter, pose, hold = 0.3, children }) => {
  const { f, at } = useShot();
  if (f >= at(hold)) return <>{children}</>;
  return (
    <AbsoluteFill>
      <BG_Light_Grid />
      <div style={{ position: "absolute", left: CARD_SLOT.x, top: CARD_SLOT.y }}><CardFace chapter={chapter} seed={chapter * 11} /></div>
      {pose ? <CharacterRig mode="light" pose={pose} x={330} bottom={1050} height={820} seed={13} /> : null}
    </AbsoluteFill>
  );
};
