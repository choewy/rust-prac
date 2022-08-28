import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../timestamp';
import { Donation } from './donation.entity';
import { Sticker } from './sticker.entity';

@Entity('client_donation_sticker')
export class DonationSticker extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  style: string;

  @Column()
  price: number;

  @ManyToOne(() => Sticker, (e) => e.donationStickers)
  sticker: Sticker;

  @ManyToOne(() => Donation, (e) => e.stickers)
  donation: Donation;
}
