import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotiSound } from './noti.sound.entity';

@Entity('client_noti_sound_cdn')
export class NotiSoundCDN {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @OneToOne(() => NotiSound, (e) => e.cdn, { onDelete: 'CASCADE' })
  notiSound: NotiSound;
}
