import type { NamedAPIResource, NamedAPIResourceList, Pokemon } from 'pokenode-ts'
import type { PokemonListItem } from '../types/pokemon'
import { POKEAPI_BASE_URL, pokeApiClient } from './http'

const POKEMON_RESOURCE_PATH = '/pokemon'
const POKEMON_LIST_QUERY = '?limit=100000&offset=0'
const OFFICIAL_ARTWORK_BASE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

export const POKEMON_TYPE_COLORS: Record<string, string> = {
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  poison: '#A33EA1',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  fire: '#EE8130',
  water: '#6390F0',
  grass: '#7AC74C',
  electric: '#F7D02C',
  psychic: '#F95587',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
}

export const POKEMON_TYPE_NAMES = Object.keys(POKEMON_TYPE_COLORS)

const MYTHICAL_IDS = new Set([
  151, 251, 385, 386, 489, 490, 491, 492, 493, 494,
  647, 648, 649, 719, 720, 721, 801, 802, 807, 808,
  809, 893, 1025,
])

const LEGENDARY_IDS = new Set([
  144, 145, 146, 150, 243, 244, 245, 249, 250,
  377, 378, 379, 380, 381, 382, 383, 384,
  480, 481, 482, 483, 484, 485, 486, 487, 488,
  638, 639, 640, 641, 642, 643, 644, 645, 646,
  716, 717, 718,
  785, 786, 787, 788, 789, 790, 791, 792, 800,
  888, 889, 890, 891, 892, 894, 895, 896, 897, 898, 905,
  1001, 1002, 1003, 1004, 1007, 1008, 1014, 1015, 1016, 1017, 1024,
])

export type PokemonClassification = 'legendary' | 'mythical' | 'mega' | 'common'

export function getPokemonClassification(id: number, name: string): PokemonClassification {
  if (name.includes('-mega')) return 'mega'
  if (MYTHICAL_IDS.has(id)) return 'mythical'
  if (LEGENDARY_IDS.has(id)) return 'legendary'
  return 'common'
}

function extractPokemonId(url: string) {
  const idSegment = url.split('/').filter(Boolean).at(-1)

  return idSegment ? Number(idSegment) : Number.NaN
}

function mapPokemonResults(results: NamedAPIResource[]): PokemonListItem[] {
  return results.flatMap((pokemon) => {
    const id = extractPokemonId(pokemon.url)

    if (!Number.isFinite(id)) {
      return []
    }

    return [
      {
        ...pokemon,
        id,
        imageUrl: buildPokemonArtworkUrl(id),
      },
    ]
  })
}

export function buildPokemonApiUrl(id: number) {
  return `${POKEAPI_BASE_URL}${POKEMON_RESOURCE_PATH}/${id}`
}

export function buildPokemonArtworkUrl(id: number) {
  return `${OFFICIAL_ARTWORK_BASE_URL}/${id}.png`
}

export async function getPokemonList(signal?: AbortSignal) {
  const { data } = await pokeApiClient.get<NamedAPIResourceList>(
    `${POKEMON_RESOURCE_PATH}${POKEMON_LIST_QUERY}`,
    { signal },
  )

  return mapPokemonResults(data.results)
}

export async function getPokemonById(pokemonId: number | string, signal?: AbortSignal) {
  const { data } = await pokeApiClient.get<Pokemon>(`${POKEMON_RESOURCE_PATH}/${pokemonId}`, {
    signal,
  })

  return data
}

export function toPokemonListItem(pokemon: Pick<Pokemon, 'id' | 'name'>): PokemonListItem {
  return {
    name: pokemon.name,
    url: buildPokemonApiUrl(pokemon.id),
    id: pokemon.id,
    imageUrl: buildPokemonArtworkUrl(pokemon.id),
  }
}

type TypePokemonEntry = {
  pokemon: { name: string; url: string }
  slot: number
}

export async function getPokemonTypeMap(signal?: AbortSignal): Promise<Map<number, string[]>> {
  const typeMap = new Map<number, string[]>()

  const requests = POKEMON_TYPE_NAMES.map(async (typeName) => {
    const { data } = await pokeApiClient.get<{ pokemon: TypePokemonEntry[] }>(
      `/type/${typeName}`,
      { signal },
    )

    for (const entry of data.pokemon) {
      const id = extractPokemonId(entry.pokemon.url)

      if (!Number.isFinite(id)) continue

      const existing = typeMap.get(id)

      if (existing) {
        existing.push(typeName)
      } else {
        typeMap.set(id, [typeName])
      }
    }
  })

  await Promise.all(requests)

  return typeMap
}