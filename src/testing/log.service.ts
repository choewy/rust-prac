import { Injectable } from '@nestjs/common';
import { LogDirs } from './types';
import * as fs from 'fs';

@Injectable()
export class LogService {
  private readonly logDirs: LogDirs = {
    root: process.cwd() + '/logs',
    admin: process.cwd() + '/logs/admin',
    service: process.cwd() + '/logs/service',
  };

  makeLogDirs(): void {
    Object.values(this.logDirs).forEach((dir) => {
      !fs.existsSync(dir) && fs.mkdirSync(dir);
    });
  }

  writeLogfile(
    type: keyof LogDirs,
    name: string,
    time: string,
    error: unknown,
  ): void {
    const path = `${this.logDirs[type]}/${time}-${name}.json`;
    fs.writeFileSync(path, JSON.stringify(error));
  }
}
