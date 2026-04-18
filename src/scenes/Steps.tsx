import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { ChevronRight } from "lucide-react";
import { fontFamily } from "../lib/fonts";
import { AnimatedText } from "../components/AnimatedText";
import { SemanticIcon, getSentimentColor } from "../components/SemanticIcon";

type Sentiment = "bullish" | "bearish" | "neutral";

export const Steps: React.FC<{
  title?: string;
  items: string[];
  sentiment?: Sentiment;
  iconName?: string;
  layoutVariant?: "centered" | "split" | "bottom";
}> = ({ title = "The Formula", items, sentiment = "neutral", iconName, layoutVariant = "centered" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const isSplit = layoutVariant === "split";

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const color = getSentimentColor(sentiment);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        paddingLeft: isSplit ? "15%" : "12%",
        paddingRight: "8%",
        color: "white",
        fontFamily,
      }}
    >
      <div style={{ 
        marginBottom: 80, 
        display: "flex", 
        alignItems: "center", 
        gap: 30,
        transform: isSplit ? "translateX(-40px)" : "none" 
      }}>
        {iconName && (
          <div style={{ transform: `scale(${titleProgress})` }}>
             <SemanticIcon iconName={iconName} sentiment={sentiment} size={isSplit ? 80 : 60} />
          </div>
        )}
        <div>
          <AnimatedText
            text={title}
            fontSize={isSplit ? 84 : 78}
            fontWeight={900}
            textAlign="left"
            staggerDelay={4}
          />
          {/* Animated underline */}
          <div
            style={{
              height: 5,
              background: `linear-gradient(90deg, ${color}, transparent)`,
              borderRadius: 3,
              marginTop: 16,
              width: `${titleProgress * 220}px`,
              opacity: titleProgress,
            }}
          />
        </div>
      </div>

      {items.map((text, i) => {
        const delay = 15 + i * 18;

        const slideIn = spring({
          frame: frame - delay,
          fps,
          config: { damping: 14, stiffness: 100 },
        });

        const checkScale = spring({
          frame: frame - delay - 5,
          fps,
          config: { damping: 10, stiffness: 150 },
        });

        const glowOpacity = interpolate(slideIn, [0, 1], [0, 0.6]);

        return (
          <div
            key={text}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: isSplit ? 48 : 52,
              fontWeight: 600,
              gap: 30,
              marginBottom: 45,
              transform: `translateX(${(1 - slideIn) * 80}px)`,
              opacity: slideIn,
              paddingLeft: 20,
              borderLeft: `4px solid ${color}${Math.floor(glowOpacity * 255).toString(16).padStart(2, '0')}`,
            }}
          >
            <div style={{ transform: `scale(${checkScale})`, flexShrink: 0 }}>
              <ChevronRight color={color} size={isSplit ? 48 : 56} strokeWidth={3} />
            </div>
            <span style={{ filter: `blur(${(1 - slideIn) * 4}px)` }}>{text}</span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
