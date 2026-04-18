import type { NamedAPIResource } from 'pokenode-ts'

export type PokemonListItem = NamedAPIResource & {
  id: number
  imageUrl: string
}

export type SortField = 'id' | 'name'
export type SortDirection = 'asc' | 'desc'