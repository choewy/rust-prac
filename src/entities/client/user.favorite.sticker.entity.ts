import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('client_user_favorite_sticker')
export class UserFavoriteSticker {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ManyToOne(() => User, (e) => e.favoriteStickers, { onDelete: 'CASCADE' })
  user: User;

  // @ManyToOne(() => Sticker)
}
