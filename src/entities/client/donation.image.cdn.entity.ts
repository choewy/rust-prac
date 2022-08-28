import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DonationImage } from './donation.image.entity';

@Entity('client_donation_image_cdn')
export class DonationImageCDN {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  path: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @Column()
  width: number;

  @Column()
  height: number;

  @OneToOne(() => DonationImage, (e) => e.cdn, { onDelete: 'CASCADE' })
  donationImage: DonationImage;
}
