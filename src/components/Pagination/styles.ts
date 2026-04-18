import { styled } from 'styled-components'

type PageButtonProps = {
  $active?: boolean
}

export const Container = styled.nav`
  display: grid;
  gap: 14px;
  padding: 20px 24px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  position: sticky;
  bottom: 0;
  z-index: 10;

  @media (max-width: 480px) {
    padding: 14px 12px;
    border-radius: var(--radius-md);
    gap: 10px;
  }
`

export const Summary = styled.p`
  margin: 0;
  color: var(--muted);
`

export const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 6px;
    justify-content: center;
  }
`

export const PageButton = styled.button<PageButtonProps>`
  min-width: 44px;
  height: 44px;
  padding: 0 14px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: ${({ $active }) => ($active ? 'var(--accent)' : 'rgba(255, 255, 255, 0.72)')};
  color: ${({ $active }) => ($active ? '#f8fffd' : 'var(--text)')};
  font-weight: 600;
  box-shadow: ${({ $active }) => ($active ? '0 12px 24px rgba(15, 123, 108, 0.18)' : 'none')};
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transform: translateY(-1px);
    border-color: var(--border);
  }

  @media (max-width: 480px) {
    min-width: 36px;
    height: 36px;
    padding: 0 10px;
    font-size: 0.82rem;
  }
`

export const Ellipsis = styled.span`
  min-width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);

  @media (max-width: 480px) {
    min-width: 28px;
    height: 36px;
  }
`