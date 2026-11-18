import { AbsoluteFill } from "remotion";
import { LIGHT, SPACE } from "../tokens";

export const BG_Light_Grid: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: LIGHT.bg,
      backgroundImage: `radial-gradient(circle, ${LIGHT.grid} 2.2px, transparent 2.6px)`,
      backgroundSize: "36px 36px",
    }}
  />
);

const STARS = Array.from({ length: 70 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 1) * 91.7 * n) * 10000;
    return x - Math.floor(x);
  };
  return { x: r(1) * 1920, y: r(2) * 1080, s: 2 + Math.round(r(3) * 2), o: 0.35 + r(4) * 0.5 };
});

export const BG_Space_Dark: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundColor: SPACE.bg,
      backgroundImage: `radial-gradient(circle, ${SPACE.grid} 2px, transparent 2.4px)`,
      backgroundSize: "36px 36px",
    }}
  >
    {STARS.map((st, i) => (
      <div key={i} style={{ position: "absolute", left: st.x, top: st.y, width: st.s, height: st.s, borderRadius: 99, background: "#F6F4EF", opacity: st.o }} />
    ))}
  </AbsoluteFill>
);
