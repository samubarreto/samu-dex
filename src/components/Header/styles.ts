import { Link } from 'react-router-dom'
import { styled, css, keyframes } from 'styled-components'

/* ── Container ─────────────────────────────────────── */

export const Container = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  border-bottom: 1px solid var(--border);
  background: var(--glass);
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

  @media (max-width: 768px) {
    padding: 12px 16px;
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

/* ── Hamburger button (mobile only) ────────────────── */

export const ThemeDropdown = styled.div`
  position: relative;
`

export const ThemeColorDot = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid var(--border);
  flex-shrink: 0;
`

export const HamburgerButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  transition: background-color 160ms ease, box-shadow 160ms ease;

  &:hover {
    box-shadow: var(--shadow-soft);
  }
`

export const MobileActions = styled.div`
  display: none;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    display: flex;
  }
`

/* ── Desktop actions (hidden on mobile) ────────────── */

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    display: none;
  }
`

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`

/* ── Mobile drawer ─────────────────────────────────── */

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
`

type MobileOverlayProps = { $open: boolean }

export const MobileOverlay = styled.div<MobileOverlayProps>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    z-index: 90;
    background: rgba(0, 0, 0, 0.35);
    animation: ${fadeIn} 200ms ease;
  }
`

type MobileDrawerProps = { $open: boolean }

export const MobileDrawer = styled.div<MobileDrawerProps>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    gap: 8px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    width: min(300px, 80vw);
    padding: 20px;
    background: var(--bg);
    border-left: 1px solid var(--border);
    box-shadow: -8px 0 32px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    animation: ${slideIn} 250ms ease;
  }
`

export const DrawerCloseButton = styled.button`
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  margin-bottom: 8px;
  transition: background-color 160ms ease;

  &:hover {
    box-shadow: var(--shadow-soft);
  }
`

export const DrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const drawerItemStyles = css`
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  border: none;
  background: transparent;
  color: var(--muted);
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 120ms ease, color 120ms ease;

  &:hover {
    background: var(--surface-strong);
    color: var(--text);
  }
`

type DrawerNavLinkProps = { $active?: boolean }

export const DrawerNavLink = styled(Link) <DrawerNavLinkProps>`
  ${drawerItemStyles}

  ${({ $active }) =>
    $active
      ? css`
          color: var(--text);
          background: var(--surface-strong);
          font-weight: 600;
        `
      : ''}
`

export const DrawerRandomButton = styled.button`
  ${drawerItemStyles}
  cursor: pointer;
`

export const DrawerExternalLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const DrawerExternalLink = styled.a`
  ${drawerItemStyles}
  justify-content: flex-start;
  gap: 12px;
`

export const DrawerExternalIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
`

export const DrawerDivider = styled.hr`
  border: none;
  border-top: 1px solid var(--border);
  margin: 8px 0;
`

/* ── Breadcrumbs ───────────────────────────────────── */

export const BreadcrumbBar = styled.nav`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    font-size: 0.8125rem;
    color: var(--muted);
    border-bottom: 1px solid var(--border);
    background: var(--glass-subtle);
  }
`

export const BreadcrumbExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--muted);
  text-decoration: none;
  transition: color 160ms ease;
  padding: 2px;

  &:hover {
    color: var(--accent);
  }
`

export const BreadcrumbActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
`

export const BreadcrumbLink = styled(Link)`
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

export const BreadcrumbSeparator = styled.span`
  color: var(--muted);
  user-select: none;
`

export const BreadcrumbCurrent = styled.span`
  color: var(--text);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
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
  border: 1px solid var(--border);
  background: var(--surface-item);
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

export const NavigationLink = styled(Link) <NavigationItemProps>`
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

  @media (max-width: 480px) {
    right: auto;
    left: 0;
    min-width: 180px;
  }
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