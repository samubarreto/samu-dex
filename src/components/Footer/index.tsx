import { useTranslation } from '../../hooks/useTranslation'
import { Container, ExternalLink, IconWrapper, Inner, LinkText } from './styles'

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M12 1.5C6.20101 1.5 1.5 6.31383 1.5 12.2521C1.5 17.0024 4.50916 21.0318 8.68591 22.4537C9.21173 22.5536 9.40418 22.2229 9.40418 21.9406C9.40418 21.6876 9.39542 20.8452 9.39104 19.9477C6.46828 20.5965 5.8529 18.6604 5.8529 18.6604C5.37524 17.4105 4.68795 17.0785 4.68795 17.0785C3.73501 16.4128 4.76018 16.4266 4.76018 16.4266C5.81499 16.5024 6.37046 17.5345 6.37046 17.5345C7.30762 19.1821 8.82955 18.7052 9.42993 18.4273C9.52358 17.7299 9.79632 17.2529 10.0974 16.9826C7.76426 16.7096 5.31197 15.7674 5.31197 11.559C5.31197 10.3591 5.72903 9.37884 6.41341 8.60397C6.30286 8.33153 5.93943 7.23048 6.51738 5.74042C6.51738 5.74042 7.39761 5.45199 9.40199 6.85266C10.2407 6.61231 11.1394 6.49213 12 6.48751C12.8606 6.49213 13.7606 6.61231 14.6015 6.85266C16.6037 5.45199 17.4817 5.74042 17.4817 5.74042C18.0619 7.23048 17.6984 8.33153 17.5879 8.60397C18.2745 9.37884 18.6871 10.3591 18.6871 11.559C18.6871 15.7789 16.2304 16.705 13.8907 16.9722C14.2674 17.3041 14.6037 17.9564 14.6037 18.9563C14.6037 20.3897 14.5906 21.5446 14.5906 21.9406C14.5906 22.2252 14.7808 22.5582 15.3132 22.4525C19.4889 21.0295 22.5 17.0013 22.5 12.2521C22.5 6.31383 17.799 1.5 12 1.5Z" />
    </svg>
  )
}

function PokeBallIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.8" fill="rgba(15, 123, 108, 0.14)" />
      <path d="M12 3C15.9776 3 19.3716 5.58636 20.5847 9.17647H3.41528C4.62844 5.58636 8.02236 3 12 3Z" fill="currentColor" fillOpacity="0.18" />
    </svg>
  )
}

export default function Footer() {
  const { translate } = useTranslation()

  return (
    <Container>
      <Inner>
        <ExternalLink
          href="https://github.com/samubarreto"
          target="_blank"
          rel="noreferrer"
          aria-label={translate('footer.github.ariaLabel')}
          title={translate('footer.github.title')}
        >
          <IconWrapper>
            <GitHubIcon />
          </IconWrapper>
          <LinkText>{translate('footer.github.label')}</LinkText>
        </ExternalLink>

        <ExternalLink
          href="https://pokeapi.co/"
          target="_blank"
          rel="noreferrer"
          aria-label={translate('footer.pokeapi.ariaLabel')}
          title={translate('footer.pokeapi.title')}
        >
          <IconWrapper>
            <PokeBallIcon />
          </IconWrapper>
          <LinkText>{translate('footer.pokeapi.label')}</LinkText>
        </ExternalLink>
      </Inner>
    </Container>
  )
}