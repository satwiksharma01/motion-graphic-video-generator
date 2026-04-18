import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { FinancialGraph } from "../components/FinancialGraph";
import { fontFamily } from "../lib/fonts";

export const Calculation: React.FC<{
  amount: number;
  result: number;
}> = ({ amount, result }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 200 },
    durationInFrames: 2 * fps,
  });

  const currentValue = Math.round(interpolate(progress, [0, 1], [amount, result]));

  // Label entrance
  const labelSlide = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 80 },
  });

  // Value glow pulse
  const glowIntensity = interpolate(progress, [0, 0.5, 1], [0, 0.3, 0.6]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily,
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>

        {/* Graph */}
        <div style={{ position: "absolute", top: "45%", transform: "translateY(-50%)" }}>
          <FinancialGraph data={[10000, 11449, 13108, 20000, 30000, 45000, 60000, 76122]} />
        </div>

        {/* Overlay Counters */}
        <div style={{ zIndex: 10, textAlign: "center", marginTop: -200 }}>
          <h2
            style={{
              fontSize: 50,
              color: "#9ca3af",
              margin: 0,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: labelSlide,
              transform: `translateY(${(1 - labelSlide) * 20}px)`,
            }}
          >
            Compound Growth
          </h2>
          <h1
            style={{
              fontSize: 130,
              fontWeight: 900,
              color: "#fff",
              margin: 0,
              textShadow: `0px 0px ${30 + glowIntensity * 40}px rgba(6, 182, 212, ${glowIntensity}), 0px 10px 30px rgba(0,0,0,0.5)`,
            }}
          >
            ${currentValue.toLocaleString()}
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};
