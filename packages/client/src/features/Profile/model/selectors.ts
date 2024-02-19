import { RootState } from '@/shared/store';
import { IProfile } from '@/shared/types';

export const selectProfileAvatar = (state: RootState) => {
  return state.profile.user?.avatar;
};

export const selectProfileInfo = (state: RootState) => {
  return state.profile.user as IProfile;
};
