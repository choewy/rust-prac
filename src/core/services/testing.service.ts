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

    this.logger.verbose(`[TestingService] database tables initializing...`);
    for (const tableName of tableNames) {
      await dataSource.query(`DELETE FROM ${tableName};`);
      await dataSource.query(`ALTER TABLE ${tableName} AUTO_INCREMENT=1;`);
      this.logger.log(`[${tableName}] complete initialized`);
    }
    this.logger.verbose(`[TestingService] complete initialized`);
  }

  constructor(private readonly logService: LogService) {}

  async testing(
    type: TestTypes,
    dataSource: DataSource,
    repositories: AdminRepositories,
    testObject: TestFuncObject,
  ): Promise<number> {
    await this.logService.initialize(type);
    await this.initializeTables(dataSource);

    let errorCount = 0;
    const typeName = `Test${type.charAt(0).toUpperCase()}${type.slice(1)}`;
    const targets = Object.entries(testObject);

    this.logger.verbose(`[${typeName}] start testing...`);

    for (const i in targets) {
      let data: any;
      let result: string = 'success';

      const row = Number(i);
      const [name, func] = targets[row];

      const queryRunner = dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const args = getArgumentNames(func).map((arg) => repositories[arg]);
        data = await func(...args);
        await queryRunner.commitTransaction();
      } catch (error) {
        result = 'error';
        errorCount += 1;
        data = { ...error, stack: error.stack };
        await queryRunner.rollbackTransaction();
      } finally {
        await queryRunner.release();
      }

      const time = new Date().toLocaleString();
      const message = `${time} - (${row + 1})${type}(${name})`;

      result === 'error'
        ? await this.logService.writeErrorLog(type, row + 1, name, time, data)
        : await this.logService.writeSuccessLog(
            type,
            row + 1,
            name,
            time,
            data,
          );

      this.logger.log(`[${result}] ${message}`);
    }
    const totalCount = targets.length;
    const successCount = totalCount - errorCount;

    this.logger.verbose(
      `[${typeName}] total: ${totalCount} | success: ${successCount} | error: ${errorCount}`,
    );
    return errorCount;
  }
}
