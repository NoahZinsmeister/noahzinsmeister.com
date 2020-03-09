import { ReactNode, MouseEvent } from 'react'

import Button from './Button'

function BaseEmoji({
  label,
  size,
  children,
  ...rest
}: {
  label: string
  size?: string
  children: ReactNode
  [key: string]: any
}) {
  return (
    <>
      <span role="img" aria-label={label} {...rest}>
        {children}
      </span>
      <style jsx>{`
        span {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: ${size};
          line-height: 1;
          width: ${size};
          height: ${size};
        }
      `}</style>
    </>
  )
}

export default function Emoji({
  emoji,
  label = 'emoji',
  size = '24px',
  onClick,
  ...rest
}: {
  emoji: string
  label?: string
  size?: string
  onClick?: (event: MouseEvent) => void
  [key: string]: any
}) {
  if (typeof onClick === 'function') {
    return (
      <>
        <Button onClick={onClick} {...rest}>
          <BaseEmoji label={label} size={size}>
            {emoji}
          </BaseEmoji>
        </Button>

        <style jsx>{`
          span {
            user-select: none;
          }
        `}</style>
      </>
    )
  } else {
    return (
      <BaseEmoji label={label} size={size} {...rest}>
        {emoji}
      </BaseEmoji>
    )
  }
}
