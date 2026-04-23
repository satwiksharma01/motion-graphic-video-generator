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
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: "85%",
          height: "60vh",
          display: "flex",
          justifyContent: isBottom ? "flex-end" : "center",
          alignItems: "center", // Strictly center even if split
          flexDirection: isSplit ? "row" : "column",
          color: "white",
          fontFamily,
          gap: isSplit ? 60 : 0,
        }}
      >
        {/* Dynamic Semantic Icon */}
        {iconName && (
          <div style={{ marginBottom: isSplit ? 0 : 40, flexShrink: 0 }}>
            <SemanticIcon iconName={iconName} sentiment={sentiment} size={isSplit ? 150 : 120} />
          </div>
        )}

        {/* Impact title - bouncy, glowing */}
        <div style={{ maxWidth: isSplit ? "600px" : "100%", textAlign: isSplit ? "left" : "center" }}>
          <ImpactText
            text={title}
            glowColor={`${color}99`}
            delay={iconName ? 20 : 5}
            fontSize={isSplit ? 90 : 110}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
