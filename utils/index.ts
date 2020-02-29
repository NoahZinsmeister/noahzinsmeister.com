import { resolve } from 'url'

const IPFS = process.env.IPFS === 'true'

export function getBaseURI(): string {
  return resolve(
    window.location.origin,
    window.location.pathname
      .split('/')
      .slice(0, 3)
      .join('/')
  )
}

export function getRelativeURI(fragment: string): string {
  let uri = fragment
  if (IPFS) {
    let baseURI = getBaseURI()
    if (baseURI[baseURI.length - 1] !== '/') {
      baseURI = `${baseURI}/`
    }
    uri = resolve(baseURI, `.${fragment}`)
  }
  return uri
}
