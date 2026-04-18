import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

/**
 * Animates text word-by-word with staggered spring entrance.
 */
export const AnimatedText: React.FC<{
  text: string;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  staggerDelay?: number;
  startDelay?: number;
  lineHeight?: number;
  textAlign?: React.CSSProperties["textAlign"];
  maxWidth?: string;
}> = ({
  text,
  fontSize = 70,
  fontWeight = 800,
  color = "white",
  staggerDelay = 4,
  startDelay = 0,
  lineHeight = 1.2,
  textAlign = "center",
  maxWidth = "85%",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        color,
        lineHeight,
        textAlign,
        maxWidth,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: textAlign === "center" ? "center" : "flex-start",
        gap: `0px ${fontSize * 0.25}px`,
      }}
    >
      {words.map((word, i) => {
        const delay = startDelay + i * staggerDelay;

        const progress = spring({
          frame: frame - delay,
          fps,
          config: { damping: 14, stiffness: 120, mass: 0.8 },
        });

        const blur = interpolate(progress, [0, 0.6, 1], [8, 2, 0], {
          extrapolateRight: "clamp",
        });

        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity: progress,
              transform: `translateY(${(1 - progress) * 30}px) scale(${0.8 + progress * 0.2})`,
              filter: `blur(${blur}px)`,
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
