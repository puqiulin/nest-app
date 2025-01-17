//custom config file
import * as process from 'process';

export default () => ({
  environment: process.env.NODE_ENV || 'dev',
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
