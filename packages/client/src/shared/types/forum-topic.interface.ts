import { IUser } from './auth.interface';

export type IForumTopicAuthor = Pick<
  IUser,
  'first_name' | 'second_name' | 'avatar'
>;

export type IForumTopic = {
  id: number;
  title: string;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  author: IForumTopicAuthor;
};

export type IForumTopicComment = {
  id: number;
  content: string;
  createdAt: string;
  author: IForumTopicAuthor;
  replies: IForumTopicComment[];
};

export type ForumTopicEditForm = Pick<IForumTopic, 'title' | 'content'>;

export type ForumTopicEditorProps = { id?: IForumTopic['id'] };
