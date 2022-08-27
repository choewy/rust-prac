import { ManagerRepository } from '@/core';
import { Manager } from '@/entities/admin';

export const getAllManagers = async (
  managerRepository: ManagerRepository,
): Promise<Manager[]> => {
  return await managerRepository.find({
    relations: { roles: true },
  });
};
