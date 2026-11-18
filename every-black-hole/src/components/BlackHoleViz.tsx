import React from "react";
import { useCurrentFrame } from "remotion";
import { ACCENT } from "../tokens";
import { stepped } from "./boil";
import { Icon_BlackHole_Small } from "./Icons";

// Small black hole leaking Hawking-radiation particles (ink accent -> stepped 10 fps).
export const HawkingLeak: React.FC<{ size: number; count?: number }> = ({ size, count = 18 }) => {
  const f = stepped(useCurrentFrame());
  return (
    <div style={{ position: "relative", width: size * 2.4, height: size * 2.4 }}>
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + (i % 3) * 0.2;
        const life = ((f * 0.9 + i * 13) % 60) / 60;
        const r = size * (0.45 + life * 0.75);
        return (
          <div key={i} style={{ position: "absolute", left: size * 1.2 + Math.cos(a) * r - 7, top: size * 1.2 + Math.sin(a) * r - 7, width: 14, height: 14, borderRadius: 99, background: i % 4 === 0 ? ACCENT.red : ACCENT.amber, opacity: 1 - life }} />
        );
      })}
      <div style={{ position: "absolute", left: size * 0.7, top: size * 0.7 }}>
        <Icon_BlackHole_Small size={size} seed={5} />
      </div>
    </div>
  );
};
