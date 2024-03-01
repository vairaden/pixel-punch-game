import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IProfile } from '@/shared/types';

const initialState: { user: IProfile | null } = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IProfile>) {
      state.user = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
