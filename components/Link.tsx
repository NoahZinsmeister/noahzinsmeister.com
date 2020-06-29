import { ReactNode } from 'react'
import NextLink from 'next/link'
import { lighten, darken } from 'polished'

import useTheme from '../theme'
import { isIPFS } from '../utils'

export default function Link({
  href,
  asNextLink = false,
  children,
  ...rest
}: {
  href: string
  asNextLink?: boolean
  children: ReactNode
  [key: string]: any
}) {
  const theme = useTheme()

  return (
    <>
      {href.slice(0, 1) === '/' ? (
        // note that the below assumes no more than a single level of page nesting
        <NextLink href={href} as={href === '/' ? './' : `.${href}${isIPFS ? '.html' : ''}`}>
          <a {...rest}>{children}</a>
        </NextLink>
      ) : (
        <a target="_blank" rel="noopener noreferrer" href={href} {...rest}>
          {children}
        </a>
      )}

      <style jsx>{`
        a {
          text-decoration: none;
          color: ${theme.colors.link};
        }

        a:hover {
          cursor: pointer;
          color: ${(theme.isDarkMode ? lighten : darken)(0.1, theme.colors.link)};
        }

        a:active {
          color: ${(theme.isDarkMode ? lighten : darken)(0.25, theme.colors.link)};
        }
      `}</style>
    </>
  )
}
