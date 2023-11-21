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

// ** Express Imports
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CustomExceptionFilter } from './filter/CustomExceptionFilter';

// ** Interceptor Imports
import { LoggingInterceptor } from './interceptor/LoggingInterceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // ** Logger
  app.useLogger(app.get(LoggerService));

  // ** Interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // ** Filter
  app.useGlobalFilters(new CustomExceptionFilter());
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
