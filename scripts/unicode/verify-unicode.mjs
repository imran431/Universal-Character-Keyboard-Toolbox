import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const artifactPath = path.join(process.cwd(), 'data', 'generated', 'unicode-core.json');

let artifact;
try {
  artifact = JSON.parse(await readFile(artifactPath, 'utf8'));
} catch (error) {
  console.error('Unicode artifact is missing or invalid. Run: npm run unicode:sync');
  throw error;
}

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

assert(artifact.schemaVersion === 1, 'Unexpected Unicode artifact schema version.');
assert(artifact.unicodeVersion === '18.0.0', 'Unicode version must be 18.0.0.');
assert(Array.isArray(artifact.characters) && artifact.characters.length > 10000, 'Character collection is unexpectedly small.');
assert(Array.isArray(artifact.ranges) && artifact.ranges.length > 0, 'Unicode range records are missing.');
assert(Array.isArray(artifact.blocks) && artifact.blocks.length > 100, 'Unicode block data is unexpectedly small.');

const degree = artifact.characters.find((item) => item.codePoint === 0x00b0);
assert(Boolean(degree), 'U+00B0 is missing.');
assert(degree?.name === 'DEGREE SIGN', 'U+00B0 name does not match UnicodeData.txt.');

const allSourcesPinned = artifact.sources?.every((source) =>
  source.url.startsWith('https://www.unicode.org/Public/18.0.0/')
);
assert(Boolean(allSourcesPinned), 'One or more Unicode sources are not version-pinned.');

if (failures.length > 0) {
  console.error('Unicode verification failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('Unicode 18.0.0 artifact verified.');
  console.log(artifact.counts);
}
