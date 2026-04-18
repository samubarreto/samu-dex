import { useCallback, useSyncExternalStore } from 'react'
import type { PokemonListItem } from '../types/pokemon'

const STORAGE_KEY = 'pokemon-favourites'
const FAVOURITES_EVENT = 'pokemon-favourites-change'

function readFavourites(): PokemonListItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function writeFavourites(favourites: PokemonListItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  } catch {
    /* quota exceeded — silently ignore */
  }

  window.dispatchEvent(new Event(FAVOURITES_EVENT))
}

let cachedFavourites = readFavourites()

function subscribe(onStoreChange: () => void) {
  const handler = () => {
    cachedFavourites = readFavourites()
    onStoreChange()
  }

  window.addEventListener(FAVOURITES_EVENT, handler)
  window.addEventListener('storage', handler)

  return () => {
    window.removeEventListener(FAVOURITES_EVENT, handler)
    window.removeEventListener('storage', handler)
  }
}

function getSnapshot() {
  return cachedFavourites
}

export function useFavourites() {
  const favourites = useSyncExternalStore(subscribe, getSnapshot, () => [])

  const isFavourite = useCallback(
    (id: number) => favourites.some((p) => p.id === id),
    [favourites],
  )

  const toggleFavourite = useCallback(
    (pokemon: PokemonListItem) => {
      const current = readFavourites()
      const exists = current.some((p) => p.id === pokemon.id)
      const next = exists
        ? current.filter((p) => p.id !== pokemon.id)
        : [...current, pokemon]

      writeFavourites(next)
    },
    [],
  )

  return { favourites, isFavourite, toggleFavourite }
}
