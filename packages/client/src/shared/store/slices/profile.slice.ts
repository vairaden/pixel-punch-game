import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProfile } from '@/shared/types';

const initialState: IProfile = {
  id: '',
  first_name: '',
  second_name: '',
  email: '',
  login: '',
  phone: '',
  avatar: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<IProfile>) {
      state.id = action.payload.id;
      state.first_name = action.payload.first_name;
      state.second_name = action.payload.second_name;
      state.email = action.payload.email;
      state.login = action.payload.login;
      state.phone = action.payload.phone;
      state.avatar = action.payload.avatar;
    },
  },
});

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
