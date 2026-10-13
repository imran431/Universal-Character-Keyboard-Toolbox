import type { CharacterSummary } from '../data/characters';

function normalizeText(value: string) {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase()
    .replace(/[\s_-]+/g, ' ');
}

function codePointHex(codePoint: number) {
  return codePoint.toString(16).toUpperCase().padStart(4, '0');
}

export function parseCodePointQuery(rawQuery: string): number | null {
  const query = rawQuery.trim();

  const patterns = [
    /^U\+([0-9A-Fa-f]{1,6})$/,
    /^0x([0-9A-Fa-f]{1,6})$/,
    /^\\u\{([0-9A-Fa-f]{1,6})\}$/,
    /^\\u([0-9A-Fa-f]{4})$/,
    /^&#x([0-9A-Fa-f]{1,6});?$/i,
  ];

  for (const pattern of patterns) {
    const match = query.match(pattern);
    if (!match) continue;
    const value = Number.parseInt(match[1], 16);
    return value <= 0x10ffff ? value : null;
  }

  const decimalEntity = query.match(/^&#([0-9]{1,7});?$/);
  if (decimalEntity) {
    const value = Number.parseInt(decimalEntity[1], 10);
    return value <= 0x10ffff ? value : null;
  }

  return null;
}

function exactSingleCodePoint(rawQuery: string): number | null {
  const query = rawQuery.trim();
  const points = Array.from(query);
  if (points.length !== 1) return null;
  return points[0].codePointAt(0) ?? null;
}

function numericCodePoint(record: CharacterSummary) {
  return Number.parseInt(record.codePoint.replace(/^U\+/i, ''), 16);
}

function scoreRecord(record: CharacterSummary, rawQuery: string) {
  const trimmed = rawQuery.trim();
  if (!trimmed) return 1;

  const query = normalizeText(trimmed);
  const name = normalizeText(record.name);
  const aliases = record.aliases.map(normalizeText);
  const category = normalizeText(record.category);
  const cp = numericCodePoint(record);

  const directPoint = exactSingleCodePoint(trimmed);
  if (directPoint !== null && directPoint === cp) return 1200;

  const parsedPoint = parseCodePointQuery(trimmed);
  if (parsedPoint !== null && parsedPoint === cp) return 1150;

  if (normalizeText(record.character) === query) return 1100;
  if (normalizeText(record.codePoint) === query) return 1050;
  if (normalizeText(codePointHex(cp)) === query) return 1025;

  if (name === query) return 1000;
  if (aliases.includes(query)) return 975;

  if (name.startsWith(query)) return 850;
  if (aliases.some((alias) => alias.startsWith(query))) return 825;

  const searchable = [name, ...aliases, category, normalizeText(record.codePoint)].join(' ');
  const tokens = query.split(' ').filter(Boolean);

  if (tokens.length > 0 && tokens.every((token) => searchable.includes(token))) {
    return 700 + Math.max(0, 50 - searchable.indexOf(query));
  }

  if (searchable.includes(query)) return 600;

  return 0;
}

export function searchCharacterRecords(records: CharacterSummary[], rawQuery: string) {
  const query = rawQuery.trim();

  if (!query) {
    return records.map((record, index) => ({ record, score: 1, index }));
  }

  return records
    .map((record, index) => ({
      record,
      score: scoreRecord(record, query),
      index,
    }))
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);
}
