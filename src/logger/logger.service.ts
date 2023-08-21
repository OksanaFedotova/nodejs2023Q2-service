import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { appendFile } from 'fs/promises';
import { stat, unlink } from 'fs/promises';

const levels = ['error', 'warn', 'log', 'debug'];

@Injectable()
export class CustomLogger implements LoggerService {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}
  log(message: string) {
    this.writeToFile('📢 ' + message, 'log');
  }

  error(message: string, trace: string) {
    this.writeErrors('❌ ' + message, 'error');
    this.writeErrors('🔍 Stack Trace: ' + trace, 'error');
  }

  warn(message: string) {
    this.writeErrors('⚠️ ' + message, 'warn');
  }

  debug(message: string) {
    this.writeToFile('🐞 ' + message, 'debug');
  }
  private async writeToFile(message: string, callerName) {
    const max = this.configService.get('MAX_FILE_SIZE');
    const level = this.configService.get('LOG_LEVEL');
    if (levels.indexOf(callerName) <= +level) {
      try {
        process.stdout.write(message);
        await appendFile('logs.log', `${message}\n`);
        const size = (await stat('logs.log')).size;
        if (size > max) {
          await unlink('logs.log');
          await appendFile('logs.log', `${message}\n`);
        }
      } catch (error) {
        throw new InternalServerErrorException("File didn't write");
      }
    }
  }
  private async writeErrors(message: string, callerName) {
    const max = this.configService.get('MAX_FILE_SIZE');
    const level = this.configService.get('LOG_LEVEL');
    if (levels.indexOf(callerName) <= +level) {
      try {
        process.stderr.write(message);
        await appendFile('errors.log', `${message}\n`);
        const size = (await stat('errors.log')).size;
        if (size > max) {
          await unlink('errors.log');
          await appendFile('errors.log', `${message}\n`);
        }
      } catch (error) {
        throw new InternalServerErrorException("File didn't write");
      }
    }
  }
}
