import { z } from 'zod';
import { userSchema } from '../user/user.schema';

const authSchema = {
  email: userSchema.email,
  password: userSchema.password
};

export const loginSchema = z.object({
  body: z.object(authSchema).strict()
});
