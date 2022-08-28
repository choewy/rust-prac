import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StickerCategory } from './sticker.categoriy.entity';

@Entity('client_sticker_category_cdn')
export class StickerCategoryCDN {
  @PrimaryGeneratedColumn('increment')
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

  @OneToOne(() => StickerCategory, (e) => e.cdn, { onDelete: 'CASCADE' })
  stickerCategory: StickerCategory;
}
