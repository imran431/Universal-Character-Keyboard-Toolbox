export interface ReviewedWindowsAltCode {
  character: string;
  name: string;
  codePoint: string;
  digits: string;
  aliases: string[];
  sourceLabel: string;
  sourceUrl: string;
  verifiedAt: string;
}

const microsoftWindowsAltSource =
  'https://support.microsoft.com/en-US/Windows/Hardware/Input-Devices/windows-keyboard-tips-and-tricks';

export const reviewedWindowsAltCodes: ReviewedWindowsAltCode[] = [
  { character: '©', name: 'Copyright Symbol', codePoint: 'U+00A9', digits: '0169', aliases: ['copyright'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '®', name: 'Registered Symbol', codePoint: 'U+00AE', digits: '0174', aliases: ['registered trademark', 'registered'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '™', name: 'Trademark Symbol', codePoint: 'U+2122', digits: '0153', aliases: ['trademark', 'trade mark'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '•', name: 'Bullet', codePoint: 'U+2022', digits: '0149', aliases: ['bullet point', 'list dot'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '§', name: 'Section Sign', codePoint: 'U+00A7', digits: '0167', aliases: ['section symbol', 'legal section'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '†', name: 'Dagger', codePoint: 'U+2020', digits: '0134', aliases: ['dagger', 'obelisk'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '‡', name: 'Double Dagger', codePoint: 'U+2021', digits: '0135', aliases: ['double dagger'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '–', name: 'En Dash', codePoint: 'U+2013', digits: '0150', aliases: ['en dash', 'range dash'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '—', name: 'Em Dash', codePoint: 'U+2014', digits: '0151', aliases: ['em dash', 'long dash'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '¶', name: 'Pilcrow Sign', codePoint: 'U+00B6', digits: '0182', aliases: ['paragraph symbol', 'pilcrow'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '¡', name: 'Inverted Exclamation Mark', codePoint: 'U+00A1', digits: '0161', aliases: ['upside-down exclamation', 'inverted exclamation'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '¿', name: 'Inverted Question Mark', codePoint: 'U+00BF', digits: '0191', aliases: ['upside-down question', 'inverted question'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '¢', name: 'Cent Sign', codePoint: 'U+00A2', digits: '0162', aliases: ['cent', 'cents'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '£', name: 'Pound Sign', codePoint: 'U+00A3', digits: '0163', aliases: ['pound', 'sterling', 'gbp'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '€', name: 'Euro Sign', codePoint: 'U+20AC', digits: '0128', aliases: ['euro', 'eur'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' },
  { character: '¥', name: 'Yen Sign', codePoint: 'U+00A5', digits: '0165', aliases: ['yen', 'jpy'], sourceLabel: 'Microsoft Support — Windows keyboard tips and tricks', sourceUrl: microsoftWindowsAltSource, verifiedAt: '2026-10-15' }
];
