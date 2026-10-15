export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type ActionStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface Capture {
  id: string;
  user_id: string;
  raw_text: string;
  file_url: string | null;
  file_name: string | null;
  processed: boolean;
  created_at: string;
}

export interface Action {
  id: string;
  user_id: string;
  capture_id: string | null;
  title: string;
  description: string | null;
  priority: Priority;
  status: ActionStatus;
  due_date: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}
