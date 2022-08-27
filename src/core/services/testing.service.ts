import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TestFuncObject, TestTypes } from './types';
import { getArgumentNames } from '@/core/helpers';
import { LogService } from './log.service';
import { AdminRepositories, RowDataPacket } from '../types';

@Injectable()
export class TestingService {
  private readonly logger = new Logger();

  private async initializeTables(dataSource: DataSource) {
    const tableNamePackets: RowDataPacket[] = await dataSource.query(
      'SHOW TABLES;',
    );

    const tableNames = tableNamePackets
      .map((packet) => {
        return Object.values(packet).map((tableName) => tableName)[0];
      })
      .sort((current, next) => next.length - current.length);

    for (const tableName of tableNames) {
      const query = `DELETE FROM ${tableName};`;
      await dataSource.query(query);
    }
  }

  constructor(private readonly logService: LogService) {}

  async testing(
    type: TestTypes,
    dataSource: DataSource,
    repositories: AdminRepositories,
    testObject: TestFuncObject,
  ): Promise<number> {
    await this.logService.makeLogDirs();
    await this.initializeTables(dataSource);

    let errorCount = 0;
    const targets = Object.entries(testObject);

    for (const i in targets) {
      const row = Number(i);
      const [name, func] = targets[row];
      const time = new Date().toLocaleString();
      const message = `${time} - (${row + 1})${type}(${name})`;

      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const args = getArgumentNames(func).map((arg) => repositories[arg]);
        const data = await func(...args);
        await queryRunner.commitTransaction();
        await this.logService.writeSuccessLog(type, row + 1, name, time, data);
        this.logger.log(`[success] ${message}`);
      } catch (error) {
        await queryRunner.rollbackTransaction();
        await this.logService.writeErrorLog(type, row + 1, name, time, {
          ...error,
          stack: error.stack,
        });
        this.logger.error(`[error] ${message}`);
        errorCount += 1;
      } finally {
        await queryRunner.release();
      }
    }

    return errorCount;
  }
}
