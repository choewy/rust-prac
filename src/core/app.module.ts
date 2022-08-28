import { Module } from '@nestjs/common';
import { Manager, Role } from '@/entities/admin';
import { LogService } from '@/core/services';
import { adminTestFunctions, clientTestFunctions } from '@/funcs';
import { TestingService } from '@/core/services';
import { DataSource } from 'typeorm';
import { ConfigsRootModule, TypeOrmRootSyncModule } from './modules';
import { AdminRepositories, ClientRepositories } from './types';
import { User, UserImage } from '@/entities/client';

@Module({
  imports: [ConfigsRootModule, TypeOrmRootSyncModule],
  providers: [LogService, TestingService],
})
export class AppModule {
  private async testAdminFunctions() {
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

  private async testClientFunctions() {
    const repositories: ClientRepositories = {
      userRepository: this.dataSource.manager.getRepository(User),
      userImageRepository: this.dataSource.manager.getRepository(UserImage),
    };

    await this.testingService.testing(
      'client',
      this.dataSource,
      repositories,
      clientTestFunctions,
    );
  }

  constructor(
    private readonly dataSource: DataSource,
    private readonly testingService: TestingService,
  ) {
    this.test();
  }

  async test() {
    await this.testingService.initialize(this.dataSource);
    await this.testAdminFunctions();
    await this.testClientFunctions();
  }
}
