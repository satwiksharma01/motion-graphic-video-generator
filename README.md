# Finance Video Engine

[![CI](https://github.com/satwiksharma01/motion-graphic-video-generator/actions/workflows/ci.yml/badge.svg)](https://github.com/satwiksharma01/motion-graphic-video-generator/actions/workflows/ci.yml)

Render structured scripts as vertical motion-graphics videos with React and Remotion. Scenes include line and bar charts, comparisons, formulas, steps, graphic lists, titles, and closing cards. The composition uses a 1080 × 1920 canvas at 30 fps.

![An example line-chart scene with illustrative values](docs/example.png)

**Status: experimental.** Scene rendering is implemented. Sentiment and icon selection use keyword rules; they are not a language model or a financial-data service. Narration and background music are not generated or included.

## Quick start

Use Node.js 22 and npm. Install the locked dependencies:

```bash
git clone https://github.com/satwiksharma01/motion-graphic-video-generator.git
cd motion-graphic-video-generator
npm ci
npm run dev
```

This opens Remotion Studio. The first render may download Remotion's browser and retrieve fonts, so internet access is needed.

[Engineering decisions](docs/ENGINEERING.md) · [Feature status](FEATURES.md) · [Contributing](CONTRIBUTING.md)

## Render the example

The included [example script](scripts/example.json) uses illustrative values, a line chart, and a graphic list. [Watch the rendered sample](docs/example.mp4) or export it yourself:

```bash
npx remotion render src/index.ts FinanceVideo out/example.mp4 --props=scripts/example.json
```

It has no audio or captions. For a quick still frame:

```bash
npx remotion still src/index.ts FinanceVideo out/example.png --props=scripts/example.json --frame=60
```

Output files go in `out/`, which is ignored by Git.

## Write a script

Each script contains a `scenes` array. Every scene needs a supported `type` and `durationInFrames`; remaining fields depend on the scene. The [TypeScript scene definitions](src/types/schema.ts) describe the shapes.

Input is checked before rendering. Scenes need an integer duration of at least 30 frames, allowing the built-in transitions to fit. A line chart needs at least two finite values; bar charts accept non-negative finite values, including zero. Invalid input reports the scene index and field instead of silently dropping the scene. The one-second scene minimum is a current renderer constraint.

| Scene | Main fields |
|---|---|
| `hook` | `title` |
| `linechart` | `dataPoints` (numbers), optional `title` |
| `barchart` | `dataPoints` (`label`/`value` pairs), optional `title` |
| `graphiclist` | `items` (`label` and optional `icon`), optional `title` |
| `steps` | `items` (strings), optional `title` |
| `calculation` | `amount`, `result` |
| `comparison` | `itemA`, `itemB`, optional `title` |
| `formula` | `equation`, optional `variables` and `title` |
| `cta` | Optional `subtitle`, `buttonText` |

Optional scene fields include `spokenText`, `sentiment`, `intent`, and glossary/lower-third text. `spokenText` supplies text for captions; it does not synthesize speech. Set `captions: []` in direct render props to omit captions rather than loading the Studio's default subtitle file.

## Batch rendering and captions

```bash
npm run render
```

Check every script without opening a browser or rendering:

```bash
npm run validate
```

The whole batch is validated before bundling; an invalid script fails the command with its filename. Fix it before retrying.

The batch command renders every JSON script in `scripts/`. It derives captions from scene text using a fixed **350 ms per word** across the combined text. These timestamps are placeholders: they are not aligned to narration or individual scene boundaries. Review them before using a video with speech. The example script has no captions when rendered directly; the batch command creates estimated captions for it, like the other scripts.

`VideoAudio.tsx` is currently a silent placeholder. Add audio assets you have permission to use and implement the audio layer before expecting a soundtrack.

## Checks

```bash
npm test          # Input contracts and chart-coordinate regressions
npm run validate  # Check every committed example script
npm run lint      # ESLint and TypeScript
npm run build     # Bundle the composition
```

CI installs from the lockfile, runs these checks, and renders a real example frame. This checks input handling, chart edge cases, compilation and rendering; it does not measure full-video quality or caption accuracy. The Node commands use Node 22's built-in TypeScript stripping; older Node releases are unsupported.

## Layout

- `src/scenes/`: scene components.
- `src/FinanceVideo.tsx`: composition and transitions.
- `src/Root.tsx`: frame rate, canvas, and duration calculation.
- `src/lib/analyzer.ts`: keyword rules for sentiment and icons.
- `scripts/`: script examples and the batch renderer.

## License

[MIT](LICENSE) for the project code. Remotion and other dependencies have their own license terms; the project license does not replace those terms.
