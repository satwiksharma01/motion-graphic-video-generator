import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ArrowUpRight } from "lucide-react";
import { fontFamily } from "../lib/fonts";
import { AnimatedText } from "../components/AnimatedText";
import { getSentimentColor, getSentimentGlow, COLORS, glowText, type Sentiment } from "../lib/colors";

export const CTA: React.FC<{
  subtitle?: string;
  buttonText?: string;
  sentiment?: Sentiment;
}> = ({ subtitle = "Ready to grow your wealth?", buttonText = "Start Investing", sentiment = "neutral" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const subtitleSlide = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 90 },
  });

  const buttonPop = spring({
    frame: frame - 18,
    fps,
    config: { damping: 9, stiffness: 140, mass: 1.2 },
  });

  const arrowNudge = interpolate(Math.sin((frame / fps) * 4), [-1, 1], [-5, 5]);
  const pulseGlow = interpolate(Math.sin((frame / fps) * 3), [-1, 1], [40, 80]);

  const color = getSentimentColor(sentiment);
  const glow = getSentimentGlow(sentiment);

  // Gradient from sentiment color to a darker/richer shade
  const colorDark =
    sentiment === "bullish" ? "#007700" :
    sentiment === "bearish" ? "#8B0000" :
    "#4B0082"; // Indigo for neutral/purple

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 60,
        color: COLORS.textPrimary,
        fontFamily,
      }}
    >
      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleSlide,
          transform: `translateY(${(1 - subtitleSlide) * 40}px)`,
        }}
      >
        <AnimatedText
          text={subtitle}
          fontSize={52}
          fontWeight={600}
          color={COLORS.textSecondary}
          staggerDelay={3}
        />
      </div>

      {/* CTA Button — premium bordered glow pill */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          // Transparent fill — just the gradient border glow
          background: `linear-gradient(135deg, ${color}22, ${colorDark}44)`,
          color: COLORS.textPrimary,
          padding: "50px 100px",
          borderRadius: 120,
          fontSize: 72,
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          transform: `scale(${buttonPop})`,
          boxShadow: `0 0 ${pulseGlow}px ${glow}, 0 0 ${pulseGlow * 1.5}px ${glow}, inset 0 0 30px ${color}10`,
          border: `2px solid ${color}`,
          textShadow: glowText(color, "soft"),
        }}
      >
        {buttonText}
        <div style={{ transform: `translate(${arrowNudge}px, ${-arrowNudge}px)`, filter: `drop-shadow(0 0 10px ${color})` }}>
          <ArrowUpRight size={80} strokeWidth={3} color={color} />
        </div>
      </div>

      {/* Subtle bottom tagline */}
      <div
        style={{
          opacity: subtitleSlide * 0.5,
          fontSize: 28,
          color: COLORS.textMuted,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 600,
        }}
      >
        Follow for more market insights
      </div>
    </AbsoluteFill>
  );
};
