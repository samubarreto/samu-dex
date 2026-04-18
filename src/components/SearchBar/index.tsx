import { useTranslation } from '../../hooks/useTranslation'
import type { SortDirection, SortField } from '../../types/pokemon'
import {
  Container,
  Field,
  Fields,
  Label,
  PageSizeInput,
  ResultCount,
  SearchInput,
  SortButton,
  SortGroup,
  Toolbar,
} from './styles'

type SearchBarProps = {
  filteredCount: number
  isFiltering: boolean
  itemsPerPageValue: string
  onItemsPerPageBlur: () => void
  onItemsPerPageChange: (value: string) => void
  onSearchChange: (value: string) => void
  onSortChange: (field: SortField) => void
  searchValue: string
  sortDirection: SortDirection
  sortField: SortField
  totalCount: number
}

export default function SearchBar({
  filteredCount,
  isFiltering,
  itemsPerPageValue,
  onItemsPerPageBlur,
  onItemsPerPageChange,
  onSearchChange,
  onSortChange,
  searchValue,
  sortDirection,
  sortField,
  totalCount,
}: SearchBarProps) {
  const { translate } = useTranslation()

  return (
    <Container>
      <Fields>
        <Field>
          <Label htmlFor="pokemon-search">{translate('home.controls.searchLabel')}</Label>
          <SearchInput
            id="pokemon-search"
            placeholder={translate('home.controls.searchPlaceholder')}
            type="search"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </Field>

        <Field>
          <Label htmlFor="items-per-page">{translate('home.controls.itemsPerPageLabel')}</Label>
          <PageSizeInput
            id="items-per-page"
            inputMode="numeric"
            min="1"
            step="1"
            type="number"
            value={itemsPerPageValue}
            onBlur={onItemsPerPageBlur}
            onChange={(event) => onItemsPerPageChange(event.target.value)}
          />
        </Field>
      </Fields>

      <Toolbar>
        <SortGroup>
          <Label as="span">{translate('home.controls.sortLabel')}</Label>
          <SortButton
            type="button"
            $active={sortField === 'id'}
            onClick={() => onSortChange('id')}
          >
            ID {sortField === 'id' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
          </SortButton>
          <SortButton
            type="button"
            $active={sortField === 'name'}
            onClick={() => onSortChange('name')}
          >
            {translate('home.controls.sortName')} {sortField === 'name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
          </SortButton>
        </SortGroup>

        <ResultCount>
          {isFiltering
            ? translate('home.controls.filteredSummary', { params: { count: filteredCount, total: totalCount } })
            : translate('home.controls.totalSummary', { params: { count: totalCount } })}
        </ResultCount>
      </Toolbar>
    </Container>
  )
}