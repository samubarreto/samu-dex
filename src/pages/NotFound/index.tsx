import { useTranslation } from '../../hooks/useTranslation'
import { Card, Code, Description, GoHomeLink, Page, Title } from './styles'

export default function NotFoundPage() {
  const { translate } = useTranslation()

  return (
    <Page>
      <Card>
        <Code>{translate('notFound.code')}</Code>
        <Title>{translate('notFound.title')}</Title>
        <Description>{translate('notFound.description')}</Description>
        <GoHomeLink to="/">{translate('notFound.goHome')}</GoHomeLink>
      </Card>
    </Page>
  )
}
