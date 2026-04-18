import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const Page = styled.section`
  display: grid;
  place-items: center;
  min-height: 50vh;
`

export const Card = styled.div`
  display: grid;
  gap: 16px;
  padding: 48px 40px;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow-soft);
  text-align: center;
  justify-items: center;
  max-width: 480px;

  @media (max-width: 480px) {
    padding: 32px 20px;
  }
`

export const Code = styled.p`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
`

export const Title = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--text);
`

export const Description = styled.p`
  margin: 0;
  max-width: 40ch;
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