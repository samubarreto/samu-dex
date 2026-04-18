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

  @media (max-width: 480px) {
    gap: 6px;
  }
`

type ChipProps = {
  $active?: boolean
  $color: string
}

export const Chip = styled.button<ChipProps>`
  padding: 6px 14px;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  border: 1px solid ${({ $active, $color }) => ($active ? $color : 'var(--border)')};
  background: ${({ $active, $color }) => ($active ? $color : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--text)')};
  transition: all 160ms ease;

  &:hover {
    border-color: ${({ $color }) => $color};
    background: ${({ $active, $color }) => ($active ? $color : `${$color}18`)};
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.76rem;
  }
`
