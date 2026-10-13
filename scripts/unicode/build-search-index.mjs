import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { gzipSync } from 'node:zlib';

const root = process.cwd();
const inputPath = path.join(root, 'data', 'generated', 'unicode-core.json');
const outputDir = path.join(root, 'public', 'data', 'search');
const outputPath = path.join(outputDir, 'unicode-18.0-search.json');
const gzipBudgetBytes = 1_500_000;

const artifact = JSON.parse(await readFile(inputPath, 'utf8'));

function findBlock(codePoint) {
  let low = 0;
  let high = artifact.blocks.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const block = artifact.blocks[mid];

    if (codePoint < block.start) {
      high = mid - 1;
    } else if (codePoint > block.end) {
      low = mid + 1;
    } else {
      return block.name;
    }
  }

  return '';
}

const explicitCategory = new Map(
  artifact.characters.map((item) => [item.codePoint, item.generalCategory])
);

function findGeneralCategory(codePoint) {
  const explicit = explicitCategory.get(codePoint);
  if (explicit) return explicit;

  for (const range of artifact.ranges) {
    if (codePoint >= range.start && codePoint <= range.end) {
      return range.generalCategory;
    }
  }

  return '';
}

const records = artifact.derivedNames.map(({ codePoint, name }) => {
  const aliasList = (artifact.aliases[String(codePoint)] ?? []).map((item) => item.alias);
  return [
    codePoint,
    name,
    aliasList.join('|'),
    findBlock(codePoint),
    findGeneralCategory(codePoint)
  ];
});

const templates = artifact.derivedNameRanges.map(({ start, end, template }) => [
  start,
  end,
  template,
  findBlock(start),
  findGeneralCategory(start)
]);

const payload = {
  schemaVersion: 1,
  unicodeVersion: artifact.unicodeVersion,
  generatedAt: artifact.generatedAt,
  source: 'Unicode Character Database 18.0.0',
  records,
  templates
};

const json = JSON.stringify(payload);
const rawBytes = Buffer.byteLength(json);
const gzipBytes = gzipSync(json).byteLength;

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, json);

console.log(`Wrote ${path.relative(root, outputPath)}`);
console.log({
  records: records.length,
  algorithmicNameRanges: templates.length,
  rawBytes,
  gzipBytes
});

if (gzipBytes > gzipBudgetBytes) {
  console.error(
    `Search asset exceeds gzip budget: ${gzipBytes} > ${gzipBudgetBytes} bytes.`
  );
  process.exitCode = 1;
}
