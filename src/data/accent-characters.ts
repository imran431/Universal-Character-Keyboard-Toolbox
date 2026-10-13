export interface AccentCharacter {
  character: string;
  label: string;
  base: string;
  accent: string;
  case: 'lower' | 'upper';
}

const lowerGroups: Array<{
  base: string;
  entries: Array<[character: string, accent: string]>;
}> = [
  { base: 'a', entries: [['á', 'acute'], ['à', 'grave'], ['â', 'circumflex'], ['ä', 'diaeresis'], ['ã', 'tilde'], ['å', 'ring'], ['ā', 'macron'], ['ă', 'breve'], ['ą', 'ogonek']] },
  { base: 'c', entries: [['ç', 'cedilla'], ['ć', 'acute'], ['č', 'caron'], ['ĉ', 'circumflex'], ['ċ', 'dot above']] },
  { base: 'e', entries: [['é', 'acute'], ['è', 'grave'], ['ê', 'circumflex'], ['ë', 'diaeresis'], ['ē', 'macron'], ['ĕ', 'breve'], ['ė', 'dot above'], ['ę', 'ogonek'], ['ě', 'caron']] },
  { base: 'i', entries: [['í', 'acute'], ['ì', 'grave'], ['î', 'circumflex'], ['ï', 'diaeresis'], ['ĩ', 'tilde'], ['ī', 'macron'], ['ĭ', 'breve'], ['į', 'ogonek']] },
  { base: 'n', entries: [['ñ', 'tilde'], ['ń', 'acute'], ['ň', 'caron'], ['ņ', 'cedilla']] },
  { base: 'o', entries: [['ó', 'acute'], ['ò', 'grave'], ['ô', 'circumflex'], ['ö', 'diaeresis'], ['õ', 'tilde'], ['ø', 'stroke'], ['ō', 'macron'], ['ŏ', 'breve'], ['ő', 'double acute']] },
  { base: 's', entries: [['ś', 'acute'], ['š', 'caron'], ['ş', 'cedilla'], ['ŝ', 'circumflex'], ['ș', 'comma below']] },
  { base: 'u', entries: [['ú', 'acute'], ['ù', 'grave'], ['û', 'circumflex'], ['ü', 'diaeresis'], ['ũ', 'tilde'], ['ū', 'macron'], ['ŭ', 'breve'], ['ů', 'ring'], ['ű', 'double acute'], ['ų', 'ogonek']] },
  { base: 'y', entries: [['ý', 'acute'], ['ÿ', 'diaeresis'], ['ŷ', 'circumflex']] },
  { base: 'z', entries: [['ź', 'acute'], ['ž', 'caron'], ['ż', 'dot above']] }
];

function uppercaseCharacter(character: string) {
  return character.toLocaleUpperCase();
}

const lowercase: AccentCharacter[] = lowerGroups.flatMap(({ base, entries }) =>
  entries.map(([character, accent]) => ({
    character,
    label: `${base} with ${accent}`,
    base,
    accent,
    case: 'lower' as const
  }))
);

const uppercase: AccentCharacter[] = lowercase.map((item) => ({
  character: uppercaseCharacter(item.character),
  label: `${item.base.toLocaleUpperCase()} with ${item.accent}`,
  base: item.base.toLocaleUpperCase(),
  accent: item.accent,
  case: 'upper' as const
}));

export const accentCharacters: AccentCharacter[] = [...lowercase, ...uppercase];

export const standaloneLatinCharacters: AccentCharacter[] = [
  { character: 'æ', label: 'ae ligature', base: 'ae', accent: 'ligature', case: 'lower' },
  { character: 'Æ', label: 'AE ligature', base: 'AE', accent: 'ligature', case: 'upper' },
  { character: 'œ', label: 'oe ligature', base: 'oe', accent: 'ligature', case: 'lower' },
  { character: 'Œ', label: 'OE ligature', base: 'OE', accent: 'ligature', case: 'upper' },
  { character: 'ß', label: 'sharp s', base: 's', accent: 'sharp s', case: 'lower' },
  { character: 'ð', label: 'eth', base: 'd', accent: 'eth', case: 'lower' },
  { character: 'Ð', label: 'Eth', base: 'D', accent: 'eth', case: 'upper' },
  { character: 'þ', label: 'thorn', base: 'th', accent: 'thorn', case: 'lower' },
  { character: 'Þ', label: 'Thorn', base: 'Th', accent: 'thorn', case: 'upper' },
  { character: 'ł', label: 'l with stroke', base: 'l', accent: 'stroke', case: 'lower' },
  { character: 'Ł', label: 'L with stroke', base: 'L', accent: 'stroke', case: 'upper' }
];

export const allAccentCharacters = [...accentCharacters, ...standaloneLatinCharacters];
