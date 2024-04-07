import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './db';

interface ThemeAttributes {
  id: number;
  user_id: number;
  theme: string;
}

type ThemeCreationAttributes = Optional<ThemeAttributes, 'id'>;

class Theme
  extends Model<ThemeAttributes, ThemeCreationAttributes>
  implements ThemeAttributes
{
  declare id: number;
  declare user_id: number;
  declare theme: string;
}

Theme.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    theme: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Theme',
    indexes: [
      {
        unique: true,
        fields: ['user_id'],
      },
    ],
  }
);

export { Theme };
