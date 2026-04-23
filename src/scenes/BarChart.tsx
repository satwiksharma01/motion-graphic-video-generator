import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { getSentimentColor, getSentimentGlow, COLORS } from "../lib/colors";
import { fontFamily } from "../lib/fonts";

type Sentiment = "bullish" | "bearish" | "neutral";

export const BarChart: React.FC<{
  dataPoints: { label: string; value: number }[];
  sentiment?: Sentiment;
  title?: string;
}> = ({ dataPoints, sentiment = "neutral", title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const svgWidth = 800;
  const svgHeight = 400;

  const maxVal = Math.max(...dataPoints.map(d => d.value)) * 1.1;

  const color = getSentimentColor(sentiment);
  const glow = getSentimentGlow(sentiment);

  const containerSlide = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const barWidth = (svgWidth / dataPoints.length) * 0.6;
  const spacing = (svgWidth / dataPoints.length) * 0.4;

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: "center",
        color: COLORS.textPrimary,
        fontFamily,
      }}
    >
      <div
        style={{
          transform: `translateY(${(1 - containerSlide) * 50}px)`,
          opacity: containerSlide,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {title && (
          <h1 style={{
            fontSize: 64,
            fontWeight: 800,
            marginBottom: 40,
            color: COLORS.textPrimary,
            letterSpacing: "-0.01em",
            textTransform: "uppercase",
            textShadow: `0 0 15px ${glow}`,
          }}>
            {title}
          </h1>
        )}

        <div style={{ position: "relative", width: svgWidth, height: svgHeight, display: "flex", alignItems: "flex-end", gap: spacing }}>
          {dataPoints.map((point, i) => {
            const h = (point.value / maxVal) * svgHeight;
            const barPop = spring({
              frame: frame - (20 + (i * 8)),
              fps,
              config: { damping: 12, stiffness: 150 }
            });

            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 15, width: barWidth }}>
                {barPop > 0.1 && (
                  <div style={{
                    fontSize: 24,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    opacity: barPop,
                  }}>
                    {point.value}
                  </div>
                )}
                <div style={{
                  width: "100%",
                  height: h * barPop,
                  backgroundColor: color,
                  borderRadius: "8px 8px 0 0",
                  boxShadow: `0 0 15px ${glow}`,
                  opacity: 0.9,
                }} />
                <div style={{
                  fontSize: 20,
                  fontWeight: 600,
                  color: COLORS.textMuted,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  opacity: containerSlide,
                }}>
                  {point.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
