import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Pokemon } from 'pokenode-ts'
import { useFavourites } from '../../hooks/useFavourites'
import { useTranslation } from '../../hooks/useTranslation'
import { isRequestCanceled } from '../../services/http'
import {
  buildPokemonArtworkUrl,
  getTypeAdvantages,
  getPokemonById,
  getTypeWeaknesses,
  toPokemonListItem,
} from '../../services/pokemon'
import CopyButton from '../../components/CopyButton'
import type { PokemonListItem } from '../../types/pokemon'
import {
  AbilitiesList,
  AbilityBadge,
  AdvantageArrow,
  AdvantageItem,
  AdvantageList,
  Artwork,
  ArtworkImage,
  ArtworkPanel,
  ArtworkSkeleton,
  BackLink,
  DetailGrid,
  FavButton,
  InfoPanel,
  MatchupGrid,
  MeasureCard,
  MeasureGrid,
  MeasureLabel,
  MeasureValue,
  MultiplierTag,
  Page,
  PageTransitionBlur,
  PokemonCode,
  PokemonHeader,
  PokemonName,
  PokemonNav,
  PokemonNavLink,
  Section,
  SectionTitle,
  SkeletonBlock,
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

const VALID_POKEMON_ID_RANGES = [
  { start: 1, end: 1025 },
  { start: 10001, end: 10325 },
] as const

function isValidPokemonId(id: number) {
  return VALID_POKEMON_ID_RANGES.some((range) => id >= range.start && id <= range.end)
}

function getAdjacentPokemonId(id: number, direction: -1 | 1) {
  if (!Number.isInteger(id) || !isValidPokemonId(id)) {
    return null
  }

  if (direction === -1) {
    if (id === VALID_POKEMON_ID_RANGES[1].start) {
      return VALID_POKEMON_ID_RANGES[0].end
    }

    const previousId = id - 1

    return isValidPokemonId(previousId) ? previousId : null
  }

  if (id === VALID_POKEMON_ID_RANGES[0].end) {
    return VALID_POKEMON_ID_RANGES[1].start
  }

  const nextId = id + 1

  return isValidPokemonId(nextId) ? nextId : null
}

function buildDetailPath(id: number | null) {
  return id === null ? '.' : `/details/${id}`
}

function formatNavigationId(id: number | null) {
  return String(id ?? 0).padStart(4, '0')
}

function isEditableElement(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  if (target.isContentEditable) {
    return true
  }

  return ['input', 'textarea', 'select'].includes(target.tagName.toLowerCase())
}

export default function PokeDetailedPage() {
  const { pokemonId } = useParams()
  const navigate = useNavigate()
  const { translate } = useTranslation()
  const { isFavourite, toggleFavourite } = useFavourites()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showBlur, setShowBlur] = useState(true)
  const numericId = Number(pokemonId)
  const previousPokemonId = getAdjacentPokemonId(numericId, -1)
  const nextPokemonId = getAdjacentPokemonId(numericId, 1)

  useEffect(() => {
    if (!pokemonId || !Number.isInteger(numericId) || !isValidPokemonId(numericId)) {
      setPokemon(null)
      setHasError(true)
      setIsLoading(false)
      return
    }

    const resolvedPokemonId = pokemonId

    const controller = new AbortController()

    async function load() {
      setIsLoading(true)
      setHasError(false)
      setPokemon(null)
      setImageLoaded(false)
      setShowBlur(true)

      try {
        const nextPokemon = await getPokemonById(resolvedPokemonId, controller.signal)

        setPokemon(nextPokemon)
      } catch (error) {
        if (isRequestCanceled(error)) {
          return
        }

        setPokemon(null)
        setHasError(true)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      controller.abort()
    }
  }, [pokemonId, numericId])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.altKey || event.ctrlKey || event.metaKey || isEditableElement(event.target)) {
        return
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        navigate('/')
        return
      }

      if (event.key === 'ArrowLeft' && previousPokemonId !== null) {
        event.preventDefault()
        navigate(`/details/${previousPokemonId}`)
        return
      }

      if (event.key === 'ArrowRight' && nextPokemonId !== null) {
        event.preventDefault()
        navigate(`/details/${nextPokemonId}`)
        return
      }

      if (event.key.toLowerCase() === 'f' && !event.repeat && pokemon) {
        event.preventDefault()
        toggleFavourite(toPokemonListItem(pokemon))
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [navigate, nextPokemonId, pokemon, previousPokemonId, toggleFavourite])

  const listItem: PokemonListItem | null = pokemon
    ? toPokemonListItem(pokemon)
    : null

  const favourite = listItem ? isFavourite(listItem.id) : false

  if (isLoading) {
    return (
      <Page>
        {showBlur && <PageTransitionBlur key={pokemonId} onAnimationEnd={() => setShowBlur(false)} />}
        <BackLink to="/">{translate('detailed.backToHome')}</BackLink>

        <PokemonNav>
          <PokemonNavLink
            to={buildDetailPath(previousPokemonId)}
            aria-disabled={previousPokemonId === null ? 'true' : undefined}
            tabIndex={previousPokemonId === null ? -1 : undefined}
          >
            {translate('detailed.prev', { params: { id: formatNavigationId(previousPokemonId) } })}
          </PokemonNavLink>
          <PokemonNavLink
            to={buildDetailPath(nextPokemonId)}
            aria-disabled={nextPokemonId === null ? 'true' : undefined}
            tabIndex={nextPokemonId === null ? -1 : undefined}
          >
            {translate('detailed.next', { params: { id: formatNavigationId(nextPokemonId) } })}
          </PokemonNavLink>
        </PokemonNav>

        <DetailGrid>
          <ArtworkPanel>
            <Artwork>
              <ArtworkSkeleton />
            </Artwork>
          </ArtworkPanel>

          <InfoPanel>
            <PokemonHeader>
              <div style={{ display: 'grid', gap: '10px' }}>
                <SkeletonBlock $w="90px" $h="28px" $radius="var(--radius-full)" />
                <SkeletonBlock $w="55%" $h="44px" />
              </div>
              <SkeletonBlock $w="48px" $h="48px" $radius="var(--radius-full)" />
            </PokemonHeader>

            <TypesRow>
              <SkeletonBlock $w="76px" $h="32px" $radius="var(--radius-full)" />
              <SkeletonBlock $w="76px" $h="32px" $radius="var(--radius-full)" />
            </TypesRow>

            <MeasureGrid>
              <SkeletonBlock $h="72px" />
              <SkeletonBlock $h="72px" />
            </MeasureGrid>

            <Section>
              <SkeletonBlock $w="45%" $h="22px" />
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonBlock key={i} $h="18px" />
              ))}
            </Section>

            <Section>
              <SkeletonBlock $w="45%" $h="22px" />
              <TypesRow>
                <SkeletonBlock $w="110px" $h="34px" $radius="var(--radius-full)" />
                <SkeletonBlock $w="90px" $h="34px" $radius="var(--radius-full)" />
              </TypesRow>
            </Section>

            <MatchupGrid>
              <Section>
                <SkeletonBlock $w="60%" $h="20px" />
                <TypesRow>
                  <SkeletonBlock $w="72px" $h="30px" $radius="var(--radius-full)" />
                  <SkeletonBlock $w="72px" $h="30px" $radius="var(--radius-full)" />
                </TypesRow>
              </Section>
              <Section>
                <SkeletonBlock $w="60%" $h="20px" />
                {Array.from({ length: 4 }).map((_, i) => (
                  <SkeletonBlock key={i} $h="30px" $radius="var(--radius-full)" />
                ))}
              </Section>
            </MatchupGrid>
          </InfoPanel>
        </DetailGrid>
      </Page>
    )
  }

  if (hasError || !pokemon) {
    return (
      <Page>
        {showBlur && <PageTransitionBlur key={pokemonId} onAnimationEnd={() => setShowBlur(false)} />}
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
      {showBlur && <PageTransitionBlur key={pokemonId} onAnimationEnd={() => setShowBlur(false)} />}
      <PokemonNav style={{ justifyContent: 'space-between' }}>
        <BackLink to="/">{translate('detailed.backToHome')}</BackLink>
        <PokemonNav>
          <PokemonNavLink
            to={buildDetailPath(previousPokemonId)}
            aria-disabled={previousPokemonId === null ? 'true' : undefined}
            tabIndex={previousPokemonId === null ? -1 : undefined}
          >
            {translate('detailed.prev', { params: { id: formatNavigationId(previousPokemonId) } })}
          </PokemonNavLink>
          <PokemonNavLink
            to={buildDetailPath(nextPokemonId)}
            aria-disabled={nextPokemonId === null ? 'true' : undefined}
            tabIndex={nextPokemonId === null ? -1 : undefined}
          >
            {translate('detailed.next', { params: { id: formatNavigationId(nextPokemonId) } })}
          </PokemonNavLink>
        </PokemonNav>
      </PokemonNav>

      <DetailGrid>
        <ArtworkPanel>
          <Artwork>
              <ArtworkSkeleton $hidden={imageLoaded} />
              <ArtworkImage
                $loaded={imageLoaded}
                src={buildPokemonArtworkUrl(pokemon.id)}
                alt={translate('detailed.imageAlt', { params: { name: formatName(pokemon.name) } })}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
            </Artwork>
        </ArtworkPanel>

        <InfoPanel>
          <PokemonHeader>
            <div>
              <PokemonCode>{formatCode(pokemon.id)}</PokemonCode>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PokemonName>{formatName(pokemon.name)}</PokemonName>
                <CopyButton
                  text={`${formatCode(pokemon.id)} ${formatName(pokemon.name)}`}
                  size="md"
                />
              </div>
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
                {translate(`home.filters.types.${t.type.name}`)}
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

          <MatchupGrid>
            <Section>
              <SectionTitle>{translate('detailed.weaknesses')}</SectionTitle>
              <TypesRow>
                {getTypeWeaknesses(pokemon.types.map((t) => t.type.name)).map((w) => (
                  <TypeBadge key={w.type} $color={typeColors[w.type] ?? '#888'}>
                    {translate(`home.filters.types.${w.type}`)}
                    <MultiplierTag>×{w.multiplier}</MultiplierTag>
                  </TypeBadge>
                ))}
              </TypesRow>
            </Section>

            <Section>
              <SectionTitle>{translate('detailed.advantages')}</SectionTitle>
              <AdvantageList>
                {getTypeAdvantages(pokemon.types.map((t) => t.type.name)).map((a) => (
                  <AdvantageItem key={a.type}>
                    {a.sourceTypes!.map((src) => (
                      <TypeBadge key={src} $color={typeColors[src] ?? '#888'}>
                        {translate(`home.filters.types.${src}`)}
                      </TypeBadge>
                    ))}
                    <AdvantageArrow>→</AdvantageArrow>
                    <TypeBadge $color={typeColors[a.type] ?? '#888'}>
                      {translate(`home.filters.types.${a.type}`)}
                      <MultiplierTag>×{a.multiplier}</MultiplierTag>
                    </TypeBadge>
                  </AdvantageItem>
                ))}
              </AdvantageList>
            </Section>
          </MatchupGrid>
        </InfoPanel>
      </DetailGrid>
    </Page>
  )
}
