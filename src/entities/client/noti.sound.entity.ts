import { DecimalTransformer } from '@/core/transformers';
import Decimal from 'decimal.js';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { NotiSoundSetting } from './noti.sound.setting.entity';
import { NotiSoundFile } from './noti.sound.file.entity';
import { NotiSoundCDN } from './noti.sound.cdn.entity';
import { NotiSoundTypes } from './types';
import { NotiSoundCategory } from './noti.sound.category.entity';

@Entity('client_noti_sound')
export class NotiSound extends TimeStamp {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  type: NotiSoundTypes;

  @Column()
  sequence: number;

  @Column()
  alias: string;

  @Column({
    type: 'decimal',
    transformer: new DecimalTransformer(),
  })
  duration: Decimal;

  @OneToOne(() => NotiSoundFile, (e) => e.notiSound, { cascade: true })
  @JoinColumn()
  file: NotiSoundFile;

  @OneToOne(() => NotiSoundCDN, (e) => e.notiSound, { cascade: true })
  @JoinColumn()
  cdn: NotiSoundCDN;

  @ManyToOne(() => NotiSoundCategory, (e) => e.notiSounds, {
    onDelete: 'CASCADE',
  })
  category: NotiSoundCategory;

  @OneToMany(() => NotiSoundSetting, (e) => e.sound, { cascade: true })
  soundSetting: NotiSoundSetting[];
}
