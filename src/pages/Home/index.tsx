import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import Pagination from '../../components/Pagination'
import PokeClassificationFilter from '../../components/PokeClassificationFilter'
import PokeGrid from '../../components/PokeGrid'
import PokeTypeFilter from '../../components/PokeTypeFilter'
import SearchBar from '../../components/SearchBar'
import { useTranslation } from '../../hooks/useTranslation'
import { isRequestCanceled } from '../../services/http'
import {
  type PokemonClassification,
  getPokemonClassification,
  getPokemonList,
  getPokemonTypeMap,
} from '../../services/pokemon'
import type { PokemonListItem, SortDirection, SortField } from '../../types/pokemon'
import {
  ClearFiltersButton,
  FiltersContent,
  FiltersContentInner,
  FiltersHeader,
  FiltersSection,
  FiltersToggle,
  FiltersToggleCaret,
  FiltersToggleLabel,
  Page,
  StateCard,
  StateDescription,
  StateTitle,
} from './styles'

const DEFAULT_ITEMS_PER_PAGE = 50
const MAX_ITEMS_PER_PAGE = 500

export default function HomePage() {
  const { translate } = useTranslation()
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [typeMap, setTypeMap] = useState<Map<number, string[]>>(new Map())
  const [searchValue, setSearchValue] = useState('')
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)
  const [itemsPerPageInput, setItemsPerPageInput] = useState(String(DEFAULT_ITEMS_PER_PAGE))
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedClassifications, setSelectedClassifications] = useState<PokemonClassification[]>([])
  const [sortField, setSortField] = useState<SortField>('id')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const deferredSearchValue = useDeferredValue(searchValue)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemons() {
      setIsLoading(true)
      setHasError(false)

      try {
        const [nextPokemons, nextTypeMap] = await Promise.all([
          getPokemonList(controller.signal),
          getPokemonTypeMap(controller.signal).catch(() => new Map<number, string[]>()),
        ])

        setPokemons(nextPokemons)
        setTypeMap(nextTypeMap)
      } catch (error) {
        if (isRequestCanceled(error)) {
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
    let result = pokemons

    const normalizedQuery = deferredSearchValue.trim().toLowerCase()

    if (normalizedQuery) {
      result = result.filter((pokemon) => {
        const matchesName = pokemon.name.toLowerCase().includes(normalizedQuery)
        const matchesId = String(pokemon.id).includes(normalizedQuery)

        return matchesName || matchesId
      })
    }

    if (selectedTypes.length > 0) {
      result = result.filter((pokemon) => {
        const pokemonTypes = typeMap.get(pokemon.id) ?? []

        return selectedTypes.some((type) => pokemonTypes.includes(type))
      })
    }

    if (selectedClassifications.length > 0) {
      result = result.filter((pokemon) => {
        return selectedClassifications.includes(getPokemonClassification(pokemon.id, pokemon.name))
      })
    }

    return [...result].sort((a, b) => {
      const comparison = sortField === 'id'
        ? a.id - b.id
        : a.name.localeCompare(b.name)

      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [deferredSearchValue, pokemons, selectedTypes, typeMap, selectedClassifications, sortField, sortDirection])

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

  const handleSortChange = (field: SortField) => {
    if (field === sortField) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortField(field)
      setSortDirection('asc')
    }

    setCurrentPage(1)
  }

  const handleTypesChange = (types: string[]) => {
    setSelectedTypes(types)
    setCurrentPage(1)
  }

  const handleClassificationsChange = (classifications: PokemonClassification[]) => {
    setSelectedClassifications(classifications)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchValue('')
    setSelectedTypes([])
    setSelectedClassifications([])
    setSortField('id')
    setSortDirection('asc')
    setCurrentPage(1)
  }

  const isFiltering = deferredSearchValue.trim() !== '' || selectedTypes.length > 0 || selectedClassifications.length > 0

  return (
    <Page>
      <SearchBar
        filteredCount={filteredPokemons.length}
        isFiltering={isFiltering}
        itemsPerPageValue={itemsPerPageInput}
        onItemsPerPageBlur={handleItemsPerPageBlur}
        onItemsPerPageChange={handleItemsPerPageChange}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        searchValue={searchValue}
        sortDirection={sortDirection}
        sortField={sortField}
        totalCount={pokemons.length}
      />

      <FiltersSection>
        <FiltersHeader>
          <FiltersToggle type="button" onClick={() => setFiltersOpen(prev => !prev)}>
            <FiltersToggleCaret $open={filtersOpen} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </FiltersToggleCaret>
            <FiltersToggleLabel>{translate('home.filters.toggle')}</FiltersToggleLabel>
          </FiltersToggle>
          {isFiltering ? (
            <ClearFiltersButton type="button" onClick={handleClearFilters}>
              {translate('home.filters.clearAll')}
            </ClearFiltersButton>
          ) : null}
        </FiltersHeader>
        <FiltersContent $open={filtersOpen}>
          <FiltersContentInner>
            <PokeTypeFilter
              selectedTypes={selectedTypes}
              onTypesChange={handleTypesChange}
            />
            <PokeClassificationFilter
              selectedClassifications={selectedClassifications}
              onClassificationsChange={handleClassificationsChange}
            />
          </FiltersContentInner>
        </FiltersContent>
      </FiltersSection>

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
          <PokeGrid pokemons={visiblePokemons} typeMap={typeMap} />
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
