export type BaseScene = {
  durationInFrames: number;
  spokenText?: string;
  sentiment?: "bullish" | "bearish" | "neutral";
  iconName?: string;
  layoutVariant?: "centered" | "split" | "bottom";
};

export type HookScene = BaseScene & {
  type: "hook";
  title: string;
};

export type CalculationScene = BaseScene & {
  type: "calculation";
  amount: number;
  result: number;
};

export type LineChartScene = BaseScene & {
  type: "linechart";
  dataPoints: number[];
  title?: string;
};

export type StepsScene = BaseScene & {
  type: "steps";
  title?: string;
  items: string[];
};

export type CTAScene = BaseScene & {
  type: "cta";
  subtitle?: string;
  buttonText?: string;
};

export type SceneData = HookScene | CalculationScene | LineChartScene | StepsScene | CTAScene;
