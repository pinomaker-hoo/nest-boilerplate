// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from 'src/common/entity/BaseTime.Entity';
import { UserRole } from '../dto/user.role';

@Entity({ name: 'tbl_user' })
@Unique(['email'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 120 })
  password: string;

  @Column({ type: 'enum' })
  role: UserRole;
}
