import mongoose from 'mongoose'
import config from 'config'
import debug from 'debug'

const dbDebugger = debug('app:db')

export const db = () => {
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
}
