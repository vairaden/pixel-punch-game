import { Comment } from './comment.model';
import { Topic } from './topic.model';
import { UserReaction } from './userReaction.model';
import { TopicReaction } from './topicReaction.model';

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

TopicReaction.belongsTo(UserReaction, {
  foreignKey: 'reaction_name',
});

Topic.hasMany(TopicReaction, {
  foreignKey: 'topic_id',
});

export { Comment, Topic, UserReaction, TopicReaction };
export * from './db';
