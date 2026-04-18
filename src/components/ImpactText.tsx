import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { fontFamily } from "../lib/fonts";

export const ImpactText: React.FC<{
  text: string;
  glowColor?: string;
  delay?: number;
}> = ({ text, glowColor = "rgba(138, 43, 226, 0.8)", delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // High impact spring with overshoot (bounce)
  const scale = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 10,  // Lower damping = more bounce
      stiffness: 150, // Higher stiffness = faster snap
      mass: 1.5,
    },
  });

  // Fade in sharply
  const opacity = interpolate(frame - delay, [0, 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <h1
      style={{
        fontFamily,
        fontSize: 100,
        fontWeight: 900,
        color: "white",
        lineHeight: 1.1,
        textAlign: "center",
        // The bounce scale
        transform: `scale(${scale})`,
        opacity,
        // The intense glow as described in the text file
        textShadow: `0 0 20px ${glowColor}, 0 0 50px ${glowColor}`,
        margin: 0,
        textTransform: "uppercase",
      }}
    >
      {text}
    </h1>
  );
};
