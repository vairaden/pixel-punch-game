import { IUser } from './auth.interface';

export type IForumTopic = {
  id: number;
  title: string;
  body?: string;
  createAt: string;
  author: Pick<IUser, 'first_name' | 'second_name' | 'avatar'>;
  commentsCount: number;
};

export type IForumTopicComment = {
  id: number;
  text: string;
  createAt: string;
  author: Pick<IUser, 'first_name' | 'second_name' | 'avatar'>;
};
