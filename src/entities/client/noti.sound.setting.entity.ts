import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NotiSound } from './noti.sound.entity';

@Entity('client_noti_sound_setting')
export class NotiSoundSetting {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  volumn: number;

  @ManyToOne(() => NotiSound, (e) => e.soundSetting, { onDelete: 'CASCADE' })
  @JoinColumn()
  sound: NotiSound;
}
