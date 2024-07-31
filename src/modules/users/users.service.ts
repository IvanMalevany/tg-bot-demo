import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: typeof Users,
  ) {}

  async findOrCreate(tgId: number, name: string): Promise<Users> {
    const [user] = await this.userModel.findOrCreate({
      where: { tgId },
      defaults: { name },
    });
    return user;
  }

  async findOneByTelegramId(tgId: number): Promise<Users> {
    return this.userModel.findOne({
      rejectOnEmpty: false,
      where: { tgId },
    });
  }

  async findOneById(id: number): Promise<Users> {
    return this.userModel.findOne({
      rejectOnEmpty: false,
      where: { id },
    });
  }
}
