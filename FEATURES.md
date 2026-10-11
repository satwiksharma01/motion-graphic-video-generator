# Feature status

The [README](README.md) contains setup and render commands. This file records implemented behavior rather than a roadmap or quality guarantee.

| Area | Implemented | Limitations |
|---|---|---|
| Scene library | Hook, line chart, bar chart, graphic list, steps, calculation, comparison, formula and closing card | Long labels and every scene/transition combination have not been visually audited. Formulas are displayed as text, not typeset by a mathematics engine. |
| Rendering | React/Remotion composition, 1080 x 1920 at 30 fps, MP4 output and still frames | The committed sample demonstrates two scenes. No production throughput benchmark exists. |
| Input checks | Supported scene shapes, required fields, finite numbers and minimum scene duration | Validation does not check truthfulness, readability or financial correctness. |
| Charts | Line series including constant, zero and negative values; non-negative bars including zero | Signed bars are unsupported. Values are supplied by the author; no market-data connection exists. |
| Animation | Frame-based springs, transitions, overlays and progress indicators | Exported results still need visual review. |
| Sentiment and icons | Keyword heuristics with explicit input overrides | No language model, measured sentiment accuracy or autonomous editorial judgment. |
| Captions | Word highlighting; estimated 350 ms per word in the batch command | Not aligned to speech or individual scene boundaries. Direct renders can use supplied captions or omit them with `captions: []`. |
| Audio | Placeholder component | Narration, music selection and transition sounds are not implemented. |
| Verification | Input/chart regression tests, example validation, lint, TypeScript, bundling and a CI still render | No measured user adoption, comprehensive visual regression suite or full-video quality benchmark. |

See [engineering notes](docs/ENGINEERING.md) for decisions and reproducible evidence.
