import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { fontFamily } from "../lib/fonts";
import { COLORS, glowText, type Sentiment } from "../lib/colors";

export const ImpactText: React.FC<{
  text: string;
  glowColor?: string;
  delay?: number;
  fontSize?: number;
  sentiment?: Sentiment;
  mode?: "impact" | "calm";
}> = ({ text, glowColor = COLORS.purple, delay = 0, fontSize = 110, sentiment, mode = "calm" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stage 1: Overshoot snap bounce (very high stiffness) or Calm fade-in
  const scaleBig = spring({
    frame: frame - delay,
    fps,
    config: mode === "impact" 
      ? { damping: 8, stiffness: 180, mass: 1.2 } 
      : { damping: 14, stiffness: 100, mass: 1 },
    from: mode === "impact" ? 0 : 0.8,
    to: 1,
  });

  // Stage 2: White flash on impact, fades to normal
  const flashOpacity = mode === "impact" ? interpolate(
    frame - delay,
    [0, 3, 12],
    [1, 0.8, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  ) : 0;

  // Stage 3: Fade in text
  const opacity = interpolate(frame - delay, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* White impact flash on first frames */}
      <div
        style={{
          position: "absolute",
          inset: "-10px -20px",
          background: "white",
          borderRadius: 8,
          opacity: flashOpacity * 0.15,
          pointerEvents: "none",
        }}
      />

      <h1
        style={{
          fontFamily,
          fontSize,
          fontWeight: 900,
          color: COLORS.textPrimary,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          textAlign: "center",
          margin: 0,
          padding: 0,
          textTransform: "uppercase",
          // The intense multi-layered glow — the signature of the design
          textShadow: glowText(glowColor, "hard"),
          transform: `scale(${scaleBig})`,
          opacity,
          display: "block",
        }}
      >
        {text}
      </h1>
    </div>
  );
};
