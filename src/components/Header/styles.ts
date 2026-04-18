import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid var(--border);
  background: rgba(245, 240, 232, 0.82);
  backdrop-filter: blur(20px) saturate(1.4);
`

export const Inner = styled.div`
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
  }
`

export const BrandLink = styled(Link)`
  color: var(--text);
  text-decoration: none;
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 4vw, 2rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 860px) {
    width: 100%;
  }
`

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`

type NavigationItemProps = {
  $active?: boolean
}

const interactiveItemStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(34, 49, 63, 0.1);
  background: rgba(255, 250, 244, 0.78);
  color: var(--muted);
  text-decoration: none;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background-color 160ms ease,
    color 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    color: var(--text);
    border-color: var(--border);
    box-shadow: var(--shadow-soft);
  }
`

export const NavigationLink = styled(Link)<NavigationItemProps>`
  ${interactiveItemStyles}

  ${({ $active }) =>
    $active
      ? `
        color: var(--text);
        border-color: var(--border);
        background: var(--surface-strong);
        box-shadow: var(--shadow-soft);
      `
      : ''}
`

export const RandomButton = styled.button`
  ${interactiveItemStyles}
`

export const LanguageDropdown = styled.div`
  position: relative;
`

type DropdownTriggerProps = {
  $open?: boolean
}

export const DropdownTrigger = styled.button<DropdownTriggerProps>`
  ${interactiveItemStyles}
  gap: 10px;
  padding: 0 14px;
  cursor: pointer;
  user-select: none;

  ${({ $open }) =>
    $open
      ? `
        color: var(--text);
        border-color: rgba(15, 123, 108, 0.45);
        box-shadow: 0 0 0 4px rgba(15, 123, 108, 0.12);
        transform: translateY(-1px);
      `
      : ''}
`

export const FlagImage = styled.img`
  display: block;
  width: 22px;
  height: 15px;
  border-radius: 3px;
  object-fit: cover;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
`

export const TriggerLabel = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`

export const TriggerCaret = styled.span<DropdownTriggerProps>`
  display: inline-flex;
  align-items: center;
  color: var(--muted);
  transition: transform 250ms ease;

  ${({ $open }) => $open ? 'transform: rotate(180deg);' : ''}
`

type DropdownMenuProps = {
  $open?: boolean
}

export const DropdownMenu = styled.ul<DropdownMenuProps>`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 50;
  min-width: 200px;
  padding: 6px;
  margin: 0;
  list-style: none;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  box-shadow: var(--shadow), 0 12px 40px -8px rgba(0, 0, 0, 0.12);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  transform: ${({ $open }) => ($open ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.97)')};
  transform-origin: top right;
  transition:
    opacity 180ms ease,
    visibility 180ms ease,
    transform 180ms ease;
`

type DropdownItemProps = {
  $active?: boolean
}

export const DropdownItem = styled.li<DropdownItemProps>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color 120ms ease,
    color 120ms ease;
  color: ${({ $active }) => ($active ? 'var(--text)' : 'var(--muted)')};
  background: ${({ $active }) => ($active ? 'var(--surface-strong)' : 'transparent')};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};

  &:hover {
    background: var(--surface-strong);
    color: var(--text);
  }
`

export const ItemLabel = styled.span`
  flex: 1;
  font-size: 0.875rem;
`

export const ItemCheck = styled.span`
  display: inline-flex;
  align-items: center;
  color: var(--accent);
`