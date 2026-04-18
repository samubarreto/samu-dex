import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTheme, type Theme } from '../../hooks/useTheme'
import { useTranslation } from '../../hooks/useTranslation'
import type { Locale } from '../../locales'
import {
  Actions,
  BrandLink,
  BreadcrumbActions,
  BreadcrumbBar,
  BreadcrumbCurrent,
  BreadcrumbExternalLink,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Container,
  DrawerCloseButton,
  DrawerDivider,
  DrawerExternalIcon,
  DrawerExternalLink,
  DrawerExternalLinks,
  DrawerNav,
  DrawerNavLink,
  DrawerRandomButton,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  FlagImage,
  HamburgerButton,
  Inner,
  ItemCheck,
  ItemLabel,
  LanguageDropdown,
  MobileActions,
  MobileDrawer,
  MobileOverlay,
  Navigation,
  NavigationLink,
  RandomButton,
  ThemeColorDot,
  ThemeDropdown,
  TriggerCaret,
  TriggerLabel,
} from './styles'

const MAX_POKEMON_ID = 1025

const localeFlagCodes: Record<Locale, string> = {
  pt: 'br',
  en: 'us',
  es: 'es',
  it: 'it',
  ja: 'jp',
}

const flagUrl = (code: string) =>
  `https://flagpedia.net/data/flags/w580/${code}.webp?v=un`

type IconProps = {
  size?: number
}

function GitHubIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 1.5C6.20101 1.5 1.5 6.31383 1.5 12.2521C1.5 17.0024 4.50916 21.0318 8.68591 22.4537C9.21173 22.5536 9.40418 22.2229 9.40418 21.9406C9.40418 21.6876 9.39542 20.8452 9.39104 19.9477C6.46828 20.5965 5.8529 18.6604 5.8529 18.6604C5.37524 17.4105 4.68795 17.0785 4.68795 17.0785C3.73501 16.4128 4.76018 16.4266 4.76018 16.4266C5.81499 16.5024 6.37046 17.5345 6.37046 17.5345C7.30762 19.1821 8.82955 18.7052 9.42993 18.4273C9.52358 17.7299 9.79632 17.2529 10.0974 16.9826C7.76426 16.7096 5.31197 15.7674 5.31197 11.559C5.31197 10.3591 5.72903 9.37884 6.41341 8.60397C6.30286 8.33153 5.93943 7.23048 6.51738 5.74042C6.51738 5.74042 7.39761 5.45199 9.40199 6.85266C10.2407 6.61231 11.1394 6.49213 12 6.48751C12.8606 6.49213 13.7606 6.61231 14.6015 6.85266C16.6037 5.45199 17.4817 5.74042 17.4817 5.74042C18.0619 7.23048 17.6984 8.33153 17.5879 8.60397C18.2745 9.37884 18.6871 10.3591 18.6871 11.559C18.6871 15.7789 16.2304 16.705 13.8907 16.9722C14.2674 17.3041 14.6037 17.9564 14.6037 18.9563C14.6037 20.3897 14.5906 21.5446 14.5906 21.9406C14.5906 22.2252 14.7808 22.5582 15.3132 22.4525C19.4889 21.0295 22.5 17.0013 22.5 12.2521C22.5 6.31383 17.799 1.5 12 1.5Z" />
    </svg>
  )
}

function PokeBallIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" fill="rgba(15, 123, 108, 0.14)" />
      <path d="M12 3C15.9776 3 19.3716 5.58636 20.5847 9.17647H3.41528C4.62844 5.58636 8.02236 3 12 3Z" fill="currentColor" fillOpacity="0.18" />
    </svg>
  )
}

function PaletteIcon({ size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
    </svg>
  )
}

function StarIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3.5L14.781 9.136L21 10.04L16.5 14.427L17.562 20.621L12 17.697L6.438 20.621L7.5 14.427L3 10.04L9.219 9.136L12 3.5Z" />
    </svg>
  )
}

function DiceIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="9" cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const themeSwatches: Record<Theme, { background: string; borderColor: string }> = {
  light: { background: '#e5e7eb', borderColor: '#cbd5e1' },
  dark: { background: '#374151', borderColor: '#1f2937' },
  nord_light: { background: '#8fbcbb', borderColor: '#5e81ac' },
  solarized_light: { background: '#859900', borderColor: '#2aa198' },
  modern_ink: { background: '#ff360d', borderColor: '#cc2b0a' },
  rose_pine_dawn: { background: '#56949f', borderColor: '#c4a7e7' },
  soaring_skies: { background: '#55c6f0', borderColor: '#1e107a' },
  tangerine: { background: '#fe5503', borderColor: '#ff9562' },
}

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const { theme, setTheme, supportedThemes } = useTheme()
  const { locale, setLocale, supportedLocales, translate } = useTranslation()

  const [langOpen, setLangOpen] = useState(false)
  const [themeMenuOpen, setThemeMenuOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const langDropdownRef = useRef<HTMLDivElement>(null)
  const themeDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langOpen && langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setLangOpen(false)
      }
      if (themeMenuOpen && themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangOpen(false)
        setThemeMenuOpen(false)
      }
    }

    if (langOpen || themeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [langOpen, themeMenuOpen])

  const handleSelectLocale = (selectedLocale: Locale) => {
    setLocale(selectedLocale)
    setLangOpen(false)
  }

  const handleSelectTheme = (selectedTheme: Theme) => {
    setTheme(selectedTheme)
    setThemeMenuOpen(false)
  }

  const handleRandomNavigation = () => {
    const randomPokemonId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1

    navigate(`/details/${randomPokemonId}`)
  }

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false)
    setLangOpen(false)
    setThemeMenuOpen(false)
  }, [location.pathname])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  // Breadcrumb segments
  const breadcrumbs = (() => {
    const path = location.pathname
    if (path === '/') return null

    const crumbs: { label: string; to?: string }[] = [
      { label: translate('header.navigation.home'), to: '/' },
    ]

    if (path.startsWith('/favourites')) {
      crumbs.push({ label: translate('header.navigation.favourites') })
    } else if (path.startsWith('/details/')) {
      crumbs.push({ label: translate('breadcrumb.details', { params: { id: params.pokemonId ?? '' } }) })
    } else {
      crumbs.push({ label: translate('breadcrumb.page') })
    }

    return crumbs
  })()

  return (
    <>
      <Container>
        <Inner>
          <BrandLink to="/">{translate('header.brand')}</BrandLink>

          {/* Desktop navigation */}
          <Actions>
            <Navigation aria-label={translate('header.navigation.label')}>
              <NavigationLink
                to="/favourites"
                $active={location.pathname.startsWith('/favourites')}
              >
                <StarIcon />
                {translate('header.navigation.favourites')}
              </NavigationLink>
              <RandomButton type="button" onClick={handleRandomNavigation}>
                <DiceIcon />
                {translate('header.navigation.random')}
              </RandomButton>
            </Navigation>

            <ThemeDropdown ref={themeDropdownRef}>
              <DropdownTrigger
                type="button"
                $open={themeMenuOpen}
                onClick={() => { setThemeMenuOpen(prev => !prev); setLangOpen(false) }}
                aria-haspopup="listbox"
                aria-expanded={themeMenuOpen}
                aria-label={translate('header.theme.label')}
              >
                <PaletteIcon size={16} />
                <TriggerLabel>
                  {translate(`header.theme.options.${theme}`)}
                </TriggerLabel>
                <TriggerCaret $open={themeMenuOpen} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </TriggerCaret>
              </DropdownTrigger>

              <DropdownMenu $open={themeMenuOpen} role="listbox" aria-label={translate('header.theme.label')}>
                {supportedThemes.map((t) => (
                  <DropdownItem
                    key={t}
                    $active={t === theme}
                    role="option"
                    aria-selected={t === theme}
                    onClick={() => handleSelectTheme(t)}
                  >
                    <ThemeColorDot style={themeSwatches[t]} />
                    <ItemLabel>
                      {translate(`header.theme.options.${t}`)}
                    </ItemLabel>
                    {t === theme && (
                      <ItemCheck aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </ItemCheck>
                    )}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </ThemeDropdown>

            <LanguageDropdown ref={langDropdownRef}>
            <DropdownTrigger
              type="button"
              $open={langOpen}
              onClick={() => { setLangOpen(prev => !prev); setThemeMenuOpen(false) }}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={translate('header.language.label')}
            >
              <FlagImage
                src={flagUrl(localeFlagCodes[locale])}
                alt=""
                loading="lazy"
              />
              <TriggerLabel>
                {translate(`header.language.options.${locale}`)}
              </TriggerLabel>
              <TriggerCaret $open={langOpen} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </TriggerCaret>
            </DropdownTrigger>

            <DropdownMenu $open={langOpen} role="listbox" aria-label={translate('header.language.label')}>
              {supportedLocales.map((supportedLocale) => (
                <DropdownItem
                  key={supportedLocale}
                  $active={supportedLocale === locale}
                  role="option"
                  aria-selected={supportedLocale === locale}
                  onClick={() => handleSelectLocale(supportedLocale)}
                >
                  <FlagImage
                    src={flagUrl(localeFlagCodes[supportedLocale])}
                    alt=""
                    loading="lazy"
                  />
                  <ItemLabel>
                    {translate(`header.language.options.${supportedLocale}`)}
                  </ItemLabel>
                  {supportedLocale === locale && (
                    <ItemCheck aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </ItemCheck>
                  )}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </LanguageDropdown>
          </Actions>

          {/* Mobile actions */}
          <MobileActions>
            <HamburgerButton
              type="button"
              aria-label={translate('header.menu.open')}
              onClick={() => setDrawerOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </HamburgerButton>
          </MobileActions>
        </Inner>
      </Container>

      {/* Mobile drawer */}
      <MobileOverlay $open={drawerOpen} onClick={() => setDrawerOpen(false)} />
      <MobileDrawer $open={drawerOpen}>
        <DrawerCloseButton
          type="button"
          aria-label={translate('header.menu.close')}
          onClick={() => setDrawerOpen(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </DrawerCloseButton>

        <DrawerNav aria-label={translate('header.navigation.label')}>
          <DrawerNavLink to="/" $active={location.pathname === '/'}>
            {translate('header.navigation.home')}
          </DrawerNavLink>
          <DrawerNavLink
            to="/favourites"
            $active={location.pathname.startsWith('/favourites')}
          >
            <StarIcon />
            {translate('header.navigation.favourites')}
          </DrawerNavLink>
          <DrawerRandomButton type="button" onClick={handleRandomNavigation}>
            <DiceIcon />
            {translate('header.navigation.random')}
          </DrawerRandomButton>
        </DrawerNav>

        <DrawerDivider />

        <DrawerExternalLinks>
          <DrawerExternalLink
            href="https://github.com/samubarreto"
            target="_blank"
            rel="noreferrer"
            aria-label={translate('footer.github.ariaLabel')}
            title={translate('footer.github.title')}
            onClick={() => setDrawerOpen(false)}
          >
            <DrawerExternalIcon>
              <GitHubIcon />
            </DrawerExternalIcon>
            {translate('footer.github.label')}
          </DrawerExternalLink>

          <DrawerExternalLink
            href="https://pokeapi.co/"
            target="_blank"
            rel="noreferrer"
            aria-label={translate('footer.pokeapi.ariaLabel')}
            title={translate('footer.pokeapi.title')}
            onClick={() => setDrawerOpen(false)}
          >
            <DrawerExternalIcon>
              <PokeBallIcon />
            </DrawerExternalIcon>
            {translate('footer.pokeapi.label')}
          </DrawerExternalLink>
        </DrawerExternalLinks>

        <DrawerDivider />

        {/* Theme selector inside drawer */}
        <ThemeDropdown ref={themeDropdownRef}>
          <DropdownTrigger
            type="button"
            $open={themeMenuOpen}
            onClick={() => { setThemeMenuOpen(prev => !prev); setLangOpen(false) }}
            aria-haspopup="listbox"
            aria-expanded={themeMenuOpen}
            aria-label={translate('header.theme.label')}
          >
            <PaletteIcon size={16} />
            <TriggerLabel>
              {translate(`header.theme.options.${theme}`)}
            </TriggerLabel>
            <TriggerCaret $open={themeMenuOpen} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </TriggerCaret>
          </DropdownTrigger>

          <DropdownMenu $open={themeMenuOpen} role="listbox" aria-label={translate('header.theme.label')}>
            {supportedThemes.map((t) => (
              <DropdownItem
                key={t}
                $active={t === theme}
                role="option"
                aria-selected={t === theme}
                onClick={() => handleSelectTheme(t)}
              >
                <ThemeColorDot style={themeSwatches[t]} />
                <ItemLabel>
                  {translate(`header.theme.options.${t}`)}
                </ItemLabel>
                {t === theme && (
                  <ItemCheck aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </ItemCheck>
                )}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ThemeDropdown>

        <DrawerDivider />

        {/* Language selector inside drawer */}
        <LanguageDropdown ref={langDropdownRef}>
          <DropdownTrigger
            type="button"
            $open={langOpen}
            onClick={() => { setLangOpen(prev => !prev); setThemeMenuOpen(false) }}
            aria-haspopup="listbox"
            aria-expanded={langOpen}
            aria-label={translate('header.language.label')}
          >
            <FlagImage
              src={flagUrl(localeFlagCodes[locale])}
              alt=""
              loading="lazy"
            />
            <TriggerLabel>
              {translate(`header.language.options.${locale}`)}
            </TriggerLabel>
            <TriggerCaret $open={langOpen} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </TriggerCaret>
          </DropdownTrigger>

          <DropdownMenu $open={langOpen} role="listbox" aria-label={translate('header.language.label')}>
            {supportedLocales.map((supportedLocale) => (
              <DropdownItem
                key={supportedLocale}
                $active={supportedLocale === locale}
                role="option"
                aria-selected={supportedLocale === locale}
                onClick={() => handleSelectLocale(supportedLocale)}
              >
                <FlagImage
                  src={flagUrl(localeFlagCodes[supportedLocale])}
                  alt=""
                  loading="lazy"
                />
                <ItemLabel>
                  {translate(`header.language.options.${supportedLocale}`)}
                </ItemLabel>
                {supportedLocale === locale && (
                  <ItemCheck aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </ItemCheck>
                )}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </LanguageDropdown>
      </MobileDrawer>

      {/* Breadcrumbs (mobile only) */}
      {breadcrumbs && (
        <BreadcrumbBar aria-label={translate('breadcrumb.label')}>
          {breadcrumbs.map((crumb, index) => (
            <span key={index} style={{ display: 'contents' }}>
              {index > 0 && <BreadcrumbSeparator aria-hidden="true">/</BreadcrumbSeparator>}
              {crumb.to ? (
                <BreadcrumbLink to={crumb.to}>{crumb.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbCurrent>{crumb.label}</BreadcrumbCurrent>
              )}
            </span>
          ))}

          <BreadcrumbActions>
            <BreadcrumbExternalLink
              href="https://github.com/samubarreto"
              target="_blank"
              rel="noreferrer"
              aria-label={translate('footer.github.ariaLabel')}
              title={translate('footer.github.title')}
            >
              <GitHubIcon size={15} />
            </BreadcrumbExternalLink>

            <BreadcrumbExternalLink
              href="https://pokeapi.co/"
              target="_blank"
              rel="noreferrer"
              aria-label={translate('footer.pokeapi.ariaLabel')}
              title={translate('footer.pokeapi.title')}
            >
              <PokeBallIcon size={15} />
            </BreadcrumbExternalLink>
          </BreadcrumbActions>
        </BreadcrumbBar>
      )}
    </>
  )
}