import { Manager, Role } from '@/entities/admin';
import { Repository } from 'typeorm';

export type AdminRepositories = {
  managerRepository: Repository<Manager>;
  roleRepository: Repository<Role>;
};
