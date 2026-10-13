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

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;

  for (const storage of [window.localStorage, window.sessionStorage]) {
    try {
      const probe = 'character-toolbox.storage-probe';
      storage.setItem(probe, '1');
      storage.removeItem(probe);
      return storage;
    } catch {
      // Try the next browser storage option.
    }
  }

  return null;
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
  const storage = getStorage();
  if (!storage) return [];

  try {
    const raw = storage.getItem(key);
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
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(key, JSON.stringify(items));
    return true;
  } catch {
    return false;
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
    const next = favorites.filter((current) => !sameCharacter(current, normalized));
    if (!writeList(FAVORITES_KEY, next)) return true;
    notify();
    return false;
  }

  const next = [normalized, ...favorites].slice(0, 100);
  if (!writeList(FAVORITES_KEY, next)) return false;
  notify();
  return true;
}

export function removeFavoriteCharacter(character: string) {
  const favorites = getFavoriteCharacters();
  const changed = writeList(
    FAVORITES_KEY,
    favorites.filter((item) => item.character !== character)
  );

  if (changed) notify();
}

export function rememberRecentCharacter(item: Partial<CharacterLibraryItem>) {
  const normalized = normalizeItem(item);
  if (!normalized) return;

  const recents = getRecentCharacters().filter((current) => !sameCharacter(current, normalized));
  if (writeList(RECENTS_KEY, [normalized, ...recents].slice(0, MAX_RECENTS))) {
    notify();
  }
}

export function clearRecentCharacters() {
  if (writeList(RECENTS_KEY, [])) notify();
}
