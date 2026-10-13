export interface CharacterCodeRow {
  label: string;
  value: string;
}

export type TypingEnvironment = 'windows' | 'macos' | 'word';

export interface CharacterMethod {
  environment: TypingEnvironment;
  scope: 'os' | 'app';
  verifiedAt: string;
  label: string;
  instruction: string;
  note?: string;
  sourceLabel?: string;
  sourceUrl?: string;
}

export interface CharacterSource {
  label: string;
  url: string;
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
  sources: CharacterSource[];
  verifiedLabel: string;
}

const unicodeSource: CharacterSource = {
  label: 'Unicode Character Database 18.0.0',
  url: 'https://www.unicode.org/Public/18.0.0/ucd/UnicodeData.txt'
};

const microsoftUnicodeSource: CharacterSource = {
  label: 'Microsoft Support — Insert ASCII or Unicode character codes in Word',
  url: 'https://support.microsoft.com/en-us/word/insert-ascii-or-unicode-character-codes-in-word'
};

const microsoftWordShortcutsSource: CharacterSource = {
  label: 'Microsoft Support — Keyboard shortcuts in Word',
  url: 'https://support.microsoft.com/en-us/accessibility/word-keyboard-shortcuts-in-word'
};

const appleCharacterViewerSource: CharacterSource = {
  label: 'Apple Support — Mac keyboard shortcuts',
  url: 'https://support.apple.com/en-us/102650'
};

function standardCodes(
  codePoint: string,
  decimal: number,
  options: { htmlNamed?: string } = {}
): CharacterCodeRow[] {
  const hex = codePoint.replace('U+', '');

  return [
    { label: 'Unicode', value: codePoint },
    { label: 'Decimal', value: String(decimal) },
    ...(options.htmlNamed ? [{ label: 'HTML named', value: options.htmlNamed }] : []),
    { label: 'HTML decimal', value: `&#${decimal};` },
    { label: 'HTML hex', value: `&#x${hex};` },
    { label: 'CSS', value: `\\${hex}` },
    { label: 'JavaScript', value: `\\u${hex.padStart(4, '0')}` }
  ];
}

function wordUnicodeMethod(hex: string): CharacterMethod {
  return {
    label: 'Microsoft Word',
    environment: 'word',
    scope: 'app',
    verifiedAt: '2026-10-14',
    instruction: `Type ${hex}, then press Alt + X.`,
    note: 'Word converts a supported hexadecimal Unicode code to the character.',
    sourceLabel: microsoftUnicodeSource.label,
    sourceUrl: microsoftUnicodeSource.url
  };
}

function macCharacterViewerMethod(): CharacterMethod {
  return {
    label: 'macOS',
    environment: 'macos',
    scope: 'os',
    verifiedAt: '2026-10-14',
    instruction: 'Press Fn/Globe + E, or choose Edit > Emoji & Symbols, then search for the character in Character Viewer.',
    note: 'Apple also documents Control + Command + Space on supported macOS versions and keyboard configurations.',
    sourceLabel: appleCharacterViewerSource.label,
    sourceUrl: appleCharacterViewerSource.url
  };
}

function windowsCharacterMapMethod(): CharacterMethod {
  return {
    label: 'Windows',
    environment: 'windows',
    scope: 'os',
    verifiedAt: '2026-10-14',
    instruction: 'Open Character Map, find the character, then select and copy it.',
    note: 'This avoids relying on an Alt code when a character does not have a documented portable Alt-code method.',
    sourceLabel: microsoftUnicodeSource.label,
    sourceUrl: microsoftUnicodeSource.url
  };
}

export const degreeSignDetail: CharacterDetail = {
  slug: 'degree-sign',
  character: '°',
  commonName: 'Degree Symbol',
  officialName: 'DEGREE SIGN',
  title: 'Degree Symbol (°) — Copy, Alt Code & Shortcuts',
  description: 'Copy the degree symbol ° and see the Windows Alt code, Mac character method, Word method, Unicode U+00B0 and developer representations.',
  summary: 'Copy the degree sign instantly, or use a verified method for common desktop environments.',
  codePoint: 'U+00B0',
  decimal: 176,
  categoryName: 'Math & Scientific Symbols',
  categoryHref: '/symbols/math/',
  quickAnswer: 'Windows: Alt + 0176 using the numeric keypad. Word: type 00B0, then press Alt + X. On Mac, Character Viewer is a documented fallback for symbols.',
  methods: [
    {
      label: 'Windows',
    environment: 'windows',
    scope: 'os',
    verifiedAt: '2026-10-14',
      instruction: 'Hold Alt and type 0176 on the numeric keypad.',
      note: 'Microsoft documents Alt+0176 for the degree sign; Num Lock and a numeric keypad are required for this method.',
      sourceLabel: microsoftUnicodeSource.label,
      sourceUrl: microsoftUnicodeSource.url
    },
    wordUnicodeMethod('00B0'),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+00B0', 176, { htmlNamed: '&deg;' }),
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
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Typing methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const copyrightSignDetail: CharacterDetail = {
  slug: 'copyright-sign',
  character: '©',
  commonName: 'Copyright Symbol',
  officialName: 'COPYRIGHT SIGN',
  title: 'Copyright Symbol (©) — Copy, Alt Code & Shortcuts',
  description: 'Copy the copyright symbol © and see its Windows Alt code, Word method, Mac Character Viewer method, Unicode U+00A9 and web codes.',
  summary: 'Copy the copyright symbol instantly or use a verified Windows, Word, or Mac insertion method.',
  codePoint: 'U+00A9',
  decimal: 169,
  categoryName: 'Legal & Business Symbols',
  categoryHref: '/symbols/legal/',
  quickAnswer: 'Windows: Alt + 0169 on the numeric keypad. In Word, typing (C) is a documented shortcut. On Mac, open Character Viewer and search for copyright.',
  methods: [
    {
      label: 'Windows',
    environment: 'windows',
    scope: 'os',
    verifiedAt: '2026-10-14',
      instruction: 'Hold Alt and type 0169 on the numeric keypad.',
      note: 'Microsoft lists Alt+0169 for the copyright symbol.',
      sourceLabel: microsoftUnicodeSource.label,
      sourceUrl: microsoftUnicodeSource.url
    },
    {
      label: 'Microsoft Word',
    environment: 'word',
    scope: 'app',
    verifiedAt: '2026-10-14',
      instruction: 'Type (C) to insert the copyright symbol.',
      note: 'Microsoft lists this as a Word special-character shortcut.',
      sourceLabel: microsoftWordShortcutsSource.label,
      sourceUrl: microsoftWordShortcutsSource.url
    },
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+00A9', 169, { htmlNamed: '&copy;' }),
  examples: ['© 2026', '© Example Company', 'Copyright ©'],
  notes: [
    'The copyright sign is commonly placed before a year or rights-holder name.',
    'Using the actual © character is different from typing the letter C inside parentheses.'
  ],
  lookalikes: [
    {
      character: 'ⓒ',
      name: 'Circled Latin Small Letter C',
      codePoint: 'U+24D2',
      explanation: 'A circled letter C, not the copyright sign.'
    }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, microsoftWordShortcutsSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Desktop typing methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const registeredSignDetail: CharacterDetail = {
  slug: 'registered-sign',
  character: '®',
  commonName: 'Registered Symbol',
  officialName: 'REGISTERED SIGN',
  title: 'Registered Symbol (®) — Copy, Alt Code & Shortcuts',
  description: 'Copy the registered symbol ® and see its Windows Alt code, Word shortcut, Mac Character Viewer method, Unicode U+00AE and web codes.',
  summary: 'Copy the registered sign instantly or use a verified Windows, Word, or Mac insertion method.',
  codePoint: 'U+00AE',
  decimal: 174,
  categoryName: 'Legal & Business Symbols',
  categoryHref: '/symbols/legal/',
  quickAnswer: 'Windows: Alt + 0174 on the numeric keypad. In Word: Ctrl + Alt + R. On Mac, use Character Viewer and search for registered.',
  methods: [
    {
      label: 'Windows',
    environment: 'windows',
    scope: 'os',
    verifiedAt: '2026-10-14',
      instruction: 'Hold Alt and type 0174 on the numeric keypad.',
      note: 'Microsoft lists Alt+0174 for the registered sign.',
      sourceLabel: microsoftUnicodeSource.label,
      sourceUrl: microsoftUnicodeSource.url
    },
    {
      label: 'Microsoft Word',
    environment: 'word',
    scope: 'app',
    verifiedAt: '2026-10-14',
      instruction: 'Press Ctrl + Alt + R.',
      note: 'Microsoft documents this shortcut for the registered trademark symbol in Word.',
      sourceLabel: microsoftWordShortcutsSource.label,
      sourceUrl: microsoftWordShortcutsSource.url
    },
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+00AE', 174, { htmlNamed: '&reg;' }),
  examples: ['Brand®', 'Product®', 'Registered ®'],
  notes: [
    'The registered sign is distinct from the trademark sign ™.',
    'Its legal use depends on trademark-registration rules in the relevant jurisdiction; this page only covers the character itself.'
  ],
  lookalikes: [
    {
      character: 'Ⓡ',
      name: 'Circled Latin Capital Letter R',
      codePoint: 'U+24C7',
      explanation: 'A circled letter R, not the registered sign.'
    },
    {
      character: '™',
      name: 'Trade Mark Sign',
      codePoint: 'U+2122',
      explanation: 'A separate trademark character with different meaning and code point.'
    }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, microsoftWordShortcutsSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Desktop typing methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const trademarkSignDetail: CharacterDetail = {
  slug: 'trademark-sign',
  character: '™',
  commonName: 'Trademark Symbol',
  officialName: 'TRADE MARK SIGN',
  title: 'Trademark Symbol (™) — Copy, Alt Code & Shortcuts',
  description: 'Copy the trademark symbol ™ and see its Windows Alt code, Word shortcut, Mac Character Viewer method, Unicode U+2122 and web codes.',
  summary: 'Copy the trademark sign instantly or use a verified Windows, Word, or Mac insertion method.',
  codePoint: 'U+2122',
  decimal: 8482,
  categoryName: 'Legal & Business Symbols',
  categoryHref: '/symbols/legal/',
  quickAnswer: 'Windows: Alt + 0153 on the numeric keypad. In Word: Ctrl + Alt + T. On Mac, use Character Viewer and search for trademark.',
  methods: [
    {
      label: 'Windows',
    environment: 'windows',
    scope: 'os',
    verifiedAt: '2026-10-14',
      instruction: 'Hold Alt and type 0153 on the numeric keypad.',
      note: 'Microsoft lists Alt+0153 for the trademark sign.',
      sourceLabel: microsoftUnicodeSource.label,
      sourceUrl: microsoftUnicodeSource.url
    },
    {
      label: 'Microsoft Word',
    environment: 'word',
    scope: 'app',
    verifiedAt: '2026-10-14',
      instruction: 'Press Ctrl + Alt + T.',
      note: 'Microsoft documents this shortcut for the trademark symbol in Word.',
      sourceLabel: microsoftWordShortcutsSource.label,
      sourceUrl: microsoftWordShortcutsSource.url
    },
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+2122', 8482, { htmlNamed: '&trade;' }),
  examples: ['Brand™', 'Product™', 'Trademark ™'],
  notes: [
    'The trademark sign is a distinct Unicode character from the registered sign ®.',
    'This page explains the character and input methods, not trademark-law requirements.'
  ],
  lookalikes: [
    {
      character: '®',
      name: 'Registered Sign',
      codePoint: 'U+00AE',
      explanation: 'A different symbol used for registered marks.'
    },
    {
      character: '℠',
      name: 'Service Mark',
      codePoint: 'U+2120',
      explanation: 'A separate service-mark character.'
    }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, microsoftWordShortcutsSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Desktop typing methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const euroSignDetail: CharacterDetail = {
  slug: 'euro-sign',
  character: '€',
  commonName: 'Euro Symbol',
  officialName: 'EURO SIGN',
  title: 'Euro Symbol (€) — Copy, Alt Code & Keyboard Methods',
  description: 'Copy the euro symbol € and see its Windows Alt code, Word Unicode method, Mac Character Viewer method, Unicode U+20AC and web codes.',
  summary: 'Copy the euro sign instantly or use a verified Windows, Word, or Mac insertion method.',
  codePoint: 'U+20AC',
  decimal: 8364,
  categoryName: 'Currency Symbols',
  categoryHref: '/symbols/currency/',
  quickAnswer: 'Windows: Alt + 0128 on the numeric keypad. In Word: type 20AC, then press Alt + X. On Mac, search for euro in Character Viewer.',
  methods: [
    {
      label: 'Windows',
    environment: 'windows',
    scope: 'os',
    verifiedAt: '2026-10-14',
      instruction: 'Hold Alt and type 0128 on the numeric keypad.',
      note: 'Microsoft documents Alt+0128 for the euro sign.',
      sourceLabel: microsoftUnicodeSource.label,
      sourceUrl: microsoftUnicodeSource.url
    },
    wordUnicodeMethod('20AC'),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+20AC', 8364, { htmlNamed: '&euro;' }),
  examples: ['€10', '€99.95', 'EUR €'],
  notes: [
    'The euro sign is the currency symbol associated with the euro.',
    'Spacing and number formatting conventions vary by locale.'
  ],
  lookalikes: [
    {
      character: 'Є',
      name: 'Cyrillic Capital Letter Ukrainian IE',
      codePoint: 'U+0404',
      explanation: 'A Cyrillic letter that can look similar in some typefaces.'
    }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Desktop typing methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const emDashDetail: CharacterDetail = {
  slug: 'em-dash',
  character: '—',
  commonName: 'Em Dash',
  officialName: 'EM DASH',
  title: 'Em Dash (—) — Copy, Unicode & Keyboard Shortcut',
  description: 'Copy an em dash — and see the Microsoft Word shortcut, Word Unicode method, Mac Character Viewer method, Unicode U+2014 and web codes.',
  summary: 'Copy an em dash instantly or use a verified Word or Mac insertion method.',
  codePoint: 'U+2014',
  decimal: 8212,
  categoryName: 'Punctuation & Typography',
  categoryHref: '/symbols/punctuation/',
  quickAnswer: 'In Word: Ctrl + Alt + Minus on the numeric keypad. You can also type 2014 then Alt + X. On Mac, search for em dash in Character Viewer.',
  methods: [
    {
      label: 'Microsoft Word shortcut',
      environment: 'word',
      scope: 'app',
      verifiedAt: '2026-10-14',
      instruction: 'Press Ctrl + Alt + Minus on the numeric keypad.',
      note: 'Microsoft documents this as the Word shortcut for inserting an em dash.',
      sourceLabel: microsoftWordShortcutsSource.label,
      sourceUrl: microsoftWordShortcutsSource.url
    },
    wordUnicodeMethod('2014'),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+2014', 8212, { htmlNamed: '&mdash;' }),
  examples: ['word—word', 'A clear pause—without parentheses.', '2025—2026'],
  notes: [
    'An em dash is longer than a hyphen and en dash in typical typography.',
    'Style guides differ on whether spaces should surround an em dash.'
  ],
  lookalikes: [
    {
      character: '–',
      name: 'En Dash',
      codePoint: 'U+2013',
      explanation: 'Usually shorter than an em dash and commonly used for ranges.'
    },
    {
      character: '-',
      name: 'Hyphen-Minus',
      codePoint: 'U+002D',
      explanation: 'The keyboard hyphen-minus is a different character.'
    },
    {
      character: '―',
      name: 'Horizontal Bar',
      codePoint: 'U+2015',
      explanation: 'A separate dash-like punctuation character.'
    }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, microsoftWordShortcutsSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const checkMarkDetail: CharacterDetail = {
  slug: 'check-mark',
  character: '✓',
  commonName: 'Check Mark',
  officialName: 'CHECK MARK',
  title: 'Check Mark (✓) — Copy, Unicode & Keyboard Methods',
  description: 'Copy the check mark ✓ and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+2713 and web codes.',
  summary: 'Copy the check mark instantly or use a verified Unicode-character insertion method.',
  codePoint: 'U+2713',
  decimal: 10003,
  categoryName: 'Check Marks & Status Symbols',
  categoryHref: '/symbols/status/',
  quickAnswer: 'In Word: type 2713, then press Alt + X. On Windows you can also use Character Map. On Mac, search for check mark in Character Viewer.',
  methods: [
    wordUnicodeMethod('2713'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+2713', 10003),
  examples: ['✓ Done', '✓ Approved', 'Item ✓'],
  notes: [
    'CHECK MARK U+2713 is different from HEAVY CHECK MARK U+2714.',
    'Emoji-style check marks such as ✅ are different Unicode characters and may render in color.'
  ],
  lookalikes: [
    {
      character: '✔',
      name: 'Heavy Check Mark',
      codePoint: 'U+2714',
      explanation: 'A heavier check-mark character with its own code point.'
    },
    {
      character: '✅',
      name: 'White Heavy Check Mark',
      codePoint: 'U+2705',
      explanation: 'An emoji-style check mark that often renders with a colored box.'
    },
    {
      character: '√',
      name: 'Square Root',
      codePoint: 'U+221A',
      explanation: 'A mathematical radical sign, not a check mark.'
    }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const rightArrowDetail: CharacterDetail = {
  slug: 'right-arrow',
  character: '→',
  commonName: 'Right Arrow Symbol',
  officialName: 'RIGHTWARDS ARROW',
  title: 'Right Arrow (→) — Copy, Unicode & Keyboard Methods',
  description: 'Copy the right arrow → and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+2192 and web codes.',
  summary: 'Copy a right arrow instantly or use a verified Unicode-character insertion method.',
  codePoint: 'U+2192',
  decimal: 8594,
  categoryName: 'Arrow Symbols',
  categoryHref: '/symbols/arrows/',
  quickAnswer: 'In Word: type 2192, then press Alt + X. On Windows use Character Map when needed. On Mac, search for rightwards arrow in Character Viewer.',
  methods: [
    wordUnicodeMethod('2192'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+2192', 8594, { htmlNamed: '&rarr;' }),
  examples: ['A → B', 'Next →', 'Input → Output'],
  notes: [
    'RIGHTWARDS ARROW U+2192 is a general right-pointing arrow character.',
    'There are many related arrow characters for double arrows, long arrows, hooks and mathematical relations.'
  ],
  lookalikes: [
    {
      character: '⇒',
      name: 'Rightwards Double Arrow',
      codePoint: 'U+21D2',
      explanation: 'A double-line arrow often used for implication.'
    },
    {
      character: '➜',
      name: 'Heavy Round-Tipped Rightwards Arrow',
      codePoint: 'U+279C',
      explanation: 'A heavier decorative arrow with a different code point.'
    }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const enDashDetail: CharacterDetail = {
  slug: 'en-dash',
  character: '–',
  commonName: 'En Dash',
  officialName: 'EN DASH',
  title: 'En Dash (–) — Copy, Unicode & Keyboard Methods',
  description: 'Copy an en dash – and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+2013 and web codes.',
  summary: 'Copy an en dash instantly or use a verified Unicode-character insertion method.',
  codePoint: 'U+2013',
  decimal: 8211,
  categoryName: 'Punctuation & Typography',
  categoryHref: '/symbols/punctuation/',
  quickAnswer: 'In Word: type 2013, then press Alt + X. On Windows, Character Map is a documented fallback. On Mac, search for en dash in Character Viewer.',
  methods: [
    wordUnicodeMethod('2013'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+2013', 8211, { htmlNamed: '&ndash;' }),
  examples: ['2019–2026', 'pages 10–20', 'New York–London'],
  notes: [
    'An en dash is commonly used for ranges and some relationships between paired terms.',
    'It is a different Unicode character from the hyphen-minus and em dash.'
  ],
  lookalikes: [
    { character: '-', name: 'Hyphen-Minus', codePoint: 'U+002D', explanation: 'The ordinary keyboard hyphen is shorter and has a different code point.' },
    { character: '—', name: 'Em Dash', codePoint: 'U+2014', explanation: 'Usually longer and often used for sentence-level punctuation.' }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const ellipsisDetail: CharacterDetail = {
  slug: 'ellipsis',
  character: '…',
  commonName: 'Ellipsis Symbol',
  officialName: 'HORIZONTAL ELLIPSIS',
  title: 'Ellipsis (…) — Copy, Unicode & Keyboard Methods',
  description: 'Copy the ellipsis character … and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+2026 and web codes.',
  summary: 'Copy the single-character ellipsis instantly or insert it through a verified Unicode method.',
  codePoint: 'U+2026',
  decimal: 8230,
  categoryName: 'Punctuation & Typography',
  categoryHref: '/symbols/punctuation/',
  quickAnswer: 'In Word: type 2026, then press Alt + X. On Windows use Character Map when needed. On Mac, search for horizontal ellipsis in Character Viewer.',
  methods: [
    wordUnicodeMethod('2026'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+2026', 8230, { htmlNamed: '&hellip;' }),
  examples: ['Wait…', 'One, two, three…', 'Continue…'],
  notes: [
    'HORIZONTAL ELLIPSIS U+2026 is one Unicode character.',
    'Three periods (...) are visually similar text but are three separate characters.'
  ],
  lookalikes: [
    { character: '...', name: 'Three Full Stops', codePoint: 'U+002E × 3', explanation: 'Three separate period characters, not U+2026.' }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const plusMinusDetail: CharacterDetail = {
  slug: 'plus-minus',
  character: '±',
  commonName: 'Plus-Minus Symbol',
  officialName: 'PLUS-MINUS SIGN',
  title: 'Plus-Minus Symbol (±) — Copy, Unicode & Codes',
  description: 'Copy the plus-minus symbol ± and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+00B1 and web codes.',
  summary: 'Copy the plus-minus sign instantly or insert it through a verified Unicode-character method.',
  codePoint: 'U+00B1',
  decimal: 177,
  categoryName: 'Math & Scientific Symbols',
  categoryHref: '/symbols/math/',
  quickAnswer: 'In Word: type 00B1, then press Alt + X. On Windows use Character Map. On Mac, search for plus-minus in Character Viewer.',
  methods: [
    wordUnicodeMethod('00B1'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+00B1', 177, { htmlNamed: '&plusmn;' }),
  examples: ['10 ± 2', '±5%', '20°C ± 1°C'],
  notes: [
    'The plus-minus sign is used where both positive and negative variation or alternatives are relevant.',
    'It is a single Unicode character, not a plus and minus typed separately.'
  ],
  lookalikes: [
    { character: '∓', name: 'Minus-Or-Plus Sign', codePoint: 'U+2213', explanation: 'A distinct mathematical symbol with reversed sign order.' }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const infinityDetail: CharacterDetail = {
  slug: 'infinity',
  character: '∞',
  commonName: 'Infinity Symbol',
  officialName: 'INFINITY',
  title: 'Infinity Symbol (∞) — Copy, Unicode & Keyboard Methods',
  description: 'Copy the infinity symbol ∞ and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+221E and web codes.',
  summary: 'Copy the infinity symbol instantly or insert it through a verified Unicode-character method.',
  codePoint: 'U+221E',
  decimal: 8734,
  categoryName: 'Math & Scientific Symbols',
  categoryHref: '/symbols/math/',
  quickAnswer: 'In Word: type 221E, then press Alt + X. On Windows use Character Map. On Mac, search for infinity in Character Viewer.',
  methods: [
    wordUnicodeMethod('221E'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+221E', 8734, { htmlNamed: '&infin;' }),
  examples: ['∞', '0 → ∞', '−∞ to +∞'],
  notes: [
    'INFINITY U+221E is the standard Unicode infinity symbol.',
    'Some fonts render it with noticeably different proportions.'
  ],
  lookalikes: [
    { character: '♾', name: 'Permanent Paper Sign', codePoint: 'U+267E', explanation: 'A separate symbol that may look like an infinity mark and can have emoji presentation.' }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const bulletDetail: CharacterDetail = {
  slug: 'bullet',
  character: '•',
  commonName: 'Bullet Symbol',
  officialName: 'BULLET',
  title: 'Bullet Symbol (•) — Copy, Unicode & Keyboard Methods',
  description: 'Copy the bullet symbol • and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+2022 and web codes.',
  summary: 'Copy a bullet instantly or insert it through a verified Unicode-character method.',
  codePoint: 'U+2022',
  decimal: 8226,
  categoryName: 'Punctuation & Typography',
  categoryHref: '/symbols/punctuation/',
  quickAnswer: 'In Word: type 2022, then press Alt + X. On Windows use Character Map. On Mac, search for bullet in Character Viewer.',
  methods: [
    wordUnicodeMethod('2022'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+2022', 8226, { htmlNamed: '&bull;' }),
  examples: ['• Item one', 'Item • Item', '•'],
  notes: [
    'BULLET U+2022 is a typographic bullet character.',
    'List formatting in editors may generate bullets automatically without inserting this exact character into source text.'
  ],
  lookalikes: [
    { character: '·', name: 'Middle Dot', codePoint: 'U+00B7', explanation: 'A smaller centered dot with different semantics.' },
    { character: '●', name: 'Black Circle', codePoint: 'U+25CF', explanation: 'A geometric circle that is usually larger and heavier.' }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const poundSignDetail: CharacterDetail = {
  slug: 'pound-sign',
  character: '£',
  commonName: 'Pound Symbol',
  officialName: 'POUND SIGN',
  title: 'Pound Symbol (£) — Copy, Unicode & Keyboard Methods',
  description: 'Copy the pound symbol £ and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+00A3 and web codes.',
  summary: 'Copy the pound sign instantly or insert it through a verified Unicode-character method.',
  codePoint: 'U+00A3',
  decimal: 163,
  categoryName: 'Currency Symbols',
  categoryHref: '/symbols/currency/',
  quickAnswer: 'In Word: type 00A3, then press Alt + X. On Windows use Character Map. On Mac, search for pound sign in Character Viewer.',
  methods: [
    wordUnicodeMethod('00A3'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+00A3', 163, { htmlNamed: '&pound;' }),
  examples: ['£10', '£99.95', 'GBP £'],
  notes: [
    'POUND SIGN U+00A3 is commonly used for pound sterling amounts.',
    'Currency formatting and spacing conventions depend on locale and context.'
  ],
  lookalikes: [
    { character: '₤', name: 'Lira Sign', codePoint: 'U+20A4', explanation: 'A separate historical currency-sign character.' }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const yenSignDetail: CharacterDetail = {
  slug: 'yen-sign',
  character: '¥',
  commonName: 'Yen Symbol',
  officialName: 'YEN SIGN',
  title: 'Yen Symbol (¥) — Copy, Unicode & Keyboard Methods',
  description: 'Copy the yen symbol ¥ and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+00A5 and web codes.',
  summary: 'Copy the yen sign instantly or insert it through a verified Unicode-character method.',
  codePoint: 'U+00A5',
  decimal: 165,
  categoryName: 'Currency Symbols',
  categoryHref: '/symbols/currency/',
  quickAnswer: 'In Word: type 00A5, then press Alt + X. On Windows use Character Map. On Mac, search for yen sign in Character Viewer.',
  methods: [
    wordUnicodeMethod('00A5'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+00A5', 165, { htmlNamed: '&yen;' }),
  examples: ['¥1000', '¥9,800', 'JPY ¥'],
  notes: [
    'YEN SIGN U+00A5 is used for Japanese yen and can also appear in contexts involving Chinese yuan.',
    'Fonts and locale conventions can affect glyph shape and spacing.'
  ],
  lookalikes: [
    { character: '￥', name: 'Fullwidth Yen Sign', codePoint: 'U+FFE5', explanation: 'A fullwidth compatibility form used in East Asian typography.' }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const indianRupeeDetail: CharacterDetail = {
  slug: 'indian-rupee-sign',
  character: '₹',
  commonName: 'Indian Rupee Symbol',
  officialName: 'INDIAN RUPEE SIGN',
  title: 'Indian Rupee Symbol (₹) — Copy, Unicode & Codes',
  description: 'Copy the Indian rupee symbol ₹ and see its Word Unicode method, Windows Character Map method, Mac Character Viewer method, Unicode U+20B9 and web codes.',
  summary: 'Copy the Indian rupee sign instantly or insert it through a verified Unicode-character method.',
  codePoint: 'U+20B9',
  decimal: 8377,
  categoryName: 'Currency Symbols',
  categoryHref: '/symbols/currency/',
  quickAnswer: 'In Word: type 20B9, then press Alt + X. On Windows use Character Map. On Mac, search for Indian rupee in Character Viewer.',
  methods: [
    wordUnicodeMethod('20B9'),
    windowsCharacterMapMethod(),
    macCharacterViewerMethod()
  ],
  codes: standardCodes('U+20B9', 8377),
  examples: ['₹100', '₹1,999', 'INR ₹'],
  notes: [
    'INDIAN RUPEE SIGN U+20B9 is the Unicode character used for the Indian rupee symbol.',
    'The generic RUPEE SIGN ₨ is a different Unicode character.'
  ],
  lookalikes: [
    { character: '₨', name: 'Rupee Sign', codePoint: 'U+20A8', explanation: 'A different rupee-sign character used in other contexts.' }
  ],
  sources: [unicodeSource, microsoftUnicodeSource, appleCharacterViewerSource],
  verifiedLabel: 'Unicode identity and code values verified against Unicode 18.0. Word, Windows, and Mac insertion methods were checked against Microsoft and Apple support documentation in October 2026.'
};

export const flagshipCharacterDetails = [
  degreeSignDetail,
  copyrightSignDetail,
  registeredSignDetail,
  trademarkSignDetail,
  euroSignDetail,
  emDashDetail,
  checkMarkDetail,
  rightArrowDetail,
  enDashDetail,
  ellipsisDetail,
  plusMinusDetail,
  infinityDetail,
  bulletDetail,
  poundSignDetail,
  yenSignDetail,
  indianRupeeDetail
];
