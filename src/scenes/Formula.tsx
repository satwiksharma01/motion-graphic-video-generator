import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, glowText } from "../lib/colors";
import { fontFamily } from "../lib/fonts";

export const Formula: React.FC<{
  title?: string;
  equation: string;
  variables?: Record<string, string>;
}> = ({ title, equation, variables = {} }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const varsEntries = Object.entries(variables);

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        color: COLORS.textPrimary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div 
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "90%",
          gap: 60,
        }}
      >
        {/* Title */}
        {title && (
          <h2
            style={{
              fontSize: 54,
              fontWeight: 800,
              color: COLORS.textSecondary,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              opacity: entrance,
            }}
          >
            {title}
          </h2>
        )}

        {/* The Equation */}
        <div style={{
          padding: "50px 100px",
          background: `rgba(138, 43, 226, 0.05)`,
          border: `2px solid ${COLORS.purple}60`,
          borderRadius: 20,
          boxShadow: `0 0 40px ${COLORS.purpleGlow}`,
          transform: `scale(${entrance})`,
        }}>
          <h1 style={{
            fontSize: 140,
            fontWeight: 900,
            fontFamily: "monospace",
            margin: 0,
            letterSpacing: "0.05em",
            textShadow: glowText(COLORS.purple, "medium"),
          }}>
            {equation}
          </h1>
        </div>

        {/* Variables List */}
        {varsEntries.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px 80px",
            marginTop: 40,
          }}>
            {varsEntries.map(([key, val], idx) => {
              const itemPop = spring({
                frame: frame - (20 + idx * 5),
                fps,
                config: { damping: 12, stiffness: 100 },
              });

              return (
                <div key={key} style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 42,
                  gap: 20,
                  transform: `translateY(${(1 - itemPop) * 50}px)`,
                  opacity: itemPop,
                }}>
                  <span style={{ 
                    fontWeight: 900, 
                    color: COLORS.purple,
                    fontFamily: "monospace",
                  }}>
                    {key}
                  </span>
                  <span style={{ color: COLORS.textSecondary }}>=</span>
                  <span style={{ fontWeight: 600 }}>{val}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
