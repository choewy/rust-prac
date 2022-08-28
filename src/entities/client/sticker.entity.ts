import { DecimalTransformer } from '@/core/transformers';
import Decimal from 'decimal.js';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { DonationSticker } from './donation.sticker.entity';
import { StickerCategory } from './sticker.categoriy.entity';
import { StickerCDN } from './sticker.cdn.entity';
import { StickerThumbnail } from './sticker.thumbnail.entity';
import { StickerTypes } from './types';

@Entity('client_sticker')
export class Sticker extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  type: StickerTypes;

  @Column()
  sequence: number;

  @Column()
  price: number;

  @Column({
    type: 'decimal',
    transformer: new DecimalTransformer(),
  })
  duration: Decimal;

  @Column({ default: false })
  isAnimated: boolean;

  @Column({ default: false })
  hasSound: boolean;

  @ManyToOne(() => StickerCategory, (e) => e.stickers)
  @JoinColumn()
  category: StickerCategory;

  @OneToOne(() => StickerCDN, (e) => e.sticker, { cascade: true })
  @JoinColumn()
  cdn: StickerCDN;

  @OneToOne(() => StickerThumbnail, (e) => e.sticker, { cascade: true })
  @JoinColumn()
  thumbnail: StickerThumbnail;

  @OneToMany(() => DonationSticker, (e) => e.sticker, { cascade: true })
  @JoinColumn()
  donationStickers: DonationSticker[];
}
