import {personSchema, responseCreditsSchema, responseMovieByIdSchema} from '@/entities/movie/model/schemas';
import {z} from 'zod';

export type ResponseMovieById = z.infer<typeof responseMovieByIdSchema>;
export type ResponseCredits = z.infer<typeof responseCreditsSchema>;
export type Person = z.infer<typeof personSchema>;
