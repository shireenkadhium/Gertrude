import { Configuration } from './types';

export default (): Configuration => ({
  server: {
    port: parseInt(process.env.SERVER_PORT, 10) || 3000,
    origins: process.env.SERVER_ORIGINS || 'http://localhost:5173',
    methods: process.env.SERVER_METHODS,
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
  jwt: {
    access: {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    },
    refresh: {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    },
  },
  swagger: {
    user: process.env.SWAGGER_USER,
    password: process.env.SWAGGER_PASSWORD,
  },
});
