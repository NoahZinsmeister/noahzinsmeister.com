import NextLink from 'next/link'
import { darken, lighten } from 'polished'

import useTheme from '../theme'

export default function Link({ href, children, asNextLink = false, ...rest }) {
  const theme = useTheme()

  return (
    <>
      {asNextLink ? (
        <NextLink href={href}>
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
