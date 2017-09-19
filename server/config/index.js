import {merge} from 'lodash'

let config = {
  env: process.env.NODE_ENV || 'development',
  seed: false,
  port: process.env.PORT || 3000
}

// Load config from production.js or development.js ...
let envConfig
try {
  envConfig = require('./' + config.env).default || {}
} catch (e) {
  envConfig = {}
}

const currentConfig = merge(config, envConfig)
export default currentConfig
