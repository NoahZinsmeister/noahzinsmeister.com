const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  reactStrictMode: true,
  target: 'serverless',
  assetPrefix: isProduction ? '.' : '',
  env: {
    IPFS: process.env.IPFS
  }
}
