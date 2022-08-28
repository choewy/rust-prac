import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../timestamp';
import { User } from './user.entity';

@Entity('client_user_follow')
export class UserFollow extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => User, (entity) => entity.followings)
  user: User;

  @ManyToOne(() => User, (entity) => entity.followers)
  followedUser: User;
}
