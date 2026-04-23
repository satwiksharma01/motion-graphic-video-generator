export type Sentiment = "bullish" | "bearish" | "neutral";
export type LayoutVariant = "centered" | "split" | "bottom";

export interface DerivedMetadata {
  sentiment: Sentiment;
  iconName: string;
}

const KEYWORD_MAP: Record<string, string> = {
  // Finance & Crypto Core
  bank: "landmark",
  money: "banknote",
  cash: "banknote",
  dollar: "dollar-sign",
  wealth: "piggy-bank",
  invest: "trending-up",
  savings: "wallet",
  crypto: "bitcoin",
  bitcoin: "bitcoin",
  xrp: "coins",
  ethereum: "circle-dot",
  nft: "image",
  defi: "network",
  market: "line-chart",
  stock: "trending-up",
  trading: "bar-chart-3",
  etf: "briefcase",
  fund: "briefcase",
  portfolio: "pie-chart",
  compound: "repeat",
  interest: "percent",
  profit: "trending-up",
  revenue: "dollar-sign",
  loss: "trending-down",

  // Extended Crypto terminology
  staking: "layers",
  yield: "sprout",
  harvest: "tractor",
  rewards: "gift",
  validator: "shield-check",
  node: "server",
  consensus: "users",
  mining: "pickaxe",
  halving: "scissors",
  whale: "ship",
  liquidity: "droplet",
  pool: "waves",
  dex: "arrow-left-right",
  cex: "building",
  tokenomics: "pie-chart",
  supply: "boxes",
  inflation: "arrow-up-circle",
  deflation: "arrow-down-circle",
  burn: "flame",
  mint: "hammer",
  airdrop: "parachute",
  bridge: "git-merge",
  wallet: "wallet",

  // Educational Finance
  compound: "repeat",
  diversification: "pie-chart",
  assets: "briefcase",
  equity: "scale",
  index: "list",
  bond: "scroll",
  curriculum: "book-open",
  learn: "graduation-cap",
  study: "book",
  interest: "percent",
  theory: "brain",
  strategy: "compass",

  // Institutions & Regulation
  sec: "shield",
  approve: "check-circle",
  regulation: "scale",
  government: "building",
  institution: "building-2",
  blackrock: "building-2",
  
  // Sentiments & States
  fear: "alert-triangle",
  scared: "frown",
  panic: "zap",
  surge: "rocket",
  rise: "trending-up",
  growth: "sprout",
  fall: "trending-down",
  crash: "flame",
  drop: "arrow-down",
  caution: "alert-octagon",
  tip: "lightbulb",
  idea: "lightbulb",
  check: "check-circle",
  security: "shield-check",
  safe: "shield-check",
  risk: "triangle-alert",
  protect: "shield",
  rule: "list-checks",
  
  // General / Context
  news: "newspaper",
  question: "help-circle",
  think: "brain",
  ready: "flag",
  data: "database",
  global: "globe",
  world: "globe",
  history: "clock",
  future: "telescope",
  community: "users",
  people: "users",
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
