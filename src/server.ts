import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

let server: Server;

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info(`🛢   Database is connected successfully`);
    server = app.listen(config.port, () => {
      logger.info(`School app listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error('Failed to connect mongoose', error);
  }
  process.on('unhandledRejection', error => {
    console.log('unhandle Rejection hogaya');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();
process.on('SIGTERM', () => {
  console.log('object');
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
