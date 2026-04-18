import { styled } from 'styled-components'

export const Container = styled.section`
  display: grid;
  gap: 14px;
  padding: 20px 24px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  box-shadow: var(--shadow-soft);

  @media (max-width: 480px) {
    padding: 16px;
    border-radius: var(--radius-md);
  }
`

export const Fields = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 140px;
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`

export const Field = styled.div`
  display: grid;
  gap: 6px;
`

export const Label = styled.label`
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--muted);
`

const inputStyles = `
  width: 100%;
  height: 42px;
  padding: 0 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-strong);
  color: var(--text);
  font-size: 0.92rem;
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

  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export const Toolbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const SortGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

type SortButtonProps = {
  $active?: boolean
}

export const SortButton = styled.button<SortButtonProps>`
  height: 34px;
  padding: 0 14px;
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  font-weight: 600;
  border: 1px solid ${({ $active }) => ($active ? 'var(--accent)' : 'var(--border)')};
  background: ${({ $active }) => ($active ? 'var(--accent)' : 'transparent')};
  color: ${({ $active }) => ($active ? '#fff' : 'var(--text)')};
  transition: all 160ms ease;

  &:hover {
    border-color: var(--accent);
  }
`

export const ResultCount = styled.span`
  font-size: 0.88rem;
  color: var(--muted);
`