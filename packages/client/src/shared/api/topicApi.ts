import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './baseApi';
import { ForumTopicEditForm, IForumTopic } from '../types';
import { getHostName } from '@/shared/utils';

const BASE_URL = `http://${getHostName()}:${__SERVER_PORT__}/api`;

export const topicApi = createApi({
  reducerPath: 'topicApi',
  tagTypes: ['topic'],
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getTopics: builder.query<IForumTopic[], void>({
      query: () => ({
        url: '/topic',
        withCredentials: true,
        method: 'GET',
      }),
      providesTags: () => ['topic'],
    }),
    getTopicById: builder.query<IForumTopic, number>({
      query: id => ({
        url: `/topic/${id}`,
        withCredentials: true,
        method: 'GET',
      }),
    }),
    setTopic: builder.mutation<IForumTopic, ForumTopicEditForm>({
      query: data => ({
        url: '/topic',
        withCredentials: true,
        method: 'POST',
        data,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json');
          return headers;
        },
      }),
      invalidatesTags: ['topic'],
    }),
    updateTopicById: builder.mutation<
      IForumTopic,
      { id: number; body: ForumTopicEditForm }
    >({
      query: ({ id, body }) => ({
        url: `/topic/${id}`,
        withCredentials: true,
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['topic'],
    }),
    deleteTopicById: builder.mutation<void, number>({
      query: id => ({
        url: `/topic/${id}`,
        withCredentials: true,
        method: 'DELETE',
      }),
      invalidatesTags: ['topic'],
    }),
  }),
});

export const {
  useGetTopicsQuery,
  useSetTopicMutation,
  useGetTopicByIdQuery,
  useUpdateTopicByIdMutation,
  useDeleteTopicByIdMutation,
} = topicApi;
