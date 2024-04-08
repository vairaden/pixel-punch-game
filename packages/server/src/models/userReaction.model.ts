import { Model, DataTypes } from 'sequelize';
import { sequelize } from './db';

class UserReaction extends Model {}

UserReaction.init(
  {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'UserReaction', timestamps: false }
);

export { UserReaction };
