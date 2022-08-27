import {
  BeforeInsert,
  BeforeUpdate,
  BeforeSoftRemove,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTime } from 'luxon';
import { DateTimeTransformer } from '@/core/transformers';

export class TimeStamp {
  @CreateDateColumn({
    type: 'datetime',
    transformer: new DateTimeTransformer(),
  })
  createdAt: DateTime;

  @UpdateDateColumn({
    type: 'datetime',
    transformer: new DateTimeTransformer(),
  })
  updatedAt: DateTime;

  @DeleteDateColumn({
    type: 'datetime',
    transformer: new DateTimeTransformer(),
    default: null,
  })
  deletedAt: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = DateTime.local();
  }

  @BeforeSoftRemove()
  protected beforeSoftRemove() {
    this.deletedAt = DateTime.local();
  }
}
