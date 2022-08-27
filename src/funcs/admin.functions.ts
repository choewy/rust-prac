import { setEntityData } from '@/core/helpers';
import { ManagerRepository, RoleRepository } from './types';

export const createManager = async (
  managerRepository: ManagerRepository,
): Promise<void> => {
  const testName = createManager.name;

  await managerRepository.save(
    setEntityData(managerRepository.create(), {
      account: testName,
      name: testName,
      password: testName,
    }),
  );
};

export const createRole = async (
  roleRepository: RoleRepository,
): Promise<void> => {
  const testName = createRole.name;

  await roleRepository.save(
    setEntityData(roleRepository.create(), {
      name: testName,
    }),
  );
};

export const createManagerWithRoles = async (
  roleRepository: RoleRepository,
  managerRepository: ManagerRepository,
): Promise<void> => {
  const testName = createManagerWithRoles.name;

  const manager = await managerRepository.save(
    setEntityData(managerRepository.create(), {
      name: testName,
      account: testName,
      password: testName,
    }),
  );

  await roleRepository.save(
    setEntityData(roleRepository.create(), {
      name: testName,
      managers: [manager],
    }),
  );
};

export const createRoleWithManagers = async (
  roleRepository: RoleRepository,
  managerRepository: ManagerRepository,
): Promise<void> => {
  const testName = createRoleWithManagers.name;

  const manager = await managerRepository.save(
    setEntityData(managerRepository.create(), {
      name: testName,
      account: testName,
      password: testName,
    }),
  );

  await roleRepository.save(
    setEntityData(roleRepository.create(), {
      name: testName,
      managers: [manager],
    }),
  );
};
