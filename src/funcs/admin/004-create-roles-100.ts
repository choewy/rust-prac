import { RoleRepository } from '@/core';
import { setEntityData } from '@/core/helpers';
import { Role } from '@/entities/admin';

export const createRoles100 = async (
  roleRepository: RoleRepository,
): Promise<Role[]> => {
  return await roleRepository.save(
    [...Array(100)].map((_, i) => {
      const testName = `${createRoles100.name}(${i + 1})`;
      return setEntityData(new Role(), {
        name: testName,
      });
    }),
  );
};
