import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimeStamp } from '../timestamp';
import { Overlay } from './overlay.entity';
import { WidgetTemplate } from './widget.template.entity';

@Entity('client_widget')
export class Widget extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  priority: number;

  @Column()
  style: string;

  @ManyToOne(() => Overlay, (entity) => entity.widgets, { onDelete: 'CASCADE' })
  overlay: Overlay;

  @OneToOne(() => WidgetTemplate, (entity) => entity.widget, { cascade: true })
  template: WidgetTemplate;
}
