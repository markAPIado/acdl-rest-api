import { z } from 'zod';
import { createUserSchema } from './user.schema';

export type CreateUserDto = z.infer<typeof createUserSchema>;
