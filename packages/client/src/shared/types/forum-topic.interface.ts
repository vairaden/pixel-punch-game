import { IUser } from './auth.interface';

export type IForumTopicAuthor = Pick<
  IUser,
  'first_name' | 'second_name' | 'avatar'
>;

export type IForumTopic = {
  id: number;
  title: string;
  body?: string;
  createAt: string;
  author: IForumTopicAuthor;
  commentsCount: number;
};

export type IForumTopicComment = {
  id: number;
  text: string;
  createAt: string;
  author: IForumTopicAuthor;
};
