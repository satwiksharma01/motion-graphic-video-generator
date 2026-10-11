import type { SceneData } from "../types/schema";

type ObjectValue = Record<string, unknown>;

const object = (value: unknown): value is ObjectValue =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const finite = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value);
const text = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export function validateScenes(value: unknown): asserts value is SceneData[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("scenes must be a non-empty array");
  }
  value.forEach((scene: unknown, index) => {
    const fail = (message: string): never => {
      throw new Error(`scenes[${index}]: ${message}`);
    };
    if (!object(scene)) return fail("must be an object");
    if (
      !Number.isInteger(scene.durationInFrames) ||
      Number(scene.durationInFrames) < 30
    ) {
      fail(
        "durationInFrames must be an integer of at least 30 (one second at 30 fps)",
      );
    }
    for (const key of [
      "title",
      "spokenText",
      "iconName",
      "glossaryTerm",
      "glossaryDefinition",
      "lowerThirdText",
      "lowerThirdStatName",
      "subtitle",
      "buttonText",
    ]) {
      if (scene[key] !== undefined && typeof scene[key] !== "string")
        fail(`${key} must be a string`);
    }
    for (const [key, allowed] of Object.entries({
      sentiment: ["bullish", "bearish", "neutral"],
      intent: ["educational", "dramatic"],
      layoutVariant: ["centered", "split", "bottom"],
    })) {
      if (
        scene[key] !== undefined &&
        (typeof scene[key] !== "string" || !allowed.includes(scene[key]))
      )
        fail(`${key} must be one of ${allowed.join(", ")}`);
    }
    if (
      scene.lowerThirdStatValue !== undefined &&
      typeof scene.lowerThirdStatValue !== "string" &&
      !finite(scene.lowerThirdStatValue)
    ) {
      fail("lowerThirdStatValue must be a string or finite number");
    }
    switch (scene.type) {
      case "hook":
        if (!text(scene.title)) fail("title must be a non-empty string");
        break;
      case "linechart":
        if (
          !Array.isArray(scene.dataPoints) ||
          scene.dataPoints.length < 2 ||
          !scene.dataPoints.every(finite)
        ) {
          fail("dataPoints must contain at least two finite numbers");
        }
        break;
      case "barchart":
        if (
          !Array.isArray(scene.dataPoints) ||
          scene.dataPoints.length === 0 ||
          !scene.dataPoints.every(
            (point: unknown) =>
              object(point) &&
              text(point.label) &&
              finite(point.value) &&
              point.value >= 0,
          )
        ) {
          fail("dataPoints must contain labelled, non-negative finite values");
        }
        break;
      case "graphiclist":
        if (
          !Array.isArray(scene.items) ||
          scene.items.length === 0 ||
          !scene.items.every(
            (item: unknown) =>
              object(item) &&
              text(item.label) &&
              (item.icon === undefined || typeof item.icon === "string"),
          )
        ) {
          fail(
            "items must contain objects with a non-empty label and optional string icon",
          );
        }
        break;
      case "steps":
        if (
          !Array.isArray(scene.items) ||
          scene.items.length === 0 ||
          !scene.items.every(text)
        )
          fail("items must contain non-empty strings");
        break;
      case "calculation":
        if (!finite(scene.amount) || !finite(scene.result))
          fail("amount and result must be finite numbers");
        break;
      case "comparison":
        for (const key of ["itemA", "itemB"]) {
          const item = scene[key];
          if (
            !object(item) ||
            !text(item.label) ||
            !(text(item.value) || finite(item.value)) ||
            (item.description !== undefined &&
              typeof item.description !== "string")
          ) {
            fail(
              `${key} needs a label, string or finite numeric value, and optional string description`,
            );
          }
        }
        break;
      case "formula":
        if (!text(scene.equation)) fail("equation must be a non-empty string");
        if (
          scene.variables !== undefined &&
          (!object(scene.variables) ||
            !Object.values(scene.variables).every(
              (entry) => typeof entry === "string",
            ))
        )
          fail("variables must map names to strings");
        break;
      case "cta":
        break;
      default:
        fail(`unsupported type ${JSON.stringify(scene.type)}`);
    }
  });
}
