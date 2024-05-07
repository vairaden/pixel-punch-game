import { createApi } from '@reduxjs/toolkit/query/react';
import { ILoginData, IOAuthYandexLoginData, IUser } from '@/shared/types';
import { axiosBaseQuery } from './baseApi';
import { getHostName } from '@/shared/utils';

export const oAuthRedirectUri = `https://${getHostName()}/oauth`;
export const yandexRedirectUrl = `https://oauth.yandex.ru/authorize?response_type=code&redirect_uri=${oAuthRedirectUri}`;
const baseAuthUrl = '/auth';
const oAuthUrl = '/oauth/yandex';

const BASE_URL = `https://${getHostName()}/api`;

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
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
    loginByYandex: builder.mutation<{ service_id: string }, void>({
      query: () => ({
        url: `${oAuthUrl}/service-id?redirect_uri=${oAuthRedirectUri}`,
        withCredentials: true,
        method: 'GET',
      }),
    }),
    isLoginYandex: builder.mutation<void, IOAuthYandexLoginData>({
      query: data => ({
        url: oAuthUrl,
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
  useLoginByYandexMutation,
  useIsLoginYandexMutation,
} = authApi;
