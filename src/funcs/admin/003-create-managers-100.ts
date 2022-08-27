import { ManagerRepository, RoleRepository } from '@/core';
import { setEntityData } from '@/core/helpers';
import { Manager } from '@/entities/admin';

export const createManagers100 = async (
  roleRepository: RoleRepository,
  managerRepository: ManagerRepository,
): Promise<Manager[]> => {
  const role = await roleRepository.findOne({
    where: { isDefault: true },
  });

  return await managerRepository.save(
    [...Array(100)].map((_, i) => {
      const testName = `${createManagers100.name}(${i + 1})`;
      return setEntityData(new Manager(), {
        account: testName,
        name: testName,
        password: 'password',
        roles: [role],
      });
    }),
  );
};
