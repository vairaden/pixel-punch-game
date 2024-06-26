import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseApi';
import { IForumTopicComment } from '../types';
import { getHostName } from '@/shared/utils';

const BASE_URL = `https://${getHostName()}/api`;

export const commentApi = createApi({
  reducerPath: 'commentApi',
  tagTypes: ['comment'],
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getCommentsById: builder.query<IForumTopicComment[], number>({
      query: id => ({
        url: `/comment/${id}`,
        withCredentials: true,
        method: 'GET',
      }),
      providesTags: () => ['comment'],
    }),
    setCommentById: builder.mutation<
      IForumTopicComment[],
      {
        content: string;
        topic_id: number;
        reply_id: number | null;
      }
    >({
      query: data => ({
        url: `/comment`,
        withCredentials: true,
        method: 'POST',
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
      invalidatesTags: ['comment'],
    }),
    updateCommentById: builder.mutation<void, { id: number; body: void }>({
      query: ({ id, body }) => ({
        url: `/comment/${id}`,
        withCredentials: true,
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['comment'],
    }),
    deleteCommentById: builder.mutation<void, number>({
      query: id => ({
        url: `/comment/${id}`,
        withCredentials: true,
        method: 'DELETE',
      }),
      invalidatesTags: ['comment'],
    }),
  }),
});

export const {
  useGetCommentsByIdQuery,
  useSetCommentByIdMutation,
  useUpdateCommentByIdMutation,
  useDeleteCommentByIdMutation,
} = commentApi;
