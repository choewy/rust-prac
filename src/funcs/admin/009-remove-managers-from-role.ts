import { ManagerRepository, RoleRepository } from '@/core';
import { Manager } from '@/entities/admin';
import { In } from 'typeorm';

export const removeManagersFromRole = async (
  roleRepository: RoleRepository,
  managerRepository: ManagerRepository,
): Promise<Manager[]> => {
  const testName = removeManagersFromRole.name;

  const removeRole = await roleRepository.findOne({
    where: { name: 'createRoles100(1)' },
  });

  const defaultRole = await roleRepository.findOne({
    where: { isDefault: true },
  });

  const managers = await managerRepository.find({
    relations: { roles: true },
    where: {
      account: In([
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
    manager.roles = manager.roles.filter((role) => role.id !== removeRole.id);
    if (!manager.roles.length) {
      manager.roles = [defaultRole];
    }
  });

  return await managerRepository.save(managers);
};
