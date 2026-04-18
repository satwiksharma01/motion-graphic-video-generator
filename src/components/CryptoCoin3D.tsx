import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, useVideoConfig } from "remotion";
import { Coins } from "lucide-react"; // Generic coin icon

interface CryptoCoin3DProps {
  size?: number;
  glowColor?: string;
  startDelay?: number;
  durationInFrames?: number;
}

export const CryptoCoin3D: React.FC<CryptoCoin3DProps> = ({
  size = 300,
  glowColor = "rgba(43, 226, 138, 0.5)", // Default subtle green glow
  startDelay = 0,
  // If no duration provided, default to continuous slow rotation
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Continuous rotation (360 degrees every 4 seconds)
  const cycleFrames = durationInFrames || fps * 4;
  const rotation = interpolate(
    (frame - startDelay) % cycleFrames,
    [0, cycleFrames],
    [0, 360]
  );
  
  // Subtle bobbing up and down
  const translateY = interpolate(
    Math.sin(((frame - startDelay) / cycleFrames) * Math.PI * 2),
    [-1, 1],
    [-20, 20]
  );

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          transform: `translateY(${translateY}px) rotateY(${rotation}deg)`,
          // Overall glow effect
          filter: `drop-shadow(0 0 ${size / 5}px ${glowColor})`,
        }}
      >
        {/* Bottom depth layer (Simulated 3D thickness) */}
        <div style={{ position: "absolute", top: 0, left: -4, opacity: 0.6 }}>
          <Coins size={size} color="#888" strokeWidth={1} />
        </div>
        <div style={{ position: "absolute", top: 0, left: -2, opacity: 0.8 }}>
          <Coins size={size} color="#aaa" strokeWidth={1.5} />
        </div>
        
        {/* Top/Front face */}
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <Coins size={size} color="#fff" strokeWidth={2} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
