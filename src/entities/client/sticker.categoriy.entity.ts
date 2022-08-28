import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { StickerCategoryCDN } from './sticker.category.cdn.entity';
import { Sticker } from './sticker.entity';
import { StickerCategoryScope, StickerCategoryStatus } from './types';

@Entity('client_sticker_cateogry')
export class StickerCategory extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  name: string;

  @Column()
  sequence: number;

  @Column()
  scope: StickerCategoryScope;

  @Column()
  status: StickerCategoryStatus;

  @OneToOne(() => StickerCategoryCDN, (e) => e.stickerCategory, {
    cascade: true,
  })
  @JoinColumn()
  cdn: StickerCategoryCDN;

  @OneToMany(() => Sticker, (e) => e.category)
  stickers: Sticker[];
}
