import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../timestamp';
import { OAuthPlatforms } from './types';
import { User } from './user.entity';

@Entity('client_user_oauth')
export class UserOAuth extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  platform: OAuthPlatforms;

  @Column()
  platformId: string;

  @Column()
  accessToken: string;

  @Column()
  refreshToken: string;

  @ManyToOne(() => User, (entity) => entity.oauths, { onDelete: 'CASCADE' })
  user: User;
}
