-- Profiles table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  timezone text not null default 'UTC',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Captures table
create table if not exists captures (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  raw_text text not null,
  file_url text,
  file_name text,
  processed boolean not null default false,
  created_at timestamptz not null default now()
);

-- Actions table
create table if not exists actions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  capture_id uuid references captures on delete set null,
  title text not null,
  description text,
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high', 'urgent')),
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed', 'cancelled')),
  due_date date,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS
alter table profiles enable row level security;
alter table captures enable row level security;
alter table actions enable row level security;

-- Profiles policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Captures policies
create policy "Users can view own captures" on captures for select using (auth.uid() = user_id);
create policy "Users can insert own captures" on captures for insert with check (auth.uid() = user_id);
create policy "Users can delete own captures" on captures for delete using (auth.uid() = user_id);

-- Actions policies
create policy "Users can view own actions" on actions for select using (auth.uid() = user_id);
create policy "Users can insert own actions" on actions for insert with check (auth.uid() = user_id);
create policy "Users can update own actions" on actions for update using (auth.uid() = user_id);
create policy "Users can delete own actions" on actions for delete using (auth.uid() = user_id);

-- Indexes
create index if not exists captures_user_id_idx on captures(user_id);
create index if not exists actions_user_id_idx on actions(user_id);
create index if not exists actions_due_date_idx on actions(due_date);
create index if not exists actions_status_idx on actions(status);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
