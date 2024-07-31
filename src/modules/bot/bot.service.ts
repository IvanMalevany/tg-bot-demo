import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import {
  CONFIG_DOMAIN,
  CONFIG_MIDDLEWARE_DOMAIN,
  CONFIG_SERVER_PORT,
  CONFIG_TELEGRAM_BOT_ADMIN,
  CONFIG_TELEGRAM_BOT_TOKEN,
} from 'constants/tokens';

@Injectable()
export class BotService implements OnModuleInit {
  private bot: Telegraf;
  private botAdminId;
  private targetServerPort;
  private targetDomain;
  private middlewareDomain;

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    this.targetServerPort = this.configService.get(CONFIG_SERVER_PORT);
    this.targetDomain = this.configService.get(CONFIG_DOMAIN);
    this.middlewareDomain = this.configService.get(CONFIG_MIDDLEWARE_DOMAIN);
    this.botAdminId = +this.configService.get(CONFIG_TELEGRAM_BOT_ADMIN);
    this.bot = new Telegraf(this.configService.get(CONFIG_TELEGRAM_BOT_TOKEN));
  }

  async adminHelloHandler(ctx) {
    const [user_telegram_id_unsecure, ...message_to_send_unprocessed] =
      ctx.payload.split(' ');
    const user_telegram_id = parseInt(user_telegram_id_unsecure, 10);
    const message_to_send = message_to_send_unprocessed.join(' ');

    if (!user_telegram_id) {
      ctx.reply('Format of telegram_id is incorrect.');
      return;
    }
    if (!message_to_send) {
      ctx.reply('Message to send is empty.');
      return;
    }

    const user = await this.usersService.findOneByTelegramId(user_telegram_id);
    if (!user) {
      ctx.reply('User not found.');
      return;
    }

    try {
      await this.bot.telegram.sendMessage(user_telegram_id, message_to_send);
      ctx.reply(`Notification to ${user.name} (${user.tgId}) was sent.`);
    } catch (_) {
      ctx.reply(`There was an error.`);
    }
  }

  async onModuleInit() {
    this.bot.start(async (ctx) => {
      const telegramId = ctx.message.from.id;
      const name = ctx.message.from.first_name;

      const user = await this.usersService.findOrCreate(telegramId, name);

      const redirectTo = `http://${this.targetDomain}:${this.targetServerPort}/hello/${user.id}`;
      const url = `https://${this.middlewareDomain}?r=${encodeURIComponent(redirectTo)}`;

      ctx.reply(`Hello, ${name}!`, {
        reply_markup: {
          inline_keyboard: [[{ text: 'Press this magic button', url }]],
        },
      });
    });

    this.bot.command('adminhello', async (ctx) => {
      if (ctx.from.id === this.botAdminId) {
        await this.adminHelloHandler(ctx);
      } else {
        ctx.reply('Access denied.');
      }
    });

    this.bot.launch();
  }
}
