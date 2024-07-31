import { Module } from '@nestjs/common';
import { FrontController } from './front.controller';
import { FrontService } from './front.service';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [FrontController],
  providers: [FrontService],
})
export class FrontModule {}
