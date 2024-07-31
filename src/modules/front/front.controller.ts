import { Controller, Get, Param } from '@nestjs/common';
import { FrontService } from './front.service';
import { UsersService } from 'modules/users/users.service';

@Controller()
export class FrontController {
  constructor(
    private readonly appService: FrontService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  getPing(): string {
    return this.appService.getPing();
  }

  @Get('hello/:userId')
  async getHello(@Param('userId') userId: number): Promise<string> {
    const user = await this.usersService.findOneById(userId);
    if (user) {
      return `Hello, ${user.name}!`;
    }
    return 'User not found';
  }
}
