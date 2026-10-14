export interface CharacterSummary {
  id: string;
  character: string;
  name: string;
  codePoint: string;
  aliases: string[];
  category: string;
  categorySlug: string;
  href?: string;
}

export interface CharacterCategory {
  slug: string;
  name: string;
  shortName: string;
  title: string;
  description: string;
  intro: string;
}

export const characterCategories: CharacterCategory[] = [
  {
    slug: 'math',
    name: 'Math & Scientific Symbols',
    shortName: 'Math & science',
    title: 'Math Symbols — Copy, Paste & Unicode Codes',
    description: 'Copy common math and scientific symbols including plus-minus, infinity, square root, comparison signs and the degree symbol.',
    intro: 'Common mathematical and scientific notation for calculations, equations, measurements and technical writing.'
  },
  {
    slug: 'currency',
    name: 'Currency Symbols',
    shortName: 'Currency',
    title: 'Currency Symbols — Copy, Paste & Unicode Codes',
    description: 'Copy common currency symbols including dollar, euro, pound, yen, rupee, won, ruble and cent signs with Unicode code points.',
    intro: 'Frequently used currency signs for prices, finance, accounting and international text.'
  },
  {
    slug: 'punctuation',
    name: 'Punctuation & Typography',
    shortName: 'Punctuation',
    title: 'Punctuation Symbols — Dashes, Quotes, Bullets & More',
    description: 'Copy typographic punctuation including em dash, en dash, ellipsis, bullets, middle dot, quotation marks and the horizontal bar.',
    intro: 'Useful punctuation and typographic marks for writing, editing, publishing and document formatting.'
  },
  {
    slug: 'arrows',
    name: 'Arrow Symbols',
    shortName: 'Arrows',
    title: 'Arrow Symbols — Copy, Paste & Unicode Codes',
    description: 'Copy left, right, up, down, diagonal and double arrow symbols with their Unicode code points.',
    intro: 'Directional and logical arrows for documents, interfaces, diagrams, mathematics and technical notation.'
  },
  {
    slug: 'status',
    name: 'Check Marks & Status Symbols',
    shortName: 'Status',
    title: 'Check Mark & Cross Symbols — Copy, Paste & Codes',
    description: 'Copy check marks, ballot boxes, crosses and status symbols including checked and unchecked box variants.',
    intro: 'Common status marks for checklists, forms, tasks, confirmations and visual indicators.'
  },
  {
    slug: 'legal',
    name: 'Legal & Business Symbols',
    shortName: 'Legal & business',
    title: 'Legal & Business Symbols — Copyright, Trademark & More',
    description: 'Copy copyright, registered, trademark, service mark, section and other common legal or business symbols.',
    intro: 'Common legal, publishing and business marks used for rights, registration, references and formal documents.'
  }
];

export const allCuratedCharacters: CharacterSummary[] = [
  { id: 'degree-sign', character: '°', name: 'Degree Sign', codePoint: 'U+00B0', aliases: ['degree', 'degree symbol', 'temperature', 'angle'], category: 'Math & science', categorySlug: 'math', href: '/symbols/degree-sign/' },
  { id: 'plus-minus', character: '±', name: 'Plus-Minus Sign', codePoint: 'U+00B1', aliases: ['plus minus', 'plus or minus'], category: 'Math & science', categorySlug: 'math', href: '/symbols/plus-minus/' },
  { id: 'multiplication', character: '×', name: 'Multiplication Sign', codePoint: 'U+00D7', aliases: ['multiply', 'multiplication', 'times'], category: 'Math & science', categorySlug: 'math' },
  { id: 'division', character: '÷', name: 'Division Sign', codePoint: 'U+00F7', aliases: ['divide', 'division'], category: 'Math & science', categorySlug: 'math' },
  { id: 'square-root', character: '√', name: 'Square Root', codePoint: 'U+221A', aliases: ['square root', 'root', 'radical'], category: 'Math & science', categorySlug: 'math' },
  { id: 'infinity', character: '∞', name: 'Infinity', codePoint: 'U+221E', aliases: ['infinity', 'infinite'], category: 'Math & science', categorySlug: 'math', href: '/symbols/infinity/' },
  { id: 'almost-equal', character: '≈', name: 'Almost Equal To', codePoint: 'U+2248', aliases: ['approximately', 'almost equal', 'approx'], category: 'Math & science', categorySlug: 'math' },
  { id: 'not-equal', character: '≠', name: 'Not Equal To', codePoint: 'U+2260', aliases: ['not equal', 'not equals'], category: 'Math & science', categorySlug: 'math' },
  { id: 'less-than-or-equal', character: '≤', name: 'Less-Than Or Equal To', codePoint: 'U+2264', aliases: ['less than or equal', 'less equal'], category: 'Math & science', categorySlug: 'math' },
  { id: 'greater-than-or-equal', character: '≥', name: 'Greater-Than Or Equal To', codePoint: 'U+2265', aliases: ['greater than or equal', 'greater equal'], category: 'Math & science', categorySlug: 'math' },
  { id: 'pi', character: 'π', name: 'Greek Small Letter Pi', codePoint: 'U+03C0', aliases: ['pi', 'greek pi'], category: 'Math & science', categorySlug: 'math' },
  { id: 'micro-sign', character: 'µ', name: 'Micro Sign', codePoint: 'U+00B5', aliases: ['micro', 'micron'], category: 'Math & science', categorySlug: 'math' },
  { id: 'partial-differential', character: '∂', name: 'Partial Differential', codePoint: 'U+2202', aliases: ['partial differential', 'partial derivative'], category: 'Math & science', categorySlug: 'math' },
  { id: 'n-ary-summation', character: '∑', name: 'N-Ary Summation', codePoint: 'U+2211', aliases: ['summation', 'sum', 'sigma sum'], category: 'Math & science', categorySlug: 'math' },
  { id: 'proportional-to', character: '∝', name: 'Proportional To', codePoint: 'U+221D', aliases: ['proportional', 'proportional to'], category: 'Math & science', categorySlug: 'math' },
  { id: 'integral', character: '∫', name: 'Integral', codePoint: 'U+222B', aliases: ['integral', 'integration'], category: 'Math & science', categorySlug: 'math' },
  { id: 'identical-to', character: '≡', name: 'Identical To', codePoint: 'U+2261', aliases: ['identical to', 'equivalent to', 'triple equals'], category: 'Math & science', categorySlug: 'math' },

  { id: 'dollar-sign', character: '$', name: 'Dollar Sign', codePoint: 'U+0024', aliases: ['dollar', 'usd'], category: 'Currency', categorySlug: 'currency' },
  { id: 'cent-sign', character: '¢', name: 'Cent Sign', codePoint: 'U+00A2', aliases: ['cent'], category: 'Currency', categorySlug: 'currency' },
  { id: 'pound-sign', character: '£', name: 'Pound Sign', codePoint: 'U+00A3', aliases: ['pound', 'sterling', 'gbp'], category: 'Currency', categorySlug: 'currency', href: '/symbols/pound-sign/' },
  { id: 'yen-sign', character: '¥', name: 'Yen Sign', codePoint: 'U+00A5', aliases: ['yen', 'yuan', 'jpy'], category: 'Currency', categorySlug: 'currency', href: '/symbols/yen-sign/' },
  { id: 'euro-sign', character: '€', name: 'Euro Sign', codePoint: 'U+20AC', aliases: ['euro', 'eur'], category: 'Currency', categorySlug: 'currency', href: '/symbols/euro-sign/' },
  { id: 'won-sign', character: '₩', name: 'Won Sign', codePoint: 'U+20A9', aliases: ['won', 'krw'], category: 'Currency', categorySlug: 'currency' },
  { id: 'indian-rupee-sign', character: '₹', name: 'Indian Rupee Sign', codePoint: 'U+20B9', aliases: ['rupee', 'indian rupee', 'inr'], category: 'Currency', categorySlug: 'currency', href: '/symbols/indian-rupee-sign/' },
  { id: 'ruble-sign', character: '₽', name: 'Ruble Sign', codePoint: 'U+20BD', aliases: ['ruble', 'rouble', 'rub'], category: 'Currency', categorySlug: 'currency' },
  { id: 'currency-sign', character: '¤', name: 'Currency Sign', codePoint: 'U+00A4', aliases: ['currency sign', 'generic currency'], category: 'Currency', categorySlug: 'currency' },
  { id: 'turkish-lira-sign', character: '₺', name: 'Turkish Lira Sign', codePoint: 'U+20BA', aliases: ['turkish lira', 'lira', 'try'], category: 'Currency', categorySlug: 'currency' },
  { id: 'bitcoin-sign', character: '₿', name: 'Bitcoin Sign', codePoint: 'U+20BF', aliases: ['bitcoin', 'btc'], category: 'Currency', categorySlug: 'currency' },

  { id: 'bullet', character: '•', name: 'Bullet', codePoint: 'U+2022', aliases: ['bullet', 'dot'], category: 'Punctuation', categorySlug: 'punctuation', href: '/symbols/bullet/' },
  { id: 'middle-dot', character: '·', name: 'Middle Dot', codePoint: 'U+00B7', aliases: ['middle dot', 'interpunct'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'em-dash', character: '—', name: 'Em Dash', codePoint: 'U+2014', aliases: ['em dash', 'long dash'], category: 'Punctuation', categorySlug: 'punctuation', href: '/symbols/em-dash/' },
  { id: 'en-dash', character: '–', name: 'En Dash', codePoint: 'U+2013', aliases: ['en dash', 'dash'], category: 'Punctuation', categorySlug: 'punctuation', href: '/symbols/en-dash/' },
  { id: 'horizontal-bar', character: '―', name: 'Horizontal Bar', codePoint: 'U+2015', aliases: ['horizontal bar', 'quotation dash'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'ellipsis', character: '…', name: 'Horizontal Ellipsis', codePoint: 'U+2026', aliases: ['ellipsis', 'three dots'], category: 'Punctuation', categorySlug: 'punctuation', href: '/symbols/ellipsis/' },
  { id: 'left-single-quote', character: '‘', name: 'Left Single Quotation Mark', codePoint: 'U+2018', aliases: ['left single quote', 'opening single quote'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'right-single-quote', character: '’', name: 'Right Single Quotation Mark', codePoint: 'U+2019', aliases: ['right single quote', 'apostrophe curly'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'left-double-quote', character: '“', name: 'Left Double Quotation Mark', codePoint: 'U+201C', aliases: ['left double quote', 'opening double quote'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'right-double-quote', character: '”', name: 'Right Double Quotation Mark', codePoint: 'U+201D', aliases: ['right double quote', 'closing double quote'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'dagger', character: '†', name: 'Dagger', codePoint: 'U+2020', aliases: ['dagger', 'obelisk', 'footnote dagger'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'double-dagger', character: '‡', name: 'Double Dagger', codePoint: 'U+2021', aliases: ['double dagger', 'double obelisk', 'footnote double dagger'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'per-mille-sign', character: '‰', name: 'Per Mille Sign', codePoint: 'U+2030', aliases: ['per mille', 'per thousand'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'prime', character: '′', name: 'Prime', codePoint: 'U+2032', aliases: ['prime', 'feet mark', 'minutes prime'], category: 'Punctuation', categorySlug: 'punctuation' },
  { id: 'double-prime', character: '″', name: 'Double Prime', codePoint: 'U+2033', aliases: ['double prime', 'inches mark', 'seconds prime'], category: 'Punctuation', categorySlug: 'punctuation' },

  { id: 'left-arrow', character: '←', name: 'Leftwards Arrow', codePoint: 'U+2190', aliases: ['left arrow', 'arrow left'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'up-arrow', character: '↑', name: 'Upwards Arrow', codePoint: 'U+2191', aliases: ['up arrow', 'arrow up'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'right-arrow', character: '→', name: 'Rightwards Arrow', codePoint: 'U+2192', aliases: ['right arrow', 'arrow right'], category: 'Arrows', categorySlug: 'arrows', href: '/symbols/right-arrow/' },
  { id: 'down-arrow', character: '↓', name: 'Downwards Arrow', codePoint: 'U+2193', aliases: ['down arrow', 'arrow down'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'left-right-arrow', character: '↔', name: 'Left Right Arrow', codePoint: 'U+2194', aliases: ['left right arrow', 'horizontal arrow'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'up-down-arrow', character: '↕', name: 'Up Down Arrow', codePoint: 'U+2195', aliases: ['up down arrow', 'vertical arrow'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'north-west-arrow', character: '↖', name: 'North West Arrow', codePoint: 'U+2196', aliases: ['north west arrow', 'upper left arrow'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'north-east-arrow', character: '↗', name: 'North East Arrow', codePoint: 'U+2197', aliases: ['north east arrow', 'upper right arrow'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'south-east-arrow', character: '↘', name: 'South East Arrow', codePoint: 'U+2198', aliases: ['south east arrow', 'lower right arrow'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'south-west-arrow', character: '↙', name: 'South West Arrow', codePoint: 'U+2199', aliases: ['south west arrow', 'lower left arrow'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'left-double-arrow', character: '⇐', name: 'Leftwards Double Arrow', codePoint: 'U+21D0', aliases: ['left double arrow', 'implied by'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'right-double-arrow', character: '⇒', name: 'Rightwards Double Arrow', codePoint: 'U+21D2', aliases: ['right double arrow', 'implies'], category: 'Arrows', categorySlug: 'arrows' },
  { id: 'left-right-double-arrow', character: '⇔', name: 'Left Right Double Arrow', codePoint: 'U+21D4', aliases: ['left right double arrow', 'equivalent'], category: 'Arrows', categorySlug: 'arrows' },

  { id: 'ballot-box', character: '☐', name: 'Ballot Box', codePoint: 'U+2610', aliases: ['checkbox', 'empty checkbox', 'unchecked box'], category: 'Status', categorySlug: 'status' },
  { id: 'ballot-box-check', character: '☑', name: 'Ballot Box With Check', codePoint: 'U+2611', aliases: ['checked box', 'checkbox checked'], category: 'Status', categorySlug: 'status' },
  { id: 'ballot-box-x', character: '☒', name: 'Ballot Box With X', codePoint: 'U+2612', aliases: ['box with x', 'crossed box'], category: 'Status', categorySlug: 'status' },
  { id: 'check-mark', character: '✓', name: 'Check Mark', codePoint: 'U+2713', aliases: ['check', 'tick', 'check mark'], category: 'Status', categorySlug: 'status', href: '/symbols/check-mark/' },
  { id: 'heavy-check-mark', character: '✔', name: 'Heavy Check Mark', codePoint: 'U+2714', aliases: ['heavy check', 'bold tick'], category: 'Status', categorySlug: 'status' },
  { id: 'cross-mark', character: '✗', name: 'Ballot X', codePoint: 'U+2717', aliases: ['cross', 'x mark', 'cross mark'], category: 'Status', categorySlug: 'status' },
  { id: 'heavy-ballot-x', character: '✘', name: 'Heavy Ballot X', codePoint: 'U+2718', aliases: ['heavy cross', 'bold x'], category: 'Status', categorySlug: 'status' },

  { id: 'copyright-sign', character: '©', name: 'Copyright Sign', codePoint: 'U+00A9', aliases: ['copyright', 'copyright symbol'], category: 'Legal & business', categorySlug: 'legal', href: '/symbols/copyright-sign/' },
  { id: 'registered-sign', character: '®', name: 'Registered Sign', codePoint: 'U+00AE', aliases: ['registered', 'registered trademark'], category: 'Legal & business', categorySlug: 'legal', href: '/symbols/registered-sign/' },
  { id: 'section-sign', character: '§', name: 'Section Sign', codePoint: 'U+00A7', aliases: ['section', 'section symbol'], category: 'Legal & business', categorySlug: 'legal' },
  { id: 'pilcrow-sign', character: '¶', name: 'Pilcrow Sign', codePoint: 'U+00B6', aliases: ['pilcrow', 'paragraph mark'], category: 'Legal & business', categorySlug: 'legal' },
  { id: 'service-mark', character: '℠', name: 'Service Mark', codePoint: 'U+2120', aliases: ['service mark', 'sm'], category: 'Legal & business', categorySlug: 'legal' },
  { id: 'trademark-sign', character: '™', name: 'Trade Mark Sign', codePoint: 'U+2122', aliases: ['trademark', 'trade mark', 'tm'], category: 'Legal & business', categorySlug: 'legal', href: '/symbols/trademark-sign/' },
  { id: 'numero-sign', character: '№', name: 'Numero Sign', codePoint: 'U+2116', aliases: ['numero', 'number sign'], category: 'Legal & business', categorySlug: 'legal' }
];

const popularIds = [
  'degree-sign',
  'copyright-sign',
  'registered-sign',
  'trademark-sign',
  'check-mark',
  'cross-mark',
  'bullet',
  'em-dash',
  'en-dash',
  'ellipsis',
  'plus-minus',
  'multiplication',
  'division',
  'infinity',
  'pi',
  'euro-sign',
  'right-arrow',
  'pound-sign'
];

export const featuredCharacters = popularIds
  .map((id) => allCuratedCharacters.find((item) => item.id === id))
  .filter((item): item is CharacterSummary => Boolean(item));

export function charactersForCategory(slug: string) {
  return allCuratedCharacters.filter((item) => item.categorySlug === slug);
}

export function categoryBySlug(slug: string) {
  return characterCategories.find((category) => category.slug === slug);
}
