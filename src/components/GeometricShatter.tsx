import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { COLORS } from "../lib/colors";

interface Shard {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

// Deterministic "random" from a seed
const seededRand = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const generateShards = (count: number, color: string): Shard[] => {
  return Array.from({ length: count }, (_, i) => ({
    x: 50,
    y: 50,
    angle: seededRand(i * 7) * 360,
    speed: 15 + seededRand(i * 13) * 35,
    size: 6 + seededRand(i * 17) * 22,
    rotation: seededRand(i * 3) * 360,
    rotationSpeed: (seededRand(i * 11) - 0.5) * 720,
    opacity: 0.6 + seededRand(i * 19) * 0.4,
  }));
};

export const GeometricShatter: React.FC<{
  color?: string;
  shardCount?: number;
  duration?: number; // frames the shatter animation runs
}> = ({
  color = COLORS.bearish,
  shardCount = 18,
  duration = 45,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const shards = generateShards(shardCount, color);

  const progress = interpolate(frame, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ease out — fast at start, slows to rest
  const eased = 1 - Math.pow(1 - progress, 3);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Central flash on impact */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${(1 - eased) * 300 + 10}px`,
          height: `${(1 - eased) * 300 + 10}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}80 0%, transparent 70%)`,
          opacity: (1 - eased),
          filter: `blur(${(1 - eased) * 15}px)`,
        }}
      />

      {shards.map((shard, i) => {
        const angleRad = (shard.angle * Math.PI) / 180;
        const distX = Math.cos(angleRad) * shard.speed * eased;
        const distY = Math.sin(angleRad) * shard.speed * eased;
        const currentRotation = shard.rotation + shard.rotationSpeed * eased;
        const shardOpacity = shard.opacity * (1 - eased * 0.7);

        // Triangle polygon points
        const s = shard.size;
        const pts = `0,${-s} ${s * 0.86},${s * 0.5} ${-s * 0.86},${s * 0.5}`;

        return (
          <svg
            key={i}
            style={{
              position: "absolute",
              left: `${50 + distX}%`,
              top: `${50 + distY}%`,
              transform: `translate(-50%, -50%) rotate(${currentRotation}deg)`,
              opacity: shardOpacity,
              overflow: "visible",
              filter: `drop-shadow(0 0 ${shard.size * 0.3}px ${color})`,
            }}
            width={shard.size * 3}
            height={shard.size * 3}
          >
            <polygon
              points={pts}
              fill={color}
              transform={`translate(${shard.size * 1.5}, ${shard.size * 1.5})`}
            />
          </svg>
        );
      })}
    </div>
  );
};
