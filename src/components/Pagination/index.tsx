import { useTranslation } from '../../hooks/useTranslation'
import { Container, Controls, Ellipsis, PageButton, Summary } from './styles'

type PaginationProps = {
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}

function buildVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages: Array<number | string> = [1]
  let startPage = Math.max(2, currentPage - 1)
  let endPage = Math.min(totalPages - 1, currentPage + 1)

  if (currentPage <= 3) {
    endPage = 4
  }

  if (currentPage >= totalPages - 2) {
    startPage = totalPages - 3
  }

  if (startPage > 2) {
    pages.push('start-ellipsis')
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page)
  }

  if (endPage < totalPages - 1) {
    pages.push('end-ellipsis')
  }

  pages.push(totalPages)

  return pages
}

export default function Pagination({ currentPage, onPageChange, totalPages }: PaginationProps) {
  const { translate } = useTranslation()
  const pages = buildVisiblePages(currentPage, totalPages)

  if (totalPages <= 1) {
    return null
  }

  return (
    <Container aria-label={translate('home.pagination.navigationLabel')}>
      <Summary>
        {translate('home.pagination.summary', {
          params: {
            current: currentPage,
            total: totalPages,
          },
        })}
      </Summary>

      <Controls>
        <PageButton
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {translate('home.pagination.previous')}
        </PageButton>

        {pages.map((page) => {
          if (typeof page !== 'number') {
            return <Ellipsis key={page}>...</Ellipsis>
          }

          return (
            <PageButton
              key={page}
              type="button"
              $active={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PageButton>
          )
        })}

        <PageButton
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {translate('home.pagination.next')}
        </PageButton>
      </Controls>
    </Container>
  )
}