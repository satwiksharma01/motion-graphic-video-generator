import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SemanticIcon, getSentimentColor } from "../components/SemanticIcon";
import { getSentimentGlow, COLORS } from "../lib/colors";
import { fontFamily } from "../lib/fonts";
import { ImpactText } from "../components/ImpactText";

type Sentiment = "bullish" | "bearish" | "neutral";

export const GraphicList: React.FC<{
  title?: string;
  items: { label: string; icon?: string }[];
  sentiment?: Sentiment;
}> = ({ title, items, sentiment = "neutral" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const color = getSentimentColor(sentiment);
  const glow = getSentimentGlow(sentiment);

  const containerSlide = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          width: "90%",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: containerSlide,
          transform: `translateY(${(1 - containerSlide) * 40}px)`,
        }}
      >
        {title && (
          <div style={{ marginBottom: 60, textAlign: "center" }}>
             <ImpactText 
                text={title} 
                fontSize={80} 
                glowColor={glow} 
                mode="calm"
             />
             <div style={{ 
                height: 4, 
                width: 120, 
                backgroundColor: color, 
                margin: "20px auto",
                borderRadius: 2,
                boxShadow: `0 0 10px ${glow}`
             }} />
          </div>
        )}

        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 50,
          flexWrap: "wrap",
          width: "100%"
        }}>
          {items.map((item, i) => {
            const itemPop = spring({
               frame: frame - (15 + i * 10),
               fps,
               config: { damping: 12, stiffness: 120 }
            });

            return (
              <div 
                key={i} 
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 20,
                  width: 240,
                  opacity: itemPop,
                  transform: `scale(${0.8 + 0.2 * itemPop}) translateY(${(1 - itemPop) * 30}px)`
                }}
              >
                <div style={{
                  width: 140,
                  height: 140,
                  borderRadius: 24,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: `1px solid ${color}40`,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: `0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px ${color}10`,
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Subtle background glow for the icon card */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at center, ${color}15, transparent)`,
                    opacity: itemPop
                  }} />
                  
                  <SemanticIcon 
                    iconName={item.icon || "box"} 
                    sentiment={sentiment} 
                    size={80} 
                  />
                </div>
                <div style={{
                  fontFamily,
                  fontSize: 24,
                  fontWeight: 700,
                  color: COLORS.textPrimary,
                  textAlign: "center",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  opacity: itemPop
                }}>
                  {item.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
