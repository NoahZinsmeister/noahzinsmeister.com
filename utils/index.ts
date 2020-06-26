export const isIPFS = process.env.IPFS === 'true'

export const isServerSide = typeof window === 'undefined'
