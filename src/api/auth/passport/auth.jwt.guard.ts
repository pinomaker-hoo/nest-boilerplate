// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Passport Imports
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtGuard extends AuthGuard('jwt') {}
