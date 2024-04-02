import { Comment } from './comment.model';
import { Topic } from './topic.model';

Topic.hasMany(Comment, {
  foreignKey: 'topic_id',
  onDelete: 'CASCADE',
  onUpdate: 'NO ACTION',
});
Comment.belongsTo(Topic, {
  foreignKey: 'topic_id',
});

Comment.hasMany(Comment, {
  foreignKey: 'reply_id',
  onDelete: 'NO ACTION',
  onUpdate: 'NO ACTION',
});
Comment.belongsTo(Comment, {
  foreignKey: 'reply_id',
});

export { Comment, Topic };
export { sequelize } from './db';
