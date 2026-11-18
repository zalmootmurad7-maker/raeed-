import { useCurrentFrame } from "remotion";
// Owner decision (2026-11-18): NO line boil, NO stepped frames, NO jitter. Everything runs smooth at 30 fps.
// These helpers are kept so existing scenes compile, but they are now identity / zero.
export const STEP = 1;
export const stepped = (frame: number) => frame;
export const boilNoise = (_frame: number, _seed: number) => 0;
export const useSteppedFrame = () => useCurrentFrame();
export const useBoil = (_seed: number, _px = 0, _deg = 0) => ({ x: 0, y: 0, r: 0 });
