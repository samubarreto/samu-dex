import { useCallback, useSyncExternalStore } from 'react'
import {
  defaultLocale,
  locales,
  normalizeLocale,
  supportedLocales,
  type Locale,
} from '../locales'
import type { TranslationDictionary } from '../locales/types'

type TranslationParams = Record<string, string | number>

type TranslateOptions = {
  fallback?: string
  locale?: Locale
  params?: TranslationParams
}

const STORAGE_KEY = 'app-locale'
const TRANSLATION_EVENT = 'app-locale-change'

let activeLocale = resolveInitialLocale()

function resolveInitialLocale(): Locale {
  const storedLocale = readStoredLocale()

  if (storedLocale) {
    return storedLocale
  }

  if (typeof document !== 'undefined' && document.documentElement.lang) {
    return normalizeLocale(document.documentElement.lang)
  }

  if (typeof navigator !== 'undefined' && navigator.language) {
    return normalizeLocale(navigator.language)
  }

  return defaultLocale
}

function readStoredLocale(): Locale | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY)

    return storedLocale ? normalizeLocale(storedLocale) : null
  } catch {
    return null
  }
}

function writeLocale(locale: Locale) {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }

  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, locale)
  } catch {
  }
}

function emitLocaleChange() {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new Event(TRANSLATION_EVENT))
}

function subscribe(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  window.addEventListener(TRANSLATION_EVENT, onStoreChange)

  return () => {
    window.removeEventListener(TRANSLATION_EVENT, onStoreChange)
  }
}

function getLocaleSnapshot() {
  return activeLocale
}

function getServerLocaleSnapshot() {
  return defaultLocale
}

function resolveMessage(messages: TranslationDictionary, key: string): string | undefined {
  const segments = key.split('.').filter(Boolean)
  let currentValue: string | TranslationDictionary | undefined = messages

  for (const segment of segments) {
    if (!currentValue || typeof currentValue === 'string') {
      return undefined
    }

    currentValue = currentValue[segment]
  }

  return typeof currentValue === 'string' ? currentValue : undefined
}

function interpolateMessage(message: string, params?: TranslationParams) {
  if (!params) {
    return message
  }

  return message.replace(/\{(\w+)\}/g, (placeholder, token) => {
    const value = params[token]

    return value === undefined ? placeholder : String(value)
  })
}

function updateLocale(nextLocale: Locale) {
  const normalizedLocale = normalizeLocale(nextLocale)

  if (normalizedLocale === activeLocale) {
    return
  }

  activeLocale = normalizedLocale
  writeLocale(normalizedLocale)
  emitLocaleChange()
}

export function useTranslation() {
  const locale = useSyncExternalStore(
    subscribe,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  )

  const translate = useCallback(
    (key: string, options: TranslateOptions = {}) => {
      const localeToUse = options.locale ? normalizeLocale(options.locale) : locale
      const translatedMessage = resolveMessage(locales[localeToUse], key)

      if (!translatedMessage) {
        return options.fallback ?? key
      }

      return interpolateMessage(translatedMessage, options.params)
    },
    [locale],
  )

  return {
    locale,
    setLocale: updateLocale,
    supportedLocales,
    translate,
  }
}