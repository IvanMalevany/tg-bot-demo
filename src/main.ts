import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from 'modules/app.module';
import { ConfigService } from '@nestjs/config';
import { CONFIG_SERVER_PORT } from 'constants/tokens';
import { LoggerService } from 'modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get(CONFIG_SERVER_PORT);

  app.useLogger(app.get(LoggerService));
  app.enableCors();

  await app.listen(PORT, () =>
    Logger.log(`⚡ SERVER has been started on port ${PORT}`, 'SERVER'),
  );
}
bootstrap();
