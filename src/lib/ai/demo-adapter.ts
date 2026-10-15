import type { ExtractionResult } from './types';

export function getDemoExtraction(text: string): ExtractionResult {
  const actions = [];

  // Simple pattern matching for demo
  const lines = text.split('\n').filter(l => l.trim().length > 0);

  for (const line of lines.slice(0, 5)) {
    const trimmed = line.trim().replace(/^[-*•]\s*/, '');
    if (trimmed.length > 3) {
      actions.push({
        title: trimmed.slice(0, 100),
        description: undefined,
        priority: 'medium' as const,
        due_date: null,
        tags: [],
        confidence: 0.7,
        uncertain_fields: ['due_date', 'priority'],
      });
    }
  }

  if (actions.length === 0) {
    actions.push({
      title: text.slice(0, 100),
      description: undefined,
      priority: 'medium' as const,
      due_date: null,
      tags: [],
      confidence: 0.6,
      uncertain_fields: ['due_date', 'priority'],
    });
  }

  return { actions, summary: `Extracted ${actions.length} action(s) from your text.` };
}
