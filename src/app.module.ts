// ** Nest Imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// ** Custom Module Imports
import AuthModule from './api/auth/auth.module';
import UploadModule from './api/upload/upload.module';
import ViewModule from './api/view/view.module';
import AdapterModule from './api/adapter/adapter.module';
import LoggerService from './global/util/logger/logger.service';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './global/repository/typeorm-ex.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: ['dist/api/**/*.entity.js'],
      synchronize: true,
      logging: true,
      logger: 'file',
    }),
    TypeOrmExModule,
    AuthModule,
    UploadModule,
    ViewModule,
    AdapterModule,
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
