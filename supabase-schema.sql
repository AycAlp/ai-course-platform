-- ── AI LITERACY 101 · FRESH SCHEMA ──────────────────────────────────────────

-- ── USERS ─────────────────────────────────────────────────────────────────────
create table public.users (
  id          bigserial   primary key,
  name        text        not null,
  email       text        not null unique,
  password    text        not null default 'changeme',
  role        text        not null default 'learner' check (role in ('admin','instructor','learner')),
  cohort      text        not null default '2026-Fall',
  progress    integer     not null default 0,
  created_at  timestamptz not null default now()
);

insert into public.users (name, email, password, role, cohort)
values ('Admin', 'admin@bilkent.edu.tr', 'admin123', 'admin', 'all');

-- ── MODULES ───────────────────────────────────────────────────────────────────
create table public.modules (
  id                bigserial   primary key,
  week              integer     not null,
  phase             text,
  title             text        not null,
  subtitle          text,
  duration          text,
  thumbnail         text,
  color             text,
  status            text        not null default 'locked',
  outcomes          jsonb       not null default '[]',
  skills            jsonb       not null default '[]',
  sections          jsonb       not null default '[]',
  materials         jsonb       not null default '[]',
  module_body       text        not null default '',
  reflection_prompt text        not null default '',
  overview_text     text        not null default '',
  assessment        jsonb,
  rubric            jsonb,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- ── SUBMISSIONS ───────────────────────────────────────────────────────────────
create table public.submissions (
  id               bigserial   primary key,
  student_id       bigint      references public.users(id) on delete set null,
  student_name     text,
  student_initials text,
  module_id        bigint      references public.modules(id) on delete set null,
  module_name      text,
  module_week      integer,
  mat_index        integer,
  mat_title        text,
  task_type        text,
  task_title       text,
  graded           boolean     not null default true,
  max_score        integer     not null default 100,
  rubric           jsonb       not null default '[]',
  answer           text,
  word_count       integer,
  status           text        not null default 'pending',
  grade            numeric,
  feedback         text,
  submitted_at     timestamptz not null default now(),
  graded_at        timestamptz
);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────────────────────
alter table public.users       enable row level security;
alter table public.modules      enable row level security;
alter table public.submissions  enable row level security;

create policy "Allow all" on public.users       for all using (true) with check (true);
create policy "Allow all" on public.modules      for all using (true) with check (true);
create policy "Allow all" on public.submissions  for all using (true) with check (true);

-- ── REALTIME ──────────────────────────────────────────────────────────────────
do $$ begin
  begin alter publication supabase_realtime add table public.submissions; exception when others then null; end;
  begin alter publication supabase_realtime add table public.modules;     exception when others then null; end;
  begin alter publication supabase_realtime add table public.users;       exception when others then null; end;
end $$;
