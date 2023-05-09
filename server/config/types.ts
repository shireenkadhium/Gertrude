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
  swagger: {
    user: string;
    password: string;
  };
};
