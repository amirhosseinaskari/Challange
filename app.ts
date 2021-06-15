import express, {urlencoded, json} from 'express'
import {ADMIN_PRODUCTS} from './endpoints/admin'
import products from './api/products'
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
app.use(ADMIN_PRODUCTS, products)

app.get('/', (req, res) => {
  res.send('hello')
})

//----DataBase-----
const db = async () => {
  const connect = await mongoose.connect(config.get('connectionString'))
  dbDebugger(connect)
}

db()
