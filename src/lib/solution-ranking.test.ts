import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { rankSolutionsByPractice } from "./solution-ranking.ts";

const solutions = [
  { id: "shared-low", verificationLevel: "Verified" as const },
  { id: "official-one", verificationLevel: "Official" as const },
  { id: "shared-high", verificationLevel: "Likely" as const },
  { id: "official-two", verificationLevel: "Official" as const },
  { id: "shared-tie", verificationLevel: "Unknown" as const }
];

describe("solution practice ranking", () => {
  it("keeps Apple official methods first and orders other methods by practice count", () => {
    const ranked = rankSolutionsByPractice(solutions, {
      "official-one": 1,
      "official-two": 0,
      "shared-low": 2,
      "shared-high": 8,
      "shared-tie": 2
    });

    assert.deepEqual(
      ranked.map((solution) => solution.id),
      ["official-one", "official-two", "shared-high", "shared-low", "shared-tie"]
    );
  });

  it("keeps the authored order when practice counts are tied or unavailable", () => {
    const ranked = rankSolutionsByPractice(solutions, {});

    assert.deepEqual(
      ranked.map((solution) => solution.id),
      ["official-one", "official-two", "shared-low", "shared-high", "shared-tie"]
    );
    assert.deepEqual(
      solutions.map((solution) => solution.id),
      ["shared-low", "official-one", "shared-high", "official-two", "shared-tie"]
    );
  });
});
