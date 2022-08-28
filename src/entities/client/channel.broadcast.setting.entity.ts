import { Channel } from './channel.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client_channel_broadcast_setting')
export class BroadcastSetting {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  donationMinCash: number;

  @Column()
  donationMaxCash: number;

  @Column()
  superStickerMinCash: number;

  @Column()
  superStickerMaxCash: number;

  @Column()
  forbiddenWords: string;

  @OneToOne(() => Channel, (e) => e.broadcastSetting)
  channel: Channel;
}
