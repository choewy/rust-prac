import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { NotiSound } from './noti.sound.entity';

@Entity('client_noti_sound_category')
export class NotiSoundCategory extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  sequence: number;

  @Column()
  name: string;

  @OneToMany(() => NotiSound, (e) => e.category, { cascade: true })
  @JoinColumn()
  notiSounds: NotiSound[];
}
