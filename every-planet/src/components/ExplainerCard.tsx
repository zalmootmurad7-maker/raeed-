import React from "react";
import { ACCENT, CARD, FONT, Mode, modeColors } from "../tokens";

export const Pill: React.FC<{ text: string; color?: string; size?: number; style?: React.CSSProperties }> = ({ text, color = ACCENT.blue, size = 30, style }) => (
  <div
    style={{
      display: "inline-block",
      background: color,
      color: "#FFFFFF",
      fontFamily: FONT.head,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: 1,
      
      padding: `${size * 0.32}px ${size * 0.75}px`,
      borderRadius: 999,
      lineHeight: 1,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {text}
  </div>
);

// Card_Light / Card_Dark. Rendered at its on-screen size (CARD.w x CARD.h unless overridden);
// parents position and scale it (the MasterBoard scales it up so the zoom lands pixel-exact).
export const ExplainerCard: React.FC<{
  mode: Mode;
  w?: number;
  h?: number;
  pill?: { text: string; color?: string };
  children?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ mode, w = CARD.w, h = CARD.h, pill, children, style }) => {
  const c = modeColors(mode);
  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        background: c.card,
        border: `${CARD.border}px solid ${c.border}`,
        borderRadius: CARD.radius,
        boxShadow: `${CARD.shadow}px ${CARD.shadow}px 0px ${c.cardShadow}`,
        overflow: "hidden",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {pill ? <Pill text={pill.text} color={pill.color} style={{ position: "absolute", left: 28, top: 26, zIndex: 5 }} /> : null}
      {children}
    </div>
  );
};
