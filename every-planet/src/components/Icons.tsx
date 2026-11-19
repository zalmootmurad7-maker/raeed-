import React from "react";
import { ACCENT, LIGHT } from "../tokens";
import { useBoil } from "./boil";

// Hand-drawn style ink icons (props, not the character). Size = box in px. Stepped line boil.
type P = { size: number; ink?: string; boil?: boolean; seed?: number; style?: React.CSSProperties };
const Wrap: React.FC<P & { vb?: string; children: React.ReactNode }> = ({ size, boil = true, seed = 1, style, vb = "0 0 100 100", children }) => {
  const b = useBoil(seed, 1.2, 0.6);
  return (
    <svg viewBox={vb} width={size} height={size} style={{ overflow: "visible", translate: boil ? `${b.x}px ${b.y}px` : undefined, rotate: boil ? `${b.r}deg` : undefined, ...style }}>
      {children}
    </svg>
  );
};
const S = (ink: string, w = 4) => ({ stroke: ink, strokeWidth: w, strokeLinecap: "round" as const, strokeLinejoin: "round" as const });

export const Icon_Atom: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  return (
    <Wrap {...p}>
      {[0, 60, 120].map((a) => (
        <ellipse key={a} cx="50" cy="50" rx="44" ry="16" fill="none" {...S(ink, 4)} transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="46" cy="47" r="7" fill={ACCENT.red} {...S(ink, 3)} />
      <circle cx="55" cy="54" r="7" fill={ACCENT.blue} {...S(ink, 3)} />
    </Wrap>
  );
};

export const Icon_BlackHole_Small: React.FC<P & { glow?: boolean }> = (p) => (
  <Wrap {...p}>
    {p.glow !== false ? <circle cx="50" cy="50" r="40" fill={ACCENT.amber} opacity="0.25" /> : null}
    <circle cx="50" cy="50" r="30" fill="#05070C" {...S(ACCENT.amber, 5)} />
  </Wrap>
);

export const Icon_BlackHole_Accretion: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  return (
    <Wrap {...p}>
      <ellipse cx="50" cy="52" rx="48" ry="15" fill="none" stroke={ACCENT.amber} strokeWidth="9" opacity="0.9" />
      <circle cx="50" cy="50" r="24" fill="#05070C" {...S(ink, 4)} />
      <path d="M 2 52 A 48 15 0 0 0 98 52" fill="none" stroke={ACCENT.amber} strokeWidth="9" />
      <path d="M 2 52 A 48 15 0 0 0 98 52" fill="none" {...S(ink, 3)} />
    </Wrap>
  );
};

export const Icon_Star_Blue: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  return (
    <Wrap {...p}>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return <line key={i} x1={50 + Math.cos(a) * 36} y1={50 + Math.sin(a) * 36} x2={50 + Math.cos(a) * 47} y2={50 + Math.sin(a) * 47} {...S(ink, 4)} />;
      })}
      <circle cx="50" cy="50" r="29" fill={ACCENT.blue} {...S(ink, 4)} />
      <circle cx="41" cy="41" r="8" fill="#FFFFFF" opacity="0.5" />
    </Wrap>
  );
};

export const Icon_CrossedStar: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  return (
    <Wrap {...p}>
      <path d="M50 8 L61 38 L93 38 L67 57 L77 89 L50 70 L23 89 L33 57 L7 38 L39 38 Z" fill={ACCENT.amber} {...S(ink, 4)} />
      <line x1="10" y1="90" x2="90" y2="10" stroke={ACCENT.red} strokeWidth="9" strokeLinecap="round" />
    </Wrap>
  );
};

export const Icon_Galaxy: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  const arm = (rot: number) => {
    const pts: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40, a = t * Math.PI * 2.2 + rot, r = 6 + t * 40;
      pts.push(`${50 + Math.cos(a) * r},${50 + Math.sin(a) * r * 0.62}`);
    }
    return <polyline points={pts.join(" ")} fill="none" {...S(ink, 4)} />;
  };
  return (
    <Wrap {...p}>
      {arm(0)}
      {arm(Math.PI)}
      <circle cx="50" cy="50" r="9" fill={ACCENT.amber} {...S(ink, 3)} />
    </Wrap>
  );
};

export const Icon_SolarSystem: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  return (
    <Wrap {...p}>
      <circle cx="50" cy="50" r="44" fill="none" {...S(ink, 3)} strokeDasharray="2 7" />
      <circle cx="50" cy="50" r="28" fill="none" {...S(ink, 3)} />
      <circle cx="50" cy="50" r="11" fill={ACCENT.amber} {...S(ink, 3)} />
      <circle cx="78" cy="50" r="5" fill={ACCENT.blue} {...S(ink, 2)} />
      <circle cx="19" cy="31" r="5" fill={ACCENT.red} {...S(ink, 2)} />
    </Wrap>
  );
};

export const Icon_Lightning_PlusMinus: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  return (
    <Wrap {...p}>
      <path d="M56 6 L28 54 L48 54 L40 94 L72 40 L52 40 Z" fill={ACCENT.amber} {...S(ink, 4)} />
      <path d="M8 18 h16 M16 10 v16" {...S(ACCENT.red, 6)} />
      <path d="M78 80 h16" {...S(ACCENT.blue, 6)} />
    </Wrap>
  );
};

export const Icon_Mountain: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  return (
    <Wrap {...p}>
      <path d="M4 88 L40 22 L58 52 L68 38 L96 88 Z" fill="#9AA3B2" {...S(ink, 4)} />
      <path d="M40 22 L30 41 L37 37 L42 44 L49 36 Z" fill="#FFFFFF" {...S(ink, 3)} />
    </Wrap>
  );
};

export const Icon_Spin: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  return (
    <Wrap {...p}>
      <circle cx="50" cy="50" r="22" fill="#05070C" {...S(ink, 4)} />
      <path d="M 12 50 A 38 20 0 0 1 88 50" fill="none" {...S(ACCENT.blue, 6)} />
      <path d="M 82 40 L 89 50 L 77 54" fill="none" {...S(ACCENT.blue, 6)} />
      <path d="M 88 56 A 38 20 0 0 1 12 56" fill="none" {...S(ink, 4)} strokeDasharray="3 8" />
    </Wrap>
  );
};

export const Icon_Ring_Huge: React.FC<P> = (p) => {
  const ink = p.ink ?? LIGHT.ink;
  return (
    <Wrap {...p}>
      <circle cx="50" cy="50" r="44" fill="none" stroke={ACCENT.amber} strokeWidth="10" />
      <circle cx="50" cy="50" r="36" fill="#05070C" {...S(ink, 4)} />
      <circle cx="50" cy="50" r="3" fill={ACCENT.amber} />
    </Wrap>
  );
};
