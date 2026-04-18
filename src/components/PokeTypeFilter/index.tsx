import { useTranslation } from '../../hooks/useTranslation'
import { POKEMON_TYPE_COLORS, POKEMON_TYPE_NAMES } from '../../services/pokemon'
import { Chip, Chips, Container, Label } from './styles'

type PokeTypeFilterProps = {
  selectedTypes: string[]
  onTypesChange: (types: string[]) => void
}

export default function PokeTypeFilter({ selectedTypes, onTypesChange }: PokeTypeFilterProps) {
  const { translate } = useTranslation()

  const toggleType = (type: string) => {
    if (selectedTypes.includes(type)) {
      onTypesChange(selectedTypes.filter((t) => t !== type))
    } else {
      onTypesChange([...selectedTypes, type])
    }
  }

  return (
    <Container>
      <Label>{translate('home.filters.typeLabel')}</Label>
      <Chips>
        {POKEMON_TYPE_NAMES.map((type) => (
          <Chip
            key={type}
            type="button"
            $active={selectedTypes.includes(type)}
            $color={POKEMON_TYPE_COLORS[type]}
            onClick={() => toggleType(type)}
          >
            {translate(`home.filters.types.${type}`)}
          </Chip>
        ))}
      </Chips>
    </Container>
  )
}
