import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/colors";
import { fontFamily } from "../lib/fonts";

export const GlossaryOverlay: React.FC<{
  term: string;
  definition: string;
}> = ({ term, definition }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Wait a little before showing to avoid interfering with scene intros
  const delay = Math.round(fps * 0.5);

  const pop = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "flex-end", // Top Right
        padding: "80px",
        fontFamily,
        pointerEvents: "none",
      }}
    >
      <div style={{
        width: 600,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(20px)",
        border: `2px solid ${COLORS.purple}80`,
        borderRadius: 16,
        padding: "30px",
        boxShadow: `0 0 30px ${COLORS.purple}40`,
        transform: `translateY(${(1 - pop) * -50}px) scale(${0.9 + pop * 0.1})`,
        opacity: pop,
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}>
        <div style={{
          fontSize: 24,
          fontWeight: 800,
          color: COLORS.purple,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <span style={{ fontSize: 20 }}>💡</span> GLOSSARY: {term}
        </div>
        <p style={{
          margin: 0,
          fontSize: 32,
          lineHeight: 1.4,
          color: COLORS.textPrimary,
          fontWeight: 500,
        }}>
          {definition}
        </p>
      </div>
    </AbsoluteFill>
  );
};
