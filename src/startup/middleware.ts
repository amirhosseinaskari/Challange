import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from 'express'
import helmet from 'helmet'
import { error } from '@middleware/error'
import { startupDebugger } from './debuggers'
import { logger } from './logger'

export const middleware = (app: Express) => {
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(helmet())
  app.use(express.static('public'))

  // uncaught promise handler(this middleware should be in the last line)
  app.use(function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log('Application - Error:', err.message)
  })
}
