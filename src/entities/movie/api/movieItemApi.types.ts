import {responseCreditsSchema, responseMovieByIdSchema} from '@/entities/movie/model/schemas';
import {z} from 'zod';

export type ResponseMovieById = z.infer<typeof responseMovieByIdSchema>;
export type ResponseCredits = z.infer<typeof responseCreditsSchema>;
