/**
 * Translation mappings for multilingual image support
 * Supports: English (en), Hindi (hin), Marathi (marathi)
 */

export type Language = 'en' | 'hin' | 'marathi';

export interface Translations {
    [key: string]: {
        [key in Language]: string;
    };
}

export const translations: Translations = {
    Star: {
        en: 'Star',
        hin: 'स्टार',
        marathi: 'तारा',
    },
    Fork: {
        en: 'Fork',
        hin: 'फोर्क',
        marathi: 'फोर्क',
    },
    Repo: {
        en: 'Repo',
        hin: 'रिपो',
        marathi: 'रिपो',
    },
};

/**
 * Get translated text for a given key and language
 * @param key - The translation key
 * @param language - The target language (default: 'en')
 * @returns The translated string or the key itself if not found
 */
export function getTranslation(key: string, language: Language = 'en'): string {
    if (translations[key] && translations[key][language]) {
        return translations[key][language];
    }
    return key;
}

/**
 * Check if a language is supported
 * @param lang - The language code to check
 * @returns true if language is supported
 */
export function isSupportedLanguage(lang: string): lang is Language {
    return ['en', 'hin', 'marathi'].includes(lang);
}

/**
 * Get the default language or validate the provided one
 * @param lang - The requested language
 * @returns A valid language code
 */
export function getValidLanguage(lang?: string): Language {
    if (lang && isSupportedLanguage(lang)) {
        return lang;
    }
    return 'en';
}
