export const isIPFS = process.env.IPFS === 'true'

export function getRelativeURI(fragment: string): string {
  return isIPFS ? `.${fragment}` : fragment
}
