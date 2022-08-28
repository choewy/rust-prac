import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { Donation } from './donation.entity';
import { CashTxTypes } from './types';
import { User } from './user.entity';

@Entity('client_cash_tx')
export class CashTx extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  price: number;

  @Column()
  type: CashTxTypes;

  @Column()
  note: string;

  @ManyToOne(() => User)
  user: User;

  @OneToOne(() => Donation, (e) => e.cashTx)
  donation: Donation;
}
