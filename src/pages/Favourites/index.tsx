import { useFavourites } from '../../hooks/useFavourites'
import { useTranslation } from '../../hooks/useTranslation'
import PokeGrid from '../../components/PokeGrid'
import {
  EmptyCard,
  EmptyDescription,
  EmptyTitle,
  GoHomeLink,
  Page,
  PageHeader,
  PageSubtitle,
  PageTitle,
} from './styles'

export default function FavouritesPage() {
  const { translate } = useTranslation()
  const { favourites } = useFavourites()

  return (
    <Page>
      <PageHeader>
        <PageTitle>{translate('favourites.title')}</PageTitle>
        <PageSubtitle>
          {translate('favourites.subtitle', { params: { count: favourites.length } })}
        </PageSubtitle>
      </PageHeader>

      {favourites.length === 0 ? (
        <EmptyCard>
          <EmptyTitle>{translate('favourites.emptyTitle')}</EmptyTitle>
          <EmptyDescription>{translate('favourites.emptyDescription')}</EmptyDescription>
          <GoHomeLink to="/">{translate('favourites.goHome')}</GoHomeLink>
        </EmptyCard>
      ) : (
        <PokeGrid pokemons={favourites} />
      )}
    </Page>
  )
}
