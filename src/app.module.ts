// ** Nest Imports
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// ** Custom Module Imports
import AuthModule from './module/auth/auth.module';
import UploadModule from './module/upload/upload.module';
import ViewModule from './module/view/view.module';
import AdapterModule from './module/adapter/adapter.module';
import LoggerService from './global/util/logger/logger.service';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from './global/repository/typeorm-ex.module';
import { CoreModule } from './module/core.module';

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
    CoreModule,
  ],
  controllers: [],
  providers: [LoggerService],
})
export class AppModule {}
