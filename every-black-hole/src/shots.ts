// Shot table from black_hole_micro_shot_list.md. Times are placeholders until audio/timestamps.json
// exists; then shot boundaries get re-aligned to the voiceover words.
import { FPS } from "./tokens";

export type Pose = "explaining" | "shocked" | "the_catch" | "thinking";
export type ShotKind = "board" | "light" | "dark";
export type Shot = { id: string; start: string; end: string; kind: ShotKind; chapter: number; pose?: Pose; note: string };

const s = (id: string, start: string, end: string, kind: ShotKind, chapter: number, note: string, pose?: Pose): Shot => ({ id, start, end, kind, chapter, note, pose });

export const SHOTS: Shot[] = [
  s("00", "00:00", "00:02", "board", 0, "MasterBoard overview -> zoom in to card 01"),
  s("01", "00:02", "00:05", "light", 1, "Card 01 settles, character points right", "explaining"),
  s("02", "00:05", "00:09", "light", 1, "Snap zoom: giant black hole -> tiny atom dot"),
  s("03", "00:09", "00:15", "light", 1, "Mountain squashes into a tiny dot"),
  s("04", "00:15", "00:22", "light", 1, "Planck scale ruler, gravity vs quantum"),
  s("05", "00:22", "00:30", "light", 1, "Cosmic rays hit Earth, whip pan to LHC", "thinking"),
  s("06", "00:30", "00:35", "dark", 1, "THE CATCH slams in", "the_catch"),
  s("07", "00:35", "00:44", "dark", 1, "Hawking radiation leaks, hole shrinks"),
  s("08", "00:44", "00:54", "dark", 1, "Dot flashes and explodes"),
  s("09", "00:54", "01:05", "dark", 1, "Timer 10^-27 s"),
  s("10", "01:05", "01:24", "light", 1, "CERN safe, Switzerland map", "explaining"),
  s("10b", "01:24", "01:25", "board", 1, "Board transition 1 -> 2"),
  s("11", "01:25", "01:33", "dark", 2, "Card 02 PRIMORDIAL", "thinking"),
  s("12", "01:33", "01:44", "dark", 2, "Big Bang timeline energy soup"),
  s("13", "01:44", "01:55", "dark", 2, "Pockets collapse into 3 dots"),
  s("14", "01:55", "02:08", "dark", 2, "Dark matter pie chart"),
  s("15", "02:08", "02:18", "dark", 2, "THE CATCH", "the_catch"),
  s("16", "02:18", "02:34", "dark", 2, "Microlensing pass"),
  s("17", "02:34", "02:54", "dark", 2, "0 FINGERPRINTS stamp"),
  s("17b", "02:54", "02:55", "board", 2, "Board transition 2 -> 3"),
  s("18", "02:55", "03:05", "light", 3, "Card 03 STELLAR-MASS", "explaining"),
  s("19", "03:05", "03:18", "light", 3, "20x Sun star, fusion off"),
  s("20", "03:18", "03:30", "light", 3, "Core collapse, supernova"),
  s("21", "03:30", "03:42", "light", 3, "5-30 Suns vs city skyline"),
  s("22", "03:42", "03:56", "dark", 3, "Cygnus X-1 gas stream"),
  s("23", "03:56", "04:05", "dark", 3, "THE CATCH", "the_catch"),
  s("24", "04:05", "04:18", "dark", 3, "Sun swapped, orbit unchanged"),
  s("25", "04:18", "04:29", "dark", 3, "Frost creeps in", "shocked"),
  s("25b", "04:29", "04:30", "board", 3, "Board transition 3 -> 4"),
  s("26", "04:30", "04:42", "light", 4, "Car vs cargo ship", "thinking"),
  s("27", "04:42", "04:55", "light", 4, "100-100,000 Suns, missing van"),
  s("28", "04:55", "05:10", "light", 4, "Merging up a growth bar"),
  s("29", "05:10", "05:20", "dark", 4, "THE CATCH", "the_catch"),
  s("30", "05:20", "05:38", "dark", 4, "LIGO 142 solar masses"),
  s("31", "05:38", "05:59", "light", 4, "Poll card + like", "explaining"),
  s("31b", "05:59", "06:00", "board", 4, "Board transition 4 -> 5"),
  s("32", "06:00", "06:12", "dark", 5, "Galaxy core push-in", "explaining"),
  s("33", "06:12", "06:28", "dark", 5, "Sagittarius A* 4.3M Suns"),
  s("34", "06:28", "06:42", "dark", 5, "EHT 2022 image"),
  s("35", "06:42", "06:52", "dark", 5, "THE CATCH", "the_catch"),
  s("36", "06:52", "07:12", "dark", 5, "Spaghetti vs calm split"),
  s("37", "07:12", "07:34", "dark", 5, "Crosses event horizon", "shocked"),
  s("37b", "07:34", "07:35", "board", 5, "Board transition 5 -> 6"),
  s("38", "07:35", "07:48", "dark", 6, "ULTRAMASSIVE header drops", "shocked"),
  s("39", "07:48", "08:12", "dark", 6, "TON 618 vs 40 Solar Systems scale bar"),
  s("40", "08:12", "08:35", "dark", 6, "Phoenix A 100 billion Suns"),
  s("41", "08:35", "08:45", "dark", 6, "THE CATCH 50B limit", "the_catch"),
  s("42", "08:45", "09:14", "dark", 6, "Disk breaks, giants merge"),
  s("42b", "09:14", "09:15", "board", 6, "Board transition 6 -> 7"),
  s("43", "09:15", "09:30", "light", 7, "Static vs spinning split"),
  s("44", "09:30", "09:48", "light", 7, "Schwarzschild textbook sphere"),
  s("45", "09:48", "10:10", "dark", 7, "Kerr ergosphere swirl"),
  s("46", "10:10", "10:20", "dark", 7, "THE CATCH cosmic battery", "the_catch"),
  s("47", "10:20", "10:44", "dark", 7, "Penrose process"),
  s("47b", "10:44", "10:45", "board", 7, "Board transition 7 -> 8"),
  s("48", "10:45", "11:02", "light", 8, "Charged black hole", "thinking"),
  s("49", "11:02", "11:18", "light", 8, "White hole"),
  s("50", "11:18", "11:32", "dark", 8, "THE CATCH charge neutralised", "the_catch"),
  s("51", "11:32", "11:45", "dark", 8, "2nd law stamp, Big Bang flash"),
  s("52", "11:45", "12:00", "board", 8, "All cards checked, pull back"),
  s("53", "12:00", "12:10", "dark", 8, "End screen card", "explaining"),
];

export const toFrames = (t: string) => {
  const [m, sec] = t.split(":").map(Number);
  return Math.round((m * 60 + sec) * FPS);
};
export const shotFrom = (sh: Shot) => toFrames(sh.start);
export const shotDur = (sh: Shot) => Math.max(1, toFrames(sh.end) - toFrames(sh.start));
export const TOTAL_FRAMES = toFrames(SHOTS[SHOTS.length - 1].end);
