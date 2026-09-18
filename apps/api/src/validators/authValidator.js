import { z } from 'zod';
export const signupSchema = z.object({ name: z.string().trim().min(2).max(60), email: z.string().email(), password: z.string().min(8).max(128) });
export const loginSchema = signupSchema.pick({ email: true, password: true });
