export interface AccentCharacter {
  character: string;
  label: string;
  base: string;
  accent: string;
  case: 'lower' | 'upper';
  languages: string[];
}

export const accentLanguages = [
  'French',
  'Spanish',
  'German',
  'Portuguese',
  'Italian',
  'Polish',
  'Czech'
] as const;

const combiningAccentNames = new Map<number, string>([
  [0x0300, 'grave'],
  [0x0301, 'acute'],
  [0x0302, 'circumflex'],
  [0x0303, 'tilde'],
  [0x0304, 'macron'],
  [0x0306, 'breve'],
  [0x0307, 'dot above'],
  [0x0308, 'diaeresis'],
  [0x0309, 'hook above'],
  [0x030a, 'ring above'],
  [0x030b, 'double acute'],
  [0x030c, 'caron'],
  [0x030f, 'double grave'],
  [0x0311, 'inverted breve'],
  [0x031b, 'horn'],
  [0x0323, 'dot below'],
  [0x0324, 'diaeresis below'],
  [0x0325, 'ring below'],
  [0x0326, 'comma below'],
  [0x0327, 'cedilla'],
  [0x0328, 'ogonek'],
  [0x032d, 'circumflex below'],
  [0x032e, 'breve below'],
  [0x0330, 'tilde below'],
  [0x0331, 'macron below']
]);

const languageCharacterSets: Record<(typeof accentLanguages)[number], Set<string>> = {
  French: new Set(Array.from('àâäçéèêëîïôœùûüÿ')),
  Spanish: new Set(Array.from('áéíñóúü')),
  German: new Set(Array.from('äöüß')),
  Portuguese: new Set(Array.from('áàâãçéêíóôõú')),
  Italian: new Set(Array.from('àèéìíîòóùú')),
  Polish: new Set(Array.from('ąćęłńóśźż')),
  Czech: new Set(Array.from('áčďéěíňóřšťúůýž'))
};

function languagesForCharacter(character: string) {
  const lower = character.toLocaleLowerCase();
  return accentLanguages.filter((language) => languageCharacterSets[language].has(lower));
}

function practicalLabel(base: string, accent: string, letterCase: 'lower' | 'upper') {
  const displayBase = letterCase === 'upper' ? base.toLocaleUpperCase() : base;
  return `${displayBase} with ${accent}`;
}

function generatedAccentCharacters(): AccentCharacter[] {
  const output: AccentCharacter[] = [];
  const ranges: Array<[number, number]> = [
    [0x00c0, 0x024f],
    [0x1e00, 0x1eff]
  ];

  for (const [start, end] of ranges) {
    for (let codePoint = start; codePoint <= end; codePoint += 1) {
      const character = String.fromCodePoint(codePoint);
      const decomposed = character.normalize('NFD');
      const parts = Array.from(decomposed);
      const baseCharacter = parts[0] ?? '';
      const marks = parts.slice(1);

      if (
        marks.length === 0 ||
        !/^[A-Za-z]$/.test(baseCharacter) ||
        !marks.every((mark) => combiningAccentNames.has(mark.codePointAt(0) ?? -1))
      ) {
        continue;
      }

      const letterCase: 'lower' | 'upper' =
        baseCharacter === baseCharacter.toLocaleUpperCase() ? 'upper' : 'lower';
      const base = baseCharacter.toLocaleLowerCase();
      const accent = marks
        .map((mark) => combiningAccentNames.get(mark.codePointAt(0) ?? -1))
        .filter((value): value is string => Boolean(value))
        .join(' + ');

      output.push({
        character,
        label: practicalLabel(base, accent, letterCase),
        base,
        accent,
        case: letterCase,
        languages: languagesForCharacter(character)
      });
    }
  }

  return output;
}

type ManualAccentEntry = [
  character: string,
  label: string,
  base: string,
  accent: string,
  letterCase: 'lower' | 'upper'
];

const manualEntries: ManualAccentEntry[] = [
  ['æ', 'ae ligature', 'a', 'ligature ae', 'lower'],
  ['Æ', 'AE ligature', 'a', 'ligature ae', 'upper'],
  ['œ', 'oe ligature', 'o', 'ligature oe', 'lower'],
  ['Œ', 'OE ligature', 'o', 'ligature oe', 'upper'],
  ['ß', 'sharp s', 's', 'sharp s', 'lower'],
  ['ẞ', 'capital sharp s', 's', 'sharp s', 'upper'],
  ['ð', 'eth', 'd', 'eth', 'lower'],
  ['Ð', 'Eth', 'd', 'eth', 'upper'],
  ['þ', 'thorn', 't', 'thorn', 'lower'],
  ['Þ', 'Thorn', 't', 'thorn', 'upper'],
  ['ı', 'dotless i', 'i', 'dotless', 'lower'],
  ['ⱥ', 'a with stroke', 'a', 'stroke', 'lower'],
  ['Ⱥ', 'A with stroke', 'a', 'stroke', 'upper'],
  ['ƀ', 'b with stroke', 'b', 'stroke', 'lower'],
  ['Ƀ', 'B with stroke', 'b', 'stroke', 'upper'],
  ['ɓ', 'b with hook', 'b', 'hook', 'lower'],
  ['Ɓ', 'B with hook', 'b', 'hook', 'upper'],
  ['ƃ', 'b with topbar', 'b', 'topbar', 'lower'],
  ['Ƃ', 'B with topbar', 'b', 'topbar', 'upper'],
  ['ȼ', 'c with stroke', 'c', 'stroke', 'lower'],
  ['Ȼ', 'C with stroke', 'c', 'stroke', 'upper'],
  ['ƈ', 'c with hook', 'c', 'hook', 'lower'],
  ['Ƈ', 'C with hook', 'c', 'hook', 'upper'],
  ['đ', 'd with stroke', 'd', 'stroke', 'lower'],
  ['Đ', 'D with stroke', 'd', 'stroke', 'upper'],
  ['ƌ', 'd with topbar', 'd', 'topbar', 'lower'],
  ['Ƌ', 'D with topbar', 'd', 'topbar', 'upper'],
  ['ɗ', 'd with hook', 'd', 'hook', 'lower'],
  ['Ɗ', 'D with hook', 'd', 'hook', 'upper'],
  ['ɇ', 'e with stroke', 'e', 'stroke', 'lower'],
  ['Ɇ', 'E with stroke', 'e', 'stroke', 'upper'],
  ['ƒ', 'f with hook', 'f', 'hook', 'lower'],
  ['Ƒ', 'F with hook', 'f', 'hook', 'upper'],
  ['ǥ', 'g with stroke', 'g', 'stroke', 'lower'],
  ['Ǥ', 'G with stroke', 'g', 'stroke', 'upper'],
  ['ɠ', 'g with hook', 'g', 'hook', 'lower'],
  ['Ɠ', 'G with hook', 'g', 'hook', 'upper'],
  ['ħ', 'h with stroke', 'h', 'stroke', 'lower'],
  ['Ħ', 'H with stroke', 'h', 'stroke', 'upper'],
  ['ⱨ', 'h with hook', 'h', 'hook', 'lower'],
  ['Ⱨ', 'H with hook', 'h', 'hook', 'upper'],
  ['ɨ', 'i with stroke', 'i', 'stroke', 'lower'],
  ['Ɨ', 'I with stroke', 'i', 'stroke', 'upper'],
  ['ɉ', 'j with stroke', 'j', 'stroke', 'lower'],
  ['Ɉ', 'J with stroke', 'j', 'stroke', 'upper'],
  ['ƙ', 'k with hook', 'k', 'hook', 'lower'],
  ['Ƙ', 'K with hook', 'k', 'hook', 'upper'],
  ['ⱪ', 'k with descender', 'k', 'descender', 'lower'],
  ['Ⱪ', 'K with descender', 'k', 'descender', 'upper'],
  ['ł', 'l with stroke', 'l', 'stroke', 'lower'],
  ['Ł', 'L with stroke', 'l', 'stroke', 'upper'],
  ['ŀ', 'l with middle dot', 'l', 'middle dot', 'lower'],
  ['Ŀ', 'L with middle dot', 'l', 'middle dot', 'upper'],
  ['ø', 'o with stroke', 'o', 'stroke', 'lower'],
  ['Ø', 'O with stroke', 'o', 'stroke', 'upper'],
  ['ƥ', 'p with hook', 'p', 'hook', 'lower'],
  ['Ƥ', 'P with hook', 'p', 'hook', 'upper'],
  ['ᵽ', 'p with stroke', 'p', 'stroke', 'lower'],
  ['Ᵽ', 'P with stroke', 'p', 'stroke', 'upper'],
  ['ɋ', 'q with hook tail', 'q', 'hook tail', 'lower'],
  ['Ɋ', 'Q with hook tail', 'q', 'hook tail', 'upper'],
  ['ɍ', 'r with stroke', 'r', 'stroke', 'lower'],
  ['Ɍ', 'R with stroke', 'r', 'stroke', 'upper'],
  ['ŧ', 't with stroke', 't', 'stroke', 'lower'],
  ['Ŧ', 'T with stroke', 't', 'stroke', 'upper'],
  ['ƭ', 't with hook', 't', 'hook', 'lower'],
  ['Ƭ', 'T with hook', 't', 'hook', 'upper'],
  ['ʉ', 'u with bar', 'u', 'bar', 'lower'],
  ['Ʉ', 'U with bar', 'u', 'bar', 'upper'],
  ['ʋ', 'v with hook', 'v', 'hook', 'lower'],
  ['Ʋ', 'V with hook', 'v', 'hook', 'upper'],
  ['ⱳ', 'w with hook', 'w', 'hook', 'lower'],
  ['Ⱳ', 'W with hook', 'w', 'hook', 'upper'],
  ['ɏ', 'y with stroke', 'y', 'stroke', 'lower'],
  ['Ɏ', 'Y with stroke', 'y', 'stroke', 'upper'],
  ['ƴ', 'y with hook', 'y', 'hook', 'lower'],
  ['Ƴ', 'Y with hook', 'y', 'hook', 'upper'],
  ['ƶ', 'z with stroke', 'z', 'stroke', 'lower'],
  ['Ƶ', 'Z with stroke', 'z', 'stroke', 'upper'],
  ['ȥ', 'z with hook', 'z', 'hook', 'lower'],
  ['Ȥ', 'Z with hook', 'z', 'hook', 'upper']
];

const specialLatinCharacters: AccentCharacter[] = manualEntries.map(
  ([character, label, base, accent, letterCase]) => ({
    character,
    label,
    base,
    accent,
    case: letterCase,
    languages: languagesForCharacter(character)
  })
);

const deduped = new Map<string, AccentCharacter>();

for (const item of [...generatedAccentCharacters(), ...specialLatinCharacters]) {
  deduped.set(item.character, item);
}

export const allAccentCharacters = [...deduped.values()].sort((a, b) =>
  a.base.localeCompare(b.base) ||
  a.accent.localeCompare(b.accent) ||
  a.case.localeCompare(b.case) ||
  a.character.localeCompare(b.character)
);

export const accentCharacters = allAccentCharacters;
export const standaloneLatinCharacters = specialLatinCharacters;
