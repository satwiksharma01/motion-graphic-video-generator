import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

/**
 * A slowly drifting, pulsing glow orb for ambient background atmosphere.
 */
export const GlowOrb: React.FC<{
  color?: string;
  size?: number;
  x?: number;
  y?: number;
  speed?: number;
  delay?: number;
}> = ({
  color = "rgba(6, 182, 212, 0.15)",
  size = 400,
  x = 50,
  y = 50,
  speed = 0.3,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const time = (frame + delay) / fps;

  const driftX = Math.sin(time * speed) * 40;
  const driftY = Math.cos(time * speed * 0.7) * 30;
  const pulse = interpolate(
    Math.sin(time * speed * 1.5),
    [-1, 1],
    [0.8, 1.2]
  );

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        width: size * pulse,
        height: size * pulse,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        transform: `translate(-50%, -50%) translate(${driftX}px, ${driftY}px)`,
        pointerEvents: "none",
      }}
    />
  );
};
