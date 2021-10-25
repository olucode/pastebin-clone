// eslint-disable-next-line unicorn/import-style
import { join } from 'path';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.enableCors();
  app.use(helmet());
  if (config.env.NODE_ENV === 'development') {
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          ...helmet.contentSecurityPolicy.getDefaultDirectives(),
          'img-src': ["'self'", 'data:', 'https://cdn.jsdelivr.net/'],
          'script-src': [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            'https://cdn.jsdelivr.net/',
          ],
        },
      }),
    );
  }
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'public'));

  if (config.env.SWAGGER_UI) {
    const options = new DocumentBuilder()
      .setTitle('Pastebin API')
      .setDescription('API documentation for the Pastebin API')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http' })
      .build();
    const document = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(config.env.PORT || '9090');
}
bootstrap();
