import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../timestamp';
import { Overlay } from './overlay.entity';

@Entity('client_overlay_setting')
export class OverlaySetting extends TimeStamp {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ comment: '후원 노출 시간' })
  dotaionDuration: number;

  @Column({ comment: '후원 간 간격' })
  donationDelay: number;

  @Column({ default: false })
  isActiveDonation: boolean;

  @Column({ comment: 'SS 노출 시간' })
  superStickerDuration: number;

  @Column({ default: false })
  isActiveSuperSticker: boolean;

  @Column()
  soundStickerVolume: number;

  @Column()
  imageConfirmTime: number;

  @Column({ default: false })
  isActiveImage: boolean;

  @Column({ default: false })
  isActiveImageConfirm: boolean;

  @Column()
  ttsVolume: number;

  @Column({ default: false })
  isActiveTTS: boolean;

  @OneToOne(() => Overlay, (entity) => entity.overlaySetting)
  overlay: Overlay;
}
