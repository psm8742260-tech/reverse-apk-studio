export type LanguageCode = 'te' | 'en' | 'hi' | 'kn' | 'ta';

export const LANGUAGE_NAMES: Record<LanguageCode, { name: string; native: string }> = {
  te: { name: 'Telugu', native: 'తెలుగు' },
  en: { name: 'English', native: 'English' },
  hi: { name: 'Hindi', native: 'हिन्दी' },
  kn: { name: 'Kannada', native: 'ಕನ್ನಡ' },
  ta: { name: 'Tamil', native: 'தமிழ்' }
};

export function translate(key: string, lang: LanguageCode = 'te'): string {
  // Simplified translation stub
  return key;
}
