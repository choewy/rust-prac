import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeStamp } from '../timestamp';
import { Manager } from './manager.entity';

@Entity('admin_role')
export class Role extends TimeStamp {
  @PrimaryGeneratedColumn('increment')
  readonly id: string;

  @Column({ comment: '역할 이름' })
  name: string;

  @Column({ comment: '실시간 방송 확인', default: false })
  enableCheckLiveStream: boolean;

  @Column({ comment: '스티커 관리', default: false })
  enableManagingSticker: boolean;

  @Column({ comment: 'TTS 관리', default: false })
  enableManagingTTS: boolean;

  @Column({ comment: '알림음 관리', default: false })
  enableManagingSound: boolean;

  @Column({ comment: 'GNB 알림', default: false })
  enableNoticeGNB: boolean;

  @Column({ comment: '배너 알림', default: false })
  enableNoticeBanner: boolean;

  @Column({ comment: '사용자 목록', default: false })
  enableReadUserList: boolean;

  @Column({ comment: '충전 내역', default: false })
  enableReadChargingHistory: boolean;

  @Column({ comment: '후원 내역', default: false })
  enableReadDonationHistory: boolean;

  @Column({ comment: '캐시 관리', default: false })
  enableManagingCash: boolean;

  @Column({ comment: '정산 관리', default: false })
  enableManagingSettlement: boolean;

  @Column({ comment: '마스터 역할', default: false })
  isMaster: boolean;

  @Column({ comment: '역할 없음', default: false })
  isDefault: boolean;

  @ManyToMany(() => Manager, (entity) => entity.roles, {
    onDelete: 'CASCADE',
  })
  managers: Manager[];
}
