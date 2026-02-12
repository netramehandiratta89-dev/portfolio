import {
  Code,
  Github,
  Linkedin,
  Mail,
  Smartphone,
  Server,
  Database,
  Globe,
  GitBranch,
  Settings,
  Cpu,
  BookOpen,
  Award,
} from 'lucide-react';

export const personalInfo = {
  name: "Netra Mehandiratta",
  tagline: "Developer | Problem Solver",
  resumeUrl: "",
};

export const socialLinks = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/netra-mehandiratta-31498b396?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', icon: Linkedin },
  { name: 'GitHub', url: 'https://github.com', icon: Github },
];

export const contactInfo = {
  email: "netramehandiratta89@gmail.com",
  phone: "9540974674",
};

export const about = {
  intro: "I am a passionate Computer Science student with a strong interest in software development. I thrive on solving complex problems and continuously learning new technologies. My goal is to leverage my skills to build innovative solutions.",
  education: [
    {
      degree: "Bachelors in Computer Applications",
      institution: "Bharati Vidyapeeth Institute of Management & Research, Delhi",
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
];

export const aboutSkills = [
  { name: "C / C++", icon: Cpu },
  { name: "DSA", icon: GitBranch },
  { name: "Web Development", icon: Globe },
  { name: "Firebase", icon: Server },
  { name: "Supabase", icon: Database },
  { name: "GitHub", icon: Github },
];


export const projects = [
  {
    id: 'project-1',
    title: 'CyberGuardian',
    description: 'A cyber-awareness learning website with chatbot guidance, built using Odoo to teach users how to stay safe online.',
    techStack: ['Python', 'Odoo', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript', 'QWeb'],
    liveDemoUrl: 'https://cyberguardian.odoo.com',
    githubUrl: null,
  },
  {
    id: 'project-2',
    title: 'CareerTruth',
    description: 'A career reality checker AI that tells students what will actually happen after a degree, not just what colleges promise.',
    techStack: ['Next.js', 'React', 'Vercel', 'JavaScript', 'HTML', 'CSS', 'AI'],
    githubUrl: 'https://github.com/netramehandiratta89-dev/careertruth',
    liveDemoUrl: 'https://careertruth-2026.vercel.app/',
  },
  {
    id: 'project-3',
    title: 'Project Gamma',
    description: 'A brief description of Project Gamma, highlighting its purpose and key features.',
    techStack: ['Python', 'Flask', 'SQLAlchemy'],
    githubUrl: 'https://github.com',
    liveDemoUrl: null,
  },
];

export const certifications = [
  {
    title: "🏆 Builder’s Build Hackathon — 1st Place",
    issuer: "BVIMR × 23 Ventures",
    date: "2026",
    icon: Award,
    description: "Participated in a competitive hackathon where I built practical solutions under time constraints, improving real-world development and teamwork skills.",
  },
  {
    title: "🧑‍💼 Build-A-Thon Coordinator",
    issuer: "BVIMR",
    date: "2025",
    icon: Award,
    description: "Served as event coordinator, managing teams and operations while ensuring smooth execution of a large technical event.",
  },
  {
    title: "🥉 3rd Place — SIH Internal Hackathon",
    issuer: "Smart India Hackathon",
    date: "2025",
    icon: Award,
    description: "Secured third position by developing an innovative problem-solving solution demonstrating technical and collaborative excellence.",
  },
  {
    title: "🤝 Volunteer — SIH Internal Hackathon",
    issuer: "Smart India Hackathon",
    date: "2025",
    icon: Award,
    description: "Contributed to event organization and coordination, a supporting participants and maintaining workflow during the hackathon.",
  },
  {
    title: "💻 Participant — Smart India Hackathon",
    issuer: "Smart India Hackathon",
    date: "2025",
    icon: Award,
    description: "Actively participated in national-level innovation challenge, presenting ideas and technical solutions with a team.",
  },
  {
    title: "🌍 Top 50 Changemakers of India",
    issuer: "Community Initiative",
    date: "2025",
    icon: Award,
    description: "Selected among top innovators for impactful contributions and commitment to creating positive community change.",
  },
  {
    title: "Duke of Edinburgh’s International Award — Bronze",
    issuer: "The Duke of Edinburgh's Award",
    date: "2025",
    icon: Award,
    description: "Achieved international recognition for dedication, skill development, community service, and perseverance.",
  },
  {
    title: "🧠 AI Solutions Challenge — Inter-School Festival",
    issuer: "Inter-School Festival",
    date: "2024",
    icon: Award,
    description: "Developed an AI-based solution as part of a technical competition, enhancing problem-solving and creativity skills.",
  },
];
