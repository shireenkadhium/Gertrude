export type Configuration = {
  server: {
    port: number;
    origins: string;
    methods: string;
  };
  db: {
    postgres: {
      name: string;
      host: string;
      port: number;
      user: string;
      password: string;
      synchronize: boolean;
    };
  };
  jwt: {
    access: {
      secret: string;
      expiresIn: string;
    };
    refresh: {
      secret: string;
      expiresIn: string;
    };
  };
  swagger: {
    user: string;
    password: string;
  };
};
