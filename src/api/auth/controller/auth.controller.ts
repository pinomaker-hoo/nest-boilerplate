// ** Nest Imports
import { Body, Controller, Post } from '@nestjs/common';

// ** enum, dto, entity Imports
import RequestUserSaveDto from '../dto/user.save.dto';
import RequestUserLoginDto from '../dto/user.login.dto';
import CommonResponse from '../../../common/dto/common.response';

// ** Module Imports
import AuthService from '../service/auth.service';

// ** Swagger Imports
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller({ path: '/auth', version: '1' })
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '유저 회원가입' })
  @ApiBody({ type: RequestUserSaveDto })
  @Post()
  async saveUser(
    @Body() dto: RequestUserSaveDto,
  ): Promise<CommonResponse<any>> {
    return this.authService.saveUser(dto);
  }

  @ApiOperation({ summary: '관리자 회원가입' })
  @ApiBody({ type: RequestUserSaveDto })
  @Post('/admin')
  async saveAdmin(
    @Body() dto: RequestUserSaveDto,
  ): Promise<CommonResponse<any>> {
    return this.authService.saveAdmin(dto);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: RequestUserLoginDto })
  @Post('/local')
  async localLogin(
    @Body() dto: RequestUserLoginDto,
  ): Promise<CommonResponse<any>> {
    return await this.authService.localLogin(dto);
  }
}
