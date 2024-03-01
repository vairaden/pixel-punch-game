import { RootState } from '@/shared/store';
import { IProfile } from '@/shared/types';

export const selectProfileAvatar = ({ user }: RootState) => {
  return user.user?.avatar;
};

export const selectProfileInfo = ({ user }: RootState) => {
  return user.user as IProfile;
};
