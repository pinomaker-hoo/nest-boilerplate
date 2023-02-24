// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Module Imports
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
