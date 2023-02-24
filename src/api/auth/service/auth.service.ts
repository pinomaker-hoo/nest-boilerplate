// ** Nest Imports
import { Injectable } from '@nestjs/common';

// ** Custom Module Imports
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}
}
