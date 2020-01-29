module.exports = {
  reactStrictMode: true,
  target: 'serverless',
  assetPrefix: '.',
  env: {
    IPFS: process.env.IPFS
  }
}
