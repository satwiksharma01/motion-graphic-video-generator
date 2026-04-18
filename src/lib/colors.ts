/**
 * NOCTIS DESIGN TOKENS
 * "High-Contrast, Glowing Geometric Minimalism"
 * 
 * Single source of truth for all colors, glows, and typography in the engine.
 */

// ─── Core Palette ────────────────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds
  background: "#000000",       // Pure deep black — maximum contrast
  backgroundSoft: "#080808",   // Barely-off-black for layering

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#E0E0E0",
  textMuted: "#999999",

  // Accent — Electric Purple (the signature "Noctis" brand color)
  purple: "#8A2BE2",
  purpleBright: "#A020F0",
  purpleGlow: "rgba(138, 43, 226, 0.6)",

  // Sentiment — Bullish
  bullish: "#39FF14",          // Neon Green — "growth, surge"
  bullishGlow: "rgba(57, 255, 20, 0.5)",
  bullishSoft: "#00CC00",

  // Sentiment — Bearish
  bearish: "#FF0033",          // Striking red — "crash, fear"
  bearishGlow: "rgba(255, 0, 51, 0.6)",
  bearishSoft: "#CC0000",

  // Sentiment — Neutral (Electric Purple)
  neutral: "#8A2BE2",
  neutralGlow: "rgba(138, 43, 226, 0.5)",

  // Grid & structural
  gridLine: "#111111",
  gridDot: "#222222",
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
  const sizes = { soft: "10px", medium: "20px", hard: "40px" };
  const s = sizes[intensity];
  return `0 0 ${s} ${color}, 0 0 ${parseInt(s) * 2}px ${color}40`;
};

export const glowDrop = (color: string, size = 20) =>
  `drop-shadow(0 0 ${size}px ${color})`;
