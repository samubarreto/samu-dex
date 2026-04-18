import { styled } from 'styled-components'

export const Container = styled.div`
  display: grid;
  gap: 10px;
`

export const Label = styled.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

type ChipProps = {
  $active?: boolean
}

export const Chip = styled.button<ChipProps>`
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? 'var(--accent)' : 'var(--border)')};
  background: ${({ $active }) => ($active ? 'var(--accent)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--text)')};
  transition: all 160ms ease;

  &:hover {
    border-color: var(--accent);
    background: ${({ $active }) => ($active ? 'var(--accent)' : 'rgba(15, 123, 108, 0.08)')};
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.76rem;
  }
`
