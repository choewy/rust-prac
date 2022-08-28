import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { Channel } from './channel.entity';
import { OverlaySetting } from './overlay.setting.entity';
import { Widget } from './widget.entity';

@Entity('client_overlay')
export class Overlay extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ default: false })
  isDefault: boolean;

  @Column()
  url: string;

  @Column()
  name: string;

  @OneToOne(() => Channel, (e) => e.overlaies, { onDelete: 'CASCADE' })
  channel: Channel;

  @OneToOne(() => OverlaySetting, (e) => e.overlay, { cascade: true })
  @JoinColumn()
  overlaySetting: OverlaySetting;

  @OneToMany(() => Widget, (e) => e.overlay, { cascade: true })
  @JoinColumn()
  widgets: Widget[];
}
