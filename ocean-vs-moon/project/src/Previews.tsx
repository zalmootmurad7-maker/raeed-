import React from "react";
import { AbsoluteFill } from "remotion";
import "./fonts";
import { C, ComicText, FONT, Hero, Hud, OUT, OW, Subtitle, Svg, rnd } from "./art/kit";
import { Bubbles, Coral, DeepCreature, Dome, FarCity, Fish, GlowPlant, Kelp, OceanWater, SeaFan, Seabed, Tube } from "./art/ocean";
import { Antenna, Dust, EarthDisc, Module, MoonGround, Rover, SpaceSky } from "./art/moon";

const T = 3.2; // the moment in time these stills represent (drives bubbles, glows, sway)

/* ---------- 1. HOOK: hero between the deep ocean and the Moon ---------- */
export const Preview1: React.FC = () => (
  <AbsoluteFill style={{ background: "#000" }}>
    {/* ocean half (left, diagonal) */}
    <AbsoluteFill style={{ clipPath: "polygon(0 0, 1080px 0, 840px 100%, 0 100%)" }}>
      <OceanWater t={T} dark />
      <DeepCreature x={150} y={610} s={1.2} flip t={T} lure={false} />
      <Seabed y={900} />
            <Kelp x={170} y={940} h={300} t={T} seed={2} color="#12A884" />
      <Coral x={330} y={950} s={1.1} seed={2} />
      <GlowPlant x={560} y={950} s={1.1} t={T} seed={3} />
      <Fish x={200} y={330} s={0.7} color={C.coral2} />
      <Fish x={560} y={860} s={0.55} color={C.turq} />
      <Bubbles t={T} n={22} x0={0} x1={900} />
    </AbsoluteFill>
    {/* moon half (right, diagonal) */}
    <AbsoluteFill style={{ clipPath: "polygon(1080px 0, 100% 0, 100% 100%, 840px 100%)" }}>
      <SpaceSky t={T} />
      <EarthDisc cx={1700} cy={200} r={135} t={T} />
      <Svg><path d="M 1000 790 L 1150 600 L 1240 680 L 1360 540 L 1500 700 L 1600 620 L 1760 720 L 1940 600 L 1940 800 Z" fill="#4A4038" stroke={OUT} strokeWidth={OW} strokeLinejoin="round" /><path d="M 1150 600 L 1180 700 M 1360 540 L 1390 660 M 1600 620 L 1630 720" stroke="#6E5A48" strokeWidth={8} /></Svg>
      <MoonGround y={760} />
      <Module x={1430} y={880} w={420} h={170} t={T} />
      <Module x={1170} y={880} w={270} h={240} t={T} dome />
      <Antenna x={1880} y={870} t={T} />
      <Svg><rect x={1150} y={872} width={720} height={26} rx={10} fill="#8D8A85" stroke={OUT} strokeWidth={OW} />{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <circle key={i} cx={1190 + i * 90} cy={885} r={7} fill={C.amber} />)}</Svg>
      <Dust t={T} n={36} />
    </AbsoluteFill>
    {/* glowing seam */}
    <Svg>
      <defs>
        <linearGradient id="seam" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={C.cyan} /><stop offset="100%" stopColor={C.orange} /></linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>
      <line x1={1080} y1={0} x2={840} y2={1080} stroke="url(#seam)" strokeWidth={40} filter="url(#glow)" opacity={0.9} />
      <line x1={1080} y1={0} x2={840} y2={1080} stroke={OUT} strokeWidth={16} />
      <line x1={1080} y1={0} x2={840} y2={1080} stroke="#FFF" strokeWidth={5} />
    </Svg>
    <Hero pose="03_surprised" cx={955} bottom={1020} h={600} light="rgba(255,255,255,0.35)" />
    <div style={{ position: "absolute", left: 500, top: 26, width: 920, height: 290, rotate: "-2deg", borderRadius: 40, padding: 8, background: "linear-gradient(90deg, #38B6FF, #FFFFFF 50%, #FF8A1F)", boxShadow: `0 12px 0 ${OUT}` }}>
      <div style={{ width: "100%", height: "100%", borderRadius: 32, background: "rgba(8,12,26,0.86)", border: `6px solid ${OUT}`, boxSizing: "border-box" }} />
    </div>
    <ComicText x={0} y={46} w={1920} size={150} color="#FFF" rot={-2} stroke={16}>
      <span style={{ color: "#38B6FF" }}>OCEAN</span> <span style={{ fontSize: 100 }}>VS</span> <span style={{ color: C.orange }}>MOON</span>
    </ComicText>
    <ComicText x={0} y={214} w={1920} size={64} color={C.gold} stroke={10} rot={-2}>WOULD YOU SURVIVE BOTH WORLDS?</ComicText>
    <ComicText x={40} y={150} w={420} size={60} color="#9FDCFF" stroke={10} rot={-4}>WORLD A</ComicText>
    <ComicText x={1440} y={430} w={420} size={60} color="#FFD7A8" stroke={10} rot={4}>WORLD B</ComicText>
  </AbsoluteFill>
);

/* ---------- 2. OCEAN: futuristic underwater city ---------- */
export const Preview2: React.FC = () => (
  <AbsoluteFill>
    <OceanWater t={T} />
    <FarCity y={720} />
    <Seabed y={800} />
    <Dome cx={430} by={810} rx={330} ry={300} seed={1} t={T} />
    <Dome cx={1500} by={790} rx={380} ry={340} seed={2} t={T} />
    <Dome cx={980} by={760} rx={170} ry={150} seed={3} t={T} />
    <Tube x1={740} x2={1140} y={650} r={30} />
    {/* a passing sub-pod in the tunnel */}
    <Svg><g transform="translate(930 650)"><rect x={-60} y={-20} width={120} height={40} rx={20} fill={C.gold} stroke={OUT} strokeWidth={5} /><circle cx={30} cy={0} r={10} fill={C.cyan} stroke={OUT} strokeWidth={3} /></g></Svg>
    <Fish x={300} y={250} s={0.9} color={C.coral2} />
    <Fish x={380} y={320} s={0.6} color={C.coral2} />
    <Fish x={1300} y={200} s={-0.8} color={C.turq} stripe={C.gold} />
    <Fish x={1660} y={330} s={-0.55} color="#FF5DA2" />
    {/* manta silhouette far away */}
    <Svg><path d="M 760 230 Q 860 170 960 230 Q 900 240 880 280 Q 860 240 760 230 Z" fill="#0E5DAA" opacity={0.7} /></Svg>
    {/* foreground: the hero stands inside a big arched glass tunnel */}
    <Svg>
      <path d="M -40 1000 L -40 640 Q 960 250 1960 640 L 1960 1000 Z" fill="rgba(120,220,255,0.10)" stroke={OUT} strokeWidth={OW + 4} />
      <path d="M 120 560 Q 520 400 820 372" fill="none" stroke="#FFF" strokeWidth={12} strokeLinecap="round" opacity={0.5} />
      <path d="M 1500 470 Q 1700 520 1840 580" fill="none" stroke="#FFF" strokeWidth={8} strokeLinecap="round" opacity={0.35} />
      {[220, 600, 1320, 1700].map((x) => { const top = 640 - (1 - Math.pow((x - 960) / 1000, 2)) * 195; return <line key={x} x1={x} y1={top} x2={x} y2={1000} stroke="#7FD8F5" strokeWidth={8} opacity={0.55} />; })}
      <rect x={-40} y={990} width={2000} height={100} fill="#24476B" stroke={OUT} strokeWidth={OW} />
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={30 + i * 124} y={1006} width={70} height={10} rx={5} fill={C.cyan} />)}
    </Svg>
    <Coral x={130} y={995} s={1.3} seed={4} />
    <SeaFan x={1790} y={995} s={1.2} />
    <GlowPlant x={1640} y={995} s={1.2} t={T} seed={5} />
    <Kelp x={300} y={995} h={260} t={T} seed={4} />
    <Bubbles t={T} n={30} />
    <Hero pose="01_pointing" cx={930} bottom={1000} h={520} light="rgba(92,242,255,0.55)" />
    <ComicText x={60} y={50} w={900} size={92} color="#FFF" align="left" rot={-2}><span style={{ color: C.cyan }}>WORLD A:</span> THE OCEAN</ComicText>
    <Subtitle text="Imagine living in a glass city at the bottom of the sea." y={1016} />
  </AbsoluteFill>
);

/* ---------- 3. MOON: inside the moon base, Earth in the window ---------- */
export const Preview3: React.FC = () => (
  <AbsoluteFill style={{ background: "#2A2E36" }}>
    {/* the view through the big window */}
    <AbsoluteFill style={{ clipPath: "inset(110px 120px 330px 120px round 70px)" }}>
      <SpaceSky t={T} />
      <EarthDisc cx={1300} cy={330} r={170} t={T} />
      <MoonGround y={560} />
      <Module x={260} y={640} w={340} h={120} t={T} />
      <Module x={600} y={650} w={180} h={130} t={T} dome />
      <Antenna x={190} y={640} t={T} />
      <Rover x={1560} y={700} s={0.8} />
      <Svg><path d="M 1560 700 C 1450 730 1250 720 1100 760" fill="none" stroke="#4A3B30" strokeWidth={6} strokeDasharray="14 10" /></Svg>
      <Dust t={T} n={30} />
    </AbsoluteFill>
    {/* window frame + interior */}
    <Svg>
      <defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3A3F4A" /><stop offset="100%" stopColor="#23262D" /></linearGradient></defs>
      <path fillRule="evenodd" d="M 0 0 H 1920 V 1080 H 0 Z M 190 110 H 1730 Q 1800 110 1800 180 V 680 Q 1800 750 1730 750 H 190 Q 120 750 120 680 V 180 Q 120 110 190 110 Z" fill="url(#wall)" />
      <rect x={120} y={110} width={1680} height={640} rx={70} fill="none" stroke={OUT} strokeWidth={OW + 10} />
      <rect x={132} y={122} width={1656} height={616} rx={62} fill="none" stroke="#8D8A85" strokeWidth={10} />
      <line x1={960} y1={110} x2={960} y2={750} stroke={OUT} strokeWidth={22} /><line x1={960} y1={110} x2={960} y2={750} stroke="#8D8A85" strokeWidth={10} />
      <path d="M 1010 170 L 1180 170 M 1010 200 L 1090 200" stroke="#FFF" strokeWidth={10} strokeLinecap="round" opacity={0.25} />
      {/* amber light strip + panels */}
      <rect x={0} y={40} width={1920} height={24} fill={C.amber} stroke={OUT} strokeWidth={5} />
      <rect x={0} y={34} width={1920} height={40} fill={C.amber} opacity={0.25} />
      <rect x={-20} y={790} width={1960} height={320} fill="#3A3F4A" stroke={OUT} strokeWidth={OW} />
      <rect x={-20} y={790} width={1960} height={18} fill={C.orange} stroke={OUT} strokeWidth={4} />
      {/* console left */}
      <rect x={90} y={830} width={460} height={200} rx={26} fill="#4E535E" stroke={OUT} strokeWidth={OW} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={120 + i * 105} y={860} width={80} height={56} rx={10} fill={i % 2 ? C.orange : C.gold} stroke={OUT} strokeWidth={4} />)}
      {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={140 + i * 70} cy={965} r={16} fill={i === 2 ? "#FF3B3B" : "#9AD8FF"} stroke={OUT} strokeWidth={4} />)}
      {/* plant pod right (life support) */}
      <rect x={1460} y={820} width={360} height={210} rx={30} fill="#4E535E" stroke={OUT} strokeWidth={OW} />
      <rect x={1490} y={850} width={300} height={120} rx={20} fill="rgba(154,216,255,0.25)" stroke={OUT} strokeWidth={5} />
      {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M ${1520 + i * 60} 965 q -14 -40 0 -78 q 14 38 0 78`} fill="#3DDC84" stroke={OUT} strokeWidth={4} />)}
      <rect x={1490} y={850} width={300} height={14} fill={C.amber} opacity={0.8} />
    </Svg>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(255,181,71,0.25), rgba(0,0,0,0) 60%)" }} />
    <Hero pose="01_pointing" cx={1000} bottom={1060} h={560} light="rgba(255,181,71,0.45)" />
    <ComicText x={190} y={160} w={760} size={84} color="#FFF" align="left" rot={-2}><span style={{ color: C.orange }}>WORLD B:</span> THE MOON</ComicText>
    <Subtitle text="And every night, you look up... at Earth." y={1004} />
  </AbsoluteFill>
);

/* ---------- 4. CHOICE SCREEN ---------- */
const Card: React.FC<{ x: number; side: "A" | "B"; title: string; children: React.ReactNode }> = ({ x, side, title, children }) => {
  const col = side === "A" ? "#1E9BFF" : C.orange, dark = side === "A" ? "#0A2E5C" : "#6B2A00";
  return (
    <div style={{ position: "absolute", left: x, top: 300, width: 640, height: 600, rotate: side === "A" ? "-2deg" : "2deg" }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 40, background: col, border: `${OW + 4}px solid ${OUT}`, boxShadow: `0 14px 0 ${OUT}, 0 0 60px ${col}` }} />
      <div style={{ position: "absolute", left: 26, top: 26, width: 588, height: 380, borderRadius: 26, overflow: "hidden", border: `${OW}px solid ${OUT}`, background: dark }}>
        <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, transform: "scale(0.3063)", transformOrigin: "0 0" }}>{children}</div>
      </div>
      <div style={{ position: "absolute", left: -46, top: -56, width: 140, height: 140, borderRadius: 999, background: "#FFF", border: `${OW + 4}px solid ${OUT}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.comic, fontSize: 104, color: col, WebkitTextStroke: `6px ${OUT}`, paintOrder: "stroke fill", boxShadow: `0 8px 0 ${OUT}` }}>{side}</div>
      <div style={{ position: "absolute", left: 30, top: 420, width: 580, textAlign: "center", fontFamily: FONT.ui, fontWeight: 900, fontSize: 50, lineHeight: 1.08, color: "#FFF", WebkitTextStroke: `9px ${OUT}`, paintOrder: "stroke fill" }}>{title}</div>
    </div>
  );
};
export const Preview4: React.FC = () => (
  <AbsoluteFill>
    {/* split background: blue left, orange right, halftone dots */}
    <AbsoluteFill style={{ background: "linear-gradient(100deg, #0A4A8C 0%, #0E6FD0 46%, #FF8A1F 54%, #B84A00 100%)" }} />
    <AbsoluteFill style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.13) 3px, transparent 3.5px)", backgroundSize: "26px 26px" }} />
    <Svg>{Array.from({ length: 36 }, (_, i) => { const a = (i / 36) * Math.PI * 2; return <polygon key={i} points={`960,560 ${960 + Math.cos(a) * 1500},${560 + Math.sin(a) * 1500} ${960 + Math.cos(a + 0.06) * 1500},${560 + Math.sin(a + 0.06) * 1500}`} fill="#FFF" opacity={0.07} />; })}</Svg>
    <Card x={110} side="A" title="LIVE IN A LUXURY UNDERWATER CITY">
      <OceanWater t={T} /><Seabed y={800} /><Dome cx={560} by={830} rx={420} ry={420} seed={1} t={T} /><Dome cx={1450} by={810} rx={420} ry={380} seed={2} t={T} />
      <Tube x1={950} x2={1080} y={640} r={40} /><Fish x={1000} y={260} s={1.3} color={C.coral2} /><Coral x={200} y={1000} s={1.6} /><Bubbles t={T} n={24} />
    </Card>
    <Card x={1170} side="B" title="LIVE IN A LUXURY MOON BASE">
      <SpaceSky t={T} /><EarthDisc cx={1400} cy={300} r={210} t={T} /><MoonGround y={640} />
      <Module x={260} y={820} w={620} h={200} t={T} /><Module x={880} y={830} w={360} h={260} t={T} dome /><Antenna x={160} y={820} t={T} /><Rover x={1550} y={900} s={1.4} />
    </Card>
    {/* round header */}
    <div style={{ position: "absolute", left: 760, top: 34, width: 400, height: 84, borderRadius: 999, background: C.gold, border: `${OW + 2}px solid ${OUT}`, boxShadow: `0 8px 0 ${OUT}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT.comic, fontSize: 64, color: OUT, letterSpacing: 3 }}>ROUND 1</div>
    <ComicText x={0} y={134} w={1920} size={92} color="#FFF" stroke={13}>WHERE WOULD YOU LIVE?</ComicText>
    {/* countdown timer */}
    <Svg>
      <circle cx={960} cy={420} r={96} fill="#FFF" stroke={OUT} strokeWidth={OW + 4} />
      <circle cx={960} cy={420} r={78} fill="none" stroke="#E5E7EB" strokeWidth={18} />
      <circle cx={960} cy={420} r={78} fill="none" stroke="#E63946" strokeWidth={18} strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 78} ${2 * Math.PI * 78}`} strokeDashoffset={0} transform="rotate(-90 960 420)" />
    </Svg>
    <div style={{ position: "absolute", left: 860, top: 352, width: 200, textAlign: "center", fontFamily: FONT.comic, fontSize: 130, lineHeight: 1, color: OUT }}>7</div>
    <ComicText x={720} y={252} w={480} size={44} color="#FFF" stroke={8}>CHOOSE NOW!</ComicText>
    {/* VS burst behind the hero */}
    <Svg><polygon points={Array.from({ length: 24 }, (_, i) => { const a = (i / 24) * Math.PI * 2, r = i % 2 ? 120 : 170; return `${960 + Math.cos(a) * r},${700 + Math.sin(a) * r}`; }).join(" ")} fill={C.gold} stroke={OUT} strokeWidth={OW + 2} /></Svg>
    <Hero pose="02_thinking" cx={960} bottom={1070} h={560} />
    <ComicText x={150} y={955} w={560} size={60} color="#BFE6FF" stroke={11}>WORLD A · OCEAN</ComicText>
    <ComicText x={1210} y={955} w={560} size={60} color="#FFD7A8" stroke={11}>WORLD B · MOON</ComicText>
  </AbsoluteFill>
);

/* ---------- 5. DANGER REVEAL (Round 2, World A) + HUD ---------- */
export const Preview5: React.FC = () => (
  <AbsoluteFill>
    <OceanWater t={T} dark />
    <DeepCreature x={1600} y={360} s={1.55} t={T} />
    <Bubbles t={T} n={18} />
    {/* glass tunnel the hero stands in */}
    <Svg>
      <path d="M -40 1000 L -40 640 Q 960 250 1960 640 L 1960 1000 Z" fill="rgba(120,220,255,0.08)" stroke={OUT} strokeWidth={OW + 4} />
      <path d="M 120 560 Q 520 400 820 372" fill="none" stroke="#FFF" strokeWidth={12} strokeLinecap="round" opacity={0.4} />
      {[220, 600, 1320, 1700].map((x) => { const top = 640 - (1 - Math.pow((x - 960) / 1000, 2)) * 195; return <line key={x} x1={x} y1={top} x2={x} y2={1000} stroke="#7FD8F5" strokeWidth={8} opacity={0.45} />; })}
      {/* red warning beacons on the ribs */}
      {[220, 1700].map((x) => { const top = 640 - (1 - Math.pow((x - 960) / 1000, 2)) * 195; return <g key={x}><circle cx={x} cy={top + 30} r={46} fill="#FF3B3B" opacity={0.35} /><circle cx={x} cy={top + 30} r={18} fill="#FF5A5A" stroke={OUT} strokeWidth={5} /></g>; })}
      <rect x={-40} y={990} width={2000} height={100} fill="#24476B" stroke={OUT} strokeWidth={OW} />
      {Array.from({ length: 16 }, (_, i) => <rect key={i} x={30 + i * 124} y={1006} width={70} height={10} rx={5} fill="#FF5A5A" />)}
    </Svg>
    {/* red alert wash + vignette */}
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 55%, rgba(255,40,40,0) 35%, rgba(255,30,30,0.32) 100%)" }} />
    <Hero pose="07_scared" cx={930} bottom={1000} h={470} light="rgba(255,90,90,0.5)" />
    <Hud bpm={148} survival={34} />
    <div style={{ position: "absolute", right: 60, top: 40, padding: "6px 34px", borderRadius: 999, background: "#FF3B3B", border: `${OW + 2}px solid ${OUT}`, boxShadow: `0 8px 0 ${OUT}`, fontFamily: FONT.comic, fontSize: 54, color: "#FFF", letterSpacing: 3, WebkitTextStroke: `6px ${OUT}`, paintOrder: "stroke fill" }}>ROUND 2</div>
    <ComicText x={700} y={136} w={1160} size={96} color={C.gold} align="right" rot={-2} stroke={14}>YOUR BIGGEST DANGER!</ComicText>
    <Subtitle text="A gigantic unknown creature is approaching your glass tunnel." y={1016} />
  </AbsoluteFill>
);
