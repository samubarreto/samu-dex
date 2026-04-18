import { type MouseEvent, useState } from 'react'
import { useFavourites } from '../../hooks/useFavourites'
import { useTranslation } from '../../hooks/useTranslation'
import type { PokemonListItem } from '../../types/pokemon'
import { POKEMON_TYPE_COLORS } from '../../services/pokemon'
import CopyButton from '../CopyButton'
import {
  Artwork,
  ArtworkImage,
  ArtworkSkeleton,
  Card,
  CardHeader,
  Content,
  FavouriteButton,
  NameRow,
  PokemonCode,
  PokemonName,
  SkeletonCircle,
  SkeletonLine,
  TypeChip,
  TypesRow,
} from './styles'

type PokeCardProps = {
  pokemon: PokemonListItem
  types?: string[]
}

function formatPokemonName(name: string) {
  return name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function formatPokemonCode(id: number) {
  return `#${String(id).padStart(4, '0')}`
}

export default function PokeCard({ pokemon, types }: PokeCardProps) {
  const { translate } = useTranslation()
  const { isFavourite, toggleFavourite } = useFavourites()
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const displayName = formatPokemonName(pokemon.name)
  const favourite = isFavourite(pokemon.id)

  if (imageError) {
    return null
  }

  const handleToggleFavourite = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavourite(pokemon)
  }

  const loading = !imageLoaded && !imageError

  return (
    <Card to={`/details/${pokemon.id}`}>
      <CardHeader>
        {loading ? (
          <>
            <SkeletonLine $width="64px" $height="28px" />
            <SkeletonCircle $size="36px" />
          </>
        ) : (
          <>
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
          </>
        )}
      </CardHeader>

      <Artwork>
        <ArtworkSkeleton data-hidden={imageLoaded || imageError} />
        <ArtworkImage
          $loaded={imageLoaded}
          alt={translate('home.grid.imageAlt', { params: { name: displayName } })}
          loading="lazy"
          src={pokemon.imageUrl}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
      </Artwork>

      <Content>
        {loading ? (
          <>
            <SkeletonLine $width="75%" $height="18px" />
            <SkeletonLine $width="50%" $height="14px" />
          </>
        ) : (
          <>
            <NameRow>
              <PokemonName>{displayName}</PokemonName>
              <CopyButton text={`${formatPokemonCode(pokemon.id)} ${displayName}`} />
            </NameRow>
            {types && types.length > 0 && (
              <TypesRow>
                {types.map((type) => (
                  <TypeChip key={type} $color={POKEMON_TYPE_COLORS[type] ?? 'var(--muted)'}>
                    {translate(`home.filters.types.${type}`)}
                  </TypeChip>
                ))}
              </TypesRow>
            )}
          </>
        )}
      </Content>
    </Card>
  )
}