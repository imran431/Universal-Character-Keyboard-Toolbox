import { flagshipCharacterDetails, type TypingEnvironment } from '../data/character-details';
import { allCuratedCharacters } from '../data/characters';

export interface ShortcutRecord {
  slug: string;
  character: string;
  commonName: string;
  officialName: string;
  codePoint: string;
  aliases: string[];
  environment: TypingEnvironment;
  environmentLabel: string;
  instruction: string;
  note?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  verifiedAt: string;
  href: string;
}

export interface AltCodeRecord {
  slug: string;
  character: string;
  commonName: string;
  codePoint: string;
  aliases: string[];
  digits: string;
  instruction: string;
  note?: string;
  sourceLabel?: string;
  sourceUrl?: string;
  verifiedAt: string;
  href: string;
}

const summaryBySlug = new Map(allCuratedCharacters.map((item) => [item.id, item]));

function environmentLabel(environment: TypingEnvironment) {
  if (environment === 'windows') return 'Windows';
  if (environment === 'macos') return 'macOS';
  return 'Microsoft Word';
}

export const shortcutRecords: ShortcutRecord[] = flagshipCharacterDetails.flatMap((detail) => {
  const summary = summaryBySlug.get(detail.slug);

  return detail.methods.map((method) => ({
    slug: detail.slug,
    character: detail.character,
    commonName: detail.commonName,
    officialName: detail.officialName,
    codePoint: detail.codePoint,
    aliases: summary?.aliases ?? [],
    environment: method.environment,
    environmentLabel: environmentLabel(method.environment),
    instruction: method.instruction,
    note: method.note,
    sourceLabel: method.sourceLabel,
    sourceUrl: method.sourceUrl,
    verifiedAt: method.verifiedAt,
    href: `/symbols/${detail.slug}/`
  }));
});

export const altCodeRecords: AltCodeRecord[] = shortcutRecords.flatMap((record) => {
  if (record.environment !== 'windows') return [];

  const match = record.instruction.match(/Hold Alt and type ([0-9]+) on the numeric keypad\./i);
  if (!match) return [];

  return [{
    slug: record.slug,
    character: record.character,
    commonName: record.commonName,
    codePoint: record.codePoint,
    aliases: record.aliases,
    digits: match[1],
    instruction: record.instruction,
    note: record.note,
    sourceLabel: record.sourceLabel,
    sourceUrl: record.sourceUrl,
    verifiedAt: record.verifiedAt,
    href: record.href
  }];
});
