import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

// Shorts cover 1080x1920 (render --scale=2). Everything important inside y 200–1720 (channel-page 2:3 crop), text ≥140 px.
const HEAD = "'Space Grotesk', sans-serif";
const NAVY = "#141824";
const CardC: React.FC<{ x: number; color: string; lines: string[] }> = ({ x, color, lines }) => (
  <div style={{ position: "absolute", left: x, top: 760, width: 240, height: 290, borderRadius: 26, border: `9px solid ${color}`, background: "rgba(10,14,24,0.85)", boxShadow: `0 0 60px 18px ${color}, inset 0 0 30px ${color}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: HEAD, fontWeight: 700, color }}>
    {lines.map((l, i) => <div key={i} style={{ fontSize: i === 0 ? 52 : 36, lineHeight: 1.05, textShadow: `0 0 18px ${color}` }}>{l}</div>)}
  </div>
);
export const Cover: React.FC = () => (
  <AbsoluteFill style={{ background: "#0B0F1A" }}>
    <Img src={staticFile("layers/bg_03_event_horizon_pull.jpg")} style={{ position: "absolute", left: 0, top: -7.5, width: 1080, height: 1935, filter: "brightness(0.7)" }} />
    <Img src={staticFile("layers/char_04_sweating_torn.png")} style={{ position: "absolute", left: 540 - 410, top: 740, height: 900 }} />
    <CardC x={22} color="#3CFF7A" lines={["ESCAPE", "(+300 YRS)"]} />
    <CardC x={1080 - 22 - 240} color="#FF4D4D" lines={["NO", "RETURN"]} />
    <div style={{ position: "absolute", left: 0, top: 230, width: 1080, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 150, lineHeight: 0.98, color: "#FFFFFF", WebkitTextStroke: `14px ${NAVY}`, paintOrder: "stroke fill", textShadow: "0 10px 0 rgba(0,0,0,0.5)" }}>1 BURN.</div>
    <div style={{ position: "absolute", left: 0, top: 400, width: 1080, textAlign: "center", fontFamily: HEAD, fontWeight: 700, fontSize: 170, lineHeight: 0.98, color: "#FF4D4D", WebkitTextStroke: `14px ${NAVY}`, paintOrder: "stroke fill", textShadow: "0 0 40px rgba(255,60,60,0.8)" }}>WHICH ONE?</div>
  </AbsoluteFill>
);
