import express, { Express, json, urlencoded } from 'express'
import helmet from 'helmet'
import { error } from '@middleware/error'

export const middleware = (app: Express) => {
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(helmet())
  app.use(express.static('public'))

  // uncaught promise handler(this middleware should be in the last line)
  app.use(error)
}
