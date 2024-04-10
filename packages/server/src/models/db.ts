import dotenv from 'dotenv';
dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  NODE_ENV,
} = process.env;

import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const port = POSTGRES_PORT ? +POSTGRES_PORT : 5432;
const sequelizeOptions: SequelizeOptions = {
  host: NODE_ENV === 'development' ? 'localhost' : POSTGRES_HOST,
  port,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
};

console.log(sequelizeOptions);
export const sequelize = new Sequelize(sequelizeOptions);
