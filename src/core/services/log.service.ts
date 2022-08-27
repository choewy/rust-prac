import { Injectable } from '@nestjs/common';
import { LogDirs, TestTypes } from './types';
import * as fs from 'fs';

@Injectable()
export class LogService {
  private readonly rootDir: string = process.cwd() + '/logs';
  private readonly logDirs: LogDirs = {
    admin: {
      top: this.rootDir + '/admin',
      success: this.rootDir + '/admin/success',
      error: this.rootDir + '/admin/error',
    },
    client: {
      top: this.rootDir + '/client',
      success: this.rootDir + '/client/success',
      error: this.rootDir + '/client/error',
    },
  };

  async initialize(type: TestTypes) {
    const dirs = this.logDirs[type];
    !fs.existsSync(this.rootDir) && fs.mkdirSync(this.rootDir);
    fs.existsSync(dirs.top) && fs.rmSync(dirs.top, { recursive: true });
    Object.values(dirs).forEach((dir) => {
      fs.mkdirSync(dir);
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
      const path = `${this.logDirs[type].success}/${time} - (${row})${name}.json`;
      fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }
  }

  async writeErrorLog(
    type: TestTypes,
    row: number,
    name: string,
    time: string,
    error: unknown,
  ): Promise<void> {
    const path = `${this.logDirs[type].error}/${time} - (${row})${name}.json`;
    fs.writeFileSync(path, JSON.stringify(error, null, 2));
  }
}
