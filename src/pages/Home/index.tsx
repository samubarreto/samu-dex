import axios from 'axios'
import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import type { NamedAPIResource, NamedAPIResourceList } from 'pokenode-ts'
import Pagination from '../../components/Pagination'
import PokeGrid from '../../components/PokeGrid'
import SearchBar from '../../components/SearchBar'
import { useTranslation } from '../../hooks/useTranslation'
import type { PokemonListItem } from '../../types/pokemon'
import {
  Eyebrow,
  Hero,
  HeroMetric,
  HeroMetricLabel,
  HeroMetricValue,
  HeroMetrics,
  HeroPanel,
  HeroSubtitle,
  HeroTitle,
  Page,
  StateCard,
  StateDescription,
  StateTitle,
} from './styles'

const DEFAULT_ITEMS_PER_PAGE = 50
const MAX_ITEMS_PER_PAGE = 500
const POKEMON_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

function extractPokemonId(url: string) {
  const idSegment = url.split('/').filter(Boolean).at(-1)

  return idSegment ? Number(idSegment) : Number.NaN
}

function buildPokemonImageUrl(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
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
        imageUrl: buildPokemonImageUrl(id),
      },
    ]
  })
}

export default function HomePage() {
  const { translate } = useTranslation()
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [searchValue, setSearchValue] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)
  const [itemsPerPageInput, setItemsPerPageInput] = useState(String(DEFAULT_ITEMS_PER_PAGE))
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const deferredSearchValue = useDeferredValue(searchValue)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemons() {
      setIsLoading(true)
      setHasError(false)

      try {
        const { data } = await axios.get<NamedAPIResourceList>(POKEMON_ENDPOINT, {
          signal: controller.signal,
        })

        setPokemons(mapPokemonResults(data.results))
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') {
          return
        }

        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    void loadPokemons()

    return () => {
      controller.abort()
    }
  }, [])

  const filteredPokemons = useMemo(() => {
    const normalizedQuery = deferredSearchValue.trim().toLowerCase()

    if (!normalizedQuery) {
      return pokemons
    }

    return pokemons.filter((pokemon) => {
      const matchesName = pokemon.name.toLowerCase().includes(normalizedQuery)
      const matchesId = String(pokemon.id).includes(normalizedQuery)

      return matchesName || matchesId
    })
  }, [deferredSearchValue, pokemons])

  const totalPages = Math.max(1, Math.ceil(filteredPokemons.length / itemsPerPage))

  useEffect(() => {
    setCurrentPage((previousPage) => Math.min(previousPage, totalPages))
  }, [totalPages])

  const visiblePokemons = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage

    return filteredPokemons.slice(startIndex, startIndex + itemsPerPage)
  }, [currentPage, filteredPokemons, itemsPerPage])

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
    setCurrentPage(1)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPageInput(value)

    const parsedValue = Number(value)

    if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
      return
    }

    setItemsPerPage(Math.min(parsedValue, MAX_ITEMS_PER_PAGE))
    setCurrentPage(1)
  }

  const handleItemsPerPageBlur = () => {
    const parsedValue = Number(itemsPerPageInput)
    const nextValue = Number.isInteger(parsedValue) && parsedValue > 0
      ? Math.min(parsedValue, MAX_ITEMS_PER_PAGE)
      : DEFAULT_ITEMS_PER_PAGE

    setItemsPerPage(nextValue)
    setItemsPerPageInput(String(nextValue))
    setCurrentPage(1)
  }

  return (
    <Page>
      <Hero>
        <HeroPanel>
          <Eyebrow>{translate('home.hero.eyebrow')}</Eyebrow>
          <HeroTitle>{translate('home.hero.title')}</HeroTitle>
          <HeroSubtitle>{translate('home.hero.subtitle')}</HeroSubtitle>
        </HeroPanel>

        <HeroPanel>
          <HeroMetrics>
            <HeroMetric>
              <HeroMetricValue>{pokemons.length}</HeroMetricValue>
              <HeroMetricLabel>{translate('home.controls.totalLoadedLabel')}</HeroMetricLabel>
            </HeroMetric>
            <HeroMetric>
              <HeroMetricValue>{filteredPokemons.length}</HeroMetricValue>
              <HeroMetricLabel>{translate('home.controls.filteredLabel')}</HeroMetricLabel>
            </HeroMetric>
          </HeroMetrics>
        </HeroPanel>
      </Hero>

      <SearchBar
        filteredCount={filteredPokemons.length}
        itemsPerPageValue={itemsPerPageInput}
        onItemsPerPageBlur={handleItemsPerPageBlur}
        onItemsPerPageChange={handleItemsPerPageChange}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
        totalLoaded={pokemons.length}
      />

      {isLoading ? (
        <StateCard aria-live="polite" role="status">
          <StateTitle>{translate('home.status.loadingTitle')}</StateTitle>
          <StateDescription>{translate('home.status.loadingDescription')}</StateDescription>
        </StateCard>
      ) : null}

      {!isLoading && hasError ? (
        <StateCard>
          <StateTitle>{translate('home.status.errorTitle')}</StateTitle>
          <StateDescription>{translate('home.status.errorDescription')}</StateDescription>
        </StateCard>
      ) : null}

      {!isLoading && !hasError && filteredPokemons.length === 0 ? (
        <StateCard>
          <StateTitle>{translate('home.status.emptyTitle')}</StateTitle>
          <StateDescription>{translate('home.status.emptyDescription')}</StateDescription>
        </StateCard>
      ) : null}

      {!isLoading && !hasError && filteredPokemons.length > 0 ? (
        <>
          <PokeGrid pokemons={visiblePokemons} />
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        </>
      ) : null}
    </Page>
  )
}
