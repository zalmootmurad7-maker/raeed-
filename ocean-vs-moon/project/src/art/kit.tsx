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
