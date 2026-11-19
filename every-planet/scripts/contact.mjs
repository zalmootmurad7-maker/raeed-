// Render one still per shot (at a fraction of each shot) with a single bundle, for QA contact sheets.
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";
const [, , outDir = "out/contact", frac = "0.75", only = ""] = process.argv;
const shots = JSON.parse(fs.readFileSync("out/shots.json", "utf8"));
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comp = await selectComposition({ serveUrl, id: "EveryBlackHole", browserExecutable: process.env.BE });
fs.mkdirSync(outDir, { recursive: true });
for (const s of shots) {
  if (only && !only.split(",").includes(s.id)) continue;
  const frame = Math.min(s.from + s.dur - 1, s.from + Math.round(s.dur * Number(frac)));
  await renderStill({ serveUrl, composition: comp, frame, output: `${outDir}/${s.id}.png`, browserExecutable: process.env.BE, imageFormat: "png", scale: 0.5 });
  process.stdout.write(s.id + " ");
}
console.log("done");
