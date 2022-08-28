import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DonationImageCDN } from './donation.image.cdn.entity';

@Entity('client_donation_image')
export class DonationImage {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  url: string;

  @Column()
  style: string;

  @OneToOne(() => DonationImageCDN, (e) => e.donationImage, { cascade: true })
  @JoinColumn()
  cdn: DonationImageCDN;
}
