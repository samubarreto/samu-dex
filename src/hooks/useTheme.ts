import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark' | 'nord_light' | 'solarized_light' | 'modern_ink' | 'husqy' | 'aurora' | 'tangerine'

const STORAGE_KEY = 'app-theme'
const THEME_EVENT = 'app-theme-change'

const LEGACY_THEME_MAP: Record<string, Theme> = {
  rose_pine_dawn: 'husqy',
  soaring_skies: 'aurora',
}

const SUPPORTED_THEMES: Theme[] = ['light', 'dark', 'nord_light', 'solarized_light', 'modern_ink', 'husqy', 'aurora', 'tangerine']

let activeTheme = resolveInitialTheme()

function resolveInitialTheme(): Theme {
  const stored = readStoredTheme()

  if (stored) {
    return stored
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  }

  return 'dark'
}

function readStoredTheme(): Theme | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY)

    if (!value) {
      return null
    }

    const normalizedTheme = LEGACY_THEME_MAP[value] ?? value

    if (!SUPPORTED_THEMES.includes(normalizedTheme as Theme)) {
      return null
    }

    if (normalizedTheme !== value) {
      window.localStorage.setItem(STORAGE_KEY, normalizedTheme)
    }

    return normalizedTheme as Theme
  } catch {
    return null
  }
}

function applyTheme(theme: Theme) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', theme)
  }
}

function writeTheme(theme: Theme) {
  applyTheme(theme)

  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
  }
}

function emitThemeChange() {
  if (typeof window === 'undefined') {
    return
  }

  window.dispatchEvent(new Event(THEME_EVENT))
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined
  }

  window.addEventListener(THEME_EVENT, callback)

  return () => {
    window.removeEventListener(THEME_EVENT, callback)
  }
}

function getSnapshot() {
  return activeTheme
}

function getServerSnapshot(): Theme {
  return 'dark'
}

function updateTheme(next: Theme) {
  if (!SUPPORTED_THEMES.includes(next) || next === activeTheme) {
    return
  }

  activeTheme = next
  writeTheme(next)
  emitThemeChange()
}

// Apply on module load
applyTheme(activeTheme)

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const setTheme = useCallback((next: Theme) => {
    updateTheme(next)
  }, [])

  return {
    theme,
    setTheme,
    supportedThemes: SUPPORTED_THEMES,
  }
}
