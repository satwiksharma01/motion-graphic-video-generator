import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";

export const FinancialGraph: React.FC<{ data: number[] }> = ({ data }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const generateLinePath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  };

  const { pathObj, width, height } = useMemo(() => {
    const width = 800;
    const height = 400;
    // adding some padding
    const minVal = Math.min(...data) * 0.95;
    const maxVal = Math.max(...data) * 1.05;
    const range = maxVal - minVal;

    const points = data.map((val, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - ((val - minVal) / range) * height,
    }));
    return { pathObj: generateLinePath(points), width, height };
  }, [data]);

  // Animate the line over 2 seconds, starting at frame 5
  const progress = interpolate(frame, [5, 5 + 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.quad),
  });

  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, pathObj);

  return (
    <svg width={width} height={height} style={{ overflow: "visible" }}>
      <path
        d={pathObj}
        fill="none"
        stroke="#06b6d4" // Cyan glowing graph
        strokeWidth={14}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: "drop-shadow(0px 0px 20px rgba(6, 182, 212, 0.6))",
        }}
      />
    </svg>
  );
};
