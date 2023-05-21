// ** Nest Imports
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './config/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './util/logger/logger.service';

// ** Express Imports
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use('/file', express.static('./uploads'));
  swaggerConfig(app);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
