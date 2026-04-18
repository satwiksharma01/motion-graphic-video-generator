import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Easing } from "remotion";
import { evolvePath } from "@remotion/paths";
import { COLORS } from "../lib/colors";

export const FinancialGraph: React.FC<{ data: number[]; color?: string }> = ({ 
  data, 
  color = COLORS.purple 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const generateLinePath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return "";
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  };

  const { pathObj, width, height } = useMemo(() => {
    const width = 1000;
    const height = 500;
    const minVal = Math.min(...data) * 0.95;
    const maxVal = Math.max(...data) * 1.05;
    const range = maxVal - minVal;

    const points = data.map((val, i) => ({
      x: (i / (data.length - 1)) * width,
      y: height - ((val - minVal) / range) * height,
    }));
    return { pathObj: generateLinePath(points), width, height };
  }, [data]);

  const progress = interpolate(frame, [10, 10 + 2 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const { strokeDasharray, strokeDashoffset } = evolvePath(progress, pathObj);

  return (
    <svg width={width} height={height} style={{ overflow: "visible", opacity: 0.8 }}>
      {/* Background horizontal grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((p) => (
        <line
          key={p}
          x1={0}
          y1={height * p}
          x2={width}
          y2={height * p}
          stroke={color}
          strokeWidth={1}
          opacity={0.05}
        />
      ))}

      {/* Deep diffuse glow layer */}
      <path
        d={pathObj}
        fill="none"
        stroke={color}
        strokeWidth={35}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.15}
        style={{ filter: "blur(20px)" }}
      />

      {/* Secondary bright glow layer */}
      <path
        d={pathObj}
        fill="none"
        stroke={color}
        strokeWidth={12}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.4}
        style={{ filter: "blur(6px)" }}
      />

      {/* Main crisp line */}
      <path
        d={pathObj}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          filter: `drop-shadow(0 0 10px ${color})`,
        }}
      />
    </svg>
  );
};
