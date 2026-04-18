import en from './en'
import es from './es'
import hy from './hy'
import it from './it'
import ja from './ja'
import ka from './ka'
import mn from './mn'
import pt from './pt'
import th from './th'
import type { TranslationDictionary } from './types'
import zh from './zh'

export const locales = {
  en,
  pt,
  es,
  it,
  ja,
  zh,
  th,
  ka,
  mn,
  hy,
} satisfies Record<string, TranslationDictionary>

export type Locale = keyof typeof locales

export const defaultLocale: Locale = 'pt'

export const supportedLocales = Object.keys(locales) as Locale[]

export function isLocale(value: string): value is Locale {
  return value in locales
}

export function normalizeLocale(value?: string | null): Locale {
  if (!value) {
    return defaultLocale
  }

  const normalizedValue = value.trim().toLowerCase().replace('_', '-')
  const [language] = normalizedValue.split('-')

  return isLocale(language) ? language : defaultLocale
}