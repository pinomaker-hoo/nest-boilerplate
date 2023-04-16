// ** Typeorm Imports
import { Repository } from 'typeorm';

// ** Custom Module Imports
import User from '../domain/user.entity';
import { CustomRepository } from 'src/common/repository/typeorm-ex.decorator';

@CustomRepository(User)
export default class UserRepository extends Repository<User> {}
