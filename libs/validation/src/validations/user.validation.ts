import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, 'Username is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const updateUserSchema = z.object({
  name: z.string().min(1, 'Username is required').optional(),
  email: z.string().email('Invalid email address').optional(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .optional(),
});
