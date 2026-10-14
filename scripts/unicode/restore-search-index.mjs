import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const manifestPath = path.join(root, 'data', 'sources', 'unicode-18.0.0.json');
const outputDir = path.join(root, 'public', 'data', 'search');
const outputPath = path.join(outputDir, 'unicode-18.0-search.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const releaseTag = `unicode-${manifest.unicodeVersion}`;
const baseUrl =
  `https://github.com/imran431/Universal-Character-Keyboard-Toolbox/releases/download/${releaseTag}`;
const assetUrl = `${baseUrl}/unicode-18.0-search.json`;
const checksumUrl = `${assetUrl}.sha256`;

function validatePayload(text) {
  const payload = JSON.parse(text);

  if (payload.schemaVersion !== 1) {
    throw new Error(`Unexpected search snapshot schema: ${payload.schemaVersion}`);
  }

  if (payload.unicodeVersion !== manifest.unicodeVersion) {
    throw new Error(
      `Search snapshot Unicode version ${payload.unicodeVersion} does not match manifest ${manifest.unicodeVersion}`
    );
  }

  if (!Array.isArray(payload.records) || payload.records.length < 10_000) {
    throw new Error('Search snapshot is missing the expected Unicode records.');
  }

  return payload;
}

async function fetchText(url) {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'user-agent': 'Universal-Character-Keyboard-Toolbox/0.1 snapshot-restore'
        }
      });

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      return await response.text();
    } catch (error) {
      if (attempt === maxAttempts) {
        throw new Error(
          `Failed to download ${url} after ${maxAttempts} attempts: ${error instanceof Error ? error.message : String(error)}`
        );
      }

      await new Promise((resolve) => setTimeout(resolve, attempt * 1_000));
    } finally {
      clearTimeout(timeout);
    }
  }

  throw new Error(`Failed to download ${url}`);
}

async function readExistingSnapshot() {
  try {
    const text = await readFile(outputPath, 'utf8');
    validatePayload(text);
    return text;
  } catch {
    return null;
  }
}

const existing = await readExistingSnapshot();

if (existing) {
  console.log(`Using existing Unicode ${manifest.unicodeVersion} search snapshot.`);
  process.exit(0);
}

console.log(`Restoring Unicode ${manifest.unicodeVersion} search snapshot from versioned GitHub release...`);

const [assetText, checksumText] = await Promise.all([
  fetchText(assetUrl),
  fetchText(checksumUrl)
]);

validatePayload(assetText);

const expectedHash = checksumText.trim().split(/\s+/)[0]?.toLowerCase() ?? '';
const actualHash = createHash('sha256').update(assetText).digest('hex');

if (!/^[0-9a-f]{64}$/.test(expectedHash)) {
  throw new Error('Release checksum file does not contain a valid SHA-256 digest.');
}

if (actualHash !== expectedHash) {
  throw new Error(
    `Unicode search snapshot checksum mismatch: expected ${expectedHash}, received ${actualHash}`
  );
}

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, assetText);

console.log(
  `Restored Unicode ${manifest.unicodeVersion} search snapshot and verified SHA-256 ${actualHash.slice(0, 12)}…`
);
