import { UserReaction } from '../models';

export function intitReactions() {
  return UserReaction.bulkCreate([
    {
      name: 'Нравится',
      emoji: '👍',
    },
    {
      name: 'Не нравится',
      emoji: '👎',
    },
    {
      name: 'Ого!',
      emoji: '🤯',
    },
    {
      name: 'Интересно',
      emoji: '👀',
    },
    {
      name: 'Отвратительно',
      emoji: '🤮',
    },
  ]);
}
