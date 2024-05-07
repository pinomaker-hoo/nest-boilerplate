// ** Nest Imports
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { join } from 'path';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './global/config/swagger/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './global/util/logger/logger.service';

// ** Security Imports
import csurf from 'csurf';
import helmet from 'helmet';

// ** Express Imports
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomExceptionFilter } from './global/filter/CustomExceptionFilter';

// ** Interceptor Imports
import { LoggingInterceptor } from './global/interceptor/LoggingInterceptor';

// ** Typeorm Imports
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  // ** Typeorm Transactional
  initializeTransactionalContext();

  // ** Server Container
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    snapshot: true,
  });

  // ** Base URL
  app.setGlobalPrefix('api');

  // ** Nest Version
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
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
    app.use(helmet());
  }

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
bootstrap()
  .then(() => {
    Logger.log(
      `NEST SERVER START : ${process.env.NODE_ENV}(${process.env.SERVER_PORT})`,
    );
  })
  .catch((error) => {
    Logger.error('NEST SERVER START FAILED');
    Logger.error(error);
  });
