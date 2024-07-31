import * as dotenv from 'dotenv';

dotenv.config();

export const sequelizeConfig = {
  dialect: process.env.TARGET_DB_DIALECT,
  host: process.env.TARGET_DB_HOST,
  port: Number(process.env.TARGET_DB_PORT),
  username: process.env.TARGET_DB_USER,
  password: process.env.TARGET_DB_USER_PASSWORD,
  database: process.env.TARGET_DB_NAME,
  autoLoadModels: true,
  synchronize: true,
  define: {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  },
};
