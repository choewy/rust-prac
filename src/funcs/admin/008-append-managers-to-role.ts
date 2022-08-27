import { ManagerRepository, RoleRepository } from '@/core';
import { Manager } from '@/entities/admin';
import { In } from 'typeorm';

export const appendManagersToRole = async (
  managerRepository: ManagerRepository,
  roleRepository: RoleRepository,
): Promise<Manager[]> => {
  const testName = appendManagersToRole.name;

  const role = await roleRepository.findOne({
    where: { name: 'createRoles100(1)' },
  });

  let managers = await managerRepository.find({
    relations: { roles: true },
    where: {
      account: In([
        'createManagers100(11)',
        'createManagers100(12)',
        'createManagers100(13)',
        'createManagers100(14)',
        'createManagers100(15)',
        'createManagers100(16)',
        'createManagers100(17)',
        'createManagers100(18)',
        'createManagers100(19)',
        'createManagers100(20)',
      ]),
    },
  });

  managers.forEach((manager) => {
    manager.name = testName;
    manager.roles = [...manager.roles, role].filter((role) => !role.isDefault);
  });

  return await managerRepository.save(managers);
};
