import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { atomicWriteText, withFileLock } from "./file-store.ts";

type SolutionVoteStore = {
  version: 1;
  votes: Record<string, string[]>;
};

const emptyStore = (): SolutionVoteStore => ({ version: 1, votes: {} });
const idPattern = /^[a-z0-9][a-z0-9._-]{0,159}$/;
const voterIdPattern = /^[A-Za-z0-9_-]{16,160}$/;

export const solutionVoteDataRoot = process.env.APPLE_COOKBOOK_DATA_DIR ?? process.cwd();

function getStorePaths(root = solutionVoteDataRoot) {
  const voteRoot = path.join(root, "solution-votes");

  return {
    voteRoot,
    storePath: path.join(voteRoot, "votes.json"),
    lockPath: path.join(voteRoot, ".votes.lock")
  };
}

function validateId(value: string, label: string) {
  if (!idPattern.test(value)) throw new Error(`Invalid ${label}.`);
}

function voteKey(articleId: string, solutionId: string) {
  validateId(articleId, "article id");
  validateId(solutionId, "solution id");
  return `${articleId}/${solutionId}`;
}

function hashVoter(articleId: string, solutionId: string, voterId: string) {
  if (!voterIdPattern.test(voterId)) throw new Error("Invalid voter id.");
  return crypto.createHash("sha256").update(`${articleId}\0${solutionId}\0${voterId}`).digest("hex");
}

async function readStore(storePath: string): Promise<SolutionVoteStore> {
  try {
    const parsed = JSON.parse(await fs.readFile(storePath, "utf8")) as Partial<SolutionVoteStore>;
    if (parsed.version !== 1 || !parsed.votes || typeof parsed.votes !== "object" || Array.isArray(parsed.votes)) {
      throw new Error("Solution vote store has an invalid shape.");
    }

    const votes: Record<string, string[]> = {};
    for (const [key, value] of Object.entries(parsed.votes)) {
      if (!Array.isArray(value) || !value.every((item) => typeof item === "string" && /^[a-f0-9]{64}$/.test(item))) {
        throw new Error("Solution vote store contains an invalid record.");
      }
      votes[key] = [...new Set(value)];
    }

    return { version: 1, votes };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return emptyStore();
    throw error;
  }
}

export function getSolutionVoteStorageUnavailableReason() {
  return process.env.VERCEL ? "当前部署环境不提供持久化实践计数存储。" : null;
}

export async function getSolutionVoteCounts(articleId: string, solutionIds: string[], root = solutionVoteDataRoot) {
  const keys = solutionIds.map((solutionId) => [solutionId, voteKey(articleId, solutionId)] as const);
  const store = await readStore(getStorePaths(root).storePath);

  return Object.fromEntries(keys.map(([solutionId, key]) => [solutionId, store.votes[key]?.length ?? 0]));
}

export async function recordSolutionVote(
  articleId: string,
  solutionId: string,
  voterId: string,
  root = solutionVoteDataRoot
) {
  const key = voteKey(articleId, solutionId);
  const voterHash = hashVoter(articleId, solutionId, voterId);
  const paths = getStorePaths(root);

  await fs.mkdir(paths.voteRoot, { recursive: true });

  return withFileLock(paths.lockPath, async () => {
    const store = await readStore(paths.storePath);
    const voters = store.votes[key] ?? [];
    const alreadyRecorded = voters.includes(voterHash);

    if (!alreadyRecorded) {
      store.votes[key] = [...voters, voterHash];
      await atomicWriteText(paths.storePath, `${JSON.stringify(store, null, 2)}\n`);
    }

    return {
      count: store.votes[key]?.length ?? voters.length,
      alreadyRecorded
    };
  });
}
