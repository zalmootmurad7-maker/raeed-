import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { r, sp } from "../lib/core";

// Character sprites are ALWAYS loaded from PNG (never drawn). Entry = smooth spring scale, no jitter.
export type CouchPose = "couch_chill" | "couch_shocked" | "couch_hide";
export type StandPose = "explaining" | "shocked" | "the_catch" | "thinking";
export const COUCH_AR = 977 / 1306; // height / width of the couch cut-outs
// head inside the couch sprite (measured from the alpha): x 0.384–0.623, top 0.01, diameter ~0.32 of height
export const COUCH_HEAD = { x0: 0.384, x1: 0.623, top: 0.01, d: 0.32 };

export const Couch: React.FC<{ pose: CouchPose; x: number; bottom: number; w: number; at?: number; pop?: boolean; flip?: boolean }> = ({ pose, x, bottom, w, at = 0, pop = true, flip }) => {
  const f = useCurrentFrame();
  const k = pop ? 0.94 + 0.06 * sp(f, at, 13, 220) : 1;
  const h = w * COUCH_AR;
  return <Img src={staticFile(`assets/character/couch/${pose}.png`)} style={{ position: "absolute", left: x, top: bottom - h, width: w, height: h, scale: `${flip ? -k : k} ${k}`, transformOrigin: "50% 100%" }} />;
};

const AR: Record<StandPose, number> = { explaining: 1243 / 2000, shocked: 1311 / 2000, the_catch: 732 / 2000, thinking: 833 / 2000 };
/**
 * Stand-up presenter. Hero size (~28% width) for `heroFor` seconds after `at`, then a smooth spring docks it
 * bottom-left (~17% width) — or exits (`exit`) so the diagram owns 75–95% of the frame.
 */
export const Presenter: React.FC<{ pose: StandPose; at: number; heroFor?: number; exit?: boolean; heroX?: number }> = ({ pose, at, heroFor = 2, exit, heroX = 330 }) => {
  const f = useCurrentFrame();
  if (f < at) return null;
  const k = sp(f, at, 13, 220);
  const d = sp(f, at + Math.round(heroFor * 30), 16, 170);
  const heroH = (1920 * 0.28) / AR[pose], dockH = (1920 * 0.17) / AR[pose];
  const h = Math.min(760, heroH) + (Math.min(560, dockH) - Math.min(760, heroH)) * d;
  const cx = heroX + (40 + (1920 * 0.17) / 2 - heroX) * d;
  const out = exit ? r(f, at + Math.round(heroFor * 30), at + Math.round(heroFor * 30) + 10, 1, 0) : 1;
  const w = h * AR[pose];
  return <Img src={staticFile(`assets/character/light/${pose}.png`)} style={{ position: "absolute", left: cx - w / 2, top: 1050 - h, height: h, scale: `${(0.94 + 0.06 * k) * (0.6 + 0.4 * out)}`, opacity: out, transformOrigin: "50% 100%" }} />;
};
