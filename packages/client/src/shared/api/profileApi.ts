import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseApi';
import { IProfile, IProfilePassword } from '../types';
import { userActions } from '../store';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    setProfileInfo: builder.mutation<IProfile, IProfile>({
      query: data => ({
        url: '/user/profile',
        withCredentials: true,
        method: 'PUT',
        data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => dispatch(userActions.setUser(data)))
          .catch(console.error);
      },
    }),
    setProfileAvatar: builder.mutation<IProfile, FormData>({
      query: data => ({
        url: '/user/profile/avatar',
        withCredentials: true,
        method: 'PUT',
        data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled
          .then(({ data }) => dispatch(userActions.setUser(data)))
          .catch(console.error);
      },
    }),
    setProfilePassword: builder.mutation<void, IProfilePassword>({
      query: data => ({
        url: '/user/password',
        withCredentials: true,
        method: 'PUT',
        data,
      }),
    }),
  }),
});

export const {
  useSetProfileInfoMutation,
  useSetProfileAvatarMutation,
  useSetProfilePasswordMutation,
} = profileApi;
