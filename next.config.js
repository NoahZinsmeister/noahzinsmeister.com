module.exports = {
  reactStrictMode: true,
  assetPrefix: process.env.IPFS === 'true' ? '.' : '',
  env: {
    IPFS: process.env.IPFS,
    COMMIT_SHA: process.env.NOW_GITHUB_COMMIT_SHA || process.env.GITHUB_SHA || 'master'
  }
}
