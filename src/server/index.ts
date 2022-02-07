import express, { Request, Response } from 'express'
import debug from 'debug'
import { middleware } from '~src/startup/middleware'
import { db } from '~src/startup/db'
import { routes } from '~src/startup/routes'
import { configLogger } from '~src/startup/logger'

require('dotenv').config()
const startupDebugger = debug('app:startup')

export const app = express()

// logger configuration
configLogger()

// Middleware
middleware(app)

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Challange')
})

routes(app)

// PORT and Server
const port = app.get('env.port') || 3008
export const server =
  process.env.NODE_ENV !== 'test'
    ? app.listen(port, () => startupDebugger(`Listening to port ${port}`))
    : null

// DataBase
db()
