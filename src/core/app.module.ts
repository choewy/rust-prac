import { Module } from '@nestjs/common';
import { Manager, Role } from '@/entities/admin';
import { LogService } from '@/core/services';
import { adminTestFunctions } from '@/funcs';
import { TestingService } from '@/core/services';
import { DataSource } from 'typeorm';
import { ConfigsRootModule, TypeOrmRootSyncModule } from './modules';
import { AdminRepositories } from './types';

@Module({
  imports: [ConfigsRootModule, TypeOrmRootSyncModule],
  providers: [LogService, TestingService],
})
export class AppModule {
  constructor(
    private readonly dataSource: DataSource,
    private readonly testingService: TestingService,
  ) {
    this.testAdminFunctions();
  }

  async testAdminFunctions() {
    const repositories: AdminRepositories = {
      managerRepository: this.dataSource.manager.getRepository(Manager),
      roleRepository: this.dataSource.manager.getRepository(Role),
    };

    await this.testingService.testing(
      'admin',
      this.dataSource,
      repositories,
      adminTestFunctions,
    );
  }
}
