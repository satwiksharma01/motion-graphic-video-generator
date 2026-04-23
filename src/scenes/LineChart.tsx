import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { evolvePath } from "@remotion/paths";
import { getSentimentColor, getSentimentGlow, COLORS } from "../lib/colors";
import { fontFamily } from "../lib/fonts";

type Sentiment = "bullish" | "bearish" | "neutral";

export const LineChart: React.FC<{
  dataPoints: number[];
  sentiment?: Sentiment;
  title?: string;
}> = ({ dataPoints, sentiment = "neutral", title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const svgWidth = 800;
  const svgHeight = 500;

  // Determine scaling
  const minVal = Math.min(...dataPoints) * 0.95; 
  const maxVal = Math.max(...dataPoints) * 1.05;
  const range = maxVal - minVal;

  const points = dataPoints.map((val, i) => {
    const x = (i / (dataPoints.length - 1)) * svgWidth;
    const y = svgHeight - ((val - minVal) / range) * svgHeight;
    return { x, y };
  });

  const path = `M ${points[0].x} ${points[0].y} ` + 
    points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ");

  // Calculate draw progress
  const progress = spring({
    frame,
    fps,
    config: { damping: 200, stiffness: 20 },
    durationInFrames: 60,
  });

  const evolvedPathData = evolvePath(progress, path);
  const color = getSentimentColor(sentiment);
  const glow = getSentimentGlow(sentiment);

  const containerSlide = spring({
    frame: frame - 10,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

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
            fontSize: 72,
            fontWeight: 900,
            marginBottom: 50,
            color: COLORS.textPrimary,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            textShadow: `0 0 30px ${glow}`,
          }}>
            {title}
          </h1>
        )}

        <div style={{ position: "relative", width: svgWidth, height: svgHeight }}>
          {/* Premium grid - ultra subtle */}
          {[25, 50, 75].map(pct => (
            <div key={pct} style={{
              position: "absolute",
              top: `${pct}%`,
              width: "100%",
              height: 1,
              background: `rgba(255,255,255,${pct === 50 ? 0.08 : 0.04})`,
            }} />
          ))}
          {/* Vertical grid lines */}
          {dataPoints.map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${(i / (dataPoints.length - 1)) * 100}%`,
              top: 0,
              width: 1,
              height: "100%",
              background: "rgba(255,255,255,0.03)",
            }} />
          ))}

          <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ overflow: "visible" }}>
            {/* Main crisp line */}
            <path
              d={evolvedPathData}
              fill="none"
              stroke={color}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: `drop-shadow(0 4px 10px ${glow})` }}
            />
          </svg>

          {/* White data point markers */}
          {points.map((p, i) => {
            const indexProgress = i / (points.length - 1);
            const showPoint = progress >= indexProgress;

            const pop = spring({
              frame: frame - (40 + (i * 6)),
              fps,
              config: { damping: 10, stiffness: 220 }
            });

            const value = dataPoints[i];

            return (
              <div key={i}>
                {/* Point circle */}
                <div
                  style={{
                    position: "absolute",
                    left: p.x - 12,
                    top: p.y - 12,
                    width: 24,
                    height: 24,
                    backgroundColor: COLORS.textPrimary,
                    border: `4px solid ${color}`,
                    borderRadius: "50%",
                    transform: `scale(${showPoint ? pop : 0})`,
                    boxShadow: `0 0 20px ${glow}, 0 0 6px ${color}`,
                  }}
                />
                {/* Value label above point */}
                {showPoint && (
                  <div style={{
                    position: "absolute",
                    left: p.x - 50,
                    top: p.y - 55,
                    width: 100,
                    textAlign: "center",
                    fontSize: 28,
                    fontWeight: 700,
                    color: COLORS.textPrimary,
                    opacity: pop,
                    textShadow: `0 0 10px ${glow}`,
                  }}>
                    {value}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
