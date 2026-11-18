import React from "react";
import { ACCENT, CARD, FONT, LIGHT, modeColors } from "../tokens";
import { ExplainerCard } from "./ExplainerCard";
import {
  Icon_Atom, Icon_BlackHole_Accretion, Icon_BlackHole_Small, Icon_CrossedStar, Icon_Galaxy,
  Icon_Lightning_PlusMinus, Icon_Ring_Huge, Icon_Spin,
} from "./Icons";

export const CHAPTERS = [
  { n: 1, pill: "01 · MICRO BLACK HOLE", title: "MICRO", tag: "Smaller than an atom" },
  { n: 2, pill: "02 · PRIMORDIAL", title: "PRIMORDIAL", tag: "Born in the Big Bang?" },
  { n: 3, pill: "03 · STELLAR-MASS", title: "STELLAR-MASS", tag: "What's left of a giant star" },
  { n: 4, pill: "04 · INTERMEDIATE", title: "INTERMEDIATE", tag: "100 – 100,000 Suns" },
  { n: 5, pill: "05 · SUPERMASSIVE", title: "SUPERMASSIVE", tag: "Anchors every big galaxy" },
  { n: 6, pill: "06 · ULTRAMASSIVE", title: "ULTRAMASSIVE", tag: "10 billion+ Suns" },
  { n: 7, pill: "07 · SCHWARZSCHILD VS KERR", title: "STATIC VS SPIN", tag: "Grouped by motion" },
  { n: 8, pill: "08 · MATH-ONLY WING", title: "CHARGED & WHITE", tag: "Allowed by the math" },
] as const;

const Title: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <div style={{ position: "absolute", left: 56, top: 118, fontFamily: FONT.head, fontWeight: 700, fontSize: 88, color, lineHeight: 0.95, letterSpacing: -1, maxWidth: 640 }}>{text}</div>
);
const Tag: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <div style={{ position: "absolute", left: 58, bottom: 52, fontFamily: FONT.body, fontWeight: 600, fontSize: 44, color }}>{text}</div>
);
const IconBox: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", right: 70, top: 130, width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
);

// Card face = the card as it looks on the MasterBoard AND in the first shot of its chapter,
// so the board zoom lands on exactly the same pixels.
export const CardFace: React.FC<{ chapter: number; seed?: number }> = ({ chapter, seed = 1 }) => {
  const ch = CHAPTERS[chapter - 1];
  const c = modeColors("light");
  const icon = (() => {
    switch (chapter) {
      case 1:
        return (
          <div style={{ position: "relative", width: 420, height: 420 }}>
            <Icon_Atom size={360} seed={seed} style={{ position: "absolute", left: 60, top: 30 }} />
            <Icon_BlackHole_Small size={34} seed={seed + 3} glow={false} style={{ position: "absolute", left: -14, top: 296 }} />
            <div style={{ position: "absolute", left: -440, top: 170, width: 260, textAlign: "right", fontFamily: FONT.body, fontWeight: 600, fontSize: 38, lineHeight: 1.1, color: LIGHT.ink }}>a micro<br />black hole</div>
            <svg width="220" height="120" style={{ position: "absolute", left: -170, top: 205, overflow: "visible" }}>
              <path d="M 10 20 Q 120 10 175 102" fill="none" stroke={LIGHT.ink} strokeWidth="4" strokeLinecap="round" />
              <path d="M 160 92 L 178 106 L 182 84" fill="none" stroke={LIGHT.ink} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      case 2: return <Icon_CrossedStar size={330} seed={seed} />;
      case 3: return <Icon_BlackHole_Accretion size={380} seed={seed} />;
      case 4: return <Icon_BlackHole_Small size={300} seed={seed} />;
      case 5: return <Icon_Galaxy size={380} seed={seed} />;
      case 6: return <Icon_Ring_Huge size={380} seed={seed} />;
      case 7: return <Icon_Spin size={380} seed={seed} />;
      default: return <Icon_Lightning_PlusMinus size={330} seed={seed} />;
    }
  })();
  return (
    <ExplainerCard mode="light" pill={{ text: ch.pill, color: ACCENT.blue }}>
      <Title text={ch.title} color={c.text} />
      <IconBox>{icon}</IconBox>
      <Tag text={ch.tag} color={c.muted} />
    </ExplainerCard>
  );
};

export { CARD };
