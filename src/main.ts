// ** Nest Imports
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './config/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './util/logger/logger.service';

// ** Express Imports
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AllExceptionsFilter } from './filter/ExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggerService));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use('/file', express.static('./uploads'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');
  swaggerConfig(app);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
