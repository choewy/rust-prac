import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../timestamp';
import { WidgetTemplateCode } from './types';
import { Widget } from './widget.entity';

@Entity('client_widget_template')
export class WidgetTemplate extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column()
  name: string;

  @Column()
  code: WidgetTemplateCode;

  @OneToOne(() => Widget, (entity) => entity.template)
  widget: Widget;
}
