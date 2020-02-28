import { resolve } from 'url'

const IPFS = process.env.IPFS === 'true'

export function getRelativeURI(fragment: string): string {
  let uri = fragment
  if (IPFS) {
    uri = resolve(document?.baseURI, fragment)
  }
  return uri
}
