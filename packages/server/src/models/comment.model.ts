import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from './db';
import { Author } from '../types';

interface CommentAttributes {
  id: number;
  content: string;
  author: Author;
  topic_id: number;
  reply_id: number | null | undefined;
}

type CommentCreationAttributes = Optional<CommentAttributes, 'id'>;

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  declare id: number;
  declare content: string;
  declare author: Author;
  declare topic_id: number;
  declare reply_id: number;
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
      type: DataTypes.JSON,
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
