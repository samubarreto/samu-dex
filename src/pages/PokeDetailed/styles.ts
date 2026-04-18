import { Link } from 'react-router-dom'
import { keyframes, styled } from 'styled-components'

const shimmer = keyframes`
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
`

const skeletonBase = `
  background: linear-gradient(
    90deg,
    var(--skeleton-a) 25%,
    var(--skeleton-b) 50%,
    var(--skeleton-a) 75%
  );
  background-size: 1200px 100%;
`

export const SkeletonBlock = styled.div<{ $w?: string; $h?: string; $radius?: string }>`
  width: ${({ $w }) => $w ?? '100%'};
  height: ${({ $h }) => $h ?? '16px'};
  border-radius: ${({ $radius }) => $radius ?? 'var(--radius-md)'};
  ${skeletonBase}
  animation: ${shimmer} 1.4s infinite linear;
`

const blurOut = keyframes`
  0%   { opacity: 1; backdrop-filter: blur(10px); }
  100% { opacity: 0; backdrop-filter: blur(0px); }
`

export const PageTransitionBlur = styled.div`
  position: absolute;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  background: var(--bg);
  animation: ${blurOut} 220ms ease-out forwards;
  animation-delay: 50ms;
  opacity: 1;
`

export const Page = styled.section`
  position: relative;
  display: grid;
  gap: 24px;
`

export const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.92rem;
  justify-self: flex-start;
  transition: all 160ms ease;

  &:hover {
    color: var(--text);
    border-color: rgba(34, 49, 63, 0.2);
    box-shadow: var(--shadow-soft);
  }
`

export const PokemonNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`

export const PokemonNavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.86rem;
  transition: all 160ms ease;
  max-width: 44%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    color: var(--text);
    border-color: rgba(34, 49, 63, 0.2);
    box-shadow: var(--shadow-soft);
  }

  &[aria-disabled='true'] {
    opacity: 0;
    pointer-events: none;
  }
`

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(0, 1.2fr);
  gap: 24px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

export const ArtworkPanel = styled.div`
  padding: 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-soft);

  @media (max-width: 480px) {
    padding: 20px;
  }
`

export const Artwork = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  background: linear-gradient(160deg, var(--artwork-from), var(--artwork-to));
  display: grid;
  place-items: center;
  overflow: hidden;
`

export const ArtworkSkeleton = styled.div<{ $hidden?: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: var(--radius-md);
  ${skeletonBase}
  animation: ${shimmer} 1.4s infinite linear;
  transition: opacity 300ms ease;
  opacity: ${({ $hidden }) => ($hidden ? 0 : 1)};
  pointer-events: none;
`

type ArtworkImageProps = { $loaded?: boolean }

export const ArtworkImage = styled.img<ArtworkImageProps>`
  width: min(90%, 320px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 20px 30px rgba(24, 44, 53, 0.15));
  transition: opacity 300ms ease;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
`

export const InfoPanel = styled.div`
  display: grid;
  gap: 24px;
  align-content: start;
`

export const PokemonHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`

export const PokemonCode = styled.span`
  display: inline-block;
  padding: 6px 14px;
  border-radius: var(--radius-full);
  background: rgba(15, 123, 108, 0.1);
  color: var(--accent);
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.08em;
`

export const PokemonName = styled.h1`
  margin-top: 10px;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--text);
  text-transform: capitalize;
`

type FavButtonProps = { $active?: boolean }

export const FavButton = styled.button<FavButtonProps>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  border: 1px solid ${({ $active }) => ($active ? 'rgba(234, 179, 8, 0.3)' : 'var(--border)')};
  background: ${({ $active }) => ($active ? 'rgba(234, 179, 8, 0.1)' : 'var(--surface)')};
  color: ${({ $active }) => ($active ? '#eab308' : 'var(--muted)')};
  transition: all 180ms ease;

  &:hover {
    transform: scale(1.1);
    color: #eab308;
    border-color: rgba(234, 179, 8, 0.3);
  }
`

export const TypesRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`

type TypeBadgeProps = { $color: string }

export const TypeBadge = styled.span<TypeBadgeProps>`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  padding: 6px 16px;
  border-radius: var(--radius-full);
  background: ${({ $color }) => `${$color}22`};
  color: ${({ $color }) => $color};
  font-size: 0.88rem;
  font-weight: 700;
  text-transform: capitalize;
  border: 1px solid ${({ $color }) => `${$color}33`};
`

export const MultiplierTag = styled.span`
  font-size: 0.72rem;
  font-weight: 800;
  opacity: 0.75;
  margin-left: 4px;
`

export const AdvantageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const AdvantageItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`

export const AdvantageArrow = styled.span`
  font-size: 0.88rem;
  color: var(--muted);
  flex-shrink: 0;
`

export const MatchupGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`

export const MeasureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`

export const MeasureCard = styled.div`
  padding: 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface);
  text-align: center;
`

export const MeasureValue = styled.strong`
  display: block;
  font-size: 1.6rem;
  line-height: 1;
  color: var(--text);
`

export const MeasureLabel = styled.span`
  display: block;
  margin-top: 6px;
  color: var(--muted);
  font-size: 0.88rem;
`

export const Section = styled.section`
  display: grid;
  gap: 12px;
  padding: 24px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-soft);

  @media (max-width: 480px) {
    padding: 16px;
  }
`

export const SectionTitle = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.3rem;
  color: var(--text);
`

export const StatRow = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 40px;
  align-items: center;
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 72px 1fr 36px;
  }
`

export const StatLabel = styled.span`
  font-size: 0.88rem;
  color: var(--muted);
  font-weight: 600;
`

export const StatBar = styled.div`
  height: 8px;
  border-radius: 4px;
  background: var(--stat-track);
  overflow: hidden;
`

type StatBarFillProps = { $percentage: number }

const fillBar = ($percentage: number) => keyframes`
  from { width: 0%; }
  to   { width: ${$percentage}%; }
`

export const StatBarFill = styled.div<StatBarFillProps>`
  height: 100%;
  border-radius: 4px;
  background: var(--accent);
  animation: ${({ $percentage }) => fillBar($percentage)} 300ms ease both;
  animation-delay: 80ms;
`

export const StatValue = styled.span`
  text-align: right;
  font-weight: 700;
  font-size: 0.92rem;
  color: var(--text);
`

export const AbilitiesList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export const AbilityBadge = styled.span`
  padding: 8px 16px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: var(--surface-strong);
  font-size: 0.92rem;
  color: var(--text);
  font-weight: 500;
`

export const StateCard = styled.section`
  display: grid;
  gap: 12px;
  padding: 48px 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  text-align: center;
  justify-items: center;

  @media (max-width: 480px) {
    padding: 32px 20px;
  }
`

export const StateTitle = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: var(--text);
`

export const StateDescription = styled.p`
  margin: 0;
  max-width: 50ch;
  color: var(--muted);
`