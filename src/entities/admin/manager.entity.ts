import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { Role } from './role.entity';

@Entity('admin_manager')
export class Manager extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  account: string;

  @Column({ length: 100 })
  password: string;

  @Column()
  name: string;

  @ManyToMany(() => Role, (entity) => entity.managers, {
    cascade: true,
  })
  @JoinTable()
  roles: Role[];
}
