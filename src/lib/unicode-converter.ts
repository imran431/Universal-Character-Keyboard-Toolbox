function isScalarValue(value: number) {
  return value >= 0 && value <= 0x10ffff && !(value >= 0xd800 && value <= 0xdfff);
}

export function formatCodePoint(codePoint: number) {
  return `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`;
}

export function textToUnicodeRepresentations(text: string) {
  const codePoints = Array.from(text, (character) => character.codePointAt(0) ?? 0);

  return {
    codePoints: codePoints.map(formatCodePoint).join(' '),
    hexadecimal: codePoints.map((value) => value.toString(16).toUpperCase()).join(' '),
    decimal: codePoints.map(String).join(' '),
    javascript: codePoints
      .map((value) =>
        value <= 0xffff
          ? `\\u${value.toString(16).toUpperCase().padStart(4, '0')}`
          : `\\u{${value.toString(16).toUpperCase()}}`
      )
      .join(''),
    htmlDecimal: codePoints.map((value) => `&#${value};`).join(''),
    htmlHex: codePoints.map((value) => `&#x${value.toString(16).toUpperCase()};`).join(''),
    css: codePoints.map((value) => `\\${value.toString(16).toUpperCase()} `).join('')
  };
}

function parseToken(token: string): number | null {
  const trimmed = token.trim();
  if (!trimmed) return null;

  const patterns: Array<[RegExp, number]> = [
    [/^U\+([0-9A-F]{1,6})$/i, 16],
    [/^0x([0-9A-F]{1,6})$/i, 16],
    [/^\\u\{([0-9A-F]{1,6})\}$/i, 16],
    [/^\\u([0-9A-F]{4})$/i, 16],
    [/^&#x([0-9A-F]{1,6});?$/i, 16],
    [/^&#([0-9]{1,7});?$/, 10],
    [/^([0-9A-F]{4,6})$/i, 16]
  ];

  for (const [pattern, radix] of patterns) {
    const match = trimmed.match(pattern);
    if (!match) continue;
    const value = Number.parseInt(match[1], radix);
    return isScalarValue(value) ? value : null;
  }

  return null;
}

export interface DecodeResult {
  text: string;
  invalidTokens: string[];
}

export function decodeUnicodeTokens(input: string): DecodeResult {
  const normalized = input
    .replace(/(\\u\{[0-9A-Fa-f]{1,6}\}|\\u[0-9A-Fa-f]{4}|U\+[0-9A-Fa-f]{1,6}|0x[0-9A-Fa-f]{1,6}|&#x[0-9A-Fa-f]{1,6};?|&#[0-9]{1,7};?)/g, ' $1 ')
    .replace(/[;,]+(?=\s|$)/g, ' ');

  const tokens = normalized.split(/\s+/).filter(Boolean);
  const characters: string[] = [];
  const invalidTokens: string[] = [];

  for (const token of tokens) {
    const codePoint = parseToken(token);

    if (codePoint === null) {
      invalidTokens.push(token);
      continue;
    }

    characters.push(String.fromCodePoint(codePoint));
  }

  return {
    text: characters.join(''),
    invalidTokens
  };
}
