module.exports = {
  reactStrictMode: true,
  target: 'serverless',
  env: {
    IPFS: process.env.IPFS,
    NOW_GITHUB_COMMIT_SHA: process.env.NOW_GITHUB_COMMIT_SHA,
    GITHUB_SHA: process.env.GITHUB_SHA
  }
}
