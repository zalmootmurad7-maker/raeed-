import React from "react";
import { C, LIGHT } from "../lib/core";

// The 8 threat icons (vector, thick ink, flat colours). `t` = seconds, for continuous gentle motion (never jitter).
const INK = LIGHT.ink;
type P = { size: number; t?: number };

export const IconCosmicRay: React.FC<P> = ({ size, t = 0 }) => {
  const ph = (t * 0.9) % 1;
  return (
    <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible" }}>
      <path d="M -40 -46 L 4 4" stroke={C.blue} strokeWidth="6" strokeLinecap="round" opacity="0.35" />
      {[-26, 0, 26].map((a, i) => <path key={i} d={`M 4 4 L ${4 + Math.sin((a * Math.PI) / 180) * 40} ${4 + Math.cos((a * Math.PI) / 180) * 40}`} stroke={C.blue} strokeWidth="5" strokeLinecap="round" strokeDasharray="6 7" strokeDashoffset={-ph * 26} />)}
      <circle cx={-40 + 44 * ph} cy={-46 + 50 * ph} r="9" fill="#93C5FD" stroke={INK} strokeWidth="4" />
      <circle cx="4" cy="4" r="7" fill={C.blue} stroke={INK} strokeWidth="4" />
    </svg>
  );
};
export const IconBlackHole: React.FC<P> = ({ size, t = 0 }) => (
  <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible" }}>
    <ellipse cx="0" cy="0" rx="46" ry="46" fill="none" stroke="#93C5FD" strokeWidth="5" opacity="0.6" strokeDasharray="14 10" transform={`rotate(${t * 20})`} />
    <circle cx="0" cy="0" r="34" fill="#F6F4EF" stroke={INK} strokeWidth="4" />
    <circle cx="0" cy="0" r="24" fill="#05070C" stroke={INK} strokeWidth="4" />
  </svg>
);
export const IconAsteroid: React.FC<P> = ({ size, t = 0 }) => (
  <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible" }}>
    <path d="M 18 18 L 52 52" stroke={C.amber} strokeWidth="14" strokeLinecap="round" opacity="0.5" />
    <g transform={`rotate(${t * 18})`}>
      <path d="M -30 -10 L -18 -32 L 8 -34 L 30 -18 L 34 8 L 18 30 L -8 32 L -30 16 Z" fill="#9CA3AF" stroke={INK} strokeWidth="5" strokeLinejoin="round" />
      <circle cx="-8" cy="-12" r="7" fill="none" stroke={INK} strokeWidth="3.5" />
      <circle cx="12" cy="10" r="5" fill="none" stroke={INK} strokeWidth="3.5" />
    </g>
  </svg>
);
export const IconSun: React.FC<P> = ({ size, t = 0 }) => (
  <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible" }}>
    <circle cx="-10" cy="4" r="30" fill={C.amber} stroke={INK} strokeWidth="4" />
    <path d={`M 14 -16 Q 40 -40 ${44 + 4 * Math.sin(t * 2)} ${-6}`} fill="none" stroke={C.red} strokeWidth="7" strokeLinecap="round" />
    <ellipse cx="44" cy="-4" rx="11" ry="15" fill="#FDBA74" stroke={INK} strokeWidth="4" />
  </svg>
);
export const IconSupernova: React.FC<P> = ({ size, t = 0 }) => {
  const k = 1 + 0.06 * Math.sin(t * 3);
  return (
    <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible" }}>
      <g transform={`scale(${k})`}>
        {Array.from({ length: 12 }, (_, i) => { const a = (i / 12) * Math.PI * 2; const L = i % 2 ? 50 : 38; return <path key={i} d={`M ${Math.cos(a - 0.12) * 18} ${Math.sin(a - 0.12) * 18} L ${Math.cos(a) * L} ${Math.sin(a) * L} L ${Math.cos(a + 0.12) * 18} ${Math.sin(a + 0.12) * 18} Z`} fill={i % 2 ? C.red : C.amber} stroke={INK} strokeWidth="3" strokeLinejoin="round" />; })}
      </g>
      <circle cx="0" cy="0" r="18" fill="#FFF7D6" stroke={INK} strokeWidth="4" />
    </svg>
  );
};
export const IconMagnetar: React.FC<P> = ({ size, t = 0 }) => (
  <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible" }}>
    <g transform={`rotate(${t * 40})`}>
      {[22, 34, 46].map((w, i) => <ellipse key={i} cx="0" cy="0" rx={w * 0.55} ry={w} fill="none" stroke={C.blue} strokeWidth="4.5" opacity={0.9 - i * 0.2} />)}
    </g>
    <circle cx="0" cy="0" r="13" fill="#DBEAFE" stroke={INK} strokeWidth="4" />
  </svg>
);
export const IconGRB: React.FC<P> = ({ size, t = 0 }) => {
  const k = 0.75 + 0.25 * Math.sin(t * 4);
  return (
    <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible" }}>
      <path d={`M 0 0 L ${-52} ${-52 * k}`} stroke={C.blue} strokeWidth="8" strokeLinecap="round" />
      <path d={`M 0 0 L ${52} ${52 * k}`} stroke={C.red} strokeWidth="8" strokeLinecap="round" />
      <circle cx="0" cy="0" r="14" fill="#FEF3C7" stroke={INK} strokeWidth="4" />
    </svg>
  );
};
export const IconVacuum: React.FC<P & { reveal?: boolean }> = ({ size, t = 0, reveal }) => (
  <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible" }}>
    <circle cx="0" cy="0" r={reveal ? 40 : 42} fill={reveal ? "#0E131F" : "none"} stroke={C.red} strokeWidth="6" strokeDasharray={reveal ? "0" : "12 9"} transform={`rotate(${t * 25})`} />
    {reveal ? null : <text x="0" y="14" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="40" fill={C.red}>???</text>}
  </svg>
);

export const THREATS = [
  { n: 1, name: "COSMIC RAYS", Icon: IconCosmicRay },
  { n: 2, name: "ROGUE BLACK HOLE", Icon: IconBlackHole },
  { n: 3, name: "ASTEROID IMPACT", Icon: IconAsteroid },
  { n: 4, name: "SOLAR SUPERSTORM", Icon: IconSun },
  { n: 5, name: "NEARBY SUPERNOVA", Icon: IconSupernova },
  { n: 6, name: "MAGNETAR STARQUAKE", Icon: IconMagnetar },
  { n: 7, name: "GAMMA-RAY BURST", Icon: IconGRB },
  { n: 8, name: "???", Icon: IconVacuum },
] as const;
