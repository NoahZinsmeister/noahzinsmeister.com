const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = phase => ({
  env: {
    ENVIRONMENT: phase === PHASE_DEVELOPMENT_SERVER ? 'development' : 'production'
  },
  target: 'serverless'
})
