// ** Nest Imports
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// ** Typeorm Imports
import { TypeOrmModule } from '@nestjs/typeorm';

// ** Custom Module Imports
import AuthController from './controller/auth.controller';
import JwtStrategy from './passport/auth.jwt.strategy';
import LocalStrategy from './passport/auth.local.strategy';
import UserRepository from './repository/user.repository';
import AuthService from './service/auth.service';
import User from './domain/user.entity';
import { TypeOrmExModule } from 'src/common/repository/typeOrmEx.module';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UserRepository]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRESIN') },
      }),
    }),
  ],
  exports: [TypeOrmExModule, TypeOrmModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export default class AuthModule {}
