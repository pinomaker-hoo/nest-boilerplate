// ** Typeorm Imports
import { EntityRepository, Repository } from 'typeorm';

// ** Custom Module Imports
import User from '../domain/user.entity';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {}
