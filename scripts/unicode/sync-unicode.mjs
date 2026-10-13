import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const manifestPath = path.join(root, 'data', 'sources', 'unicode-18.0.0.json');
const outputDir = path.join(root, 'data', 'generated');
const outputPath = path.join(outputDir, 'unicode-core.json');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));

async function download(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'Universal-Character-Keyboard-Toolbox/0.1 data-sync'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function parseUnicodeData(text) {
  const characters = [];
  const ranges = [];

  let openRange = null;

  for (const rawLine of text.split(/\r?\n/)) {
    if (!rawLine) continue;

    const fields = rawLine.split(';');
    if (fields.length < 15) continue;

    const codePoint = Number.parseInt(fields[0], 16);
    const name = fields[1];
    const record = {
      codePoint,
      hex: fields[0],
      name,
      generalCategory: fields[2],
      canonicalCombiningClass: Number.parseInt(fields[3], 10),
      bidiClass: fields[4],
      decomposition: fields[5] || null,
      decimalDigit: fields[6] || null,
      digit: fields[7] || null,
      numeric: fields[8] || null,
      mirrored: fields[9] === 'Y',
      unicode1Name: fields[10] || null,
      simpleUppercase: fields[12] || null,
      simpleLowercase: fields[13] || null,
      simpleTitlecase: fields[14] || null
    };

    if (/^<.+, First>$/.test(name)) {
      openRange = record;
      continue;
    }

    if (/^<.+, Last>$/.test(name) && openRange) {
      ranges.push({
        start: openRange.codePoint,
        end: codePoint,
        label: openRange.name.replace(/, First>$/, '>'),
        generalCategory: openRange.generalCategory,
        bidiClass: openRange.bidiClass
      });
      openRange = null;
      continue;
    }

    characters.push(record);
  }

  return { characters, ranges };
}

function parseNameAliases(text) {
  const aliases = {};

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, '').trim();
    if (!line) continue;

    const [hex, alias, type] = line.split(';').map((part) => part.trim());
    if (!hex || !alias) continue;

    const key = Number.parseInt(hex, 16);
    aliases[key] ??= [];
    aliases[key].push({ alias, type: type || 'alias' });
  }

  return aliases;
}

function parseBlocks(text) {
  const blocks = [];

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*/, '').trim();
    if (!line) continue;

    const [range, name] = line.split(';').map((part) => part.trim());
    if (!range || !name) continue;

    const [start, end] = range.split('..');
    blocks.push({
      start: Number.parseInt(start, 16),
      end: Number.parseInt(end ?? start, 16),
      name
    });
  }

  return blocks;
}

function sourceById(id) {
  const source = manifest.sources.find((item) => item.id === id);
  if (!source) throw new Error(`Missing source ${id} in manifest`);
  return source;
}

console.log(`Syncing Unicode ${manifest.unicodeVersion} authoritative data...`);

const [unicodeText, aliasesText, blocksText] = await Promise.all([
  download(sourceById('unicode-data').url),
  download(sourceById('name-aliases').url),
  download(sourceById('blocks').url)
]);

const unicodeData = parseUnicodeData(unicodeText);
const aliases = parseNameAliases(aliasesText);
const blocks = parseBlocks(blocksText);

const artifact = {
  schemaVersion: 1,
  unicodeVersion: manifest.unicodeVersion,
  releaseDate: manifest.releaseDate,
  generatedAt: new Date().toISOString(),
  license: manifest.license,
  sources: manifest.sources,
  counts: {
    individuallyListedCharacters: unicodeData.characters.length,
    ranges: unicodeData.ranges.length,
    aliasCodePoints: Object.keys(aliases).length,
    blocks: blocks.length
  },
  characters: unicodeData.characters,
  ranges: unicodeData.ranges,
  aliases,
  blocks
};

await mkdir(outputDir, { recursive: true });
await writeFile(outputPath, JSON.stringify(artifact));

console.log(`Wrote ${path.relative(root, outputPath)}`);
console.log(artifact.counts);
console.log('Note: UnicodeData range entries remain explicit ranges at this stage.');
