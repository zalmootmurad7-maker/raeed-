import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { C, FONT, LIGHT, Mode, SPACE, r, sp } from "../lib/core";
import { LightBg, Pill, Pop, SpaceBg, WarningBadge } from "./Base";
import { BOARD, CAM_FULL, MasterBoard, cardCenter, lerpCam } from "./Board";
import { THREATS } from "./Icons";
import { Shock } from "./Prims";

export type BeatProps = { b0: number; b1: number };

/** Chapter title: huge animated icon + number + name, badge pops (once per chapter). */
export const ChapterTitle: React.FC<BeatProps & { i: number; mode: Mode; badge: string; reveal?: boolean; danger?: boolean }> = ({ b0, b1, i, mode, badge, reveal, danger }) => {
  const f = useCurrentFrame();
  const t = f / 30;
  const th = THREATS[i];
  const k = sp(f, b0, 12, 200);
  const name = i === 7 && reveal ? "FALSE VACUUM DECAY" : th.name;
  const flip = i === 7 && reveal ? r(f, b0 + 10, b0 + 22, 0, 1, Easing.inOut(Easing.cubic)) : 1;
  const ink = mode === "light" ? LIGHT.ink : SPACE.text;
  const cam = 1 + 0.03 * r(f, b0, b1, 0, 1, Easing.linear);
  return (
    <>
      {mode === "light" ? <LightBg /> : <SpaceBg />}
      <div style={{ position: "absolute", inset: 0, scale: `${cam}`, transformOrigin: "35% 50%" }}>
        <Shock cx={560} cy={560} at={b0} R={400} color={i === 7 ? C.red : C.blue} period={1.6} />
        <div style={{ position: "absolute", left: 560 - 260, top: 560 - 260, width: 520, height: 520, scale: `${0.4 + 0.6 * k}`, opacity: Math.min(1, k * 2), transformOrigin: "50% 50%" }}>
          <th.Icon size={520} t={t} />
        </div>
      </div>
      <div style={{ position: "absolute", left: 1000, top: 360, scale: `${0.6 + 0.4 * k}`, opacity: Math.min(1, k * 2), transformOrigin: "0% 50%" }}>
        <Pill text={String(th.n).padStart(2, "0")} color={i === 7 ? C.red : C.blue} size={56} />
      </div>
      <div style={{ position: "absolute", left: 1000, top: 480, width: 860, scale: `${1} ${i === 7 && reveal ? Math.max(0.02, Math.abs(1 - 2 * flip)) : 1}` }}>
        <Pop at={b0 + 4} x={0} y={0} w={860} size={Math.min(100, Math.floor(820 / (Math.max(name.length, 3) * 0.6)))} color={i === 7 && !(reveal && flip > 0.5) ? C.red : ink}>{i === 7 && reveal && flip < 0.5 ? "???" : name}</Pop>
      </div>
      <WarningBadge value={badge} at={b0} mode={mode} danger={danger} />
    </>
  );
};

/** Board transition: pull back from the finished card (✓ pops), hold, then zoom into the next card. */
export const Transition: React.FC<BeatProps & { next: number; label?: React.ReactNode; reveal8?: boolean }> = ({ b0, b1, next, label, reveal8 }) => {
  const f = useCurrentFrame();
  const prev = cardCenter(next - 1), nxt = cardCenter(next);
  const zoomOut = r(f, b0, b0 + 12, 0, 1, Easing.inOut(Easing.cubic));
  const zoomIn = r(f, b1 - 16, b1, 0, 1, Easing.inOut(Easing.cubic));
  let cam = lerpCam({ s: 2.7, fx: prev.x, fy: prev.y }, CAM_FULL, zoomOut);
  if (zoomIn > 0) cam = lerpCam(CAM_FULL, { s: 2.7, fx: nxt.x, fy: nxt.y }, zoomIn);
  const checks = Array.from({ length: next }, (_, i) => i).filter((i) => i < next - 1 || f >= b0 + 10);
  return (
    <>
      <LightBg />
      <MasterBoard cam={cam} checks={checks} pulse8 reveal8={reveal8} redCards={[next]} />
      {label && zoomIn === 0 ? <div style={{ position: "absolute", left: BOARD.x0, top: 980, width: 1708, textAlign: "center" }}><Pop at={b0 + 12} x={0} y={0} w={1708} size={48} align="center">{label}</Pop></div> : null}
      {label && zoomIn === 0 ? null : null}
    </>
  );
};

/** "Warning time? …" beat: big kinetic answer, optional extra drawing. */
export const WarnBeat: React.FC<BeatProps & { mode: Mode; at: number; value: React.ReactNode; sub?: React.ReactNode; subAt?: number; color?: string; children?: React.ReactNode; x?: number; size?: number }> = ({ b0, b1, mode, at, value, sub, subAt, color = C.red, children, x = 120, size = 150 }) => {
  const f = useCurrentFrame();
  const ink = mode === "light" ? LIGHT.ink : SPACE.text;
  const cam = 1 + 0.03 * r(f, b0, b1, 0, 1, Easing.linear);
  return (
    <div style={{ position: "absolute", inset: 0, scale: `${cam}` }}>
      {children}
      <Pop at={b0} x={x} y={250} w={1800 - x} size={64} align="center" color={ink}>WARNING TIME?</Pop>
      <Pop at={at} x={x} y={380} w={1800 - x} size={size} align="center" color={color} from="scale" mono>{value}</Pop>
      {sub ? <Pop at={subAt ?? at + 20} x={x} y={size > 120 ? 600 : 640} w={1800 - x} size={50} align="center" color={ink}>{sub}</Pop> : null}
    </div>
  );
};

export const Label: React.FC<{ at: number; x: number; y: number; w?: number; size?: number; color?: string; align?: "left" | "center" | "right"; children: React.ReactNode; mono?: boolean }> = ({ at, x, y, w = 600, size = 44, color, align = "center", children, mono }) => (
  <Pop at={at} x={x} y={y} w={w} size={size} color={color} align={align} mono={mono}>{children}</Pop>
);
export const txt = (mode: Mode) => (mode === "light" ? LIGHT.ink : SPACE.text);
export const MONO = FONT.mono;
