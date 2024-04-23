import { UserReaction } from '../models';

export function initReactions() {
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
