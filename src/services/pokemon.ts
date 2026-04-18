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

/** Attacking-type effectiveness against each defending type (only non-1× entries). */
const TYPE_EFFECTIVENESS: Record<string, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy: { fire: 0.5, poison: 2, steel: 2, dragon: 2 },
}

export type TypeMatchup = { type: string; multiplier: number; sourceTypes?: string[] }

/**
 * Given a Pokémon's type names, return the attacking types that are
 * super-effective (combined multiplier > 1) with their multiplier.
 */
export function getTypeWeaknesses(types: string[]): TypeMatchup[] {
  const results: TypeMatchup[] = []
  for (const attackType of POKEMON_TYPE_NAMES) {
    const chart = TYPE_EFFECTIVENESS[attackType]
    if (!chart) continue
    const multiplier = types.reduce((m, defType) => m * (chart[defType] ?? 1), 1)
    if (multiplier > 1) results.push({ type: attackType, multiplier })
  }
  return results
}

/**
 * Given a Pokémon's type names, return the defending types that
 * the Pokémon's STAB moves are super-effective against, with their
 * best multiplier (max across the Pokémon's own types).
 */
export function getTypeAdvantages(types: string[]): TypeMatchup[] {
  const results: TypeMatchup[] = []
  for (const defType of POKEMON_TYPE_NAMES) {
    const sourceTypes: string[] = []
    let best = 0
    for (const atkType of types) {
      const chart = TYPE_EFFECTIVENESS[atkType]
      if (!chart) continue
      const eff = chart[defType] ?? 1
      if (eff > 1) {
        sourceTypes.push(atkType)
        if (eff > best) best = eff
      }
    }
    if (sourceTypes.length > 0) results.push({ type: defType, multiplier: best, sourceTypes })
  }
  return results
}