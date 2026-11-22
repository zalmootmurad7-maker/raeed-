import "@fontsource/space-grotesk/700.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import { continueRender, delayRender } from "remotion";

const handle = delayRender("Loading fonts");
Promise.all(
  [
    "700 40px 'Space Grotesk'",
    "500 40px 'Inter'",
    "600 40px 'Inter'",
    "500 40px 'JetBrains Mono'",
    "700 40px 'JetBrains Mono'",
  ].map((f) => document.fonts.load(f)),
).then(() => continueRender(handle));
