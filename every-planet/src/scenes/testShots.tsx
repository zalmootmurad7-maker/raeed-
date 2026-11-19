import React from "react";
import { Appear, CardShot, Stamp, Txt, ink, muted, ramp, useShot } from "../components/kit";
import { LOOKS, Planet } from "../components/Planet";
import { ACCENT, FONT, SPACE } from "../tokens";

const L = ink("light"), LM = muted("light"), T = SPACE.text, M = muted("space");

// Ch.1 HD 189733 b — the calm-looking blue marble (Light Canvas, explaining).
export const Shot04: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="light" pose="explaining" pill="01 · HD 189733 b" push={0.03}>
      <Txt x={56} y={118} size={76} color={L} w={600}>A CALM BLUE MARBLE?</Txt>
      <Appear at={at(0.1)}><div style={{ position: "absolute", left: 650, top: 110 }}><Planet size={470} look={LOOKS[1]} id="s04" /></div></Appear>
      <Appear at={at(0.25)} kind="rise"><div style={{ position: "absolute", left: 58, top: 330, whiteSpace: "nowrap", background: ACCENT.blue, color: "#FFF", fontFamily: FONT.mono, fontWeight: 700, fontSize: 46, padding: "10px 22px", borderRadius: 999 }}>63 LIGHT-YEARS</div></Appear>
      <Appear at={at(0.4)} kind="rise"><Txt x={58} y={470} size={40} color={LM} font="body" w={560}>Deep cobalt blue... but that blue isn&apos;t water.</Txt></Appear>
    </CardShot>
  );
};

// Ch.4 KELT-9b — thermometer comparison (Space Mode, shocked).
const Thermo: React.FC<{ x: number; label: string; sub: string; kelvin: number; color: string; at: number }> = ({ x, label, sub, kelvin, color, at }) => {
  const { f } = useShot();
  const H = 360, top = 150, max = 5000;
  const fill = ramp(f, at, at + 24, 0, kelvin / max);
  return (
    <div style={{ position: "absolute", left: x, top: 0, width: 300, height: 686 }}>
      <div style={{ position: "absolute", left: 120, top, width: 60, height: H, borderRadius: 30, border: `5px solid ${SPACE.border}`, background: "#0B1020", overflow: "hidden", boxSizing: "border-box" }}>
        <div style={{ position: "absolute", left: 0, bottom: 0, width: "100%", height: `${fill * 100}%`, background: color }} />
      </div>
      <div style={{ position: "absolute", left: 105, top: top + H - 22, width: 90, height: 90, borderRadius: 99, background: color, border: `5px solid ${SPACE.border}`, boxSizing: "border-box" }} />
      <div style={{ position: "absolute", left: 0, width: 300, top: 22, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 48, color }}>{Math.round((fill * max) / 10) * 10 > 0 ? `${(Math.round((fill * max) / 100) * 100).toLocaleString("en-US")} K` : ""}</div>
      <div style={{ position: "absolute", left: 0, width: 300, top: top + H + 86, textAlign: "center", fontFamily: FONT.head, fontWeight: 700, fontSize: 34, color: T, lineHeight: 1.05 }}>{label}</div>
      <div style={{ position: "absolute", left: 0, width: 300, top: top + H + 128, textAlign: "center", fontFamily: FONT.body, fontWeight: 600, fontSize: 26, color: M }}>{sub}</div>
    </div>
  );
};
export const Shot15: React.FC = () => {
  const { at } = useShot();
  return (
    <CardShot mode="space" pose="shocked" pill="04 · KELT-9b" push={0.02}>
      <Txt x={56} y={96} size={52} color={T} w={420}>HOTTER THAN A STAR?</Txt>
      <Thermo x={470} label="RED DWARF" sub="star · ~3,500 K" kelvin={3500} color="#F87171" at={at(0.15)} />
      <Thermo x={800} label="KELT-9b" sub="planet · dayside" kelvin={4600} color={ACCENT.amber} at={at(0.3)} />
      <Appear at={at(0.6)} kind="rise"><Txt x={56} y={300} size={46} color={ACCENT.amber} font="mono" w={420}>≈ 7,800°F</Txt></Appear>
      <Stamp x={60} y={420} at={at(0.7)} text="PLANET WINS" size={44} rot={-5} />
    </CardShot>
  );
};

// Ch.10 Halla — Baekdu should have swelled to 1.5× Halla's orbit (Space Mode, shocked).
export const Shot34: React.FC = () => {
  const { f, at } = useShot();
  const cx = 820, cy = 360, orbit = 150;
  const swell = ramp(f, at(0.1), at(0.45), 70, orbit * 1.5, (t) => t);
  const a = -0.9;
  return (
    <CardShot mode="space" pose="shocked" pill="10 · 8 UMi b / Halla" pillColor={ACCENT.red} push={0.02}>
      <div style={{ position: "absolute", left: cx - swell, top: cy - swell, width: 2 * swell, height: 2 * swell, borderRadius: 999, background: "radial-gradient(circle, #FCA5A5 0%, #E53935 55%, #991B1B 100%)", opacity: 0.85, boxShadow: "0 0 50px 10px rgba(229,57,53,0.45)" }} />
      <div style={{ position: "absolute", left: cx - 70, top: cy - 70, width: 140, height: 140, borderRadius: 999, background: "radial-gradient(circle, #FED7AA, #EA580C)", border: `5px solid ${SPACE.border}`, boxSizing: "border-box" }} />
      <svg style={{ position: "absolute", left: cx - orbit, top: cy - orbit, overflow: "visible" }} width={2 * orbit} height={2 * orbit}>
        <circle cx={orbit} cy={orbit} r={orbit} fill="none" stroke="#FFFFFF" strokeWidth="5" strokeDasharray="14 10" />
      </svg>
      <div style={{ position: "absolute", left: cx + Math.cos(a) * orbit - 26, top: cy + Math.sin(a) * orbit - 26 }}><Planet size={52} look={LOOKS[10]} id="halla" /></div>
      <svg style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }} width="1" height="1">
        <line x1={cx + 72} y1={cy + 34} x2={cx + orbit - 4} y2={cy + 34} stroke="#FFF" strokeWidth="4" />
      </svg>
      <div style={{ position: "absolute", left: cx + 70, top: cy + 46, background: "rgba(14,19,31,0.85)", borderRadius: 8, padding: "2px 8px", fontFamily: FONT.mono, fontWeight: 700, fontSize: 24, color: "#FFFFFF", whiteSpace: "nowrap" }}>0.5 AU</div>
      {swell > orbit * 1.45 ? <div style={{ position: "absolute", left: cx - 150, top: cy + 245, width: 300, textAlign: "center", fontFamily: FONT.mono, fontWeight: 700, fontSize: 26, color: "#FECACA", whiteSpace: "nowrap" }}>STAR = 1.5× ORBIT</div> : null}
      <Txt x={56} y={110} size={60} color={T} w={420}>BAEKDU SWELLED…</Txt>
      <Appear at={at(0.45)} kind="slam"><Txt x={56} y={250} size={88} color={ACCENT.red} font="mono" w={420}>1.5×</Txt></Appear>
      <Appear at={at(0.5)} kind="rise"><Txt x={58} y={360} size={36} color={M} font="body" w={400}>Halla&apos;s orbit should have been swallowed.</Txt></Appear>
      <Txt x={cx + Math.cos(a) * orbit - 60} y={cy + Math.sin(a) * orbit - 70} size={30} color={T} w={120} align="center">HALLA</Txt>
    </CardShot>
  );
};
