import { NextFunction, Request, Response } from 'express'
import { startupDebugger } from '~src/startup/debuggers'
import { logger } from '~src/startup/logger'

export class HttpException extends Error {
  status: number
  message: string
  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

export const asyncMiddleware =
  (handler: Function) => (req: Request, res: Response, next: NextFunction) => {
    try {
      handler(req, res)
    } catch (ex) {
      next(ex)
    }
  }

export const error = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500
  const message = err.message || 'Something went wrong'
  res.status(status).send({
    status,
    message,
  })

  logger.error(message)
}
