export interface FontStyle {
  id: string;
  name: string;
  category: string;
  sample: string;
  transform: (text: string) => string;
}

// Unicode code point offsets and letterlike exceptions
const SCRIPT_EXCEPTIONS: Record<string, string> = {
  B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ',
  e: 'ℯ', g: 'ℊ', o: 'ℴ'
};

const FRAKTUR_EXCEPTIONS: Record<string, string> = {
  C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ'
};

const DOUBLE_STRUCK_EXCEPTIONS: Record<string, string> = {
  C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ'
};

const SMALL_CAPS: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ',
  j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
  s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
};

const UPSIDE_DOWN: Record<string, string> = {
  a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ',
  j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ',
  s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
  A: '∀', B: '𐐒', C: 'Ɔ', D: '◖', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I',
  J: 'ſ', K: 'ʞ', L: '˥', M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ',
  S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X', Y: '⅄', Z: 'Z',
  '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ',
  '8': '8', '9': '6', '0': '0', '.': '˙', ',': "'", "'": ',', '"': '„',
  '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
  '<': '>', '>': '<', '&': '⅋', '_': '‾'
};

function mapOffset(
  char: string,
  upperBase: number,
  lowerBase: number,
  digitBase?: number,
  exceptions?: Record<string, string>
): string {
  if (exceptions && exceptions[char]) {
    return exceptions[char];
  }

  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return String.fromCodePoint(upperBase + (code - 65));
  }
  if (code >= 97 && code <= 122) {
    return String.fromCodePoint(lowerBase + (code - 97));
  }
  if (digitBase !== undefined && code >= 48 && code <= 57) {
    return String.fromCodePoint(digitBase + (code - 48));
  }
  return char;
}

export const fontStyles: FontStyle[] = [
  {
    id: 'bold',
    name: 'Mathematical Bold',
    category: 'Standard',
    sample: 'Bold Text',
    transform: (text) =>
      Array.from(text)
        .map((c) => mapOffset(c, 0x1D400, 0x1D41A, 0x1D7CE))
        .join('')
  },
  {
    id: 'italic',
    name: 'Mathematical Italic',
    category: 'Standard',
    sample: 'Italic Text',
    transform: (text) =>
      Array.from(text)
        .map((c) => (c === 'h' ? 'ℎ' : mapOffset(c, 0x1D434, 0x1D44E)))
        .join('')
  },
  {
    id: 'bold-italic',
    name: 'Bold Italic',
    category: 'Standard',
    sample: 'Bold Italic',
    transform: (text) =>
      Array.from(text)
        .map((c) => mapOffset(c, 0x1D468, 0x1D482))
        .join('')
  },
  {
    id: 'script',
    name: 'Script / Cursive',
    category: 'Calligraphy',
    sample: 'Cursive Style',
    transform: (text) =>
      Array.from(text)
        .map((c) => mapOffset(c, 0x1D49C, 0x1D4B6, undefined, SCRIPT_EXCEPTIONS))
        .join('')
  },
  {
    id: 'bold-script',
    name: 'Bold Script',
    category: 'Calligraphy',
    sample: 'Bold Cursive',
    transform: (text) =>
      Array.from(text)
        .map((c) => mapOffset(c, 0x1D4D0, 0x1D4EA))
        .join('')
  },
  {
    id: 'fraktur',
    name: 'Gothic / Fraktur',
    category: 'Decorative',
    sample: 'Gothic Font',
    transform: (text) =>
      Array.from(text)
        .map((c) => mapOffset(c, 0x1D504, 0x1D51E, undefined, FRAKTUR_EXCEPTIONS))
        .join('')
  },
  {
    id: 'bold-fraktur',
    name: 'Bold Fraktur',
    category: 'Decorative',
    sample: 'Bold Gothic',
    transform: (text) =>
      Array.from(text)
        .map((c) => mapOffset(c, 0x1D56C, 0x1D586))
        .join('')
  },
  {
    id: 'double-struck',
    name: 'Double-Struck / Blackboard',
    category: 'Math',
    sample: 'Blackboard Bold',
    transform: (text) =>
      Array.from(text)
        .map((c) => mapOffset(c, 0x1D538, 0x1D552, 0x1D7D8, DOUBLE_STRUCK_EXCEPTIONS))
        .join('')
  },
  {
    id: 'monospace',
    name: 'Monospace Code',
    category: 'Technical',
    sample: 'Code Format',
    transform: (text) =>
      Array.from(text)
        .map((c) => mapOffset(c, 0x1D670, 0x1D68A, 0x1D7F6))
        .join('')
  },
  {
    id: 'circled',
    name: 'Circled / Bubble',
    category: 'Creative',
    sample: 'Bubble Text',
    transform: (text) =>
      Array.from(text)
        .map((c) => {
          const code = c.charCodeAt(0);
          if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + (code - 65));
          if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + (code - 97));
          if (code === 48) return '⓪';
          if (code >= 49 && code <= 57) return String.fromCodePoint(0x2460 + (code - 49));
          return c;
        })
        .join('')
  },
  {
    id: 'small-caps',
    name: 'Small Capitals',
    category: 'Creative',
    sample: 'Small Caps',
    transform: (text) =>
      Array.from(text)
        .map((c) => SMALL_CAPS[c.toLowerCase()] ?? c)
        .join('')
  },
  {
    id: 'fullwidth',
    name: 'Fullwidth / Vaporwave',
    category: 'Creative',
    sample: 'Aesthetic Wave',
    transform: (text) =>
      Array.from(text)
        .map((c) => {
          const code = c.charCodeAt(0);
          if (code === 32) return '　';
          if (code >= 33 && code <= 126) return String.fromCodePoint(code + 0xFEE0);
          return c;
        })
        .join('')
  },
  {
    id: 'upside-down',
    name: 'Upside Down / Inverted',
    category: 'Fun',
    sample: 'Flipped Text',
    transform: (text) =>
      Array.from(text)
        .reverse()
        .map((c) => UPSIDE_DOWN[c] ?? c)
        .join('')
  }
];
