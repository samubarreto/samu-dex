import { Link } from 'react-router-dom'
import { styled, keyframes } from 'styled-components'

/* ── Skeleton shimmer ──────────────────────────────── */

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`

const skeletonBase = `
  background: linear-gradient(
    90deg,
    var(--skeleton-a) 25%,
    var(--skeleton-b) 50%,
    var(--skeleton-a) 75%
  );
  background-size: 800px 100%;
  border-radius: var(--radius-sm);
`

export const Card = styled(Link)`
  position: relative;
  display: grid;
  gap: 14px;
  padding: 16px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  text-decoration: none;
  box-shadow: var(--shadow-soft);
  overflow: hidden;
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    border-color 220ms ease;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(15, 123, 108, 0.18);
    box-shadow: var(--shadow);
  }

  @media (max-width: 540px) {
    gap: 10px;
    padding: 12px;
    border-radius: var(--radius-md);
  }
`

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const PokemonCode = styled.span`
  display: inline-flex;
  padding: 5px 12px;
  border-radius: var(--radius-full);
  background: rgba(15, 123, 108, 0.08);
  color: var(--accent);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
`

type FavouriteButtonProps = { $active?: boolean }

export const FavouriteButton = styled.button<FavouriteButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  border: 1px solid ${({ $active }) => ($active ? 'rgba(234, 179, 8, 0.3)' : 'transparent')};
  background: ${({ $active }) => ($active ? 'rgba(234, 179, 8, 0.08)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#eab308' : 'var(--muted)')};
  padding: 0;
  transition: all 180ms ease;

  &:hover {
    color: #eab308;
    transform: scale(1.15);
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

export const ArtworkSkeleton = styled.div`
  position: absolute;
  inset: 0;
  ${skeletonBase}
  animation: ${shimmer} 1.4s infinite linear;
  border-radius: var(--radius-md);
  transition: opacity 300ms ease;

  &[data-hidden='true'] {
    opacity: 0;
    pointer-events: none;
  }
`

type ArtworkImageProps = { $loaded?: boolean }

export const ArtworkImage = styled.img<ArtworkImageProps>`
  width: min(85%, 160px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 12px 20px rgba(24, 44, 53, 0.12));
  transition: transform 220ms ease, opacity 300ms ease;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};

  ${Card}:hover & {
    transform: scale(1.05);
  }
`

export const Content = styled.div`
  display: grid;
  gap: 6px;
`

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 0;
`

export const PokemonName = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  text-transform: capitalize;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const TypesRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

type TypeChipProps = { $color: string }

export const TypeChip = styled.span<TypeChipProps>`
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  color: #fff;
  background: ${({ $color }) => $color};
  line-height: 1.6;
`

/* ── Skeleton placeholders ─────────────────────────── */

export const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  ${skeletonBase}
  animation: ${shimmer} 1.4s infinite linear;
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '16px'};
  border-radius: 8px;
`

export const SkeletonCircle = styled.div<{ $size?: string }>`
  ${skeletonBase}
  animation: ${shimmer} 1.4s infinite linear;
  width: ${({ $size }) => $size ?? '36px'};
  height: ${({ $size }) => $size ?? '36px'};
  border-radius: var(--radius-full);
`
