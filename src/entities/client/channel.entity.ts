import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { Overlay } from './overlay.entity';
import { BroadcastPlatforms } from './types';
import { BroadcastSetting } from './channel.broadcast.setting.entity';
import { User } from './user.entity';

@Entity('client_channel')
export class Channel extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  donationUrl: string;

  @Column({ default: null })
  liveUrl: string | null;

  @Column()
  introduction: string;

  @Column({ default: null })
  broadcastPlatform: BroadcastPlatforms | null;

  @OneToOne(() => User, (user) => user.channel)
  user: User;

  @OneToOne(() => BroadcastSetting, (e) => e.channel, { cascade: true })
  @JoinColumn()
  broadcastSetting: BroadcastSetting;

  @OneToMany(() => Overlay, (e) => e.channel, { cascade: true })
  @JoinColumn()
  overlaies: Overlay[];
}
