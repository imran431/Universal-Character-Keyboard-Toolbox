export interface CatalogSymbol {
  character: string;
  name: string;
  aliases?: string[];
}

export interface CatalogCategory {
  slug: string;
  label: string;
  description: string;
  keywords: string[];
  symbols: CatalogSymbol[];
}

function codePointLabel(character: string) {
  const codePoint = character.codePointAt(0) ?? 0;
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
}

function range(start: number, end: number, name: string): CatalogSymbol[] {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const character = String.fromCodePoint(start + index);
    return {
      character,
      name: `${name} ${codePointLabel(character)}`
    };
  });
}

function symbols(items: Array<[string, string, string[]?]>): CatalogSymbol[] {
  return items.map(([character, name, aliases]) => ({ character, name, aliases }));
}

const greekNames = [
  'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa',
  'Lambda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho', 'Sigma', 'Tau', 'Upsilon', 'Phi',
  'Chi', 'Psi', 'Omega'
];

const greekUpper = Array.from('ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ').map((character, index) => ({
  character,
  name: `Greek Capital Letter ${greekNames[index]}`
}));

const greekLower = Array.from('αβγδεζηθικλμνξοπρστυφχψω').map((character, index) => ({
  character,
  name: `Greek Small Letter ${greekNames[index]}`
}));

export const symbolCatalogCategories: CatalogCategory[] = [
  {
    slug: 'popular',
    label: 'Popular symbols',
    description: 'High-demand characters people copy frequently for writing, documents, social posts and forms.',
    keywords: ['popular', 'common', 'copy paste', 'special characters'],
    symbols: symbols([
      ['©', 'Copyright Sign', ['copyright']],
      ['®', 'Registered Sign', ['registered trademark']],
      ['™', 'Trade Mark Sign', ['trademark']],
      ['°', 'Degree Sign', ['degrees', 'temperature']],
      ['✓', 'Check Mark', ['tick', 'checkmark']],
      ['✔', 'Heavy Check Mark', ['tick', 'done']],
      ['✗', 'Ballot X', ['cross', 'wrong']],
      ['→', 'Rightwards Arrow', ['right arrow']],
      ['←', 'Leftwards Arrow', ['left arrow']],
      ['↑', 'Upwards Arrow', ['up arrow']],
      ['↓', 'Downwards Arrow', ['down arrow']],
      ['•', 'Bullet', ['bullet point']],
      ['…', 'Horizontal Ellipsis', ['ellipsis', 'three dots']],
      ['—', 'Em Dash', ['long dash']],
      ['–', 'En Dash', ['range dash']],
      ['±', 'Plus-Minus Sign', ['plus minus']],
      ['×', 'Multiplication Sign', ['multiply', 'times']],
      ['÷', 'Division Sign', ['divide']],
      ['√', 'Square Root', ['root']],
      ['∞', 'Infinity', ['infinity sign']],
      ['€', 'Euro Sign', ['euro', 'eur']],
      ['£', 'Pound Sign', ['sterling', 'gbp']],
      ['¥', 'Yen Sign', ['yen', 'jpy']],
      ['₹', 'Indian Rupee Sign', ['rupee', 'inr']]
    ])
  },
  {
    slug: 'arrows',
    label: 'Arrows',
    description: 'A broad Unicode arrow set for directions, navigation, mappings, diagrams and flow labels.',
    keywords: ['arrow', 'direction', 'left', 'right', 'up', 'down', 'navigation'],
    symbols: range(0x2190, 0x21ff, 'Arrow')
  },
  {
    slug: 'checkmarks',
    label: 'Check marks & crosses',
    description: 'Ticks, ballot marks, crosses and status symbols for lists, approvals and comparisons.',
    keywords: ['check', 'tick', 'cross', 'x', 'yes', 'no', 'done', 'status'],
    symbols: symbols([
      ['✓', 'Check Mark'], ['✔', 'Heavy Check Mark'], ['☑', 'Ballot Box With Check'],
      ['✅', 'White Heavy Check Mark'], ['☐', 'Ballot Box'], ['☒', 'Ballot Box With X'],
      ['✗', 'Ballot X'], ['✘', 'Heavy Ballot X'], ['❌', 'Cross Mark'], ['❎', 'Negative Squared Cross Mark'],
      ['✕', 'Multiplication X'], ['✖', 'Heavy Multiplication X'], ['⊕', 'Circled Plus'],
      ['⊖', 'Circled Minus'], ['⊗', 'Circled Times'], ['⊘', 'Circled Division Slash'],
      ['⊙', 'Circled Dot Operator'], ['⦿', 'Circled Bullet'], ['●', 'Black Circle'], ['○', 'White Circle']
    ])
  },
  {
    slug: 'stars-hearts',
    label: 'Stars & hearts',
    description: 'Stars, sparkles, hearts and decorative marks for ratings, favorites and lightweight emphasis.',
    keywords: ['star', 'heart', 'favorite', 'sparkle', 'love', 'rating'],
    symbols: symbols([
      ['★', 'Black Star'], ['☆', 'White Star'], ['✦', 'Black Four Pointed Star'], ['✧', 'White Four Pointed Star'],
      ['✩', 'Stress Outlined White Star'], ['✪', 'Circled White Star'], ['✫', 'Open Centre Black Star'],
      ['✬', 'Black Centre White Star'], ['✭', 'Outlined Black Star'], ['✮', 'Heavy Outlined Black Star'],
      ['✯', 'Pinwheel Star'], ['✰', 'Shadowed White Star'], ['✵', 'Eight Pointed Pinwheel Star'],
      ['✶', 'Six Pointed Black Star'], ['✷', 'Eight Pointed Rectilinear Black Star'],
      ['✸', 'Heavy Eight Pointed Rectilinear Black Star'], ['✹', 'Twelve Pointed Black Star'],
      ['✺', 'Sixteen Pointed Asterisk'], ['❤', 'Heavy Black Heart'], ['♡', 'White Heart Suit'],
      ['♥', 'Black Heart Suit'], ['❥', 'Rotated Heavy Black Heart Bullet'], ['❣', 'Heavy Heart Exclamation Mark Ornament'],
      ['❦', 'Floral Heart'], ['❧', 'Rotated Floral Heart Bullet'], ['ღ', 'Georgian Letter Ghan'],
      ['💕', 'Two Hearts'], ['💖', 'Sparkling Heart'], ['💙', 'Blue Heart'], ['💚', 'Green Heart']
    ])
  },
  {
    slug: 'math',
    label: 'Math & science',
    description: 'Common operators, relations, calculus notation and scientific symbols.',
    keywords: ['math', 'science', 'operator', 'equation', 'calculus', 'algebra'],
    symbols: symbols([
      ['+', 'Plus Sign'], ['−', 'Minus Sign'], ['±', 'Plus-Minus Sign'], ['∓', 'Minus-or-Plus Sign'],
      ['×', 'Multiplication Sign'], ['÷', 'Division Sign'], ['=', 'Equals Sign'], ['≠', 'Not Equal To'],
      ['≈', 'Almost Equal To'], ['≡', 'Identical To'], ['≤', 'Less-Than Or Equal To'], ['≥', 'Greater-Than Or Equal To'],
      ['≪', 'Much Less-Than'], ['≫', 'Much Greater-Than'], ['∞', 'Infinity'], ['√', 'Square Root'],
      ['∛', 'Cube Root'], ['∜', 'Fourth Root'], ['∑', 'N-Ary Summation'], ['∏', 'N-Ary Product'],
      ['∫', 'Integral'], ['∬', 'Double Integral'], ['∭', 'Triple Integral'], ['∮', 'Contour Integral'],
      ['∂', 'Partial Differential'], ['∇', 'Nabla'], ['∆', 'Increment'], ['∝', 'Proportional To'],
      ['∠', 'Angle'], ['∟', 'Right Angle'], ['⊥', 'Up Tack'], ['∥', 'Parallel To'],
      ['∈', 'Element Of'], ['∉', 'Not An Element Of'], ['∋', 'Contains As Member'], ['⊂', 'Subset Of'],
      ['⊃', 'Superset Of'], ['⊆', 'Subset Of Or Equal To'], ['⊇', 'Superset Of Or Equal To'],
      ['∪', 'Union'], ['∩', 'Intersection'], ['∧', 'Logical And'], ['∨', 'Logical Or'],
      ['¬', 'Not Sign'], ['∀', 'For All'], ['∃', 'There Exists'], ['∄', 'There Does Not Exist'],
      ['∴', 'Therefore'], ['∵', 'Because'], ['π', 'Greek Small Letter Pi'], ['µ', 'Micro Sign'],
      ['ℏ', 'Planck Constant Over Two Pi'], ['ℓ', 'Script Small L'], ['℮', 'Estimated Symbol'], ['‰', 'Per Mille Sign']
    ])
  },
  {
    slug: 'currency',
    label: 'Currency',
    description: 'Major global currency signs plus historic and generic money symbols.',
    keywords: ['currency', 'money', 'price', 'dollar', 'euro', 'pound', 'yen'],
    symbols: symbols([
      ['$', 'Dollar Sign'], ['¢', 'Cent Sign'], ['£', 'Pound Sign'], ['¤', 'Currency Sign'],
      ['¥', 'Yen Sign'], ['֏', 'Armenian Dram Sign'], ['؋', 'Afghani Sign'], ['৲', 'Bengali Rupee Mark'],
      ['৳', 'Bengali Rupee Sign'], ['৻', 'Bengali Ganda Mark'], ['૱', 'Gujarati Rupee Sign'],
      ['௹', 'Tamil Rupee Sign'], ['฿', 'Thai Currency Symbol Baht'], ['៛', 'Khmer Currency Symbol Riel'],
      ['₠', 'Euro-Currency Sign'], ['₡', 'Colon Sign'], ['₢', 'Cruzeiro Sign'], ['₣', 'French Franc Sign'],
      ['₤', 'Lira Sign'], ['₥', 'Mill Sign'], ['₦', 'Naira Sign'], ['₧', 'Peseta Sign'],
      ['₨', 'Rupee Sign'], ['₩', 'Won Sign'], ['₪', 'New Sheqel Sign'], ['₫', 'Dong Sign'],
      ['€', 'Euro Sign'], ['₭', 'Kip Sign'], ['₮', 'Tugrik Sign'], ['₯', 'Drachma Sign'],
      ['₰', 'German Penny Sign'], ['₱', 'Peso Sign'], ['₲', 'Guarani Sign'], ['₳', 'Austral Sign'],
      ['₴', 'Hryvnia Sign'], ['₵', 'Cedi Sign'], ['₶', 'Livre Tournois Sign'], ['₷', 'Spesmilo Sign'],
      ['₸', 'Tenge Sign'], ['₹', 'Indian Rupee Sign'], ['₺', 'Turkish Lira Sign'], ['₻', 'Nordic Mark Sign'],
      ['₼', 'Manat Sign'], ['₽', 'Ruble Sign'], ['₾', 'Lari Sign'], ['₿', 'Bitcoin Sign']
    ])
  },
  {
    slug: 'greek',
    label: 'Greek letters',
    description: 'Uppercase and lowercase Greek letters used in mathematics, science and technical writing.',
    keywords: ['greek', 'alpha', 'beta', 'gamma', 'delta', 'pi', 'omega'],
    symbols: [...greekUpper, ...greekLower]
  },
  {
    slug: 'fractions',
    label: 'Fractions',
    description: 'Common vulgar fractions and fraction-related symbols for measurements and quantities.',
    keywords: ['fraction', 'half', 'quarter', 'third', 'eighth'],
    symbols: symbols([
      ['½', 'Vulgar Fraction One Half'], ['⅓', 'Vulgar Fraction One Third'], ['⅔', 'Vulgar Fraction Two Thirds'],
      ['¼', 'Vulgar Fraction One Quarter'], ['¾', 'Vulgar Fraction Three Quarters'], ['⅕', 'Vulgar Fraction One Fifth'],
      ['⅖', 'Vulgar Fraction Two Fifths'], ['⅗', 'Vulgar Fraction Three Fifths'], ['⅘', 'Vulgar Fraction Four Fifths'],
      ['⅙', 'Vulgar Fraction One Sixth'], ['⅚', 'Vulgar Fraction Five Sixths'], ['⅐', 'Vulgar Fraction One Seventh'],
      ['⅛', 'Vulgar Fraction One Eighth'], ['⅜', 'Vulgar Fraction Three Eighths'], ['⅝', 'Vulgar Fraction Five Eighths'],
      ['⅞', 'Vulgar Fraction Seven Eighths'], ['⅑', 'Vulgar Fraction One Ninth'], ['⅒', 'Vulgar Fraction One Tenth'],
      ['⅟', 'Fraction Numerator One'], ['⁄', 'Fraction Slash']
    ])
  },
  {
    slug: 'superscripts',
    label: 'Superscripts & subscripts',
    description: 'Raised and lowered digits, operators and common letter forms for notation and formulas.',
    keywords: ['superscript', 'subscript', 'power', 'index', 'footnote'],
    symbols: symbols([
      ['⁰', 'Superscript Zero'], ['¹', 'Superscript One'], ['²', 'Superscript Two'], ['³', 'Superscript Three'],
      ['⁴', 'Superscript Four'], ['⁵', 'Superscript Five'], ['⁶', 'Superscript Six'], ['⁷', 'Superscript Seven'],
      ['⁸', 'Superscript Eight'], ['⁹', 'Superscript Nine'], ['⁺', 'Superscript Plus Sign'], ['⁻', 'Superscript Minus'],
      ['⁼', 'Superscript Equals Sign'], ['⁽', 'Superscript Left Parenthesis'], ['⁾', 'Superscript Right Parenthesis'],
      ['ⁿ', 'Superscript Latin Small Letter N'], ['ᵃ', 'Modifier Letter Small A'], ['ᵇ', 'Modifier Letter Small B'],
      ['ᶜ', 'Modifier Letter Small C'], ['ᵈ', 'Modifier Letter Small D'], ['ᵉ', 'Modifier Letter Small E'],
      ['ᶠ', 'Modifier Letter Small F'], ['ᵍ', 'Modifier Letter Small G'], ['ʰ', 'Modifier Letter Small H'],
      ['ᶦ', 'Modifier Letter Small I'], ['ʲ', 'Modifier Letter Small J'], ['ᵏ', 'Modifier Letter Small K'],
      ['ˡ', 'Modifier Letter Small L'], ['ᵐ', 'Modifier Letter Small M'], ['ᵒ', 'Modifier Letter Small O'],
      ['ᵖ', 'Modifier Letter Small P'], ['ʳ', 'Modifier Letter Small R'], ['ˢ', 'Modifier Letter Small S'],
      ['ᵗ', 'Modifier Letter Small T'], ['ᵘ', 'Modifier Letter Small U'], ['ᵛ', 'Modifier Letter Small V'],
      ['ʷ', 'Modifier Letter Small W'], ['ˣ', 'Modifier Letter Small X'], ['ʸ', 'Modifier Letter Small Y'],
      ['ᶻ', 'Modifier Letter Small Z'], ['₀', 'Subscript Zero'], ['₁', 'Subscript One'], ['₂', 'Subscript Two'],
      ['₃', 'Subscript Three'], ['₄', 'Subscript Four'], ['₅', 'Subscript Five'], ['₆', 'Subscript Six'],
      ['₇', 'Subscript Seven'], ['₈', 'Subscript Eight'], ['₉', 'Subscript Nine'], ['₊', 'Subscript Plus Sign'],
      ['₋', 'Subscript Minus'], ['₌', 'Subscript Equals Sign'], ['₍', 'Subscript Left Parenthesis'],
      ['₎', 'Subscript Right Parenthesis'], ['ₐ', 'Latin Subscript Small Letter A'], ['ₑ', 'Latin Subscript Small Letter E'],
      ['ₒ', 'Latin Subscript Small Letter O'], ['ₓ', 'Latin Subscript Small Letter X'], ['ₕ', 'Latin Subscript Small Letter H'],
      ['ₖ', 'Latin Subscript Small Letter K'], ['ₗ', 'Latin Subscript Small Letter L'], ['ₘ', 'Latin Subscript Small Letter M'],
      ['ₙ', 'Latin Subscript Small Letter N'], ['ₚ', 'Latin Subscript Small Letter P'], ['ₛ', 'Latin Subscript Small Letter S'],
      ['ₜ', 'Latin Subscript Small Letter T']
    ])
  },
  {
    slug: 'punctuation',
    label: 'Punctuation & quotes',
    description: 'Typographic punctuation, quotation marks, dashes, primes and editorial marks.',
    keywords: ['punctuation', 'quote', 'apostrophe', 'dash', 'prime', 'ellipsis'],
    symbols: symbols([
      ['…', 'Horizontal Ellipsis'], ['–', 'En Dash'], ['—', 'Em Dash'], ['―', 'Horizontal Bar'],
      ['‘', 'Left Single Quotation Mark'], ['’', 'Right Single Quotation Mark'], ['‚', 'Single Low-9 Quotation Mark'],
      ['‛', 'Single High-Reversed-9 Quotation Mark'], ['“', 'Left Double Quotation Mark'], ['”', 'Right Double Quotation Mark'],
      ['„', 'Double Low-9 Quotation Mark'], ['‟', 'Double High-Reversed-9 Quotation Mark'], ['‹', 'Single Left-Pointing Angle Quotation Mark'],
      ['›', 'Single Right-Pointing Angle Quotation Mark'], ['«', 'Left-Pointing Double Angle Quotation Mark'],
      ['»', 'Right-Pointing Double Angle Quotation Mark'], ['′', 'Prime'], ['″', 'Double Prime'], ['‴', 'Triple Prime'],
      ['‵', 'Reversed Prime'], ['‶', 'Reversed Double Prime'], ['†', 'Dagger'], ['‡', 'Double Dagger'],
      ['•', 'Bullet'], ['‣', 'Triangular Bullet'], ['⁃', 'Hyphen Bullet'], ['‰', 'Per Mille Sign'], ['‱', 'Per Ten Thousand Sign'],
      ['※', 'Reference Mark'], ['‽', 'Interrobang'], ['‼', 'Double Exclamation Mark'], ['⁇', 'Double Question Mark'],
      ['⁈', 'Question Exclamation Mark'], ['⁉', 'Exclamation Question Mark'], ['¡', 'Inverted Exclamation Mark'],
      ['¿', 'Inverted Question Mark'], ['§', 'Section Sign'], ['¶', 'Pilcrow Sign'], ['¤', 'Currency Sign'], ['№', 'Numero Sign']
    ])
  },
  {
    slug: 'brackets',
    label: 'Brackets & delimiters',
    description: 'Parentheses, brackets, braces, angle brackets and mathematical delimiter variants.',
    keywords: ['bracket', 'parenthesis', 'brace', 'delimiter', 'angle'],
    symbols: symbols([
      ['(', 'Left Parenthesis'], [')', 'Right Parenthesis'], ['[', 'Left Square Bracket'], [']', 'Right Square Bracket'],
      ['{', 'Left Curly Bracket'], ['}', 'Right Curly Bracket'], ['⟨', 'Mathematical Left Angle Bracket'], ['⟩', 'Mathematical Right Angle Bracket'],
      ['〈', 'Left Angle Bracket'], ['〉', 'Right Angle Bracket'], ['《', 'Left Double Angle Bracket'], ['》', 'Right Double Angle Bracket'],
      ['「', 'Left Corner Bracket'], ['」', 'Right Corner Bracket'], ['『', 'Left White Corner Bracket'], ['』', 'Right White Corner Bracket'],
      ['【', 'Left Black Lenticular Bracket'], ['】', 'Right Black Lenticular Bracket'], ['〔', 'Left Tortoise Shell Bracket'], ['〕', 'Right Tortoise Shell Bracket'],
      ['〖', 'Left White Lenticular Bracket'], ['〗', 'Right White Lenticular Bracket'], ['〘', 'Left White Tortoise Shell Bracket'], ['〙', 'Right White Tortoise Shell Bracket'],
      ['⦅', 'Left White Parenthesis'], ['⦆', 'Right White Parenthesis'], ['⦃', 'Left White Curly Bracket'], ['⦄', 'Right White Curly Bracket']
    ])
  },
  {
    slug: 'enclosed',
    label: 'Enclosed numbers & letters',
    description: 'Circled numbers, parenthesized numbers and enclosed alphanumeric forms for lists, labels and compact markers.',
    keywords: ['circled number', 'enclosed number', 'enclosed letter', 'parenthesized', 'marker'],
    symbols: range(0x2460, 0x24ff, 'Enclosed Alphanumeric')
  },
  {
    slug: 'misc-symbols',
    label: 'Miscellaneous symbols',
    description: 'A broad Unicode symbol block containing weather, warning, zodiac, chess, pointing-hand and other widely recognized marks.',
    keywords: ['miscellaneous', 'symbol', 'weather', 'warning', 'zodiac', 'chess', 'hand'],
    symbols: range(0x2600, 0x26ff, 'Miscellaneous Symbol')
  },
  {
    slug: 'dingbats',
    label: 'Dingbats',
    description: 'Decorative marks, check marks, crosses, stars, punctuation ornaments and other Dingbats characters.',
    keywords: ['dingbat', 'ornament', 'decorative', 'check mark', 'cross', 'star'],
    symbols: range(0x2700, 0x27bf, 'Dingbat')
  },
  {
    slug: 'geometric',
    label: 'Geometric shapes',
    description: 'Squares, circles, triangles, diamonds and related geometric Unicode symbols.',
    keywords: ['shape', 'square', 'circle', 'triangle', 'diamond', 'rectangle'],
    symbols: range(0x25a0, 0x25ff, 'Geometric Shape')
  },
  {
    slug: 'box-drawing',
    label: 'Box drawing',
    description: 'Line and corner characters for text-mode diagrams, tables, terminals and visual separators.',
    keywords: ['box drawing', 'line', 'corner', 'terminal', 'ascii art', 'table'],
    symbols: range(0x2500, 0x257f, 'Box Drawing Character')
  },
  {
    slug: 'music',
    label: 'Music',
    description: 'Notes, clefs and common musical notation symbols.',
    keywords: ['music', 'note', 'clef', 'flat', 'sharp'],
    symbols: symbols([
      ['♩', 'Quarter Note'], ['♪', 'Eighth Note'], ['♫', 'Beamed Eighth Notes'], ['♬', 'Beamed Sixteenth Notes'],
      ['♭', 'Music Flat Sign'], ['♮', 'Music Natural Sign'], ['♯', 'Music Sharp Sign'], ['𝄞', 'Musical Symbol G Clef'],
      ['𝄢', 'Musical Symbol F Clef'], ['𝄡', 'Musical Symbol C Clef'], ['𝄐', 'Musical Symbol Fermata'],
      ['𝄆', 'Musical Symbol Left Repeat Sign'], ['𝄇', 'Musical Symbol Right Repeat Sign'], ['𝄪', 'Musical Symbol Double Sharp'],
      ['𝄫', 'Musical Symbol Double Flat'], ['♬', 'Music Notes']
    ])
  },
  {
    slug: 'weather',
    label: 'Weather & nature',
    description: 'Sun, cloud, rain, snow and related weather or nature symbols.',
    keywords: ['weather', 'sun', 'cloud', 'rain', 'snow', 'umbrella', 'nature'],
    symbols: symbols([
      ['☀', 'Black Sun With Rays'], ['☁', 'Cloud'], ['☂', 'Umbrella'], ['☃', 'Snowman'],
      ['☄', 'Comet'], ['★', 'Black Star'], ['☼', 'White Sun With Rays'], ['❄', 'Snowflake'],
      ['❅', 'Tight Trifoliate Snowflake'], ['❆', 'Heavy Chevron Snowflake'], ['♨', 'Hot Springs'],
      ['⚡', 'High Voltage Sign'], ['☔', 'Umbrella With Rain Drops'], ['⛄', 'Snowman Without Snow'],
      ['🌡', 'Thermometer'], ['☘', 'Shamrock'], ['❀', 'White Florette'], ['✿', 'Black Florette'],
      ['❁', 'Eight Petalled Outlined Black Florette'], ['❃', 'Heavy Teardrop-Spoked Pinwheel Asterisk']
    ])
  },
  {
    slug: 'communication',
    label: 'Phone, email & communication',
    description: 'Phone, envelope, keyboard and communication-oriented symbols for contact information and interfaces.',
    keywords: ['phone', 'telephone', 'email', 'mail', 'envelope', 'keyboard', 'contact'],
    symbols: symbols([
      ['☎', 'Black Telephone'], ['☏', 'White Telephone'], ['✆', 'Telephone Location Sign'], ['✉', 'Envelope'],
      ['✉', 'Envelope'], ['⌨', 'Keyboard'], ['⌕', 'Telephone Recorder'], ['☊', 'Ascending Node'],
      ['☋', 'Descending Node'], ['⌁', 'Electric Arrow'], ['⌂', 'House'], ['⌘', 'Place Of Interest Sign'],
      ['⌥', 'Option Key'], ['⌫', 'Erase To The Left'], ['⏎', 'Return Symbol'], ['⏏', 'Eject Symbol']
    ])
  },
  {
    slug: 'legal-business',
    label: 'Legal & business',
    description: 'Copyright, trademark, section, paragraph and other office or legal-document symbols.',
    keywords: ['legal', 'business', 'copyright', 'trademark', 'registered', 'section', 'paragraph'],
    symbols: symbols([
      ['©', 'Copyright Sign'], ['®', 'Registered Sign'], ['™', 'Trade Mark Sign'], ['℠', 'Service Mark'],
      ['§', 'Section Sign'], ['¶', 'Pilcrow Sign'], ['№', 'Numero Sign'], ['℗', 'Sound Recording Copyright'],
      ['℞', 'Prescription Take'], ['℅', 'Care Of'], ['℀', 'Account Of'], ['℁', 'Addressed To The Subject'],
      ['℆', 'Cada Una'], ['℔', 'L B Bar Symbol'], ['†', 'Dagger'], ['‡', 'Double Dagger']
    ])
  }
];

export const symbolCatalogCount = symbolCatalogCategories.reduce(
  (total, category) => total + category.symbols.length,
  0
);
