import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

// Shared 2D comic kit: thick dark outlines, flat fills + one cel-shade, saturated colours.
export const OUT = "#0A1020";
export const OW = 6; // outline width (px at 1080p)
export const C = {
  blue: "#1E9BFF", deep: "#06203F", navy: "#0A2E5C", turq: "#19D3C5", cyan: "#5CF2FF", coral: "#FF6B6B", coral2: "#FF9F43",
  orange: "#FF8A1F", amber: "#FFB547", gold: "#FFD166", charcoal: "#2A2E36", rock: "#7A7268", rock2: "#5B554E", spaceBlue: "#0B1630",
  white: "#FFFFFF",
} as const;
export const FONT = { comic: "Bangers, sans-serif", ui: "Montserrat, sans-serif" } as const;

export const rnd = (i: number, n: number) => { const v = Math.sin((i + 1) * 78.233 * n) * 43758.5453; return v - Math.floor(v); };

export const Svg: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", ...style }}>{children}</svg>
);

// ---------- hero (supplied PNG poses only, never redrawn) ----------
export type Pose = "01_pointing" | "02_thinking" | "03_surprised" | "04_celebrating" | "05_shrugging" | "06_confident" | "07_scared" | "08_running" | "09_sitting_thinking" | "10_diving_goggles" | "11_back_view";
export const Hero: React.FC<{ pose: Pose; cx: number; bottom: number; h: number; flip?: boolean; light?: string; shadow?: boolean; style?: React.CSSProperties }> = ({ pose, cx, bottom, h, flip, light, shadow = true, style }) => (
  <>
    {shadow ? <div style={{ position: "absolute", left: cx - h * 0.26, top: bottom - h * 0.035, width: h * 0.52, height: h * 0.07, borderRadius: 999, background: "rgba(0,0,0,0.45)", filter: "blur(6px)" }} /> : null}
    <Img src={staticFile(`character/${pose}.png`)} style={{ position: "absolute", left: cx, top: bottom - h, height: h, translate: "-50% 0", transform: flip ? "scaleX(-1)" : undefined, filter: light ? `drop-shadow(0 0 22px ${light})` : undefined, ...style }} />
  </>
);

// ---------- text ----------
export const ComicText: React.FC<{ x: number; y: number; w: number; size: number; color: string; children: React.ReactNode; align?: "left" | "center" | "right"; stroke?: number; rot?: number }> = ({ x, y, w, size, color, children, align = "center", stroke = 12, rot = 0 }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, textAlign: align, fontFamily: FONT.comic, fontSize: size, lineHeight: 1.0, letterSpacing: 2, color, WebkitTextStroke: `${stroke}px ${OUT}`, paintOrder: "stroke fill", textShadow: `0 ${size * 0.07}px 0 ${OUT}`, rotate: `${rot}deg`, whiteSpace: "nowrap" }}>{children}</div>
);
/** subtitle: bold sans, white with dark outline, lower third */
export const Subtitle: React.FC<{ text: string; y?: number }> = ({ text, y = 940 }) => (
  <div style={{ position: "absolute", left: 160, top: y, width: 1600, textAlign: "center" }}><span style={{ display: "inline-block", padding: "4px 26px", borderRadius: 18, background: "rgba(6,12,28,0.55)", fontFamily: FONT.ui, fontWeight: 800, fontSize: 46, lineHeight: 1.2, color: "#FFF", WebkitTextStroke: `8px ${OUT}`, paintOrder: "stroke fill", textShadow: "0 4px 10px rgba(0,0,0,0.6)" }}>{text}</span></div>
);
export const Fill: React.FC<{ bg: string }> = ({ bg }) => <AbsoluteFill style={{ background: bg }} />;

/**
 * HUD — small floating panel, top-left. Shown only in danger scenes and choice reveals.
 * Static layout (0 px jitter); values come from props so they can animate smoothly (count/fill) in the video.
 */
export const Hud: React.FC<{ bpm: number; survival: number; beat?: number; x?: number; y?: number }> = ({ bpm, survival, beat = 0, x = 40, y = 36 }) => {
  const s = Math.max(0, Math.min(100, survival));
  const barCol = s < 35 ? "#FF3B3B" : s < 65 ? "#FFB547" : "#3DDC84";
  const hot = bpm >= 120;
  // ECG trace: flat - spike - flat, drawn once (no per-frame noise)
  const ecg = "M 0 22 L 40 22 L 50 22 L 58 6 L 66 38 L 74 0 L 82 30 L 90 22 L 130 22 L 140 22 L 148 6 L 156 38 L 164 0 L 172 30 L 180 22 L 214 22";
  return (
    <div style={{ position: "absolute", left: x, top: y, width: 500, height: 176, borderRadius: 24, background: "rgba(6,12,28,0.78)", border: `5px solid ${OUT}`, boxShadow: `0 0 0 3px ${hot ? "rgba(255,59,59,0.85)" : "rgba(92,242,255,0.7)"}, 0 10px 24px rgba(0,0,0,0.45)`, fontFamily: FONT.ui, color: "#FFF", fontVariantNumeric: "tabular-nums" }}>
      {/* row 1: heart + BPM + ECG */}
      <svg width={70} height={64} viewBox="0 0 70 64" style={{ position: "absolute", left: 18, top: 14 }}>
        <g transform={`translate(35 34) scale(${1 + 0.08 * beat}) translate(-35 -34)`}>
          <path d="M 35 58 C 6 38 4 18 16 10 C 26 3 34 10 35 18 C 36 10 44 3 54 10 C 66 18 64 38 35 58 Z" fill="#FF3B3B" stroke={OUT} strokeWidth={5} strokeLinejoin="round" />
          <path d="M 20 18 Q 24 13 30 15" fill="none" stroke="#FFF" strokeWidth={4} strokeLinecap="round" opacity={0.8} />
        </g>
      </svg>
      <div style={{ position: "absolute", left: 98, top: 12, fontWeight: 900, fontSize: 50, lineHeight: 1 }}>{Math.round(bpm)}</div>
      <div style={{ position: "absolute", left: 98, top: 62, fontWeight: 800, fontSize: 18, letterSpacing: 3, color: "#9FB4D8" }}>BPM</div>
      <svg width={214} height={44} viewBox="0 -2 214 44" style={{ position: "absolute", left: 262, top: 22 }}>
        <path d={ecg} fill="none" stroke={hot ? "#FF5A5A" : C.cyan} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      {/* row 2: survival bar */}
      <div style={{ position: "absolute", left: 22, top: 100, fontWeight: 900, fontSize: 20, letterSpacing: 3, color: "#9FB4D8" }}>SURVIVAL</div>
      <div style={{ position: "absolute", left: 22, top: 128, width: 340, height: 30, borderRadius: 999, background: "#1B2438", border: `4px solid ${OUT}`, overflow: "hidden" }}>
        <div style={{ width: `${s}%`, height: "100%", borderRadius: 999, background: `linear-gradient(180deg, ${barCol}, ${barCol}cc)`, boxShadow: "inset 0 5px 0 rgba(255,255,255,0.35)" }} />
      </div>
      <div style={{ position: "absolute", left: 372, top: 104, width: 110, textAlign: "right", fontWeight: 900, fontSize: 52, lineHeight: 1, color: barCol, WebkitTextStroke: `6px ${OUT}`, paintOrder: "stroke fill" }}>{Math.round(s)}%</div>
    </div>
  );
};
