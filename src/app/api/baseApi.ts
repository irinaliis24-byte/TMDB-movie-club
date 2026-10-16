import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const baseApi = createApi({
  reducerPath: "moviesApi",
  tagTypes: ["PopularMovie", "TopRatedMovie", "UpcomingMovie", "NowPlayingMovie", "Configuration"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
          "Authorization",
          `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`
      )

      headers.set("accept", "application/json")

      return headers
    },
  }),
  endpoints: () => ({}),
})
