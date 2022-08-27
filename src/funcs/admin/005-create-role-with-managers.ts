import { ManagerRepository, RoleRepository } from '@/core';
import { setEntityData } from '@/core/helpers';
import { Manager, Role } from '@/entities/admin';
import { In } from 'typeorm';

export const createRoleWithManagers = async (
  roleRepository: RoleRepository,
  managerRepository: ManagerRepository,
): Promise<Manager[]> => {
  const testName = createRoleWithManagers.name;
  const { identifiers } = await roleRepository.insert(
    setEntityData(new Role(), {
      name: testName,
    }),
  );

  const role = await roleRepository.findOne({
    where: { id: identifiers[0].id },
  });

  const managers = await managerRepository.find({
    relations: { roles: true },
    where: {
      name: In([
        'createManagers100(1)',
        'createManagers100(2)',
        'createManagers100(3)',
        'createManagers100(4)',
        'createManagers100(5)',
      ]),
    },
  });

  managers.forEach((manager, i) => {
    manager.name = `${testName}(${i + 1})`;
    manager.roles = [...manager.roles, role].filter((role) => !role.isDefault);
  });

  return await managerRepository.save(managers);
};
