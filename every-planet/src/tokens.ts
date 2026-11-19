// All design tokens for "Bold Ink & Motion" (CLAUDE.md §2). Never hardcode colours elsewhere.
export const FPS = 30;
export const W = 1920;
export const H = 1080;

export const LIGHT = {
  bg: "#F6F4EF",
  grid: "#E6E2D8",
  card: "#FFFFFF",
  ink: "#141824",
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

export const ACCENT = {
  red: "#E53935",
  blue: "#2563EB",
  amber: "#F59E0B",
  frost: "#CBD5E1",
} as const;

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
