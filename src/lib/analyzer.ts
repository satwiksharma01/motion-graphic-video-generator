export type Sentiment = "bullish" | "bearish" | "neutral";
export type LayoutVariant = "centered" | "split" | "bottom";

export interface DerivedMetadata {
  sentiment: Sentiment;
  iconName: string;
}

const KEYWORD_MAP: Record<string, string> = {
  // Finance
  bank: "landmark",
  money: "banknote",
  cash: "banknote",
  dollar: "dollar-sign",
  wealth: "piggy-bank",
  invest: "trending-up",
  savings: "wallet",
  crypto: "bitcoin",
  bitcoin: "bitcoin",
  market: "line-chart",
  stock: "trending-up",
  trading: "bar-chart-3",
  
  // Sentiments/Actions
  fear: "alert-triangle",
  scared: "frown",
  panic: "zap",
  surge: "rocket",
  rise: "trending-up",
  growth: "sprout",
  fall: "trending-down",
  crash: "flame",
  caution: "alert-octagon",
  tip: "lightbulb",
  idea: "lightbulb",
  check: "check-circle",
  security: "shield-check",
  
  // General
  news: "newspaper",
  question: "help-circle",
  think: "brain",
  ready: "flag",
};

export const analyzeSentiment = (text: string | undefined): Sentiment => {
  if (!text) return "neutral";
  const t = text.toLowerCase();
  const bullish = ["surge", "rise", "growth", "up", "profit", "bull", "win", "high"];
  const bearish = ["fall", "crash", "fear", "drop", "scared", "down", "loss", "bear", "panic"];
  
  if (bullish.some(w => t.includes(w))) return "bullish";
  if (bearish.some(w => t.includes(w))) return "bearish";
  return "neutral";
};

export const analyzeIcon = (text: string | undefined): string => {
  if (!text) return "activity";
  const t = text.toLowerCase();
  for (const [kw, icon] of Object.entries(KEYWORD_MAP)) {
    if (t.includes(kw)) return icon;
  }
  return "activity"; // Default
};

export const getSceneSeed = (text: string) => {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

export const deriveLayout = (seed: number): LayoutVariant => {
  const variants: LayoutVariant[] = ["centered", "split", "bottom"];
  return variants[seed % variants.length];
};
