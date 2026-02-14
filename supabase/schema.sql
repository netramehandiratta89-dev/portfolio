-- Create education table
create table public.education (
  id text not null,
  created_at timestamp with time zone not null default now(),
  institution text null,
  degree text null,
  date_range text null,
  description text null,
  constraint education_pkey primary key (id)
);

-- Disable Row Level Security (RLS) for the education table
-- This allows public read and write access to the table.
-- For production apps, you should enable RLS and define policies.
alter table public.education disable row level security;
