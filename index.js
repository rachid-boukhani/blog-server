import config from './server/config'
import app from './server'

app.listen(config.port)
console.log(`listening on: ${config.port}`)
