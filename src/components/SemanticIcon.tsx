import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

type Sentiment = "bullish" | "bearish" | "neutral";

export const getSentimentColor = (sentiment: Sentiment) => {
  if (sentiment === "bullish") return "#10b981"; // Emerald Green
  if (sentiment === "bearish") return "#ef4444"; // Red
  return "#06b6d4"; // Default Cyan
};

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

  // Entrance animations
  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  const rotation = spring({
    frame,
    fps,
    config: { damping: 100, stiffness: 20 },
  }) * (Math.PI * 2);

  if (!IconComponent) {
    return null; // Silent skip if icon not found
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: size * 1.5,
        height: size * 1.5,
      }}
    >
      {/* Outer rotating glow ring */}
      <div
        style={{
          position: "absolute",
          width: size * 1.2,
          height: size * 1.2,
          borderRadius: "50%",
          border: `3px dashed ${color}`,
          opacity: 0.5,
          transform: `scale(${scale}) rotate(${rotation}rad)`,
          boxShadow: `0 0 40px ${color}40`,
        }}
      />
      
      {/* Inner Icon */}
      <div
        style={{
          transform: `scale(${scale})`,
          filter: `drop-shadow(0 0 20px ${color}80)`,
        }}
      >
        <IconComponent size={size} color={color} strokeWidth={2} />
      </div>
    </div>
  );
};
