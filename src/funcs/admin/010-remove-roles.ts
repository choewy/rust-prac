import { ManagerRepository, RoleRepository } from '@/core';
import { Manager, Role } from '@/entities/admin';
import { In } from 'typeorm';

export const removeRoles = async (
  roleRepository: RoleRepository,
  managerRepository: ManagerRepository,
): Promise<{ removeRole: Role; managers: Manager[] }> => {
  const removeRole = await roleRepository.findOne({
    relations: { managers: true },
    where: { name: 'createRoleWithManagers' },
  });

  await roleRepository.softRemove(removeRole);

  const defaultRole = await roleRepository.findOne({
    where: { isDefault: true },
  });

  let managers = await managerRepository.find({
    relations: { roles: true },
    where: { id: In(removeRole.managers.map((manager) => manager.id)) },
  });

  managers.forEach((manager) => {
    if (!manager.roles.length) {
      manager.roles = [...manager.roles, defaultRole];
    }
  });

  managers = await managerRepository.save(managers);

  return { removeRole, managers };
};
