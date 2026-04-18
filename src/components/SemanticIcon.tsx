import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";
import { getSentimentColor, getSentimentGlow, type Sentiment } from "../lib/colors";

// Re-export for backward compat with other scenes that import from here
export { getSentimentColor } from "../lib/colors";

export const SemanticIcon: React.FC<{
  iconName: string;
  sentiment?: Sentiment;
  size?: number;
}> = ({ iconName, sentiment = "neutral", size = 200 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Convert kebab-case or string to PascalCase (e.g., alert-triangle -> AlertTriangle)
  const formattedName = iconName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join("");

  const IconComponent = (Icons as Record<string, LucideIcon | undefined>)[formattedName];
  const color = getSentimentColor(sentiment);
  const glow = getSentimentGlow(sentiment);

  // Entrance — strong spring snap with overshoot
  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 120, mass: 1.2 },
  });

  // Slow, continuous rotation of the outer ring
  const rotation = (frame * 0.5) % 360;

  // Pulsing inner glow
  const pulseIntensity = 0.6 + Math.sin(frame * 0.06) * 0.4;

  if (!IconComponent) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: size * 1.6,
        height: size * 1.6,
        position: "relative",
      }}
    >
      {/* Outer slow-rotating dashed ring */}
      <div
        style={{
          position: "absolute",
          width: size * 1.4,
          height: size * 1.4,
          borderRadius: "50%",
          border: `2px dashed ${color}`,
          opacity: 0.4 * scale,
          transform: `scale(${scale}) rotate(${rotation}deg)`,
          boxShadow: `0 0 30px ${glow}, inset 0 0 30px ${glow}`,
        }}
      />
      
      {/* Inner solid ring */}
      <div
        style={{
          position: "absolute",
          width: size * 1.05,
          height: size * 1.05,
          borderRadius: "50%",
          border: `1px solid ${color}40`,
          opacity: scale,
          transform: `scale(${scale})`,
        }}
      />

      {/* Icon with intense glow */}
      <div
        style={{
          transform: `scale(${scale})`,
          filter: `drop-shadow(0 0 ${size * 0.15}px ${color}) drop-shadow(0 0 ${size * 0.3}px ${glow})`,
          opacity: pulseIntensity,
        }}
      >
        <IconComponent size={size} color={color} strokeWidth={1.5} />
      </div>
    </div>
  );
};
