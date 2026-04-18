import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { Pokemon } from 'pokenode-ts'
import { useFavourites } from '../../hooks/useFavourites'
import { useTranslation } from '../../hooks/useTranslation'
import { isRequestCanceled } from '../../services/http'
import {
  buildPokemonArtworkUrl,
  getPokemonById,
  toPokemonListItem,
} from '../../services/pokemon'
import type { PokemonListItem } from '../../types/pokemon'
import {
  AbilitiesList,
  AbilityBadge,
  Artwork,
  ArtworkImage,
  ArtworkPanel,
  BackLink,
  DetailGrid,
  FavButton,
  InfoPanel,
  MeasureCard,
  MeasureGrid,
  MeasureLabel,
  MeasureValue,
  Page,
  PokemonCode,
  PokemonHeader,
  PokemonName,
  Section,
  SectionTitle,
  StateCard,
  StateDescription,
  StateTitle,
  StatBar,
  StatBarFill,
  StatLabel,
  StatRow,
  StatValue,
  TypeBadge,
  TypesRow,
} from './styles'

const typeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
}

const statKeys: Record<string, string> = {
  hp: 'detailed.stats.hp',
  attack: 'detailed.stats.attack',
  defense: 'detailed.stats.defense',
  'special-attack': 'detailed.stats.specialAttack',
  'special-defense': 'detailed.stats.specialDefense',
  speed: 'detailed.stats.speed',
}

function formatName(name: string) {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatCode(id: number) {
  return `#${String(id).padStart(4, '0')}`
}

export default function PokeDetailedPage() {
  const { pokemonId } = useParams()
  const { translate } = useTranslation()
  const { isFavourite, toggleFavourite } = useFavourites()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const numericId = Number(pokemonId)

  useEffect(() => {
    if (!pokemonId || !Number.isFinite(numericId)) {
      setHasError(true)
      setIsLoading(false)
      return
    }

    const resolvedPokemonId = pokemonId

    const controller = new AbortController()

    async function load() {
      setIsLoading(true)
      setHasError(false)

      try {
        const nextPokemon = await getPokemonById(resolvedPokemonId, controller.signal)

        setPokemon(nextPokemon)
      } catch (error) {
        if (isRequestCanceled(error)) {
          return
        }

        setHasError(true)
      } finally {
        setIsLoading(false)
      }
    }

    void load()

    return () => {
      controller.abort()
    }
  }, [pokemonId, numericId])

  const listItem: PokemonListItem | null = pokemon
    ? toPokemonListItem(pokemon)
    : null

  const favourite = listItem ? isFavourite(pokemon!.id) : false

  if (isLoading) {
    return (
      <Page>
        <StateCard>
          <StateTitle>{translate('detailed.status.loadingTitle')}</StateTitle>
          <StateDescription>{translate('detailed.status.loadingDescription')}</StateDescription>
        </StateCard>
      </Page>
    )
  }

  if (hasError || !pokemon) {
    return (
      <Page>
        <StateCard>
          <StateTitle>{translate('detailed.status.errorTitle')}</StateTitle>
          <StateDescription>{translate('detailed.status.errorDescription')}</StateDescription>
          <BackLink to="/">{translate('detailed.backToHome')}</BackLink>
        </StateCard>
      </Page>
    )
  }

  const stats = pokemon.stats.map((s) => ({
    name: s.stat.name,
    value: s.base_stat,
  }))

  const maxStat = Math.max(...stats.map((s) => s.value), 255)

  return (
    <Page>
      <BackLink to="/">{translate('detailed.backToHome')}</BackLink>

      <DetailGrid>
        <ArtworkPanel>
          <Artwork>
            <ArtworkImage
              src={buildPokemonArtworkUrl(pokemon.id)}
              alt={translate('detailed.imageAlt', { params: { name: formatName(pokemon.name) } })}
            />
          </Artwork>
        </ArtworkPanel>

        <InfoPanel>
          <PokemonHeader>
            <div>
              <PokemonCode>{formatCode(pokemon.id)}</PokemonCode>
              <PokemonName>{formatName(pokemon.name)}</PokemonName>
            </div>
            <FavButton
              type="button"
              $active={favourite}
              onClick={() => listItem && toggleFavourite(listItem)}
              title={favourite ? translate('detailed.removeFavourite') : translate('detailed.addFavourite')}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill={favourite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
            </FavButton>
          </PokemonHeader>

          <TypesRow>
            {pokemon.types.map((t) => (
              <TypeBadge key={t.type.name} $color={typeColors[t.type.name] ?? '#888'}>
                {t.type.name}
              </TypeBadge>
            ))}
          </TypesRow>

          <MeasureGrid>
            <MeasureCard>
              <MeasureValue>{(pokemon.height / 10).toFixed(1)}m</MeasureValue>
              <MeasureLabel>{translate('detailed.height')}</MeasureLabel>
            </MeasureCard>
            <MeasureCard>
              <MeasureValue>{(pokemon.weight / 10).toFixed(1)}kg</MeasureValue>
              <MeasureLabel>{translate('detailed.weight')}</MeasureLabel>
            </MeasureCard>
          </MeasureGrid>

          <Section>
            <SectionTitle>{translate('detailed.stats.title')}</SectionTitle>
            {stats.map((stat) => (
              <StatRow key={stat.name}>
                <StatLabel>{translate(statKeys[stat.name] ?? stat.name)}</StatLabel>
                <StatBar>
                  <StatBarFill $percentage={(stat.value / maxStat) * 100} />
                </StatBar>
                <StatValue>{stat.value}</StatValue>
              </StatRow>
            ))}
          </Section>

          <Section>
            <SectionTitle>{translate('detailed.abilities')}</SectionTitle>
            <AbilitiesList>
              {pokemon.abilities.map((a) => (
                <AbilityBadge key={a.ability.name}>
                  {formatName(a.ability.name)}
                  {a.is_hidden ? ' ✦' : ''}
                </AbilityBadge>
              ))}
            </AbilitiesList>
          </Section>
        </InfoPanel>
      </DetailGrid>
    </Page>
  )
}
