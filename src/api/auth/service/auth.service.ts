// ** Nest Imports
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// ** enum, dto, entity, types Imports
import ApiResponse from 'src/common/dto/api.response';
import RequestUserSaveDto from '../dto/user.save.dto';
import RequestUserLoginDto from '../dto/user.login.dto';
import { JwtPayload } from 'src/common/types';
import { UserRole } from '../dto/user.role';

// ** Custom Module Imports
import UserRepository from '../repository/user.repository';

// Other Imports
import * as bcrypt from 'bcryptjs';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async saveUser(dto: RequestUserSaveDto): Promise<ApiResponse<any>> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (findUser) {
        return ApiResponse.of({
          data: false,
          message: 'Already exist email',
          statusCode: 400,
        });
      }
      const hash = await bcrypt.hash(dto.password, 10);
      const saveUser = this.userRepository.create({
        email: dto.email,
        password: hash,
        role: UserRole.USER,
      });
      return ApiResponse.of({
        data: await this.userRepository.save(saveUser),
        message: 'Success Save User',
        statusCode: 200,
      });
    } catch (err) {
      console.log('ERROR : ', err);
      return ApiResponse.of({
        data: false,
        message: 'SERVER WRONG',
        statusCode: 500,
      });
    }
  }

  async saveAdmin(dto: RequestUserSaveDto): Promise<ApiResponse<any>> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (findUser) {
        return ApiResponse.of({
          data: false,
          message: 'Already exist email',
          statusCode: 400,
        });
      }
      const hash = await bcrypt.hash(dto.password, 10);
      const saveUser = this.userRepository.create({
        email: dto.email,
        password: hash,
        role: UserRole.ADMIN,
      });
      return ApiResponse.of({
        data: await this.userRepository.save(saveUser),
        message: 'Success Save User',
        statusCode: 200,
      });
    } catch (err) {
      console.log('ERROR : ', err);
      return ApiResponse.of({
        data: false,
        message: 'SERVER WRONG',
        statusCode: 500,
      });
    }
  }

  async localLogin(dto: RequestUserLoginDto): Promise<ApiResponse<any>> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (!findUser) {
        return ApiResponse.of({
          data: false,
          message: 'Not Found Email',
          statusCode: 400,
        });
      }
      const result = await bcrypt.compare(dto.password, findUser.password);
      if (!result) {
        return ApiResponse.of({
          data: false,
          message: 'Not Found Password',
          statusCode: 400,
        });
      }
      const token = this.jwtService.sign({ id: findUser.id });
      return ApiResponse.of({
        data: { user: findUser, token },
        message: 'Login Success',
        statusCode: 200,
      });
    } catch (err) {
      console.log(err);
      return ApiResponse.of({
        data: false,
        message: 'SERVER WRONG',
        statusCode: 500,
      });
    }
  }

  async findUserByJwt(payload: JwtPayload): Promise<any> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { id: payload.id },
      });
      if (!findUser) {
        return ApiResponse.of({
          data: false,
          message: 'Not Found User(Token)',
          statusCode: 400,
        });
      }
      return findUser;
    } catch (err) {
      console.log(err);
      return ApiResponse.of({
        data: false,
        message: 'SERVER WRONG',
        statusCode: 500,
      });
    }
  }
}
