import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { COLORS } from "../lib/colors";
import { fontFamily } from "../lib/fonts";

export const ProgressTracker: React.FC<{
  currentIndex: number;
  total: number;
}> = ({ currentIndex, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "60px",
        fontFamily,
        pointerEvents: "none",
        zIndex: 50,
      }}
    >
      <div style={{
        display: "flex",
        gap: 15,
        transform: `translateY(${(1 - entrance) * -50}px)`,
        opacity: entrance,
      }}>
        {Array.from({ length: total }).map((_, i) => {
          const isPast = i < currentIndex;
          const isCurrent = i === currentIndex;
          
          return (
            <div
              key={i}
              style={{
                width: isCurrent ? 80 : 40,
                height: 6,
                background: isPast || isCurrent ? COLORS.purple : "rgba(255,255,255,0.2)",
                borderRadius: 3,
                boxShadow: isCurrent ? `0 0 15px ${COLORS.purple}` : "none",
                transition: "all 0.3s ease",
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
