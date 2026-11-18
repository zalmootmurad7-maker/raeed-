import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { BG_Space_Dark } from "../components/Backgrounds";
import { ExplainerCard } from "../components/ExplainerCard";
import { Icon_SolarSystem } from "../components/Icons";
import { stepped } from "../components/boil";
import { ACCENT, FONT, SPACE } from "../tokens";

// Shot 39: TON 618 vs 40 Solar Systems. Diameter ~2,600 AU (radius ~1,300 AU, upper mass estimate 66 billion Suns).
// One icon = Neptune's orbit (~60 AU across) -> ~43 fit; we line up 40 and say "40+".
const N = 40;
export const Shot39: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const sf = stepped(f);
  const pan = interpolate(f, [0, dur], [90, -90], { easing: Easing.inOut(Easing.sin) });
  const shown = Math.max(0, Math.min(N, Math.floor((sf - 15) / 12) + 1));
  const W = 1780, Hh = 860, cx = 890, cy = 470, rx = 760, ry = 180;
  return (
    <AbsoluteFill>
      <BG_Space_Dark />
      <div style={{ position: "absolute", left: 70, top: 110 }}>
        <ExplainerCard mode="space" w={W} h={Hh} pill={{ text: "06 · ULTRAMASSIVE", color: ACCENT.blue }}>
          <div style={{ position: "absolute", left: 40, top: 92, fontFamily: FONT.head, fontWeight: 700, fontSize: 96, color: SPACE.text }}>TON 618</div>
          <div style={{ position: "absolute", right: 44, top: 36, fontFamily: FONT.mono, fontWeight: 700, fontSize: 40, color: ACCENT.amber, fontVariantNumeric: "tabular-nums", textAlign: "right" }}>
            UP TO 66 BILLION SUNS
          </div>
          <div style={{ position: "absolute", left: 0, top: 0, width: W, height: Hh, translate: `${pan}px 0px` }}>
            <svg width={W} height={Hh} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
              <defs>
                <filter id="glow" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
              </defs>
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke={ACCENT.amber} strokeWidth="34" opacity="0.55" filter="url(#glow)" />
              <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#05070C" stroke={ACCENT.amber} strokeWidth="14" />
              {/* scale bar */}
              <line x1={cx - rx} y1={760} x2={cx + rx} y2={760} stroke={SPACE.border} strokeWidth="5" strokeLinecap="round" />
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={i} x1={cx - rx + (i * 2 * rx) / 4} y1={742} x2={cx - rx + (i * 2 * rx) / 4} y2={778} stroke={SPACE.border} strokeWidth="5" strokeLinecap="round" />
              ))}
            </svg>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} style={{ position: "absolute", left: cx - rx + (i * 2 * rx) / 4 - (i === 0 ? 0 : i === 4 ? 240 : 120), width: 240, top: 790, textAlign: i === 0 ? "left" : i === 4 ? "right" : "center", fontFamily: FONT.mono, fontWeight: 500, fontSize: 30, color: SPACE.text, fontVariantNumeric: "tabular-nums" }}>
                {["0", "650", "1,300", "1,950", "2,600 AU"][i]}
              </div>
            ))}
            {Array.from({ length: N }, (_, i) => {
              const x = cx - rx + 50 + (i * (2 * rx - 100)) / (N - 1);
              const vis = i < shown;
              return (
                <div key={i} style={{ position: "absolute", left: x - 17, top: cy - 17, opacity: vis ? 1 : 0, scale: vis ? (i === shown - 1 ? "1.25" : "1") : "0.4" }}>
                  <Icon_SolarSystem size={34} ink={SPACE.border} seed={i} />
                </div>
              );
            })}
          </div>
          <div style={{ position: "absolute", right: 44, top: 100, fontFamily: FONT.mono, fontWeight: 700, fontSize: 44, color: SPACE.text, fontVariantNumeric: "tabular-nums" }}>
            × {String(shown).padStart(2, "0")} SOLAR SYSTEMS
          </div>
        </ExplainerCard>
      </div>
    </AbsoluteFill>
  );
};
