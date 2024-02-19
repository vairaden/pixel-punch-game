import { IUser } from './auth.interface';

export type IProfile = Omit<IUser, 'password'>;

export type IProfilePassword = {
  oldPassword: string;
  newPassword: string;
};
