// ** Nest Imports
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

// ** enum, dto, entity Imports
import ApiResponse from 'src/common/dto/api.response';
import RequestPassportJwtDto from '../dto/user.passport.jwt.user.dto';
import RequestPassportDto from '../dto/user.passport.user.dto';
import RequestUserSaveDto from '../dto/user.save.dto';
import JwtGuard from '../passport/auth.jwt.guard';

// ** Guard Imports
import LocalGuard from '../passport/auth.local.guard';

// ** Module Imports

import AuthService from '../service/auth.service';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  async saveUser(@Body() dto: RequestUserSaveDto): Promise<ApiResponse<any>> {
    return this.authService.saveUser(dto);
  }

  @UseGuards(LocalGuard)
  @Post('/local')
  async localLogin(
    @Req() request: RequestPassportDto,
  ): Promise<ApiResponse<any>> {
    return request.user;
  }

  @UseGuards(JwtGuard)
  @Get()
  async tokenTest(@Req() request: RequestPassportJwtDto) {
    return request.user;
  }
}
