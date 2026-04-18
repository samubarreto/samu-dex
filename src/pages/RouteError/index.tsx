import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { useTranslation } from '../../hooks/useTranslation'
import { Card, Code, Description, GoHomeLink, Page, Title } from '../NotFound/styles'

export default function RouteErrorPage() {
  const error = useRouteError()
  const { translate } = useTranslation()

  const is404 = isRouteErrorResponse(error) && error.status === 404

  const code = isRouteErrorResponse(error) ? String(error.status) : translate('routeError.code')
  const title = is404 ? translate('notFound.title') : translate('routeError.title')
  const description = is404 ? translate('notFound.description') : translate('routeError.description')

  return (
    <Page>
      <Card>
        <Code>{code}</Code>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <GoHomeLink to="/">{translate('notFound.goHome')}</GoHomeLink>
      </Card>
    </Page>
  )
}
