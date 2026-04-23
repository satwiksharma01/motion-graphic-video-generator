import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, glowText } from "../lib/colors";
import { fontFamily } from "../lib/fonts";

export const Comparison: React.FC<{
  title?: string;
  itemA: { label: string; value: string | number; description?: string };
  itemB: { label: string; value: string | number; description?: string };
}> = ({ title, itemA, itemB }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  const popA = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  const popB = spring({
    frame: frame - 20,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

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
          width: "85%",
          height: "80%",
          gap: 40,
        }}
      >
        {/* Title */}
        {title && (
          <h1
            style={{
              fontSize: 80,
              fontWeight: 900,
              textAlign: "center",
              lineHeight: 1.1,
              marginTop: 0,
              marginBottom: 40,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              transform: `scale(${entrance})`,
              opacity: entrance,
              textShadow: glowText(COLORS.purple, "medium"),
            }}
          >
            {title}
          </h1>
        )}

        {/* Split Container */}
        <div style={{ display: "flex", flex: 1, gap: 60 }}>
          
          {/* Side A */}
          <div style={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            justifyContent: "center",
            transform: `translateY(${(1 - popA) * 100}px)`,
            opacity: popA,
            borderRight: `2px solid ${COLORS.purple}40`,
            paddingRight: 30,
          }}>
            <h2 style={{
              fontSize: 48,
              color: COLORS.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 20,
              textAlign: "center",
            }}>
              {itemA.label}
            </h2>
            <div style={{
              fontSize: 120,
              fontWeight: 900,
              color: COLORS.textPrimary,
              textShadow: glowText(COLORS.bullish, "hard"),
              marginBottom: 30,
              textAlign: "center",
            }}>
              {itemA.value}
            </div>
            {itemA.description && (
              <p style={{
                fontSize: 32,
                color: COLORS.textSecondary,
                textAlign: "center",
                lineHeight: 1.4,
              }}>
                {itemA.description}
              </p>
            )}
          </div>

          {/* Side B */}
          <div style={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center",
            justifyContent: "center",
            transform: `translateY(${(1 - popB) * 100}px)`,
            opacity: popB,
            paddingLeft: 30,
          }}>
            <h2 style={{
              fontSize: 48,
              color: COLORS.textSecondary,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 20,
              textAlign: "center",
            }}>
              {itemB.label}
            </h2>
            <div style={{
              fontSize: 120,
              fontWeight: 900,
              color: COLORS.textPrimary,
              textShadow: glowText(COLORS.bearish, "hard"),
              marginBottom: 30,
              textAlign: "center",
            }}>
              {itemB.value}
            </div>
            {itemB.description && (
              <p style={{
                fontSize: 32,
                color: COLORS.textSecondary,
                textAlign: "center",
                lineHeight: 1.4,
              }}>
                {itemB.description}
              </p>
            )}
          </div>

        </div>
      </div>
    </AbsoluteFill>
  );
};
