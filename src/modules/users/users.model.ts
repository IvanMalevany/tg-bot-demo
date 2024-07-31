import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserAttrs, UserCreationAttrs } from './users.interfaces';

@Table({ tableName: 'users' })
export class Users extends Model<UserAttrs, UserCreationAttrs> {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @AllowNull(false)
  @Column(DataType.INTEGER)
  public id: number;

  @Unique
  @AllowNull(false)
  @Column({ type: DataType.BIGINT, field: 'tg_id' })
  public tgId: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  public name: string;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({ type: DataType.DATE, field: 'created_at' })
  public createdAt: Date;
}
