const environments = {}

environments.staging = {
  PORT: process.env.PORT || 3000,
  envNAME: 'staging',
}

environments.production = {
  PORT: process.env.PORT || 5000,
  envNAME: 'production',
}

const currentEnv =
  typeof process.env.NODE_ENV === 'string'
    ? process.env.NODE_ENV.toLocaleLowerCase()
    : ''

const envToExport =
  typeof environments[currentEnv] === 'object'
    ? environments[currentEnv]
    : environments.staging

module.exports = envToExport
