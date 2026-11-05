import { z } from "zod"

export const movieDataSchema = z.object({
    adult: z.boolean(),
    backdrop_path: z.string().nullable(),
    poster_path: z.string().nullable(),
    genre_ids: z.array(z.number().int()),
    id: z.number().int(),
    original_language: z.string(),
    original_title: z.string(),
    overview: z.string(),
    popularity: z.number(),
    release_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.literal("")),
    title: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number().int(),
});

export const responseMovieSchema = z.object({
    page: z.number().int().nonnegative(),
    results: z.array(movieDataSchema),
    total_pages: z.number().int().nonnegative(),
    total_results: z.number().int().nonnegative(),
});

export const movieParamsSchema = z.object({
    page: z.number(),
    query: z.string().optional(),
});

export const filterMovieParamsSchema = z.object({
    with_genres: z.string().optional(),
    "vote_average.gte": z.number().optional(),
    "vote_average.lte": z.number().optional(),
    sort_by: z.string().optional(),
    page: z.number().optional(),
});