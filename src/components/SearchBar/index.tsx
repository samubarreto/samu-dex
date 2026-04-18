import { useTranslation } from '../../hooks/useTranslation'
import {
  Container,
  Field,
  Fields,
  Hint,
  Label,
  PageSizeInput,
  SearchInput,
  Stat,
  Stats,
} from './styles'

type SearchBarProps = {
  filteredCount: number
  itemsPerPageValue: string
  onItemsPerPageBlur: () => void
  onItemsPerPageChange: (value: string) => void
  onSearchChange: (value: string) => void
  searchValue: string
  totalLoaded: number
}

export default function SearchBar({
  filteredCount,
  itemsPerPageValue,
  onItemsPerPageBlur,
  onItemsPerPageChange,
  onSearchChange,
  searchValue,
  totalLoaded,
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
          <Hint>{translate('home.controls.searchHint')}</Hint>
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

      <Stats>
        <Stat>
          <strong>{totalLoaded}</strong>
          <span>{translate('home.controls.totalLoadedLabel')}</span>
        </Stat>
        <Stat>
          <strong>{filteredCount}</strong>
          <span>{translate('home.controls.filteredLabel')}</span>
        </Stat>
      </Stats>
    </Container>
  )
}