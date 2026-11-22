import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FONT, LIGHT, sp } from "../lib/core";
import { THREATS } from "./Icons";

// 4x2 MasterBoard (Light Canvas). Laid out at 1920x1080; the camera is a scale/translate around a focus point.
export const BOARD = { cw: 400, ch: 360, gx: 36, gy: 36, x0: 106, y0: 196 } as const;
export const cardPos = (i: number) => ({ x: BOARD.x0 + (i % 4) * (BOARD.cw + BOARD.gx), y: BOARD.y0 + Math.floor(i / 4) * (BOARD.ch + BOARD.gy) });
export const cardCenter = (i: number) => { const p = cardPos(i); return { x: p.x + BOARD.cw / 2, y: p.y + BOARD.ch / 2 }; };

export type Cam = { s: number; fx: number; fy: number }; // focus point (fx,fy) is placed at screen centre, then scaled by s
export const CAM_FULL: Cam = { s: 1, fx: 960, fy: 540 };
export const lerpCam = (a: Cam, b: Cam, k: number): Cam => ({ s: a.s + (b.s - a.s) * k, fx: a.fx + (b.fx - a.fx) * k, fy: a.fy + (b.fy - a.fy) * k });

export const BoardCard: React.FC<{ i: number; t: number; red?: boolean; checked?: boolean; reveal8?: boolean; flash?: number }> = ({ i, t, red, checked, reveal8, flash = 0 }) => {
  const th = THREATS[i];
  const p = cardPos(i);
  const is8 = i === 7;
  const name = is8 && reveal8 ? "FALSE VACUUM DECAY" : th.name;
  const border = red ? C.red : LIGHT.ink;
  return (
    <div style={{ position: "absolute", left: p.x, top: p.y, width: BOARD.cw, height: BOARD.ch, borderRadius: 18, background: is8 && !reveal8 ? "#FFF5F5" : LIGHT.card, border: `${red ? 5 : 3}px solid ${border}`, boxShadow: `4px 4px 0 ${LIGHT.ink}${flash > 0 ? `, 0 0 ${40 * flash}px rgba(229,57,53,${0.7 * flash})` : ""}`, boxSizing: "border-box", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 18, top: 16 }}>
        <span style={{ display: "inline-block", background: is8 ? C.red : C.blue, color: "#FFF", fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, padding: "4px 14px", borderRadius: 999, fontVariantNumeric: "tabular-nums" }}>{String(th.n).padStart(2, "0")}</span>
      </div>
      {checked ? <div style={{ position: "absolute", right: 16, top: 14, width: 46, height: 46, borderRadius: 99, background: C.blue, border: `3px solid ${LIGHT.ink}`, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="26" height="26" viewBox="0 0 26 26"><path d="M5 13 L11 19 L21 7" fill="none" stroke="#FFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div> : null}
      <div style={{ position: "absolute", left: 0, top: 62, width: BOARD.cw, display: "flex", justifyContent: "center" }}>
        <th.Icon size={180} t={t} />
      </div>
      <div style={{ position: "absolute", left: 12, width: BOARD.cw - 24, top: 282, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: name.length > 16 ? 28 : 32, color: is8 ? C.red : LIGHT.ink, letterSpacing: -0.5, whiteSpace: "nowrap" }}>{name}</div>
    </div>
  );
};

/** Whole board with staggered spring entry (each card pops at appearAt + i*stagger) and a camera. */
export const MasterBoard: React.FC<{ cam: Cam; appearAt?: number; stagger?: number; checks?: number[]; pulse8?: boolean; redCards?: number[]; reveal8?: boolean; title?: React.ReactNode }> = ({ cam, appearAt = -999, stagger = 3, checks = [], pulse8, redCards = [], reveal8, title }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const tx = 960 - cam.fx * cam.s, ty = 540 - cam.fy * cam.s;
  const pulse = pulse8 ? 0.5 + 0.5 * Math.sin(t * Math.PI * 2 * 0.9) : 0;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: `translate(${tx}px, ${ty}px) scale(${cam.s})`, transformOrigin: "0 0" }}>
      {title ? <div style={{ position: "absolute", left: BOARD.x0, top: 74, width: 1708, textAlign: "center" }}>{title}</div> : null}
      {THREATS.map((_, i) => {
        const k = sp(f, appearAt + i * stagger, 12, 230, 0.7);
        const c = cardCenter(i);
        return (
          <div key={i} style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, scale: `${0.55 + 0.45 * k}`, opacity: Math.min(1, k * 2), transformOrigin: `${c.x}px ${c.y}px` }}>
            <BoardCard i={i} t={t} checked={checks.includes(i)} red={(i === 7 && pulse8) || redCards.includes(i)} flash={i === 7 ? pulse : redCards.includes(i) ? 0.6 : 0} reveal8={reveal8} />
          </div>
        );
      })}
    </div>
  );
};
