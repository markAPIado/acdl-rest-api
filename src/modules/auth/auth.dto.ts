import { z } from 'zod';
import { loginSchema } from './auth.schema';

export type LoginDto = z.infer<typeof loginSchema>;
