// Design tokens (CLAUDE.md §3) + timing helpers. Composition is 1920x1080 @ 30 fps; final render --scale=2 -> 3840x2160.
import { Easing, interpolate, spring } from "remotion";
import TS from "./timestamps.json";

export const FPS = 30;
export const W = 1920;
export const H = 1080;

export const LIGHT = { bg: "#F6F4EF", grid: "#E6E2D8", card: "#FFFFFF", ink: "#141824", shadow: "#CBD5E1" } as const;
export const SPACE = { bg: "#0E131F", card: "#161E2E", border: "#E2E8F0", text: "#F6F4EF", shadow: "#060911" } as const;
export const C = { red: "#E53935", blue: "#2563EB", amber: "#F59E0B", green: "#10B981" } as const;
export const FONT = {
  head: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;
export const CARD_RADIUS = 18;
export const GAP = 36; // minimum clear space between any label and any drawing (CLAUDE.md §2.3, 1080p units)

export type Mode = "light" | "space";

/** seconds -> frame */
export const F = (sec: number) => Math.round(sec * FPS);
const cl = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
/** clamped interpolation between two frames */
export const r = (f: number, a: number, b: number, from = 0, to = 1, e: (t: number) => number = Easing.out(Easing.cubic)) =>
  interpolate(f, [a, Math.max(a + 1, b)], [from, to], { ...cl, easing: e });
/** spring that starts at frame `at` (0 before) */
export const sp = (f: number, at: number, damping = 12, stiffness = 180, mass = 0.8) =>
  f < at ? 0 : spring({ frame: f - at, fps: FPS, config: { damping, stiffness, mass } });

export type Word = { word: string; start: number; end: number };
export const WORDS: Word[] = (TS as { words: Word[] }).words;
export const DURATION_S = Math.ceil(((TS as { duration: number }).duration + 1.5) * 10) / 10;
