import { DecimalTransformer } from '@/core/transformers';
import Decimal from 'decimal.js';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Donation } from './donation.entity';

@Entity('client_donation_message')
export class DonationMessage {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  message: string;

  @Column()
  color: string;

  @Column()
  style: string;

  /** @todo TTSEntity */
  @Column()
  ttsPath: string;

  @Column()
  ttsMimetype: string;

  @Column()
  ttsSize: number;

  @Column({
    type: 'decimal',
    transformer: new DecimalTransformer(),
  })
  ttsDuration: Decimal;

  @ManyToOne(() => Donation, (e) => e.messages)
  donation: Donation;
}
