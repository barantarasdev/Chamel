import { z } from 'zod';

export const createMessageSchema = z.object({
  text: z.string().min(1, 'Message must be at least 1 characters long'),
});

export const updateMessageSchema = z.object({
  text: z.string().min(1, 'Message must be at least 1 characters long'),
});
