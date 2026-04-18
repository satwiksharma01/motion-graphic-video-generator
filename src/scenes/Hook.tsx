import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { SemanticIcon } from "../components/SemanticIcon";
import { fontFamily } from "../lib/fonts";

type Sentiment = "bullish" | "bearish" | "neutral";

export const Hook: React.FC<{ 
  title: string;
  sentiment?: Sentiment;
  iconName?: string;
  layoutVariant?: "centered" | "split" | "bottom";
}> = ({ title, sentiment = "neutral", iconName, layoutVariant = "centered" }) => {
  // Determine flex direction and alignment based on layout
  const isSplit = layoutVariant === "split";
  const isBottom = layoutVariant === "bottom";

  return (
    <AbsoluteFill
      style={{
        justifyContent: isBottom ? "flex-end" : "center",
        alignItems: isSplit ? "flex-start" : "center",
        padding: isSplit ? "0 100px" : isBottom ? "0 0 150px 0" : "0",
        flexDirection: isSplit ? "row" : "column",
        color: "white",
        fontFamily,
        gap: isSplit ? 60 : 0,
      }}
    >
      {/* Dynamic Semantic Icon */}
      {iconName && (
        <div style={{ marginBottom: isSplit ? 0 : 60, flexShrink: 0 }}>
          <SemanticIcon iconName={iconName} sentiment={sentiment} size={isSplit ? 250 : 150} />
        </div>
      )}

      {/* Word-by-word animated title */}
      <div style={{ maxWidth: isSplit ? "600px" : "100%", textAlign: isSplit ? "left" : "center" }}>
        <AnimatedText
          text={title}
          fontSize={72}
          fontWeight={800}
          staggerDelay={5}
          textAlign={isSplit ? "left" : "center"}
          startDelay={iconName ? 20 : 5}
        />
      </div>
    </AbsoluteFill>
  );
};
