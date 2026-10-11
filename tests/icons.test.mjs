import assert from "node:assert/strict";
import test from "node:test";
import { icons } from "lucide-react";
import { resolveIcon } from "../src/lib/icons.ts";
import { analyzeIcon } from "../src/lib/analyzer.ts";

test("supports current kebab-case and PascalCase icon names", () => {
  assert.equal(resolveIcon("book-open"), icons.BookOpen);
  assert.equal(resolveIcon("BookOpen"), icons.BookOpen);
});

for (const keyword of [
  "market",
  "trading",
  "portfolio",
  "inflation",
  "deflation",
  "airdrop",
  "approve",
  "fear",
  "caution",
  "question",
]) {
  test(`keyword ${keyword} resolves to a real icon rather than the fallback`, () => {
    assert.notEqual(resolveIcon(analyzeIcon(keyword)), icons.Activity);
  });
}

test("unknown names have a visible fallback", () => {
  assert.equal(resolveIcon("not-a-real-icon"), icons.Activity);
});
