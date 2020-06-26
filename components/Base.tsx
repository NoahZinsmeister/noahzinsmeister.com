import { resolve } from 'url'
import Head from 'next/head'

import { isIPFS, isServerSide } from '../utils'

export default function Base(): JSX.Element {
  let href: string = isServerSide ? '/' : resolve(window.location.origin, '/')

  if (!isServerSide && isIPFS) {
    // ipfs gateway of the format https://ipfs.io/ipns/noahzinsmeister.com/
    if (['ipfs', 'ipns'].some(identifier => identifier === window.location.pathname.split('/')[1])) {
      href = resolve(
        window.location.origin, // https://ipfs.io"
        window.location.pathname
          .split('/')
          .slice(0, 3)
          .join('/') + '/' // /ipns/noahzinsmeister.com + /
      )
    }
  }

  return (
    <Head>
      <base key="base" href={href} />
    </Head>
  )
}
