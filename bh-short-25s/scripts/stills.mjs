// Render named stills from one bundle. Usage: node scripts/stills.mjs scale out_dir name=sec [name=sec ...]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";
const [scale, outDir, ...pairs] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const composition = await selectComposition({ serveUrl, id: process.env.COMP ?? "UniverseKill", browserExecutable: process.env.BE });
for (const p of pairs) {
  const [name, sec] = p.split("=");
  await renderStill({ serveUrl, composition, frame: Math.round(parseFloat(sec) * 30), output: `${outDir}/${name}.png`, browserExecutable: process.env.BE, imageFormat: "png", scale: parseFloat(scale) });
  console.log(name);
}
