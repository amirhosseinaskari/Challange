import express, {urlencoded, json, Request, Response} from 'express'
import {ADMIN_PRODUCTS} from './endpoints/admin'
import productsRouter from 'api/products'
import debug from 'debug'
import helmet from 'helmet'
import mongoose from 'mongoose'
import config from 'config'

const startupDebugger = debug('app:startup')
const dbDebugger = debug('app:db')
const app = express()

//----Midlewares----
app.use(json())
app.use(urlencoded({extended: true}))
app.use(helmet())
app.use(express.static('public'))

//----Port----
const port = app.get('env.port') || 3000
app.listen(port, () => startupDebugger(`Listening to port ${port}`))

//----Admin Routes-----
// /admin/products
app.use(ADMIN_PRODUCTS, productsRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('welcome to shopikar!')
})

//----DataBase-----
mongoose.connect(
  config.get('connectionString'),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: config.get('db_username'),
    pass: config.get('db_password'),
  },
  error => {
    dbDebugger('MongoDB connection', error)
  }
)

dbDebugger(config.get('db_username'), config.get('db_password'))
