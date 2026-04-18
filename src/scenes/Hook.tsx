import React from "react";
import { AbsoluteFill } from "remotion";
import { ImpactText } from "../components/ImpactText";
import { SemanticIcon, getSentimentColor } from "../components/SemanticIcon";
import { fontFamily } from "../lib/fonts";

type Sentiment = "bullish" | "bearish" | "neutral";

export const Hook: React.FC<{ 
  title: string;
  sentiment?: Sentiment;
  iconName?: string;
  layoutVariant?: "centered" | "split" | "bottom";
}> = ({ title, sentiment = "neutral", iconName, layoutVariant = "centered" }) => {
  const isSplit = layoutVariant === "split";
  const isBottom = layoutVariant === "bottom";
  const color = getSentimentColor(sentiment);

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

      {/* Impact title - bouncy, glowing */}
      <div style={{ maxWidth: isSplit ? "600px" : "85%", textAlign: isSplit ? "left" : "center" }}>
        <ImpactText
          text={title}
          glowColor={`${color}99`}
          delay={iconName ? 20 : 5}
        />
      </div>
    </AbsoluteFill>
  );
};
