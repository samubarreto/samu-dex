import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import type { Locale } from '../../locales'
import {
  Actions,
  BrandLink,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  FlagImage,
  Inner,
  ItemCheck,
  ItemLabel,
  LanguageDropdown,
  Navigation,
  NavigationLink,
  RandomButton,
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

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { locale, setLocale, supportedLocales, translate } = useTranslation()

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  const handleSelectLocale = (selectedLocale: Locale) => {
    setLocale(selectedLocale)
    setOpen(false)
  }

  const handleRandomNavigation = () => {
    const randomPokemonId = Math.floor(Math.random() * MAX_POKEMON_ID) + 1

    navigate(`/details/${randomPokemonId}`)
  }

  return (
    <Container>
      <Inner>
        <BrandLink to="/">{translate('header.brand')}</BrandLink>

        <Actions>
          <Navigation aria-label={translate('header.navigation.label')}>
            <NavigationLink to="/" $active={location.pathname === '/'}>
              {translate('header.navigation.home')}
            </NavigationLink>
            <NavigationLink
              to="/favourites"
              $active={location.pathname.startsWith('/favourites')}
            >
              {translate('header.navigation.favourites')}
            </NavigationLink>
            <RandomButton type="button" onClick={handleRandomNavigation}>
              {translate('header.navigation.random')}
            </RandomButton>
          </Navigation>

          <LanguageDropdown ref={dropdownRef}>
            <DropdownTrigger
              type="button"
              $open={open}
              onClick={() => setOpen((prev) => !prev)}
              aria-haspopup="listbox"
              aria-expanded={open}
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
              <TriggerCaret $open={open} aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </TriggerCaret>
            </DropdownTrigger>

            <DropdownMenu $open={open} role="listbox" aria-label={translate('header.language.label')}>
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
      </Inner>
    </Container>
  )
}