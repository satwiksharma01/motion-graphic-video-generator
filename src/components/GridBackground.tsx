import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { GlowOrb } from "./GlowOrb";

export const GridBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { width, height } = useVideoConfig();
  const gridSize = 60;

  return (
    <AbsoluteFill style={{ backgroundColor: "#010C24" }}>
      {/* Grid Pattern */}
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.3,
        }}
      >
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <circle cx={gridSize / 2} cy={gridSize / 2} r={1.5} fill="#4dadea" />
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="#0f305c"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Ambient Glow Orbs */}
      <GlowOrb color="rgba(6, 182, 212, 0.12)" size={600} x={20} y={30} speed={0.25} delay={0} />
      <GlowOrb color="rgba(99, 102, 241, 0.10)" size={500} x={75} y={60} speed={0.35} delay={50} />
      <GlowOrb color="rgba(168, 85, 247, 0.08)" size={450} x={50} y={85} speed={0.2} delay={100} />

      {/* Content Layer */}
      {children}
    </AbsoluteFill>
  );
};
