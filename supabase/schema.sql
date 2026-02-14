-- Create the 'education' table
CREATE TABLE public.education (
    id text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    institution text NOT NULL,
    degree text NOT NULL,
    date_range text NOT NULL,
    description text,
    CONSTRAINT education_pkey PRIMARY KEY (id)
);

-- Disable Row Level Security (RLS) for the education table
ALTER TABLE public.education DISABLE ROW LEVEL SECURITY;
