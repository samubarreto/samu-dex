import { type MouseEvent, useEffect, useRef, useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { Button, Tooltip, Wrapper } from './styles'

type CopyButtonProps = {
  text: string
  size?: 'sm' | 'md'
  className?: string
  onClick?: (event: MouseEvent) => void
}

const iconSizes = { sm: 14, md: 18 }
const TOOLTIP_DURATION = 1500

export default function CopyButton({ text, size = 'sm', className, onClick }: CopyButtonProps) {
  const { translate } = useTranslation()
  const [showTooltip, setShowTooltip] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleClick = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    navigator.clipboard.writeText(text)

    setShowTooltip(true)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShowTooltip(false), TOOLTIP_DURATION)

    onClick?.(event)
  }

  const iconSize = iconSizes[size]

  return (
    <Wrapper className={className}>
      {showTooltip && <Tooltip $visible={showTooltip}>{translate('copyButton.copied')}</Tooltip>}
      <Button type="button" $size={size} title={text} onClick={handleClick}>
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      </Button>
    </Wrapper>
  )
}
