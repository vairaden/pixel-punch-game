import { createApi } from '@reduxjs/toolkit/query/react';
import { ILoginData, IUser } from '../types';
import { axiosBaseQuery } from './baseApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://ya-praktikum.tech/api/v2/auth',
  }),
  endpoints: builder => ({
    createUser: builder.mutation<{ id: string }, Omit<IUser, 'id'>>({
      query: data => ({
        url: '/signup',
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
        url: '/signin',
        withCredentials: true,
        method: 'POST',
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
    }),
    getUserInfo: builder.query<unknown, void>({
      query: () => ({
        url: '/user',
        withCredentials: true,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginByLoginMutation,
  useLazyGetUserInfoQuery,
} = authApi;
