import "@fontsource/space-grotesk/700.css";
import { continueRender, delayRender } from "remotion";
const handle = delayRender("Loading fonts");
document.fonts.load("700 80px 'Space Grotesk'").then(() => continueRender(handle));
