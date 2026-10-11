# Engineering notes

## Problem and boundary

This project explores reusable motion-graphics scenes driven by structured input. It renders visuals with React and Remotion; it does not fetch market data, generate narration or choose a financial strategy. The included small example uses illustrative values.

## Decisions and tradeoffs

| Decision | Reason | Limitation |
|---|---|---|
| A typed scene union and runtime validation | Authored TypeScript and external JSON need different checks. [`validate-input.ts`](../src/lib/validate-input.ts) rejects malformed scenes before an expensive render. | Validation checks supported shapes and numerical constraints, not editorial accuracy or layout quality. |
| Animation derived from the current frame | An exported frame must not depend on wall-clock time or CSS transition history. | A render smoke test is still needed; compilation alone does not prove browser rendering. |
| Shared chart-coordinate calculations | Zero, constant and negative line series must remain within the chart bounds. | Bar charts currently support non-negative values only; signed bars need a different baseline design. |
| Keyword-based sentiment and icon selection | Local rules are cheap and predictable for a prototype. | These are heuristics, not language understanding. Authors can supply explicit overrides. |
| Estimated captions in the batch renderer | Text-only scripts can produce a visual prototype without a speech service. | Fixed 350 ms word timing is not speech alignment. There is no audio track by default. |

## Reproduce the evidence

```bash
npm ci
npm test
npm run validate
npm run lint
npm run build
npx remotion render src/index.ts FinanceVideo out/example.mp4 --props=scripts/example.json
```

Tests cover all nine supported scene contracts, malformed inputs, constant/zero/negative line series and the committed JSON examples. CI also renders a real still image. The [rendered sample](example.mp4) demonstrates the line-chart and graphic-list sequence; it is not a quality benchmark for all scenes.

## Useful next work

Real audio and caption alignment, visual checks across all scene types, typography for long labels, and signed bar charts remain separate product improvements. No throughput, production-readiness or user-adoption measurements are claimed.
