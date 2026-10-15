import { z } from 'zod';

export const ExtractedActionSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
  due_date: z.string().nullable().optional(),
  tags: z.array(z.string()).default([]),
  confidence: z.number().min(0).max(1).default(0.8),
  uncertain_fields: z.array(z.string()).default([]),
});

export type ExtractedAction = z.infer<typeof ExtractedActionSchema>;

export const ExtractionResultSchema = z.object({
  actions: z.array(ExtractedActionSchema),
  summary: z.string().optional(),
});

export type ExtractionResult = z.infer<typeof ExtractionResultSchema>;
