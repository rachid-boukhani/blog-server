import morgan from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import override from 'method-override'

export default (app) => {
  app.use(morgan('dev'))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(cors())
  app.use(override())
}
