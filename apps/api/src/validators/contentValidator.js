import { z } from 'zod';
export const profileSchema = z.object({ name: z.string().trim().min(2).max(60), headline: z.string().max(240), availability: z.string().max(240), links: z.object({ linkedin: z.string().url(), github: z.string().url() }), projects: z.array(z.object({ title: z.string().max(100), description: z.string().max(500), tag: z.string().max(30) })).max(12) });
