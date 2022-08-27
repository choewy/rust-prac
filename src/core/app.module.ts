import { Manager, Role } from '@/entities/admin';
import { LogService } from '@/testing';
import { AdminTestFunctions } from '@/testing/targets';
import { TestingService } from '@/testing/testing.service';
import { Logger, Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigsRootModule, TypeOrmRootSyncModule } from './modules';
import { AdminRepositories } from './types';

@Module({
  imports: [ConfigsRootModule, TypeOrmRootSyncModule],
  providers: [LogService, TestingService],
})
export class AppModule {
  private readonly logger = new Logger();

  constructor(
    private readonly dataSource: DataSource,
    private readonly logService: LogService,
    private readonly testingService: TestingService,
  ) {
    this.testAdminFunctions();
  }

  async testAdminFunctions() {
    this.logService.makeLogDirs();

    const repositories: AdminRepositories = {
      managerRepository: this.dataSource.manager.getRepository(Manager),
      roleRepository: this.dataSource.manager.getRepository(Role),
    };

    const errorCount = await this.testingService.testing(
      'admin',
      this.dataSource,
      repositories,
      AdminTestFunctions,
    );

    this.logger.verbose(`[testAdminFunctions] ${errorCount}`);
  }
}
