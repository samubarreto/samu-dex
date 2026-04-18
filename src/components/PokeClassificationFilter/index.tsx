import { useTranslation } from '../../hooks/useTranslation'
import type { PokemonClassification } from '../../services/pokemon'
import { Chip, Chips, Container, Label } from './styles'

type PokeClassificationFilterProps = {
  selectedClassifications: PokemonClassification[]
  onClassificationsChange: (classifications: PokemonClassification[]) => void
}

const CLASSIFICATIONS: PokemonClassification[] = ['common', 'legendary', 'mythical', 'mega']

export default function PokeClassificationFilter({
  selectedClassifications,
  onClassificationsChange,
}: PokeClassificationFilterProps) {
  const { translate } = useTranslation()

  const toggle = (classification: PokemonClassification) => {
    if (selectedClassifications.includes(classification)) {
      onClassificationsChange(selectedClassifications.filter((c) => c !== classification))
    } else {
      onClassificationsChange([...selectedClassifications, classification])
    }
  }

  return (
    <Container>
      <Label>{translate('home.filters.classificationLabel')}</Label>
      <Chips>
        {CLASSIFICATIONS.map((classification) => (
          <Chip
            key={classification}
            type="button"
            $active={selectedClassifications.includes(classification)}
            onClick={() => toggle(classification)}
          >
            {translate(`home.filters.classifications.${classification}`)}
          </Chip>
        ))}
      </Chips>
    </Container>
  )
}
