import { flagshipCharacterDetails, type TypingEnvironment } from '../data/character-details';
import { allCuratedCharacters } from '../data/characters';
import { reviewedWindowsAltCodes } from '../data/windows-alt-codes';

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
  href?: string;
}

const summaryBySlug = new Map(allCuratedCharacters.map((item) => [item.id, item]));
const summaryByCharacter = new Map(allCuratedCharacters.map((item) => [item.character, item]));

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

const derivedAltCodes: AltCodeRecord[] = shortcutRecords.flatMap((record) => {
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

const altCodeByCharacter = new Map<string, AltCodeRecord>(
  derivedAltCodes.map((record) => [record.character, record])
);

for (const record of reviewedWindowsAltCodes) {
  const summary = summaryByCharacter.get(record.character);
  const existing = altCodeByCharacter.get(record.character);

  altCodeByCharacter.set(record.character, {
    slug: existing?.slug ?? summary?.id ?? `alt-${record.codePoint.toLowerCase().replace('+', '-')}`,
    character: record.character,
    commonName: existing?.commonName ?? summary?.name ?? record.name,
    codePoint: record.codePoint,
    aliases: [...new Set([
      ...(existing?.aliases ?? []),
      ...(summary?.aliases ?? []),
      ...record.aliases
    ])],
    digits: record.digits,
    instruction: `Hold Alt and type ${record.digits} on the numeric keypad.`,
    note: 'Microsoft documents this four-digit Windows Alt code; use the numeric keypad rather than the top number row.',
    sourceLabel: record.sourceLabel,
    sourceUrl: record.sourceUrl,
    verifiedAt: record.verifiedAt,
    href: existing?.href ?? summary?.href
  });
}

export const altCodeRecords: AltCodeRecord[] = [...altCodeByCharacter.values()]
  .sort((a, b) => a.commonName.localeCompare(b.commonName));
