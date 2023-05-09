export type Configuration = {
  server: {
    port: number;
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
