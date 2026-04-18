import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { evolvePath } from "@remotion/paths";
import { getSentimentColor } from "../components/SemanticIcon";
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

  // Use evolved path for animation
  const evolvedPathData = evolvePath(progress, path);
  const color = getSentimentColor(sentiment);

  // Intro for the container
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
        color: "white",
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
          <h1 style={{ fontSize: 72, fontWeight: 900, marginBottom: 50, color: "#fff" }}>
            {title}
          </h1>
        )}

        {/* The Generative Graph */}
        <div style={{ position: "relative", width: svgWidth, height: svgHeight }}>
          {/* Subtle Grid behind graph */}
          <div style={{ position: "absolute", top: "50%", width: "100%", height: 2, background: "rgba(255,255,255,0.1)" }} />
          <div style={{ position: "absolute", top: "25%", width: "100%", height: 2, background: "rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", top: "75%", width: "100%", height: 2, background: "rgba(255,255,255,0.05)" }} />

          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            style={{ overflow: "visible" }}
          >
            {/* Draw the adaptive line */}
            <path
              d={evolvedPathData}
              fill="none"
              stroke={color}
              strokeWidth={14}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter: `drop-shadow(0 20px 40px ${color}80)`,
              }}
            />
          </svg>

          {/* Draw data point markers after graph has drawn */}
          {points.map((p, i) => {
            const indexProgress = i / (points.length - 1);
            const showPoint = progress >= indexProgress;
            
            const pop = spring({
               frame: frame - (40 + (i * 5)),
               fps,
               config: { damping: 12, stiffness: 200 }
            });

            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: p.x - 15,
                  top: p.y - 15,
                  width: 30,
                  height: 30,
                  backgroundColor: "#fff",
                  border: `6px solid ${color}`,
                  borderRadius: "50%",
                  transform: `scale(${showPoint ? pop : 0})`,
                  boxShadow: `0 0 20px ${color}`,
                }}
              />
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
