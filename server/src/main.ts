import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { setupSwagger } from '../vendors/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  configureApp(app);
  setupSwagger(app);

  await startServer(app);
}

function configureApp(app) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
}

async function startServer(app) {
  const configService = app.get(ConfigService);
  const port = configService.get('server.port');

  await app.listen(port);
}

bootstrap();
