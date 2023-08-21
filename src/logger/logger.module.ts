import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomLogger } from './logger.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LoggerModule {}
