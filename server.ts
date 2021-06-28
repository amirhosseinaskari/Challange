import express, {urlencoded, json, Request, Response} from 'express'
import {ADMIN_PRODUCTS} from 'endpoints/admin'
import productsRouter from 'api/products'
import userRouter from 'api/auth'
import debug from 'debug'
import helmet from 'helmet'
import mongoose from 'mongoose'
import {REGISTER_USER} from 'endpoints/auth'
import config from 'config'

const startupDebugger = debug('app:startup')
const dbDebugger = debug('app:db')
const app = express()

//====Midlewares====
app.use(json())
app.use(urlencoded({extended: true}))
app.use(helmet())
app.use(express.static('public'))

//====Port====
const port = app.get('env.port') || 3000
app.listen(port, () => startupDebugger(`Listening to port ${port}`))

//====Admin Routes====
app.use(ADMIN_PRODUCTS, productsRouter) // path: ./admin/products

app.get('/', (req: Request, res: Response) => {
  res.send('welcome to shopikar!')
})

//====Authentication Routes====
app.use(REGISTER_USER, userRouter) // path: ./register
startupDebugger(config.has('db.username'))
//====DataBase====
mongoose.connect(
  config.get('connectionString'),
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    user: config.get('db.username'),
    pass: config.get('db.password'),
  },
  error => {
    dbDebugger('MongoDB connection', error)
  }
)
