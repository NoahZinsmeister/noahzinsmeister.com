import { ReactNode } from 'react'
import NextLink from 'next/link'
import { lighten, darken } from 'polished'
import { UrlObject } from 'url'

import useTheme from '../theme'
import { isIPFS } from '../utils'

export default function Link({ href, children, ...rest }: { href: string; children: ReactNode; [key: string]: any }) {
  const theme = useTheme()

  return (
    <>
      {href.slice(0, 1) === '/' ? (
        isIPFS ? (
          <a href={`.${href}${href === '/' ? '' : '.html'}`} {...rest}>
            {children}
          </a>
        ) : (
          <NextLink href={href}>
            <a {...rest}>{children}</a>
          </NextLink>
        )
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
