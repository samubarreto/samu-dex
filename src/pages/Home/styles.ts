import { styled } from 'styled-components'

export const Page = styled.section`
	display: grid;
	gap: 20px;
`

export const FiltersSection = styled.section`
	padding: 16px 24px;
	border: 1px solid var(--border);
	border-radius: var(--radius-lg);
	background: var(--surface);
	box-shadow: var(--shadow-soft);

	@media (max-width: 480px) {
		padding: 12px 16px;
		border-radius: var(--radius-md);
	}
`

export const FiltersHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	min-height: 32px;
`

export const FiltersToggle = styled.button`
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 4px 0;
	background: none;
	border: none;
	cursor: pointer;
	color: var(--muted);
	font-size: 0.875rem;
	font-weight: 600;
	transition: color 160ms ease;

	&:hover {
		color: var(--text);
	}
`

type FiltersToggleCaretProps = { $open: boolean }

export const FiltersToggleCaret = styled.span<FiltersToggleCaretProps>`
	display: inline-flex;
	align-items: center;
	transition: transform 250ms ease;
	transform: rotate(${({ $open }) => ($open ? '0deg' : '-90deg')});
`

export const FiltersToggleLabel = styled.span``

type FiltersContentProps = { $open: boolean }

export const FiltersContent = styled.div<FiltersContentProps>`
	display: grid;
	gap: 16px;
	grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
	opacity: ${({ $open }) => ($open ? 1 : 0)};
	overflow: hidden;
	transition: grid-template-rows 300ms ease, opacity 250ms ease;
	padding-top: ${({ $open }) => ($open ? '16px' : '0')};

	& > * {
		min-height: 0;
		overflow: hidden;
	}
`

export const ClearFiltersButton = styled.button`
	padding: 6px 14px;
	border-radius: var(--radius-full);
	font-size: 0.82rem;
	font-weight: 600;
	color: var(--accent);
	border: 1px solid var(--accent);
	background: transparent;
	transition: all 160ms ease;

	&:hover {
		background: rgba(15, 123, 108, 0.08);
	}
`

export const StateCard = styled.section`
	display: grid;
	gap: 12px;
	padding: 40px 32px;
	border-radius: var(--radius-lg);
	border: 1px solid var(--border);
	background: var(--surface);
	box-shadow: var(--shadow-soft);
	text-align: center;
	justify-items: center;

	@media (max-width: 480px) {
		padding: 28px 20px;
		border-radius: var(--radius-md);
	}
`

export const StateTitle = styled.h2`
	margin: 0;
	font-family: var(--font-display);
	font-size: clamp(1.8rem, 5vw, 2.4rem);
	color: var(--text);
`

export const StateDescription = styled.p`
	margin: 0;
	max-width: 60ch;
	color: var(--muted);
`