import { icons, type LucideIcon } from "lucide-react";

// Existing scripts use names that Lucide renamed or removed.
const legacyNames: Record<string, string> = {
  LineChart: "ChartLine",
  BarChart3: "ChartNoAxesColumn",
  PieChart: "ChartPie",
  ArrowUpCircle: "CircleArrowUp",
  ArrowDownCircle: "CircleArrowDown",
  CheckCircle: "CircleCheck",
  AlertTriangle: "TriangleAlert",
  AlertOctagon: "OctagonAlert",
  HelpCircle: "CircleQuestionMark",
  Parachute: "Gift",
};

export function resolveIcon(name: string): LucideIcon {
  const formatted = name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  const available: Record<string, LucideIcon | undefined> = icons;
  return available[legacyNames[formatted] ?? formatted] ?? icons.Activity;
}
