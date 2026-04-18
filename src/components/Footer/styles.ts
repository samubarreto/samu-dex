import { styled } from 'styled-components'

export const Container = styled.footer`
  border-top: 1px solid var(--border);
  background: rgba(245, 240, 232, 0.6);
`

export const Inner = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 18px 24px 24px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 18px 16px 24px;
  }
`

export const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(34, 49, 63, 0.1);
  background: rgba(255, 255, 255, 0.62);
  color: var(--text);
  text-decoration: none;
  box-shadow: var(--shadow-soft);
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    border-color: var(--border);
    box-shadow: var(--shadow);
  }
`

export const IconWrapper = styled.span`
  width: 18px;
  height: 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
`

export const LinkText = styled.span`
  font-size: 0.95rem;
  font-weight: 600;
`