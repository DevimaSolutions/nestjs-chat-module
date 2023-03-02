import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

export class AuditEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
