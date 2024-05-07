// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

// ** enum, dto, entity, types Imports

import RequestUserSaveDto from '../dto/user.save.dto';
import RequestUserLoginDto from '../dto/user.login.dto';
import { JwtPayload } from '../../../global/types';
import { UserRole } from '../../../global/enum/user.role';
import { BadRequestException } from '../../../global/exception/customException';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';

// Other Imports
import * as bcrypt from 'bcryptjs';
import CommonResponse from '../../../global/dto/common.response';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async saveUser(dto: RequestUserSaveDto): Promise<CommonResponse<any>> {
    const findUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (findUser) {
      throw new BadRequestException('이미 회원가입한 유저 입니다.');
    }

    const hash = await bcrypt.hash(dto.password, 10);
    await this.userRepository.save(
      this.userRepository.create({
        username: dto.username,
        password: hash,
        role: UserRole.USER,
      }),
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '회원가입 되었습니다.',
    });
  }

  public async saveAdmin(
    dto: RequestUserSaveDto,
  ): Promise<CommonResponse<any>> {
    const findUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (findUser) {
      throw new BadRequestException('이미 회원가입한 유저 입니다.');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    await this.userRepository.save(
      this.userRepository.create({
        username: dto.username,
        password: hash,
        role: UserRole.ADMIN,
      }),
    );

    return CommonResponse.createResponseMessage({
      statusCode: 200,
      message: '관리자 회원가입이 성공했습니다.',
    });
  }

  public async localLogin(
    dto: RequestUserLoginDto,
  ): Promise<CommonResponse<any>> {
    const findUser = await this.userRepository.findOne({
      where: { username: dto.username },
    });

    if (!findUser) {
      throw new BadRequestException('유저를 찾을 수 없습니다.');
    }

    const result = await bcrypt.compare(dto.password, findUser.password);

    if (!result) {
      throw new BadRequestException('비밀번호가 맞지 않습니다.');
    }

    const token = this.generateToken({
      id: findUser.id,
      role: findUser.role,
    });

    return CommonResponse.createResponse({
      data: { user: findUser, token },
      message: '로그인에 성공했습니다.',
      statusCode: 200,
    });
  }

  public async findUserByJwt(payload: JwtPayload): Promise<any> {
    const findUser = await this.userRepository.findOne({
      where: { id: payload.id },
    });
    if (!findUser) {
      throw new BadRequestException('Not Found User By Token');
    }
    return findUser;
  }
  public async findRefreshToken({ id }: JwtPayload) {
    return await this.userRepository.findOne({ where: { id } });
  }

  public generateToken(payload: JwtPayload): {
    accessToken: string;
    refreshToken: string;
  } {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
      }),
    };
  }
}
