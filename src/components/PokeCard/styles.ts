import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

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
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.95), rgba(232, 245, 241, 0.7));
  display: grid;
  place-items: center;
  overflow: hidden;
`

export const ArtworkImage = styled.img`
  width: min(85%, 160px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 12px 20px rgba(24, 44, 53, 0.12));
  transition: transform 220ms ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`

export const Content = styled.div`
  display: grid;
  gap: 4px;
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

export const Action = styled.span`
  color: var(--muted);
  font-size: 0.88rem;
`