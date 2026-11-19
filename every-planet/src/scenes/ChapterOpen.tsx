import React from "react";
import { AbsoluteFill } from "remotion";
import { BG_Light_Grid } from "../components/Backgrounds";
import { CardFace } from "../components/CardFaces";
import { CharacterRig } from "../components/CharacterRig";
import type { Pose } from "../shots";
import { CARD_SLOT } from "../tokens";
import { useShot } from "../components/kit";

// First ~0.6 s of each chapter: the exact card face the board zoom landed on, then the chapter's own shot.
export const ChapterOpen: React.FC<{ chapter: number; pose?: Pose; children: React.ReactNode }> = ({ chapter, pose = "explaining", children }) => {
  const { f } = useShot();
  if (f >= 18) return <>{children}</>;
  return (
    <AbsoluteFill>
      <BG_Light_Grid />
      <div style={{ position: "absolute", left: CARD_SLOT.x, top: CARD_SLOT.y }}><CardFace chapter={chapter} /></div>
      <CharacterRig mode="light" pose={pose} x={330} bottom={1050} height={820} />
    </AbsoluteFill>
  );
};
