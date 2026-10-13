export interface CharacterCodeRow {
  label: string;
  value: string;
}

export interface CharacterMethod {
  label: string;
  instruction: string;
  note?: string;
}

export interface CharacterDetail {
  slug: string;
  character: string;
  commonName: string;
  officialName: string;
  title: string;
  description: string;
  summary: string;
  codePoint: string;
  decimal: number;
  categoryName: string;
  categoryHref: string;
  quickAnswer: string;
  methods: CharacterMethod[];
  codes: CharacterCodeRow[];
  examples: string[];
  notes: string[];
  lookalikes: Array<{
    character: string;
    name: string;
    codePoint: string;
    explanation: string;
  }>;
  verifiedLabel: string;
}

export const degreeSignDetail: CharacterDetail = {
  slug: 'degree-sign',
  character: '°',
  commonName: 'Degree Symbol',
  officialName: 'DEGREE SIGN',
  title: 'Degree Symbol (°) — Copy, Alt Code & Shortcuts',
  description: 'Copy the degree symbol ° and see the Windows Alt code, Mac shortcut, Word method, Unicode U+00B0 and HTML/CSS/JavaScript representations.',
  summary: 'Copy the degree sign instantly, or use a verified method for common desktop environments.',
  codePoint: 'U+00B0',
  decimal: 176,
  categoryName: 'Math & Scientific Symbols',
  categoryHref: '/symbols/math/',
  quickAnswer: 'Windows: Alt + 0176 using the numeric keypad. Mac: Option + Shift + 8. Word: type 00B0, then press Alt + X.',
  methods: [
    {
      label: 'Windows',
      instruction: 'Hold Alt and type 0176 on the numeric keypad.',
      note: 'Requires a numeric keypad and application support for the Windows Alt-code method.'
    },
    {
      label: 'macOS',
      instruction: 'Press Option + Shift + 8.'
    },
    {
      label: 'Microsoft Word',
      instruction: 'Type 00B0 and then press Alt + X.'
    }
  ],
  codes: [
    { label: 'Unicode', value: 'U+00B0' },
    { label: 'Decimal', value: '176' },
    { label: 'HTML named', value: '&deg;' },
    { label: 'HTML decimal', value: '&#176;' },
    { label: 'HTML hex', value: '&#xB0;' },
    { label: 'CSS', value: '\\00B0' },
    { label: 'JavaScript', value: '\\u00B0' }
  ],
  examples: ['23°C', '74°F', '90°', '360°'],
  notes: [
    'The degree sign is commonly used for angles and temperatures.',
    'Keyboard layout and application behavior can affect shortcut methods, so direct copy remains the safest fallback.'
  ],
  lookalikes: [
    {
      character: 'º',
      name: 'Masculine Ordinal Indicator',
      codePoint: 'U+00BA',
      explanation: 'Looks similar in some fonts but is a different character used as an ordinal indicator.'
    },
    {
      character: '˚',
      name: 'Ring Above',
      codePoint: 'U+02DA',
      explanation: 'A spacing modifier letter used for ring-above notation, not a degree sign.'
    }
  ],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Typing methods are maintained separately from Unicode numeric data.'
};
