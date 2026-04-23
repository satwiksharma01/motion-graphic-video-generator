import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/colors";
import { fontFamily } from "../lib/fonts";

export const LowerThirds: React.FC<{
  title: string;
  value: string | number;
}> = ({ title, value }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "flex-start",
        padding: "60px",
        fontFamily,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        background: `linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 80%, transparent 100%)`,
        borderLeft: `8px solid ${COLORS.purple}`,
        padding: "20px 60px 20px 30px",
        transform: `translateX(${(1 - entrance) * -100}%)`,
        opacity: entrance,
      }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{
            fontSize: 24,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: COLORS.textSecondary,
          }}>
            {title}
          </span>
          <span style={{
            fontSize: 48,
            fontWeight: 900,
            color: COLORS.textPrimary,
            textShadow: `0 0 15px ${COLORS.purple}80`,
          }}>
            {value}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
