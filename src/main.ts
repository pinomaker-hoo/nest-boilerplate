// ** Nest Imports
import { NestFactory } from '@nestjs/core';

// ** Custom Module Imports
import { AppModule } from './app.module';

// ** Swagger Config Imports
import swaggerConfig from './config/swaggerConfig';

// ** Logger Config Imports
import LoggerService from './util/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggerService));
  app.enableCors();
  swaggerConfig(app);
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
