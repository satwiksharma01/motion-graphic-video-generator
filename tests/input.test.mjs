import assert from "node:assert/strict";
import { readFileSync, readdirSync, writeFileSync, unlinkSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { validateScenes } from "../src/lib/validate-input.ts";
import { lineChartPoints } from "../src/lib/chart-scale.ts";

const validScenes = [
  { type: "hook", title: "Example" },
  { type: "linechart", dataPoints: [-5, 0, 5] },
  { type: "barchart", dataPoints: [{ label: "A", value: 0 }] },
  { type: "graphiclist", items: [{ label: "A", icon: "chart-line" }] },
  { type: "steps", items: ["First"] },
  { type: "calculation", amount: 0, result: 10 },
  {
    type: "comparison",
    itemA: { label: "A", value: 0 },
    itemB: { label: "B", value: "10%" },
  },
  { type: "formula", equation: "F = ma", variables: { m: "mass" } },
  { type: "cta" },
].map((scene) => ({ durationInFrames: 120, ...scene }));

test("all nine scene types accept their documented fields", () => {
  assert.doesNotThrow(() => validateScenes(validScenes));
});

for (const [name, scenes, message] of [
  ["empty timeline", [], /non-empty array/],
  ["missing timeline", undefined, /non-empty array/],
  [
    "unknown scene",
    [{ type: "typo", durationInFrames: 120 }],
    /unsupported type/,
  ],
  ["null scene", [null], /must be an object/],
  [
    "short transition scene",
    [{ ...validScenes[0], durationInFrames: 10 }],
    /at least 30/,
  ],
  [
    "fractional duration",
    [{ ...validScenes[0], durationInFrames: 30.5 }],
    /integer/,
  ],
  ["empty title", [{ ...validScenes[0], title: " " }], /title/],
  [
    "one line-chart point",
    [{ ...validScenes[1], dataPoints: [0] }],
    /two finite/,
  ],
  [
    "non-finite value",
    [{ ...validScenes[1], dataPoints: [0, Infinity] }],
    /finite/,
  ],
  [
    "negative bar",
    [{ ...validScenes[2], dataPoints: [{ label: "A", value: -1 }] }],
    /non-negative/,
  ],
  ["missing list label", [{ ...validScenes[3], items: [{}] }], /label/],
  ["wrong step shape", [{ ...validScenes[4], items: [{}] }], /strings/],
  ["numeric string amount", [{ ...validScenes[5], amount: "10" }], /finite/],
  ["missing comparison", [{ ...validScenes[6], itemB: undefined }], /itemB/],
  [
    "invalid variables",
    [{ ...validScenes[7], variables: { m: 10 } }],
    /variables/,
  ],
  [
    "invalid sentiment",
    [{ ...validScenes[0], sentiment: "unknown" }],
    /sentiment/,
  ],
  ["numeric spoken text", [{ ...validScenes[0], spokenText: 1 }], /spokenText/],
]) {
  test(`reject ${name} with a useful location`, () => {
    assert.throws(() => validateScenes(scenes), message);
    if (Array.isArray(scenes) && scenes.length)
      assert.throws(() => validateScenes(scenes), /scenes\[0\]/);
  });
}

for (const values of [
  [0, 0],
  [-5, -5],
  [-10, -5, -1],
  [-3, 0, 3],
  [2, 4],
]) {
  test(`line chart remains finite and within bounds for ${JSON.stringify(values)}`, () => {
    const points = lineChartPoints(values, 800, 500);
    for (const point of points) {
      assert.ok(Number.isFinite(point.x) && Number.isFinite(point.y));
      assert.ok(
        point.x >= 0 && point.x <= 800 && point.y >= 0 && point.y <= 500,
      );
    }
    assert.equal(points[0].x, 0);
    assert.equal(points.at(-1).x, 800);
    if (values[0] < values.at(-1)) assert.ok(points[0].y > points.at(-1).y);
  });
}

test("every committed JSON script satisfies the same render contract", () => {
  const dir = new URL("../scripts/", import.meta.url);
  for (const name of readdirSync(dir).filter((name) =>
    name.endsWith(".json"),
  )) {
    const input = JSON.parse(readFileSync(new URL(name, dir), "utf8"));
    assert.doesNotThrow(() => validateScenes(input.scenes), name);
  }
});

for (const [name, content] of [
  ["invalid JSON", "{"],
  ["invalid scene", '{"scenes":[{"type":"typo","durationInFrames":120}]}'],
]) {
  test(`batch command fails before bundling for ${name}`, () => {
    const filename = `__invalid-test-${process.pid}.json`;
    const fixture = new URL(`../scripts/${filename}`, import.meta.url);
    try {
      writeFileSync(fixture, content);
      const result = spawnSync(
        process.execPath,
        [
          "--experimental-strip-types",
          "scripts/parse-and-render.mjs",
          "--check",
        ],
        {
          cwd: fileURLToPath(new URL("../", import.meta.url)),
          encoding: "utf8",
          timeout: 30000,
        },
      );
      assert.equal(result.status, 1, result.stderr);
      assert.ok(result.stderr.includes(filename));
      assert.ok(!result.stdout.includes("Bundling"));
    } finally {
      unlinkSync(fixture);
    }
  });
}
