import config from 'config'
import winston from 'winston'
import transports from 'winston-mongodb'

export enum ERROR_LEVEL {
  error,
  warn,
  info,
  http,
  verbose,
  debug,
  silly,
}

const errorFile = new winston.transports.File({
  filename: 'error.log',
  level: 'error',
})
const infoFile = new winston.transports.File({ filename: 'combined.log' })

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `errorFile
    // - Write all logs with level `info` and below to `infoFile`
    //
    errorFile,
    infoFile,
  ],
})

export const configLogger = () => {
  // save logs in db
  logger.add(
    new transports.MongoDB({
      db: config.get('connectionString'),
    })
  )

  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  if (process.env.NODE_ENV !== 'production') {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    )
  }
}

export const clearErrorLogs = () => {
  logger.remove(errorFile)
}

export const clearInfoLogs = () => {
  logger.remove(infoFile)
}
