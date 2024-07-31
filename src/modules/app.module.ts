import { Module } from '@nestjs/common';
import { UsersModule } from 'modules/users/users.module';
import { LoggerModule } from 'modules/logger/logger.module';
import { DataBaseModule } from 'modules/db/db.module';
import { ConfigModule } from 'modules/config/config.module';
import { FrontModule } from 'modules/front/front.module';
import { BotModule } from 'modules/bot/bot.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule,
    DataBaseModule,
    UsersModule,
    BotModule,
    FrontModule,
  ],
})
export class AppModule {}
