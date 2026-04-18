import { useSyncExternalStore } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { Container, Controls, Ellipsis, PageButton } from './styles'

type PaginationProps = {
  currentPage: number
  onPageChange: (page: number) => void
  totalPages: number
}

const MOBILE_QUERY = '(max-width: 480px)'

function subscribeMediaQuery(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

function getIsMobile() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function buildVisiblePages(currentPage: number, totalPages: number, maxVisible: number) {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const pages: Array<number | string> = [1]
  const sideCount = maxVisible <= 5 ? 0 : 1
  let startPage = Math.max(2, currentPage - sideCount)
  let endPage = Math.min(totalPages - 1, currentPage + sideCount)

  if (currentPage <= 2 + sideCount) {
    endPage = Math.min(2 + sideCount * 2, totalPages - 1)
  }

  if (currentPage >= totalPages - 1 - sideCount) {
    startPage = Math.max(totalPages - 1 - sideCount * 2, 2)
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
  const isMobile = useSyncExternalStore(subscribeMediaQuery, getIsMobile, () => false)
  const pages = buildVisiblePages(currentPage, totalPages, isMobile ? 5 : 7)

  if (totalPages <= 1) {
    return null
  }

  return (
    <Container aria-label={translate('home.pagination.navigationLabel')}>
      {/* <Summary>
        {translate('home.pagination.summary', {
          params: {
            current: currentPage,
            total: totalPages,
          },
        })}
      </Summary> */}

      <Controls>
        <PageButton
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label={translate('home.pagination.previous')}
        >
          {isMobile ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 3L5 8L10 13" />
            </svg>
          ) : translate('home.pagination.previous')}
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
          aria-label={translate('home.pagination.next')}
        >
          {isMobile ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3L11 8L6 13" />
            </svg>
          ) : translate('home.pagination.next')}
        </PageButton>
      </Controls>
    </Container>
  )
}