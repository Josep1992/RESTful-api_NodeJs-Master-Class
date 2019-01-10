const environments = {}

environments.staging = {
  HTTP: 3000,
  HTTPS: 3001,
  envNAME: 'staging',
}

environments.production = {
  HTTP: 5000,
  HTTPS: 5001,
  envNAME: 'production',
}

const currentEnv = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV.toLocaleLowerCase() : ''

const envToExport = typeof environments[currentEnv] === 'object' ? environments[currentEnv] : environments.staging

module.exports = envToExport
