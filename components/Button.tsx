import { ReactNode, MouseEvent } from 'react'

export default function Button({
  onClick,
  children,
  ...rest
}: {
  onClick: (event: MouseEvent) => void
  children: ReactNode
  [key: string]: any
}) {
  return (
    <>
      <button onClick={onClick} {...rest}>
        {children}
      </button>
      <style jsx>
        {`
          button {
            margin: 0;
            padding: 0;
            border: none;
            background: transparent;
            user-select: none;
            cursor: pointer;
          }
        `}
      </style>
    </>
  )
}
