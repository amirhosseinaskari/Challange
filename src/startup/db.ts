import mongoose from 'mongoose'
import config from 'config'
import debug from 'debug'

const dbDebugger = debug('app:db')
export let connection: any = null
export const db = () => {
  connection = mongoose.connect(
    config.get('connectionString'),
    {
      user: config.get('db.username'),
      pass: config.get('db.password'),
    },
    error => {
      dbDebugger('MongoDB connection', error)
    }
  )
}
