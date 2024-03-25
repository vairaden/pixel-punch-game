import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseApi';
import {
  ILeaderboardGetReqBody,
  ILeaderboardRes,
  ILeaderboardSetReqBody,
} from '../types';

export const leaderboardApi = createApi({
  reducerPath: 'leaderboardApi',
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    setLeaderboardInfo: builder.mutation<unknown, ILeaderboardSetReqBody>({
      query: data => ({
        url: '/leaderboard',
        withCredentials: true,
        method: 'POST',
        data,
      }),
    }),
    getLeaderboardInfo: builder.mutation<
      ILeaderboardRes[],
      ILeaderboardGetReqBody
    >({
      query: data => ({
        url: '/leaderboard/all',
        withCredentials: true,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useSetLeaderboardInfoMutation, useGetLeaderboardInfoMutation } =
  leaderboardApi;
