// ** Typeorm Imports
import { BaseEntity, CreateDateColumn } from 'typeorm';

export default abstract class BaseCreatedTimeEntity extends BaseEntity {
  @CreateDateColumn()
  createdDate: Date;
}
