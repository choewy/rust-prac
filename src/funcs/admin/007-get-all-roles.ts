import { RoleRepository } from '@/core';
import { Role } from '@/entities/admin';

export const getAllRoles = async (
  roleRepository: RoleRepository,
): Promise<Role[]> => {
  return await roleRepository.find({
    relations: { managers: true },
  });
};
