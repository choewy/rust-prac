import { Manager, Role } from '@/entities/admin';
import { Repository } from 'typeorm';

export type ManagerRepository = Repository<Manager>;
export type RoleRepository = Repository<Role>;
