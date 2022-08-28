import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../timestamp';
import { User } from './user.entity';

@Entity('client_user_image')
export class UserImage extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ default: null })
  path: string | null;

  @Column({ default: null })
  mimetype: string | null;

  @Column({ default: null })
  size: number | null;

  @Column({ default: null })
  width: number | null;

  @Column({ default: null })
  height: number | null;

  @OneToOne(() => User, (entity) => entity.image, { onDelete: 'CASCADE' })
  user: User;
}
