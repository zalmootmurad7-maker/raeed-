import React from "react";
import { ACCENT, FONT, modeColors } from "../tokens";
import { ExplainerCard } from "./ExplainerCard";
import { LOOKS, Planet } from "./Planet";

export const CHAPTERS = [
  { n: 1, pill: "01 · HD 189733 b", title: "GLASS RAIN", tag: "Sideways glass storms" },
  { n: 2, pill: "02 · TrES-2b", title: "PITCH BLACK", tag: "Darker than coal" },
  { n: 3, pill: "03 · WASP-76b", title: "IRON RAIN", tag: "Molten metal showers" },
  { n: 4, pill: "04 · KELT-9b", title: "HOTTER THAN A STAR", tag: "4,600 K dayside" },
  { n: 5, pill: "05 · WASP-12b", title: "EATEN ALIVE", tag: "Stretched into an egg" },
  { n: 6, pill: "06 · TOI-849b", title: "NAKED CORE", tag: "40× Earth mass" },
  { n: 7, pill: "07 · PSR J1719-1438 b", title: "DIAMOND WORLD", tag: "Denser than platinum" },
  { n: 8, pill: "08 · PSO J318.5-22", title: "NO SUN", tag: "A rogue planet" },
  { n: 9, pill: "09 · Methuselah", title: "TOO OLD", tag: "12.7 billion years" },
  { n: 10, pill: "10 · 8 UMi b / Halla", title: "SHOULD BE GONE", tag: "Survived its star" },
] as const;

// Card face = the card on the MasterBoard AND the first frame of its chapter (board zoom lands on the same pixels).
export const CardFace: React.FC<{ chapter: number; mystery?: boolean; redBorder?: number }> = ({ chapter, mystery, redBorder = 0 }) => {
  const ch = CHAPTERS[chapter - 1];
  const c = modeColors("light");
  return (
    <ExplainerCard mode="light" pill={{ text: ch.pill, color: chapter === 10 ? ACCENT.red : ACCENT.blue }}
      style={redBorder > 0 ? { boxShadow: `0 0 0 ${10 * redBorder}px ${ACCENT.red}, 4px 4px 0 #141824` } : undefined}>
      <div style={{ position: "absolute", left: 56, top: 120, maxWidth: 620, fontFamily: FONT.head, fontWeight: 700, fontSize: 84, color: c.text, lineHeight: 0.95, letterSpacing: -1 }}>{mystery ? "???" : ch.title}</div>
      <div style={{ position: "absolute", right: 80, top: 120, width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Planet size={380} look={LOOKS[chapter]} id={`card${chapter}`} />
        {mystery ? <div style={{ position: "absolute", fontFamily: FONT.head, fontWeight: 700, fontSize: 300, color: ACCENT.red, textShadow: "6px 6px 0 #141824" }}>?</div> : null}
      </div>
      <div style={{ position: "absolute", left: 58, bottom: 52, fontFamily: FONT.body, fontWeight: 600, fontSize: 44, color: c.muted }}>{mystery ? "Shouldn't exist" : ch.tag}</div>
    </ExplainerCard>
  );
};
