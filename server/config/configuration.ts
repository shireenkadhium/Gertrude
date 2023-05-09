import { Configuration } from './types';

export default (): Configuration => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  },
  db: {
    postgres: {
      name: process.env.POSTGRES_DB,
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
    },
  },
  swagger: {
    user: process.env.SWAGGER_USER,
    password: process.env.SWAGGER_PASSWORD,
  },
});
