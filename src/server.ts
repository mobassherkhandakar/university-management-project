import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`🛢   Database is connected successfully`)
    app.listen(config.port, () => {
      logger.info(`School app listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('Failed to connect mongoose', err)
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main()
