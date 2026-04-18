import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const Page = styled.section`
  display: grid;
  gap: 24px;
`

export const PageHeader = styled.div`
  display: grid;
  gap: 8px;
`

export const PageTitle = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 6vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--text);
`

export const PageSubtitle = styled.p`
  color: var(--muted);
  font-size: 1.05rem;
`

export const EmptyCard = styled.section`
  display: grid;
  gap: 16px;
  padding: 48px 32px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  text-align: center;
  justify-items: center;
`

export const EmptyTitle = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  color: var(--text);
`

export const EmptyDescription = styled.p`
  margin: 0;
  max-width: 48ch;
  color: var(--muted);
`

export const GoHomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  background: var(--accent);
  color: #f8fffd;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 8px 20px rgba(15, 123, 108, 0.2);
  transition: all 180ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(15, 123, 108, 0.25);
  }
`