import {
  Code,
  Github,
  Linkedin,
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
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/netra-mehandiratta-31498b396?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin },
  { name: 'GitHub', url: 'https://github.com', icon: Github },
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


export const projects = [];

export const certifications = [
  {
    title: "🏆 Builder’s Build Hackathon — 1st Place",
    issuer: "BVIMR × 23 Ventures",
    date: "2026",
    icon: Award,
  },
  {
    title: "🧑‍💼 Build-A-Thon Coordinator",
    issuer: "BVIMR",
    date: "2025",
    icon: Award,
  },
  {
    title: "🥉 3rd Place — SIH Internal Hackathon",
    issuer: "Smart India Hackathon",
    date: "2025",
    icon: Award,
  },
  {
    title: "🤝 Volunteer — SIH Internal Hackathon",
    issuer: "Smart India Hackathon",
    date: "2025",
    icon: Award,
  },
  {
    title: "💻 Participant — Smart India Hackathon",
    issuer: "Smart India Hackathon",
    date: "2025",
    icon: Award,
  },
  {
    title: "🌍 Top 50 Changemakers of India",
    issuer: "Community Initiative",
    date: "2025",
    icon: Award,
  },
  {
    title: "🧠 AI Solutions Challenge — Inter-School Festival",
    issuer: "Inter-School Festival",
    date: "2024",
    icon: Award,
  },
  {
    title: "Duke of Edinburgh’s International Award — Bronze",
    issuer: "The Duke of Edinburgh's Award",
    date: "2025",
    icon: Award,
  },
];
