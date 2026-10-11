# Contributing

Use Node.js 22 and install with `npm ci`. Read [the scene contract](src/types/schema.ts) and [engineering notes](docs/ENGINEERING.md) before changing a scene or rendering behavior.

Before a pull request:

```bash
npm test
npm run validate
npm run lint
npm run build
npx remotion still src/index.ts FinanceVideo out/check.png --props=scripts/example.json --frame=60
```

For a rendering bug, include a minimal JSON script, frame number, expected result, and actual image. For a new or changed scene, update its TypeScript definition, runtime validation, a representative input test and the README together. Check an early, middle and late frame; one screenshot can miss a transition problem.

Keep animation tied to Remotion's current frame rather than CSS transitions or elapsed wall-clock time. Use illustrative data and redistributable assets in examples. Document dependencies' separate license terms. Project contributions use MIT.
