import "@fontsource/bangers/400.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import { continueRender, delayRender } from "remotion";
const h = delayRender("fonts");
Promise.all(["400 80px Bangers", "800 40px Montserrat", "900 40px Montserrat"].map((f) => document.fonts.load(f))).then(() => continueRender(h));
