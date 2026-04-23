/**
 * NOCTIS DESIGN TOKENS
 * "High-Contrast, Glowing Geometric Minimalism"
 * 
 * Single source of truth for all colors, glows, and typography in the engine.
 */

// ─── Core Palette ────────────────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds - Trustworthy Slate Navy
  background: "#0B0F19",       
  backgroundSoft: "#111827",   

  // Text
  textPrimary: "#F9FAFB",
  textSecondary: "#D1D5DB",
  textMuted: "#9CA3AF",

  // Accent — Professional Indigo (Neutral)
  purple: "#4338CA",
  purpleBright: "#4F46E5",
  purpleGlow: "rgba(67, 56, 202, 0.4)",

  // Sentiment — Bullish (Deep Teal)
  bullish: "#0D9488",          
  bullishGlow: "rgba(13, 148, 136, 0.4)",
  bullishSoft: "#0F766E",

  // Sentiment — Bearish (Burnt Orange / Warning)
  bearish: "#EA580C",          
  bearishGlow: "rgba(234, 88, 12, 0.4)",
  bearishSoft: "#C2410C",

  // Sentiment — Neutral
  neutral: "#4338CA",
  neutralGlow: "rgba(67, 56, 202, 0.4)",

  // Grid & structural
  gridLine: "#1F2937",
  gridDot: "#374151",
};

// ─── Sentiment Color Helpers ─────────────────────────────────────────────────
export type Sentiment = "bullish" | "bearish" | "neutral";

export const getSentimentColor = (sentiment: Sentiment): string => {
  if (sentiment === "bullish") return COLORS.bullish;
  if (sentiment === "bearish") return COLORS.bearish;
  return COLORS.neutral;
};

export const getSentimentGlow = (sentiment: Sentiment): string => {
  if (sentiment === "bullish") return COLORS.bullishGlow;
  if (sentiment === "bearish") return COLORS.bearishGlow;
  return COLORS.neutralGlow;
};

// ─── Glow Presets ────────────────────────────────────────────────────────────
export const glowText = (color: string, intensity: "soft" | "medium" | "hard" = "medium") => {
  // Softened "Trust" glows: subtle ambient light rather than harsh neon tubes
  const sizes = { soft: "5px", medium: "10px", hard: "20px" };
  const s = sizes[intensity];
  return `0 0 ${s} ${color}, 0 0 ${parseInt(s) * 1.5}px ${color}30`;
};

export const glowDrop = (color: string, size = 20) =>
  `drop-shadow(0 0 ${size}px ${color})`;
