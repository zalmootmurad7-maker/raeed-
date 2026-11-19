import React from "react";
import { ACCENT, LIGHT } from "../tokens";

// Ink-style planet: flat fill, optional bands / split / glow / egg stretch / facets, thick ink outline. Steady (no boil).
export type PlanetLook = {
  fill: string; bands?: string[]; split?: [string, string]; glow?: string; rim?: string; egg?: number;
  facets?: boolean; highlight?: boolean; ink?: string; craters?: boolean;
};
export const Planet: React.FC<{ size: number; look: PlanetLook; style?: React.CSSProperties; id?: string }> = ({ size, look, style, id = "p" }) => {
  const ink = look.ink ?? LIGHT.ink;
  const sx = look.egg ?? 1;
  const cid = `clip-${id}-${size}`;
  return (
    <svg viewBox="-60 -60 120 120" width={size} height={size} style={{ overflow: "visible", ...style }}>
      <defs>
        <clipPath id={cid}><ellipse cx="0" cy="0" rx={44 * sx} ry={44} /></clipPath>
        {look.glow ? <radialGradient id={`${cid}-g`}><stop offset="55%" stopColor={look.glow} stopOpacity="0.55" /><stop offset="100%" stopColor={look.glow} stopOpacity="0" /></radialGradient> : null}
      </defs>
      {look.glow ? <ellipse cx="0" cy="0" rx={58 * sx} ry={58} fill={`url(#${cid}-g)`} /> : null}
      <ellipse cx="0" cy="0" rx={44 * sx} ry={44} fill={look.fill} />
      <g clipPath={`url(#${cid})`}>
        {look.split ? <><rect x={-60} y={-60} width={60} height={120} fill={look.split[0]} /><rect x={0} y={-60} width={60} height={120} fill={look.split[1]} /></> : null}
        {(look.bands ?? []).map((c, i) => <rect key={i} x={-60} y={-34 + i * 17} width={120} height={8} fill={c} opacity={0.85} />)}
        {look.craters ? [[-14, -10, 8], [12, 8, 6], [-4, 18, 5], [16, -16, 4]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill="none" stroke={ink} strokeWidth="2.5" opacity="0.55" />) : null}
        {look.facets ? <path d="M-44 0 L-14 -40 L14 -40 L44 0 L14 40 L-14 40 Z M-14 -40 L0 0 L14 -40 M-44 0 L0 0 L44 0 M-14 40 L0 0 L14 40" fill="none" stroke={ink} strokeWidth="2.5" opacity="0.7" /> : null}
        {look.highlight !== false ? <ellipse cx={-16 * sx} cy={-18} rx={10 * sx} ry={6} fill="#FFFFFF" opacity="0.35" transform="rotate(-30)" /> : null}
      </g>
      {look.rim ? <ellipse cx="0" cy="0" rx={44 * sx} ry={44} fill="none" stroke={look.rim} strokeWidth="6" opacity="0.9" /> : null}
      <ellipse cx="0" cy="0" rx={44 * sx} ry={44} fill="none" stroke={ink} strokeWidth="4.5" />
    </svg>
  );
};

// The ten worlds (same look everywhere: board cards, chapter shots).
export const LOOKS: Record<number, PlanetLook> = {
  1: { fill: "#1D4ED8", bands: ["#3B82F6", "#1E40AF", "#60A5FA", "#1E3A8A"] },
  2: { fill: "#0B0D12", rim: ACCENT.red, highlight: false },
  3: { fill: "#334155", split: [ACCENT.amber, "#334155"] },
  4: { fill: "#FEF3C7", glow: "#93C5FD", bands: ["#FDE68A", "#FFFFFF"] },
  5: { fill: "#111827", egg: 1.45, rim: "#7F1D1D", highlight: false },
  6: { fill: "#92400E", craters: true },
  7: { fill: "#DBEAFE", facets: true, glow: "#93C5FD" },
  8: { fill: "#7F1D1D", glow: ACCENT.red, bands: ["#991B1B", "#B91C1C"] },
  9: { fill: "#D6B88A", bands: ["#B08A5A", "#E7D3B0", "#A47C4C", "#E7D3B0"] },
  10: { fill: "#C2410C", bands: ["#EA580C", "#9A3412", "#FB923C"] },
};
