import { createLogger } from 'winston';
import { logger } from '../../logger';
import {
  consoleErrorLoggerTransport,
  uncaughtExceptionTransport,
  unhandledRejectionTransport
} from '../../logger/winston/winston.transports';

export function handleExceptionAndRejectionError() {
  createLogger({
    exceptionHandlers: [
      consoleErrorLoggerTransport,
      uncaughtExceptionTransport
    ],
    rejectionHandlers: [
      consoleErrorLoggerTransport,
      unhandledRejectionTransport
    ],
    exitOnError: false
  });

  process.on('uncaughtException', () => {
    logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    process.exit(1);
  });
}
