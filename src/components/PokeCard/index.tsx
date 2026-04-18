import { type MouseEvent } from 'react'
import { useFavourites } from '../../hooks/useFavourites'
import { useTranslation } from '../../hooks/useTranslation'
import type { PokemonListItem } from '../../types/pokemon'
import {
  Action,
  Artwork,
  ArtworkImage,
  Card,
  CardHeader,
  Content,
  FavouriteButton,
  PokemonCode,
  PokemonName,
} from './styles'

type PokeCardProps = {
  pokemon: PokemonListItem
}

function formatPokemonName(name: string) {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function formatPokemonCode(id: number) {
  return `#${String(id).padStart(4, '0')}`
}

export default function PokeCard({ pokemon }: PokeCardProps) {
  const { translate } = useTranslation()
  const { isFavourite, toggleFavourite } = useFavourites()
  const displayName = formatPokemonName(pokemon.name)
  const favourite = isFavourite(pokemon.id)

  const handleToggleFavourite = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavourite(pokemon)
  }

  return (
    <Card to={`/details/${pokemon.id}`}>
      <CardHeader>
        <PokemonCode>{formatPokemonCode(pokemon.id)}</PokemonCode>
        <FavouriteButton
          type="button"
          $active={favourite}
          onClick={handleToggleFavourite}
          title={favourite ? translate('home.grid.removeFavourite') : translate('home.grid.addFavourite')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              fill={favourite ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </FavouriteButton>
      </CardHeader>

      <Artwork>
        <ArtworkImage
          alt={translate('home.grid.imageAlt', { params: { name: displayName } })}
          loading="lazy"
          src={pokemon.imageUrl}
        />
      </Artwork>

      <Content>
        <PokemonName>{displayName}</PokemonName>
        <Action>{translate('home.grid.openDetails')}</Action>
      </Content>
    </Card>
  )
}