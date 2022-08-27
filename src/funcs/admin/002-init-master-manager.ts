import { ManagerRepository, RoleRepository } from '@/core';
import { setEntityData } from '@/core/helpers';
import { Manager } from '@/entities/admin';

export const initMasterManager = async (
  roleRepository: RoleRepository,
  managerRepository: ManagerRepository,
): Promise<Manager> => {
  const role = await roleRepository.findOne({ where: { isMaster: true } });
  return await managerRepository.save(
    setEntityData(new Manager(), {
      name: 'matser',
      account: 'master',
      password: 'password',
      roles: [role],
    }),
  );
};
