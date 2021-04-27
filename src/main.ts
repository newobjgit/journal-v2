import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { fastifyHelmet } from 'fastify-helmet';
import { setupSwagger } from './api-docs';
import { SharedModule } from './shared/shared.module';
import { ConfigService } from './shared/services/config.service';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors();
  app.setGlobalPrefix('api');

  await app.register(fastifyHelmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    }
  });

  const configService = app.select(SharedModule).get(ConfigService);

  if (['development', 'production'].includes(configService.nodeEnv)) {
    setupSwagger(app);
  }

  const port = configService.getNumber('API_PORT');

  await app.listen(port);

  Logger.log(`Listening on http://localhost:${port}`);
}

bootstrap();
