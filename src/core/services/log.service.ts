import { Injectable } from '@nestjs/common';
import { LogDirs, TestTypes } from './types';
import * as fs from 'fs';

@Injectable()
export class LogService {
  private logDirs: LogDirs & { root: string } = {
    root: process.cwd() + '/logs',
    admin: process.cwd() + '/logs/admin',
    service: process.cwd() + '/logs/service',
  };

  private readonly successLogDirs: LogDirs = {
    admin: this.logDirs.admin + '/success',
    service: this.logDirs.service + '/success',
  };

  private readonly errorLogDirs: LogDirs = {
    admin: this.logDirs.admin + '/error',
    service: this.logDirs.service + '/error',
  };

  async makeLogDirs(): Promise<void> {
    Object.values(this.logDirs).forEach((dir) => {
      !fs.existsSync(dir) && fs.mkdirSync(dir);
    });

    Object.values(this.successLogDirs).forEach((dir) => {
      !fs.existsSync(dir) && fs.mkdirSync(dir);
    });

    Object.values(this.errorLogDirs).forEach((dir) => {
      !fs.existsSync(dir) && fs.mkdirSync(dir);
    });
  }

  async writeSuccessLog(
    type: TestTypes,
    row: number,
    name: string,
    time: string,
    data: any,
  ): Promise<void> {
    if (data) {
      const path = `${this.successLogDirs[type]}/${time}-(${row})${name}.json`;
      fs.writeFileSync(path, JSON.stringify(data));
    }
  }

  async writeErrorLog(
    type: TestTypes,
    row: number,
    name: string,
    time: string,
    error: unknown,
  ): Promise<void> {
    const path = `${this.errorLogDirs[type]}/${time}-(${row})${name}.json`;
    fs.writeFileSync(path, JSON.stringify(error));
  }
}
