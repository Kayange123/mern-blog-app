import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  reducerPath: "mernBlog",
  tagTypes: ["Blogs", "User"],
  endpoints: (build) => ({
    getBlogs: build.query({
      query: () => "api/blogs",
      providesTags: ["Blogs"],
    }),
    getUser: build.query({
      query: (id) => `api/users/profile/${id}`,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetBlogsQuery, useGetUserQuery } = api;
