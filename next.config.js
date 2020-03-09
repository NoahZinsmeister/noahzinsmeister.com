module.exports = {
  reactStrictMode: true,
  assetPrefix: process.env.IPFS === 'true' ? '.' : '',
  env: {
    IPFS: process.env.IPFS,
    COMMIT_SHA: process.env.COMMIT_SHA_NOW || process.env.COMMIT_SHA_GITHUB || 'master'
  }
}
