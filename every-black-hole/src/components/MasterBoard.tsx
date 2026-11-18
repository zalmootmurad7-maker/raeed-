import React from "react";
import { ACCENT, CARD, CARD_SLOT, FONT, LIGHT, W, H } from "../tokens";
import { CardFace } from "./CardFaces";

// Single 7680x4320 virtual canvas (4x the frame) holding cards 01-08 in a 4x2 grid.
export const BOARD = { w: 7680, h: 4320 } as const;
export const BOARD_CARD = { w: 1680, h: Math.round((1680 * CARD.h) / CARD.w) } as const;
const K = BOARD_CARD.w / CARD.w; // card face scale on the board
const COL_X = (i: number) => 180 + i * 1880;
const ROW_Y = [1560, 2760];
export const cardPos = (chapter: number) => {
  const i = chapter - 1;
  return { x: COL_X(i % 4), y: ROW_Y[Math.floor(i / 4)] };
};

export type Cam = { s: number; fx: number; fy: number }; // scale + board point under screen centre
export const CAM_OVERVIEW: Cam = { s: W / BOARD.w, fx: BOARD.w / 2, fy: BOARD.h / 2 };
// Zoomed onto a card so it lands exactly in the standard card slot.
export const camOnCard = (chapter: number): Cam => {
  const s = CARD.w / BOARD_CARD.w;
  const p = cardPos(chapter);
  return { s, fx: p.x + (W / 2 - CARD_SLOT.x) / s, fy: p.y + (H / 2 - CARD_SLOT.y) / s };
};
export const lerpCam = (a: Cam, b: Cam, t: number): Cam => ({
  s: Math.exp(Math.log(a.s) + (Math.log(b.s) - Math.log(a.s)) * t),
  fx: a.fx + (b.fx - a.fx) * t,
  fy: a.fy + (b.fy - a.fy) * t,
});

// Align the board's dot grid with the screen grid when zoomed onto card 01 (no dot jump at the cut).
const GRID_PHASE = (() => {
  const s = CARD.w / BOARD_CARD.w, p = { x: 180, y: 1560 };
  const tx = CARD_SLOT.x - p.x * s, ty = CARD_SLOT.y - p.y * s;
  const m = (v: number) => ((v % 36) + 36) % 36;
  return { x: -m(tx) / s + 8000 % (36 / s), y: -m(ty) / s + 8000 % (36 / s) };
})();

const Check: React.FC<{ pop: number }> = ({ pop }) => (
  <div style={{ position: "absolute", right: -36, top: -36, width: 120, height: 120, borderRadius: 99, background: ACCENT.blue, border: `6px solid ${LIGHT.ink}`, display: "flex", alignItems: "center", justifyContent: "center", scale: `${pop}`, boxShadow: `6px 6px 0 ${LIGHT.ink}` }}>
    <svg width="64" height="64" viewBox="0 0 64 64"><path d="M12 34 L27 48 L53 18" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
  </div>
);

export const MasterBoard: React.FC<{ cam: Cam; checks?: Record<number, number> }> = ({ cam, checks = {} }) => {
  const tx = W / 2 - cam.fx * cam.s;
  const ty = H / 2 - cam.fy * cam.s;
  const dot = 36 / (CARD.w / BOARD_CARD.w);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: BOARD.w, height: BOARD.h, transformOrigin: "0 0", transform: `translate(${tx}px, ${ty}px) scale(${cam.s})` }}>
      {/* paper extends far past the board so zoomed-in views never show an edge */}
      <div style={{ position: "absolute", left: -8000, top: -8000, width: BOARD.w + 16000, height: BOARD.h + 16000, backgroundColor: LIGHT.bg, backgroundImage: `radial-gradient(circle, ${LIGHT.grid} ${3}px, transparent ${3.6}px)`, backgroundSize: `${dot}px ${dot}px`, backgroundPosition: `${GRID_PHASE.x}px ${GRID_PHASE.y}px` }} />
      <div style={{ position: "absolute", left: 0, width: BOARD.w, top: 720, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 300, color: LIGHT.ink, letterSpacing: -4 }}>
        EVERY TYPE OF <span style={{ color: ACCENT.red }}>BLACK HOLE</span>
      </div>
      {Array.from({ length: 8 }, (_, i) => {
        const ch = i + 1;
        const p = cardPos(ch);
        return (
          <div key={ch} style={{ position: "absolute", left: p.x, top: p.y, width: BOARD_CARD.w, height: BOARD_CARD.h }}>
            <div style={{ transformOrigin: "0 0", transform: `scale(${K})` }}>
              <CardFace chapter={ch} seed={ch * 11} />
            </div>
            {checks[ch] !== undefined ? <Check pop={checks[ch]} /> : null}
          </div>
        );
      })}
    </div>
  );
};
