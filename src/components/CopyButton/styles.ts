import { styled, keyframes } from 'styled-components'

type StyledCopyButtonProps = { $size?: 'sm' | 'md' }

const sizes = {
  sm: { button: '28px', icon: 14 },
  md: { button: '36px', icon: 18 },
}

export const Wrapper = styled.div`
  position: relative;
  display: inline-flex;
`

export const Button = styled.button<StyledCopyButtonProps>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size = 'sm' }) => sizes[$size].button};
  height: ${({ $size = 'sm' }) => sizes[$size].button};
  border-radius: var(--radius-full);
  border: 1px solid transparent;
  background: transparent;
  color: var(--muted);
  padding: 0;
  cursor: pointer;
  transition: color 160ms ease, background 160ms ease, border-color 160ms ease;

  &:hover {
    color: var(--accent);
    background: rgba(15, 123, 108, 0.08);
    border-color: rgba(15, 123, 108, 0.15);
  }
`

const tooltipIn = keyframes`
  0%   { opacity: 0; transform: translateX(-50%) translateY(4px) scale(0.92); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
`

const tooltipOut = keyframes`
  0%   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
  100% { opacity: 0; transform: translateX(-50%) translateY(4px) scale(0.92); }
`

type TooltipProps = { $visible: boolean }

export const Tooltip = styled.span<TooltipProps>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 12px;
  border-radius: var(--radius-sm);
  background: var(--accent);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(15, 123, 108, 0.25);
  animation: ${({ $visible }) => ($visible ? tooltipIn : tooltipOut)} 200ms ease forwards;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--accent);
  }
`
