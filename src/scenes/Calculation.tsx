import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FinancialGraph } from "../components/FinancialGraph";
import { fontFamily } from "../lib/fonts";
import { COLORS, glowText } from "../lib/colors";

export const Calculation: React.FC<{
  amount: number;
  result: number;
  sentiment?: "bullish" | "bearish" | "neutral";
}> = ({ amount, result }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 20 },
    durationInFrames: 2 * fps,
  });

  const currentValue = Math.round(interpolate(progress, [0, 1], [amount, result]));

  // Label entrance - decisive snap
  const labelSlide = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  // Value color and glow
  const color = COLORS.purple;
  const glow = COLORS.purpleGlow;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: COLORS.textPrimary,
        fontFamily,
        backgroundColor: "transparent",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 60 }}>

        {/* Graph background - centralized brand color */}
        <div style={{ 
          position: "absolute", 
          top: "50%", 
          transform: "translateY(-50%)",
          opacity: 0.8 
        }}>
          <FinancialGraph data={[10000, 15000, 22000, 35000, 52000, 78000, 120000, 185000]} color={color} />
        </div>

        {/* Overlay Content */}
        <div style={{ 
          zIndex: 10, 
          textAlign: "center", 
          paddingBottom: 100,
          transform: `translateY(${(1 - labelSlide) * 40}px)`,
          opacity: labelSlide,
        }}>
          <h2
            style={{
              fontSize: 48,
              color: COLORS.textSecondary,
              margin: 0,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.8,
              textShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          >
            Estimated Growth
          </h2>
          <h1
            style={{
              fontSize: 160,
              fontWeight: 900,
              color: COLORS.textPrimary,
              margin: 0,
              letterSpacing: "-0.04em",
              // Signature intense glow
              textShadow: glowText(color, "hard"),
            }}
          >
            ${currentValue.toLocaleString()}
          </h1>

          <div style={{ 
            marginTop: 20, 
            fontSize: 32, 
            fontWeight: 600, 
            color, 
            opacity: progress,
            textTransform: "uppercase",
            letterSpacing: "0.1em"
          }}>
            Institutional Logic Verified
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
