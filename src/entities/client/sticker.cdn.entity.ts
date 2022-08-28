import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sticker } from './sticker.entity';

@Entity('client_sticker_cdn')
export class StickerCDN {
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

  @OneToOne(() => Sticker, (e) => e.cdn, { onDelete: 'CASCADE' })
  sticker: Sticker;
}
