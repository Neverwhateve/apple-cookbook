# Feedback Recovery Operations

Apple Cookbook keeps website feedback in a single-host file store. This document covers three safe maintenance operations: a read-only live-store consistency check, a point-in-time backup, and an offline snapshot integrity check. It does not define a restore procedure or a database migration.

## Data contract

The maintenance tool observes these files under `APPLE_COOKBOOK_DATA_DIR`:

- `feedback/inbox.jsonl`: intake source of truth and active queue.
- `feedback/archive.jsonl`: resolved or dismissed queue partition.
- `feedback/synced-github-issues.txt`: rebuildable GitHub synchronization markers.
- `todos/daily-work.md`: rebuildable human-readable projection.

Doctor and backup reuse the application's mkdir lock at `feedback/.queue.lock`. A backup reads every file, computes its manifest, and atomically publishes the snapshot directory while holding that same lock. It never edits the four source files.

Backup always acquires this lock, even when the data directory has not received its first submission yet. This prevents a first backup from racing with the first write. Doctor avoids creating an empty store when no feedback or todo directory exists; once a store exists, its content reads are locked too.

Snapshot verification is deliberately separate: it reads only the snapshot path passed with `--snapshot`, never acquires the live queue lock, and never modifies either the snapshot or the live data directory.

## Diagnose consistency

Run the doctor against the production data directory, not the Git checkout:

```bash
APPLE_COOKBOOK_DATA_DIR=/var/lib/apple-cookbook \
  node --experimental-strip-types scripts/feedback-recovery.ts doctor
```

Use `--json` for monitoring or automation:

```bash
node --experimental-strip-types scripts/feedback-recovery.ts doctor \
  --data-dir /var/lib/apple-cookbook \
  --json
```

The CLI ignores a standalone `--`, so package-manager argument forwarding is also safe, for example `... doctor -- --json`.

Exit code `0` means no consistency errors were found. Warnings, such as an out-of-date `daily-work.md` projection, do not change the exit code. Exit code `1` means the queue needs human review. Diagnostics contain counts, issue codes, filenames, and line numbers only; malformed records and submission content are never echoed.

The doctor detects at least:

- invalid JSONL or structurally invalid feedback records;
- duplicate ids within a queue;
- the same id appearing in both inbox and archive;
- unknown statuses or feedback kinds;
- duplicate or orphaned GitHub synchronization markers;
- active records in archive, terminal records in inbox, and missing daily-work projection entries.

The doctor does not repair data. Take a snapshot before any manual intervention.

## Create an atomic snapshot

Store backups outside the application checkout and outside the live data directory:

```bash
node --experimental-strip-types scripts/feedback-recovery.ts backup \
  --data-dir /var/lib/apple-cookbook \
  --output /var/backups/apple-cookbook-feedback
```

The default directory name includes a UTC timestamp. A controlled job may provide a portable name:

```bash
node --experimental-strip-types scripts/feedback-recovery.ts backup \
  --data-dir /var/lib/apple-cookbook \
  --output /var/backups/apple-cookbook-feedback \
  --name before-feedback-maintenance-20260713 \
  --json
```

The tool refuses to overwrite an existing snapshot. It writes to a private sibling temporary directory, syncs file contents, and renames the completed directory into place. Snapshot directories use owner-only permissions by default, and copied data files use mode `0600`.

Each snapshot contains the source files that existed plus `manifest.json`. Missing source files are explicitly recorded with `present: false`. For every present file, the manifest records byte length and a SHA-256 digest. It also records only the error and warning counts from the consistency check; it does not add feedback content or absolute source paths to the manifest.

Example digest verification on macOS:

```bash
shasum -a 256 /var/backups/apple-cookbook-feedback/feedback-snapshot-*/feedback/inbox.jsonl
```

Compare the output with the `feedback/inbox.jsonl` entry in that snapshot's `manifest.json`.

## Verify a snapshot offline

Verify every snapshot before moving it to durable storage and again before designing a manual restore:

```bash
node --experimental-strip-types scripts/feedback-recovery.ts verify \
  --snapshot /var/backups/apple-cookbook-feedback/before-feedback-maintenance-20260713
```

For automation, request a PII-safe JSON report:

```bash
node --experimental-strip-types scripts/feedback-recovery.ts verify \
  --snapshot /var/backups/apple-cookbook-feedback/before-feedback-maintenance-20260713 \
  --json
```

A standalone `--` is ignored, including `verify -- --snapshot PATH --json`. Exit code `0` means the snapshot structure and all declared digests match. Permission findings are warnings and do not change that exit code. Exit code `1` means the snapshot must not be treated as a verified recovery source.

Verification is strict and read-only. It checks:

- exact `formatVersion: 1` manifest fields and value types;
- one manifest entry for each of the four controlled paths, with no duplicates;
- rejection of absolute, non-canonical, unknown, or path-traversing manifest paths;
- rejection of symbolic links and non-regular filesystem entries without following them;
- exact agreement between `present` flags and the snapshot layout;
- rejection of undeclared files or directories, while treating the required top-level `manifest.json` as manifest metadata rather than a backed-up data file;
- byte length and SHA-256 agreement for every present data file.

The verifier reports only fixed controlled paths, issue codes, and counts. It never prints feedback contents, malformed manifest values, symlink targets, or unexpected filenames. On Unix-like systems it warns when verified files or directories permit group/other access; this remains a warning because permission semantics vary across filesystems and operating systems.

Verification proves that a snapshot matches its own manifest. It does not prove that the source queue was semantically healthy—the manifest's `health` summary and a live `doctor` run serve that separate purpose—and it does not perform a restore.

## Operational boundaries

- Keep snapshots encrypted and access-controlled because the copied queue may contain contact details.
- Run offline `verify` after copying a snapshot; a successful digest check can detect incomplete transfer or later modification.
- Copy snapshots to separate durable storage and apply a retention policy outside this tool.
- Do not edit or delete `.queue.lock`; stale-lock recovery is handled by the shared file-store implementation.
- Do not run multiple writable Apple Cookbook hosts against the same directory. This lock is designed for one host.
- Restore is deliberately not automated. A restore must define service downtime, ownership and permissions, manifest verification, rollback, and projection rebuilding before implementation.
- Move to SQLite for a single writable host or an external transactional database before horizontal write scaling. That migration is outside the scope of these commands.
