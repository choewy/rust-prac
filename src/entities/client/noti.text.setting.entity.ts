import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotiSetting } from './noti.setting.entity';

@Entity('client_noti_text_setting')
export class NotiTextSetting {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  text: string;

  @Column()
  fontFamily: string;

  @Column()
  fontSize: number;

  @Column()
  color: string;

  @Column()
  highlightColor: string;

  @OneToOne(() => NotiSetting, (entity) => entity.textSetting, {
    onDelete: 'CASCADE',
  })
  notiSetting: NotiSetting;
}
