import { Manager, Role } from '@/entities/admin';
import { User, UserImage } from '@/entities/client';
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

export type UserRepository = Repository<User>;
export type UserImageRepository = Repository<UserImage>;
export type ClientRepositories = {
  userRepository: UserRepository;
  userImageRepository: UserImageRepository;
};
