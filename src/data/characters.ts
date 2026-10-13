export interface CharacterSummary {
  id: string;
  character: string;
  name: string;
  codePoint: string;
  aliases: string[];
  category: string;
  href?: string;
}

export const featuredCharacters: CharacterSummary[] = [
  { id: 'degree-sign', character: '°', name: 'Degree Sign', codePoint: 'U+00B0', aliases: ['degree', 'degree symbol', 'temperature', 'angle'], category: 'Math & science', href: '/symbols/degree-sign/' },
  { id: 'copyright-sign', character: '©', name: 'Copyright Sign', codePoint: 'U+00A9', aliases: ['copyright', 'copyright symbol'], category: 'Legal' },
  { id: 'registered-sign', character: '®', name: 'Registered Sign', codePoint: 'U+00AE', aliases: ['registered', 'registered trademark'], category: 'Legal' },
  { id: 'trademark-sign', character: '™', name: 'Trade Mark Sign', codePoint: 'U+2122', aliases: ['trademark', 'tm'], category: 'Legal' },
  { id: 'check-mark', character: '✓', name: 'Check Mark', codePoint: 'U+2713', aliases: ['check', 'tick', 'check mark'], category: 'Status' },
  { id: 'cross-mark', character: '✗', name: 'Ballot X', codePoint: 'U+2717', aliases: ['cross', 'x mark', 'cross mark'], category: 'Status' },
  { id: 'bullet', character: '•', name: 'Bullet', codePoint: 'U+2022', aliases: ['bullet', 'dot'], category: 'Punctuation' },
  { id: 'em-dash', character: '—', name: 'Em Dash', codePoint: 'U+2014', aliases: ['em dash', 'long dash'], category: 'Punctuation' },
  { id: 'en-dash', character: '–', name: 'En Dash', codePoint: 'U+2013', aliases: ['en dash', 'dash'], category: 'Punctuation' },
  { id: 'ellipsis', character: '…', name: 'Horizontal Ellipsis', codePoint: 'U+2026', aliases: ['ellipsis', 'three dots'], category: 'Punctuation' },
  { id: 'plus-minus', character: '±', name: 'Plus-Minus Sign', codePoint: 'U+00B1', aliases: ['plus minus', 'plus or minus'], category: 'Math & science' },
  { id: 'multiplication', character: '×', name: 'Multiplication Sign', codePoint: 'U+00D7', aliases: ['multiply', 'multiplication', 'times'], category: 'Math & science' },
  { id: 'division', character: '÷', name: 'Division Sign', codePoint: 'U+00F7', aliases: ['divide', 'division'], category: 'Math & science' },
  { id: 'infinity', character: '∞', name: 'Infinity', codePoint: 'U+221E', aliases: ['infinity', 'infinite'], category: 'Math & science' },
  { id: 'pi', character: 'π', name: 'Greek Small Letter Pi', codePoint: 'U+03C0', aliases: ['pi', 'greek pi'], category: 'Greek' },
  { id: 'euro-sign', character: '€', name: 'Euro Sign', codePoint: 'U+20AC', aliases: ['euro', 'euro symbol', 'currency'], category: 'Currency' }
];
