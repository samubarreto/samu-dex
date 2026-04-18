import { styled } from 'styled-components'

export const Page = styled.section`
	display: grid;
	gap: 24px;
`

export const Hero = styled.section`
	display: grid;
	grid-template-columns: minmax(0, 1.35fr) minmax(260px, 0.65fr);
	gap: 20px;

	@media (max-width: 900px) {
		grid-template-columns: 1fr;
	}
`

export const HeroPanel = styled.div`
	padding: clamp(24px, 4vw, 36px);
	border: 1px solid var(--border);
	border-radius: var(--radius-lg);
	background: var(--surface);
	box-shadow: var(--shadow-soft);
`

export const Eyebrow = styled.p`
	font-size: 0.76rem;
	font-weight: 700;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--accent);
`

export const HeroTitle = styled.h1`
	margin-top: 14px;
	font-family: var(--font-display);
	font-size: clamp(2.6rem, 7vw, 4.5rem);
	line-height: 1.2;
	letter-spacing: -0.04em;
	color: var(--text);
`

export const HeroSubtitle = styled.p`
	margin-top: 16px;
	max-width: 56ch;
	font-size: 1.02rem;
	color: var(--muted);
`

export const HeroMetrics = styled.div`
	display: grid;
	gap: 14px;
	height: 100%;
`

export const HeroMetric = styled.div`
	display: grid;
	gap: 6px;
	padding: 18px 20px;
	border-radius: var(--radius-md);
	background: var(--surface-strong);
	border: 1px solid var(--border);
`

export const HeroMetricValue = styled.strong`
	font-size: clamp(1.8rem, 5vw, 2.6rem);
	line-height: 1;
	color: var(--text);
`

export const HeroMetricLabel = styled.span`
	color: var(--muted);
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