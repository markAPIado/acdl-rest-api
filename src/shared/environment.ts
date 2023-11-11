import 'dotenv/config';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Staging = 'staging',
  Test = 'test'
}

/**
 * Manage the environment variables in this file and add more if needed. The variables are loaded from the .env file in the root of the project.
 * This approach allows developers to manage the environment variables in a single file and not have to worry about setting them in the different environments.
 */

const environment = {
  nodeEnv: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  mongoUrl: `${process.env.MONGO_URI}${process.env.MONGO_DB_NAME}-${process.env.NODE_ENV}`, // Creates a new database for each active environment (test, development, production)
  morganEnabled: !!process.env.MORGAN_ENABLED, // "!!" converts the value to boolean (1 = true, empty = false)
  mongoDbLoggerEnabled: !!process.env.MONGODB_LOGGER_ENABLED, // "!!" converts the value to boolean (1 = true, empty = false)
  corsOrigin: process.env.CORS_ORIGIN,
  saltWorkFactor: process.env.SALT_WORK_FACTOR // value is string, so they need to be converted to numbers
  /**
   * NOTE: Add more environment variables here
   */
};

export default environment;
