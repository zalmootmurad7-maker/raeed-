import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { BG_Light_Grid, BG_Space_Dark } from "../components/Backgrounds";
import { CardFace } from "../components/CardFaces";
import { CharacterRig } from "../components/CharacterRig";
import { ExplainerCard } from "../components/ExplainerCard";
import { HawkingLeak } from "../components/BlackHoleViz";
import { ACCENT, CARD_SLOT, FONT, SPACE } from "../tokens";

// Shot 01: camera settles on card 01 (same pixels the board zoom landed on); character pops in, points right.
export const Shot01: React.FC = () => {
  const f = useCurrentFrame();
  const settle = interpolate(f, [0, 90], [1, 1.012], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <BG_Light_Grid />
      <div style={{ position: "absolute", left: CARD_SLOT.x, top: CARD_SLOT.y, scale: `${settle}`, transformOrigin: "50% 50%" }}>
        <CardFace chapter={1} seed={11} />
      </div>
      <CharacterRig mode="light" pose="explaining" x={340} bottom={1050} height={820} enterAt={0} seed={21} />
    </AbsoluteFill>
  );
};

// Shot 06: hard cut to Space Mode; red THE CATCH pill slams in.
export const Shot06: React.FC = () => {
  const f = useCurrentFrame();
  const slam = interpolate(f, [0, 6], [1.9, 1], { extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const shakeAmt = interpolate(f, [5, 14], [9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = Math.sin(f * 2.7) * shakeAmt;
  const textIn = interpolate(f, [6, 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ translate: `${shake}px ${-shake * 0.4}px` }}>
      <BG_Space_Dark />
      <div style={{ position: "absolute", left: CARD_SLOT.x, top: CARD_SLOT.y }}>
        <ExplainerCard mode="space">
          <div style={{ position: "absolute", left: 28, top: 26, scale: `${slam}`, transformOrigin: "0% 50%" }}>
            <div style={{ background: ACCENT.red, color: "#FFF", fontFamily: FONT.head, fontWeight: 700, fontSize: 40, padding: "12px 30px", borderRadius: 999, letterSpacing: 1 }}>THE CATCH</div>
          </div>
          <div style={{ position: "absolute", left: 56, top: 130, width: 600, fontFamily: FONT.head, fontWeight: 700, fontSize: 76, lineHeight: 1.0, color: SPACE.text, opacity: textIn }}>
            THEY POP THE INSTANT THEY&apos;RE BORN
          </div>
          <div style={{ position: "absolute", left: 58, bottom: 52, fontFamily: FONT.body, fontWeight: 600, fontSize: 40, color: "#94A3B8", opacity: textIn }}>
            Smaller = evaporates faster
          </div>
          <div style={{ position: "absolute", right: 60, top: 120 }}>
            <HawkingLeak size={190} />
          </div>
        </ExplainerCard>
      </div>
      <CharacterRig mode="space" pose="the_catch" x={340} bottom={1050} height={830} enterAt={0} seed={31} />
    </AbsoluteFill>
  );
};
