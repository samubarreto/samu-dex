import { styled } from 'styled-components'

export const Container = styled.section`
  display: grid;
  gap: 16px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
`

export const Fields = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(180px, 220px);
  gap: 16px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div`
  display: grid;
  gap: 8px;
`

export const Label = styled.label`
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
`

const inputStyles = `
  width: 100%;
  min-height: 48px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-strong);
  color: var(--text);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.38);
  transition: border-color 160ms ease, box-shadow 160ms ease;

  &:focus {
    outline: none;
    border-color: rgba(15, 123, 108, 0.42);
    box-shadow: 0 0 0 4px rgba(15, 123, 108, 0.12);
  }
`

export const SearchInput = styled.input`
  ${inputStyles}
`

export const PageSizeInput = styled.input`
  ${inputStyles}
`

export const Hint = styled.p`
  margin: 0;
  font-size: 0.92rem;
  color: var(--muted);
`

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

export const Stat = styled.div`
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--surface-strong);
  border: 1px solid var(--border);

  strong {
    font-size: 1.4rem;
    line-height: 1;
    color: var(--text);
  }

  span {
    color: var(--muted);
  }
`