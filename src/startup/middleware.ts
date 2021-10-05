import express, { Express, json, urlencoded } from 'express'
import helmet from 'helmet'

export const middleware = (app: Express) => {
  app.use(json())
  app.use(urlencoded({ extended: true }))
  app.use(helmet())
  app.use(express.static('public'))
}
