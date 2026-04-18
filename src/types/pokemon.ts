import type { NamedAPIResource } from 'pokenode-ts'

export type PokemonListItem = NamedAPIResource & {
  id: number
  imageUrl: string
}