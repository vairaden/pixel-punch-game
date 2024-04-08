const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
} = process.env;

import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const port = POSTGRES_PORT ? +POSTGRES_PORT : 5432;
const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

export const sequelize = new Sequelize(sequelizeOptions);
