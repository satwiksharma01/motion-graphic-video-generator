import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/colors";
import { GridBackground } from "./GridBackground"; 

export const AbstractGridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Subtle slow pan to feel "alive" but not distracting
  const panY = (frame / (fps * 30)) * 100;

  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.background,
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        width: "200%",
        height: "200%",
        left: "-50%",
        top: "-50%",
        transform: `translateY(${panY}px) perspective(500px) rotateX(15deg)`,
        opacity: 0.15, // Barely visible texturing
        pointerEvents: "none"
      }}>
        {/* Simple vertical stripes to emulate a stock/chart grid in the distance */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${i * 2.5}%`,
            top: 0,
            bottom: 0,
            width: "1px",
            background: `linear-gradient(to bottom, transparent, ${COLORS.gridLine}, transparent)`
          }} />
        ))}
      </div>
      {/* Heavy vignette overlay to keep focus in the center */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle at center, transparent 30%, ${COLORS.background} 90%)`,
        pointerEvents: "none"
      }} />
    </AbsoluteFill>
  );
};
