// Render stills of the Shorts for QA: frame 0, 0.6 s, then every 1.5 s. One bundle.
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import fs from "node:fs";
import path from "node:path";
const ids = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
for (const id of ids) {
  const comp = await selectComposition({ serveUrl, id, browserExecutable: process.env.BE });
  const dir = `out/shorts_qa/${id}`; fs.mkdirSync(dir, { recursive: true });
  const ts = [0, 0.6]; for (let t = 1.5; t < comp.durationInFrames / 30; t += 1.5) ts.push(t);
  ts.push(comp.durationInFrames / 30 - 0.5);
  for (const t of ts) {
    const frame = Math.min(comp.durationInFrames - 1, Math.round(t * 30));
    await renderStill({ serveUrl, composition: comp, frame, output: `${dir}/${String(frame).padStart(4, "0")}.png`, browserExecutable: process.env.BE, imageFormat: "png", scale: 0.5 });
  }
  console.log(id, ts.length);
}
