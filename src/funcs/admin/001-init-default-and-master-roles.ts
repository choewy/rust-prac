import { RoleRepository } from '@/core';
import { setEntityData } from '@/core/helpers';
import { Role } from '@/entities/admin';

export const initDefaultAndMasterRoles = async (
  roleRepository: RoleRepository,
): Promise<Role[]> => {
  return await roleRepository.save([
    setEntityData(new Role(), {
      name: '역할없음',
      isDefault: true,
    }),
    setEntityData(new Role(), {
      name: '마스터',
      isMaster: true,
      enableCheckLiveStream: true,
      enableManagingSticker: true,
      enableManagingTTS: true,
      enableManagingSound: true,
      enableNoticeGNB: true,
      enableNoticeBanner: true,
      enableReadUserList: true,
      enableReadChargingHistory: true,
      enableReadDonationHistory: true,
      enableManagingCash: true,
      enableManagingSettlement: true,
    }),
  ]);
};
