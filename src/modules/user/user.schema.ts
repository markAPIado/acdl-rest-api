import { z } from 'zod';
import { USER_VALIDATION } from './user.constants';

export const userSchema = {
  name: z
    .string()
    .max(
      USER_VALIDATION.NAME.MAX_LENGTH.VALUE,
      USER_VALIDATION.NAME.MAX_LENGTH.MESSAGE
    )
    .trim()
    .refine((value) => value !== '', USER_VALIDATION.NAME.REQUIRED.MESSAGE),
  email: z
    .string()
    .email(USER_VALIDATION.EMAIL.INVALID.VALUE)
    .max(
      USER_VALIDATION.EMAIL.MAX_LENGTH.VALUE,
      USER_VALIDATION.EMAIL.MAX_LENGTH.MESSAGE
    )
    .trim()
    .refine((value) => value !== '', USER_VALIDATION.EMAIL.REQUIRED.MESSAGE),
  password: z
    .string()
    .min(
      USER_VALIDATION.PASSWORD.MIN_LENGTH.VALUE,
      USER_VALIDATION.PASSWORD.MIN_LENGTH.MESSAGE
    )
    .max(
      USER_VALIDATION.PASSWORD.MAX_LENGTH.VALUE,
      USER_VALIDATION.PASSWORD.MAX_LENGTH.MESSAGE
    )
    .trim()
    .refine((value) => value !== '', USER_VALIDATION.PASSWORD.REQUIRED.MESSAGE)
};

export const createUserSchema = z.object({
  body: z.object(userSchema).strict()
});
