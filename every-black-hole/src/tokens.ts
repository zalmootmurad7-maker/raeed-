// All design tokens for "Bold Ink & Motion" (CLAUDE.md §2). Never hardcode colours elsewhere.
export const FPS = 30;
export const W = 1920;
export const H = 1080;

export const LIGHT = {
  bg: "#F6F4EF",
  grid: "#E6E2D8",
  card: "#FFFFFF",
  ink: "#111827",
  shadow: "#CBD5E1",
} as const;

export const SPACE = {
  bg: "#0E131F",
  grid: "#1A2233",
  card: "#161E2E",
  border: "#E2E8F0",
  text: "#F6F4EF",
  cardShadow: "#060911",
} as const;

// v2 (2026-11-24): red = character / danger / THE CATCH; orange + gold = accretion, energy, hero numbers;
// cyan + violet = science, scale, tech. Light #F6F4EF for diagrams/analogies, Space #0E131F for cosmic visuals.
export const ACCENT = {
  red: "#E63946",
  blue: "#38BDF8",
  amber: "#FB923C",
  gold: "#FACC15",
  cyan: "#38BDF8",
  violet: "#A855F7",
  frost: "#CBD5E1",
} as const;

// Motion (zero jitter): UI / pop-ins / character springs; camera zooms and pans use CAM_EASE.
export const SPRING = { damping: 15, stiffness: 160, mass: 0.8 } as const;
export const CAM_BEZIER = [0.22, 1, 0.36, 1] as const;
export const STROKE = 4; // ink outline (px at 1080p)
export const CLEAR = 36; // min clearance between text and drawings (72 px in the 4K render)

export const FONT = {
  head: "'Space Grotesk', sans-serif",
  body: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export type Mode = "light" | "space";
export const modeColors = (m: Mode) =>
  m === "light"
    ? { bg: LIGHT.bg, card: LIGHT.card, border: LIGHT.ink, text: LIGHT.ink, cardShadow: LIGHT.ink, muted: "#5B6475" }
    : { bg: SPACE.bg, card: SPACE.card, border: SPACE.border, text: SPACE.text, cardShadow: SPACE.cardShadow, muted: "#94A3B8" };

// Explainer card: designed at its on-screen size (when the camera is zoomed in on it).
export const CARD = { w: 1220, h: 686, radius: 16, border: 3, shadow: 4 } as const;
// Where an explainer card sits on screen in a standard "character + card" shot.
export const CARD_SLOT = { x: 640, y: 197 } as const;
