import { z } from 'zod';
export const formSchema = z.object({ title: z.string().trim().min(2).max(120), slug: z.string().regex(/^[a-z0-9-]+$/), description: z.string().max(500).optional(), googleFormUrl: z.string().url().optional(), fields: z.array(z.object({ label: z.string().max(100), name: z.string().regex(/^[a-zA-Z0-9_]+$/), entryId: z.string().optional(), required: z.boolean().default(false) })).min(1).max(30), active: z.boolean().optional() });
export const submissionSchema = z.record(z.string().max(64), z.string().max(5000));
