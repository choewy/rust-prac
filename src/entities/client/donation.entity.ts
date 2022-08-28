import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { CashTx } from './cash.tx.entity';
import { DonationMessage } from './donation.message.entity';
import { DonationSticker } from './donation.sticker.entity';
import { User } from './user.entity';
import { WidgetTemplate } from './widget.template.entity';

@Entity('client_donation')
export class Donation extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  price: number;

  @Column({ default: false })
  isOffline: boolean;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => User)
  creator: User;

  @OneToOne(() => WidgetTemplate)
  widgetTemplate: WidgetTemplate;

  @OneToMany(() => DonationSticker, (e) => e.donation, { cascade: true })
  stickers: DonationSticker[];

  @OneToMany(() => DonationMessage, (e) => e.donation, { cascade: true })
  messages: DonationMessage[];

  @OneToOne(() => CashTx)
  @JoinColumn()
  cashTx: CashTx;
}
