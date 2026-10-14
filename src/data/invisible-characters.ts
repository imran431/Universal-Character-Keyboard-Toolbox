export interface InvisibleCharacter {
  character: string;
  label: string;
  shortLabel: string;
  codePoint: string;
  description: string;
}

export const invisibleCharacters: InvisibleCharacter[] = [
  {
    character: '\u00A0',
    label: 'No-Break Space',
    shortLabel: 'NBSP',
    codePoint: 'U+00A0',
    description: 'A normal-width space that prevents the usual line break between adjacent text.'
  },
  {
    character: '\u2002',
    label: 'En Space',
    shortLabel: 'EN SPACE',
    codePoint: 'U+2002',
    description: 'A fixed-width typographic space that is nominally half of an em.'
  },
  {
    character: '\u2003',
    label: 'Em Space',
    shortLabel: 'EM SPACE',
    codePoint: 'U+2003',
    description: 'A fixed-width typographic space that is nominally one em.'
  },
  {
    character: '\u2009',
    label: 'Thin Space',
    shortLabel: 'THIN',
    codePoint: 'U+2009',
    description: 'A narrow typographic space, commonly around one-fifth to one-sixth of an em.'
  },
  {
    character: '\u200A',
    label: 'Hair Space',
    shortLabel: 'HAIR',
    codePoint: 'U+200A',
    description: 'An extremely narrow typographic space, thinner than a thin space.'
  },
  {
    character: '\u200B',
    label: 'Zero Width Space',
    shortLabel: 'ZWSP',
    codePoint: 'U+200B',
    description: 'A zero-width character that can mark a word or line-break opportunity.'
  },
  {
    character: '\u202F',
    label: 'Narrow No-Break Space',
    shortLabel: 'NNBSP',
    codePoint: 'U+202F',
    description: 'A narrow spacing character that also prevents a normal line break.'
  },
  {
    character: '\u2060',
    label: 'Word Joiner',
    shortLabel: 'WJ',
    codePoint: 'U+2060',
    description: 'A zero-width character used to prevent a line break between adjoining text.'
  }
];
