import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, it } from "node:test";
import { getSolutionVoteCounts, recordSolutionVote } from "./solution-votes.ts";

const temporaryRoots: string[] = [];

async function makeTemporaryRoot() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "apple-cookbook-solution-votes-"));
  temporaryRoots.push(root);
  return root;
}

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => fs.rm(root, { recursive: true, force: true })));
});

describe("solution practice votes", () => {
  it("records one vote per browser id for a specific solution", async () => {
    const root = await makeTemporaryRoot();

    const first = await recordSolutionVote("article-one", "solution-one", "browser_1234567890", root);
    const duplicate = await recordSolutionVote("article-one", "solution-one", "browser_1234567890", root);
    const counts = await getSolutionVoteCounts("article-one", ["solution-one", "solution-two"], root);

    assert.deepEqual(first, { count: 1, alreadyRecorded: false });
    assert.deepEqual(duplicate, { count: 1, alreadyRecorded: true });
    assert.deepEqual(counts, { "solution-one": 1, "solution-two": 0 });
  });

  it("serializes concurrent votes without losing distinct browsers", async () => {
    const root = await makeTemporaryRoot();
    const voterIds = Array.from({ length: 20 }, (_, index) => `browser_${String(index).padStart(16, "0")}`);

    await Promise.all(voterIds.map((voterId) => recordSolutionVote("article-one", "solution-one", voterId, root)));
    const counts = await getSolutionVoteCounts("article-one", ["solution-one"], root);

    assert.equal(counts["solution-one"], voterIds.length);
  });

  it("rejects malformed public identifiers", async () => {
    const root = await makeTemporaryRoot();

    await assert.rejects(recordSolutionVote("../article", "solution-one", "browser_1234567890", root), /Invalid/);
    await assert.rejects(recordSolutionVote("article-one", "solution-one", "short", root), /Invalid/);
  });
});
