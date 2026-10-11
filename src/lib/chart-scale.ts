export function lineChartPoints(
  values: number[],
  width: number,
  height: number,
) {
  const lowest = Math.min(...values);
  const highest = Math.max(...values);
  const padding = Math.max(
    (highest - lowest) * 0.05,
    Math.abs(highest) * 0.05,
    1,
  );
  const min = lowest - padding;
  const range = highest + padding - min;
  return values.map((value, index) => ({
    x: (index / (values.length - 1)) * width,
    y: height - ((value - min) / range) * height,
  }));
}
