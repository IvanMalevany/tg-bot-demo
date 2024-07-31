import { Global, Module } from '@nestjs/common';
import { ConfigModule as Config, ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [ConfigService],
  imports: [
    Config.forRoot({
      envFilePath: '.env',
    }),
  ],
  exports: [ConfigModule, ConfigService],
})
export class ConfigModule {}
