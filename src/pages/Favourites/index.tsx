import { useEffect, useState } from 'react'
import { useFavourites } from '../../hooks/useFavourites'
import { useTranslation } from '../../hooks/useTranslation'
import { isRequestCanceled } from '../../services/http'
import { getPokemonTypeMap } from '../../services/pokemon'
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
  const [typeMap, setTypeMap] = useState<Map<number, string[]>>(new Map())

  useEffect(() => {
    const controller = new AbortController()

    getPokemonTypeMap(controller.signal)
      .then(setTypeMap)
      .catch((error) => {
        if (!isRequestCanceled(error)) setTypeMap(new Map())
      })

    return () => controller.abort()
  }, [])

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
        <PokeGrid pokemons={favourites} typeMap={typeMap} />
      )}
    </Page>
  )
}
