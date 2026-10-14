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
  },
  {
    slug: 'type-hashtag-number-sign',
    title: 'How to Type the Hashtag or Number Sign (#)',
    description: 'Copy the # hashtag or number sign and learn reliable ways to insert it on Windows, Mac, Microsoft Word and Google Docs without assuming one keyboard layout.',
    headline: 'How to Type the Hashtag or Number Sign (#)',
    summary: 'The character # is U+0023 NUMBER SIGN. People also call it the hash sign, hashtag symbol or pound key depending on context. Keyboard placement changes with layout, so this guide separates the character itself from layout-specific shortcuts.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Copy the hashtag symbol',
        paragraphs: [
          'The character is #. Unicode names it NUMBER SIGN at U+0023. In social posts it is commonly called a hashtag when it prefixes a tag, while computing users often call the same character a hash sign.',
          'If you only need it once, copy and paste is the most layout-independent method because the # key position can differ between keyboard languages and regional layouts.'
        ],
        bullets: [
          '# — U+0023 NUMBER SIGN',
          '#1 — number or ranking label',
          '#topic — hashtag-style tag',
          '#FFFFFF — hexadecimal color notation'
        ]
      },
      {
        heading: 'Use the key shown by your active keyboard layout',
        paragraphs: [
          'On physical keyboards, use the key combination printed for # on the active layout. Do not assume a shortcut from a different country or language layout will produce the same character.',
          'If the printed key and the result disagree, check the operating-system keyboard language before trying random modifier combinations.'
        ]
      },
      {
        heading: 'Windows, Mac and Word fallbacks',
        paragraphs: [
          'On Windows, Microsoft documents the Symbols area in the Windows key + period panel for browsing punctuation and symbols. On Mac, Apple Character Viewer can search and insert symbols without relying on a layout-specific key position.',
          'In Microsoft Word on Windows, type 0023 and press Alt + X to convert the Unicode hexadecimal value to #.'
        ]
      },
      {
        heading: 'Google Docs and Slides',
        paragraphs: [
          'Google Docs and Slides on desktop include Insert > Special characters. Google also allows searching by Unicode value, so U+0023 can help identify the number sign when the keyboard layout is unfamiliar.',
          'Google Sheets does not provide the same Special characters dialog; copy and paste is the straightforward fallback there.'
        ]
      },
      {
        heading: 'Hashtag, number sign and sharp sign are not the same thing',
        paragraphs: [
          'Hashtag and number sign refer to the same # character in different contexts. The musical sharp sign ♯ is a different Unicode character, U+266F MUSIC SHARP SIGN, even though the shapes can look similar in some fonts.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, appleMacSymbols, googleDocsSpecial, unicodeUcd],
    related: [
      { label: 'Copy & paste symbols', href: '/tools/copy-paste-symbols/' },
      { label: 'Unicode Explorer', href: '/unicode/' },
      { label: 'Shortcut Finder', href: '/tools/shortcut-finder/' }
    ]
  },
  {
    slug: 'type-at-symbol',
    title: 'How to Type the At Sign (@) on Any Keyboard',
    description: 'Copy the @ at sign and learn dependable Windows, Mac, Word and Google Docs methods when the key position changes with your keyboard layout.',
    headline: 'How to Type the At Sign (@)',
    summary: 'The at sign @ is U+0040 COMMERCIAL AT. Its physical key position varies across keyboard layouts, so the safest instructions start with your active layout and provide Unicode-based fallbacks when that layout is unfamiliar.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 5,
    sections: [
      {
        heading: 'Copy the at sign',
        paragraphs: [
          'The character is @. Unicode identifies it as COMMERCIAL AT, U+0040. It is widely used in email addresses, account handles and technical identifiers.',
          'Copying @ is useful when a device has switched keyboard languages or when the expected key produces a different symbol.'
        ],
        bullets: [
          '@ — U+0040 COMMERCIAL AT',
          'name@example.com — email address',
          '@username — account or mention syntax'
        ]
      },
      {
        heading: 'Why the key can move',
        paragraphs: [
          'The key combination for @ is determined by the active keyboard layout, not by Unicode. US, UK and other language layouts can place @ on different keys or modifier layers.',
          'Use the symbol printed for the active layout, or open the operating-system character picker instead of guessing combinations from another layout.'
        ]
      },
      {
        heading: 'Reliable platform methods',
        paragraphs: [
          'Windows includes a Symbols panel inside the Windows key + period picker. macOS provides Character Viewer through Fn/Globe + E or Edit > Emoji & Symbols.',
          'In Microsoft Word on Windows, 0040 followed by Alt + X converts the Unicode hexadecimal value to @.'
        ]
      },
      {
        heading: 'Google Docs and web forms',
        paragraphs: [
          'Google Docs and Slides can insert special characters from the Insert menu and can search by Unicode value. For normal web forms, direct typing or copy/paste is usually faster.',
          'If @ appears where another symbol is expected, confirm the keyboard language shown by the operating system before changing application settings.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, appleMacSymbols, googleDocsSpecial, unicodeUcd],
    related: [
      { label: 'Unicode Explorer', href: '/unicode/' },
      { label: 'Copy & paste symbols', href: '/tools/copy-paste-symbols/' },
      { label: 'Typing methods hub', href: '/typing/' }
    ]
  },
  {
    slug: 'slash-backslash-pipe-symbols',
    title: 'Slash, Backslash & Pipe Symbols — Copy and Type',
    description: 'Learn the difference between / slash, \\ backslash and | vertical line, copy each character, and use reliable Unicode insertion methods when keys vary by layout.',
    headline: 'Slash, Backslash and Pipe Symbols',
    summary: 'Slash /, backslash \\ and vertical line | are three different ASCII and Unicode characters. They are easy to confuse because keyboard placement varies, especially across regional layouts.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The three characters',
        paragraphs: [
          'Use / for the solidus or forward slash, \\ for reverse solidus or backslash, and | for vertical line. They have different Unicode code points and different technical uses.'
        ],
        bullets: [
          '/ — U+002F SOLIDUS',
          '\\ — U+005C REVERSE SOLIDUS',
          '| — U+007C VERTICAL LINE'
        ]
      },
      {
        heading: 'Common uses',
        paragraphs: [
          'Forward slash commonly separates alternatives, dates and URL path components. Backslash is important in Windows paths and many programming escape sequences. Vertical line is often called pipe in command lines and programming contexts.',
          'When meaning matters, do not substitute similar-looking mathematical slashes or vertical bars from other Unicode ranges.'
        ]
      },
      {
        heading: 'When the keyboard key is hard to find',
        paragraphs: [
          'Physical placement differs across keyboard layouts. If the expected key does not produce the right character, first verify the active layout instead of testing undocumented modifier combinations.',
          'Windows Symbols and Mac Character Viewer provide layout-independent fallbacks for uncommon punctuation.'
        ]
      },
      {
        heading: 'Microsoft Word Unicode input',
        paragraphs: [
          'In Word on Windows, type the hexadecimal code and press Alt + X: 002F for /, 005C for \\, and 007C for |. This is a Unicode input method and should not be confused with numeric-keypad Alt codes.'
        ]
      },
      {
        heading: 'Google Docs',
        paragraphs: [
          'Google Docs and Slides can search the Special characters dialog by Unicode value. That is useful when a keyboard layout hides one of these characters or produces a different symbol.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, appleMacSymbols, googleDocsSpecial, unicodeUcd],
    related: [
      { label: 'Unicode Converter', href: '/tools/unicode-converter/' },
      { label: 'Copy & paste symbols', href: '/tools/copy-paste-symbols/' },
      { label: 'Unicode Explorer', href: '/unicode/' }
    ]
  },
  {
    slug: 'quotation-marks-apostrophes',
    title: 'Quotation Marks & Apostrophes — Straight vs Curly',
    description: 'Copy straight and curly quotation marks, apostrophes and primes, compare their Unicode values, and choose the right character for writing or code.',
    headline: 'Quotation Marks and Apostrophes',
    summary: 'Straight quotes, curly quotes, apostrophes and prime marks can look similar but represent different characters. This guide helps you choose and type the correct Unicode mark.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Common quote characters to copy',
        paragraphs: [
          'Typography often uses directional quotation marks, while source code and plain-text formats usually rely on straight ASCII quotes. Prime marks are separate characters used for measurements and notation.'
        ],
        bullets: [
          '" — U+0022 QUOTATION MARK',
          "' — U+0027 APOSTROPHE",
          '“ — U+201C LEFT DOUBLE QUOTATION MARK',
          '” — U+201D RIGHT DOUBLE QUOTATION MARK',
          '‘ — U+2018 LEFT SINGLE QUOTATION MARK',
          '’ — U+2019 RIGHT SINGLE QUOTATION MARK',
          '′ — U+2032 PRIME',
          '″ — U+2033 DOUBLE PRIME'
        ]
      },
      {
        heading: 'Apostrophe vs right single quotation mark',
        paragraphs: [
          'Many publishing systems display U+2019 RIGHT SINGLE QUOTATION MARK as a typographic apostrophe. U+0027 APOSTROPHE remains common in code, identifiers and plain text.',
          'Choose based on the target format rather than appearance alone. Replacing straight quotes inside code can break syntax.'
        ]
      },
      {
        heading: 'Prime marks are not quotation marks',
        paragraphs: [
          'Prime and double-prime characters are commonly used for feet, inches, minutes and seconds in technical notation. They are distinct from curly closing quotes even when a font makes them look similar.'
        ]
      },
      {
        heading: 'Reliable insertion methods',
        paragraphs: [
          'Use Windows Symbols or Mac Character Viewer to search by name when you need a typographic quote. In Microsoft Word, Unicode hex plus Alt + X can insert the exact character; for example 201C for “ and 201D for ”.',
          'Google Docs Special characters can also search by Unicode value or by browsing punctuation categories.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, appleMacSymbols, googleDocsSpecial, unicodeUcd],
    related: [
      { label: 'Punctuation symbols', href: '/symbols/punctuation/' },
      { label: 'Copy & paste symbols', href: '/tools/copy-paste-symbols/' },
      { label: 'Unicode Explorer', href: '/unicode/' }
    ]
  },
  {
    slug: 'brackets-braces-parentheses',
    title: 'Brackets, Braces & Parentheses — Copy and Type',
    description: 'Copy parentheses, square brackets, curly braces and angle brackets, compare similar Unicode forms, and use dependable insertion methods across platforms.',
    headline: 'Brackets, Braces and Parentheses',
    summary: 'Parentheses (), square brackets [], braces {} and angle brackets are separate characters with different roles in prose, mathematics and programming. Unicode also contains many decorative and mathematical variants.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Core bracket characters',
        paragraphs: [
          'The basic ASCII bracket set is widely supported and usually the correct choice for code, formulas and plain text.'
        ],
        bullets: [
          '( ) — U+0028 and U+0029 PARENTHESES',
          '[ ] — U+005B and U+005D SQUARE BRACKETS',
          '{ } — U+007B and U+007D CURLY BRACKETS',
          '< > — U+003C LESS-THAN SIGN and U+003E GREATER-THAN SIGN'
        ]
      },
      {
        heading: 'Angle brackets are easy to confuse',
        paragraphs: [
          'The keyboard characters < and > are mathematical comparison signs, not the same as Unicode angle-bracket characters such as ⟨ and ⟩. Use the form required by the document or technical notation.',
          'Decorative CJK brackets and mathematical delimiters should not be substituted into source code unless the language explicitly supports them.'
        ]
      },
      {
        heading: 'When a brace is missing from your layout',
        paragraphs: [
          'Keyboard placement changes by layout. Windows Symbols and Mac Character Viewer can help when a delimiter is difficult to locate. For code-heavy work, switching to the intended programming keyboard layout may be more efficient than repeated copying.'
        ]
      },
      {
        heading: 'Word and Google Docs',
        paragraphs: [
          'Microsoft Word accepts Unicode hexadecimal values followed by Alt + X. Google Docs and Slides can search Special characters by Unicode value, which is especially useful for non-ASCII mathematical brackets.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, appleMacSymbols, googleDocsSpecial, unicodeUcd],
    related: [
      { label: 'Brackets & delimiters catalog', href: '/tools/copy-paste-symbols/#catalog-brackets' },
      { label: 'Unicode Explorer', href: '/unicode/' },
      { label: 'Unicode Converter', href: '/tools/unicode-converter/' }
    ]
  },
  {
    slug: 'bullet-point-symbols',
    title: 'Bullet Point Symbols — Copy, Type & Choose the Right Dot',
    description: 'Copy bullet point symbols such as •, ‣ and ⁃, compare them with middle dots and circles, and use verified Windows, Word, Mac and Docs insertion methods.',
    headline: 'Bullet Point Symbols',
    summary: 'Unicode includes several bullet-like characters. The standard bullet • is U+2022, but triangular bullets, hyphen bullets, middle dots and circle symbols have different meanings and code points.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Common bullets to copy',
        paragraphs: [
          'Choose a character based on the intended list style and text semantics rather than selecting the first round dot that looks close.'
        ],
        bullets: [
          '• — U+2022 BULLET',
          '‣ — U+2023 TRIANGULAR BULLET',
          '⁃ — U+2043 HYPHEN BULLET',
          '· — U+00B7 MIDDLE DOT',
          '● — U+25CF BLACK CIRCLE',
          '○ — U+25CB WHITE CIRCLE'
        ]
      },
      {
        heading: 'Windows Alt code for the standard bullet',
        paragraphs: [
          'Microsoft documents Alt + 0149 for the standard bullet • using the numeric keypad. The top number row is not the same input method.',
          'If a laptop lacks a numeric keypad, use the Windows Symbols panel, Character Map, copy/paste or Word Unicode input instead.'
        ]
      },
      {
        heading: 'Microsoft Word and Mac',
        paragraphs: [
          'In Word, type 2022 and press Alt + X for •. On Mac, open Character Viewer and search for bullet or browse punctuation and symbol categories.'
        ]
      },
      {
        heading: 'Google Docs and list formatting',
        paragraphs: [
          'Google Docs has both list-formatting controls and the Special characters dialog. Use list formatting when you want structured document bullets; insert the Unicode bullet character directly when it belongs inside running text or a plain-text export.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, appleMacSymbols, googleDocsSpecial, unicodeUcd],
    related: [
      { label: 'Bullet character page', href: '/symbols/bullet/' },
      { label: 'Punctuation symbols', href: '/symbols/punctuation/' },
      { label: 'Alt Code Finder', href: '/tools/alt-code-finder/' }
    ]
  },
  {
    slug: 'check-mark-cross-symbols',
    title: 'Check Mark & Cross Symbols — Copy, Type and Compare',
    description: 'Copy check marks, ballot boxes and cross symbols, compare similar Unicode characters, and use reliable Windows, Mac, Word and Google Docs insertion methods.',
    headline: 'Check Mark and Cross Symbols',
    summary: 'A check mark, heavy check mark, ballot box and emoji check are different Unicode characters. Choosing the exact character matters when you need predictable text rendering or data exchange.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 6,
    sections: [
      {
        heading: 'Common status symbols',
        paragraphs: [
          'These characters are useful for task lists, approvals and comparisons, but they are not interchangeable in every font or application.'
        ],
        bullets: [
          '✓ — U+2713 CHECK MARK',
          '✔ — U+2714 HEAVY CHECK MARK',
          '☑ — U+2611 BALLOT BOX WITH CHECK',
          '☐ — U+2610 BALLOT BOX',
          '☒ — U+2612 BALLOT BOX WITH X',
          '✗ — U+2717 BALLOT X',
          '✘ — U+2718 HEAVY BALLOT X',
          '✅ — U+2705 WHITE HEAVY CHECK MARK'
        ]
      },
      {
        heading: 'Text symbol vs emoji presentation',
        paragraphs: [
          'Some check-related characters may render as colorful emoji on one platform and monochrome text on another. If consistent typography matters, test the exact character in the target font and application.'
        ]
      },
      {
        heading: 'Word, Windows and Mac methods',
        paragraphs: [
          'For ✓ in Word, type 2713 and press Alt + X. Windows Character Map or the Symbols panel can be used when no reviewed numeric Alt code is available. On Mac, search Character Viewer for check mark or ballot.'
        ]
      },
      {
        heading: 'Google Docs',
        paragraphs: [
          'Google Docs and Slides can browse or search special characters, including by Unicode value. That is safer than substituting a square-root symbol or letter v for a check mark.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, appleMacSymbols, googleDocsSpecial, unicodeUcd],
    related: [
      { label: 'Check mark character page', href: '/symbols/check-mark/' },
      { label: 'Check marks catalog', href: '/tools/copy-paste-symbols/#catalog-checkmarks' },
      { label: 'Unicode Explorer', href: '/unicode/' }
    ]
  },
  {
    slug: 'arrow-symbols-keyboard',
    title: 'Arrow Symbols on Keyboard — Copy, Unicode & Typing',
    description: 'Copy arrow symbols from basic directions to double arrows, learn their Unicode values, and use reliable Windows, Mac, Word and Google Docs insertion methods.',
    headline: 'Arrow Symbols on Keyboard',
    summary: 'Unicode contains many arrow characters beyond ← ↑ → ↓. This guide starts with the common directional arrows, then explains how to insert less familiar arrows without relying on guessed shortcuts.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Common arrows to copy',
        paragraphs: [
          'Basic directional arrows are distinct Unicode text characters and are suitable for navigation labels, diagrams, instructions and plain-text notation.'
        ],
        bullets: [
          '← — U+2190 LEFTWARDS ARROW',
          '↑ — U+2191 UPWARDS ARROW',
          '→ — U+2192 RIGHTWARDS ARROW',
          '↓ — U+2193 DOWNWARDS ARROW',
          '↔ — U+2194 LEFT RIGHT ARROW',
          '↕ — U+2195 UP DOWN ARROW',
          '⇒ — U+21D2 RIGHTWARDS DOUBLE ARROW',
          '⇔ — U+21D4 LEFT RIGHT DOUBLE ARROW'
        ]
      },
      {
        heading: 'Microsoft Word Unicode input',
        paragraphs: [
          'In Word on Windows, type the hexadecimal value and press Alt + X. For example, 2192 followed by Alt + X produces →, while 21D2 followed by Alt + X produces ⇒.',
          'This method is separate from Windows numeric-keypad Alt codes.'
        ]
      },
      {
        heading: 'Windows and Mac character pickers',
        paragraphs: [
          'Windows includes arrow and symbol categories in the Symbols area of the emoji panel. macOS Character Viewer can search for terms such as right arrow, left arrow or double arrow.'
        ]
      },
      {
        heading: 'Google Docs and Slides',
        paragraphs: [
          'Google specifically lists arrows among the kinds of special characters available in Docs and Slides. You can browse categories, enter a Unicode value or draw a shape to search for a matching character.'
        ]
      },
      {
        heading: 'Arrow character vs icon',
        paragraphs: [
          'Use a Unicode arrow when the arrow belongs in text and should copy with the text. Use an SVG or interface icon when the shape is purely visual, needs custom sizing or must match a product icon system.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, appleMacSymbols, googleDocsSpecial, unicodeUcd],
    related: [
      { label: 'Arrow symbols', href: '/symbols/arrows/' },
      { label: 'Right arrow character page', href: '/symbols/right-arrow/' },
      { label: 'Arrow catalog', href: '/tools/copy-paste-symbols/#catalog-arrows' }
    ]
  },
  {
    slug: 'alt-code-not-working',
    title: 'Alt Code Not Working? Windows Troubleshooting Guide',
    description: 'Fix common Windows Alt-code problems such as missing numeric keypad input, Num Lock issues and unsupported codes, with safer Character Map and Word alternatives.',
    headline: 'Alt Code Not Working on Windows?',
    summary: 'The classic Windows Alt-code method has specific requirements. Many failures happen because the number row is used instead of the numeric keypad, or because a number found online is actually a Unicode value rather than a documented Alt code.',
    category: 'Windows',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 7,
    sections: [
      {
        heading: 'Check the numeric keypad first',
        paragraphs: [
          'Microsoft states that the documented four-digit Alt-code method uses the numeric keypad and does not work with the row of numbers above the letters.',
          'If your laptop has no numeric keypad, use another insertion method rather than assuming the same digits will work from the top row.'
        ],
        bullets: [
          'Confirm Num Lock if your hardware requires it.',
          'Hold Alt while entering the documented digits on the numeric keypad.',
          'Include a leading zero when the documented code includes one.',
          'Release Alt after entering the full code.'
        ]
      },
      {
        heading: 'Do not confuse Unicode decimal values with Alt codes',
        paragraphs: [
          'Unicode assigns every character a code point, but that number is not automatically a Windows Alt code. Copying a Unicode decimal value from a character table and typing it after Alt can produce the wrong result or nothing at all.',
          'Use the Alt Code Finder on this site only for codes that have been separately reviewed against platform documentation.'
        ]
      },
      {
        heading: 'Use Windows Symbols or Character Map instead',
        paragraphs: [
          'Microsoft documents the Windows key + period panel for browsing punctuation, accented characters and other symbols. Character Map is another practical fallback when a code is unavailable or the keyboard lacks a numeric keypad.'
        ]
      },
      {
        heading: 'Use Word Alt+X when you know the Unicode hex value',
        paragraphs: [
          'Microsoft Word on Windows supports hexadecimal Unicode followed by Alt + X. This is often more useful for uncommon symbols because you can use the actual Unicode code point rather than searching for an Alt code.'
        ]
      },
      {
        heading: 'If the character still looks wrong',
        paragraphs: [
          'The input method may be correct while the font lacks the glyph or draws it differently. Try a font with broader Unicode coverage and compare the code point rather than judging only by shape.'
        ]
      }
    ],
    sources: [microsoftWindows, microsoftWordUnicode, unicodeUcd],
    related: [
      { label: 'Alt Code Finder', href: '/tools/alt-code-finder/' },
      { label: 'Shortcut Finder', href: '/tools/shortcut-finder/' },
      { label: 'Windows special-character guide', href: '/guides/type-special-characters-windows/' }
    ]
  },
  {
    slug: 'missing-symbol-square-box',
    title: 'Why a Symbol Shows as a Square Box or Missing Glyph',
    description: 'Understand why Unicode characters sometimes appear as empty boxes, tofu or replacement glyphs, and how fonts, apps and fallback rendering affect the result.',
    headline: 'Why Does a Symbol Show as a Square Box?',
    summary: 'A square box usually means the text contains a character but the current font or rendering environment cannot draw an appropriate glyph. Changing the character is not always the right fix.',
    category: 'Symbols',
    published: '2026-10-15',
    modified: '2026-10-15',
    readingMinutes: 6,
    sections: [
      {
        heading: 'The character and the glyph are different things',
        paragraphs: [
          'Unicode identifies abstract characters with code points. Fonts provide visual glyphs for some subset of those characters. A valid code point can therefore exist in the text even when the active font cannot display it.',
          'The placeholder may appear as an empty rectangle, a box with a question mark, a hexadecimal code or another missing-glyph design depending on the platform.'
        ]
      },
      {
        heading: 'Try a font with broader Unicode coverage',
        paragraphs: [
          'Switching fonts is the first troubleshooting step when the code point is correct. System fonts and specialist Unicode fonts cover different ranges, and no single font is required to draw every Unicode character.',
          'If the symbol works in one app but not another, the apps may be choosing different fallback fonts.'
        ]
      },
      {
        heading: 'Check the exact code point',
        paragraphs: [
          'Visually similar characters can belong to completely different scripts or symbol blocks. Use the Unicode Explorer or Converter to confirm the U+ value rather than replacing the character based only on appearance.'
        ]
      },
      {
        heading: 'Emoji and text presentation can differ',
        paragraphs: [
          'Some characters can render as monochrome text in one environment and colorful emoji in another. This is different from a truly missing glyph, but it can still make the same Unicode character look unexpectedly different.'
        ]
      },
      {
        heading: 'When copy and paste is still correct',
        paragraphs: [
          'If the receiving system stores the code point correctly, a missing glyph on one device does not necessarily mean the text is corrupted. Test the character in another font or application before substituting a different symbol.'
        ]
      }
    ],
    sources: [unicodeUcd, appleMacSymbols, microsoftWindows],
    related: [
      { label: 'Unicode Explorer', href: '/unicode/' },
      { label: 'Unicode Converter', href: '/tools/unicode-converter/' },
      { label: 'Copy & paste symbols', href: '/tools/copy-paste-symbols/' }
    ]
  }
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
