import NextLink from 'next/link'
import { resolve } from 'url'
import { darken, lighten } from 'polished'

import useTheme from '../theme'

export default function Link({ href, children, asNextLink = false, ...rest }) {
  const theme = useTheme()

  // thanks to https://github.com/Velenir/nextjs-ipfs-example
  let as = href
  if (asNextLink && as.startsWith('/')) {
    as = '.' + href
    if (typeof document !== 'undefined') {
      as = resolve(document.baseURI, as)
    }
  }

  return (
    <>
      {asNextLink ? (
        <NextLink href={href} as={as}>
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
