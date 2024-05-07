// ** Typeorm Imports
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

// ** enum, dto, entity Imports
import BaseTimeEntity from '../../../global/entity/BaseTime.Entity';
import { UserRole } from '../../../global/enum/user.role';

@Entity({ name: 'TB_USER' })
@Unique(['username'])
export default class User extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    comment: '유저네임',
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: false,
    comment: '비밀번호',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    nullable: false,
    comment: '유저 역할',
  })
  role: UserRole;
}
