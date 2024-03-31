import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './db';

interface TopicAttributes {
  id: number;
  title: string;
  content: string;
  author: string;
}

type TopicCreationAttributes = Optional<TopicAttributes, 'id'>;

class Topic
  extends Model<TopicAttributes, TopicCreationAttributes>
  implements TopicAttributes
{
  public id!: number;
  public title!: string;
  public content!: string;
  public author!: string;
  public topic_id!: number;
  public reply_id!: number;
}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Topic',
  }
);

export { Topic };
