// ** Nest Imports
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './config/swagger/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './util/logger/logger.service';

// ** Security Imports
import csurf from 'csurf';
import helmet from 'helmet';

// ** Express Imports
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomExceptionFilter } from './filter/CustomExceptionFilter';

// ** Interceptor Imports
import { LoggingInterceptor } from './interceptor/LoggingInterceptor';

async function bootstrap() {
  // ** Server Container
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    snapshot: true,
  });

  // ** Logger
  app.useLogger(app.get(LoggerService));

  // ** Interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // ** Filter
  app.useGlobalFilters(new CustomExceptionFilter());

  // ** Pipeline
  app.useGlobalPipes(new ValidationPipe());

  // ** Security
  app.enableCors();
  if (process.env.NODE_ENV === 'production') {
    app.use(csurf());
  }
  app.use(helmet());

  // ** Static Handler
  app.use('/file', express.static('./uploads'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.setViewEngine('hbs');

  // ** Swagger Setting
  if (process.env.NODE_ENV === 'development') {
    swaggerConfig(app);
  }

  // ** Server Handler
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
