import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotiSound } from './noti.sound.entity';

@Entity('client_noti_sound_file')
export class NotiSoundFile {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  name: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @OneToOne(() => NotiSound, (e) => e.file, { onDelete: 'CASCADE' })
  notiSound: NotiSound;
}
