import { ManagerRepository, RoleRepository } from '@/core';
import { Manager, Role } from '@/entities/admin';
import { In } from 'typeorm';

export const removeManagers = async (
  managerRepository: ManagerRepository,
  roleRepository: RoleRepository,
): Promise<{ removeManagers: Manager[]; defaultRole: Role }> => {
  let removeManagers = await managerRepository.find({
    where: {
      account: In([
        'createManagers100(21)',
        'createManagers100(22)',
        'createManagers100(23)',
        'createManagers100(24)',
        'createManagers100(25)',
      ]),
    },
  });

  removeManagers = await managerRepository.softRemove(removeManagers);

  const defaultRole = await roleRepository.findOne({
    relations: { managers: true },
    where: {
      isDefault: true,
      managers: {
        account: In([
          'createManagers100(21)',
          'createManagers100(22)',
          'createManagers100(23)',
          'createManagers100(24)',
          'createManagers100(25)',
        ]),
      },
    },
  });

  return { removeManagers, defaultRole };
};
