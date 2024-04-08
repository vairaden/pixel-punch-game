import { Model, DataTypes } from 'sequelize';
import { sequelize } from './db';

class TopicReaction extends Model {}

TopicReaction.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    topic_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    reaction_name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  },
  { sequelize, modelName: 'TopicReaction' }
);

export { TopicReaction };
