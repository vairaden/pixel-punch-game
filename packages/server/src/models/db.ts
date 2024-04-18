const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env;

import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const IS_DEV = process.env.NODE_ENV === 'development';

const host = IS_DEV ? 'localhost' : POSTGRES_HOST;
const port = POSTGRES_PORT ? +POSTGRES_PORT : 5432;

const sequelizeOptions: SequelizeOptions = {
  host,
  port,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);
