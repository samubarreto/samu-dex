import { useCallback, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark' | 'nord_light' | 'solarized_light' | 'modern_ink' | 'rose_pine_dawn' | 'soaring_skies' | 'tangerine'

const STORAGE_KEY = 'app-theme'
const THEME_EVENT = 'app-theme-change'

const SUPPORTED_THEMES: Theme[] = ['light', 'dark', 'nord_light', 'solarized_light', 'modern_ink', 'rose_pine_dawn', 'soaring_skies', 'tangerine']

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

    return value && SUPPORTED_THEMES.includes(value as Theme) ? (value as Theme) : null
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
