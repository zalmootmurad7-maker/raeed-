import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "node:path";
const [id, frame, out] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const comp = await selectComposition({ serveUrl, id, browserExecutable: process.env.BE });
await renderStill({ serveUrl, composition: comp, frame: +frame, output: out, browserExecutable: process.env.BE, imageFormat: "png", scale: 0.5 });
