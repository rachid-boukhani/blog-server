import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import appMiddlware from './middleware/appMiddlware'
import api from './api'
import auth from './auth/router'

const app = express()

mongoose.connect(config.db.url)

if (config.seed) {
  require('./util/seed')
}

// setup the app middlware
appMiddlware(app)

app.use('/api', api)
app.use('/auth', auth)

// app.use((error, req, res) => {
//   res.status(500).send(error.stack)
// })

app.use((req, res) => res.send('API response'))

export default app
