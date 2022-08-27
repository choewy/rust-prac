import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LogDirs, TestFunc, TestFuncObject } from './types';
import { getArgumentNames } from '@/core/helpers';
import { LogService } from './log.service';

@Injectable()
export class TestingService {
  private readonly logger = new Logger();

  constructor(private readonly logService: LogService) {}

  async testing(
    type: keyof LogDirs,
    dataSource: DataSource,
    repositories: object,
    testObject: TestFuncObject,
  ): Promise<number> {
    let errorCount = 0;
    const targets = Object.entries(testObject);

    for (const [name, func] of targets) {
      const time = new Date().toLocaleString();

      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const args = getArgumentNames(func).map((arg) => repositories[arg]);
        await func(...args);
        await queryRunner.commitTransaction();
        this.logger.log(`[success] ${time} - ${type}(${name})`);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        this.logService.writeLogfile(type, name, time, error);
        this.logger.error(`[error] ${time} - ${type}(${name})`);
        errorCount += 1;
      } finally {
        await queryRunner.release();
      }
    }

    return errorCount;
  }
}
