import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { CONFIG_DB_DIALECT, CONFIG_DB_URL } from 'constants/tokens';

import { LoggerModule } from 'modules/logger/logger.module';
import { LoggerService } from 'modules/logger/logger.service';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [LoggerModule],
      inject: [ConfigService, LoggerService],
      useFactory: async (
        configService: ConfigService,
        loggerService: LoggerService,
      ) => ({
        dialect: configService.get(CONFIG_DB_DIALECT),
        uri: configService.get(CONFIG_DB_URL),
        autoLoadModels: true,
        logging: (sql) => {
          loggerService.log(String(sql), SequelizeModule.name);
        },
        define: {
          timestamps: false,
          createdAt: false,
          updatedAt: false,
        },
      }),
    }),
  ],
  exports: [SequelizeModule],
})
export class DataBaseModule {}
