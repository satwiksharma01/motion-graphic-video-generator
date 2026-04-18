import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ArrowUpRight } from "lucide-react";
import { fontFamily } from "../lib/fonts";
import { AnimatedText } from "../components/AnimatedText";
import { getSentimentColor } from "../components/SemanticIcon";

type Sentiment = "bullish" | "bearish" | "neutral";

export const CTA: React.FC<{
  subtitle?: string;
  buttonText?: string;
  sentiment?: Sentiment;
}> = ({ subtitle = "Ready to grow your wealth?", buttonText = "Start Investing", sentiment = "neutral" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const subtitleProgress = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 80 },
  });

  const pop = spring({
    frame: frame - 15,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  const arrowNudge = interpolate(Math.sin((frame / fps) * 4), [-1, 1], [-4, 4]);
  const glowRadius = interpolate(Math.sin((frame / fps) * 3), [-1, 1], [30, 60]);

  const color = getSentimentColor(sentiment);
  
  // Make the button gradient fade from the sentiment color to a slightly darker shade
  const colorDark = sentiment === "bullish" ? "#047857" : sentiment === "bearish" ? "#991b1b" : "#3b82f6";

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontFamily,
      }}
    >
      <div
        style={{
          opacity: subtitleProgress,
          transform: `translateY(${(1 - subtitleProgress) * 30}px)`,
          marginBottom: 50,
        }}
      >
        <AnimatedText
          text={subtitle}
          fontSize={48}
          fontWeight={600}
          color="#9ca3af"
          staggerDelay={3}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: `linear-gradient(135deg, ${color}, ${colorDark})`,
          color: "#fff",
          padding: "45px 90px",
          borderRadius: 100,
          fontSize: 68,
          fontWeight: 900,
          transform: `scale(${pop})`,
          boxShadow: `0 0 ${glowRadius}px ${color}80, 0 20px 60px rgba(0, 0, 0, 0.4)`,
          border: "2px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {buttonText}
        <div style={{ transform: `translate(${arrowNudge}px, ${-arrowNudge}px)` }}>
          <ArrowUpRight size={75} strokeWidth={3.5} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
