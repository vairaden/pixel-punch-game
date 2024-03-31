import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './db';

interface CommentAttributes {
  id: number;
  content: string;
  author: string;
  topic_id: number;
  reply_id: number | null | undefined;
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  public id!: number;
  public content!: string;
  public author!: string;
  public topic_id!: number;
  public reply_id!: number;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reply_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
  }
);

export { Comment };
