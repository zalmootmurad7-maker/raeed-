// Segments live in shorts.json (shared with scripts/shorts_audio.py). Three Shorts cut from the final voiceover (public/audio/timestamps.json times). Each segment = [srcStart, srcEnd] seconds.
export type ShortCfg = { id: string; banner: string[]; bannerSize: number; segs: [number, number][]; tail: number };
import DATA from "./shorts.json";
export const SHORTS = DATA as unknown as ShortCfg[];
export const FPS = 30;
export const shortDuration = (c: ShortCfg) => c.segs.reduce((a, [s, e]) => a + (e - s), 0) + c.tail;
// source time -> local time in the short (null if outside the kept segments)
export const toLocal = (c: ShortCfg, src: number) => {
  let acc = 0;
  for (const [s, e] of c.segs) {
    if (src >= s && src <= e) return acc + (src - s);
    acc += e - s;
  }
  return null;
};
