import { parseCodePointQuery } from '../lib/character-search';

type SearchRecord = [
  codePoint: number,
  name: string,
  aliases: string,
  block: string,
  category: string
];

type NameTemplate = [
  start: number,
  end: number,
  template: string,
  block: string,
  category: string
];

interface SearchPayload {
  schemaVersion: number;
  unicodeVersion: string;
  records: SearchRecord[];
  templates: NameTemplate[];
}

interface SearchRequest {
  id: number;
  query: string;
  limit?: number;
}

interface SearchResult {
  codePoint: number;
  character: string;
  name: string;
  aliases: string[];
  block: string;
  category: string;
  score: number;
}

interface IndexedRecord {
  record: SearchRecord;
  name: string;
  aliases: string[];
  searchable: string;
}

const INDEX_URL = '/data/search/unicode-18.0-search.json';

let indexPromise: Promise<{
  records: IndexedRecord[];
  byCodePoint: Map<number, SearchRecord>;
  templates: NameTemplate[];
}> | null = null;

function normalize(value: string) {
  return value
    .normalize('NFKC')
    .trim()
    .toLocaleLowerCase()
    .replace(/[\s_-]+/g, ' ');
}

function hex(codePoint: number) {
  return codePoint.toString(16).toUpperCase().padStart(4, '0');
}

function toResult(record: SearchRecord, score: number): SearchResult {
  const [codePoint, name, aliases, block, category] = record;

  return {
    codePoint,
    character: String.fromCodePoint(codePoint),
    name,
    aliases: aliases ? aliases.split('|') : [],
    block,
    category,
    score
  };
}

async function loadIndex() {
  if (!indexPromise) {
    indexPromise = (async () => {
      const response = await fetch(INDEX_URL, { cache: 'force-cache' });
      if (!response.ok) {
        throw new Error(`Unicode search index unavailable (${response.status})`);
      }

      const payload = (await response.json()) as SearchPayload;
      if (payload.schemaVersion !== 1) {
        throw new Error('Unsupported Unicode search index schema.');
      }

      const byCodePoint = new Map<number, SearchRecord>();
      const records = payload.records.map((record) => {
        byCodePoint.set(record[0], record);

        const normalizedName = normalize(record[1]);
        const normalizedAliases = record[2]
          ? record[2].split('|').map(normalize)
          : [];
        const searchable = [
          normalizedName,
          ...normalizedAliases,
          normalize(record[3]),
          normalize(record[4])
        ]
          .filter(Boolean)
          .join(' ');

        return {
          record,
          name: normalizedName,
          aliases: normalizedAliases,
          searchable
        };
      });

      return {
        records,
        byCodePoint,
        templates: payload.templates
      };
    })();
  }

  return indexPromise;
}

function codePointFromQuery(query: string) {
  const parsed = parseCodePointQuery(query);
  if (parsed !== null) return parsed;

  const characters = Array.from(query.trim());
  if (characters.length !== 1) return null;

  return characters[0].codePointAt(0) ?? null;
}

function recordFromTemplate(codePoint: number, templates: NameTemplate[]): SearchRecord | null {
  const template = templates.find(([start, end]) => codePoint >= start && codePoint <= end);
  if (!template) return null;

  const [, , nameTemplate, block, category] = template;
  return [
    codePoint,
    nameTemplate.replace('*', hex(codePoint)),
    '',
    block,
    category
  ];
}

function codePointFromAlgorithmicName(query: string, templates: NameTemplate[]) {
  const normalizedQuery = normalize(query);

  for (const [start, end, template] of templates) {
    if (!template.includes('*')) continue;

    const normalizedTemplate = normalize(template);
    const markerIndex = normalizedTemplate.indexOf('*');
    const prefix = normalizedTemplate.slice(0, markerIndex);
    const suffix = normalizedTemplate.slice(markerIndex + 1);

    if (!normalizedQuery.startsWith(prefix) || !normalizedQuery.endsWith(suffix)) continue;

    const endIndex = suffix ? normalizedQuery.length - suffix.length : normalizedQuery.length;
    const candidate = normalizedQuery.slice(prefix.length, endIndex).trim();
    if (!/^[0-9a-f]{4,6}$/i.test(candidate)) continue;

    const codePoint = Number.parseInt(candidate, 16);
    if (codePoint >= start && codePoint <= end) return codePoint;
  }

  return null;
}

function scoreRecord(item: IndexedRecord, query: string) {
  if (item.name === query) return 1000;
  if (item.aliases.includes(query)) return 980;
  if (item.name.startsWith(query)) return 900;
  if (item.aliases.some((alias) => alias.startsWith(query))) return 880;

  const tokens = query.split(' ').filter(Boolean);
  if (tokens.length > 0 && tokens.every((token) => item.searchable.includes(token))) {
    return 700;
  }

  if (item.searchable.includes(query)) return 600;
  return 0;
}

async function search(query: string, limit: number): Promise<SearchResult[]> {
  const index = await loadIndex();
  const trimmed = query.trim();
  if (!trimmed) return [];

  const directCodePoint = codePointFromQuery(trimmed);
  if (directCodePoint !== null) {
    const explicit = index.byCodePoint.get(directCodePoint);
    const record = explicit ?? recordFromTemplate(directCodePoint, index.templates);
    return record ? [toResult(record, 2000)] : [];
  }

  const algorithmicCodePoint = codePointFromAlgorithmicName(trimmed, index.templates);
  if (algorithmicCodePoint !== null) {
    const record = recordFromTemplate(algorithmicCodePoint, index.templates);
    return record ? [toResult(record, 1900)] : [];
  }

  const normalizedQuery = normalize(trimmed);
  if (normalizedQuery.length < 2) return [];

  const matches: SearchResult[] = [];

  for (const item of index.records) {
    const score = scoreRecord(item, normalizedQuery);
    if (score === 0) continue;
    matches.push(toResult(item.record, score));
  }

  return matches
    .sort((a, b) => b.score - a.score || a.codePoint - b.codePoint)
    .slice(0, limit);
}

self.onmessage = async (event: MessageEvent<SearchRequest>) => {
  const { id, query, limit = 24 } = event.data;

  try {
    const results = await search(query, limit);
    self.postMessage({ id, ok: true, results });
  } catch (error) {
    self.postMessage({
      id,
      ok: false,
      error: error instanceof Error ? error.message : 'Unicode search failed.'
    });
  }
};
