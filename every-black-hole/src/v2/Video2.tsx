import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import TL from "./timeline.json";
import { BOARD, BOARD_CARD, CAM_OVERVIEW, Cam, MasterBoard, cardPos, lerpCam } from "../components/MasterBoard";
import { ACCENT, FONT, FPS, LIGHT } from "../tokens";
import type { Pose } from "../shots";
import { CAM_EASE, Ctx, LightBG, Rig, ShotCtx2, T, rr, spr } from "./kit2";
import { SHOT_V } from "./visuals";

type Shot = { id: number; ch: number; mode: "L" | "S" | "B"; char: string; start: number; end: number; text: string };
type Word = { word: string; start: number; end: number };
const SHOTS = (TL as { shots: Shot[] }).shots;
const WORDS = (TL as { words: Word[] }).words;
export const TOTAL2 = Math.ceil((TL as { duration: number }).duration * FPS);
const F = (s: number) => Math.round(s * FPS);
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// camera that fills the frame with one board card
const camFill = (ch: number): Cam => { const p = cardPos(ch); return { s: (1920 / BOARD_CARD.w) * 0.98, fx: p.x + BOARD_CARD.w / 2, fy: p.y + BOARD_CARD.h / 2 }; };
const CAM_MID: Cam = { s: (1920 / BOARD.w) * 1.7, fx: BOARD.w / 2, fy: BOARD.h / 2 + 300 };

/** 00:00 overview: hold 1.8 s with a pulsing Card 01, then a 400 ms whip-zoom into Card 01 */
const BoardOpen: React.FC = () => {
  const f = useCurrentFrame();
  const hold = F(1.8), whip = 12;
  const k = rr(f, hold, hold + whip, 0, 1, CAM_EASE);
  const cam = lerpCam(CAM_OVERVIEW, camFill(1), k);
  const p = cardPos(1), pulse = 0.5 + 0.5 * Math.sin(f * 0.35);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <MasterBoard cam={cam} />
      {k < 0.05 ? <div style={{ position: "absolute", left: (p.x - CAM_OVERVIEW.fx) * cam.s + 960 - 8, top: (p.y - CAM_OVERVIEW.fy) * cam.s + 540 - 8, width: BOARD_CARD.w * cam.s + 16, height: BOARD_CARD.h * cam.s + 16, borderRadius: 10, border: `6px solid ${ACCENT.amber}`, boxShadow: `0 0 ${20 + 24 * pulse}px ${ACCENT.amber}`, opacity: 0.6 + 0.4 * pulse }} /> : null}
    </AbsoluteFill>
  );
};
/** 400 ms chapter hop: zoom out from the finished card (✓ pops) → pan → zoom into the next card */
const BoardHop: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const f = useCurrentFrame();
  const a = rr(f, 0, 6, 0, 1, CAM_EASE), b = rr(f, 6, 12, 0, 1, CAM_EASE);
  const cam = f < 6 ? lerpCam(camFill(from), CAM_MID, a) : lerpCam(CAM_MID, camFill(to), b);
  const checks: Record<number, number> = {};
  for (let c = 1; c < from; c++) checks[c] = 1;
  checks[from] = spr(f, 2, { damping: 12, stiffness: 260, mass: 0.6 });
  return <AbsoluteFill style={{ overflow: "hidden" }}><MasterBoard cam={cam} checks={checks} /></AbsoluteFill>;
};
/** outro: zoom out to the board with all 8 checked, then the end-screen layout (video slot right) */
const Outro: React.FC = () => {
  const f = useCurrentFrame();
  const k = rr(f, 0, 14, 0, 1, CAM_EASE);
  const checks: Record<number, number> = {};
  for (let c = 1; c <= 8; c++) checks[c] = c < 8 ? 1 : spr(f, 4);
  const end = rr(f, F(1.6), F(1.6) + 12, 0, 1, CAM_EASE);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - end }}><MasterBoard cam={lerpCam(camFill(8), CAM_OVERVIEW, k)} checks={checks} /></div>
      {end > 0 ? <AbsoluteFill style={{ opacity: end }}>
        <LightBG />
        <div style={{ position: "absolute", left: 860, top: 230, width: 960, height: 540, borderRadius: 24, border: `6px dashed ${LIGHT.ink}`, background: "rgba(255,255,255,0.65)" }} />
        <T x={860} y={470} w={960} size={52} align="center" at={F(1.6) + 6} color="#6B7280">NEXT VIDEO</T>
        <T x={860} y={110} w={960} size={58} align="center" at={F(1.6) + 4}>10 REAL PLANETS · <span style={{ color: ACCENT.red }}>1 SECOND</span></T>
      </AbsoluteFill> : null}
    </AbsoluteFill>
  );
};

const ShotView: React.FC<{ sh: Shot }> = ({ sh }) => {
  const f = useCurrentFrame();
  const a = F(sh.start), dur = F(sh.end) - a;
  const ws = WORDS.filter((w) => w.start >= sh.start - 0.05 && w.start < sh.end);
  const at = (w: string, nth = 0) => { const hits = ws.filter((x) => norm(x.word) === norm(w)); const h = hits[Math.min(nth, hits.length - 1)]; return h ? Math.max(0, F(h.start) - a) : Math.round(dur * 0.35); };
  const ctx: Ctx = { f, dur, mode: sh.mode === "B" ? "L" : sh.mode, at, words: ws };
  const V = SHOT_V[sh.id];
  const [state, pose] = sh.char.startsWith("H:") || sh.char.startsWith("D:") ? [sh.char[0] as "H" | "D", sh.char.slice(2).split(" ")[0] as Pose] : [null, null];
  return (
    <ShotCtx2.Provider value={ctx}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        {sh.id === 111 ? <Outro /> : V ? <V /> : <LightBG />}
        {state && pose && sh.id !== 111 ? <Rig pose={pose} state={state} /> : null}
        {sh.id === 111 && pose ? <div style={{ opacity: rr(f, F(1.6), F(1.6) + 12) }}><Rig pose={pose} state="H" heroFor={99} /></div> : null}
      </AbsoluteFill>
    </ShotCtx2.Provider>
  );
};

export const EveryBlackHoleV2: React.FC = () => {
  const titles = SHOTS.filter((s) => s.text.toLowerCase().startsWith("number ") && s.ch >= 2);
  return (
    <AbsoluteFill style={{ backgroundColor: "#000", fontFamily: FONT.head }}>
      {SHOTS.map((sh) => (
        <Sequence key={sh.id} name={`S${sh.id}`} from={F(sh.start)} durationInFrames={Math.max(1, F(sh.end) - F(sh.start))} premountFor={15}>
          <ShotView sh={sh} />
        </Sequence>
      ))}
      <Sequence name="board-open" from={0} durationInFrames={F(1.8) + 12}><BoardOpen /></Sequence>
      {titles.map((s) => <Sequence key={`hop${s.ch}`} name={`hop ${s.ch - 1}->${s.ch}`} from={F(s.start)} durationInFrames={13}><BoardHop from={s.ch - 1} to={s.ch} /></Sequence>)}
    </AbsoluteFill>
  );
};
