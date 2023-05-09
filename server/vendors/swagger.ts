import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';

export function setupSwagger(app) {
  const configService = app.get(ConfigService);

  const user = configService.get('swagger.user');
  const password = configService.get('swagger.password');

  app.use(
    ['/swagger', '/swagger-json'],
    basicAuth({ challenge: true, users: { [user]: password } }),
  );

  const documentOptions = new DocumentBuilder()
    .setTitle('Gertrude')
    .setDescription('Gertrude API Documentation')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', in: 'header' })
    .addApiKey({ type: 'apiKey', name: 'X-API-KEY', in: 'header' }, 'Api-Key')
    .build();

  const document = SwaggerModule.createDocument(app, documentOptions);

  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
    },
  });
}
