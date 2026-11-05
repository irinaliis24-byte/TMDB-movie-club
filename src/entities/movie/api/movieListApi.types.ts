import {
    filterMovieParamsSchema,
    movieDataSchema,
    movieParamsSchema,
    responseMovieSchema
} from '@/entities/movie/model/schemas';
import {z} from 'zod';

export type ResponseMovie = z.infer<typeof responseMovieSchema>;
export type MovieData = z.infer<typeof movieDataSchema>;
export type MovieParams = z.infer<typeof movieParamsSchema>;
export type FilterMovieParams = z.infer<typeof filterMovieParamsSchema>;