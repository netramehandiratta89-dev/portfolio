import {
  Code,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Smartphone,
  Server,
  Database,
  ShieldCheck,
  Globe,
  GitBranch,
  Settings,
  Cpu,
  BookOpen,
  Award,
} from 'lucide-react';

export const personalInfo = {
  name: "Netra Mehandiratta",
  tagline: "Cybersecurity Enthusiast | Developer | Problem Solver",
  resumeUrl: "/resume.pdf",
};

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'GitHub', url: 'https://github.com', icon: Github },
  { name: 'Instagram', url: 'https://instagram.com', icon: Instagram },
];

export const contactInfo = {
  email: "contact@netramehandiratta.com",
  phone: "+1 123 456 7890",
};

export const about = {
  intro: "I am a passionate Computer Science student with a strong interest in cybersecurity and software development. I thrive on solving complex problems and continuously learning new technologies. My goal is to leverage my skills to build secure and innovative solutions.",
  education: [
    {
      degree: "Bachelors in Computer Applications",
      institution: "Bharati Vidyapeeth's Institute of Management & Research, Delhi",
      period: "2025 - 2028",
      icon: BookOpen,
    },
    {
      degree: "Class 12th (Commerce without Maths with IP)",
      institution: "Modern Public School, Shalimar Bagh",
      period: "Passed out in 2025",
      icon: Award,
    },
  ],
};

export const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    skills: [
      { name: "C", level: 90 },
      { name: "Python", level: 85 },
      { name: "C++", level: 80 },
      { name: "MySQL", level: 75 },
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "React / Next.js", level: 85 },
    ],
  },
  {
    title: "Backend & Tools",
    icon: Server,
    skills: [
      { name: "Firebase", level: 85 },
      { name: "Supabase", level: 80 },
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
    ],
  },
  {
    title: "Cybersecurity",
    icon: ShieldCheck,
    skills: [
      { name: "Networking Basics", level: 70 },
      { name: "Security Awareness", level: 80 },
      { name: "Ethical Hacking Concepts", level: 60 },
      { name: "Cryptography Basics", level: 65 },
    ],
  },
];

export const aboutSkills = [
  { name: "C / C++", icon: Cpu },
  { name: "DSA", icon: GitBranch },
  { name: "Web Development", icon: Globe },
  { name: "Firebase", icon: Server },
  { name: "Supabase", icon: Database },
  { name: "GitHub", icon: Github },
  { name: "Cybersecurity", icon: ShieldCheck },
];


export const projects = [
  {
    id: "project-dsa",
    title: "DSA Programs in C",
    description: "A collection of fundamental Data Structures and Algorithms implemented in C, showcasing problem-solving and foundational programming skills.",
    techStack: ["C", "Data Structures", "Algorithms"],
    githubUrl: "https://github.com",
    liveDemoUrl: null,
  },
  {
    id: "project-ai-career",
    title: "Career Guidance AI Website",
    description: "An AI-powered web application that provides personalized career recommendations based on user skills and interests. Built with Next.js and Firebase.",
    techStack: ["Next.js", "React", "Firebase", "GenAI"],
    githubUrl: "https://github.com",
    liveDemoUrl: "https://example.com",
  },
  {
    id: "project-portfolio",
    title: "Personal Portfolio Website",
    description: "This very website, designed to showcase my skills and projects. Built with Next.js, Tailwind CSS, and hosted on a modern platform.",
    techStack: ["Next.js", "Tailwind CSS", "Supabase", "Firebase"],
    githubUrl: "https://github.com",
    liveDemoUrl: "#",
  },
];

export const certifications = [
  {
    title: "Cybersecurity Fundamentals",
    issuer: "Tech Academy",
    date: "June 2023",
    icon: Award,
  },
  {
    title: "Advanced Python Programming",
    issuer: "Code Institute",
    date: "January 2023",
    icon: Award,
  },
];
