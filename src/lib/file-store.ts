import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

export type FileLockOptions = {
  timeoutMs?: number;
  staleMs?: number;
  retryDelayMs?: number;
};

const defaultLockOptions = {
  timeoutMs: 5_000,
  staleMs: 120_000,
  retryDelayMs: 25
} satisfies Required<FileLockOptions>;

function isErrno(error: unknown, code: string) {
  return (error as NodeJS.ErrnoException).code === code;
}

async function delay(milliseconds: number) {
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function readLockToken(lockPath: string) {
  try {
    const owner = JSON.parse(await fs.readFile(path.join(lockPath, "owner.json"), "utf8")) as { token?: string };
    return owner.token ?? null;
  } catch {
    return null;
  }
}

async function removeStaleLock(lockPath: string, staleMs: number) {
  let lockStat;

  try {
    lockStat = await fs.stat(lockPath);
  } catch (error) {
    if (isErrno(error, "ENOENT")) return;
    throw error;
  }

  if (Date.now() - lockStat.mtimeMs <= staleMs) return;

  const observedToken = await readLockToken(lockPath);
  let currentStat;

  try {
    currentStat = await fs.stat(lockPath);
  } catch (error) {
    if (isErrno(error, "ENOENT")) return;
    throw error;
  }

  const currentToken = await readLockToken(lockPath);

  // A changed owner means another process reclaimed the path while it was inspected.
  if (
    lockStat.ino !== currentStat.ino ||
    observedToken !== currentToken ||
    Date.now() - currentStat.mtimeMs <= staleMs
  ) {
    return;
  }

  const stalePath = `${lockPath}.stale-${process.pid}-${crypto.randomUUID()}`;

  try {
    await fs.rename(lockPath, stalePath);
    await fs.rm(stalePath, { recursive: true, force: true });
  } catch (error) {
    if (!isErrno(error, "ENOENT")) throw error;
  }
}

/**
 * Serializes a short read-modify-write operation across Node processes.
 *
 * The lock is represented by a directory created with mkdir. All writers that
 * touch the same store, including remote maintenance jobs, must use the exact
 * same lock path. Keep the callback short so stale recovery remains exceptional.
 */
export async function withFileLock<T>(
  lockPath: string,
  callback: () => Promise<T>,
  options: FileLockOptions = {}
): Promise<T> {
  const { timeoutMs, staleMs, retryDelayMs } = { ...defaultLockOptions, ...options };
  const startedAt = Date.now();
  const token = crypto.randomUUID();

  await fs.mkdir(path.dirname(lockPath), { recursive: true });

  while (true) {
    try {
      await fs.mkdir(lockPath, { mode: 0o700 });
    } catch (error) {
      if (!isErrno(error, "EEXIST")) throw error;

      await removeStaleLock(lockPath, staleMs);

      if (Date.now() - startedAt >= timeoutMs) {
        throw new Error(`Timed out waiting for file lock: ${lockPath}`);
      }

      const jitter = Math.floor(Math.random() * Math.max(1, retryDelayMs));
      await delay(retryDelayMs + jitter);
      continue;
    }

    try {
      await fs.writeFile(
        path.join(lockPath, "owner.json"),
        JSON.stringify({ token, pid: process.pid, acquiredAt: new Date().toISOString() }),
        { encoding: "utf8", flag: "wx", mode: 0o600 }
      );
      break;
    } catch (error) {
      await fs.rm(lockPath, { recursive: true, force: true }).catch(() => undefined);
      throw error;
    }
  }

  try {
    return await callback();
  } finally {
    // Do not remove a replacement lock if this holder was reclaimed as stale.
    if ((await readLockToken(lockPath)) === token) {
      await fs.rm(lockPath, { recursive: true, force: true });
    }
  }
}

/** Replaces a text file atomically with a same-directory temp file + rename. */
export async function atomicWriteText(filePath: string, content: string) {
  const directory = path.dirname(filePath);
  const tempPath = path.join(directory, `.${path.basename(filePath)}.${process.pid}.${crypto.randomUUID()}.tmp`);
  let handle: fs.FileHandle | undefined;

  await fs.mkdir(directory, { recursive: true });

  try {
    handle = await fs.open(tempPath, "wx", 0o600);
    await handle.writeFile(content, "utf8");
    await handle.sync();
    await handle.close();
    handle = undefined;
    await fs.rename(tempPath, filePath);
  } finally {
    await handle?.close().catch(() => undefined);
    await fs.rm(tempPath, { force: true }).catch(() => undefined);
  }
}
