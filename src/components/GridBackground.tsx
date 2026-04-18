import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../lib/colors";

export const GridBackground: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  
  // Very slow breathing animation for the volumetric light
  const breathScale = 1 + Math.sin(frame * 0.015) * 0.08;
  const breathOpacity = 0.8 + Math.sin(frame * 0.02) * 0.2;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      
      {/* Volumetric light source 1 — Electric Purple (top-left) */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "-10%",
          width: "65%",
          height: "65%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(138, 43, 226, 0.18) 0%, transparent 70%)",
          transform: `scale(${breathScale})`,
          opacity: breathOpacity,
          pointerEvents: "none",
        }}
      />

      {/* Volumetric light source 2 — deep purple (bottom-right) */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-15%",
          width: "70%",
          height: "70%",
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(160, 32, 240, 0.12) 0%, transparent 70%)",
          transform: `scale(${1 + Math.sin(frame * 0.018 + 1) * 0.06})`,
          pointerEvents: "none",
        }}
      />

      {/* Ultra-subtle grid — dot pattern only, barely visible */}
      <svg
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          opacity: 0.12,
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern
            id="noctis-grid"
            width={80}
            height={80}
            patternUnits="userSpaceOnUse"
          >
            {/* Single pixel intersection dots only — ultra minimal */}
            <circle cx={80} cy={80} r={1} fill="#8A2BE2" />
            <circle cx={0} cy={80} r={1} fill="#8A2BE2" />
            <circle cx={80} cy={0} r={1} fill="#8A2BE2" />
            <circle cx={0} cy={0} r={1} fill="#8A2BE2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#noctis-grid)" />
      </svg>

      {/* Content */}
      {children}
    </AbsoluteFill>
  );
};
