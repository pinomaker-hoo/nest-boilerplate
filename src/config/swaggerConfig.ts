// ** Nest Imoorts
import { INestApplication } from '@nestjs/common';

// ** Swagger Imports
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('NestJS cms boilerplate')
    .setDescription('Nestjs-cms-boilerplate')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
};

export default swaggerConfig;
