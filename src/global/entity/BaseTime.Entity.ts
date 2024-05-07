// ** Typeorm Imports
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class BaseTimeEntity extends BaseEntity {
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  modifiedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
