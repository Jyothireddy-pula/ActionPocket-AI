import type { Action, Capture } from '@/types';

export function isDemoMode(): boolean {
  return (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_url'
  );
}

export const DEMO_ACTIONS: Action[] = [
  {
    id: 'demo-1',
    user_id: 'demo-user',
    capture_id: null,
    title: 'Review Q4 project proposal',
    description: 'Go through the proposal document and provide feedback',
    priority: 'high',
    status: 'pending',
    due_date: new Date().toISOString().split('T')[0],
    tags: ['work', 'review'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    user_id: 'demo-user',
    capture_id: null,
    title: 'Schedule team sync meeting',
    description: null,
    priority: 'medium',
    status: 'pending',
    due_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    tags: ['meetings'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    user_id: 'demo-user',
    capture_id: null,
    title: 'Update project documentation',
    description: 'Add API endpoints and configuration examples',
    priority: 'low',
    status: 'completed',
    due_date: null,
    tags: ['docs'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const DEMO_CAPTURES: Capture[] = [
  {
    id: 'demo-capture-1',
    user_id: 'demo-user',
    raw_text: 'Call John about the budget review, prepare slides for Monday presentation',
    file_url: null,
    file_name: null,
    processed: true,
    created_at: new Date().toISOString(),
  },
];
