export interface GuideSource {
  label: string;
  url: string;
}

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: string[];
  note?: string;
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  headline: string;
  summary: string;
  category: 'Windows' | 'Mac' | 'Apps' | 'Mobile' | 'Symbols';
  published: string;
  modified: string;
  readingMinutes: number;
  sections: GuideSection[];
  sources: GuideSource[];
  related: Array<{ label: string; href: string }>;
}

const microsoftWindows: GuideSource = {
  label: 'Microsoft Support — Windows keyboard tips and tricks',
  url: 'https://support.microsoft.com/en-US/Windows/Hardware/Input-Devices/windows-keyboard-tips-and-tricks'
};

const microsoftWordUnicode: GuideSource = {
  label: 'Microsoft Support — Insert ASCII or Unicode character codes in Word',
  url: 'https://support.microsoft.com/en-us/word/insert-ascii-or-unicode-character-codes-in-word'
};

const microsoftWordShortcuts: GuideSource = {
  label: 'Microsoft Support — Keyboard shortcuts in Word',
  url: 'https://support.microsoft.com/en-us/accessibility/word-keyboard-shortcuts-in-word'
};

const appleMacSymbols: GuideSource = {
  label: 'Apple Support — Use emoji and symbols on Mac',
  url: 'https://support.apple.com/guide/mac-help/use-emoji-and-symbols-mchlp1560/mac'
};

const appleIphoneKeyboard: GuideSource = {
  label: 'Apple Support — Type with the onscreen keyboard on iPhone',
  url: 'https://support.apple.com/guide/iphone/type-with-the-onscreen-keyboard-iph3c50f96e/ios'
};

const googleDocsSpecial: GuideSource = {
  label: 'Google Docs Editors Help — Insert emojis & special characters',
  url: 'https://support.google.com/docs/answer/3371015'
};

const unicodeUcd: GuideSource = {
  label: 'Unicode 18.0.0 Character Database',
  url: 'https://www.unicode.org/Public/18.0.0/ucd/UnicodeData.txt'
};

export const guides: Guide[] = [
  {
    slug: 'keyboard-shortcuts-for-symbols',
    title: 'Keyboard Shortcuts for Symbols — Windows, Mac, Word & Docs',
    description: 'Learn reliable ways to type symbols on Windows, Mac, Microsoft Word and Google Docs, with copy/paste fallbacks and troubleshooting tips.',
    headline: 'Keyboard Shortcuts for Symbols',
    summary: 'There is no single universal shortcut for every symbol. The fastest method depends on the operating system, keyboard layout and app. This guide starts with the reliable system tools, then shows when Alt codes and Word Unicode input make sense.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 8,
    sections: [
      {
        heading: 'The fastest method when you only need one symbol',
        paragraphs: [
          'If you already know the character you need, copy and paste is usually the least error-prone option because it avoids keyboard-layout differences and numeric-keypad requirements.',
          'Use a keyboard method when you type the same character often, when clipboard access is restricted, or when you are working inside an app that has a strong built-in character picker.'
        ],
        bullets: [
          'Copy/paste: best for occasional symbols and cross-device use.',
          'System character picker: best when you know the symbol name but not a code.',
          'Windows Alt code: useful for a small set of documented characters when a numeric keypad is available.',
          'Word Unicode + Alt+X: useful when you know the hexadecimal Unicode value.'
        ]
      },
      {
        heading: 'Windows: symbol panel, Alt codes and Character Map',
        paragraphs: [
          'Windows 11 and Windows 10 include a symbols area inside the emoji panel. Microsoft documents Windows key + period as the shortcut to open the panel, then you can switch to Symbols and choose a character.',
          'Microsoft also documents four-digit Alt codes for a limited set of common characters. These require the numeric keypad; the number row above the letters is not equivalent.'
        ],
        steps: [
          'Press Windows key + . (period).',
          'Choose the Symbols section.',
          'Select the symbol you need, or use a documented Alt code if you know one.',
          'If the character is not available there, use Character Map or copy it from this site.'
        ],
        note: 'Do not assume a Unicode decimal value is automatically a Windows Alt code. They are different input systems.'
      },
      {
        heading: 'Mac: Character Viewer is the dependable starting point',
        paragraphs: [
          'Apple documents Character Viewer as the general-purpose way to insert symbols, emoji and characters from other languages on macOS.',
          'Option-key shortcuts exist for many characters, but they can depend on the active keyboard layout. For that reason this site only publishes a specific Option shortcut when it has been verified for the relevant layout.'
        ],
        steps: [
          'Press Fn/Globe + E, or choose Edit > Emoji & Symbols.',
          'Search for a symbol name such as copyright, degree, arrow or bullet.',
          'Click the result to insert it into the active text field.'
        ]
      },
      {
        heading: 'Microsoft Word: Unicode + Alt+X',
        paragraphs: [
          'Word supports a useful Unicode input method on Windows. Type the hexadecimal code point without the U+ prefix, then press Alt + X to convert the code into the character.',
          'For example, 2192 followed by Alt + X produces the rightwards arrow →. This method is different from Windows Alt codes and does not require memorizing a decimal keypad code.'
        ],
        bullets: [
          'Degree sign: 00B0 then Alt + X.',
          'Right arrow: 2192 then Alt + X.',
          'Check mark: 2713 then Alt + X.',
          'Infinity: 221E then Alt + X.'
        ]
      },
      {
        heading: 'Google Docs: search or draw the character',
        paragraphs: [
          'Google Docs and Slides include Insert > Special characters on desktop. Google lets you browse by category, enter a Unicode value, or draw the shape of the character to find a match.',
          'Google Sheets does not provide the same special-character insertion dialog, so copying from Docs or another character tool is often the simpler route.'
        ]
      },
      {
        heading: 'When a shortcut does not work',
        paragraphs: [
          'Keyboard layout is the first thing to check. A shortcut that works on a US layout may produce a different character on another layout.',
          'If you see a blank square or missing-glyph box, the character probably exists but the current font does not include a glyph for it. Try a broadly supported font or choose a simpler related character.'
        ],
        bullets: [
          'Windows Alt code fails: confirm Num Lock and use the numeric keypad.',
          'Mac Option shortcut differs: open Character Viewer instead.',
          'Word Alt+X changes the wrong text: place the cursor immediately after the hexadecimal code.',
          'Google Docs search misses a name: try the Unicode value or draw the symbol.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, microsoftWordShortcuts, appleMacSymbols, googleDocsSpecial],
    related: [
      { label: 'Shortcut Finder', href: '/tools/shortcut-finder/' },
      { label: 'Windows Alt Code Finder', href: '/tools/alt-code-finder/' },
      { label: 'Unicode Explorer', href: '/unicode/' },
      { label: 'Typing methods hub', href: '/typing/' }
    ]
  },
  {
    slug: 'type-special-characters-windows',
    title: 'How to Type Special Characters on Windows 11 & 10',
    description: 'Type special characters on Windows with the Symbols panel, reviewed Alt codes, Character Map and Word Unicode input, with laptop troubleshooting.',
    headline: 'How to Type Special Characters on Windows',
    summary: 'Windows gives you several ways to enter characters that are not printed on your keyboard. The best default is the built-in Symbols panel; Alt codes are useful when Microsoft documents the code and you have a numeric keypad.',
    category: 'Windows',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Method 1: open the Windows Symbols panel',
        paragraphs: [
          'Microsoft documents Windows key + period as the shortcut for the emoji panel. The panel also contains a Symbols section with punctuation, accented characters and other common marks.'
        ],
        steps: [
          'Click where you want the character.',
          'Press Windows key + . (period).',
          'Choose Symbols.',
          'Browse the available groups and select the character.'
        ]
      },
      {
        heading: 'Method 2: use a documented Alt code',
        paragraphs: [
          'Alt codes are efficient for frequently used characters such as ©, ®, ™, •, § and several currency or punctuation marks. Microsoft requires the numeric keypad for the documented four-digit method.'
        ],
        bullets: [
          '© Copyright: Alt + 0169',
          '® Registered: Alt + 0174',
          '™ Trademark: Alt + 0153',
          '• Bullet: Alt + 0149',
          '§ Section: Alt + 0167',
          '— Em dash: Alt + 0151',
          '– En dash: Alt + 0150',
          '£ Pound: Alt + 0163'
        ],
        note: 'The top number row normally does not work for this Windows Alt-code method.'
      },
      {
        heading: 'Method 3: Character Map',
        paragraphs: [
          'Character Map remains a useful fallback when you do not know a shortcut or when a laptop has no numeric keypad. Search for Character Map from Start, find the character, select it and copy it.'
        ]
      },
      {
        heading: 'Method 4: Word Unicode input',
        paragraphs: [
          'Inside Microsoft Word on Windows, type the hexadecimal Unicode code point and press Alt + X. This is especially helpful for characters that do not have a documented Windows Alt code.',
          'The Unicode value is shown on reviewed character pages and in the Unicode Explorer on this site.'
        ]
      },
      {
        heading: 'Laptop troubleshooting',
        paragraphs: [
          'A laptop without a dedicated numeric keypad may not support the standard Alt-code method. Do not waste time trying random number-row combinations: use the Symbols panel, Character Map, Word Alt+X or copy/paste instead.'
        ],
        bullets: [
          'Check the active keyboard language and layout.',
          'Confirm the application supports text insertion at the current cursor position.',
          'If the symbol appears as a box, try another font.',
          'For repeat use, save the character in the local Saved Characters library.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode],
    related: [
      { label: 'Alt Code Finder', href: '/tools/alt-code-finder/' },
      { label: 'Shortcut Finder', href: '/tools/shortcut-finder/' },
      { label: 'Saved Characters', href: '/library/' }
    ]
  },
  {
    slug: 'type-special-characters-mac',
    title: 'How to Type Special Characters on Mac',
    description: 'Use Character Viewer to type symbols, accented letters and Unicode characters on Mac, plus safe guidance about layout-dependent Option shortcuts.',
    headline: 'How to Type Special Characters on Mac',
    summary: 'For symbols you do not type every day, Character Viewer is the safest Mac method because it lets you search by name instead of memorizing layout-dependent shortcuts.',
    category: 'Mac',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Open Character Viewer',
        paragraphs: [
          'Apple documents Character Viewer as the built-in place to search and insert emoji, symbols and characters from other languages.'
        ],
        steps: [
          'Click the text field where the symbol should appear.',
          'Press Fn/Globe + E, or choose Edit > Emoji & Symbols.',
          'Search for a name such as degree, copyright, arrow or infinity.',
          'Click the character to insert it.'
        ]
      },
      {
        heading: 'Why we prefer Character Viewer over guessed Option shortcuts',
        paragraphs: [
          'Many Mac characters do have Option-key shortcuts, but the result can change with the active keyboard layout. Publishing a shortcut without naming and checking the layout can mislead users.',
          'Character Viewer avoids that problem because you select the character itself rather than relying on a layout-specific key position.'
        ]
      },
      {
        heading: 'Accented letters',
        paragraphs: [
          'For accented letters, macOS and Apple keyboards also support character variants and layout-specific dead-key methods. If you only need the character once, the Accent Keyboard on this site is often quicker because you can search and copy the exact letter.'
        ]
      },
      {
        heading: 'If a symbol renders differently',
        paragraphs: [
          'Unicode identifies the character, not one fixed visual design. Fonts can draw the same character with different weight, width or proportions. Emoji-capable characters can also switch between text-like and colorful presentation depending on the app and font.'
        ]
      },
      {
        heading: 'A reliable workflow for uncommon symbols',
        paragraphs: [
          'Search for the character by name, copy or insert it, and then keep it in Saved Characters if you use it repeatedly. This is usually faster than memorizing dozens of Option combinations.'
        ]
      }
    ],
    sources: [appleMacSymbols, unicodeUcd],
    related: [
      { label: 'Accent Keyboard', href: '/tools/accent-keyboard/' },
      { label: 'Shortcut Finder', href: '/tools/shortcut-finder/' },
      { label: 'Unicode Explorer', href: '/unicode/' }
    ]
  },
  {
    slug: 'special-characters-google-docs',
    title: 'How to Insert Special Characters in Google Docs',
    description: 'Insert arrows, symbols and accented characters in Google Docs with the Special characters dialog, Unicode search and drawing tool.',
    headline: 'How to Insert Special Characters in Google Docs',
    summary: 'Google Docs and Slides have a built-in Special characters dialog on desktop. It can browse categories, search with Unicode values and even match a character you draw.',
    category: 'Apps',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Use Insert > Special characters',
        paragraphs: [
          'Google documents the Special characters dialog for Docs and Slides on desktop. It is the best starting point when you know what a symbol looks like but do not know a keyboard shortcut.'
        ],
        steps: [
          'Open a Google Doc or Google Slides file on a computer.',
          'Choose Insert > Special characters.',
          'Browse a category, enter a Unicode value, or draw the character in the drawing box.',
          'Click the result to insert it.'
        ]
      },
      {
        heading: 'Search by Unicode value',
        paragraphs: [
          'If you already know the code point, you can use it to narrow the search. The Unicode Explorer on this site can find the official name and U+ value first, then you can use that information in Docs.'
        ]
      },
      {
        heading: 'Google Sheets is different',
        paragraphs: [
          'Google states that the Special characters insertion dialog is available in Docs and Slides, not directly in Sheets. For Sheets, copy the character from another source and paste it into the cell.'
        ]
      },
      {
        heading: 'Fast workflow for repeat characters',
        paragraphs: [
          'When you use the same symbol repeatedly, keep it in Saved Characters or copy it from a reviewed character page. That avoids reopening the Docs dialog each time.'
        ]
      },
      {
        heading: 'Troubleshooting missing glyphs',
        paragraphs: [
          'If a character inserts correctly but appears as an empty box, the current font may not support that glyph. Try a different font or a more widely supported character variant.'
        ]
      }
    ],
    sources: [googleDocsSpecial, unicodeUcd],
    related: [
      { label: 'Unicode Explorer', href: '/unicode/' },
      { label: 'Copy symbols', href: '/symbols/' },
      { label: 'Saved Characters', href: '/library/' }
    ]
  },
  {
    slug: 'type-accents-on-iphone',
    title: 'How to Type Accented Letters on iPhone',
    description: 'Type accented letters and related special characters on iPhone by touching and holding a key, with copy/paste fallbacks for uncommon characters.',
    headline: 'How to Type Accented Letters on iPhone',
    summary: 'The iPhone keyboard exposes many accents as press-and-hold variants. For less common letters that do not appear on your active keyboard, copying from a character tool is the simplest fallback.',
    category: 'Mobile',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 4,
    sections: [
      {
        heading: 'Use touch-and-hold for accents',
        paragraphs: [
          'Apple documents a press-and-hold gesture for accents, diacritics and related special characters on the onscreen keyboard.'
        ],
        steps: [
          'Tap a text field to open the iPhone keyboard.',
          'Touch and hold the related letter, number or symbol.',
          'Slide to the character variant you want.',
          'Release your finger to insert it.'
        ],
        note: 'For example, touch and hold e to reveal variants such as é on supported keyboard layouts.'
      },
      {
        heading: 'Switch to numbers and symbols',
        paragraphs: [
          'Apple also provides number and symbol keyboard layers. Use the Numbers or Symbols key when the character is punctuation or a common symbol rather than an accented letter.'
        ]
      },
      {
        heading: 'When the accent is not offered',
        paragraphs: [
          'The available variants depend on the active language and keyboard. Add the appropriate language keyboard when you type that language often, or copy the exact Unicode character from the Accent Keyboard for occasional use.'
        ]
      },
      {
        heading: 'Copy/paste uncommon letters safely',
        paragraphs: [
          'Our Accent Keyboard keeps the text character itself in the clipboard, so you can paste it into Messages, Notes, email, documents and most other text fields. Rendering can still vary by font.'
        ]
      }
    ],
    sources: [appleIphoneKeyboard],
    related: [
      { label: 'Accent Keyboard', href: '/tools/accent-keyboard/' },
      { label: 'Unicode Converter', href: '/tools/unicode-converter/' }
    ]
  },
  {
    slug: 'math-symbols-on-keyboard',
    title: 'Math Symbols on Keyboard — Copy, Unicode & Typing Methods',
    description: 'Find common math symbols such as ±, ×, ÷, √, ∞, π and ∑, then copy them or use reliable Windows, Mac and Word input methods.',
    headline: 'Math Symbols on Keyboard',
    summary: 'Math symbols are a good example of why one universal shortcut list does not work. Use copy/paste for speed, system character pickers for discovery, and Word Unicode input when you know the code point.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Common math symbols to copy',
        paragraphs: [
          'The Math & Scientific Symbols collection includes high-demand operators and notation with their Unicode identities. Copying the exact character is often the fastest method across browsers, documents and messaging apps.'
        ],
        bullets: [
          '± U+00B1 — plus-minus sign',
          '× U+00D7 — multiplication sign',
          '÷ U+00F7 — division sign',
          '√ U+221A — square root',
          '∞ U+221E — infinity',
          'π U+03C0 — Greek small letter pi',
          '∑ U+2211 — n-ary summation',
          '∫ U+222B — integral',
          '≠ U+2260 — not equal to',
          '≤ U+2264 — less-than or equal to',
          '≥ U+2265 — greater-than or equal to'
        ]
      },
      {
        heading: 'Windows methods',
        paragraphs: [
          'Use Windows key + period and open Symbols when you do not know a code. For characters with a Microsoft-documented Alt code, the numeric keypad method can be faster. Do not invent Alt codes from Unicode numbers.'
        ]
      },
      {
        heading: 'Mac methods',
        paragraphs: [
          'Open Character Viewer with Fn/Globe + E or Edit > Emoji & Symbols and search the mathematical name. This avoids depending on an Option shortcut that may change with keyboard layout.'
        ]
      },
      {
        heading: 'Microsoft Word Unicode method',
        paragraphs: [
          'In Word on Windows, hexadecimal Unicode followed by Alt + X is useful for mathematical characters. For example, 221E + Alt + X produces ∞ and 221A + Alt + X produces √.'
        ]
      },
      {
        heading: 'Choose the right lookalike',
        paragraphs: [
          'Do not substitute visually similar characters when meaning matters. A lowercase x is not the multiplication sign ×, a hyphen is not the mathematical minus sign −, and a check mark is not the square-root sign √.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, appleMacSymbols, unicodeUcd],
    related: [
      { label: 'Math & scientific symbols', href: '/symbols/math/' },
      { label: 'Unicode Explorer', href: '/unicode/' },
      { label: 'Shortcut Finder', href: '/tools/shortcut-finder/' }
    ]
  }
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
