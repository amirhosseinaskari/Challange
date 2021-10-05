import express, { Request, Response } from 'express'
import debug from 'debug'
import { middleware } from '~src/startup/middleware'
import { db } from '~src/startup/db'
import { routes } from '~src/startup/routes'

const startupDebugger = debug('app:startup')
const app = express()

// Middleware
middleware(app)

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Shopikar')
})

routes(app)

// PORT and Server
const port = app.get('env.port') || 3008
export const server = app.listen(port, () =>
  startupDebugger(`Listening to port ${port}`)
)

// DataBase
db()
