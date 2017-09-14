import express from 'express'
import config from './server/config'

const app = express()

app.use((req, res) => res.send('API response'))
app.listen(config.port)
console.log(`listening on: ${config.port}`)
