const environments = {}

environments.staging = {
  PORT: process.env.PORT || 3000,
  HTTP: 3000,
  HTTPS: 3001,
  envNAME: 'staging',
}

environments.production = {
  PORT: process.env.PORT || 5000,
  HTTP: 5000,
  HTTPS: 5001,
  envNAME: 'production',
}

const currentEnv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : ''

const envToExport = typeof environments[currentEnv] === 'object' ? environments[currentEnv] : environments.staging

module.exports = envToExport
