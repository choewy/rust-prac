import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotiSetting } from './noti.setting.entity';

@Entity('client_noti_effect_setting')
export class NotiEffectSetting {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ comment: '알림 강조 텍스트 효과' })
  highlightEffect: string;

  @Column({ comment: '알림 등장 효과' })
  appearanceEffect: string;

  @Column({ comment: '알림 퇴장 효과' })
  disappearanceEffect: string;

  @OneToOne(() => NotiSetting, (e) => e.effectSetting, { onDelete: 'CASCADE' })
  notiSetting: NotiSetting;
}
