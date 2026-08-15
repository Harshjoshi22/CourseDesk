import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AI_API = "http://localhost:8080/api/v1/ai";

export const aiApi = createApi({
  reducerPath: "aiApi",

  baseQuery: fetchBaseQuery({
    baseUrl: AI_API,
    credentials: "include",
  }),

  endpoints: (builder) => ({
    generateCourse: builder.mutation({
      query: (data) => ({
        url: "/generate-course",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGenerateCourseMutation,
} = aiApi;