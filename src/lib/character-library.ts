export interface CharacterLibraryItem {
  character: string;
  name: string;
  codePoint: string;
  href?: string;
  savedAt: number;
}

const FAVORITES_KEY = 'character-toolbox.favorites.v1';
const RECENTS_KEY = 'character-toolbox.recents.v1';
const MAX_RECENTS = 20;

function storageAvailable() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function normalizeItem(item: Partial<CharacterLibraryItem>): CharacterLibraryItem | null {
  const character = typeof item.character === 'string' ? item.character : '';
  const scalar = Array.from(character);

  if (scalar.length !== 1) return null;

  const codePoint = scalar[0].codePointAt(0);
  if (codePoint === undefined || (codePoint >= 0xd800 && codePoint <= 0xdfff)) return null;

  return {
    character: scalar[0],
    name: typeof item.name === 'string' && item.name.trim() ? item.name.trim() : 'Unicode character',
    codePoint:
      typeof item.codePoint === 'string' && item.codePoint.trim()
        ? item.codePoint.trim()
        : `U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`,
    href: typeof item.href === 'string' && item.href.startsWith('/') ? item.href : undefined,
    savedAt: typeof item.savedAt === 'number' ? item.savedAt : Date.now()
  };
}

function readList(key: string): CharacterLibraryItem[] {
  if (!storageAvailable()) return [];

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => normalizeItem(item))
      .filter((item): item is CharacterLibraryItem => Boolean(item));
  } catch {
    return [];
  }
}

function writeList(key: string, items: CharacterLibraryItem[]) {
  if (!storageAvailable()) return;

  try {
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // Local storage is optional. Core copy/search features still work without it.
  }
}

function sameCharacter(a: CharacterLibraryItem, b: CharacterLibraryItem) {
  return a.character === b.character;
}

function notify() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('character-library-change'));
  }
}

export function getFavoriteCharacters() {
  return readList(FAVORITES_KEY);
}

export function getRecentCharacters() {
  return readList(RECENTS_KEY);
}

export function isFavoriteCharacter(character: string) {
  return getFavoriteCharacters().some((item) => item.character === character);
}

export function toggleFavoriteCharacter(item: Partial<CharacterLibraryItem>) {
  const normalized = normalizeItem(item);
  if (!normalized) return false;

  const favorites = getFavoriteCharacters();
  const exists = favorites.some((current) => sameCharacter(current, normalized));

  if (exists) {
    writeList(
      FAVORITES_KEY,
      favorites.filter((current) => !sameCharacter(current, normalized))
    );
    notify();
    return false;
  }

  writeList(FAVORITES_KEY, [normalized, ...favorites].slice(0, 100));
  notify();
  return true;
}

export function removeFavoriteCharacter(character: string) {
  const favorites = getFavoriteCharacters();
  writeList(
    FAVORITES_KEY,
    favorites.filter((item) => item.character !== character)
  );
  notify();
}

export function rememberRecentCharacter(item: Partial<CharacterLibraryItem>) {
  const normalized = normalizeItem(item);
  if (!normalized) return;

  const recents = getRecentCharacters().filter((current) => !sameCharacter(current, normalized));
  writeList(RECENTS_KEY, [normalized, ...recents].slice(0, MAX_RECENTS));
  notify();
}

export function clearRecentCharacters() {
  writeList(RECENTS_KEY, []);
  notify();
}
