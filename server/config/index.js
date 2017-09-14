import {merge} from 'lodash'

let envs = {
  dev: 'development',
  test: 'testing',
  prod: 'production'
}

let config = {
  env: process.env.NODE_ENV || envs.dev,
  port: process.env.PORT || 3000,
  expireTime: 24 * 60 * 10,
  secrets: {
    jwt: process.env.JWT || 'gumball'
  }
}

// Load config from production.js or development.js ...
let envConfig
try {
  envConfig = require('./' + config.env)
  envConfig = envConfig || {}
} catch (e) {
  envConfig = {}
}

export default merge({}, config, envConfig)
