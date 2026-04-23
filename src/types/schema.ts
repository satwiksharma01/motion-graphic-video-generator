export type BaseScene = {
  durationInFrames: number;
  spokenText?: string;
  sentiment?: "bullish" | "bearish" | "neutral";
  intent?: "educational" | "dramatic";
  iconName?: string;
  layoutVariant?: "centered" | "split" | "bottom";
  
  // New Overlay Properties
  glossaryTerm?: string;
  glossaryDefinition?: string;
  lowerThirdText?: string;
  lowerThirdStatName?: string;
  lowerThirdStatValue?: string | number;
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

export type BarChartScene = BaseScene & {
  type: "barchart";
  dataPoints: { label: string; value: number }[];
  title?: string;
};

export type ComparisonScene = BaseScene & {
  type: "comparison";
  title?: string;
  itemA: { label: string; value: string | number; description?: string };
  itemB: { label: string; value: string | number; description?: string };
};

export type FormulaScene = BaseScene & {
  type: "formula";
  title?: string;
  equation: string; 
  variables?: Record<string, string>; 
};

export type SceneData = HookScene | CalculationScene | LineChartScene | StepsScene | CTAScene | BarChartScene | ComparisonScene | FormulaScene;
