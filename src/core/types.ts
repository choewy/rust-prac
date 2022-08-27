import { Manager, Role } from '@/entities/admin';
import { Repository } from 'typeorm';

export type RowDataPacket = {
  [key: string]: string;
};

export type ManagerRepository = Repository<Manager>;
export type RoleRepository = Repository<Role>;

export type AdminRepositories = {
  managerRepository: ManagerRepository;
  roleRepository: RoleRepository;
};
