import http from 'http';
import { logger } from '../../logger';

export function handleServerShutdown(server: http.Server) {
  process.on('unhandledRejection', () => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    logger.error('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      logger.error('💥 Process terminated!');
    });
  });
}
