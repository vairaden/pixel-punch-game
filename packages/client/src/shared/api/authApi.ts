import { createApi } from '@reduxjs/toolkit/query/react';
import { ILoginData, IUser } from '../types';
import { axiosBaseQuery } from './baseApi';

const baseAuthUrl = '/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    createUser: builder.mutation<{ id: string }, Omit<IUser, 'id'>>({
      query: data => ({
        url: `${baseAuthUrl}/signup`,
        withCredentials: true,
        method: 'POST',
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
    }),
    loginByLogin: builder.mutation<ILoginData, unknown>({
      query: data => ({
        url: `${baseAuthUrl}/signin`,
        withCredentials: true,
        method: 'POST',
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
    }),
    getUserInfo: builder.query<IUser, void>({
      query: () => ({
        url: `${baseAuthUrl}/user`,
        withCredentials: true,
        method: 'GET',
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: `${baseAuthUrl}/logout`,
        withCredentials: true,
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginByLoginMutation,
  useLazyGetUserInfoQuery,
  useLogoutMutation,
} = authApi;
