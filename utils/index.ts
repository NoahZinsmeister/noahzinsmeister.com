import { resolve } from 'url'

const IPFS = process.env.IPFS === 'true'

export function getRelativeURI(fragment: string): string {
  let uri = fragment
  if (IPFS) {
    let baseURI = document.baseURI
    if (baseURI[baseURI.length - 1] !== '/') {
      baseURI = `${baseURI}/`
    }
    uri = resolve(baseURI, `.${fragment}`)
  }
  return uri
}
