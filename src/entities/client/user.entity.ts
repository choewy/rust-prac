import Decimal from 'decimal.js';
import { DateTime } from 'luxon';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeTransformer } from '@/core/transformers';
import { TimeStamp } from '@/entities/timestamp';
import { UserStatus, UserTypes } from './types';
import { UserOAuth } from './user.oauth.entity';
import { UserImage } from './user.image.entity';
import { UserFollow } from './user.follow.entity';
import { Channel } from './channel.entity';
import { UserFavoriteSticker } from './user.favorite.sticker.entity';

@Entity('client_user')
export class User extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  nickname: string;

  @Column({ default: null })
  email: string | null;

  @Column()
  type: UserTypes;

  @Column()
  status: UserStatus;

  @Column({ default: 0 })
  cash: number;

  @Column({
    type: 'decimal',
    default: new Decimal(0),
  })
  fee: Decimal;

  @Column({
    type: 'datetime',
    transformer: new DateTimeTransformer(),
    default: null,
  })
  blockedAt: DateTime;

  @Column({
    type: 'datetime',
    transformer: new DateTimeTransformer(),
    default: null,
  })
  withdrewAt: DateTime;

  @OneToOne(() => UserImage, (e) => e.user, { cascade: true })
  @JoinColumn()
  image: UserImage;

  @OneToMany(() => UserOAuth, (e) => e.user, { cascade: true })
  @JoinColumn()
  oauths: UserOAuth[];

  @OneToOne(() => Channel, (e) => e.user, { cascade: true })
  @JoinColumn()
  channel: Channel;

  @OneToMany(() => UserFollow, (e) => e.user, { cascade: true })
  @JoinColumn()
  followings: UserFollow[];

  @OneToMany(() => UserFollow, (e) => e.followedUser, { cascade: true })
  @JoinColumn()
  followers: UserFollow[];

  @OneToMany(() => UserFavoriteSticker, (e) => e.user, { cascade: true })
  @JoinColumn()
  favoriteStickers: UserFavoriteSticker[];
}
