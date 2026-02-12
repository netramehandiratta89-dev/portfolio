-- Creates the 'settings' table for storing general site-wide content.
-- Run this in your Supabase SQL Editor to add the new table.
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
);

-- Populates the new 'settings' table with your existing data.
-- Run this after creating the table to ensure your site content is loaded.
-- The "ON CONFLICT DO NOTHING" clause prevents errors if you run it multiple times.
INSERT INTO settings (key, value) VALUES
('name', 'Netra Mehandiratta'),
('tagline', 'Developer | Problem Solver'),
('about_intro', 'I am a passionate Computer Science student with a strong interest in software development. I thrive on solving complex problems and continuously learning new technologies. My goal is to leverage my skills to build innovative solutions.'),
('contact_email', 'netramehandiratta89@gmail.com'),
('contact_phone', '9540974674'),
('resume_url', '/Netra_Mehandiratta_Resume.pdf')
ON CONFLICT (key) DO NOTHING;
