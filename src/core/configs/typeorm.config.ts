import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmEnvKeys } from './enums';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default registerAs(
  'typeorm',
  (): TypeOrmModuleOptions => ({
    type: process.env[TypeOrmEnvKeys.Connection] as any,
    host: process.env[TypeOrmEnvKeys.Host],
    port: parseInt(process.env[TypeOrmEnvKeys.Port]),
    username: process.env[TypeOrmEnvKeys.Username],
    password: process.env[TypeOrmEnvKeys.Password],
    database: process.env[TypeOrmEnvKeys.Database],
    synchronize: process.env[TypeOrmEnvKeys.Synchorinize] === 'true',
    logging: process.env[TypeOrmEnvKeys.Logging] === 'true',
    entities: [process.cwd() + process.env[TypeOrmEnvKeys.Entities]],
    migrations: [process.cwd() + process.env[TypeOrmEnvKeys.Migrations]],
    timezone: process.env[TypeOrmEnvKeys.Timezone],
    namingStrategy: new SnakeNamingStrategy(),
    autoLoadEntities: true,
    insecureAuth: false,
  }),
);
