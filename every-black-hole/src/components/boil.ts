import { useCurrentFrame } from "remotion";
// Hybrid FPS (CLAUDE.md §4): characters + ink icons step at 10 fps (every 3rd frame at 30 fps).
export const STEP = 3;
export const stepped = (frame: number) => Math.floor(frame / STEP) * STEP;
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
// Deterministic -1..1 noise that only changes on stepped frames.
export const boilNoise = (frame: number, seed: number) => hash(stepped(frame) * 0.37 + seed * 17.13) * 2 - 1;
export const useSteppedFrame = () => stepped(useCurrentFrame());
// Subtle 1-2px line boil: offset + tiny rotation, stepped.
export const useBoil = (seed: number, px = 1.5, deg = 0.35) => {
  const f = useCurrentFrame();
  return { x: boilNoise(f, seed) * px, y: boilNoise(f, seed + 1) * px, r: boilNoise(f, seed + 2) * deg };
};
