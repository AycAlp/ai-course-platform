-- ── AI LITERACY 101 — SUPABASE SCHEMA ────────────────────────────────────────
-- Run this entire file in Supabase SQL Editor once after creating your project.

-- Users table
create table if not exists public.users (
  id          bigserial primary key,
  name        text not null,
  email       text not null unique,
  password    text not null default 'changeme',
  role        text not null check (role in ('admin','instructor','learner')),
  cohort      text not null default '2026-Fall',
  progress    integer default 0,
  created_at  timestamptz default now()
);

-- Seed the admin account
insert into public.users (name, email, password, role, cohort)
values ('Admin', 'admin@bilkent.edu.tr', 'admin123', 'admin', 'all')
on conflict (email) do nothing;

-- Modules table
create table if not exists public.modules (
  id          bigserial primary key,
  week        integer not null,
  phase       text,
  title       text not null,
  subtitle    text,
  duration    text,
  thumbnail   text,
  color       text,
  status      text default 'locked',
  outcomes    jsonb default '[]',
  skills      jsonb default '[]',
  sections    jsonb default '[]',
  materials   jsonb default '[]',
  module_body text,
  reflection_prompt text,
  overview_text text,
  assessment  jsonb,
  rubric      jsonb,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- Submissions table
create table if not exists public.submissions (
  id              bigserial primary key,
  student_id      bigint references public.users(id) on delete cascade,
  student_name    text,
  student_initials text,
  module_id       bigint references public.modules(id) on delete cascade,
  module_name     text,
  module_week     integer,
  mat_index       integer,
  mat_title       text,
  task_type       text,
  task_title      text,
  graded          boolean default true,
  max_score       integer default 100,
  rubric          jsonb default '[]',
  answer          text,
  word_count      integer,
  status          text default 'pending',
  grade           numeric,
  feedback        text,
  submitted_at    timestamptz default now(),
  graded_at       timestamptz
);

-- Enable Row Level Security but allow all for now (tighten later)
alter table public.users      enable row level security;
alter table public.modules     enable row level security;
alter table public.submissions enable row level security;

create policy "Allow all users" on public.users      for all using (true) with check (true);
create policy "Allow all modules" on public.modules    for all using (true) with check (true);
create policy "Allow all submissions" on public.submissions for all using (true) with check (true);

-- Realtime — enable so instructor sees submissions live
alter publication supabase_realtime add table public.submissions;
alter publication supabase_realtime add table public.modules;
