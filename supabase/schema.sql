--
-- Education Table
--
CREATE TABLE public.education (
  id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  institution text NOT NULL,
  degree text NOT NULL,
  date_range text NOT NULL,
  description text NOT NULL,
  CONSTRAINT education_pkey PRIMARY KEY (id)
);

--
-- Enable Row Level Security (RLS) for the education table
--
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

--
-- Policies for the education table
--
-- 1. Allow public read-only access to everyone
CREATE POLICY "Allow public read access" ON public.education FOR SELECT USING (true);

-- 2. Allow admin users to perform all actions
-- This policy assumes you have a way to identify admin users,
-- for example, through a custom claim in their JWT.
-- For this starter, we are using the service_role key which bypasses RLS,
-- but this is a good practice for production apps.
CREATE POLICY "Allow admin full access" ON public.education FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');
