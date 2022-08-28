import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { NotiEffectSetting } from './noti.effect.setting.entity';
import { NotiTextSetting } from './noti.text.setting.entity';
import { NotiSettingTypes } from './types';

@Entity('client_noti_setting')
export class NotiSetting extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  name: string;

  @Column()
  priority: number;

  @Column()
  type: NotiSettingTypes;

  @Column()
  condition: number;

  @Column()
  soundVolumn: number;

  @OneToOne(() => NotiTextSetting, (e) => e.notiSetting, { cascade: true })
  @JoinColumn()
  textSetting: NotiTextSetting;

  @OneToOne(() => NotiEffectSetting, (e) => e.notiSetting, { cascade: true })
  @JoinColumn()
  effectSetting: NotiEffectSetting;
}
