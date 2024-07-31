import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { CONFIG_LOGS_PATH } from 'constants/tokens';
import { appendFile, existsSync, mkdirSync } from 'node:fs';
import { EOL } from 'node:os';
import { join } from 'node:path';

@Injectable()
export class LoggerService extends ConsoleLogger {
  constructor(
    context: string,
    private configService: ConfigService,
  ) {
    super(context);
  }

  public log(message: any, ...optionalParams: any[]): void {
    this.writeToFile('log', message, ...optionalParams);
    return super.log.apply(this, [message, ...optionalParams]);
  }

  public error(message: any, ...optionalParams: any[]): void {
    this.writeToFile('error', message, ...optionalParams);
    return super.error.apply(this, [message, ...optionalParams]);
  }

  public warn(message: any, ...optionalParams: any[]): void {
    this.writeToFile('warn', message, ...optionalParams);
    return super.warn.apply(this, [message, ...optionalParams]);
  }

  public debug(message: any, ...optionalParams: any[]): void {
    this.writeToFile('debug', message, ...optionalParams);
    return super.debug.apply(this, [message, ...optionalParams]);
  }

  public verbose(message: any, ...optionalParams: any[]): void {
    this.writeToFile('verbose', message, ...optionalParams);
    return super.verbose.apply(this, [message, ...optionalParams]);
  }

  private async writeToFile(
    logLevel: LogLevel,
    message: any,
    ...optionalParams: any[]
  ): Promise<void> {
    const date = new Date().toLocaleDateString('ru');

    const logsPath = this.configService.get<string>(CONFIG_LOGS_PATH) || 'logs';

    if (!existsSync(logsPath)) {
      mkdirSync(logsPath);
    }

    const path = join(logsPath, `${date}.log`);

    const record = `[SERVER]\t${
      process.pid
    }\t- ${date}\t${logLevel.toUpperCase()}\t[${optionalParams}]\t${message};${EOL}`;

    appendFile(path, record, (err) => {
      if (err) {
        console.error(err.message);
        process.exit(1);
      }
    });
  }
}
