import { Module } from '@nestjs/common';
import { UsersModule } from 'modules/users/users.module';
import { BotService } from 'modules/bot/bot.service';
import { ConfigModule } from 'modules/config/config.module';

@Module({
  imports: [UsersModule, ConfigModule],
  providers: [BotService],
})
export class BotModule {}
