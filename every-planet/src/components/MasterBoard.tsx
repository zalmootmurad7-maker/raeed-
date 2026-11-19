import React from "react";
import { ACCENT, CARD, CARD_SLOT, FONT, LIGHT, W, H } from "../tokens";
import { CardFace } from "./CardFaces";

// 7680x4320 virtual canvas, 10 planet cards in a 5x2 grid.
export const BOARD = { w: 7680, h: 4320 } as const;
export const BOARD_CARD = { w: 1360, h: Math.round((1360 * CARD.h) / CARD.w) } as const;
const K = BOARD_CARD.w / CARD.w;
const COL_X = (i: number) => 150 + i * 1490;
const ROW_Y = [1580, 2650];
export const cardPos = (chapter: number) => { const i = chapter - 1; return { x: COL_X(i % 5), y: ROW_Y[Math.floor(i / 5)] }; };

export type Cam = { s: number; fx: number; fy: number };
export const CAM_OVERVIEW: Cam = { s: W / BOARD.w, fx: BOARD.w / 2, fy: BOARD.h / 2 };
export const camOnCard = (chapter: number): Cam => {
  const s = CARD.w / BOARD_CARD.w; const p = cardPos(chapter);
  return { s, fx: p.x + (W / 2 - CARD_SLOT.x) / s, fy: p.y + (H / 2 - CARD_SLOT.y) / s };
};
export const lerpCam = (a: Cam, b: Cam, t: number): Cam => ({
  s: Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * t), fx: a.fx + (b.fx - a.fx) * t, fy: a.fy + (b.fy - a.fy) * t,
});
const Check: React.FC<{ pop: number }> = ({ pop }) => (
  <div style={{ position: "absolute", right: -40, top: -40, width: 130, height: 130, borderRadius: 99, background: ACCENT.blue, border: `7px solid ${LIGHT.ink}`, display: "flex", alignItems: "center", justifyContent: "center", scale: `${pop}`, boxShadow: `6px 6px 0 ${LIGHT.ink}` }}>
    <svg width="70" height="70" viewBox="0 0 64 64"><path d="M12 34 L27 48 L53 18" fill="none" stroke="#FFF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);
const GRID_PHASE = (() => {
  const s = CARD.w / BOARD_CARD.w, p = cardPos(1);
  const tx = CARD_SLOT.x - p.x * s, ty = CARD_SLOT.y - p.y * s;
  const m = (v: number) => ((v % 36) + 36) % 36;
  return { x: -m(tx) / s + (8000 % (36 / s)), y: -m(ty) / s + (8000 % (36 / s)) };
})();

export const MasterBoard: React.FC<{ cam: Cam; checks?: Record<number, number>; mystery10?: boolean; pulse10?: number; flash?: number[] }> = ({ cam, checks = {}, mystery10, pulse10 = 0, flash = [] }) => {
  const tx = W / 2 - cam.fx * cam.s, ty = H / 2 - cam.fy * cam.s, dot = 36 / (CARD.w / BOARD_CARD.w);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: BOARD.w, height: BOARD.h, transformOrigin: "0 0", transform: `translate(${tx}px, ${ty}px) scale(${cam.s})` }}>
      <div style={{ position: "absolute", left: -8000, top: -8000, width: BOARD.w + 16000, height: BOARD.h + 16000, backgroundColor: LIGHT.bg, backgroundImage: `radial-gradient(circle, ${LIGHT.grid} 3px, transparent 3.6px)`, backgroundSize: `${dot}px ${dot}px`, backgroundPosition: `${GRID_PHASE.x}px ${GRID_PHASE.y}px` }} />
      <div style={{ position: "absolute", left: 0, width: BOARD.w, top: 950, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 300, color: LIGHT.ink, letterSpacing: -4 }}>
        EVERY PLANET THAT <span style={{ color: ACCENT.red }}>SHOULDN&apos;T EXIST</span>
      </div>
      {Array.from({ length: 10 }, (_, i) => {
        const ch = i + 1, p = cardPos(ch), fl = flash.includes(ch);
        return (
          <div key={ch} style={{ position: "absolute", left: p.x, top: p.y, width: BOARD_CARD.w, height: BOARD_CARD.h, scale: fl ? "1.06" : undefined }}>
            <div style={{ transformOrigin: "0 0", transform: `scale(${K})` }}>
              <CardFace chapter={ch} mystery={ch === 10 && mystery10} redBorder={ch === 10 ? pulse10 : fl ? 0.6 : 0} />
            </div>
            {checks[ch] !== undefined ? <Check pop={checks[ch]} /> : null}
          </div>
        );
      })}
    </div>
  );
};
