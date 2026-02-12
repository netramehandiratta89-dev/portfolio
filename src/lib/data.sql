-- Supabase SQL for CodeVertex Portfolio
-- You can run this in the Supabase SQL Editor to set up your database.

-- Messages table for the contact form
CREATE TABLE public.messages (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL
);

-- Enable RLS for messages table and define policies
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage messages." ON public.messages FOR ALL USING (true);


-- Projects table
CREATE TABLE public.projects (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  "techStack" TEXT[],
  "githubUrl" TEXT,
  "liveDemoUrl" TEXT,
  "imageUrl" TEXT,
  "imageHint" TEXT
);

-- Enable RLS for projects table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are viewable by everyone." ON public.projects FOR SELECT USING (true);
CREATE POLICY "Admins can manage projects." ON public.projects FOR ALL USING (true);

-- Data for projects
INSERT INTO public.projects (id, title, description, "techStack", "githubUrl", "liveDemoUrl", "imageUrl", "imageHint") VALUES
('project-cyberguardian', 'CyberGuardian', 'CyberGuardian is a cyber-awareness learning website with chatbot guidance, built using the Odoo framework (Python-based), designed to teach users how to stay safe online rather than perform hacking.', ARRAY['Python (Odoo framework core language)','PostgreSQL database (default Odoo DB)','HTML','CSS','JavaScript','QWeb templates (Odoo templating engine)'], NULL, 'https://cyberguardian.odoo.com', 'https://i.ibb.co/BKPHTfgd/Screenshot-2026-02-12-220539.png', 'cyberguardian screenshot'),
('project-careertruth', 'CareerTruth', 'CareerTruth is basically a career reality checker AI — it tells students what will actually happen after a degree, not just what colleges promise.', ARRAY['HTML','CSS','JavaScript','Likely React / Next.js (Vercel default framework)','API-based AI processing (chat-style queries)','JSON data handling','Possible serverless functions (Vercel)','Vercel Hosting (Jamstack architecture)'], 'https://github.com/netramehandiratta89-dev/careertruth', 'https://careertruth-2026.vercel.app/', 'https://i.ibb.co/3yMrw37S/Screenshot-2026-02-12-225004.png', 'careertruth screenshot');


-- Certifications table
CREATE TABLE public.certifications (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT,
  description TEXT
);

-- Enable RLS for certifications table
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Certifications are viewable by everyone." ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Admins can manage certifications." ON public.certifications FOR ALL USING (true);

-- Data for certifications (you can add your own here)
-- Example: INSERT INTO public.certifications (id, title, issuer, date, description) VALUES ('cert-1', 'My Awesome Certificate', 'Certification Body', '2024', 'A brief description of what I learned.');


-- Skill Categories table
CREATE TABLE public.skill_categories (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  icon TEXT
);

-- Enable RLS for skill_categories table
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Skill categories are viewable by everyone." ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage skill categories." ON public.skill_categories FOR ALL USING (true);

-- Data for skill_categories
INSERT INTO public.skill_categories (id, title, icon) VALUES
('skillcat-lang', 'Programming Languages', 'Code'),
('skillcat-front', 'Frontend', 'Globe'),
('skillcat-back', 'Backend', 'Server');


-- Skills table
CREATE TABLE public.skills (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  level INTEGER,
  category_id TEXT REFERENCES public.skill_categories(id) ON DELETE CASCADE
);

-- Enable RLS for skills table
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Skills are viewable by everyone." ON public.skills FOR SELECT USING (true);
CREATE POLICY "Admins can manage skills." ON public.skills FOR ALL USING (true);

-- Data for skills (sample data)
INSERT INTO public.skills (id, name, level, category_id) VALUES
('skill-cpp', 'C++', 90, 'skillcat-lang'),
('skill-python', 'Python', 85, 'skillcat-lang'),
('skill-js', 'JavaScript', 80, 'skillcat-front'),
('skill-react', 'React', 75, 'skillcat-front'),
('skill-node', 'Node.js', 70, 'skillcat-back');
